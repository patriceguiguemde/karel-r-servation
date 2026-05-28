
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, logout } = useAuth(); //  Retiré hasRole, ajouté logout
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password); //  Récupérer data directement
      const role = data.user?.role; // Lire le rôle depuis la réponse API

      if (!['admin', 'agent'].includes(role)) {
        await logout(); //  logout correctement récupéré du contexte
        throw new Error('Accès refusé : Espace réservé aux administrateurs.');
      }

      navigate('/admin', { replace: true }); //  Route correcte

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
           Espace Administrateur
        </h2>
        
        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded mb-4 text-sm border border-red-200">
            {error}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full mt-1 px-4 py-2 border rounded focus:ring-2 focus:ring-[#9caf88] focus:outline-none disabled:opacity-50" 
              required 
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full mt-1 px-4 py-2 border rounded focus:ring-2 focus:ring-[#9caf88] focus:outline-none disabled:opacity-50" 
              required 
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#2c5e3a] text-white py-3 rounded font-semibold hover:bg-[#1e4228] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Connexion...
              </span>
            ) : 'Se connecter'}
          </button>
        </form>
        
       
      </div>
    </div>
  );
  //  Ajouter en haut du composant
useEffect(() => {
  if (user) {
    navigate('/admin', { replace: true });
  }
}, [user]);
}