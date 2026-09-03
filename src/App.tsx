import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Promotions from './pages/Promotions';
import Combos from './pages/Combos';
import Branches from './pages/Branches';
import Delivery from './pages/Delivery';
import Checkout from './pages/Checkout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminBranches from './pages/admin/AdminBranches';
import AdminHours from './pages/admin/AdminHours';
import AdminSettings from './pages/admin/AdminSettings';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/promos" element={<Promotions />} />
            <Route path="/combos" element={<Combos />} />
            <Route path="/sucursales" element={<Branches />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/pedido" element={<Checkout />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pedidos" element={<AdminOrders />} />
            <Route path="productos" element={<AdminProducts />} />
            <Route path="categorias" element={<AdminCategories />} />
            <Route path="promociones" element={<AdminPromotions />} />
            <Route path="sucursales" element={<AdminBranches />} />
            <Route path="horarios" element={<AdminHours />} />
            <Route path="configuracion" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
