import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/32b2f57b-47e0-4cf1-baff-6f2260743af8.png"
          alt="Elegante stretchtent bruiloft setup met witte decoratie en lange dinertafels"
          className="w-full h-full object-cover brightness-[0.7]"
        />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white space-y-6 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-bold">
            Creëer Bijzondere Momenten Onder Onze Stretchtenten
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Specialist in het verhuren van premium stretchtenten voor al uw evenementen in Limburg
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <a href="/contact">Offerte Aanvragen</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10" asChild>
              <a href="/projects">Bekijk Projecten</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};