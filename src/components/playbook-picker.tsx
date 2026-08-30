"use client";

import { useState } from "react";
import { PromptCard } from "@/components/prompt-card";
import { PLAYBOOKS } from "@/lib/playbooks";
import { cn } from "@/lib/utils";

export function PlaybookPicker() {
  const [slug, setSlug] = useState<(typeof PLAYBOOKS)[number]["slug"]>(PLAYBOOKS[0].slug);
  const item = PLAYBOOKS.find((entry) => entry.slug === slug) ?? PLAYBOOKS[0];

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-1" role="tablist" aria-label="役割">
        {PLAYBOOKS.map((entry) => {
          const active = entry.slug === item.slug;
          return (
            <button
              key={entry.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSlug(entry.slug)}
              className={cn(
                "rounded-md border px-2.5 py-1.5 text-sm transition-colors",
                active
                  ? "border-border bg-secondary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {entry.title}
            </button>
          );
        })}
      </div>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-card/60 p-4">
            <p className="font-mono text-[11px] tracking-widest text-primary uppercase">Owns</p>
            <p className="mt-2 text-sm leading-7">{item.owns}</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/60 p-4">
            <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
              Connect
            </p>
            <p className="mt-2 text-sm leading-7">{item.connect}</p>
          </div>
        </div>
        <PromptCard title="最初の依頼" prompt={item.prompt} />
      </div>
    </div>
  );
}
