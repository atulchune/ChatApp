// Layout.js
import React from 'react';
import Navbar from './components/Navbar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Always show Navbar */}
      <main>{children}</main> {/* Render page content */}
    </div>
  );
};

export default Layout;
