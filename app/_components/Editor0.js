"use client";

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with environment variable
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : null;

export default function Editor({ courseName }) {
  const [projectIdea, setProjectIdea] = useState("");
  const [code, setCode] = useState("");
  const [aiGuidance, setAiGuidance] = useState("");

  const getAIGuidance = async () => {
    if (!projectIdea.trim()) {
      alert("Please enter what you want to build first!");
      return;
    }

    setAiGuidance("Thinking...");

    try {
      const prompt = `You are a senior developer mentor. A student wants to build: "${projectIdea}" using ${courseName}.
    
Give them step-by-step guidance on how to start. Be specific and actionable. Don't write code for them, just guide what they should do first.`;

      if (!model) {
        setAiGuidance("Please add your Gemini API key to .env.local to enable AI features.");
        return;
      }

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setAiGuidance(text);
    } catch (error) {
      setAiGuidance("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-700">
        <h1 className="text-2xl font-bold">
          {courseName.toUpperCase()} Developer Course
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">

        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium mb-2">
            What do you want to build?
          </label>
          <input
            type="text"
            value={projectIdea}
            onChange={(e) => setProjectIdea(e.target.value)}
            placeholder="e.g., A todo app with authentication"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button onClick={getAIGuidance} className="mt-3 px-6 py-2 bg-blue-600 hover:bg-blue-600 text-white font-medium rounded-lg">get AI   guidancce </button>
        </div>

        {/* Code Editor Section */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Your Code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Start coding here..."
            rows={20}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Preview Section */}
        {/* AI Guidance Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-white">AI Guidance</h3>
          {aiGuidance ? (
            <div className="text-sm text-slate-300 whitespace-pre-wrap">
              {aiGuidance}
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              Enter what you want to build and click Get AI Guidance to start!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}