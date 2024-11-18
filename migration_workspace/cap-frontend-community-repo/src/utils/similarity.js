const responses = {
  "Who are you": "  ---  \nid: RESP_ID_001  \nui: default  \n---  \n\nI am ConvertAI, your virtual assistant. I’m here to help streamline communication, provide insights, and assist with tasks within your team or organization.",
  "What is agaile.ai": "  ---  \nid: RESP_ID_002  \nui: default  \n---  \n\nAgaile.ai is a platform designed to enhance team collaboration and productivity by offering structured communication tools. It aims to reduce noise, streamline workflows, and support effective decision-making across teams.",
  "how can you help me": "  ---  \nid: RESP_ID_003  \nui: default  \n---  \n\nI can help you by providing quick access to updates, organizing team discussions, setting up reminders, and ensuring you stay informed without overwhelming notifications. Let me know if you need help with anything specific!",
  "Show me the latest updates from the project leads.": "  ---  \nid: EXEC_UPD_12345  \nui: table  \n---  \n\n{  \n\"Table\": {  \n\"TableCaption\": \"Latest Project Updates\",  \n\"TableHeader\": [  \n{ \"TableHead\": \"Team\", \"className\": \"w-[100px]\" },  \n{ \"TableHead\": \"Update\" }  \n],  \n\"TableBody\": [  \n{ \"TableRow\": [  \n{ \"TableCell\": \"Marketing Team\", \"className\": \"font-medium\" },  \n{ \"TableCell\": \"Campaign engagement is up by 30%\" }  \n] },  \n{ \"TableRow\": [  \n{ \"TableCell\": \"Development Team\", \"className\": \"font-medium\" },  \n{ \"TableCell\": \"Version 2.1 was released this morning\" }  \n] },  \n{ \"TableRow\": [  \n{ \"TableCell\": \"Sales Team\", \"className\": \"font-medium\" },  \n{ \"TableCell\": \"Q4 targets are on track with a 10% growth forecast\" }  \n] }  \n] }  \n}",
  "Send a quick email to the Development Team. I’d like an ETA on the next feature release.": "  ---  \nid: EXEC_CONF_67890  \nui: card  \n---  \n\n{  \n\"Card\": {  \n\"Header\": {  \n\"Title\": \"Message Sent\",  \n\"Description\": \"Development lead estimates the next release by the end of the month.\"  \n},  \n\"Content\": {  \n\"text\": \"I'll notify you if there are any delays.\"  \n},  \n\"CTA\": {  \n\"true\": \"OK\",  \n\"false\": \"Cancel\"  \n}  \n}  \n}",
  "Give me an comparison of the progress from Q3 2024 to Q4 2024 across our webapp and mobile app": "  ---  \nid: CHRT_USER_STATS_002  \nui: chart  \n---  \n\n{  \n\"Chart\": {  \n\"data\": [  \n{ \"month\": \"September\", \"mobile\": 1200, \"webapp\": 850 },  \n{ \"month\": \"October\", \"mobile\": 1300, \"webapp\": 900 }  \n],  \n\"config\": {  \n\"mobile\": { \"label\": \"Mobile\", \"color\": \"#60a5fa\" },  \n\"webapp\": { \"label\": \"WebApp\", \"color\": \"#34d399\" }  \n}  \n}  \n}",
  "Set a weekly update from each project lead to keep me in the loop.": "  ---  \nid: EXEC_SCHED_88923  \nui: calendar  \n---  \n\n{  \n\"Calendar\": {  \n\"title\": \"Weekly Update Scheduled\",  \n\"description\": \"Weekly updates from each project lead will be delivered every Friday at 9 AM.\",  \n\"selectedDate\": \"2024-11-08T09:00:00.000Z\"  \n}  \n}",
  "Start a new Table for the product launch team.": "  ---  \nid: MGR_TBL_11223  \nui: table  \n---  \n\n{  \n\"Table\": {  \n\"TableCaption\": \"Product Launch Team Task Overview\",  \n\"TableHeader\": [  \n{ \"TableHead\": \"Task\", \"className\": \"w-[100px]\" },  \n{ \"TableHead\": \"Status\" },  \n{ \"TableHead\": \"Assignee\" },  \n{ \"TableHead\": \"Deadline\", \"className\": \"text-right\" }  \n],  \n\"TableBody\": [  \n{ \"TableRow\": [  \n{ \"TableCell\": \"Develop product pitch\", \"className\": \"font-medium\" },  \n{ \"TableCell\": \"In Progress\" },  \n{ \"TableCell\": \"Marketing Lead\" },  \n{ \"TableCell\": \"Dec 10\", \"className\": \"text-right\" }  \n] },  \n{ \"TableRow\": [  \n{ \"TableCell\": \"Finalize design mockups\", \"className\": \"font-medium\" },  \n{ \"TableCell\": \"Pending\" },  \n{ \"TableCell\": \"Design Lead\" },  \n{ \"TableCell\": \"Dec 15\", \"className\": \"text-right\" }  \n] }  \n] }  \n}",
  "Invite Product, Marketing, and Design leads to the group.": "  ---  \nid: MGR_ACC_22445  \nui: accordion  \n---  \n\n{  \n\"Accordion\": {  \n\"Header\": \"Team Members Added\",  \n\"Items\": [  \n{ \"title\": \"Product Lead\", \"content\": \"Product lead has been successfully added to the table.\" },  \n{ \"title\": \"Marketing Lead\", \"content\": \"Marketing lead has been successfully added to the table.\" },  \n{ \"title\": \"Design Lead\", \"content\": \"Design lead has been successfully added to the table.\" }  \n]  \n}  \n}",
  "Set a daily check-in for 10 AM so everyone can share progress and blockers.": "  ---  \nid: MGR_ALRT_33677  \nui: alert  \n---  \n\n{  \n\"Alert\": {  \n\"type\": \"success\",  \n\"message\": \"Daily check-in scheduled for 10 AM. Team members can share progress and blockers.\"  \n}  \n}",
  "Highlight any tasks that haven’t been completed within three days.": "  ---  \nid: MGR_PROG_44589  \nui: progress  \n---  \n\n{  \n\"Progress\": {  \n\"label\": \"Task Progress Tracking\",  \n\"value\": 70,  \n\"description\": \"Tasks will be flagged if incomplete for more than three days.\"  \n}  \n}",
  "What sets 8seats apart from other messaging platforms?": "  ---  \nid: PRSP_DESC_55690  \nui: card  \n---  \n\n{  \n\"Card\": {  \n\"Header\": {  \n\"Title\": \"8seats Features\",  \n\"Description\": \"8seats simplifies team communication and reduces noise.\"  \n},  \n\"Content\": {  \n\"text\": \"With Tables, Rooms, and Quick Chat, structured, task-oriented conversations are easy to manage. All data is secured with 256-bit encryption.\"  \n},  \n\"CTA\": {  \n\"true\": \"Learn More\",  \n\"false\": \"Dismiss\"  \n}  \n}  \n}",
  "Show me how Tables work.": "  ---  \nid: PRSP_DESC_66701  \nui: tooltip  \n---  \n\n{  \n\"Tooltip\": {  \n\"title\": \"Tables Feature\",  \n\"description\": \"Tables allow small groups (up to eight members) to have in-depth discussions. It's like a 'virtual meeting room' optimized for collaboration.\"  \n}  \n}",
  "How about security? We deal with sensitive information.": "  ---  \nid: PRSP_DESC_77812  \nui: alert-dialog  \n---  \n\n{  \n\"AlertDialog\": {  \n\"title\": \"Data Security\",  \n\"description\": \"8seats uses 256-bit encryption to secure all messages and personal information. Data is stored only as needed to support interactions.\"  \n}  \n}",
  "Announce that this Room is for company-wide updates on the upcoming product launch.": "  ---  \nid: MGR_ROOM_99034  \nui: announcement  \n---  \n\n{  \n\"Announcement\": {  \n\"title\": \"Product Launch Room Created\",  \n\"message\": \"This Room is for company-wide updates on the upcoming product launch.\"  \n}  \n}"
}

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_KEY = "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";

