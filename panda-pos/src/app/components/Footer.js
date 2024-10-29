// src/app/components/Header.js
import Link from 'next/link';

const Header = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/customer">Customer</Link>
      <Link href="/manager">Manager</Link>
      <Link href="/cashier">Cashier</Link>
    </nav>
  );
};

export default Header;
