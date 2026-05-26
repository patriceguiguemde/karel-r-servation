import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      window.location.href = '/admin-login';
      return;
    }

    fetch('http://localhost:8000/api/admin/dashboard', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json' 
      }
    })
    .then(async res => {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('auth_token');
        window.location.href = '/admin-login';
        throw new Error('Session expirée');
      }
      return res.json();
    })
    .then(data => {
      if (data.success) {
        setStats(data.stats);
        const sorted = [...data.reservations].sort((a, b) => a.id - b.id);
        setReservations(sorted);
      } else {
        setError('Impossible de charger les réservations');
      }
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  };

  const getStatusColor = (status) => {
    const colors = {
      'en_attente': 'bg-yellow-100 text-yellow-800',
      'confirme': 'bg-green-100 text-green-800',
      'paye': 'bg-blue-100 text-blue-800',
      'annule': 'bg-red-100 text-red-800',
      'en_traitement': 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#9caf88] border-t-transparent"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-md">
          <p className="text-red-600 mb-4"> {error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#9caf88] text-white rounded hover:bg-[#8a9978]">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-600">{reservations.length} réservation(s)</span>
          <button onClick={handleLogout} className="text-red-600 hover:underline font-medium">
            Déconnexion
          </button>
        </div>
      </div>

      {/* Statistiques */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-xl text-center">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-sm opacity-90">Total</div>
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-xl text-center">
            <div className="text-3xl font-bold">{stats.pending}</div>
            <div className="text-sm opacity-90">En attente</div>
          </div>
          <div className="bg-purple-500 text-white p-4 rounded-xl text-center">
            <div className="text-3xl font-bold">{stats.confirmed}</div>
            <div className="text-sm opacity-90">Confirmées</div>
          </div>
          <div className="bg-red-500 text-white p-4 rounded-xl text-center">
            <div className="text-3xl font-bold">{stats.cancelled}</div>
            <div className="text-sm opacity-90">Annulées</div>
          </div>
        </div>
      )}

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Référence</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Nnom</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">preom</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Téléphone</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Service</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-700">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">
                    #{res.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {res.reference
                      ? <span className="font-medium">{res.reference}</span>
                      : <span className="text-gray-300 italic">—</span>
                    }
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {res.nom}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {res.prenom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {res.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {res.telephone || <span className="text-gray-300 italic">—</span>}
                  </td>
                  <td className="px-6 py-4 capitalize font-medium text-gray-700">
                    {res.service_type}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(res.status)}`}>
                      {res.status?.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reservations.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg"> Aucune réservation trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}