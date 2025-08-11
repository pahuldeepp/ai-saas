AI-SaaS

AI-powered SaaS starter built with Next.js and TypeScript. Clean structure, API routes ready for AI providers, and an easy path to add auth, billing, and dashboards.

    Status: scaffolded and ready to extend. Works locally with npm run dev.

✨ Features

    Next.js App Router with TypeScript

    API route handlers for server-side AI calls (add providers in /src/lib/ai)

    Ready for Tailwind & shadcn/ui (optional)

    Opinionated project structure for scalable features

    First-class deployment to Vercel (or Docker)

🧱 Tech Stack

    Frontend: Next.js, React, TypeScript

    Styling: CSS Modules or Tailwind (optional)

    Server: Next.js Route Handlers / Server Actions

    Tooling: ESLint, PostCSS, pnpm/npm/yarn (pick one)

🚀 Getting Started

# clone
git clone https://github.com/pahuldeepp/ai-saas.git
cd ai-saas

# install
npm install
# or: pnpm install / yarn

# dev
npm run dev
# open http://localhost:3000

# production
npm run build
npm start

🔐 Environment Variables

Create .env.local in the project root:

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Providers (add what you use)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=...
REPLICATE_API_TOKEN=...

# Billing (if using Stripe)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database (if using Prisma/SQL)
DATABASE_URL=postgres://...

    Add the same keys to your hosting provider (e.g., Vercel → Settings → Environment Variables).

🗂 Project Structure

ai-saas/
├─ public/                 # Static assets (icons, og images, robots)
├─ src/
│  ├─ app/                 # Routes (App Router)
│  │  ├─ layout.tsx
│  │  └─ page.tsx          # Landing / Home
│  ├─ components/          # Reusable UI
│  ├─ lib/
│  │  ├─ ai/               # Provider SDK wrappers (OpenAI, etc.)
│  │  └─ utils/            # Helpers
│  ├─ styles/              # Global styles (if not Tailwind)
│  └─ app/api/             # Route handlers (e.g., /api/chat)
├─ eslint.config.mjs
├─ next.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ package.json

🧠 Adding AI Features

    Create a route handler: src/app/api/chat/route.ts

    Call your provider via a tiny wrapper in src/lib/ai/openai.ts (or similar)

    Stream or return JSON to the client component

    Add UI in src/components/Chat.tsx and a page to mount it

    Keep provider keys server-side; never expose secrets to the browser.

🎨 UI & Styling

    Tailwind:

        npm i -D tailwindcss postcss autoprefixer

        npx tailwindcss init -p

        Import globals.css in src/app/layout.tsx

    shadcn/ui (optional): add components.json, run CLI to scaffold components.

✅ Quality

    Lint: npm run lint

    Type-safe: prefer strict types in components & API handlers

    Conventional commits: feat:, fix:, chore:, refactor:

☁️ Deployment
Vercel (recommended)

    Push to GitHub

    Import the repo in Vercel

    Set env vars → Deploy

    (If using Next/Image with remote sources) whitelist domains in next.config.ts

Docker (optional)

Create Dockerfile:

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]

Build & run:

docker build -t ai-saas .
docker run -p 3000:3000 --env-file .env.local ai-saas

🛠 Scripts
Script	Description
dev	Start Next.js in dev mode
build	Production build
start	Run built app
lint	Lint the codebase
🗺 Roadmap (suggested)

Tailwind + shadcn/ui base layout

Auth (NextAuth/Clerk/Auth0)

Chat with AI (streaming)

Stripe subscriptions + usage metering

File storage (S3/R2) for prompts/outputs

Observability (Sentry/PostHog), rate limits

    CI (lint, type-check) + Preview deployments

🤝 Contributing

    Fork the repo

    Create a branch: git checkout -b feat/my-change

    Commit: git commit -m "feat: add my-change"

    Push & open a PR

📄 License

MIT. See LICENSE.
