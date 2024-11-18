// utils.js
const { v4: uuidv4 } = require('uuid');

const newChatUrl = process.env.REACT_APP_BACKEND_URL + '/new_chat';
const functionUrl = process.env.REACT_APP_BACKEND_URL + '/chat_answer';
const X_API_KEY = process.env.REACT_APP_X_API_KEY;
const ASSISTANT_MODE = process.env.REACT_APP_ASSISTANT_MODE;

/**
 * Creates a new chat with a unique chat ID and user ID
 */
export const createNewChat = async () => {
  const chatID = `CHAT_ID_Convert10_${Math.floor(Math.random() * 9999999)}`;
  const userID = `USER_ID_Convert10_${Math.floor(Math.random() * 9999999)}`;
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

/**
 * Checks if a string is a valid URL
 */
export const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

/**
 * Removes duplicate links from an array
 */
export const deduplicateLinks = (links) => {
  const seen = new Set();
  return links.filter(link => {
    if (seen.has(link)) {
      return false;
    }
    seen.add(link);
    return true;
  });
};

/**
 * Extracts valid and unique links from a message
 */
export const handleLinks = (message) => {
  const linkPattern = /(https?:\/\/[^\s]+)/g;
  const matches = message.match(linkPattern);
  const validLinks = matches ? matches.filter(link => isValidURL(link)) : [];
  return deduplicateLinks(validLinks);
  // return validLinks;
};

/**
 * Removes any trailing links from the content
 */
export function removeTrailingLinks(content) {
  // Use regex to match any links that appear at the end of the content
  return content.replace(/\n?\s*https?:\/\/\S+$/gm, '').trim();
}

/**
 * Formats a message by converting URLs to clickable links
 */
// export const formatMessage = (message, excludeLinks = []) => {
//   const linkPattern = /(https?:\/\/[^\s]+)/g;
//   const links = message.match(linkPattern);
//   const uniqueLinks = links ? deduplicateLinks(links) : [];
//   let formattedMessage = message;

//   formattedMessage = formattedMessage.replace(linkPattern, (url) => {
//     if (excludeLinks.includes(url)) {
//       return '';
//     }
//     return `<a style="color: black;" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
//   });

//   return { formattedMessage, uniqueLinks };
// };

export const formatMessage = (message, excludeLinks = []) => {
  const linkPattern = /(https?:\/\/[^\s]+)/g;
  const links = message.match(linkPattern);
  const uniqueLinks = links ? deduplicateLinks(links) : [];
  // const uniqueLinks = links;
  let formattedMessage = message;

  // Replace URLs with clickable links
  if (uniqueLinks.length > 0) {
    uniqueLinks.forEach(url => {
      if (!excludeLinks.includes(url)) {
        formattedMessage = formattedMessage.replace(url, `<a style="color: black; text-decoration: underline;" href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
      }
    });
  }

  // Replace newline characters with <br/>
  if (formattedMessage.includes('\n')) {
    formattedMessage = formattedMessage.replace(/\n/g, '<br/>');
  }

  return { formattedMessage, uniqueLinks };
};




/**
 * Logs debug messages to the console and buffer
 */
export const logDebug = (logBuffer, message, ...optionalParams) => {
  const logMessage = `[DEBUG] ${message} ${JSON.stringify(optionalParams)}\n`;
  console.debug(logMessage);
  logBuffer.current += logMessage;
};


// extract the latest message from the chat
export function extractLatestMessage(messages) {
  return messages[messages.length - 1].content[0].text;
}

// extract the latest message from the chat, removing the ID and keeping only the message
export function extractAnswer(responseText) {

  // Split the rawMessage by "---" to separate the parts
  const parts = responseText.split('---');

  // If the message contains an ID, the message will be the part after the second '---'
  if (parts.length > 2) {
    return parts[2].trim(); // The message content after the ID and other metadata
  }

  // If no ID is found, return the entire message
  return responseText.trim();
}

export function generateChatID() {
  // Generate a UUID and append the current timestamp
  return `chat_${uuidv4()}_${Date.now()}`;
}

export function generateUserID() {
  // Generate a UUID and append the current timestamp
  return `user_${uuidv4()}_${Date.now()}`;
}

export async function chat(messages) {
  const latestMessage = extractLatestMessage(messages);

  // Prepare the request body
  const requestBody = {
    chatID: generateChatID(),
    userID: generateUserID(),
    modelID: "CLAUDE.V3.OPUS",
    assistant: ASSISTANT_MODE,
    message_content: latestMessage, // Assuming `text` contains the message content
    streaming: true,
    show_links: true
  };

  try {
    // Send a POST request to the chat endpoint
    const result = await fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": X_API_KEY, // Adding API key as a header if required
      },
      body: JSON.stringify(requestBody),
    });

    // Extract and return the response text
    const responseText = await result.text();
    const messageContent = extractAnswer(responseText);
    return messageContent;
  } catch (error) {
    // Handle errors (e.g., network issues, request cancellation)
    console.error("Failed to send message to chat endpoint:", error);
    throw error;
  }
}
