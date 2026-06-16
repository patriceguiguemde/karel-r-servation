import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/api/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-2 border-red-500">
        <h2 className="text-2xl font-bold !text-blue-900 mb-6 text-center">
          Mot de passe oublié
        </h2>

        <p className="text-sm text-gray-600 mb-6 text-center">
          Entrez votre adresse email. Un lien de réinitialisation vous sera envoyé.
        </p>

        {message && (
          <p className="text-green-700 bg-green-50 p-3 rounded mb-4 text-sm border border-green-200">
            {message}
          </p>
        )}

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

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                Envoi...
              </span>
            ) : 'Envoyer le lien'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/admin/login" className="text-sm text-blue-600 hover:underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}