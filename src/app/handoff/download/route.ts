import { SKILL_MARKDOWN } from "@/lib/handoff";

export function GET() {
  return new Response(SKILL_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="grok-bot-operating-skill.md"',
      "Cache-Control": "no-store",
    },
  });
}
