import { Link, useLocation } from "wouter";
import { AdPlaceholder } from "./AdPlaceholder";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Search, 
  Menu, 
  X,
  Mail,
  MapPin,
  Phone,
  Check,
  Video
} from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Accueil", href: "/" },
  { name: "Urgent", href: "/category/urgent" },
  { name: "Afrique", href: "/category/afrique" },
  { name: "International", href: "/category/international" },
  { name: "Économie", href: "/category/economie" },
  { name: "Politique", href: "/category/politique" },
  { name: "Culture", href: "/category/culture" },
  { name: "Sport", href: "/category/sport" },
  { name: "Santé", href: "/category/sante" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCookieAlert, setShowCookieAlert] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowCookieAlert(true);
    }
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true");
    setShowCookieAlert(false);
  };

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar - Dark Green */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 hidden md:block text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="font-medium text-primary-foreground/80">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <div className="h-4 w-px bg-primary-foreground/20"></div>
            <Link href="/category/urgent" className="text-accent font-bold animate-pulse hover:text-accent/80 transition-colors">
              ● FLASH INFO
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            <div className="h-4 w-px bg-primary-foreground/20"></div>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/share/1KF8R3j2wg/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Facebook size={16} /></a>
              <a href="https://www.instagram.com/cheverny.co?igsh=YzhmbXZnYjVnaWpz&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram size={16} /></a>
              <a href="https://www.tiktok.com/@kassirii?_r=1&_t=ZN-94PEfSWrBSA" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><SiTiktok size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "glass-header shadow-sm py-2" : "bg-card py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -ml-2 text-foreground hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <img 
                src="https://i.postimg.cc/svnMcvGF/IMG_4031.jpg" 
                alt="Logo Kassiri Pulse" 
                className="w-10 h-10 md:w-14 md:h-14 rounded-xl object-cover shadow-sm"
              />
              <div className="flex flex-col items-start">
                <h1 className="font-serif text-2xl md:text-4xl font-black text-[#E11D48] tracking-tight group-hover:text-[#BE123C] transition-colors">
                  KASSIRI <span className="text-[#E11D48]">PULSE</span>
                </h1>
                <span className="text-[9px] md:text-xs tracking-[0.2em] font-semibold text-muted-foreground uppercase mt-0.5">
                  Actualité Africaine & Internationale
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 font-medium text-sm">
              {NAV_LINKS.slice(0, 7).map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md transition-colors hover:text-accent hover:bg-accent/5",
                    location === link.href ? "text-accent font-bold" : "text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search & Actions */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-foreground hover:bg-secondary rounded-full transition-colors hidden sm:block">
                <Search size={20} />
              </button>
              <Link href="/contact" className="hidden md:flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full font-semibold text-sm transition-all shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/30">
                S'abonner
              </Link>
            </div>
          </div>
        </div>

        {/* Ad Space below header on desktop */}
        <div className="hidden md:block max-w-4xl mx-auto px-4 mt-4">
          <AdPlaceholder format="horizontal" className="h-[90px]" />
        </div>
      </header>

      {/* Cookie Alert */}
      {showCookieAlert && (
        <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 bg-card border-t shadow-2xl animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p>Ce site utilise des cookies pour vous offrir la meilleure expérience utilisateur. En continuant à naviguer, vous acceptez leur utilisation. <Link href="/confidentialite" className="text-accent hover:underline">En savoir plus</Link></p>
            </div>
            <button 
              onClick={acceptCookies}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap"
            >
              <Check size={16} /> Accepter
            </button>
          </div>
        </div>
      )}

            {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}></div>
          <div className="relative w-[80%] max-w-sm bg-card h-full shadow-2xl flex flex-col animate-in slide-in-from-left">
            <div className="p-4 border-b flex justify-between items-center bg-[#E11D48] text-white">
              <h2 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <img 
                  src="https://i.postimg.cc/svnMcvGF/IMG_4031.jpg" 
                  alt="Logo" 
                  className="w-8 h-8 rounded-lg object-cover"
                />
                KASSIRI <span className="text-white">PULSE</span>
              </h2>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2 text-white/80 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                    location === link.href ? "bg-accent/10 text-accent font-bold" : "text-foreground hover:bg-secondary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="my-4 border-t border-border"></div>
              
              <Link href="/contact" className="px-4 py-3 text-foreground hover:bg-secondary rounded-lg font-medium">Contact</Link>
              <Link href="/a-propos" className="px-4 py-3 text-foreground hover:bg-secondary rounded-lg font-medium">À propos</Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#E11D48] text-white mt-20 border-t-4 border-accent relative overflow-hidden">
        {/* Subtle background pattern in footer */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="font-serif text-3xl font-black text-white tracking-tight">
                KASSIRI <span className="text-white">PULSE</span>
              </h3>
              <p className="text-white font-medium text-sm leading-relaxed max-w-xs">
                Votre source d'information fiable et indépendante pour l'actualité africaine et internationale. L'information au cœur de l'action.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.facebook.com/share/1KF8R3j2wg/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors text-white"><Facebook size={18} /></a>
                <a href="https://www.instagram.com/cheverny.co?igsh=YzhmbXZnYjVnaWpz&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors text-white"><Instagram size={18} /></a>
                <a href="https://www.tiktok.com/@kassirii?_r=1&_t=ZN-94PEfSWrBSA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors text-white"><SiTiktok size={16} /></a>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span> Rubriques
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {NAV_LINKS.slice(1).map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white font-medium hover:underline transition-colors text-sm flex items-center gap-2">
                      <span className="text-white/60 text-xs">›</span> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span> Contact
              </h4>
              <ul className="space-y-4 text-sm text-white font-medium">
                <li className="flex items-start gap-3">
                  <MapPin className="text-white shrink-0 mt-0.5" size={18} />
                  <span>Rue 10.18, Bobo Dioulasso<br/>Burkina Faso</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-white shrink-0" size={18} />
                  <span>+226 62 32 24 32</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-white shrink-0" size={18} />
                  <span>contact@kassiripulse.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-serif text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span> Newsletter
              </h4>
              <p className="text-white font-medium text-sm mb-4">
                Abonnez-vous pour recevoir l'essentiel de l'actualité chaque matin.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="w-full px-4 py-3 rounded-md bg-white/20 border border-white/40 text-white placeholder:text-white/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium"
                />
                <button className="w-full px-4 py-3 rounded-md bg-white text-[#E11D48] font-bold transition-colors text-sm shadow-lg">
                  S'abonner
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white font-medium">
            <p>© {new Date().getFullYear()} Kassiri Pulse. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="/a-propos" className="hover:text-white transition-colors underline underline-offset-4">À propos</Link>
              <Link href="/mentions-legales" className="hover:text-white transition-colors underline underline-offset-4">Mentions légales</Link>
              <Link href="/confidentialite" className="hover:text-white transition-colors underline underline-offset-4">Confidentialité</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
