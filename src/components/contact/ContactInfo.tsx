import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Neem Contact Op</h2>
        <p className="text-muted-foreground">
          Vul het formulier in en we nemen zo spoedig mogelijk contact met u op.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Phone className="text-primary" size={20} />
          <a href="tel:+31612345678" className="hover:text-primary/80 transition-colors">
            +31 6 12345678
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-primary" size={20} />
          <a href="mailto:info@stretchtentverhuurlimburg.nl" className="hover:text-primary/80 transition-colors">
            info@stretchtentverhuurlimburg.nl
          </a>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="text-primary" size={20} />
          <span>Heerlen, Limburg</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;