import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink px-4 text-center">
      <p className="text-display text-7xl text-ember">404</p>
      <h1 className="text-display text-2xl text-cream">Esta página se quemó en la parrilla</h1>
      <Link to="/" className="mt-2 rounded-full ember-gradient px-6 py-3 text-sm font-bold text-ink">
        Volver al inicio
      </Link>
    </div>
  );
}
