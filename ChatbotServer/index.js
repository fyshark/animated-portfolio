import dotenv from 'dotenv';
import express from 'express';
import OpenAI from 'openai'; // Updated import
import cors from 'cors';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// OpenAI API setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sessions = new Map();

app.use(express.json());
app.use(cors());

// Rate limiter middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each user to 30 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    return req.body.userId;
  },
  handler: (req, res) => {
    res.status(429).json({ message: "You've reached the question limit for this dialogue session." });
  },
});

// Endpoint to handle chat responses
app.post('/generate-response', apiLimiter, async (req, res) => {
  console.log("Request " + req.headers)
  const { userId, sessionId, message } = req.body; // 假设请求体中包含 userId 和 message

  // const {message} = req.body;

  // console.log("msg: ", message)

  // 构造一个独特的会话键，例如 "userId_sessionId"
  const sessionKey = `${userId}_${sessionId}`;

  // 使用sessionKey代替userId作为sessions映射的键
  if (!sessions.has(sessionKey)) {
    sessions.set(sessionKey, { sessionID: sessionId, questions: [], lastActive: Date.now() });
  } else {
    const session = sessions.get(sessionKey);
    session.lastActive = Date.now();
    sessions.set(sessionKey, session);
  }

  // Use sessionKey to retrieve the correct session
  const session = sessions.get(sessionKey);

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
        content: "Yu Feng is originally from China and currently resides in Berlin, Germany."
    },
    {
        role: "system",
        content: "Yu Feng's contact information is as follows: Phone number: (+49) 015259149408, Email address: fengyu@tcd.ie."
    },
    {
        role: "system",
        content: "Yu Feng's experience includes being a Fraud Investigation Specialist at Amazon, Ireland, focusing on data-driven decision support, fraud risk analytics, and project-based statistical analysis."
    },
    {
        role: "system",
        content: "Yu Feng recently worked as a Software Engineer Intern at Tenable, Ireland, from June 2024 to September 2024. She collaborated with the data processing team, processing hosts and vulnerabilities using Kotlin and Gradle. She designed and implemented end-to-end tests to validate data flows from Kafka to DynamoDB, ensuring data integrity and system reliability. Yu Feng also implemented metrics to reduce delays in Kafka queue processing, utilized Splunk for monitoring, and automated CI/CD pipelines using Jenkins and Rancher."
    },
    {
        role: "system",
        content: "Yu Feng holds an MSc in Computer Science from University College Dublin, Ireland, with expertise in Java, Machine Learning, Software Engineering, and Cloud Computing."
    },
    {
        role: "system",
        content: "Key projects include developing a web application for Manhattan parking/fuel/charging station recommendations using Java, Spring Boot, Python, React, and PostgreSQL."
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

// 定义session过期时间，例如30分钟
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30分钟
const cleanUpSessions = () => {
  const now = Date.now();
  sessions.forEach((session, key) => {
    if (now - session.lastActive > SESSION_TIMEOUT) {
      sessions.delete(key); // 移除过期的session
      console.log(`Session ${key} expired and removed.`);
    }
  });
};

// 定时运行session清理函数
setInterval(cleanUpSessions, 15 * 60 * 1000); // 每15分钟检查一次

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
