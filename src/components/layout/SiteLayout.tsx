import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileTabBar from './MobileTabBar';
import WhatsAppFloatingButton from '../WhatsAppFloatingButton';
import CartDrawer from '../CartDrawer';

export default function SiteLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main className="pb-24 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
      <WhatsAppFloatingButton />
      <CartDrawer />
    </div>
  );
}
