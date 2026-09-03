import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag } from '../icons';
import { useCart } from '../../context/CartContext';
import { businessConfig } from '../../config/business';

const links = [
  { to: '/menu', label: 'Menú' },
  { to: '/promos', label: 'Promos' },
  { to: '/combos', label: 'Combos' },
  { to: '/sucursales', label: 'Locales' },
  { to: '/delivery', label: 'Delivery' },
];

export default function Navbar() {
  const { itemCount, openDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full ember-gradient text-ink font-black text-sm">
            D
          </span>
          <span className="text-display text-xl tracking-wide text-cream">
            {businessConfig.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ink-card text-ember' : 'text-cream-dim hover:text-cream'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="hidden sm:inline-flex items-center rounded-full ember-gradient px-5 py-2 text-sm font-bold text-ink transition-transform hover:scale-105"
          >
            Pedir ahora
          </Link>
          <button
            onClick={openDrawer}
            aria-label="Ver carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink-card text-cream transition-colors hover:border-ember"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[11px] font-bold text-ink">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
