import 'dotenv/config';
import axios from 'axios';
import cheerio from 'cheerio';
import readlineSync from 'readline-sync';

// Function to make a single request
async function makeRequest() {
    try {
        const response = await axios.get(process.env.TARGET_LINK);
        const $ = cheerio.load(response.data);
        const value = $("text[x='102']").first().text().trim();

        console.log(`Request: ${value}`);
    } catch (error) {
        console.log(error.message);
    }
}

// Function to make requests with a delay between batches
async function makeRequestsInBatches(numberOfRequests, batchSize, delayBetweenBatches) {
    try {
        for (let i = 0; i < numberOfRequests; i += batchSize) {
            const batch = Array.from({ length: Math.min(batchSize, numberOfRequests - i) }, () => makeRequest());
            await Promise.all(batch);
            if (i + batchSize < numberOfRequests) {
                // Introduce a delay between batches to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
            }
        }
        console.log("Done");
    } catch (error) {
        console.log(error);
    }
}

// Get the number of requests from the user
const input = readlineSync.question("Enter the number of requests: ");

// Validate if the input is a valid positive integer
const numberOfRequests = parseInt(input, 10);

if (isNaN(numberOfRequests) || numberOfRequests <= 0 || !Number.isInteger(numberOfRequests)) {
    console.log("Please enter a valid positive integer.");
} else {
    // Set batch size and delay between batches (adjust as needed)
    const batchSize = 10;
    const delayBetweenBatches = 1000; // 1000 milliseconds (1 second)

    // Call the function with the user-specified number of requests
    makeRequestsInBatches(numberOfRequests, batchSize, delayBetweenBatches);
}
