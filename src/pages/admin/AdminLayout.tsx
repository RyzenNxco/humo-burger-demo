import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { businessConfig } from '../../config/business';
import {
  BarChart,
  Package,
  Layers,
  Tag,
  MapPin,
  Clock,
  Settings,
  Menu3,
  X,
} from '../../components/icons';

const links = [
  { to: '/admin', label: 'Dashboard', icon: BarChart, end: true },
  { to: '/admin/pedidos', label: 'Pedidos', icon: Package },
  { to: '/admin/productos', label: 'Productos', icon: Layers },
  { to: '/admin/categorias', label: 'Categorías', icon: Menu3 },
  { to: '/admin/promociones', label: 'Promociones', icon: Tag },
  { to: '/admin/sucursales', label: 'Sucursales', icon: MapPin },
  { to: '/admin/horarios', label: 'Horarios', icon: Clock },
  { to: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ink text-cream">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-line bg-ink-soft lg:block">
        <SidebarContent />
      </aside>

      {/* Sidebar mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 w-64 bg-ink-soft">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-line px-4 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line lg:hidden"
          >
            <Menu3 className="h-5 w-5" />
          </button>
          <p className="text-sm font-bold text-cream">Panel administrativo — DEMO</p>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold text-gold">
            Datos de prueba
          </span>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line p-5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full ember-gradient text-ink text-xs font-black">
            D
          </span>
          <span className="text-display text-base text-cream">{businessConfig.name} Admin</span>
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="text-cream-dim">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-ember/15 text-ember' : 'text-cream-dim hover:bg-ink-card hover:text-cream'
              }`
            }
          >
            <l.icon className="h-4.5 w-4.5" />
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-line p-4">
        <Link to="/" className="text-xs text-cream-dim hover:text-cream">
          ← Volver al sitio público
        </Link>
      </div>
    </div>
  );
}
