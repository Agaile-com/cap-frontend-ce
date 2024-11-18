import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { Authenticator, useTheme, View, Image, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import AWS from 'aws-sdk';
Amplify.configure(awsExports);
AWS.config.update({ region: 'eu-central-1' });

const cognitoDomain = 'https://aiatest.auth.eu-central-1.amazoncognito.com';
const clientId = '43qn0hu13skenauubn1v4ivml5';
const redirectUri = 'https://main.d2dd7pp8b90655.amplifyapp.com/';
const responseType = 'code';
const scope = 'email openid';

const functionUrl = 'https://d38nke2utb131e.cloudfront.net/0f579446/chat_answer';
const X_API_KEY = 'ecc9b2b25444104fdcda5678f82267e8533bb462';
const newChatUrl = 'https://d38nke2utb131e.cloudfront.net/0f579446/new_chat';

const ASSISTANT_MODE = 'default';

const createNewChat = async () => {
  const chatID = `CHAT_ID_AIA_${Math.floor(Math.random() * 9999999)}`;
  const userID = `USER_ID_AIA_${Math.floor(Math.random() * 9999999)}`;
  const payload = { chatID, userID };
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "x-api-key": X_API_KEY
  };

  const response = await fetch(newChatUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
  }

  return { chatID, userID };
};

