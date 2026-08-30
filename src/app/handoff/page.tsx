import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CopyButton } from "@/components/copy-button";
import {
  BOT_DESCRIPTION,
  INSTALL_MESSAGE,
  PROFILE_MESSAGE,
  SKILL_NAME,
} from "@/lib/handoff";

export const metadata: Metadata = {
  title: "Grok Botに渡す",
};

const STEPS = [
  {
    n: "01",
    title: "Botを1体作る",
    body: "Grok Botアプリで New → Create new agent。名前は「運用係」でよい。万能係にしない。",
  },
  {
    n: "02",
    title: "説明文に役割契約を貼る",
    body: "Bot actions → Edit Profile。下の「役割契約」を説明文へ。長く残るルールはここだけに置く。",
  },
  {
    n: "03",
    title: "保存依頼を会話に貼る",
    body: "同じBotの会話に「保存依頼」を貼る。ファイルを添付するなら、下のSkillファイルを添付してから送る。",
  },
  {
    n: "04",
    title: "Skillが見えるか確認する",
    body: "作曲バーで / を打つ。無ければ Settings → Plugins → Yours でこのBotに有効化する。Routineはまだ作らない。",
  },
];

export default function HandoffPage() {
  return (
    <div>
      <PageHeader
        kicker="09 / Handoff"
        title="この手帳を、Grok Bot自身のSkillにする。"
        lede="こちらからあなたのGrok Botへ直接は送れません。アプリに貼るか、ファイルを添付する。説明文は契約、会話は保存依頼、という分け方のまま渡す。"
      />

      <ol className="mb-10 space-y-3">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="grid gap-2 rounded-xl border border-border/70 bg-card/60 p-5 sm:grid-cols-[56px_1fr]"
          >
            <span className="font-heading text-xl text-primary">{step.n}</span>
            <div>
              <h2 className="font-heading text-xl">{step.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="space-y-6">
        <HandoffBlock
          kicker="A"
          title="役割契約"
          hint="Edit Profile の説明文へ。会話には貼らない。"
          text={BOT_DESCRIPTION}
          label="役割契約をコピー"
        />
        <HandoffBlock
          kicker="B"
          title="保存依頼"
          hint={`同じBotへの最初のメッセージ。Skill「${SKILL_NAME}」として保存させる。本文にSkill全体を含む。`}
          text={INSTALL_MESSAGE}
          label="保存依頼をコピー"
        />
        <article className="rounded-xl border border-primary/30 bg-primary/8 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
                C / 添付ファイル
              </p>
              <h3 className="font-heading mt-2 text-xl">Skillファイル</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                会話に添付して「このファイルを {SKILL_NAME} として保存して」でもよい。保存依頼（B）だけでも足りる。
              </p>
            </div>
            <a
              href="/handoff/download"
              className="inline-flex h-8 items-center rounded-lg border border-border bg-background px-3 text-sm hover:bg-muted"
            >
              .md をダウンロード
            </a>
          </div>
        </article>
        <HandoffBlock
          kicker="任意"
          title="説明文の更新依頼"
          hint="既存Botの説明文を、会話から書き換えさせたいとき。"
          text={PROFILE_MESSAGE}
          label="更新依頼をコピー"
        />
      </div>
    </div>
  );
}

function HandoffBlock({
  kicker,
  title,
  hint,
  text,
  label,
}: {
  kicker: string;
  title: string;
  hint: string;
  text: string;
  label: string;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-border/80 bg-card/80">
      <div className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3">
        <div>
          <p className="font-mono text-[11px] text-primary">{kicker}</p>
          <h3 className="font-heading mt-1 text-lg">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
        </div>
        <CopyButton text={text} label={label} />
      </div>
      <pre className="max-h-[28rem] overflow-auto p-4 font-mono text-[13px] leading-7 whitespace-pre-wrap text-paper/90">
        {text}
      </pre>
    </article>
  );
}
