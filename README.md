# Chiacon AI Solutions Website

An AI backed user-friendly Webpage for businesses for positive transformation with AI implied ideas and utilization

## How It Works

The site has two main parts:

1. Static showcase — Three AI use case cards (Automated Reporting, Concise CV, Predictive Analytics) that highlight real-world AI applications for enterprise teams.

2. AI Use Case Generator — An interactive demo where users describe a business problem and receive a structured AI-generated response including a problem summary, 2–3 AI opportunities, and expected business impact. The input is sent to the backend, which calls the OpenAI API and streams the result back to the frontend.

## Tech Stack

| Layer | Technology |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS,|
| Animations | Framer Motion |
| Backend | Node.js, Express |
| AI | Groq API (llama-3.3-70b-versatile) |

## Deployment

The application is deployed on the free tier of Render. To ensure continuous availability, the service is monitored using UptimeRobot, which periodically pings the application to keep it active and also records uptime and downtime statistics.