import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* ========== HERO ========== */}
      <section 
      id="accueil" className="relative h-screen w-full flex items-center justify-center overflow-hidden pt-20">
  <img
    src="/images/accueil3.jpg"
    alt="Hero"
    className="absolute inset-0 w-full h-full object-cover"
    style={{ objectPosition: 'center 40%' }}
  />
  <div className="absolute inset-0 bg-black/60"></div>
  <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
  <div className="absolute bottom-32 right-10 w-48 h-48 bg-green-400/20 rounded-full blur-2xl animate-float-delayed"></div>
  <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-lg animate-float"></div>

  <div className="relative z-10 text-center text-white px-4 w-full mx-auto">
    
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl" style={{ color: 'white' }}>
      Karel Travels Excursions
    </h1>
    
    
    <p className="text-2xl md:text-3xl mb-6 drop-shadow-lg font-light" style={{ color: 'white' }}>
      Réservez vos voyages en toute simplicité et profitez d'un service de qualité.
    </p>
    
    
    <p className="text-xl mb-10" style={{ color: '#ffffff' }}>
      Dans nos offres d'excursion et voyages
    </p>
    
    {/* Boutons */}
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  <Link 
    to="/reservation" 
    className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-2xl hover:scale-105"
  >
    Réserver maintenant
  </Link>
  <a 
    href="#services" 
    className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-blue-900 px-10 py-4 rounded-full font-semibold transition-all duration-300"
  >
    Découvrir nos services
  </a>
</div>
</div>
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
    <div className="w-10 h-16 border-2 border-white/60 rounded-full flex justify-center pt-2">
      <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
    </div>
  </div>
</section>

{/* ========== SERVICES ========== */}
<section id="services" className="py-20 bg-gray-100">
  <div className="w-full px-8">
    <h2 className="text-4xl font-bold text-center mb-3 !text-red-700">Nos Services</h2>
    <p className="text-center text-gray-600 mb-12 text-lg mx-auto">
      Une gamme complète de prestations sur mesure pour vos déplacements et séjours
    </p>

    <div className="grid grid-cols-2 gap-8 px-8">

  {/* Service - Vol */}
  <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
    <img
      src="/images/vol3.jpg"
      alt="Billets d'Avion"
      className="w-full h-80 object-cover"
      onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&h=500&q=80'}}
    />
    <div className="p-6 text-center">
     <h3 className="text-xl font-bold !text-red-700 mb-2">Billets d'Avion</h3>
      <p className="text-blue-500 mb-2 text-sm">Réservez vos billets d'avion au meilleur prix, vers toutes les destinations.</p>
   
    </div>
  </div>

  {/* Service  Hôtel */}
  <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
    <img
      src="/images/hotel10.jpg"
      alt="Hôtellerie & Séjours"
      className="w-full h-80 object-cover"
      onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&h=500&q=80'}}
    />
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold !text-red-800 mb-2">Hôtellerie & Séjours</h3>
      <p className="text-blue-500 mb-2 text-sm">Réservez votre chambre d'hotel idéal: confort garanti, tarifs avantageux pour individuels et groupes.</p>
    
    </div>
  </div>

  {/* Service  - Site touristique */}
  <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
    <img
      src="/images/site.jpg"
      alt="Excursions & Tours"
      className="w-full h-80 object-cover"
      onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&h=500&q=80'}}
    />
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold !text-red-800 mb-2">Excursions </h3>
      <p className="text-blue-500 mb-2 text-sm">Décrouvrez nos circuits touristiques inoubliables et profitez de transferts aéroport simples et confortables.</p>
  
    </div>
  </div>

  {/* Service - Véhicules */}
  <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
    <img
      src="/images/vehicule2.jpg"
      alt="Location de Véhicules"
      className="w-full h-80 object-cover"
      onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&h=500&q=80'}}
    />
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold !text-red-800 mb-2">Location de Véhicules</h3>
      <p className="text-blue-500 mb-2 text-sm">Des véhicules récents et confortables pour tous vos déplacements, avec ou sans chauffeur.</p>
  
    </div>
  </div>
   </div>

</div>
</section>

      {/* ========== À PROPOS ========== */}
      <section id="apropos" className="py-20 bg-[#F5F2EB]">
        <div className="w-full px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold !text-red-800 mb-6">Notre Histoire</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depuis 2016, Karel Travels Excursions accompagne voyageurs d'affaires et touristes dans l'organisation de leurs déplacements au Burkina Faso et à l'international.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Notre philosophie repose sur l'écoute personnalisée : chaque itinéraire est pensé pour répondre exactement à vos besoins.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="text-4xl font-bold text-yellow-600 mb-2">500+</div>
                  <div className="text-blue-600">Clients satisfaits</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-md">
                 <div className="text-4xl font-bold text-yellow-600 mb-2">13</div>
                  <div className="text-blue-600">Années d'expérience</div>
                </div>
              </div>

              <Link 
                  to="/contact" 
                     className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
                  Rencontrer l'équipe
           </Link>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/admin.jpg" 
                  alt="Équipe Karel Travels" 
                  className="w-full h-[500px] object-cover"
                  onError={(e)=>{e.target.src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=500&q=80'}}
                />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-6 py-4 rounded-xl shadow-lg">
                  <p className="font-bold text-gray-800 text-lg">Direction Karel Travels</p>
                  <p className="text-gray-600 text-sm">Experts en voyages et tourisme</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-20 bg-blue-900 text-white text-center relative overflow-hidden">
  <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float"></div>
  
  <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-float-delayed"></div>
  
  <div className="w-full px-8 relative z-10">
   <h2 className="text-4xl font-bold mb-6 !text-white">Prêt à préparer votre voyage ?</h2>
    
    <p className="text-xl mb-8 text-blue-100">
      Laissez-nous organiser chaque détail. Réservez en ligne ou contactez-nous pour un devis personnalisé.
    </p>
    <Link 
      to="/reservation" 
      /* Le texte du bouton est maintenant bleu foncé pour contraster avec le fond blanc */
      className="inline-block bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-2xl hover:scale-105"
    >
      Prendre rendez-vous
    </Link>
  </div>
</section>

    </div>
  );
}