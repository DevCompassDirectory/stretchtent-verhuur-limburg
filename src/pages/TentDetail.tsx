import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowLeft, Check } from "lucide-react";

const tents = [
  {
    id: "small",
    name: "Compact Stretchtent",
    size: "10 x 15m",
    capacity: "Tot 100 personen",
    description: "Perfect voor kleinere evenementen zoals intieme bruiloften en tuinfeesten.",
    features: [
      "Snelle opzettijd",
      "Compact design",
      "Flexibele configuratie",
      "Waterafstotend materiaal"
    ],
    image: "/photo-1482938289607-e9573fc25ebb",
    specifications: {
      width: "10 meter",
      length: "15 meter",
      height: "4.5 meter",
      area: "150m²"
    }
  },
  {
    id: "medium",
    name: "Event Stretchtent",
    size: "15 x 20m",
    capacity: "Tot 200 personen",
    description: "Ideaal voor middelgrote evenementen zoals bedrijfsfeesten en grote bruiloften.",
    features: [
      "Modulair systeem",
      "LED verlichting mogelijk",
      "Meerdere configuraties",
      "UV-bestendig"
    ],
    image: "/photo-1469474968028-56623f02e42e",
    specifications: {
      width: "15 meter",
      length: "20 meter",
      height: "5 meter",
      area: "300m²"
    }
  },
  {
    id: "large",
    name: "Festival Stretchtent",
    size: "20 x 30m",
    capacity: "Tot 400 personen",
    description: "De perfecte oplossing voor grote evenementen en festivals.",
    features: [
      "Maximale flexibiliteit",
      "Geschikt voor alle weersomstandigheden",
      "Professioneel geluidssysteem mogelijk",
      "Inclusief noodverlichting"
    ],
    image: "/photo-1470813740244-df37b8c1edcb",
    specifications: {
      width: "20 meter",
      length: "30 meter",
      height: "6 meter",
      area: "600m²"
    }
  }
];

const relatedProjects = {
  "small": [
    {
      id: "1",
      title: "Bruiloft in Kasteel Hoensbroek",
      description: "Een elegante stretchtent setup voor een intieme bruiloft in de tuinen van Kasteel Hoensbroek.",
      image: "/photo-1482938289607-e9573fc25ebb",
      date: "15 Juni 2023",
      category: "Bruiloft"
    }
  ],
  "medium": [
    {
      id: "2",
      title: "Bedrijfsevenement Maastricht",
      description: "Grote stretchtent configuratie voor een corporate event met meer dan 200 gasten.",
      image: "/photo-1509316975850-ff9c5deb0cd9",
      date: "22 Juli 2023",
      category: "Zakelijk"
    }
  ],
  "large": [
    {
      id: "4",
      title: "Festival in Roermond",
      description: "Meerdere stretchtenten voor een tweedaags muziekfestival.",
      image: "/photo-1470813740244-df37b8c1edcb",
      date: "5 September 2023",
      category: "Festival"
    }
  ]
};

const TentDetail = () => {
  const { id } = useParams();
  const tent = tents.find(t => t.id === id);
  const projects = relatedProjects[id as keyof typeof relatedProjects] || [];

  if (!tent) {
    return (
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold">Tent niet gevonden</h1>
          <Button asChild className="mt-4">
            <Link to="/stretchtenten">Terug naar Stretchtenten</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/stretchtenten" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Terug naar Stretchtenten
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square">
            <img
              src={tent.image}
              alt={tent.name}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{tent.name}</h1>
            <p className="text-muted-foreground">{tent.description}</p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Specificaties</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Breedte</p>
                  <p className="font-medium">{tent.specifications.width}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lengte</p>
                  <p className="font-medium">{tent.specifications.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hoogte</p>
                  <p className="font-medium">{tent.specifications.height}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Oppervlakte</p>
                  <p className="font-medium">{tent.specifications.area}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Kenmerken</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {tent.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check size={16} className="text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" asChild>
              <Link to="/contact">Offerte Aanvragen</Link>
            </Button>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Gerelateerde Projecten</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TentDetail;
