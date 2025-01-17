import { Facebook, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">StretchTent Limburg</h3>
            <p className="text-muted-foreground">
              Specialist in het verhuren van stretchtenten voor al uw evenementen in Limburg en omstreken.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <a href="tel:+31612345678" className="flex items-center gap-2 hover:text-primary/80 transition-colors">
                <Phone size={18} />
                <span>+31 6 12345678</span>
              </a>
              <a href="mailto:info@stretchtentverhuurlimburg.nl" className="flex items-center gap-2 hover:text-primary/80 transition-colors">
                <Mail size={18} />
                <span>info@stretchtentverhuurlimburg.nl</span>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Volg ons</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary/80 transition-colors" aria-label="Facebook">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-primary/80 transition-colors" aria-label="Instagram">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} StretchTent Limburg. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary/80 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/algemene-voorwaarden" className="hover:text-primary/80 transition-colors">
                Algemene Voorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};