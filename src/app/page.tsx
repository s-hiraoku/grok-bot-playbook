import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PRINCIPLES = [
  {
    n: "01",
    title: "同僚として渡す。プロンプトとして投げない",
    body: "Grok Botはチャットの延長ではない。名前のある担当者が、自分のクラウドコンピュータで仕事を完了し、必要なときだけ承認を求めて戻ってくる。聞きたいことを書くより、終わっていてほしい成果を渡す。",
  },
  {
    n: "02",
    title: "万能係は作らない。1体に1成果",
    body: "「何でも屋」は文脈が混ざり、記憶も再利用しにくい。売上調査、経費照合、バグ再現のように、所有する成果物がはっきりした役割だけを置く。次の1体は、仕事が自然に割れたときに足す。",
  },
  {
    n: "03",
    title: "説明文は契約。会話は今回の仕事",
    body: "「外部メールは承認なしで送らない」は説明文へ。「この12アカウントの下書きを作れ」は会話へ。長く残るルールと、今日の依頼を混ぜない。",
  },
  {
    n: "04",
    title: "成功したやり方だけを自動化する",
    body: "1回の安全な仕事 → 結果の修正 → Skill化 → 別入力で再試行 → Routine。最初から毎朝走らせない。Test runは本物の作業をする。",
  },
  {
    n: "05",
    title: "画面は別でも、コンピュータは1台",
    body: "アカウントに割り当てられるLinux VMは1台。ファイル、ブラウザのログイン、CLI資格情報は全Botで共有される。別Botはセキュリティ境界ではない。置いてはいけないものは、置かない。",
  },
];

const MYTHS = [
  ["BotごとにVMがある", "ない。メンバーごとに1台を共有する。"],
  ["別画面なら資格情報は隔離される", "されない。並行作業用の画面にすぎない。"],
  ["クラウドで動くから安全", "境界が変わるだけ。資産はそこに集中する。"],
  ["PluginはそのBot専用", "インストールしたコネクタはアカウント全体。"],
  ["Botを消せばログインも消える", "消えない。サインアウトと取り消しが必要。"],
];

export default function HomePage() {
  return (
    <div>
      <PageHeader
        kicker="01 / Principles"
        title="Grok Botを効かせるには、使い方ではなく渡し方を変える。"
        lede="2026年8月に公開されたGrok Botは、常時稼働するAI同僚です。自分のコンピュータを持ち、使っているアプリに入り、ノートPCを閉じても仕事を続ける。効果はプロンプトの上手さより、役割・境界・承認の設計で決まります。"
      />

      <section className="mb-12 grid gap-4 sm:grid-cols-3">
        {[
          { k: "対象", v: "SuperGrok Plus / Heavy、Cursor Pro+ / Ultra、Teams" },
          { k: "面", v: "macOS・Windows・iPhone。Linuxデスクトップは非対応" },
          { k: "単位", v: "会話ではなく、名前のある担当者とRoutine" },
        ].map((item) => (
          <Card key={item.k} className="bg-card/70">
            <CardHeader className="pb-2">
              <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
                {item.k}
              </p>
              <CardTitle className="text-base leading-7 font-normal">{item.v}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <ol className="mb-14 space-y-5">
        {PRINCIPLES.map((item) => (
          <li
            key={item.n}
            className="grid gap-3 rounded-2xl border border-border/70 bg-card/50 p-5 sm:grid-cols-[72px_1fr] sm:p-6"
          >
            <span className="font-heading text-2xl text-primary">{item.n}</span>
            <div>
              <h2 className="font-heading text-2xl leading-snug">{item.title}</h2>
              <p className="mt-2 leading-8 text-muted-foreground">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <section className="mb-14">
        <h2 className="font-heading mb-4 text-2xl">最初にやること</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/start"
            className="rounded-2xl border border-primary/30 bg-primary/8 p-5 transition-colors hover:bg-primary/12"
          >
            <Badge variant="secondary">推奨</Badge>
            <h3 className="font-heading mt-3 text-xl">最初の30分</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              読み取りと下書きだけの仕事を1件渡す。コネクタは最小、承認は広め。
            </p>
          </Link>
          <Link
            href="/contract"
            className="rounded-2xl border border-border/70 bg-card/60 p-5 transition-colors hover:bg-secondary/60"
          >
            <Badge variant="outline">次</Badge>
            <h3 className="font-heading mt-3 text-xl">役割契約を書く</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              名前、仕事、ソース、成果物、証拠、止まって聞く地点を1枚にする。
            </p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="font-heading mb-4 text-2xl">先に捨てる誤解</h2>
        <div className="overflow-hidden rounded-xl border border-border/70">
          {MYTHS.map(([myth, fact], i) => (
            <div
              key={myth}
              className={`grid gap-2 px-4 py-4 sm:grid-cols-2 ${i ? "border-t border-border/60" : ""}`}
            >
              <p className="text-sm text-destructive/90">× {myth}</p>
              <p className="text-sm text-muted-foreground">○ {fact}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          出典の骨格は
          <a
            className="mx-1 text-primary underline-offset-4 hover:underline"
            href="https://docs.x.ai/grok-bot/get-started"
            target="_blank"
            rel="noreferrer"
          >
            公式ドキュメント
          </a>
          と
          <a
            className="mx-1 text-primary underline-offset-4 hover:underline"
            href="https://x.ai/news/introducing-grok-bot"
            target="_blank"
            rel="noreferrer"
          >
            発表記事
          </a>
          。プランやトリガーは変わるので、手元の画面を正とする。
        </p>
      </section>
    </div>
  );
}
