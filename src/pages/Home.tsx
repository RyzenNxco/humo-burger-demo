import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { promotions } from '../data/promotions';
import { reviews, reviewsSummary } from '../data/reviews';
import { branches } from '../config/business';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import SectionHeading from '../components/SectionHeading';
import ReviewCard from '../components/ReviewCard';
import InstagramGrid from '../components/InstagramGrid';
import BranchCard from '../components/BranchCard';
import { Star, ChevronRight, WhatsApp } from '../components/icons';
import type { Product } from '../types';
import { businessConfig } from '../config/business';
import { formatPrice } from '../utils/format';

const bestSellers = products.filter((p) => p.tags.includes('bestseller')).slice(0, 8);
const heroPromo = promotions[0];

export default function Home() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600&q=80&auto=format&fit=crop"
            alt="Hamburguesa HUMO"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-end px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 py-1.5 text-xs font-bold text-ember">
              ★ {reviewsSummary.average} · +{reviewsSummary.count.toLocaleString('es-AR')} pedidos felices
            </span>

            <h1 className="text-display mt-5 max-w-2xl text-5xl leading-[0.95] text-cream sm:text-6xl md:text-7xl">
              BURGERS QUE
              <br />
              <span className="text-ember">HUELEN A FUEGO</span>
              <br />
              DE VERDAD.
            </h1>

            <p className="mt-5 max-w-md text-base text-cream-dim sm:text-lg">
              {businessConfig.shortPitch} Pan brioche de casa, medallones smash y una parrilla que no descansa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full ember-gradient px-7 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-105"
              >
                Pedir ahora <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-bold text-cream backdrop-blur-sm transition-colors hover:border-cream"
              >
                Ver menú completo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MOST SOLD STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading eyebrow="La favorita del barrio" title="Nuestras más vendidas" />
          <Link
            to="/menu"
            className="hidden shrink-0 items-center gap-1 text-sm font-bold text-ember sm:flex"
          >
            Ver todo <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={setSelected} />
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-ember/30">
          <img
            src={heroPromo.image}
            alt={heroPromo.name}
            className="h-72 w-full object-cover sm:h-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12">
            <span className="w-fit rounded-full ember-gradient px-3 py-1 text-[11px] font-black uppercase tracking-wide text-ink">
              Promo activa
            </span>
            <h3 className="text-display mt-3 max-w-sm text-3xl text-cream sm:text-4xl">
              {heroPromo.name}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-cream-dim">{heroPromo.description}</p>
            <div className="mt-4 flex items-center gap-3">
              {heroPromo.oldPrice && (
                <span className="text-sm text-cream-dim/60 line-through">
                  {formatPrice(heroPromo.oldPrice)}
                </span>
              )}
              <span className="text-2xl font-black text-ember">{formatPrice(heroPromo.price)}</span>
            </div>
            <Link
              to="/promos"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-bold text-ink transition-transform hover:scale-105"
            >
              Ver todas las promos <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading eyebrow="Nuestra historia" title="Todo empezó con una parrilla y demasiada hambre." />
            <p className="mt-5 text-sm leading-relaxed text-cream-dim sm:text-base">
              HUMO nació de una idea simple: la hamburguesa perfecta no se apura. Elegimos carne de calidad,
              la molemos nosotros, la llevamos a la plancha bien caliente y la dejamos formar esa costra
              que solo el fuego real puede dar. El pan lo horneamos todos los días. La salsa insignia lleva
              seis años de ajustes hasta quedar como queríamos.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream-dim sm:text-base">
              Hoy somos un equipo que cree que una buena hamburguesa se comparte: con amigos, un viernes
              después del trabajo, o pedida a la cama un domingo lluvioso. Esa es la comunidad que estamos
              armando, local por local.
            </p>
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-display text-3xl text-ember">3</p>
                <p className="text-xs text-cream-dim">Sucursales</p>
              </div>
              <div>
                <p className="text-display text-3xl text-ember">30+</p>
                <p className="text-xs text-cream-dim">Productos en carta</p>
              </div>
              <div>
                <p className="text-display text-3xl text-ember">4.8★</p>
                <p className="text-xs text-cream-dim">Reputación online</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=700&q=80&auto=format&fit=crop"
              alt="Preparación en la parrilla"
              className="col-span-2 h-64 w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=500&q=80&auto=format&fit=crop"
              alt="Hamburguesa terminada"
              className="h-40 w-full rounded-2xl object-cover"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=500&q=80&auto=format&fit=crop"
              alt="Salsa especial de la casa"
              className="h-40 w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="border-y border-line bg-ink-soft py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Reseñas" title="Lo dicen ellos, no nosotros." />
            <div className="flex items-center gap-2">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5" />
                ))}
              </div>
              <span className="text-sm font-bold text-cream">
                {reviewsSummary.average} / 5 · +{reviewsSummary.count.toLocaleString('es-AR')} reseñas
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs text-cream-dim/50">
            * Reseñas demo — se reemplazan por reseñas verificadas del cliente antes de publicar.
          </p>
          <div className="no-scrollbar mt-8 flex gap-4 overflow-x-auto pb-2">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES TEASER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Encontrá tu local" title="Tenemos un HUMO cerca tuyo" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((b) => (
            <BranchCard key={b.id} branch={b} />
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Comunidad" title="Seguinos en Instagram" align="center" />
        <div className="mx-auto mt-8 max-w-3xl">
          <InstagramGrid />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-line bg-ink-card px-6 py-14 text-center">
          <h3 className="text-display text-3xl text-cream sm:text-4xl">¿Ya sabés qué vas a pedir?</h3>
          <p className="max-w-md text-sm text-cream-dim">
            Armá tu pedido en el sitio o escribinos directo por WhatsApp, lo que te resulte más rápido.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="rounded-full ember-gradient px-7 py-3.5 text-sm font-bold text-ink transition-transform hover:scale-105"
            >
              Ver menú y pedir
            </Link>
            <a
              href={`https://wa.me/${businessConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105"
            >
              <WhatsApp className="h-4 w-4" /> Pedir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
