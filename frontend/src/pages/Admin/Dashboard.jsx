import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { token, hasRole, logout, user } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({});
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ service_type: '', status: '', search: '' });

  useEffect(() => {
    if (!token) navigate('/login');
    else if (!hasRole('admin', 'agent')) navigate('/');
  }, [token, hasRole, navigate]);

  useEffect(() => {
    if (token && hasRole('admin', 'agent')) fetchData();
  }, [token, filters]);

  const fetchData = async () => {
    try {
      const headers = { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' };
      
      const params = new URLSearchParams(filters);
      const res = await fetch(`http://localhost:8000/api/admin/dashboard?${params}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats || {});
        setReservations(data.reservations || []);
      }
    } catch (err) {
      console.error('Erreur dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/admin/reservations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (response.ok) {
        fetchData();
        alert('Réservation supprimée avec succès !');
      } else {
        const error = await response.json();
        alert('Erreur : ' + (error.message || 'Impossible de supprimer la réservation'));
      }
    } catch (err) {
      console.error('Erreur suppression:', err);
      alert('Une erreur est survenue lors de la suppression');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:8000/api/admin/reservations/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchData();
    } catch (err) {
      console.error('Erreur update:', err);
    }
  };

  // 🔥 NOUVEAU : Déclenche le filtre quand on clique sur une carte
  const handleStatCardClick = (status) => {
    setFilters(prev => ({ ...prev, status: status }));
  };

  if (loading) return <div className="p-8 text-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Administrateur</h1>
          <div className="flex items-center gap-4">
            
            {/*<span className="text-sm text-gray-600"> {user?.name} ({user?.role})</span>*/}
            <button onClick={logout} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Cartes stats - MODIFIÉ : ajout de onClick et active */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-auto max-w-6xl">
          <StatCard label="Total" value={stats.total || 0} color="bg-[#8a9e6e] text-black border border-[#7a8e5e]" onClick={() => handleStatCardClick('')} active={filters.status === ''} />
          <StatCard label="En attente" value={stats.pending || 0} color="bg-[#8a9e6e] text-black border border-[#7a8e5e]" onClick={() => handleStatCardClick('en_attente')} active={filters.status === 'en_attente'} />
          <StatCard label="Confirmées" value={stats.confirmed || 0} color="bg-[#8a9e6e] text-black border border-[#7a8e5e]" onClick={() => handleStatCardClick('confirme')} active={filters.status === 'confirme'} />
          <StatCard label="Annulées" value={stats.cancelled || 0} color="bg-[#8a9e6e] text-black border border-[#7a8e5e]" onClick={() => handleStatCardClick('annule')} active={filters.status === 'annule'} />
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select value={filters.service_type} onChange={(e) => setFilters({...filters, service_type: e.target.value})} className="px-4 py-2 border rounded-lg">
              <option value="">Tous services</option>
              <option value="vol"> Vols</option>
              <option value="hotel"> Hôtels</option>
              <option value="vehicule"> Véhicules</option>
              <option value="excursion"> Excursions</option>
            </select>
            <select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="px-4 py-2 border rounded-lg">
              <option value="">Tous statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirme">Confirmée</option>
              <option value="annule">Annulée</option>
            </select>
            <input type="text" placeholder="Rechercher..." value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} className="px-4 py-2 border rounded-lg" />
          </div>
        </div>

        {/* Tableau */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Nom</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Prénom</th> {/* ✅ Typo corrigée */}
                <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {reservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono text-gray-500">{res.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{res.nom}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{res.prenom}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{res.email}</td>
                  <td className="px-4 py-3 text-sm"><ServiceBadge type={res.service_type} /></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{new Date(res.created_at).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3">
                    <select value={res.status} onChange={(e) => updateStatus(res.id, e.target.value)} className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(res.status)}`}>
                      <option value="en_attente">En attente</option>
                      <option value="confirme">Confirmée</option>
                      <option value="annule">Annulée</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => deleteReservation(res.id)}
                      className="px-3 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {reservations.length === 0 && <div className="p-8 text-center text-gray-500">Aucune réservation</div>}
        </div>

      </main>
    </div>
  );
}

//  StatCard mis à jour pour gérer le clic, le survol et l'état actif
function StatCard({ label, value, color, onClick, active = false }) {
  return (
    <div 
      onClick={onClick}
      className={`${color} rounded-xl p-4 text-center transition-all duration-200 
        ${active ? 'ring-4 ring-blue-500 scale-105 shadow-md' : 'hover:scale-[1.03]'} 
        ${onClick ? 'cursor-pointer hover:brightness-95 active:scale-95' : ''}`}
    >
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm opacity-90 mt-1">{label}</div>
      {active && (
        <span className="mt-2 inline-block text-[10px] font-bold text-blue-800 bg-blue-200 px-2 py-0.5 rounded-full">
           Filtré
        </span>
      )}
    </div>
  );
}

function ServiceBadge({ type }) {
  const icons = { vol: '', hotel: '', vehicule: '', excursion: '' };
  const labels = { vol: 'Vol', hotel: 'Hôtel', vehicule: 'Véhicule', excursion: 'Excursion' };
  return <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">{icons[type]} {labels[type]}</span>;
}

function getStatusColor(status) {
  const c = { 
    'en_attente': 'bg-yellow-100 text-yellow-800',
    'en_traitement': 'bg-blue-100 text-blue-800', 
    'confirme': 'bg-green-100 text-green-800', 
    'paye': 'bg-emerald-100 text-emerald-800', 
    'annule': 'bg-red-100 text-red-800' 
  };
  return c[status] || 'bg-gray-100 text-gray-800';
}