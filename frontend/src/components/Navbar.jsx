import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="relative bg-white py-4 px-4 sm:px-8 border-none shadow-none sticky top-0 z-50">
      
      {/* ============================================
          CONNEXION/DÉCONNEXION - Section supprimée
          ============================================ */}
      {/* 
        L'affichage "Admin Karel (admin) Déconnexion" a été complètement supprimé.
        La navbar affiche maintenant uniquement le titre et le menu principal.
      */}

      {/* ============================================
          CONTENU CENTRÉ (Titre + Menu)
          ============================================ */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="m-0 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center">
          KAREL TRAVELS EXCURSIONS
        </h1>

        {/* MENU PRINCIPAL */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-1">
          <a href="#accueil" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors no-underline rounded-lg">
            Accueil
          </a>
          <a href="#services" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors no-underline rounded-lg">
            Nos Services
          </a>
          <a href="#apropos" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors no-underline rounded-lg">
            À propos
          </a>
          
          <Link 
            to="/reservation" 
            className="px-4 py-2 bg-[#9caf88] hover:bg-[#8a9978] text-gray-800 font-medium transition-colors no-underline rounded-lg cursor-pointer"
          >
            Réservation
          </Link>
          
          <Link 
            to="/contact" 
            className="px-4 py-2 bg-[#9caf88] hover:bg-[#8a9978] text-gray-800 font-medium transition-colors no-underline rounded-lg cursor-pointer"
          >
            Contacter 
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;