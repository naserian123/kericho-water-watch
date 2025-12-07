Kericho Water Watch 🚰🌍

A reporting platform for water-related issues in Kericho County — built with React + TypeScript + Vite + Supabase, featuring a clean UI, analytics dashboard, and an interactive map.

Live Deployment:
🔗 https://kericho-water-watch-bcsm.vercel.app/

🌟 Overview

Kericho Water Watch is a web application designed to help citizens report water issues such as pipe bursts, leakages, shortages, and contamination.
The platform enables:

📍 Users to submit reports with location data

🗺️ Interactive map visualization of all reports

🧑‍💼 Admin dashboard to review, manage, and filter reports

📊 Analytics overview (e.g., number of issues, status tracking)

☁️ Real-time backend powered by Supabase

The platform is optimized for community usage and scalable deployment on Vercel.

🚀 Features
User-Facing

Submit water issue reports

View all reports on an interactive map

See issue types & descriptions

Clean mobile-responsive interface

Admin Dashboard

View all reports in a table

View details via ReportDetails

Filter & manage reports

Export reports (CSV / JSON)

Map and list synchronization

Technical Architecture

Frontend: React + TypeScript + Vite

Backend: Supabase (PostgreSQL + Auth + REST)

Deployment: Vercel

Map Integration: (e.g., Leaflet or similar based on your code)

🛠️ Tech Stack
Category	Technology Used
Frontend	React, TypeScript, Vite
Styling	Tailwind CSS
Backend	Supabase (DB + API + Auth)
Deployment	Vercel
State Mgmt	React Hooks
Maps	(Your chosen map library used in the code — Leaflet/Mapbox/etc.)
📁 Project Structure
src/
│
├── components/
│   ├── ReportDetails.tsx
│   ├── ReportList.tsx
│
├── pages/
│   ├── Report.tsx
│   ├── AdminDashboard.tsx
│
├── App.tsx
├── main.tsx
├── index.css
│
└── supabaseClient.ts       // Supabase configuration

🔧 Environment Variables

To run locally or deploy, ensure you add:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

For Vercel Deployment

Go to Project Settings → Environment Variables

Add:

VITE_SUPABASE_URL

VITE_SUPABASE_ANON_KEY

Redeploy project

⚙️ Installation & Setup
1. Clone repo
git clone https://github.com/your-username/kericho-water-watch.git
cd kericho-water-watch

2. Install dependencies
npm install

3. Setup environment variables

Create .env file:

VITE_SUPABASE_URL=xxxx
VITE_SUPABASE_ANON_KEY=xxxx

4. Run locally
npm run dev

5. Build for production
npm run build

🌐 Deployment

This project is deployed on Vercel.

Steps:

Push to GitHub

Connect repo to Vercel

Add environment variables

Deploy

Your live site is here:
👉 https://kericho-water-watch-bcsm.vercel.app/

📝 Known Issues & Fixes

If the deployed site shows blank content:
✔ Check environment variables in Vercel
✔ Ensure Supabase CORS allows your Vercel domain

If map does not load:
✔ Confirm API keys and map provider setup

If new components don’t show:
✔ Commit and push updated files (ReportDetails.tsx, ReportList.tsx, AdminDashboard.tsx)

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you'd like to improve.

📄 License

This project is licensed under the MIT License.
