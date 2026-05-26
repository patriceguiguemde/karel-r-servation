import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; //  Import du contexte

function Navbar() {
  const { token, user, logout, hasRole } = useAuth(); //  Récupération de l'auth
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="relative bg-white py-4 px-4 sm:px-8 border-none shadow-none sticky top-0 z-50">
      
      {/* CONNEXION/DÉCONNEXION - Conditionnel selon l'auth */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
        {token ? (
          //  Utilisateur connecté
          <>
            <span className="text-sm text-gray-600 hidden sm:inline">
              {user?.name} <span className="text-xs text-gray-400">({user?.role})</span>
            </span>
            
            {/* Lien vers dashboard selon le rôle */}
            {hasRole('admin', 'agent') ? (
              <Link to="/admin" className="text-xs text-[#9caf88] hover:underline">
                Dashboard
              </Link>
            ) : (
              <Link to="/dashboard" className="text-xs text-[#9caf88] hover:underline">
                Mon compte
              </Link>
            )}
            
            <button 
              onClick={handleLogout} 
              className="text-xs text-red-600 hover:underline ml-2"
            >
              Déconnexion
            </button>
          </>
        ) : (
          //  Utilisateur non connecté
          <>
            <Link 
              to="/login" 
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors rounded-lg"
            >
              Se connecter
            </Link>

          </>
        )}
      </div>

      {/* CONTENU CENTRÉ (Titre + Menu) */}
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