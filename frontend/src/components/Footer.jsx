import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
       {/*  Marque & Description */}
<div>
  <h2 className="text-2xl font-bold text-white mb-4" style={{ color: 'blue' }}>
     Karel Travels Excursions 
  </h2>
  <p className="text-sm leading-relaxed mb-6" style={{ color: '#9ca3af' }}>
    Votre partenaire de confiance pour des voyages inoubliables au Burkina Faso et à l'international. Service premium, transparence et sérénité.
  </p>
  
  {/* Réseaux sociaux */}
  <div className="flex gap-3">
    <a href="#" aria-label="Facebook" className="w-9 h-9 bg-white/10 hover:bg-karel-blue rounded-full flex items-center justify-center transition-colors duration-200">
      <span style={{ color: 'white' }} className="font-bold text-sm">f</span>
    </a>
    <a href="#" aria-label="Twitter/X" className="w-9 h-9 bg-white/10 hover:bg-karel-blue rounded-full flex items-center justify-center transition-colors duration-200">
      <span style={{ color: 'white' }} className="text-sm font-bold">w</span>
    </a>
  </div>
</div>

        {/* Services */}
        <div>
          <h3 className="text-blue-600 font-bold text-lg mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {['Billets d\'avion', 'Hôtellerie', 'Excursions', 'Location véhicules'].map((item) => (
              <li key={item}>
                <a href="#services" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/*  Liens utiles */}
        <div>
          <h3 className="text-blue-600 font-bold text-lg mb-4">Liens utiles</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: 'À propos', to: '/#apropos' },
              { label: 'Réservation', to: '/reservation' },
              { label: 'Contact', to: '/contact' },
              { label: 'Connexion', to: '/login' }
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
         <h3 className="text-blue-600 font-bold text-lg mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-karel-blue"></span>
              <span className="text-gray-300">Secteur 24<br/>Bobo-Dioulasso, Burkina Faso</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-karel-blue"></span>
              <a href="tel:+22675230293" className="text-gray-300 hover:text-white transition-colors">
                +226 75 23 02 93
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-karel-blue"></span>
              <a href="mailto:patrice1@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                patrice1@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
     {/*  Copyright */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Karel Travels Excursions. Tous droits réservés.</p>
      </div>
    </footer>
  );
}