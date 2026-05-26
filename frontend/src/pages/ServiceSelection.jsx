import { Link } from 'react-router-dom';
import voiture2Img from '../assets/icons/voiture2.png';
import Hotel1Img from '../assets/icons/Hotel1.png';
import TourismeImg from '../assets/icons/Tourisme.png';
import VolImg from '../assets/icons/vol.png';

export default function ServiceSelection() {
  const services = [
    { 
      slug: 'vol', 
      title: 'Billets d\'Avion', 
      desc: 'Réservez vos vols aux meilleurs prix, partout dans le monde',
      gradient: 'from-sky-400 to-blue-600',
      icon: <img src={VolImg} alt="Vol" className="w-10 h-10 object-contain" />
      
    },
    { 
      slug: 'hotel', 
      title: 'Hôtels', 
      desc: 'Trouvez l\'hébergement parfait pour votre séjour',
      gradient: 'from-purple-400 to-indigo-600',
      icon: <img src={Hotel1Img} alt="Hotel1" className="w-10 h-10 object-contain" />
      
    },
    { 
      slug: 'vehicule', 
      title: 'Location Véhicule', 
      desc: 'Louez la voiture adaptée à vos besoins',
      gradient: 'from-emerald-400 to-green-600',
      icon: <img src={voiture2Img} alt="Voiture2" className="w-10 h-10 object-contain" />
    },
    { 
      slug: 'excursion', 
      title: 'Excursions', 
      desc: 'Vivez des expériences uniques et inoubliables',
      gradient: 'from-orange-400 to-amber-600',
        icon: <img src={TourismeImg} alt="Tourisme" className="w-10 h-10 object-contain" />
      
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EB] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Retour */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2c5e3a] font-medium mb-8 transition">
           Retour à l'accueil
        </Link>
        
        {/*  Titre */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Nos Services de Réservation
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Choisissez le service qui correspond à votre besoin
        </p>
        
        {/*  Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link 
              key={service.slug}
              to={`/reservation/${service.slug}`}
              className={`group relative bg-gradient-to-br ${service.gradient} rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1`}
            >
              {/*  Overlay blanc semi-transparent */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
              
              {/*  Contenu */}
              <div className="relative z-10 p-6 flex flex-col flex-grow text-center h-full">
                
                
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gray-50/80 border-2 border-dashed border-gray-300 group-hover:border-[#9caf88] group-hover:bg-white transition-all flex items-center justify-center">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#2c5e3a] transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {service.desc}
                </p>
                
                {/*  Bouton de réservation */}
                <span className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#F5F2EB] text-[#2c5e3a] font-semibold text-sm group-hover:bg-[#9caf88] group-hover:text-white transition-all">
                  Réserver maintenant
                  <span className="group-hover:translate-x-1 transition-transform"></span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}