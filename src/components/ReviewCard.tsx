import type { Review } from '../types';
import { Star } from './icons';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex w-72 shrink-0 flex-col rounded-2xl border border-line bg-ink-card p-5 sm:w-80">
      <div className="flex items-center gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < review.rating ? '' : 'text-line'}`} />
        ))}
      </div>
      <p className="mt-3 flex-1 text-sm text-cream-dim">"{review.comment}"</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-bold text-cream">{review.name}</span>
        <span className="text-xs text-cream-dim/60">{review.date}</span>
      </div>
    </div>
  );
}
