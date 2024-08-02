'use client';

import Navbar from '@/ui/Navbar';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      {isAuthenticated && <Navbar />}
      <main>
        {isAuthenticated ? (
          <div className="flex flex-col items-center justify-center bg-gradient-to-tr from-red-300 to-yellow-200 min-h-screen py-10">
            {children}
          </div>
        ) : (
          <div>{children}</div>
        )}
      </main>
    </>
  );
};

export default Layout;
