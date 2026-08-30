# Grok Bot Playbook

A field playbook for running **Grok Bot** as an always-on AI colleague — from role contracts and request templates to Skills, Routines, and approval boundaries.

It assumes you treat Grok Bot as a named teammate you hand work to, not as an extension of chat, and automate only workflows that have already succeeded once.

## What it covers

- Five principles and common misconceptions to drop early
- A first-30-minutes checklist (saved in the browser)
- Role contract (Bot description) builder with copy-to-clipboard
- The five-part request template and ready-to-use prompts
- How to move from Skills to Routines to event triggers
- Small-team setup and shared-computer boundaries
- First requests based on official use cases (localized in Japanese in the app)
- Handoff pack for Grok Bot: role contract, Skill save request, and attachable `.md` files

The structure follows the [official Grok Bot documentation](https://docs.x.ai/grok-bot/get-started) and the [announcement post](https://x.ai/news/introducing-grok-bot). Plans, triggers, and UI change over time — treat your local app as the source of truth.

## Run it

Requirements: Node.js 20 or later

```bash
npm install
npm run build
npm start
```

Open [http://127.0.0.1:43173](http://127.0.0.1:43173) in your browser. For development, `npm run dev` (webpack) also works.

## Out of scope

This is not a replacement for Grok Bot itself. Account creation, billing, and connector authorization happen in the official app. For Enterprise terms and current pricing, check the Cursor / SuperGrok UI.
