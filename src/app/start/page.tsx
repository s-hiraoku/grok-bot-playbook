import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PromptCard } from "@/components/prompt-card";
import { StartChecklist } from "@/components/start-checklist";

export const metadata: Metadata = {
  title: "最初の30分",
};

export default function StartPage() {
  return (
    <div>
      <PageHeader
        kicker="02 / First session"
        title="最初の30分は、便利さより境界を取りにいく。"
        lede="全部つなぐ必要はない。低リスクの1仕事で、このBotが証拠つきで戻ってこられるかを見る。うまくいったやり方だけを残す。"
      />

      <StartChecklist />

      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl">5分で終わる最初の依頼</h2>
        <PromptCard
          title="ログイン不要"
          hint="ファイルを添付して、道具を足す前の型を確認する。"
          prompt={`この文書を5点で要約してください。日付、決定事項、未解決の問いを別セクションに分け、それぞれ出典のページか節を書いてください。元ファイルは変更しないでください。`}
        />
        <PromptCard
          title="道具を1つ使う"
          hint="ログインが必要なら、チャットにパスワードを書かせずテイクオーバーする。"
          prompt={`分析ダッシュボードを開き、今週の新規ユーザー活性化を直近4週と比べてください。ステップ単位でいちばん大きい変化を特定し、関連チャートへのリンク付きで短い調査計画を下書きしてください。ダッシュボードは変更しないでください。ログインが必要なら知らせてください。`}
        />
      </section>
    </div>
  );
}
