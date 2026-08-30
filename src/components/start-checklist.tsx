"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "grok-bot-playbook:start-checklist";

const STEPS = [
  {
    id: "plan",
    title: "対象プランとPrivacyを確認する",
    body: "SuperGrok Plus / Heavy、Cursor Pro+ / Ultra、Teams Standard / Premium。Legacy Privacy Modeは使えない。クラウド保存が前提。",
  },
  {
    id: "app",
    title: "デスクトップアプリを入れる",
    body: "macOS（Apple silicon / Intel）か Windows（x64 / Arm64）。iPhoneは監督用。Linuxデスクトップクライアントはない。",
  },
  {
    id: "job",
    title: "読み取りと下書きだけの仕事を1件決める",
    body: "週次ダイジェスト、送信者調査、経費の例外洗い出し、ステージングでのバグ再現。外に出す行為は後回し。",
  },
  {
    id: "contract",
    title: "役割契約を先に書く",
    body: "仕事、ソース、成果物、証拠、承認、データが無いときの返答。コネクタを足す前に文章にする。",
  },
  {
    id: "tools",
    title: "最小の道具だけつなぐ",
    body: "Settings → Plugins。あるならコネクタを優先し、無いときだけブラウザ。管理者アカウントではなくスコープの狭いID。",
  },
  {
    id: "approve",
    title: "承認境界を置く",
    body: "送信、公開、課金、削除、権限変更、本番変更。ローカル実行は原則 Never allowed。",
  },
  {
    id: "review",
    title: "証拠を見て直す。自動化はまだしない",
    body: "リンク、時刻、変更ファイル、不確実な点を要求する。Stop nowは未来を止めるだけで、済んだ操作は戻らない。",
  },
];

const STEP_IDS = new Set(STEPS.map((step) => step.id));

function readStoredDone(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (id): id is string => typeof id === "string" && STEP_IDS.has(id),
    );
  } catch {
    return [];
  }
}

const checklistListeners = new Set<() => void>();

function subscribeToChecklist(onStoreChange: () => void) {
  checklistListeners.add(onStoreChange);
  return () => {
    checklistListeners.delete(onStoreChange);
  };
}

function writeStoredDone(done: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    checklistListeners.forEach((listener) => listener());
  } catch {
    // Ignore quota or private-mode write failures.
  }
}

export function StartChecklist() {
  const done = useSyncExternalStore(subscribeToChecklist, readStoredDone, () => []);

  function toggle(id: string) {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    writeStoredDone(next);
  }

  const progress = Math.round((done.length / STEPS.length) * 100);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-widest text-primary uppercase">
          {done.length} / {STEPS.length} 完了
        </p>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <ol className="space-y-3">
        {STEPS.map((step, index) => {
          const checked = done.includes(step.id);
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => toggle(step.id)}
                aria-pressed={checked}
                className={`flex w-full cursor-pointer gap-4 rounded-xl border p-4 text-left transition-colors ${
                  checked
                    ? "border-primary/30 bg-primary/8"
                    : "border-border/70 bg-card/50 hover:bg-secondary/40"
                }`}
              >
                <span
                  aria-hidden
                  className={`mt-1 flex size-4 shrink-0 items-center justify-center rounded-[4px] border ${
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input"
                  }`}
                >
                  {checked ? "✓" : ""}
                </span>
                <div>
                  <p className="font-mono text-[11px] text-primary">0{index + 1}</p>
                  <h3 className="font-heading mt-1 text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.body}</p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
