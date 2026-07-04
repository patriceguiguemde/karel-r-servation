import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '22675230293'; //  Remplace par ton vrai numéro (indicatif + numéro, sans + ni espaces)

export default function Devis() {
  const { service } = useParams();

  const servicesConfig = {
    'billet-avion': { titre: 'Billet d\'avion', icon: '', couleur: 'from-blue-500 to-blue-700' },
    'hotel': { titre: 'Hôtel', icon: '', couleur: 'from-purple-500 to-purple-700' },
    'site-touristique': { titre: 'Site touristique', icon: '', couleur: 'from-green-500 to-green-700' },
    'location-vehicule': { titre: 'Location de véhicules', icon: '', couleur: 'from-red-500 to-red-700' },
    'change-devises': { titre: 'Change de devises', icon: '', couleur: 'from-yellow-500 to-yellow-600' },
    'visa': { titre: 'Conseil & Accompagnement Visa', icon: '', couleur: 'from-indigo-500 to-indigo-700' },
    'hotesse': { titre: 'Prestation d\'hôtesse', icon: '', couleur: 'from-pink-500 to-pink-700' }
  };

  const serviceActuel = servicesConfig[service];

  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '',
    destination: '', dateDepart: '', dateRetour: '',
    nombrePersonnes: '', message: '',
    villeDepart: '', typeVoyage: 'aller-simple', checkIn: '', checkOut: '',
    nombreChambres: '', typeChambre: '', typeVehicule: '', avecChauffeur: 'non',
    deviseSource: '', deviseCible: '', montantEchange: '',
    paysDestination: '', nationalite: '', typeVisa: '',
    typeEvenement: '', lieuEvenement: '', nombreHotesses: '', dureeEvenement: '',
    nomSite: '' // Nouveau champ pour le nom du site touristique
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
if (!serviceActuel) {
    return (
     <div className="min-h-screen bg-blue-300 bg-fixed py-12 px-4">
        {/* Ajout de la bordure rouge 'border border-red-600' autour du conteneur */}
        <div className="max-w-2xl mx-auto bg-blue-100 rounded-2xl shadow-2xl p-8 text-center ">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">choissiez votre service pour un devis</h2>
          <p className="text-gray-600 mb-6">Services disponibles :</p>
          
          
          <ul className="text-left mb-6 max-w-md mx-auto">
            {Object.keys(servicesConfig).map((key, index, array) => (
              <li 
                key={key} 
                className={`py-3 ${index !== array.length - 1 ? 'border-b border-black' : ''}`}
              >
                <Link to={`/devis/${key}`} className="text-red-500 hover:underline block font-medium">
                  {servicesConfig[key].icon} {servicesConfig[key].titre}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/" className="inline-block px-8 py-3 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  //  Construit le message WhatsApp selon le service choisi
  const construireMessage = () => {
    let lignes = [
      `Nouvelle demande de devis — ${serviceActuel.titre}`,
      '',
      `Nom: ${formData.nom}`,
      `Email: ${formData.email}`,
      `Téléphone: ${formData.telephone}`,
      ''
    ];

    switch (service) {
      case 'billet-avion':
        lignes.push(
          `Pays (Ville) de départ: ${formData.villeDepart || '-'}`,
          `Pays (Ville) de destination: ${formData.destination || '-'}`,
          `Type de voyage: ${formData.typeVoyage === 'aller-retour' ? 'Aller retour' : 'Aller simple'}`,
          `Date de départ: ${formData.dateDepart || '-'}`,
          ...(formData.typeVoyage === 'aller-retour'
            ? [`Date de retour: ${formData.dateRetour || '-'}`]
            : []),
          `Nombre de personnes: ${formData.nombrePersonnes || '-'}`
        );
        break;

      case 'hotel':
        lignes.push(
          `Pays (Ville) de destination: ${formData.destination || '-'}`,
          `Type de chambre souhaité: ${formData.typeChambre || '-'}`,
          `Check-in: ${formData.checkIn || '-'}`,
          `Check-out: ${formData.checkOut || '-'}`,
          `Nombre de chambres: ${formData.nombreChambres || '-'}`,
          `Nombre de personnes: ${formData.nombrePersonnes || '-'}`
        );
        break;

      case 'site-touristique':
        lignes.push(
          `Pays (Ville) de destination: ${formData.destination || '-'}`,
          `Nom du site à visiter: ${formData.nomSite || '-'}`,
          `Nombre de personnes: ${formData.nombrePersonnes || '-'}`,
          `Date souhaitée: ${formData.dateDepart || '-'}`
        );
        break;

      case 'location-vehicule':
        lignes.push(
          `Type de véhicule souhaité: ${formData.typeVehicule || '-'}`,
          `Avec chauffeur: ${formData.avecChauffeur}`,
          `Date de début: ${formData.dateDepart || '-'}`,
          `Date de fin: ${formData.dateRetour || '-'}`
        );
        break;

      case 'change-devises':
        lignes.push(
          `Devise source: ${formData.deviseSource || '-'}`,
          `Devise cible: ${formData.deviseCible || '-'}`,
          `Montant à échanger: ${formData.montantEchange || '-'}`
        );
        break;

      case 'visa':
        lignes.push(
          `Pays de destination: ${formData.paysDestination || '-'}`,
          `Nationalité: ${formData.nationalite || '-'}`,
          `Type de visa: ${formData.typeVisa || '-'}`
        );
        break;

      case 'hotesse':
        lignes.push(
          `Type d'événement: ${formData.typeEvenement || '-'}`,
          `Pays (Ville) de l'événement: ${formData.lieuEvenement || '-'}`,
          `Nombre d'hôtesses: ${formData.nombreHotesses || '-'}`,
          `Durée: ${formData.dureeEvenement || '-'}`,
          `Date: ${formData.dateDepart || '-'}`
        );
        break;

      default:
        break;
    }

    if (formData.message.trim()) {
      lignes.push('', `Message: ${formData.message}`);
    }

    return lignes.join('\n');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = 'Email requis';
    if (!formData.telephone.trim()) newErrors.telephone = 'Téléphone requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    const message = construireMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');

    setSuccess(true);
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 bg-fixed py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-green-600">✓</div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Demande envoyée !</h2>
          <p className="text-gray-600 mb-8">
            Merci pour votre demande de {serviceActuel.titre.toLowerCase()}.
            Si WhatsApp ne s'est pas ouvert automatiquement, vérifiez les pop-ups bloquées par votre navigateur.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="px-8 py-3 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition-all">
              Retour à l'accueil
            </Link>
            <button 
              onClick={() => {
                // Réinitialisation complète de tous les champs
                setFormData({
                  nom: '', email: '', telephone: '',
                  destination: '', dateDepart: '', dateRetour: '',
                  nombrePersonnes: '', message: '',
                  villeDepart: '', typeVoyage: 'aller-simple', checkIn: '', checkOut: '',
                  nombreChambres: '', typeChambre: '', typeVehicule: '', avecChauffeur: 'non',
                  deviseSource: '', deviseCible: '', montantEchange: '',
                  paysDestination: '', nationalite: '', typeVisa: '',
                  typeEvenement: '', lieuEvenement: '', nombreHotesses: '', dureeEvenement: '',
                  nomSite: ''
                });
                setErrors({});
                setSuccess(false);
              }} 
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-md"
            >
              Nouvelle demande
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  const inputClass = "w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-sm md:text-base";
  const labelClass = "block text-sm font-bold text-gray-700 mb-2";

  const renderChampsSpecifiques = () => {
    switch (service) {
      case 'billet-avion':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pays (Ville) de départ</label>
              <input name="villeDepart" value={formData.villeDepart} onChange={handleChange}
                className={inputClass} placeholder="Ex: Burkina Faso (Ouagadougou)" />
            </div>
            <div>
              <label className={labelClass}>Pays (Ville) de destination</label>
              <input name="destination" value={formData.destination} onChange={handleChange}
                className={inputClass} placeholder="Ex: France (Paris)" />
            </div>
            <div>
              <label className={labelClass}>Type de voyage</label>
              <select name="typeVoyage" value={formData.typeVoyage} onChange={handleChange} className={inputClass}>
                <option value="aller-simple">Aller simple</option>
                <option value="aller-retour">Aller retour</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Nombre de personnes</label>
              <input type="number" min="1" name="nombrePersonnes" value={formData.nombrePersonnes} onChange={handleChange}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date de départ</label>
              <input type="date" name="dateDepart" value={formData.dateDepart} onChange={handleChange} className={inputClass} />
            </div>
            {formData.typeVoyage === 'aller-retour' && (
              <div>
                <label className={labelClass}>Date de retour</label>
                <input type="date" name="dateRetour" value={formData.dateRetour} onChange={handleChange} className={inputClass} />
              </div>
            )}
          </div>
        );

      case 'hotel':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pays (Ville) de destination</label>
              <input name="destination" value={formData.destination} onChange={handleChange}
                className={inputClass} placeholder="Ex: Côte d'Ivoire (Abidjan)" />
            </div>
            <div>
              <label className={labelClass}>Type de chambre souhaité</label>
              <input name="typeChambre" value={formData.typeChambre} onChange={handleChange}
                className={inputClass} placeholder="Ex: Simple, Double avec vue..." />
            </div>
            <div>
              <label className={labelClass}>Date d'arrivée </label>
              <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date de départ </label>
              <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Nombre de chambres</label>
              <input type="number" min="1" name="nombreChambres" value={formData.nombreChambres} onChange={handleChange}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Nombre de personnes</label>
              <input type="number" min="1" name="nombrePersonnes" value={formData.nombrePersonnes} onChange={handleChange}
                className={inputClass} />
            </div>
          </div>
        );

      case 'site-touristique':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pays (Ville) de destination</label>
              <input name="destination" value={formData.destination} onChange={handleChange}
                className={inputClass} placeholder="Ex: Burkina Faso (Banfora)" />
            </div>
            <div>
              <label className={labelClass}>Nom du site à visiter</label>
              <input name="nomSite" value={formData.nomSite} onChange={handleChange}
                className={inputClass} placeholder="Ex: Dômes de Fabédougou, Cascades..." />
            </div>
            <div>
              <label className={labelClass}>Nombre de personnes</label>
              <input type="number" min="1" name="nombrePersonnes" value={formData.nombrePersonnes} onChange={handleChange}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date souhaitée</label>
              <input type="date" name="dateDepart" value={formData.dateDepart} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        );

      case 'location-vehicule':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type de véhicule souhaité</label>
              <input name="typeVehicule" value={formData.typeVehicule} onChange={handleChange}
                className={inputClass} placeholder="Ex: SUV 4x4, Berline confortable, Minibus..." />
            </div>
            <div>
              <label className={labelClass}>Avec chauffeur ?</label>
              <select name="avecChauffeur" value={formData.avecChauffeur} onChange={handleChange} className={inputClass}>
                <option value="non">Option</option>
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Date de début</label>
              <input type="date" name="dateDepart" value={formData.dateDepart} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Date de fin</label>
              <input type="date" name="dateRetour" value={formData.dateRetour} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        );

      case 'change-devises':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Devise source</label>
              <input name="deviseSource" value={formData.deviseSource} onChange={handleChange}
                className={inputClass} placeholder="Ex: EUR" />
            </div>
            <div>
              <label className={labelClass}>Devise cible</label>
              <input name="deviseCible" value={formData.deviseCible} onChange={handleChange}
                className={inputClass} placeholder="Ex: XOF" />
            </div>
            <div>
              <label className={labelClass}>Montant à échanger</label>
              <input type="number" name="montantEchange" value={formData.montantEchange} onChange={handleChange}
                className={inputClass} placeholder="0" />
            </div>
          </div>
        );

      case 'visa':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pays de destination</label>
              <input name="paysDestination" value={formData.paysDestination} onChange={handleChange}
                className={inputClass} placeholder="Ex: France" />
            </div>
            <div>
              <label className={labelClass}>Nationalité</label>
              <input name="nationalite" value={formData.nationalite} onChange={handleChange}
                className={inputClass} placeholder="Ex: Burkinabè" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Type de visa</label>
              <select name="typeVisa" value={formData.typeVisa} onChange={handleChange} className={inputClass}>
                <option value="">Choisir...</option>
                <option value="tourisme">Tourisme</option>
                <option value="affaires">Affaires</option>
                <option value="etudes">Études</option>
                <option value="travail">Travail</option>
                <option value="transit">Transit</option>
              </select>
            </div>
          </div>
        );

      case 'hotesse':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type d'événement</label>
              <input name="typeEvenement" value={formData.typeEvenement} onChange={handleChange}
                className={inputClass} placeholder="Ex: Mariage, Conférence, Salon..." />
            </div>
            <div>
              <label className={labelClass}>Pays (Ville) de l'événement</label>
              <input name="lieuEvenement" value={formData.lieuEvenement} onChange={handleChange}
                className={inputClass} placeholder="Ex: Burkina Faso (Bobo-Dioulasso)" />
            </div>
            <div>
              <label className={labelClass}>Nombre d'hôtesses</label>
              <input type="number" min="1" name="nombreHotesses" value={formData.nombreHotesses} onChange={handleChange}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Durée de l'événement</label>
              <input name="dureeEvenement" value={formData.dureeEvenement} onChange={handleChange}
                className={inputClass} placeholder="Ex: 1 jour, 3 heures..." />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Date de l'événement</label>
              <input type="date" name="dateDepart" value={formData.dateDepart} onChange={handleChange} className={inputClass} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-300 bg-fixed py-12 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-10">
         <div className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-full mb-4 shadow-md">
            <span className="text-3xl mr-2">{serviceActuel.icon}</span>
            <span className="text-xl font-bold italic">{serviceActuel.titre}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-red-700 mb-4">Demander un devis</h1>
          <p className="text-lg text-white">
            Formulaire pour : {serviceActuel.titre}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 space-y-6">

          <div className="border-b pb-6">
            <h3 className="text-xl font-bold text-red-700 mb-4">1. Vos coordonnées</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nom complet </label>
                <input name="nom" value={formData.nom} onChange={handleChange}
                  className={`${inputClass} ${errors.nom ? 'border-red-500' : ''}`}
                  placeholder="Nom & Prenom" />
                {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
              </div>
              <div>
                <label className={labelClass}>Email </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                  className={`${inputClass} ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="email@exemple.com" />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Téléphone </label>
                <input name="telephone" value={formData.telephone} onChange={handleChange}
                  className={`${inputClass} ${errors.telephone ? 'border-red-500' : ''}`}
                  placeholder="+226 XX XX XX XX" />
                {errors.telephone && <p className="mt-1 text-sm text-red-500">{errors.telephone}</p>}
              </div>
            </div>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-xl font-bold text-red-700 mb-4">2. Détails de votre demande</h3>
            {renderChampsSpecifiques()}
          </div>

          <div>
            <h3 className="text-xl font-bold text-red-700 mb-4">3. Message</h3>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4"
              placeholder="Précisions sur votre projet..."
              className={`${inputClass} resize-none`} />
          </div>

          <button type="submit" disabled={loading}
            className={`w-full py-4 bg-yellow-400 text-blue-900 font-bold italic text-lg rounded-full shadow-lg transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-yellow-500 hover:scale-[1.02]'}`}>
            {loading ? ' Préparation...' : ` ENVOYER SUR WHATSAPP — ${serviceActuel.titre.toUpperCase()}`}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-white hover:text-red-700 font-semibold underline"> Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}