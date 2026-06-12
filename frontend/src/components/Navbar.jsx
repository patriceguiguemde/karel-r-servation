import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logokarel.jpeg';

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
        
        {/* LOGO à gauche  */}
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Logo Karel Travels" 
            className="h-20 w-auto sm:h-22 object-contain"
          />
          {/* La couleur du Titre */}
           <h1 className="text-base sm:text-lg md:text-xl font-bold !text-red-900 italic whitespace-nowrap">
            KAREL TRAVELS EXCURSIONS
          </h1>
        </div>

        {/* Le MENU */}
        <div className="flex items-center gap-2">
          <a href="#accueil" className="px-3 py-1.5 text-sm bg-blue-600 italic rounded-lg text-white font-bold">
            ACCUEIL
          </a>
          <a href="#services" className="px-3 py-1.5 text-sm bg-blue-600 italic rounded-lg text-white font-bold">
            NOS SERVICES
          </a>
          <a href="#apropos" className="px-3 py-1.5 text-sm bg-blue-600 italic rounded-lg text-white font-bold">
            À PROPOS
          </a>
          
          
          <Link to="/reservation" className="px-3 py-1.5 text-sm !bg-blue-600 italic hover:!bg-blue-700 text-white font-bold font-medium rounded-lg transition-colors">
  RESERVATION
</Link>
          <Link to="/contact" className="px-3 py-1.5 text-sm !bg-blue-600 italic hover:!bg-blue-700 text-white font-bold font-medium rounded-lg transition-colors">
  CONTACT
</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;