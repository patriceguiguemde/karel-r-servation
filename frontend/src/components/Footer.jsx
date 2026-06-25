import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

        {/* Marque & Description */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4" style={{ color: 'blue' }}>
            Karel Travels Excursions
          </h2>
          <p className="text-sm leading-relaxed mb-6 text-gray-400">
            Votre partenaire de confiance pour des voyages inoubliables au Burkina Faso et à l'international.
          </p>
          <div className="flex gap-3">
            <a href="https://www.facebook.com/share/1JP1pPqzwy/?mibxtid=wwXlfr" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-blue-600/20 hover:bg-blue-600/40 rounded-full flex items-center justify-center transition">
              <span className="text-white font-bold text-sm">f</span>
            </a>
            <a href="https://www.tiktok.com/@karelvoyage?_r=1&_t=ZS-977cnjXSFrk" target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition">
              <span className="text-white text-xs font-bold">TT</span>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-blue-500 font-bold text-lg mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            {["Billets d'avion", 'Hôtellerie', 'Excursions', 'Location véhicules'].map((item) => (
              <li key={item}>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-200 inline-block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-blue-500 font-bold text-lg mb-4">Liens utiles</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: 'À propos', to: '/#apropos' },
              { label: 'Réservation', to: '/reservation' },
              { label: 'Contact', to: '/contact' },
            ].map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-gray-400 hover:text-white transition-colors duration-200 inline-block">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-blue-500 font-bold text-lg mb-4">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5"></span>
              <span className="text-gray-400">Secteur 22<br />Bobo-Dioulasso, Burkina Faso</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-blue-400"></span>
              <a href="tel:+22674199797" className="text-gray-400 hover:text-white transition-colors">
                +226 74 19 97 97
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-0.5"></span>
              <a href="mailto:karelvoyages@gmail.com" className="text-gray-400 hover:text-white transition-colors break-all">
                karelvoyages@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Karel Travels Excursions. Tous droits réservés.</p>
      </div>
    </footer>
  );
}