import type { Metadata } from "next";
import { ContractBuilder } from "@/components/contract-builder";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "役割契約",
};

const BAD = [
  "優秀なオペレーション担当になって",
  "全部見て、大事なことを教えて",
  "うまくやっておいて",
];

const GOOD = [
  "承認済みトラッカーの5案件だけを監視する",
  "リンクされたチャネルと課題ボード以外は見ない",
  "実質的な変化だけを、ソースリンクと時刻つきで返す",
  "メッセージ送信、チケット編集、案件追加は承認が必要",
  "ソースに入れないときは推測せず欠測を報告する",
];

export default function ContractPage() {
  return (
    <div>
      <PageHeader
        kicker="03 / Role contract"
        title="Botの説明文は、肩書きではなく契約書。"
        lede="説明文に書くのは、仕事・ソース・成果物・証拠・承認・失敗時の振る舞い。会話に書くのは、今日の対象。この分離ができると、Botは仕事を重ねるほど鋭くなる。"
      />

      <section className="mb-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-destructive/30 bg-destructive/8 p-5">
          <p className="font-mono text-[11px] tracking-widest text-destructive uppercase">弱い</p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {BAD.map((item) => (
              <li key={item}>× {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/8 p-5">
          <p className="font-mono text-[11px] tracking-widest text-primary uppercase">使える</p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
            {GOOD.map((item) => (
              <li key={item}>○ {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <ContractBuilder />
    </div>
  );
}
