import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('auth_token'));
  const [loading, setLoading] = useState(true);

  // Charger les infos utilisateur quand le token change
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/user', {
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Accept': 'application/json' 
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        //  Adapter selon la structure réelle de votre API :
        setUser(data.user || data); // Si API retourne { user: {...} } ou juste {...}
      } else {
        // Token invalide ou expiré
        logout();
      }
    } catch (err) {
      console.error('Erreur chargement utilisateur:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Accept': 'application/json' 
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    if (!res.ok) {
      throw new Error(data.message || data.error || 'Échec de la connexion');
    }
    
    //  Stocker token et user explicitement
    localStorage.setItem('auth_token', data.token);
    setToken(data.token);
    setUser(data.user || data); // Adapter selon structure API
    
    return data; // Retourner pour utilisation dans le composant
  };

  const logout = async () => {
    try {
      // Notification backend (optionnel mais recommandé)
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Accept': 'application/json' 
        }
      });
    } catch (err) {
      console.warn('Erreur lors de la déconnexion backend:', err);
      // Continuer la déconnexion locale même si le backend échoue
    } finally {
      localStorage.removeItem('auth_token');
      setToken(null);
      setUser(null);
    }
  };

  // Vérifie si l'utilisateur a AU MOINS un des rôles passés
  const hasRole = (...roles) => {
    return roles.some(role => role === user?.role);
  };

  // Helpers utiles
  const isAdmin = () => hasRole('admin');
  const isAgent = () => hasRole('agent');
  const isUser = () => hasRole('user');

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    hasRole,
    isAdmin,
    isAgent,
    isUser,
    refreshUser: fetchUser // Utile pour forcer un rechargement
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  return ctx;
};