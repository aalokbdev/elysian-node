const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAIApi = require('openai');

const app = express();

const corsOptions = {
    origin: '*', 
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
};
  
app.use(cors(corsOptions));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY
});

app.get('/get-message', async (req, res) => {
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "Generate a short, warm, and friendly welcome message for a new user."}],
          });
          console.log(chatCompletion.choices[0].message);
          const msg = chatCompletion.choices[0].message;
        res.json({ msg });
    } catch (error) {
        console.error('Error fetching random message:', error.message);
        res.status(500).json({ error: 'Failed to fetch random message' });
    }
});


// Middleware to handle invalid routes
app.use((req, res, next) => {
    res.status(404).json({ error: 'URL not found' });
});
  
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
