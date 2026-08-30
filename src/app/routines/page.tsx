import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PromptCard } from "@/components/prompt-card";

export const metadata: Metadata = {
  title: "SkillとRoutine",
};

const LADDER = [
  {
    t: "1. 1回の仕事",
    d: "安全な範囲で実データに当てる。結果がレビュー可能になるまで直す。",
  },
  {
    t: "2. Skillにする",
    d: "手順、判断規則、検証、出力、承認を再利用可能な指示にする。全Botから使えるが、コネクタやログインは別。",
  },
  {
    t: "3. 別入力で試す",
    d: "同じ手順が、別の週や別アカウントでも持つかを見る。1例で覚えた例外は足りない。",
  },
  {
    t: "4. Routineにする",
    d: "いつ走るかだけを足す。スケジュール、またはSlack / GitHubなどのイベント。広いリスナーは使わない。",
  },
];

export default function RoutinesPage() {
  return (
    <div>
      <PageHeader
        kicker="05 / Repeatable work"
        title="自動化は才能ではなく、成功した手順の保存。"
        lede="Skillはやり方。Routineはいつ走るか。見せて覚えさせる Teach a task は下書きを作るだけ。例外、失敗、承認はあとから文章で足す。"
      />

      <ol className="mb-10 space-y-3">
        {LADDER.map((item, i) => (
          <li
            key={item.t}
            className="rounded-xl border border-border/70 bg-card/60 p-5"
          >
            <p className="font-mono text-[11px] text-primary">0{i + 1}</p>
            <h2 className="font-heading mt-1 text-xl">{item.t}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.d}</p>
          </li>
        ))}
      </ol>

      <div className="space-y-5">
        <PromptCard
          title="Skillとして保存する"
          tag="Skill"
          prompt={`今使った手順を「Weekly account health」というSkillとして保存してください。ソースシステム、リスクの定義、出力形式、顧客連絡は必ず承認、を含めてください。使うタイミング、必要な入力、検証方法、返すもの、承認が必要な操作も書いてください。`}
        />
        <PromptCard
          title="平日朝のRoutine"
          tag="Routine"
          hint="所有者、タイムゾーン、入力、成果、承認、ソース欠測時を確認させる。"
          prompt={`平日の8:00（Asia/Tokyo）に、Daily customer-risk Skillを現行アカウント一覧へ実行してください。この会話にリンク付きの監視リストを投稿してください。顧客には連絡しないでください。ソースデータが無いときは古いデータで埋めず、失敗を報告してください。`}
        />
        <PromptCard
          title="狭いイベントトリガー"
          tag="Event"
          hint="「新しいメッセージ全部」はノイズと誤作動の元。"
          prompt={`#customer-escalations のメッセージにサポートチケットのリンクと「needs repro」が含まれるとき、チケットを開き、ステージングで再現し、この会話に再現パックを投稿してください。承認なしでSlackへ返信しないでください。`}
        />
      </div>

      <section className="mt-10 rounded-xl border border-border/70 bg-card/50 p-5">
        <h2 className="font-heading text-xl">運用上の数字</h2>
        <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
          <li>1 BotあたりRoutineは最大50。各Routineは直近20件の実行履歴。</li>
          <li>Routineの削除にUndoはない。Botを消すと、そのBotのRoutineも消える。</li>
          <li>サイドバーから隠してもRoutineは止まらない。</li>
          <li>Test runは本物の作業をする。書き込みは承認の後ろに置く。</li>
          <li>Teach a taskは最大10分の画面操作。マイクは録らない。秘密はデモに出さない。</li>
          <li>長い不在のあと、Grok BotはRoutine継続を確認し、返答がなければ止めることがある。</li>
        </ul>
      </section>
    </div>
  );
}
