import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'; // ✅ useNavigate ici
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ServiceSelection from './pages/ServiceSelection';
import DynamicReservation from './pages/DynamicReservation';
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminLogin from './pages/AdminLogin';
import { useState, useEffect } from 'react'; // ✅ Un seul import React

function AdminRoute({ children }) {
  const { token, hasRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#9caf88] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!hasRole('admin', 'agent')) {
    return <Navigate to="/" replace />;
  }

  return children;
}

 /* function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin' || user.role === 'agent') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      const role = data.user?.role;

      if (role === 'admin' || role === 'agent') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Connexion</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9caf88] outline-none"
              placeholder="votre@email.com"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9caf88] outline-none"
              placeholder="••••••••"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#9caf88] hover:bg-[#8a9978]'}`}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          <a href="/" className="text-[#9caf88] hover:underline">← Retour à l'accueil</a>
        </p>
      </div>
    </div>
  );
}
*/
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Routes PUBLIQUES */}
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reservation" element={<ServiceSelection />} />
              <Route path="/reservation/:type" element={<DynamicReservation />} />

              {/* Connexion */}
             {/*<Route path="/login" element={<Login />} />*/} 
              <Route path="/admin-login" element={<AdminLogin />} />

              {/* Route ADMIN protégée */}
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />

              {/* Toute route inconnue → accueil */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;