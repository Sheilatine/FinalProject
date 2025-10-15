import dotenv from "dotenv";
dotenv.config(); // <- MUST be first
import OpenAI from "openai";
import { ChatOpenAI } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// education assistant
export const educationalChat = async (message, context = []) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an educational assistant for African university students. 
        Provide accurate, culturally relevant educational content and health facts. 
        Cite sources when possible.`
      },
      ...context, // Previous messages
      { role: "user", content: message }
    ]
  });
  
  return response.choices?.[0]?.message?.content || "No response from AI.";
  } catch (error) {
    console.error("educationalChat error:", error);
    return "Sorry, something went wrong while fetching the answer.";
  }
};
//research assistant with RAG
export const researchAssistant = async (query, documents = []) => {
  try {
    if (!documents.length) {
      return { answer: "No documents provided.", sources: [] };
    }
    // Create vector store from documents
    const vectorStore = await MemoryVectorStore.fromDocuments(
      documents,
      new OpenAIEmbeddings()
    );
  // Similarity search for top 4 relevant docs
    const relevantDocs = await vectorStore.similaritySearch(query, 4);

    // Combine relevant content as context
    const context = relevantDocs.map(doc => doc.pageContent).join("\n\n");

  
  // Initialize LLM
    const llm = new ChatOpenAI({ modelName: "gpt-4o-mini" });

    // Generate response
    const response = await llm.invoke([
      {
        role: "system",
        content:
          "You are a research assistant. Use the provided context to answer questions accurately.",
      },
      {
        role: "user",
        content: `Context: ${context}\n\nQuestion: ${query}`,
      },
    ]);

  
      return {
      answer: response?.[0]?.text || "No response from AI.",
      sources: relevantDocs,
    };
  } catch (error) {
    console.error("researchAssistant error:", error);
    return { answer: "Sorry, something went wrong while fetching the research answer.", sources: [] };
  }
};
  