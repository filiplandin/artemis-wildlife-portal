// server.js: the Node backend listens on its own port (e.g., localhost:3001) for API requests.
// A simple Express server to handle chat requests using OpenAI's API.
require('dotenv').config()

// debug OpenAI API key
// console.log("OPENAI_API_KEY from .env:", process.env.OPENAI_API_KEY);

const express = require('express')
const { Configuration, OpenAIApi } = require('openai')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// debug OpenAI API backend connection

// const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));
// (async () => {
//   try {
//     const resp = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{role: "user", content: "Say hello"}]
//     });
//     console.log("OpenAI test response:", resp.data.choices[0].message.content);
//   } catch (err) {
//     console.error("OpenAI test error:", err.message);
//   }
// })();

const openai = new OpenAIApi(new Configuration({apiKey: process.env.OPENAI_API_KEY,}))

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, animal } = req.body
    // You may validate and format the prompt here if needed.
    const completion = await openai.createChatCompletion({
      model: "gpt-4.1-nano-2025-04-14",
      messages,
    })
    res.json({ completion: completion.data.choices[0].message.content })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.listen(3001, () => console.log('Server running on http://localhost:3001'))