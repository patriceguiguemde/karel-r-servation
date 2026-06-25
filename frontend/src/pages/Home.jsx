import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <section id="accueil" className="relative h-screen w-full flex items-start justify-center overflow-hidden pt-32">
        <img src="/images/accueil3.jpg" alt="Hero" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: 'center 40%' }} />
        <div className="absolute inset-0 bg-black/60"></div>
       <div className="relative z-10 text-center text-white px-4 w-full mx-auto pb-20">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl !text-white" style={{color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,0.9)'}}>
  Karel Travels Excursions
</h1>
          <p className="text-lg sm:text-xl md:text-3xl mb-4 md:mb-6 drop-shadow-lg font-light text-white">Réservez vos voyages en toute simplicité et profitez d'un service de qualité.</p>
          <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 text-white">Dans nos offres d'excursion et voyages</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            <a href="#services" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-blue-900 px-8 py-3 md:px-10 md:py-4 rounded-full font-semibold transition-all duration-300 text-center">Découvrir nos services</a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-10 h-16 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      <section id="services" className="py-12 md:py-20 bg-gray-100">
        <div className="w-full px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-red-700">Nos Services</h2>
          <p className="text-center text-gray-600 mb-10 md:mb-12 text-base md:text-lg mx-auto">Une gamme complète de prestations sur mesure pour vos déplacements et séjours</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
              <img src="/images/vol3.jpg" alt="Billets d'Avion" className="w-full h-52 sm:h-64 md:h-80 object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&h=500&q=80' }} />
              <div className="p-5 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-red-700 mb-2">Billets d'Avion</h3>
                <p className="text-blue-500 text-sm">Réservez vos billets d'avion au meilleur prix, vers toutes les destinations.</p>
                 <Link to="/reservation/vol" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
        Réserver maintenant
      </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
              <img src="/images/hotel10.jpg" alt="Hôtellerie & Séjours" className="w-full h-52 sm:h-64 md:h-80 object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&h=500&q=80' }} />
              <div className="p-5 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">Hôtellerie & Séjours</h3>
                <p className="text-blue-500 text-sm">Réservez votre chambre d'hotel idéal: confort garanti, tarifs avantageux pour individuels et groupes.</p>
                <Link to="/reservation/hotel" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
        Réserver maintenant
      </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
              <img src="/images/site.jpg" alt="Excursions & Tours" className="w-full h-52 sm:h-64 md:h-80 object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&h=500&q=80' }} />
              <div className="p-5 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">Sites touristiques</h3>
                <p className="text-blue-500 text-sm">Découvrez nos circuits touristiques inoubliables et profitez de transferts aéroport simples et confortables.</p>
                <Link to="/reservation/excursion" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
        Réserver maintenant
      </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
              <img src="/images/vehicule2.jpg" alt="Location de Véhicules" className="w-full h-52 sm:h-64 md:h-80 object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&h=500&q=80' }} />
              <div className="p-5 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">Location de Véhicules</h3>
                <p className="text-blue-500 text-sm">Des véhicules récents et confortables pour tous vos déplacements, avec ou sans chauffeur.</p>
                <Link to="/reservation/vehicule" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
        Réserver maintenant
      </Link>
              </div>
            </div>
            {/* NOUVEAU : Change de Devises */}
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
              <img src="/images/echang2.jpg" alt="Change de Devises" className="w-full h-52 sm:h-64 md:h-80 object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&h=500&q=80' }} />
              <div className="p-5 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">Change de Devises</h3>
                <p className="text-blue-500 text-sm">Échangez vos devises aux meilleurs taux disponibles, rapidement et en toute sécurité.</p>
                 <Link to="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
      Nous contacter
    </Link>
              </div>
            </div>
            
            {/*  NOUVEAU : Conseil & Accompagnement Visa */}
            <div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white">
              <img src="/images/visa2.jpg" alt="Conseil et Accompagnement Visa" className="w-full h-52 sm:h-64 md:h-80 object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=500&q=80' }} />
              <div className="p-5 md:p-6 text-center">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">Conseil & Accompagnement Visa</h3>
                <p className="text-blue-500 text-sm">Nous vous guidons dans toutes les démarches pour l'obtention de votre visa : constitution du dossier, suivi et conseils personnalisés.</p>
                <Link to="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
      Nous contacter
    </Link>
              </div>
            </div>
            {/* Prestation d'Hôtesse */}
<div className="flex flex-col rounded-3xl overflow-hidden shadow-md bg-white col-span-1 sm:col-span-2">
  <img src="/images/hotesse3.jpg" alt="Prestation d'Hôtesse" className="w-full h-52 sm:h-64 md:h-80 object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&h=500&q=80' }} />
  <div className="p-5 md:p-6 text-center flex flex-col flex-grow">
    <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2">Prestation d'Hôtesse</h3>
    <p className="text-blue-500 text-sm mb-4 flex-grow">Nous mettons à votre disposition des hôtesses professionnelles pour vos événements, conférences et accueils VIP.</p>
    <Link to="/contact" className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition">
      Nous contacter
    </Link>
  </div>
</div>
          </div>
        </div>
      </section>

      <section id="apropos" className="py-12 md:py-20 bg-[#F5F2EB]">
        <div className="w-full px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4 md:mb-6">Notre Histoire</h2>
              <p className="text-gray-700 leading-relaxed mb-4">Depuis 2014, Karel Travels Excursions accompagne voyageurs d'affaires et touristes dans l'organisation de leurs déplacements au Burkina Faso et à l'international.</p>
              <p className="text-gray-700 leading-relaxed mb-6 md:mb-8">Notre philosophie repose sur l'écoute personnalisée : chaque itinéraire est pensé pour répondre exactement à vos besoins.</p>
              <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-md">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">500+</div>
                  <div className="text-blue-600 text-sm md:text-base">Clients satisfaits</div>
                </div>
                <div className="text-center p-4 md:p-6 bg-white rounded-xl shadow-md">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">12</div>
                  <div className="text-blue-600 text-sm md:text-base">Années d'expérience</div>
                </div>
              </div>
              <Link to="/contact" className="inline-block bg-blue-600 text-white px-6 md:px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl">Rencontrer l'équipe</Link>
            </div>
            <div className="relative mt-6 lg:mt-0">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img src="/images/admin.jpg" alt="Équipe Karel Travels" className="w-full h-72 sm:h-96 lg:h-[500px] object-cover" onError={(e) => { e.target.src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=500&q=80' }} />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg">
                  <p className="font-bold text-gray-800 text-base md:text-lg">Direction Karel Travels</p>
                  <p className="text-gray-600 text-xs md:text-sm">Experts en voyages et tourisme</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-blue-900 text-white text-center relative overflow-hidden">
        <div className="w-full px-4 md:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 !text-white">Prêt à préparer votre voyage ?</h2>
          <p className="text-base md:text-xl mb-6 md:mb-8 text-blue-100">Laissez-nous organiser chaque détail. Réservez en ligne ou contactez-nous pour un devis personnalisé.</p>
          <Link to="/reservation" className="inline-block bg-white text-blue-900 px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-base md:text-lg hover:bg-gray-100 transition shadow-2xl hover:scale-105">Prendre rendez-vous</Link>
        </div>
      </section>

    </div>
  );
}