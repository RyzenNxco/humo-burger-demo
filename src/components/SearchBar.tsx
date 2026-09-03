import { Search } from './icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-cream-dim" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="¿Qué tenés ganas de comer?"
        className="w-full rounded-full border border-line bg-ink-card py-3.5 pl-11 pr-4 text-sm text-cream placeholder:text-cream-dim/60 focus:border-ember focus:outline-none"
      />
    </div>
  );
}
