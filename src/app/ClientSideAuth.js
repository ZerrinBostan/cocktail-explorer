'use client';
import { useSelector } from 'react-redux';

const ClientSideAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      {isAuthenticated && (
        <header>
          <nav>navbar alanı</nav>
        </header>
      )}
      <main>{children}</main>
      {isAuthenticated && <footer>footer alanı</footer>}
    </>
  );
};

export default ClientSideAuth;
