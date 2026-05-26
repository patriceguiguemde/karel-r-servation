import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Configuration des champs par service
const serviceConfig = {
  vol: {
    title: 'Réservation de Vol', icon: '',
    fields: [
      { name: 'nom', label: 'nom', type: 'text', required: true, col: 1 },
      { name: 'prenom', label: 'Prenom', type: 'text', required: true, col: 1 },
      { name: 'email', label: 'Email', type: 'email', required: true, col: 1 },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: true, col: 1 },
      { name: 'departure_country', label: 'Pays de départ', type: 'text', required: true, col: 1, placeholder: 'Burkina Faso' },
      { name: 'arrival_country', label: 'Pays d\'arrivée', type: 'text', required: true, col: 1, placeholder: 'Côte d\'Ivoire' },
    
      { name: 'departure_city', label: 'Ville de départ', type: 'text', required: true, col: 1, placeholder: 'Bobo' },
      { name: 'arrival_city', label: 'Ville d\'arrivée', type: 'text', required: true, col: 1, placeholder: 'Ouaga' },
      { name: 'departure_date', label: 'Date aller', type: 'date', required: true, col: 1 },
      { name: 'return_date', label: 'Date retour', type: 'date', required: false, col: 1 },
      { name: 'message', label: 'Demandes particulières', type: 'textarea', required: false, col: 2, placeholder: 'Saisissiez votre demande ici' }
    ]
  },
  
  hotel: {
    title: 'Réservation d\'Hôtel', icon: '',
    fields: [
      { name: 'nom', label: 'Nom', type: 'text', required: true, col: 1 },
      { name: 'prenom', label: 'Prenom', type: 'text', required: true, col: 1 },
      { name: 'email', label: 'Email', type: 'email', required: true, col: 1 },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: true, col: 1 },
      { name: 'destination', label: 'Destination', type: 'text', required: true, col: 1, placeholder: 'Bobo' },
      { name: 'check_in', label: 'Date d\'arrivée', type: 'date', required: true, col: 1 },
      { name: 'check_out', label: 'Date de départ', type: 'date', required: true, col: 1 },
      { name: 'rooms', label: 'Nombre de chambres', type: 'number', required: true, col: 1, min: 1, default: 1 },
      { name: 'adults', label: 'Adultes', type: 'number', required: true, col: 1, min: 1, default: 2 },
      { name: 'children', label: 'Enfants', type: 'number', required: false, col: 1, min: 0, default: 0 },
      { name: 'message', label: 'Demandes particulières', type: 'textarea', required: false, col: 2, placeholder: 'Saisissiez votre demande ici ' }
    ]
  },
  
  vehicule: {
    title: 'Location de Véhicule', icon: '',
    fields: [
      { name: 'nom', label: 'Nom', type: 'text', required: true, col: 1 },
      { name: 'prenom', label: 'Prenom', type: 'text', required: true, col: 1 },
      { name: 'email', label: 'Email', type: 'email', required: true, col: 1 },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: true, col: 1 },
      { name: 'pickup_location', label: 'Lieu de prise en charge', type: 'text', required: true, col: 1, placeholder: 'Aéroport de Bobo' },
      { name: 'dropoff_location', label: 'Lieu de retour', type: 'text', required: true, col: 1, placeholder: ' Aéroport de Ouaga' },
      { name: 'pickup_date', label: 'Date et heure de début', type: 'datetime-local', required: true, col: 1 },
      { name: 'dropoff_date', label: 'Date et heure de fin', type: 'datetime-local', required: true, col: 1 },
      { name: 'vehicle_type', label: 'Marque du véhicule', type: 'select', required: true, col: 1, options: [
      { value: 'mercedes', label: 'Mercedes-Benz' },
      { value: 'toyota', label: 'Toyota' },
      { value: 'suzuki', label: 'Suzuki' },
      { value: 'lexus', label: 'Lexus' }
      ]},
      { name: 'transmission', label: 'Transmission', type: 'select', required: true, col: 1, options: [
        { value: 'manual', label: 'Manuelle' },
        { value: 'automatic', label: 'Automatique' }
      ]},
      { name: 'additional_driver', label: 'Conducteur supplémentaire', type: 'select', required: true, col: 1, options: [
        { value: 'no', label: 'Non' },
        { value: 'yes', label: 'Oui' }
      ]},
      { name: 'insurance', label: 'Assurance', type: 'select', required: true, col: 1, options: [
        { value: 'basic', label: 'Basique' },
        { value: 'full', label: 'Tous risques' }
      ]},
      { name: 'message', label: 'Demandes particulières', type: 'textarea', required: false, col: 2, placeholder: 'Siège bébé, GPS, chaîne neige...' }
    ]
  },
  
  excursion: {
    title: 'Excursion ', icon: '',
    fields: [
      { name: 'nom', label: 'Nom', type: 'text', required: true, col: 1 },
      { name: 'prenom', label: 'Prenom', type: 'text', required: true, col: 1 },
      { name: 'email', label: 'Email', type: 'email', required: true, col: 1 },
      { name: 'telephone', label: 'Téléphone', type: 'tel', required: true, col: 1 },
      { name: 'destination', label: 'Destination', type: 'text', required: true, col: 1, placeholder: ' Visite de cascades' },
      { name: 'excursion_type', label: 'Type d\'excursion', type: 'text', required: true, col: 1, placeholder: ' Visite guidée, Marché artisanal, ' },
      { name: 'date', label: 'Date souhaitée', type: 'date', required: true, col: 1 },
      { name: 'duration', label: 'Durée', type: 'select', required: true, col: 1, options: [
        { value: 'half_day', label: 'Demi-journée ' },
        { value: 'full_day', label: 'Journée complète ' },
        { value: 'multi_day', label: 'Plusieurs jours' }
      ]},
      { name: 'participants', label: 'Nombre de participants', type: 'number', required: true, col: 1, min: 1, default: 1 },
      { name: 'tour_type', label: 'Type de circuit', type: 'select', required: true, col: 1, options: [
        { value: 'private', label: 'Privé' },
        { value: 'group', label: 'En groupe' }
      ]},
      { name: 'language', label: 'Langue du guide', type: 'select', required: true, col: 1, options: [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'Anglais' },
         { value: 'm', label: 'Mooré' },
          { value: 'd', label: 'Dioula' },
      ]},
      { name: 'difficulty', label: 'Niveau de difficulté', type: 'select', required: false, col: 1, options: [
        { value: 'easy', label: 'Facile' },
        { value: 'moderate', label: 'Modéré' },
        { value: 'hard', label: 'Difficile' }
      ]},
      { name: 'message', label: 'Demandes particulières', type: 'textarea', required: false, col: 2, placeholder: 'Saisissiez votre demande' }
    ]
  }
};

