// testAI.js

import dotenv from "dotenv";
dotenv.config(); // Make sure this is the very first thing

console.log("ENV file loaded. OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "✅ Found" : "❌ Missing");


import { educationalChat, researchAssistant } from "./Services/aiService.js";

// Quick check to ensure API key is loaded
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set. Please check your .env file.");
  process.exit(1);
}

// ======================
// 1️⃣ Test educationalChat
// ======================
const testEducationalChat = async () => {
  const userMessage = "Explain the benefits of eating pineapples in the morning for health.";
  const previousContext = [
    { role: "user", content: "Hi, can you give me some nutrition tips?" },
    { role: "assistant", content: "Sure! I can provide health and nutrition advice." },
  ];

  try {
    const answer = await educationalChat(userMessage, previousContext);
    console.log("Educational Chat Answer:\n", answer);
  } catch (error) {
    console.error("Error in educationalChat:", error);
  }
};

// ======================
// 2️⃣ Test researchAssistant
// ======================
const testResearchAssistant = async () => {
  const query = "What are some strategies to improve study habits for university students?";

  // Sample documents
  const documents = [
    { pageContent: "Active recall is a proven study technique that improves memory retention." },
    { pageContent: "Pomodoro technique helps students maintain focus and avoid burnout." },
    { pageContent: "Group study can enhance understanding through discussion." },
    { pageContent: "Regular breaks and proper sleep are crucial for effective learning." },
  ];

  try {
    const result = await researchAssistant(query, documents);
    console.log("Research Assistant Answer:\n", result.answer);
    console.log("Sources:\n", result.sources.map(doc => doc.pageContent));
  } catch (error) {
    console.error("Error in researchAssistant:", error);
  }
};

// ======================
// Run tests
// ======================
const runTests = async () => {
  console.log("=== Testing Educational Chat ===");
  await testEducationalChat();

  console.log("\n=== Testing Research Assistant ===");
  await testResearchAssistant();
};

runTests();
