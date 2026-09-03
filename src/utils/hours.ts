import type { Branch } from '../types';

/**
 * Estado abierto/cerrado DEMO. Parsea "HH:MM a HH:MM" y días en español
 * de forma simplificada. Suficiente para la demo comercial;
 * en producción conviene una estructura de horarios más estricta.
 */
export function isBranchOpenNow(branch: Branch): boolean {
  if (branch.isOpenOverride === 'open') return true;
  if (branch.isOpenOverride === 'closed') return false;

  const now = new Date();
  const day = now.getDay(); // 0 = domingo
  const isWeekend = day === 5 || day === 6; // vie/sáb

  const rule = branch.hours.find((h) =>
    isWeekend ? h.days.toLowerCase().includes('vie') : h.days.toLowerCase().includes('dom')
  );
  if (!rule) return true;

  const [startStr, endStr] = rule.time.split(' a ').map((s) => s.trim());
  const toMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const start = toMinutes(startStr);
  let end = toMinutes(endStr);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (end < start) {
    // cruza medianoche
    end += 24 * 60;
    const adjustedNow = nowMinutes < start ? nowMinutes + 24 * 60 : nowMinutes;
    return adjustedNow >= start && adjustedNow <= end;
  }

  return nowMinutes >= start && nowMinutes <= end;
}
