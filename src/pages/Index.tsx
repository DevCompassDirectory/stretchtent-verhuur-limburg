import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";

const Home = () => {
  const featuredProjects = [
    {
      id: "1",
      title: "Bruiloft in Kasteel Hoensbroek",
      description: "Een elegante stretchtent setup voor een intieme bruiloft in de tuinen van Kasteel Hoensbroek.",
      image: "/photo-1482938289607-e9573fc25ebb",
      date: "15 Juni 2023",
      category: "Bruiloft"
    },
    {
      id: "2",
      title: "Bedrijfsevenement Maastricht",
      description: "Grote stretchtent configuratie voor een corporate event met meer dan 200 gasten.",
      image: "/photo-1509316975850-ff9c5deb0cd9",
      date: "22 Juli 2023",
      category: "Zakelijk"
    },
    {
      id: "3",
      title: "Tuinfeest in Valkenburg",
      description: "Gezellige stretchtent opstelling voor een privé tuinfeest met live muziek.",
      image: "/photo-1513836279014-a89f7a76ae86",
      date: "8 Augustus 2023",
      category: "Feest"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/photo-1518495973542-4542c06a5843"
            alt="Stretchtent bij zonsondergang"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
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

      {/* About Section */}
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
                src="/photo-1469474968028-56623f02e42e"
                alt="Stretchtent setup"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recente Projecten</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ontdek hoe wij verschillende evenementen hebben getransformeerd met onze stretchtenten
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <a href="/projects">Bekijk Alle Projecten</a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Klaar om uw evenement naar het volgende niveau te tillen?
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Neem contact met ons op voor een vrijblijvende offerte en ontdek hoe wij uw evenement kunnen verrijken
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="/contact">Neem Contact Op</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;