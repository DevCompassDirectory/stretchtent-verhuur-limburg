import { ProjectCard } from "@/components/ProjectCard";

const Projects = () => {
  const projects = [
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
    },
    {
      id: "4",
      title: "Festival in Roermond",
      description: "Meerdere stretchtenten voor een tweedaags muziekfestival.",
      image: "/photo-1470813740244-df37b8c1edcb",
      date: "5 September 2023",
      category: "Festival"
    },
    {
      id: "5",
      title: "Jubileum Viering",
      description: "50-jarig bedrijfsjubileum met stretchtent setup voor 150 personen.",
      image: "/photo-1500375592092-40eb2168fd21",
      date: "12 September 2023",
      category: "Zakelijk"
    },
    {
      id: "6",
      title: "Zomerfeest Sittard",
      description: "Gemeentelijk zomerfeest met grote stretchtent configuratie.",
      image: "/photo-1458668383970-8ddd3927deed",
      date: "20 September 2023",
      category: "Feest"
    }
  ];

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Onze Projecten</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek onze meest recente projecten en laat u inspireren voor uw volgende evenement
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;