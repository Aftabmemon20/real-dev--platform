"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function LiveEditor({ courseName }) {
    const isMern = courseName.toLowerCase().includes("mern");
    const isPython = courseName.toLowerCase().includes("python");

    const [projectIdea, setProjectIdea] = useState("");
    const [code, setCode] = useState("");
    const [aiGuidance, setAiGuidance] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [aiFeedback, setAiFeedback] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isAISectionCollapsed, setIsAISectionCollapsed] = useState(true); // Start collapsed for more editor space

    // Initialize Gemini
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
    const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.5-flash" }) : null;

    // Debounce timer ref
    const analysisTimeoutRef = useRef(null);
    useEffect(() => {
        if (isMern) {
            setCode(`function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-blue-500 mb-4">Hello React!</h1>
      <p className="mb-4">Start building your MERN project.</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Count: {count}
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));`);
        } else if (isPython) {
            setCode(`print("Hello Python World!")
def greet(name):
    return f"Welcome to Python, {name}!"

print(greet("Developer"))`);
        } else {
            setCode(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    h1 { color: #3b82f6; }
  </style>
</head>
<body>
  <h1>Hello World</h1>
  <p>Start building your ${courseName} project!</p>
</body>
</html>`);
        }
    }, [courseName, isMern, isPython]);

    // Real-time AI Monitor
    useEffect(() => {
        if (!code) return;

        // Clear previous timeout
        if (analysisTimeoutRef.current) {
            clearTimeout(analysisTimeoutRef.current);
        }

        // Set new timeout (debounce 2 seconds)
        analysisTimeoutRef.current = setTimeout(async () => {
            setIsAnalyzing(true);
            try {
                const techStack = isMern ? "React" : isPython ? "Python" : "HTML/CSS/JS";
                const prompt = `Analyze this ${techStack} code briefly. 
        If there are errors, point them out. 
        If it's good, give a short compliment or a quick tip. 
        Keep it very concise (max 2 sentences).
        
        Code:
        ${code}`;

                if (!model) {
                    setAiFeedback("Please add your Gemini API key to .env.local to enable AI features.");
                    return;
                }

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();
                setAiFeedback(text);
            } catch (error) {
                console.error("AI Analysis Error:", error);
            } finally {
                setIsAnalyzing(false);
            }
        }, 2000);

        return () => {
            if (analysisTimeoutRef.current) {
                clearTimeout(analysisTimeoutRef.current);
            }
        };
    }, [code, isMern, isPython, model]);

    const getAIGuidance = async () => {
        if (!projectIdea.trim()) {
            alert("Please enter what you want to build first!");
            return;
        }

        setIsThinking(true);
        try {
            const techStack = isMern ? "React/Next.js" : isPython ? "Python" : "HTML/CSS/JS";
            const prompt = `You are a senior developer mentor. A student wants to build: "${projectIdea}" using ${techStack} (in the context of ${courseName}).
      
      Give them step-by-step guidance on how to start. Be specific and actionable. 
      Also provide a starting code snippet.
      Don't write the full complex app, just the starting point.`;

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
        } finally {
            setIsThinking(false);
        }
    };

    // Generate srcDoc for preview
    const getSrcDoc = () => {
        if (isMern) {
            return `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
            <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>
            <div id="root"></div>
            <script type="text/babel">
              ${code}
            </script>
          </body>
        </html>
      `;
        } else if (isPython) {
            return `
        <!DOCTYPE html>
        <html>
          <head>
            <script src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
            <style>
              body { font-family: monospace; padding: 20px; background: #f8fafc; }
              #output { white-space: pre-wrap; }
              .loading { color: #64748b; }
            </style>
          </head>
          <body>
            <div id="output" class="loading">Initializing Python environment...</div>
            <script>
              async function main() {
                try {
                  const pyodide = await loadPyodide();
                  document.getElementById("output").classList.remove("loading");
                  document.getElementById("output").innerHTML = "";
                  
                  // Redirect stdout
                  pyodide.setStdout({ batched: (msg) => {
                    document.getElementById("output").innerText += msg + "\\n";
                  }});

                  await pyodide.runPythonAsync(\`${code.replace(/`/g, '\\`').replace(/\\/g, '\\\\')}\`);
                } catch (err) {
                  document.getElementById("output").innerText = "Error: " + err;
                }
              }
              main();
            </script>
          </body>
        </html>
      `;
        } else {
            return code;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">

            {/* Header */}
            <div className="bg-slate-900 p-4 border-b border-slate-700 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    {courseName.toUpperCase()} Live Editor
                </h1>
                <div className="flex items-center gap-4">
                    {/* AI Feedback Badge */}
                    <div className={`text-xs px-3 py-1 rounded-full flex items-center gap-2 transition-colors ${isAnalyzing ? "bg-yellow-500/20 text-yellow-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${isAnalyzing ? "bg-yellow-400 animate-pulse" : "bg-emerald-400"}`}></div>
                        {isAnalyzing ? "AI Analyzing..." : "AI Monitoring Active"}
                    </div>
                    <div className="text-sm text-slate-400">
                        {isMern ? "React Mode" : isPython ? "Python Mode" : "HTML Mode"}
                    </div>
                </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                {/* Left Pane: Editor & Controls */}
                <div className="w-full md:w-1/2 flex flex-col border-r border-slate-700 bg-slate-900/50">

                    {/* AI & Input Section - Collapsible */}
                    <div className="border-b border-slate-700">
                        {/* Toggle Button */}
                        <button
                            onClick={() => setIsAISectionCollapsed(!isAISectionCollapsed)}
                            className="w-full p-2 bg-slate-800/50 hover:bg-slate-800 text-left text-xs font-medium text-slate-400 uppercase tracking-wider flex justify-between items-center transition-colors"
                        >
                            <span>🤖 AI Assistant</span>
                            <span className="text-slate-500">{isAISectionCollapsed ? '▼ Expand' : '▲ Collapse'}</span>
                        </button>

                        {!isAISectionCollapsed && (
                            <div className="p-4 space-y-4 overflow-y-auto max-h-[40vh]">
                                <div>
                                    <label className="block text-xs font-medium mb-1 text-slate-400 uppercase tracking-wider">
                                        Project Goal
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={projectIdea}
                                            onChange={(e) => setProjectIdea(e.target.value)}
                                            placeholder="e.g., A calculator app"
                                            className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={getAIGuidance}
                                            disabled={isThinking}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors"
                                        >
                                            {isThinking ? "..." : "Ask AI"}
                                        </button>
                                    </div>
                                </div>

                                {/* AI Feedback Display */}
                                {aiFeedback && (
                                    <div className="bg-slate-800/80 rounded-md p-3 border border-blue-500/30 shadow-lg shadow-blue-500/10 animate-in fade-in slide-in-from-top-2">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="text-xs font-bold text-blue-400 uppercase">AI Code Review</h3>
                                            <span className="text-[10px] text-slate-500">Just now</span>
                                        </div>
                                        <p className="text-sm text-slate-200">{aiFeedback}</p>
                                    </div>
                                )}

                                {aiGuidance && (
                                    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                                        <h3 className="text-xs font-bold text-emerald-400 mb-2 uppercase">AI Guidance</h3>
                                        <div className="text-sm text-slate-300 whitespace-pre-wrap max-h-40 overflow-y-auto custom-scrollbar">
                                            {aiGuidance}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Code Editor */}
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 text-xs text-slate-400 font-mono">
                            {isMern ? "App.js" : isPython ? "main.py" : "index.html"}
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Type your code here..."
                            className="flex-1 w-full p-4 bg-slate-950 font-mono text-sm focus:outline-none resize-none"
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* Right Pane: Preview */}
                <div className="w-full md:w-1/2 bg-white flex flex-col">
                    <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 text-xs text-slate-500 font-medium flex justify-between">
                        <span>{isPython ? "Console Output" : "Browser Preview"}</span>
                        <span className="text-slate-400">Live</span>
                    </div>
                    <iframe
                        srcDoc={getSrcDoc()}
                        title="preview"
                        className="flex-1 w-full h-full border-none"
                        sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                    />
                </div>

            </div>
        </div>
    );
}
