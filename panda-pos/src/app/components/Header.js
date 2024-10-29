// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Panda POS</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/customer">Customer</Link>
        <Link to="/manager">Manager</Link>
        <Link to="/cashier">Cashier</Link>
      </nav>
    </header>
  );
}

export default Header;
