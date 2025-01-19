import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useFooterContent } from "@/hooks/use-footer-content";

export const Footer = () => {
  const { data, isLoading } = useFooterContent();

  if (isLoading) {
    return null; // or a skeleton if you prefer
  }

  const content = data?.content;
  const socialLinks = data?.socialLinks || [];

  return (
    <footer className="bg-secondary mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{content?.title}</h3>
            <p className="text-muted-foreground">
              {content?.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              {content?.phone && (
                <a href={`tel:${content.phone}`} className="flex items-center gap-2 hover:text-primary/80 transition-colors">
                  <Phone size={18} />
                  <span>{content.phone}</span>
                </a>
              )}
              {content?.email && (
                <a href={`mailto:${content.email}`} className="flex items-center gap-2 hover:text-primary/80 transition-colors">
                  <Mail size={18} />
                  <span>{content.email}</span>
                </a>
              )}
              {content?.address && (
                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  <span>{content.address}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Volg ons</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                let Icon;
                switch (link.icon_type) {
                  case 'facebook':
                    Icon = Facebook;
                    break;
                  case 'instagram':
                    Icon = Instagram;
                    break;
                  case 'custom':
                    return (
                      <a 
                        key={link.id}
                        href={link.url}
                        className="hover:text-primary/80 transition-colors"
                        aria-label={`Visit our ${link.icon_type}`}
                        dangerouslySetInnerHTML={{ __html: link.custom_svg || '' }}
                      />
                    );
                  default:
                    return null;
                }
                
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    className="hover:text-primary/80 transition-colors"
                    aria-label={`Visit our ${link.icon_type}`}
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {content?.title}. Alle rechten voorbehouden.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary/80 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/algemene-voorwaarden" className="hover:text-primary/80 transition-colors">
                Algemene Voorwaarden
              </Link>
              <Link to="/huurvoorwaarden" className="hover:text-primary/80 transition-colors">
                Huurvoorwaarden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};