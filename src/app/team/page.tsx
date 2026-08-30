import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "チーム編成",
};

const RULES = [
  {
    t: "最初は1体",
    d: "エンドツーエンドの成果を1つ持たせる。名簿の上限は50（Botとグループ合計）だが、目標ではない。",
  },
  {
    t: "割れたら足す",
    d: "目的、ソース、文体、承認境界、スケジュールのどれかが安定して違うときだけ、次の専門家を作る。",
  },
  {
    t: "Chief of Staffは後",
    d: "専門家が複数いて、受け渡し自体が見える必要があるときに置く。1つの曖昧な仕事に調整役は不要。",
  },
  {
    t: "グループは受け渡し用",
    d: "Web公開グループなら、進行役・編集・数値確認のように所有を分ける。判断だけ人間に返す。",
  },
];

export default function TeamPage() {
  return (
    <div>
      <PageHeader
        kicker="06 / Roster"
        title="少人数の専門チーム。組織図のコピーではない。"
        lede="社内では調整役の下に受信箱、経費、採用、バグ再現を置く使い方が広がった。それは専門家が先にあって成立する。肩書きから作らない。"
      />

      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {RULES.map((item) => (
          <article key={item.t} className="rounded-xl border border-border/70 bg-card/60 p-5">
            <h2 className="font-heading text-xl">{item.t}</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.d}</p>
          </article>
        ))}
      </div>

      <section className="rounded-2xl border border-border/70 bg-card/50 p-6">
        <h2 className="font-heading text-2xl">共有コンピュータの実務</h2>
        <p className="mt-3 leading-8 text-muted-foreground">
          各Botは自分の画面を持つ。並行作業はできる。ただしクッキー、
          <code className="mx-1 font-mono text-primary">/workspace</code>
          のファイル、CLI資格情報は共有。あるBotが保存した調査を、別Botが続けられるのは利点であり、隔離ではない。
        </p>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
          <li>プロジェクトファイルは <code className="font-mono text-primary">/workspace</code> に、名前の分かるフォルダで置く。</li>
          <li>一時ディレクトリや手インストールのパッケージは消える前提。</li>
          <li>あるBotに見せたくない資格情報は、そのコンピュータに置かない。</li>
          <li>複製は同じ役割を別スコープへ広げるとき（地域ごとなど）。会話履歴と学習記憶はコピーされない。</li>
          <li>共有リンクは公開。APIキー、社内URL、顧客データを説明文に残したまま共有しない。</li>
        </ul>
      </section>
    </div>
  );
}
