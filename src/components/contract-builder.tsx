"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";

const DEFAULTS = {
  name: "Piper",
  job: "プロダクト性能の調査",
  sources: "観測ダッシュボード、トレース、該当リリースのPR",
  output: "影響の大きい論点を先頭にした短い報告書。事実と仮説を分ける。",
  evidence: "チャートの直リンク、スクリーンショット、時刻つきの数値",
  approval: "本番設定、アラート、顧客データには触れない。変更が必要なら提案だけ出す。",
  failure: "ソースに入れない、またはデータが古い場合は推測せず欠測を報告する。",
};

const fieldClass =
  "w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function buildContract(v: typeof DEFAULTS) {
  return [
    `名前: ${v.name}`,
    `仕事: ${v.job}を所有する。`,
    `ソース: ${v.sources}だけを見る。許可していないチャネルは広げない。`,
    `成果物: ${v.output}`,
    `証拠: ${v.evidence}を必ず添える。`,
    `境界: ${v.approval}`,
    `失敗: ${v.failure}`,
    `更新される事実は記憶ではなくソースシステムを正とする。`,
  ].join("\n");
}

export function ContractBuilder() {
  const [values, setValues] = useState(DEFAULTS);
  const contract = useMemo(() => buildContract(values), [values]);

  function set<K extends keyof typeof DEFAULTS>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  const fields: { key: keyof typeof DEFAULTS; label: string; hint: string; rows?: number }[] = [
    { key: "name", label: "名前", hint: "呼びやすい短い名前" },
    { key: "job", label: "所有する仕事", hint: "質問の種類ではなく、終わっているべき成果" },
    { key: "sources", label: "見てよいソース", hint: "アプリ、ダッシュボード、フォルダを限定する" },
    { key: "output", label: "返すもの", hint: "形式まで書く", rows: 3 },
    { key: "evidence", label: "必ず添える証拠", hint: "リンク、時刻、差分", rows: 3 },
    { key: "approval", label: "止まって聞く地点", hint: "送信・公開・削除・本番は明示", rows: 3 },
    { key: "failure", label: "データが無いとき", hint: "面白いことを作らせない", rows: 3 },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="mb-1.5 block text-sm">{field.label}</span>
            <span className="mb-2 block text-xs text-muted-foreground">{field.hint}</span>
            {field.rows ? (
              <textarea
                value={values[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                rows={field.rows}
                className={fieldClass}
              />
            ) : (
              <input
                value={values[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                className={`${fieldClass} h-9`}
              />
            )}
          </label>
        ))}
      </div>
      <div className="h-fit lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-xl">Bot説明文</h3>
          <CopyButton text={contract} label="説明文をコピー" />
        </div>
        <pre className="mt-3 overflow-x-auto rounded-xl border border-border/70 bg-card/80 p-4 font-mono text-[13px] leading-7 whitespace-pre-wrap text-paper/90">
          {contract}
        </pre>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          作成後は Bot actions → Edit Profile に貼る。会話では今回の対象だけを指示する。
        </p>
      </div>
    </div>
  );
}
