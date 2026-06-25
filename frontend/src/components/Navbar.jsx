import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logokarel.jpeg';

function Navbar() {
  const { token, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { label: 'ACCUEIL', href: '#accueil', type: 'anchor' },
    { label: 'NOS SERVICES', href: '#services', type: 'anchor' },
    { label: 'A PROPOS', href: '#apropos', type: 'anchor' },
    { label: 'RESERVATION', href: '/reservation', type: 'link' },
    { label: 'CONTACT', href: '/contact', type: 'link' },
  ];

  return (
    <nav className="bg-blue-900 px-3 py-2 sticky top-0 z-50 border-b border-gray-200">
  <div className="flex items-center justify-between max-w-7xl mx-auto">
    <div className="flex items-center gap-2 min-w-0 flex-1">
  <img
    src={logo}
    alt="Logo Karel Travels"
    className="h-10 w-10 object-contain flex-shrink-0"
  />
      <h2 className="text-sm sm:text-base md:text-xl font-bold !text-white italic leading-none truncate">
        KAREL TRAVELS EXCURSIONS
  </h2>
</div>

    {/* MENU DESKTOP */}
<div className="hidden md:flex items-center gap-2 flex-shrink-0">
  {navLinks.map((item) =>
    item.type === 'anchor' ? (
      <a key={item.label} href={item.href} className="px-3 py-1.5 text-sm  italic rounded-lg text-white font-bold hover:bg-blue-700 transition-colors">
        {item.label}
      </a>
    ) : (
      <Link key={item.label} to={item.href} className="px-3 py-1.5 text-sm  italic rounded-lg text-white font-bold hover:bg-blue-700 transition-colors">
        {item.label}
      </Link>
    )
  )}
</div>

    {/* HAMBURGER */}
    <button
      className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2 flex-shrink-0"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Ouvrir le menu"
    >
      <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
      <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
      <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
    </button>
  </div>
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 pb-3 px-2">
          {navLinks.map((item) =>
            item.type === 'anchor' ? (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="px-4 py-2 text-sm bg-blue-600 italic rounded-lg text-white font-bold hover:bg-blue-700 transition-colors text-center">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.href} onClick={() => setMenuOpen(false)} className="px-4 py-2 text-sm bg-blue-600 italic rounded-lg text-white font-bold hover:bg-blue-700 transition-colors text-center">
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;