// Helper function to get embedding from OpenAI API
async function getEmbedding(text) {
  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: text,
      model: "text-embedding-ada-002"
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch embedding: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// Function to calculate cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Function to determine if two strings are semantically similar
export async function isSimilar(first, second) {
  try {
    const embeddingA = await getEmbedding(first);
    const embeddingB = await getEmbedding(second);

    const similarityScore = cosineSimilarity(embeddingA, embeddingB);

    // Define a threshold for similarity (typically between 0.7 and 0.9 for semantic similarity)
    const threshold = 0.8;

    if (similarityScore >= threshold) {
      return {
        result: true,
        score: similarityScore,
        message: "The strings are semantically similar."
      };
    } else {
      return {
        result: false,
        score: similarityScore,
        message: "The strings are not semantically similar."
      };
    }
  } catch (error) {
    throw new Error(`Error in isSimilar function: ${error.message}`);
  }
}

/**
 * Find the most similar response from a dictionary of responses.
 * If no response is similar enough, return false
 * @param {*} message 
 * @param {*} dictionary 
 */
export async function findResponse(message, dictionary) {
  try {
    console.log("Finding response for:", message);
    const messageEmbedding = await getEmbedding(message);

    let highestScore = 0;
    let bestMatch = null;
    const threshold = 0.95; // Adjust this threshold as needed

    for (const [key, response] of Object.entries(dictionary)) {

      console.log("Checking response:", key);
      const responseEmbedding = await getEmbedding(key);
      const similarityScore = cosineSimilarity(messageEmbedding, responseEmbedding);

      if (similarityScore > highestScore) {
        highestScore = similarityScore;
        bestMatch = response;
      }
    }

    if (highestScore >= threshold) {
      console.log("Found a semantically similar response.");
      return {
        response: bestMatch,
        match: true,
        score: highestScore,
        message: "Found a semantically similar response."
      };
    } else {
      console.log("No sufficiently similar response found.");
      return {
        response: null,
        match: false,
        score: highestScore,
        message: "No sufficiently similar response found."
      };
    }
  } catch (error) {
    throw new Error(`Error in findResponse function: ${error.message}`);
  }
}

// Example isSimilar usage
// (async () => {
//   const result = await decideSimilar("OpenAI is developing AI models.", "AI models are created by OpenAI.");
//   console.log(result);
// })();

// Example findResponse usage
// (async () => {
//   const result = await findResponse("what is zohlarmarry?", responses);
//   console.log(result);
// })();