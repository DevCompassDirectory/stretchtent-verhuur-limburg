import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

const projects = [
  {
    id: "1",
    title: "Bruiloft in Kasteel Hoensbroek",
    description: "Een elegante stretchtent setup voor een intieme bruiloft in de tuinen van Kasteel Hoensbroek.",
    fullDescription: `Voor deze prachtige bruiloft in Kasteel Hoensbroek hebben we een elegante stretchtent opgezet die perfect aansloot bij de historische locatie. De tent bood ruimte aan 100 gasten en werd ingericht met sfeervolle verlichting en decoratie die perfect paste bij het thema van de bruiloft.

De stretchtent werd strategisch geplaatst om optimaal gebruik te maken van de kasteeltuinen, waarbij we zorgden voor een naadloze overgang tussen de binnenruimte en de buitenomgeving. De flexibele configuratie van de tent maakte het mogelijk om verschillende zones te creëren voor het diner, de dansvloer en een lounge gebied.`,
    image: "/photo-1482938289607-e9573fc25ebb",
    date: "15 Juni 2023",
    category: "Bruiloft",
    gallery: [
      "/photo-1482938289607-e9573fc25ebb",
      "/photo-1509316975850-ff9c5deb0cd9",
      "/photo-1513836279014-a89f7a76ae86"
    ],
    specs: {
      tentSize: "10 x 15 meter",
      capacity: "100 personen",
      setup: "Diner & Feest configuratie",
      location: "Kasteel Hoensbroek"
    }
  },
  {
    id: "2",
    title: "Bedrijfsevenement Maastricht",
    description: "Grote stretchtent configuratie voor een corporate event met meer dan 200 gasten.",
    fullDescription: `Voor dit grootschalige bedrijfsevenement in Maastricht hebben we een uitgebreide stretchtent configuratie gerealiseerd die perfect aansloot bij de professionele uitstraling van het evenement. De opstelling bood ruimte aan meer dan 200 gasten en werd voorzien van alle moderne faciliteiten.

De tent werd ingericht met verschillende zones voor presentaties, netwerken en catering. Door de flexibele indeling konden we een optimale flow creëren voor de gasten tijdens het evenement. De moderne uitstraling van de stretchtent paste perfect bij het innovatieve karakter van het bedrijf.`,
    image: "/photo-1509316975850-ff9c5deb0cd9",
    date: "22 Juli 2023",
    category: "Zakelijk",
    gallery: [
      "/photo-1509316975850-ff9c5deb0cd9",
      "/photo-1482938289607-e9573fc25ebb",
      "/photo-1513836279014-a89f7a76ae86"
    ],
    specs: {
      tentSize: "15 x 25 meter",
      capacity: "200+ personen",
      setup: "Theater & Receptie opstelling",
      location: "Maastricht"
    }
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Project niet gevonden</h1>
          <Button asChild className="mt-4">
            <Link to="/projects">Terug naar Projecten</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/projects" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Terug naar Projecten
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {project.gallery.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${project.title} - foto ${index + 1}`}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {project.date}
                </span>
                <span className="flex items-center gap-2">
                  <Tag size={16} />
                  {project.category}
                </span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              {project.fullDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Specificaties</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tent Afmeting</p>
                  <p className="font-medium">{project.specs.tentSize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capaciteit</p>
                  <p className="font-medium">{project.specs.capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Setup</p>
                  <p className="font-medium">{project.specs.setup}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Locatie</p>
                  <p className="font-medium">{project.specs.location}</p>
                </div>
              </div>
            </div>

            <Button size="lg" asChild>
              <Link to="/contact">Offerte Aanvragen</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;