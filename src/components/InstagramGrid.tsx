import { businessConfig } from '../config/business';
import { Instagram } from './icons';

const img = (id: string) => `https://images.unsplash.com/${id}?w=500&q=80&auto=format&fit=crop`;

const shots = [
  img('photo-1568901346375-23c9450c58cd'),
  img('photo-1541592106381-b31e9677c0e5'),
  img('photo-1571091718767-18b5b1457add'),
  img('photo-1608270586620-248524c67de9'),
  img('photo-1550547660-d9450f859349'),
  img('photo-1606313564200-e75d5e30476c'),
  img('photo-1594212699903-ec8a3eca50f5'),
  img('photo-1573080496219-bb080dd4f877'),
  img('photo-1586190848861-99aa4a171e90'),
];

export default function InstagramGrid() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {shots.map((src, i) => (
          <a
            key={i}
            href={businessConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden rounded-lg sm:rounded-xl"
          >
            <img
              src={src}
              alt="Publicación de Instagram"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors group-hover:bg-ink/40">
              <Instagram className="h-6 w-6 text-cream opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
      <div className="mt-6 text-center">
        <a
          href={businessConfig.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-bold text-cream transition-colors hover:border-ember hover:text-ember"
        >
          <Instagram className="h-4 w-4" /> Seguinos {businessConfig.instagramHandle}
        </a>
      </div>
    </div>
  );
}
