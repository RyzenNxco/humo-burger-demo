interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">{eyebrow}</p>
      )}
      <h2 className="text-display mt-2 text-3xl text-cream sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-2xl text-sm text-cream-dim sm:text-base">{subtitle}</p>}
    </div>
  );
}
