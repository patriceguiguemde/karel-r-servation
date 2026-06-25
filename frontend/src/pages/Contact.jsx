import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({ 
    nom: '', prenom: '', telephone: '', email: '', sujet: '', message: '',
    // Champs Change de Devises
    devise_source: '', devise_cible: '', montant: '',
    // Champs Visa
    pays_destination: '', type_visa: '', date_voyage: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    let champsSpecifiques = '';

    if (formData.sujet === 'Change de Devises') {
      champsSpecifiques = `
Devise à échanger : ${formData.devise_source}
Devise souhaitée : ${formData.devise_cible}
Montant : ${formData.montant}`;
    } else if (formData.sujet === 'Conseil & Accompagnement Visa') {
      champsSpecifiques = `
Pays de destination : ${formData.pays_destination}
Type de visa : ${formData.type_visa}
Date de voyage prévue : ${formData.date_voyage}`;
    }

    const whatsappMessage =
`NOUVEAU MESSAGE - SITE WEB

Nom complet : ${formData.nom} ${formData.prenom}
Téléphone : ${formData.telephone}
Email : ${formData.email}
Service : ${formData.sujet}
${champsSpecifiques}

Message :
${formData.message}


Merci de me recontacter .`;

    window.open(`https://wa.me/22674199797?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ 
        nom: '', prenom: '', telephone: '', email: '', sujet: '', message: '',
        devise_source: '', devise_cible: '', montant: '',
        pays_destination: '', type_visa: '', date_voyage: ''
      });
    }, 4000);
  };

  const whatsappIcon = (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );

  const inputClass = "w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-sm md:text-base";

  return (
    <div className="min-h-screen bg-blue-300 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">

        <Link to="/" className="inline-flex items-center gap-2 !text-white hover:text-blue-600 font-medium mb-6 md:mb-8 transition text-sm md:text-base">
           Retour à l'accueil
        </Link>

        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-800 mb-2 md:mb-3">Contact</h1>
          <p className="text-white text-base md:text-xl">Nous sommes là pour répondre à toutes vos questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

          <div className="space-y-6 md:space-y-8">
            {[
              {
                icon: <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />,
                title: 'Adresse',
                content: <><p className="text-white text-sm md:text-base">Secteur 22</p><p className="text-white text-sm md:text-base">Bobo-Dioulasso, Burkina Faso</p></>
              },
              {
                icon: <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />,
                title: 'Téléphone',
                content: <p className="text-white text-sm md:text-base">+226 74 19 97 97 / 70 22 06 63</p>
              },
              {
                icon: <><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></>,
                title: 'Email',
                content: <p className="text-white text-sm md:text-base break-all">karelvoyages@gmail.com</p>
              },
              {
                icon: <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />,
                title: 'Horaires',
                content: <p className="text-white text-sm md:text-base">Disponible 24h/24h</p>
              }
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">{item.icon}</svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1">{item.title}</h3>
                  {item.content}
                </div>
              </div>
            ))}

            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-green-600">{whatsappIcon}</div>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1">WhatsApp</h3>
                <a href="https://wa.me/22674199797" target="_blank" rel="noopener noreferrer"
                  className="text-white hover:text-green-600 transition font-medium text-sm md:text-base">
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>

            <div className="pt-2 md:pt-4">
              <h3 className="font-bold text-gray-800 text-base md:text-lg mb-3 md:mb-4">Suivez-nous</h3>
              <div className="flex gap-3 md:gap-4">
                <a href="https://www.facebook.com/share/1JP1pPqzwy/?mibxtid=wwXlfr" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition">
                  <span className="text-blue-600 font-bold text-sm">f</span>
                </a>
                
              </div>
            </div>
          </div>

          {/* FORMULAIRE */}
          <div className="bg-blue-100 rounded-2xl p-5 md:p-8 lg:p-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">Envoyez-nous un message</h2>
            <p className="text-gray-500 text-sm md:text-base mb-5 md:mb-6">Le message sera envoyé directement sur WhatsApp</p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

              {/* Champs communs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="nom" placeholder="Nom" required value={formData.nom} onChange={handleChange} className={inputClass} />
                <input type="text" name="prenom" placeholder="Prénom" required value={formData.prenom} onChange={handleChange} className={inputClass} />
              </div>
              <input type="tel" name="telephone" placeholder="Téléphone" required value={formData.telephone} onChange={handleChange} className={inputClass} />
              <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className={inputClass} />

              {/* Menu service */}
              <select name="sujet" required value={formData.sujet} onChange={handleChange} className={inputClass}>
                <option value="">-- Choisissez un service --</option>
                <option value="Change de Devises">Change de Devises</option>
                <option value="Conseil & Accompagnement Visa">Conseil & Accompagnement Visa</option>
                <option value="Prestation d'Hôtesse">Prestation d'Hôtesse</option>
              </select>

              {/* Champs spécifiques Change de Devises */}
              {formData.sujet === 'Change de Devises' && (
                <div className="space-y-4 border-l-4 border-blue-400 pl-4">
                  <p className="text-blue-700 font-semibold text-sm">Détails du change</p>
                  <select name="devise_source" required value={formData.devise_source} onChange={handleChange} className={inputClass}>
                    <option value="">Devise à échanger</option>
                    <option value="Euro (EUR)">Euro (EUR)</option>
                    <option value="Dollar US (USD)">Dollar US (USD)</option>
                    <option value="Livre Sterling (GBP)">Livre Sterling (GBP)</option>
                    <option value="Franc CFA (XOF)">Franc CFA (XOF)</option>
                    <option value="Dirham (MAD)">Dirham (MAD)</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <select name="devise_cible" required value={formData.devise_cible} onChange={handleChange} className={inputClass}>
                    <option value="">Devise souhaitée</option>
                    <option value="Euro (EUR)">Euro (EUR)</option>
                    <option value="Dollar US (USD)">Dollar US (USD)</option>
                    <option value="Livre Sterling (GBP)">Livre Sterling (GBP)</option>
                    <option value="Franc CFA (XOF)">Franc CFA (XOF)</option>
                    <option value="Dirham (MAD)">Dirham (MAD)</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <input type="number" name="montant" placeholder="Montant à échanger" required value={formData.montant} onChange={handleChange} className={inputClass} min="0" />
                </div>
              )}

              {/* Champs spécifiques Visa */}
              {formData.sujet === 'Conseil & Accompagnement Visa' && (
                <div className="space-y-4 border-l-4 border-blue-400 pl-4">
                  <p className="text-blue-700 font-semibold text-sm">Détails du visa</p>
                  <input type="text" name="pays_destination" placeholder="Pays de destination" required value={formData.pays_destination} onChange={handleChange} className={inputClass} />
                  <select name="type_visa" required value={formData.type_visa} onChange={handleChange} className={inputClass}>
                    <option value="">Type de visa</option>
                    <option value="Tourisme">Tourisme</option>
                    <option value="Affaires">Affaires</option>
                    <option value="Études">Études</option>
                    <option value="Transit">Transit</option>
                    <option value="Regroupement familial">Regroupement familial</option>
                    <option value="Autre">Autre</option>
                  </select>
                  <input type="date" name="date_voyage" required value={formData.date_voyage} onChange={handleChange} className={inputClass} />
                </div>
              )}

              <textarea name="message" placeholder="Votre message... (optionnel)" rows={4} value={formData.message} onChange={handleChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition resize-none bg-white text-sm md:text-base" />

              <button type="submit"
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3 md:py-3.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm md:text-base">
                <div className="text-white">{whatsappIcon}</div>
                Envoyer sur WhatsApp
              </button>
            </form>

            {submitted && (
              <div className="mt-4 md:mt-6 bg-green-50 text-green-800 p-4 rounded-lg text-center font-medium border border-green-200 text-sm md:text-base">
                 WhatsApp s'ouvre avec votre message !
              </div>
            )}
          </div>
        </div>
      </div>

      <a href="https://wa.me/22674199797?text=Bonjour,%20je%20souhaite%20vous%20contacter%20depuis%20votre%20site%20web."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-4 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg transition-all z-50 group"
        aria-label="Contacter sur WhatsApp">
        <div className="text-white">{whatsappIcon}</div>
        <span className="absolute right-14 md:right-16 bg-gray-800 text-white text-xs md:text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Discuter sur WhatsApp
        </span>
      </a>
    </div>
  );
}