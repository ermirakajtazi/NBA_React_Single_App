import React from 'react';
import { Link } from 'react-router-dom';

interface NavLinkProps {
  href: string;
  title: string;
  id: string;
}
export default function NavLink({ href, title, id }: NavLinkProps) {
  return (
    <Link
      key={id}
      to={href}
      className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
    >
      {title}
    </Link>
  );
}
