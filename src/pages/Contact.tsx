import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Bericht verzonden",
      description: "We nemen zo spoedig mogelijk contact met u op.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Heeft u vragen of wilt u een offerte aanvragen? Neem contact met ons op.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
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
                <span>Maastricht, Limburg</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  Voornaam
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Achternaam
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Telefoonnummer
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Bericht
              </label>
              <Textarea
                id="message"
                name="message"
                required
                className="min-h-[150px] w-full"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verzenden..." : "Verstuur Bericht"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;