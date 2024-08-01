'use client';
import Navbar from '@/ui/Navbar';
import { useSelector } from 'react-redux';

const ClientSideAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <main>{children}</main>
    </>
  );
};

export default ClientSideAuth;
