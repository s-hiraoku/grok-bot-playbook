"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "コピー",
  className,
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`inline-flex h-8 shrink-0 items-center rounded-lg border border-border bg-background px-2.5 text-sm hover:bg-muted ${className ?? ""}`}
    >
      {copied ? "コピー済み" : label}
    </button>
  );
}