function App() {
  const [newInputValue, setNewInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [chatInfo, setChatInfo] = useState({ chatID: '', userID: '' });
  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
  const logBuffer = useRef('');

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const chatData = await createNewChat();
        console.log('Chat initialized:', chatData); // Debugging-Information
        setChatInfo(chatData);
      } catch (error) {
        console.error('Error initializing chat:', error);
        setErrorMessage('Error initializing chat. Please try again later.');
      }
    };

    initializeChat();
  }, []);

  const ses = new AWS.SES({
    apiVersion: '2010-12-01',
    accessKeyId: "AKIA2DBDUWYB4NZC4BUA",
    secretAccessKey: "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",
    region: "eu-central-1"
  });

  const components = { 
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Contacts App"
            src="/logo.jpg"
          />
        </View>
      );
    },
    Footer() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved to AGAILE Inc.  {new Date().getFullYear()}
          </Text>
        </View>
      );
    },
  };

  const logDebug = (message, ...optionalParams) => {
    const logMessage = `[DEBUG] ${message} ${JSON.stringify(optionalParams)}\n`;
    console.debug(logMessage);
    logBuffer.current += logMessage;
  };

  const handleStreamResponse = async (reader) => {
    const decoder = new TextDecoder('utf-8');
    let newMessage = '';
    let newSourceLinks = [];
    let buffer = '';
    let isFirstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      let chunk = decoder.decode(value, { stream: true });

      if (isFirstChunk) {
        buffer += chunk;
        buffer = buffer.replace(/--- id: [\w=]+ ---\s*/, '');
        isFirstChunk = false;
      } else {
        newMessage += chunk;
      }

      const linkMatches = newMessage.match(/(https?:\/\/[^\s]+)/g);
      if (linkMatches) {
        newSourceLinks = newSourceLinks.concat(linkMatches);
      }

      setCurrentMessage(newMessage);
    }

    setMessages(prevMessages => [
      ...prevMessages,
      { sender: 'ai', text: newMessage, sourceLinks: newSourceLinks }
    ]);
    setCurrentMessage('');
  };

  const newMessage = async (e) => {
    e.preventDefault();
    if (newInputValue.trim() === '') return;

    setNewInputValue('');
    setErrorMessage(null);
    const newMessages = [
      ...messages,
      {
        text: newInputValue,
        sender: 'user',
        sourceLinks: []
      }
    ];
    setMessages(newMessages);

    const payload = {
      chatID: chatInfo.chatID,
      userID: chatInfo.userID,
      modelID: "CLAUDE.V3.SONNET",
      assistant_mode: ASSISTANT_MODE,
      message_content: newInputValue,
      streaming: true,
      show_links: true,
      assistant: "expert"
    };

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "x-api-key": X_API_KEY
    };

    logDebug('Sending request to server', { url: functionUrl, payload, headers });

    try {
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      logDebug('Fetch response', response);

      if (!response.ok) {
        const responseText = await response.text();
        logDebug('Response not ok', { status: response.status, statusText: response.statusText, responseText });
        throw new Error(`HTTP error! status: ${response.status}, message: ${responseText}`);
      }

      const reader = response.body.getReader();
      await handleStreamResponse(reader);

    } catch (err) {
      if (err instanceof Error) {
        logDebug('Error during fetch', { error: err.message, name: err.name, stack: err.stack });
        console.error('Error fetching the AI response:', err);
        setErrorMessage(err.message || 'There was an error getting the response from the server.');
      } else {
        logDebug('Unknown error during fetch', { error: err });
        setErrorMessage('There was an unknown error.');
      }
      setMessages([...newMessages, {
        sender: 'ai',
        text: 'There was an error getting the response from the server.',
        sourceLinks: []
      }]);
    }
  };

  const sendEmail = async (subject, body) => {
    const params = {
      Destination: {
        ToAddresses: ['zohlarus@agaileinc.zohodesk.com'] 
      },
      Message: {
        Body: {
          Text: {
            Data: `This is the last messages between the client and the ai:\n${body}` 
          }
        },
        Subject: {
          Data: subject 
        }
      },
      Source: 'jk@agaile.com'
    };

    try {
      await ses.sendEmail(params).promise();
      console.log("Success");
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleFeedbackClick = (feedbackType) => {
    if (feedbackType === 'thumbsUp') {
      setThumbsUpClicked(true);
    } else {
      setThumbsDownClicked(true);
    }

    const lastTwoMessages = messages.slice(-2);
    if (lastTwoMessages.length === 2) {
      const feedback = feedbackType === 'thumbsUp' ? 'Positive' : 'Negative';
      const body = `\nHuman generated question: \n\n${lastTwoMessages[0].text}\n\nAI generated response: \n\n${lastTwoMessages[1].text}`;
      sendEmail(`${feedback} response`, body);
    }

    setTimeout(() => {
      setThumbsUpClicked(false);
      setThumbsDownClicked(false);
    }, 1500);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard');
    }, () => {
      alert('Failed to copy');
    });
  };

  return (
    <Authenticator loginMechanisms={['email']} components={components}>
      {({ signOut }) => (
        <div className="App">
          <main>
            <h1>Expert Mode for Zoho Desk</h1>
            <>
              <div>
                {messages.map((message, index) => (
                  <div key={index} className={`message-container ${message.sender}`}>
                    <div className={`message-box message ${message.sender}`}>
                      <p className="message-text">{message.text.replace(/(https?:\/\/[^\s]+)/g, '')}</p>
                      {message.sender === 'ai' && (
                        <div className="feedback-container">
                          <div className="source-container">
                            <strong>Quellen:</strong>
                            {message.sourceLinks.length > 0 && (
                              <div className="source-links">
                                {message.sourceLinks.map((link, i) => (
                                  <a key={i} href={link} target="_blank" rel="noopener noreferrer">
                                    {i + 1}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                          <button className={`feedback-button ${thumbsUpClicked ? 'green-icon' : ''}`} onClick={() => handleFeedbackClick('thumbsUp')}>
                            <img src="/thumbs-up.svg" alt="Thumbs Up" />
                          </button>
                          <button className={`feedback-button ${thumbsDownClicked ? 'green-red' : ''}`} onClick={() => handleFeedbackClick('thumbsDown')}>
                            <img src="/thumbs-down.svg" alt="Thumbs Down" />
                          </button>
                          <button className="copy-button" onClick={() => copyToClipboard(currentMessage)}>
                            <img src="/copy.svg" alt="Copy" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {currentMessage && (
                  <div className="message-container ai">
                    <div className="message-box message ai">
                      <p className="message-text">{currentMessage.replace(/(https?:\/\/[^\s]+)/g, '')}</p>
                    </div>
                  </div>
                )}
              </div>
              {errorMessage && (
                <div className="error-message">
                  <p>{errorMessage}</p>
                </div>
              )}
              <form className="input-form" onSubmit={newMessage}>
                <input
                  type="text"
                  className="input-box"
                  placeholder="Message"
                  value={newInputValue}
                  onChange={e => setNewInputValue(e.currentTarget.value)}
                />
                <button type="submit" className="submit-button">
                  Senden
                </button>
              </form>
              <footer className="footer">
                <p>Amazon Q Business uses generative AI. You may need to verify responses for accuracy. <a href="https://aws.amazon.com/responsible-use-of-ai/">AWS Responsible AI Policy</a></p>
              </footer>
              <button 
                onClick={signOut} 
                style={{ 
                  margin: '20px', 
                  fontSize: '0.8rem', 
                  padding: '5px 10px', 
                  marginTop: '20px'
                }}
              >
                Sign Out
              </button>
            </>
          </main>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
