import { useNavigate } from 'react-router-dom';
import type { Branch } from '../types';
import { isBranchOpenNow } from '../utils/hours';
import { MapPin, Clock, WhatsApp } from './icons';

export default function BranchCard({ branch }: { branch: Branch }) {
  const navigate = useNavigate();
  const open = isBranchOpenNow(branch);

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-ink-card p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-display text-lg text-cream">{branch.name}</h3>
          <p className="text-xs text-cream-dim">{branch.city}</p>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            open ? 'bg-green/15 text-green' : 'bg-red/15 text-red'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${open ? 'bg-green' : 'bg-red'}`} />
          {open ? 'Abierto ahora' : 'Cerrado'}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-cream-dim">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" /> {branch.address}
        </p>
        {branch.hours.map((h) => (
          <p key={h.days} className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <span>{h.days}: {h.time}</span>
          </p>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <a
          href={branch.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-line py-2.5 text-center text-xs font-bold text-cream transition-colors hover:border-ember hover:text-ember"
        >
          Cómo llegar
        </a>
        <button
          onClick={() => navigate('/menu')}
          className="rounded-full ember-gradient py-2.5 text-center text-xs font-bold text-ink"
        >
          Pedir acá
        </button>
      </div>
      <a
        href={`https://wa.me/${branch.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-green/10 py-2.5 text-xs font-bold text-green"
      >
        <WhatsApp className="h-3.5 w-3.5" /> WhatsApp directo
      </a>
    </div>
  );
}
