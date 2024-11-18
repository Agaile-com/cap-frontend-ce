import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

// Initialize the DynamoDB client
const client = new DynamoDBClient({
    region: "eu-central-1", // Replace with your region, e.g., "us-east-1"
    credentials: {
        accessKeyId: "AKIAXYKJVCOTWI2IVV4Q", // Replace with your AWS Access Key ID
        secretAccessKey: "/KzBWzMMZ9awbcnzqUBMy/8yaOS1zTugK4NfQdMJ", // Replace with your AWS Secret Access Key
    },
});

export async function fetchPrompt() {
    const params = {
        TableName: "convert10-prompt-template", // Replace with your table name
        Key: {
            template: { S: "default" }, // Replace with your primary key and value
        },
    };

    try {
        const command = new GetItemCommand(params);
        const response = await client.send(command);
        console.log("Item retrieved:", response.Item);
        return response.Item;
    } catch (error) {
        console.error("Error fetching item:", error);
    }
}

// Call the function
// fetchPrompt();
