import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PromptCard } from "@/components/prompt-card";
import { PLAYBOOKS } from "@/lib/playbooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "役割別例",
};

export default function PlaybooksPage() {
  return (
    <div>
      <PageHeader
        kicker="08 / Playbooks"
        title="役割は質問の箱ではなく、繰り返せる成果の所有者。"
        lede="公式ユースケースを、すぐ貼れる日本語の初回依頼にしたもの。どれも読み取りと下書きで止めている。外に出す操作は、結果が安定してから承認の後ろに足す。"
      />

      <Tabs defaultValue={PLAYBOOKS[0].slug}>
        <TabsList variant="line" className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          {PLAYBOOKS.map((item) => (
            <TabsTrigger
              key={item.slug}
              value={item.slug}
              className="rounded-md border border-transparent data-active:border-border data-active:bg-secondary"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {PLAYBOOKS.map((item) => (
          <TabsContent key={item.slug} value={item.slug} className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border/70 bg-card/60 p-4">
                <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
                  Owns
                </p>
                <p className="mt-2 text-sm leading-7">{item.owns}</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/60 p-4">
                <p className="font-mono text-[11px] tracking-widest text-primary uppercase">
                  Connect
                </p>
                <p className="mt-2 text-sm leading-7">{item.connect}</p>
              </div>
            </div>
            <PromptCard title="最初の依頼" prompt={item.prompt} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
