import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PromptCard } from "@/components/prompt-card";

export const metadata: Metadata = {
  title: "承認と境界",
};

const MUST_APPROVE = [
  "外部メッセージと招待",
  "公開",
  "購入と送金",
  "削除と上書き",
  "権限変更",
  "本番変更",
  "利用規約への同意",
];

const OFFBOARD = [
  "関係するRoutineを止めるか消す",
  "共有コンピュータ上のサイトからサインアウトする",
  "コネクタを外し、元サービス側の認可も取り消す",
  "/workspace から機微なファイルを消す",
  "Botを隠すか削除する",
  "アクセスが本当に切れたかを元システムで確認する",
];

export default function SafetyPage() {
  return (
    <div>
      <PageHeader
        kicker="07 / Boundaries"
        title="承認はブレーキではない。仕事の切れ目。"
        lede="承認はこれから行う操作を止める。済んだ操作は戻らない。パスワードやワンタイムコードはチャットに書かない。コンピュータを乗っ取って、自分で入力する。"
      />

      <section className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/70 bg-card/60 p-5">
          <h2 className="font-heading text-xl">必ず後ろに置く操作</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {MUST_APPROVE.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border/70 bg-card/60 p-5">
          <h2 className="font-heading text-xl">Auto Review</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Settings → General → Auto-review。Require Approval は常に止まる。Always Allow は、自動レビューが他の停止理由を見ないときだけ通る。両方に当たれば Require Approval が勝つ。「ブラウザは全部許可」は書かない。
          </p>
        </div>
      </section>

      <PromptCard
        title="説明文に置く境界"
        prompt={`外部メール、公開、削除、課金、権限変更、本番システムの変更は、現行値・提案値・影響を見せたあとで承認を求めてください。パスワード、パスキー、二要素、CAPTCHA、支払いはコンピュータのテイクオーバーに回してください。チャットに秘密を書かないでください。`}
      />

      <section className="mt-8 rounded-xl border border-border/70 bg-card/50 p-5">
        <h2 className="font-heading text-xl">自分のPCは別物</h2>
        <p className="mt-3 text-sm leading-8 text-muted-foreground">
          クラウドコンピュータと手元の Mac / Windows は別。ローカル実行は Settings → General → Agent → Execution on Local Computer。既定は毎回確認。理由が無いなら Never allowed。この設定はクラウド側の作業を止めない。
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-border/70 bg-card/50 p-5">
        <h2 className="font-heading text-xl">終わらせ方</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          Bot削除は、プロファイルと会話とRoutineを消す。共有コンピュータ上のファイルとログインは残ることがある。
        </p>
        <ol className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
          {OFFBOARD.map((item, i) => (
            <li key={item}>
              <span className="mr-2 font-mono text-primary">0{i + 1}</span>
              {item}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
