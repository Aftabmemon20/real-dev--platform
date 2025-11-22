# Deployment Guide

Follow these steps to deploy your Real Developers Platform to the web.

## 1. Push to GitHub

Since you have a local git repository, you need to push it to GitHub.

1.  **Create a Repository**:
    - Go to [GitHub.com](https://github.com/new).
    - Create a new repository named `real-dev-platform`.
    - **Do not** initialize with README, .gitignore, or license (you already have them).

2.  **Push Code**:
    - Open your terminal in the project folder.
    - Run these commands (replace `YOUR_USERNAME` with your actual GitHub username):
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/real-dev-platform.git
    git branch -M main
    git push -u origin main
    ```

## 2. Deploy on Vercel

1.  **Import Project**:
    - Go to [Vercel Dashboard](https://vercel.com/dashboard).
    - Click **"Add New..."** -> **"Project"**.
    - Select your `real-dev-platform` repository and click **"Import"**.

2.  **Configure Environment Variables**:
    - **Crucial Step**: In the "Configure Project" screen, look for **"Environment Variables"**.
    - Add a new variable:
        - **Key**: `NEXT_PUBLIC_GEMINI_API_KEY`
        - **Value**: `YOUR_GEMINI_API_KEY_HERE` (Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey))
    - Click **"Add"**.

3.  **Deploy**:
    - Click **"Deploy"**.
    - Wait for a minute. Vercel will build your site and give you a live URL (e.g., `https://real-dev-platform.vercel.app`).

## 3. Verify

- Visit your new URL.
- Go to the MERN or Python course.
- Try the "Ask AI" feature to ensure the API key is working correctly.