//  Utilitaire WhatsApp - Version enrichie avec détails dynamiques
const buildWhatsAppUrl = (data, phoneNumber) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  //  Construire un résumé contextuel selon le type de service
  //  AJOUTEZ CES LIGNES ICI (juste après cleanPhone)
  const dureeLabels = { 
    half_day: 'Demi-journée', 
    full_day: 'Journée complète', 
    multi_day: 'Plusieurs jours' 
  };
  
  const langueLabels = { 
    fr: 'Français', 
    en: 'Anglais', 
    m: 'Mooré', 
    d: 'Dioula'
  };
  
  const tourTypeLabels = {
    private: 'Privé',
    group: 'En groupe'
  };
  
  const difficultyLabels = {
    easy: 'Facile',
    moderate: 'Modéré',
    hard: 'Difficile'
  };
  let serviceDetails = '';
  
  if (data.service_type === 'vol') {
    serviceDetails = `\n` +
      ` Départ: ${data.departure_city || '?'} (${data.departure_country || '?'})\n` +
      ` Arrivée: ${data.arrival_city || '?'} (${data.arrival_country || '?'})\n` +
      ` Aller: ${data.departure_date || '?'}\n` +
      ` Retour: ${data.return_date || 'Non spécifié'}`;
      
  } else if (data.service_type === 'hotel') {
    serviceDetails = `\n` +
      ` Destination: ${data.destination || '?'}\n` +
      ` Arrivée: ${data.check_in || '?'}\n` +
      ` Départ: ${data.check_out || '?'}\n` +
      ` Chambres: ${data.rooms || 1} 
       Adultes: ${data.adults || 1}`;
      
      
  } else if (data.service_type === 'vehicule') {
    serviceDetails = `\n` +
      ` Prise en charge: ${data.pickup_location || '?'}\n` +
      ` Retour: ${data.dropoff_location || '?'}\n` +
      ` Début: ${data.pickup_date?.replace('T', ' ') || '?'}\n` +
      ` Fin: ${data.dropoff_date?.replace('T', ' ') || '?'}\n` +
      ` Véhicule: ${data.vehicle_type || '?'} |  ${data.transmission || '?'}`;
      
  } else if (data.service_type === 'excursion') {
    serviceDetails = `\n` +
      ` Destination: ${data.destination || '?'}\n` +
      ` Type: ${data.excursion_type || '?'}\n` +
      ` Date: ${data.date || '?'}\n` +
      ` Durée: ${dureeLabels[data.duration] || data.duration}\n` +
      ` Circuit: ${tourTypeLabels[data.tour_type] || data.tour_type}\n` +
      ` Langue guide: ${langueLabels[data.language] || 'Non spécifiée'}\n` +  
      ` Difficulté: ${difficultyLabels[data.difficulty] || 'Non spécifiée'}`;   
      ` Participants: ${data.participants || 1}`;
  }
  
  //  Message WhatsApp formaté avec emojis
  const message = ` NOUVELLE RÉSERVATION

 CLIENT
 Nom: ${data.nom || ''} ${data.prenom || ''}
 Tél: ${data.telephone || '?'}
 Email: ${data.email || '?'}

 SERVICE
 Type: ${data.service_type?.toUpperCase() || '?'}
${serviceDetails}

 DEMANDE PARTICULIÈRE
${data.message || 'Aucune demande particulière'}


Status: ${data.status || 'En attente'}
Date: ${new Date().toLocaleDateString('fr-FR')}`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export default function DynamicReservation() {
  const { type } = useParams();
  const config = serviceConfig[type];
  
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ loading: false, submitted: false, error: '' });
  const [waUrl, setWaUrl] = useState(null);

  // Initialiser les valeurs par défaut
  useEffect(() => {
    if (config?.fields) {
      const defaults = {};
      config.fields.forEach(field => {
        if (field.default !== undefined) {
          defaults[field.name] = field.default;
        }
      });
      setFormData(defaults);
    }
  }, [type, config]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, submitted: false, error: '' });
    setWaUrl(null);

    try {
      const API_URL = 'http://localhost:8000/api/reservations';

       const payload = { ...formData, service_type: type };
       
      
      //  Nettoyer les valeurs vides avant envoi
const cleanPayload = Object.fromEntries(
  Object.entries({ ...formData, service_type: type })
    .filter(([_, value]) => value !== '' && value !== null && value !== undefined)
);

console.log(' Payload envoyé:', payload);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type');
      
      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json();
          console.error(' Erreurs de validation:', errorData.errors);
          
          const errors = Object.entries(errorData.errors || {})
            .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
            .join(' | ');
            
          throw new Error(errors || 'Validation échouée');
        }
        
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error(' Réponse non-JSON:', text);
          throw new Error(`Erreur ${response.status}: ${text.substring(0, 200)}`);
        }
        
        const errorData = await response.json();
        throw new Error(errorData.message || `Erreur ${response.status}`);
      }

      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Réponse inattendue du serveur (non-JSON)');
      }

      const data = await response.json();
      console.log(' Réponse serveur:', data);
      
      setStatus({ loading: false, submitted: true, error: '' });
      
     //  REDIRECTION WHATSAPP - Version simplifiée
