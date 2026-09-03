import { NavLink } from 'react-router-dom';
import { Home, Burger, Tag, ShoppingBag, MapPin } from '../icons';
import { useCart } from '../../context/CartContext';

const tabs = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/menu', label: 'Menú', icon: Burger },
  { to: '/promos', label: 'Promos', icon: Tag },
  { to: '/sucursales', label: 'Local', icon: MapPin },
];

export default function MobileTabBar() {
  const { itemCount, openDrawer } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-ink-soft/95 backdrop-blur-md md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 h-16">
        {tabs.slice(0, 2).map((t) => (
          <TabLink key={t.to} {...t} />
        ))}

        <button
          onClick={openDrawer}
          className="relative flex flex-col items-center justify-center gap-1 text-cream-dim"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full ember-gradient text-ink -mt-4 shadow-lg shadow-ember/30">
            <ShoppingBag className="h-4.5 w-4.5" />
          </span>
          {itemCount > 0 && (
            <span className="absolute top-0 right-[calc(50%-22px)] flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red px-1 text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
          <span className="text-[11px] font-medium">Pedido</span>
        </button>

        {tabs.slice(2).map((t) => (
          <TabLink key={t.to} {...t} />
        ))}
      </div>
    </nav>
  );
}

function TabLink({
  to,
  label,
  icon: Icon,
  end,
}: {
  to: string;
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
          isActive ? 'text-ember' : 'text-cream-dim'
        }`
      }
    >
      <Icon className="h-5 w-5" />
      {label}
    </NavLink>
  );
}
