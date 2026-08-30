import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PromptCard } from "@/components/prompt-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "依頼の型",
};

const PARTS = [
  { n: "成果", d: "何が終わっているべきか。質問ではなく完了状態。" },
  { n: "ソース", d: "見てよいアプリ、サイト、ファイル、会話。" },
  { n: "制約", d: "やってはいけないこと、聞くべきこと。" },
  { n: "成果物", d: "返す形式。箇条書き、表、下書き、再現パック。" },
  { n: "レビュー地点", d: "どこで止まって自分に返すか。" },
];

export default function PromptsPage() {
  return (
    <div>
      <PageHeader
        kicker="04 / Brief"
        title="依頼は5点。上手な文章より、欠けていない文章。"
        lede="Grok Botは長い指示より、完了条件がはっきりした依頼に強い。毎回同じ5点を埋める。安定したら形式の好みを説明文へ移す。"
      />

      <div className="mb-10 grid gap-3 sm:grid-cols-5">
        {PARTS.map((part) => (
          <Card key={part.n} className="bg-card/70">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-lg">{part.n}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              {part.d}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-5">
        <PromptCard
          title="5点セットの空欄"
          tag="型"
          prompt={`成果: （何が終わっているべきか）
ソース: （見てよい場所）
制約: （やってはいけないこと / 聞くこと）
成果物: （形式）
レビュー地点: （どこで止まるか）

データが無い、または古い場合は推測せず欠測を報告してください。
根拠にはソースリンクと時刻を付けてください。`}
        />
        <PromptCard
          title="好みを定着させる"
          hint="うまくいった形式は、その場で説明文へ昇格させる。"
          prompt={`今後の週次報告はこの形式にしてください。5点の箇条書き、出典リンクは文中、最後に「判断が必要なこと」セクション。この形式は役割の説明文にも残してください。`}
        />
        <PromptCard
          title="下書き先行"
          hint="外に出す行為の前に、比較可能な提案を出させる。"
          prompt={`キャンペーンデータを照合し、推奨する予算変更を下書きしてください。キャンペーンは変更せず、代理店にも連絡しないでください。現行値、提案値、見込み影響を見せたあとで承認を求めてください。`}
        />
        <PromptCard
          title="作曲バーの記号"
          hint="道具と手順を会話に結びつける。"
          prompt={`@ で Bot、グループ、Routine、コネクタを指す。
/ で保存済みSkillを呼ぶ。
Settings → Plugins → Yours で、今のBotにSkillが見えないときは有効化する。`}
        />
      </div>
    </div>
  );
}
