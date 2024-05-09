import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

export const Layout = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Outlet />
      {!pathname.includes('team') && <Footer />}
    </>
  );
};
