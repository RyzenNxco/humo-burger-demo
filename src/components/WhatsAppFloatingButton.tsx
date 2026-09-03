import { WhatsApp } from './icons';
import { businessConfig } from '../config/business';

export default function WhatsAppFloatingButton() {
  const message = encodeURIComponent('¡Hola! Quiero hacer un pedido 🍔');
  const url = `https://wa.me/${businessConfig.whatsappNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-xl shadow-black/40 transition-transform hover:scale-110 md:bottom-6"
    >
      <WhatsApp className="h-7 w-7" />
    </a>
  );
}
