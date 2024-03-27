// index.js

require('dotenv').config();
const fs = require('fs');
const PDFParser = require('pdf-parse');
const axios = require('axios');

// Function to extract text from PDF
async function extractTextFromPDF(pdfPath) {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdfData = await PDFParser(dataBuffer);
        return pdfData.text;
    } catch (error) {
        console.error('Error reading PDF:', error);
        return null;
    }
}

// Function to generate flashcards using ChatGPT
// Function to generate flashcards using ChatGPT
// Function to generate flashcards using ChatGPT
async function generateFlashcards(text) {
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            prompt: text,
            model: 'text-davinci', // Updated model name
            max_tokens: 50,
            n: 5, // Number of flashcards to generate
            stop: '\n', // Stop completion at newline
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.API_KEY}`,
            },
        });
        return response.data.choices.map(choice => choice.text.trim());
    } catch (error) {
        console.error('Error generating flashcards:', error.response.data);
        return null;
    }
}



// Main function
async function main() {
    const pdfPath = 'sample.pdf'; // Replace with your PDF file path
    const text = await extractTextFromPDF(pdfPath);
    if (text) {
        const flashcards = await generateFlashcards(text);
        console.log('Flashcards generated:', flashcards);
    } else {
        console.log('Error extracting text from PDF.');
    }
}

// Execute the main function
main();