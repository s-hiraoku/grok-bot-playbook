import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";

export function PromptCard({
  title,
  hint,
  prompt,
  tag,
}: {
  title: string;
  hint?: string;
  prompt: string;
  tag?: string;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-border/80 bg-card/80">
      <div className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-heading text-lg">{title}</h3>
            {tag ? (
              <Badge variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ) : null}
          </div>
          {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
        </div>
        <CopyButton text={prompt} />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-7 text-paper/90 whitespace-pre-wrap">
        {prompt}
      </pre>
    </article>
  );
}