// On passe cleanPayload (ou formData) directement + le type de service
const waData = { 
  ...cleanPayload,  // ou formData si vous n'avez pas ajouté cleanPayload
  service_type: type 
};
const waLink = buildWhatsAppUrl(waData, '22675230293');
setWaUrl(waLink);
window.open(waLink, '_blank');
//  FIN REDIRECTION WHATSAPP 
      
      setFormData({});
      
      setTimeout(() => setStatus({ loading: false, submitted: false, error: '' }), 4000);
      
    } catch (err) {
      console.error(' Erreur complète:', err);
      setStatus({ loading: false, submitted: false, error: err.message });
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4"> Service non disponible</h1>
          <Link to="/reservation" className="text-[#9caf88] hover:underline"> Retour aux services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/reservation" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2c5e3a] font-medium mb-8 transition">
           Retour aux services
        </Link>
        
        <div className="text-center mb-8">
          <span className="text-6xl block mb-4">{config.icon}</span>
          <h1 className="text-4xl font-bold text-gray-800">{config.title}</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.fields.map((field) => (
                <div key={field.name} className={field.col === 2 ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  
                  {field.type === 'textarea' ? (
                    <textarea
                      name={field.name}
                      rows={field.rows || 4}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9caf88] focus:border-transparent outline-none transition resize-none"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      name={field.name}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9caf88] focus:border-transparent outline-none transition bg-white"
                    >
                      <option value="">Sélectionner...</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.required}
                      min={field.min}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9caf88] focus:border-transparent outline-none transition"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={status.loading}
                className={`w-full font-semibold py-4 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.99] ${
                  status.loading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-[#9caf88] hover:bg-[#8a9978] text-white'
                }`}
              >
                {status.loading ? ' Envoi en cours...' : ' Confirmer la réservation'}
              </button>
            </div>
          </form>

          {/*  MESSAGE DE SUCCÈS + BOUTON WHATSAPP PRO */}
          {status.submitted && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-center">
              <p className="text-green-800 font-medium mb-3">
                 Réservation enregistrée avec succès !<br/>
                Cliquez ci-dessous pour finaliser sur WhatsApp :
              </p>
              {waUrl && (
                <a 
                  href={waUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#128C7E] transition shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Ouvrir WhatsApp
                </a>
              )}
              <p className="text-xs text-gray-500 mt-3">
                Le lien ouvre directement l'app WhatsApp ou WhatsApp Web.
              </p>
            </div>
          )}

          {status.error && (
            <div className="mt-6 bg-red-50 text-red-800 p-4 rounded-lg text-center font-medium border border-red-200">
               {status.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}