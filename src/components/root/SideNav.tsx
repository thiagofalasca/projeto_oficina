import React from 'react';
import NavLinks from './NavLinks';
import AppLogo from '../AppLogo';
import Footer from './Footer';

const SideNav = () => {
  return (
    <div className="flex h-screen flex-col justify-between border-r bg-gray-50 p-4 max-md:hidden xl:w-[350px]">
      <nav className="flex flex-col gap-4">
        <AppLogo type="desktop" />
        <NavLinks />
      </nav>
      <Footer />
    </div>
  );
};

export default SideNav;
