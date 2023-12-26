import 'dotenv/config';
import axios from 'axios';
import cheerio from 'cheerio';
import readlineSync from 'readline-sync';

// Function to make a single request
async function makeRequest() {
    const response = await axios.get(process.env.TARGET_LINK);
    const $ = cheerio.load(response.data);
    const value = $("text[x='102']").first().text().trim();

    console.log(`Request: ${value}`);
}

// Function to make requests concurrently
async function makeConcurrentRequests(numberOfRequests) {
    try {
        // Create an array of promises for concurrent requests
        const requests = Array.from({ length: numberOfRequests }, () => makeRequest());

        // Use Promise.all to wait for all requests to complete
        await Promise.all(requests);

        // Print "done" message when all requests are completed
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
    // Call the function with the user-specified number of requests
    makeConcurrentRequests(numberOfRequests);
}
