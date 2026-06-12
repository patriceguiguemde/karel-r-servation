
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, logout } = useAuth(); 
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

      navigate('/admin', { replace: true }); 

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-2 border-red-500">
        <h2 className="text-2xl font-bold !text-blue-900 mb-6 text-center">
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
              className="w-full h-11 px-3 bg-gray-50 border-2 border-[#9caf88] rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:opacity-50 transition"
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
             className="w-full h-11 px-3 bg-gray-50 border-2 border-[#9caf88] rounded-lg text-sm text-gray-800 placeholder-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 focus:outline-none disabled:opacity-50 transition"
              required 
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
           className="w-full h-11 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 mt-2"
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
  
useEffect(() => {
  if (user) {
    navigate('/admin', { replace: true });
  }
}, [user]);
}