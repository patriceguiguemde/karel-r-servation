import { useState } from 'react';
import { Link } from 'react-router-dom';
// fonction contact
export default function Contact() {
  const [formData, setFormData] = useState({ 
    nom: '', 
    prenom: '', 
    email: '', 
    sujet: '', 
    message: '' 
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //  Créer le message WhatsApp formaté
    const whatsappMessage = 
`*NOUVEAU MESSAGE - SITE WEB*

 *Nom complet :* ${formData.nom} ${formData.prenom}
 *Email :* ${formData.email}
 *Sujet :* ${formData.sujet}

 *Message :*
${formData.message}

---
Merci de me recontacter rapidement.`;

    //  Numéro WhatsApp )
    const whatsappNumber = '22674199797';
    
    //  Creaction de l'URL WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    //  Ouvrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Afficher confirmation
    setSubmitted(true);
    
    //  Réinitialiser le formulaire
    setTimeout(() => { 
      setSubmitted(false); 
      setFormData({ nom: '', prenom: '', email: '', sujet: '', message: '' }); 
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2c5e3a] font-medium mb-8 transition"> 
          Retour à l'accueil
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold !text-blue-800 mb-3">Contact</h1>
          <p className="text-gray-600 text-xl">Nous sommes là pour répondre à toutes vos questions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/*  INFORMATIONS DE CONTACT */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#9caf88]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#9caf88]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Adresse</h3>
                <p className="text-gray-600">Secteur 22</p>
                <p className="text-gray-600">Bobo-Dioulasso, Burkina Faso</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#9caf88]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#9caf88]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Téléphone</h3>
                <p className="text-gray-600">+226 74 19 97 97/ 70 22 06 63</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#9caf88]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#9caf88]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Email</h3>
                <p className="text-gray-600">karelvoyages@gmail.com</p>
              </div>
            </div>

            {/*  WHATSAPP dans la liste */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#9caf88]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#9caf88]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">WhatsApp</h3>
                <a 
                  href="https://wa.me/22674199797" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#9caf88] transition font-medium"
                >
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#9caf88]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-[#9caf88]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">Horaires</h3>
                <p className="text-gray-600">Disponible 24h/24h</p>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-bold text-gray-800 text-lg mb-4">Suivez-nous</h3>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/share/1JP1pPqzwy/?mibxtid=wwXlfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#9caf88]/20 hover:bg-[#9caf88]/30 rounded-full flex items-center justify-center transition">
                <span className="text-[#9caf88] font-bold">f</span>
                 </a>
               <a href="#" className="w-10 h-10 bg-[#9caf88]/20 hover:bg-[#9caf88]/30 rounded-full flex items-center justify-center transition">
                  <span className="text-[#9caf88] font-bold">TT</span>
                </a>
                </div>
            </div>
          </div>

          {/*  FORMULAIRE DE CONTACT */}
          <div className="bg-[#F9F7F4] rounded-2xl p-8 md:p-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>
           <h3> Le message sera envoyé directement sur WhatsApp </h3>
            
            
            <form onSubmit={handleSubmit} className="space-y-5">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <input 
      type="text" 
      name="nom" 
      placeholder="nom" 
      required 
      value={formData.nom} 
      onChange={handleChange} 
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
    />
    <input 
      type="text" 
      name="prenom" 
      placeholder="prénom" 
      required 
      value={formData.prenom} 
      onChange={handleChange} 
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue outline-none transition bg-white" 
    />
  </div>
  
  <input 
    type="email" 
    name="email" 
    placeholder="Email" 
    required 
    value={formData.email} 
    onChange={handleChange} 
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue outline-none transition bg-white" 
  />
  
  <input 
    type="text" 
    name="sujet" 
    placeholder="Sujet" 
    required 
    value={formData.sujet} 
    onChange={handleChange} 
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue outline-none transition bg-white" 
  />
  
  {/* Champ message maintenant optionnel */}
  <textarea 
    name="message" 
    placeholder="Votre message... (optionnel)" 
    rows={6} 
    value={formData.message} 
    onChange={handleChange} 
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue outline-none transition resize-none bg-white"
  ></textarea>
  
  <button 
    type="submit" 
    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    Envoyer sur WhatsApp
  </button>
</form>

            {submitted && (
              <div className="mt-6 bg-green-50 text-green-800 p-4 rounded-lg text-center font-medium border border-green-200 animate-pulse">
                 WhatsApp s'ouvre avec votre message !
              </div>
            )}
          </div>
        </div>
      </div>

      {/*  BOUTON FLOTTANT WHATSAPP */}
      <a
        href="https://wa.me/22674199797?text=Bonjour,%20je%20souhaite%20vous%20contacter%20depuis%20votre%20site%20web."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 group"
        aria-label="Contacter sur WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="absolute right-16 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Discuter sur WhatsApp
        </span>
      </a>
    </div>
  );
}