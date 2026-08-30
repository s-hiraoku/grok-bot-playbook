export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-primary uppercase">
        {kicker}
      </p>
      <h1 className="font-heading text-3xl leading-tight tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">{lede}</p>
    </header>
  );
}
