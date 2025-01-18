import { ArrowRight } from "lucide-react";

export const AboutSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Waarom Kiezen voor Onze Stretchtenten?</h2>
            <p className="text-muted-foreground">
              Onze premium stretchtenten bieden de perfecte combinatie van stijl en functionaliteit. 
              Met jarenlange ervaring in het verhuren en opzetten van stretchtenten, zorgen wij voor 
              een zorgeloze ervaring voor elk type evenement.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <ArrowRight className="text-primary" size={20} />
                <span>Professionele op- en afbouw</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-primary" size={20} />
                <span>Flexibele configuraties</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="text-primary" size={20} />
                <span>Weerbestendige kwaliteit</span>
              </li>
            </ul>
          </div>
          <div className="relative aspect-square">
            <img
              src="/lovable-uploads/46c1ccce-6b21-4d68-910d-a0cf845c1594.png"
              alt="Stretchtent opgezet in een tuin met stijlvolle zithoek en decoratieve verlichting"
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};