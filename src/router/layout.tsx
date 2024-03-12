import { Outlet } from 'react-router-dom';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
