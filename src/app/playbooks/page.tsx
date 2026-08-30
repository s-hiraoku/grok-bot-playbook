import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PlaybookPicker } from "@/components/playbook-picker";

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

      <PlaybookPicker />
    </div>
  );
}
