"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-full">
      <div className="grain pointer-events-none fixed inset-0 opacity-[0.07] mix-blend-overlay" />
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link href="/" className="flex items-baseline gap-3">
            <span className="font-heading text-lg tracking-wide text-primary sm:text-xl">
              Grok Bot 手帳
            </span>
            <span className="hidden text-xs tracking-[0.18em] text-muted-foreground uppercase sm:inline">
              Field Playbook
            </span>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          >
            {open ? <X /> : <Menu />}
          </Button>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.filter((item) => item.href !== "/handoff")
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-sm transition-colors",
                    pathname === item.href
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            <Link
              href="/handoff"
              className={cn(
                "rounded-md px-2.5 py-1.5 text-sm",
                pathname === "/handoff"
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/90 text-primary-foreground hover:bg-primary",
              )}
            >
              Grok Botに渡す
            </Link>
          </nav>
        </div>
        {open ? (
          <div className="border-t border-border/70 bg-background/95 px-4 py-3 md:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm",
                    pathname === item.href
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  <span className="mr-2 font-mono text-[10px] text-primary/80">
                    {item.kicker}
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-1">
            <p className="mb-3 px-3 font-mono text-[11px] tracking-[0.2em] text-primary/80 uppercase">
              Contents
            </p>
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-baseline gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                )}
              >
                <span className="font-mono text-[11px] text-primary">{item.kicker}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
