import dotenv from 'dotenv';
import express from 'express';
import OpenAI from 'openai'; // Updated import
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// OpenAI API setup
// Since we're directly importing OpenAI, we no longer use Configuration and OpenAIApi separately
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sessions = new Map();

app.use(express.json());
app.use(cors());

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({ message: "You've reached the question limit for this dialogue session." });
  },
});

// Endpoint to handle chat responses
app.post('/generate-response', apiLimiter, async (req, res) => {

  const { userId, message } = req.body; // 假设请求体中包含 userId 和 message

  // const {message} = req.body;

  console.log("msg: ", message)

  // Check if user session exists
  if (!sessions.has(userId)) {
    // 如果不存在，为该用户创建一个新的对话节
    sessions.set(userId, { sectionId: Date.now(), questions: [] });
  } 
  const session = sessions.get(userId);

  // 检查问题数量是否超过限制
  if (session.questions.length >= 5) {
    return res.status(429).send("You've reached the question limit for this session.");
  }

  // 添加新问题到当前会话
  session.questions.push(message);

  // System messages based on CV summary, broken down into digestible parts for the chat
  const systemMessages = [
    {
      role: "system",
      content: "You are a helpful assistant knowledgeable about Yu Feng's professional background and skills."
    },
    {
      role: "system",
      content: "Yu Feng is coming from China and now she's currently living in Dublin, Ireland. She is 27 years old, her boyfriend is Itgel."
    },
  
    {
      role: "system",
      content: "Yu Feng's experience includes being a Fraud Investigation Specialist at Amazon, Ireland, focusing on data-driven decision support, fraud risk analytics, and project-based statistical analysis."
    },
    {
      role: "system",
      content: "Yu Feng holds an MSc in Computer Science from University College Dublin, Ireland, specializing in Java, Machine Learning, Software Engineering, Cloud Computing."
    },
    {
      role: "system",
      content: "Key projects include developing a web application for Manhattan parking/fuel/charging station recommendations using Java, Spring Boot, Python, React, PostgreSQL."
    }
    // Add more system messages as needed
  ];

  try {

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        ...systemMessages, // Include CV summary as system messages
        {
          role: "user",
          content: message
        }
      ],
      stream: false
    });

    console.log("Response:", response)

    // Sending back the AI response
    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
