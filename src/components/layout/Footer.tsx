import { Link } from 'react-router-dom';
import { businessConfig, branches } from '../../config/business';
import { Instagram, WhatsApp, MapPin } from '../icons';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-soft pb-24 pt-14 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full ember-gradient text-ink font-black text-sm">
                D
              </span>
              <span className="text-display text-xl text-cream">{businessConfig.name}</span>
            </div>
            <p className="mt-3 text-sm text-cream-dim">{businessConfig.shortPitch}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={businessConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:border-ember hover:text-ember"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${businessConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream-dim transition-colors hover:border-green hover:text-green"
              >
                <WhatsApp className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-cream">Navegación</h4>
            <ul className="mt-3 space-y-2 text-sm text-cream-dim">
              <li><Link to="/menu" className="hover:text-ember">Menú</Link></li>
              <li><Link to="/promos" className="hover:text-ember">Promociones</Link></li>
              <li><Link to="/combos" className="hover:text-ember">Combos</Link></li>
              <li><Link to="/sucursales" className="hover:text-ember">Sucursales</Link></li>
              <li><Link to="/delivery" className="hover:text-ember">Delivery</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-cream">Nuestros locales</h4>
            <ul className="mt-3 space-y-2 text-sm text-cream-dim">
              {branches.map((b) => (
                <li key={b.id} className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
                  <span>{b.name} — {b.address}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-cream">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-cream-dim">
              <li>{businessConfig.phone}</li>
              <li>{businessConfig.email}</li>
              <li>{businessConfig.instagramHandle}</li>
            </ul>
            <Link
              to="/admin"
              className="mt-4 inline-block text-xs text-cream-dim/60 hover:text-cream-dim"
            >
              Panel administrativo (demo)
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-line pt-6 text-xs text-cream-dim/60 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {businessConfig.fullName}. Sitio demo — todos los datos son ficticios.</p>
          <p>Hecho para mostrar lo que tu marca podría tener.</p>
        </div>
      </div>
    </footer>
  );
}
