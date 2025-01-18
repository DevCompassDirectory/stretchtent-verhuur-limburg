import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get the honeypot field value
    const honeypotValue = (e.target as HTMLFormElement).website.value;
    
    // If honeypot is filled, silently reject the submission
    if (honeypotValue) {
      console.log("Potential spam detected");
      // Still show success message to avoid giving feedback to bots
      toast({
        title: "Bericht verzonden",
        description: "We nemen zo spoedig mogelijk contact met u op.",
      });
      return;
    }
    
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot field - hidden from users but visible to bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
        <label htmlFor="topic" className="text-sm font-medium">
          Onderwerp
        </label>
        <Select name="topic" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecteer een onderwerp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="offerte">Offerte aanvragen</SelectItem>
            <SelectItem value="informatie">Informatie over tenten</SelectItem>
            <SelectItem value="beschikbaarheid">Beschikbaarheid checken</SelectItem>
            <SelectItem value="samenwerking">Zakelijke samenwerking</SelectItem>
            <SelectItem value="anders">Anders</SelectItem>
          </SelectContent>
        </Select>
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
  );
};

export default ContactForm;