import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logokarel.jpeg'; // ← Ajoute cette ligne


function Navbar() {
  const { token, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white px-4 py-2 sticky top-0 z-50 border-b border-gray-200">
  <div className="flex items-center justify-between max-w-7xl mx-auto">
    
    {/* LOGO à gauche - Agrandi */}
    <div className="flex items-center gap-3">
      <img 
        src={logo} 
        alt="Logo Karel Travels" 
        className="h-20 w-auto sm:h-22 object-contain"
        /* Logo plus grand : h-12 (48px) / sm:h-14 (56px) */
      />
      <h1 className="text-lg sm:text-xl font-bold text-gray-800 whitespace-nowrap">
        KAREL TRAVELS EXCURSIONS
      </h1>
    </div>

    {/* MENU à droite */}
    <div className="flex items-center gap-2">
      <a href="#accueil" className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">
        Accueil
      </a>
      <a href="#services" className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">
        Nos Services
      </a>
      <a href="#apropos" className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">
        À propos
      </a>
      <Link to="/reservation" className="px-3 py-1.5 text-sm bg-[#9caf88] rounded-lg">
        Réservation
      </Link>
      <Link to="/contact" className="px-3 py-1.5 text-sm bg-[#9caf88] rounded-lg">
        Contacter
      </Link>
    </div>
  </div>
</nav>
  );
}

export default Navbar;