# 🚀 Real-time Code Editor Platform

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)

A modern, AI-powered real-time code editor with live preview capabilities for **MERN**, **Python**, and **HTML/CSS/JS** development. Built with Next.js 16 and powered by Google's Gemini AI for intelligent code assistance.

## ✨ Features

- **🔴 Live Preview**: See your code changes instantly in the browser
- **🤖 AI Code Review**: Real-time code analysis and feedback powered by Gemini AI
- **💡 AI Guidance**: Get step-by-step project guidance from an AI mentor
- **🌐 Multi-Language Support**: 
  - React/MERN stack with live JSX compilation
  - Python with Pyodide (browser-based Python runtime)
  - HTML/CSS/JavaScript
- **⚡ Hot Reload**: Instant updates as you type (debounced for performance)
- **🎨 Modern UI**: Dark theme with Tailwind CSS
- **📱 Responsive Design**: Works seamlessly on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.3 (with Turbopack)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini 2.5 Flash
- **Code Execution**:
  - React: Babel Standalone + UMD builds
  - Python: Pyodide v0.25.0
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aftabmemon20/real-dev--platform.git
   cd real-dev-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Choose Your Course
Navigate to one of the available courses:
- `/course/mern` - MERN Stack Development
- `/course/python` - Python Programming
- `/course/html-css-js` - Web Development Basics

### Write Code
Use the built-in editor to write your code. The preview updates automatically!

### Get AI Assistance
1. Enter your project idea in the "Project Goal" field
2. Click "Ask AI" to get personalized guidance
3. The AI will monitor your code in real-time and provide feedback

## 🌐 Live Demo

🔗 **[View Live Demo](https://real-dev--platform.vercel.app)** *(Deploy to Vercel to get your live URL)*

## 📁 Project Structure

```
real-dev-platform/
├── app/
│   ├── _components/
│   │   ├── LiveEditor.js      # Main editor component
│   │   └── Editor0.js          # Alternative editor
│   ├── course/
│   │   └── [courseName]/
│   │       └── page.js         # Dynamic course pages
│   ├── layout.js
│   └── page.js                 # Home page
├── public/
├── .env.local                  # Environment variables (not committed)
├── next.config.mjs
└── package.json
```

## 🔐 Security

- ✅ API keys are stored in `.env.local` (gitignored)
- ✅ Environment variables are properly prefixed with `NEXT_PUBLIC_`
- ✅ Sandboxed iframe execution for code preview

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Aftab Memon**
- GitHub: [@Aftabmemon20](https://github.com/Aftabmemon20)

## 🙏 Acknowledgments

- Google Gemini AI for intelligent code assistance
- Next.js team for the amazing framework
- Pyodide team for browser-based Python execution
- React and Babel teams for client-side JSX compilation

---

<div align="center">
  <p>Built with ❤️ using Next.js and Google Gemini AI</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
