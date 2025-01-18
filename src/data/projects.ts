export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  date: string;
  category: string;
  gallery: string[];
  specs: {
    tentSize: string;
    capacity: string;
    setup: string;
    location: string;
  };
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Bruiloft in Kasteel Hoensbroek",
    description: "Een elegante stretchtent setup voor een intieme bruiloft in de tuinen van Kasteel Hoensbroek.",
    fullDescription: `Voor deze prachtige bruiloft in Kasteel Hoensbroek hebben we een elegante stretchtent opgezet die perfect aansloot bij de historische locatie. De tent bood ruimte aan 100 gasten en werd ingericht met sfeervolle verlichting en decoratie die perfect paste bij het thema van de bruiloft.

De stretchtent werd strategisch geplaatst om optimaal gebruik te maken van de kasteeltuinen, waarbij we zorgden voor een naadloze overgang tussen de binnenruimte en de buitenomgeving. De flexibele configuratie van de tent maakte het mogelijk om verschillende zones te creëren voor het diner, de dansvloer en een lounge gebied.`,
    image: "/lovable-uploads/3af388d3-afeb-4c98-9395-37692e3002e0.png",
    date: "15 Juni 2023",
    category: "Bruiloft",
    gallery: [
      "/lovable-uploads/3af388d3-afeb-4c98-9395-37692e3002e0.png",
      "/lovable-uploads/46c1ccce-6b21-4d68-910d-a0cf845c1594.png",
      "/lovable-uploads/69e87368-8229-4425-bfe6-926b1b98030c.png"
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
    image: "/lovable-uploads/46c1ccce-6b21-4d68-910d-a0cf845c1594.png",
    date: "22 Juli 2023",
    category: "Zakelijk",
    gallery: [
      "/lovable-uploads/46c1ccce-6b21-4d68-910d-a0cf845c1594.png",
      "/lovable-uploads/3af388d3-afeb-4c98-9395-37692e3002e0.png",
      "/lovable-uploads/69e87368-8229-4425-bfe6-926b1b98030c.png"
    ],
    specs: {
      tentSize: "15 x 25 meter",
      capacity: "200+ personen",
      setup: "Theater & Receptie opstelling",
      location: "Maastricht"
    }
  },
  {
    id: "3",
    title: "Tuinfeest in Valkenburg",
    description: "Gezellige stretchtent opstelling voor een privé tuinfeest met live muziek.",
    fullDescription: `Een intiem tuinfeest in Valkenburg werd getransformeerd tot een magische setting met onze stretchtent oplossing. De tent werd perfect geïntegreerd in de natuurlijke omgeving van de tuin, waarbij we optimaal gebruik maakten van de beschikbare ruimte.

De opstelling werd voorzien van een podium voor live muziek, een gezellige bar area en voldoende zitgelegenheid voor alle gasten. De sfeervolle verlichting en decoratie creëerden een warme en uitnodigende ambiance die perfect paste bij het karakter van het feest.`,
    image: "/lovable-uploads/69e87368-8229-4425-bfe6-926b1b98030c.png",
    date: "8 Augustus 2023",
    category: "Feest",
    gallery: [
      "/lovable-uploads/69e87368-8229-4425-bfe6-926b1b98030c.png",
      "/lovable-uploads/3af388d3-afeb-4c98-9395-37692e3002e0.png",
      "/lovable-uploads/46c1ccce-6b21-4d68-910d-a0cf845c1594.png"
    ],
    specs: {
      tentSize: "8 x 12 meter",
      capacity: "75 personen",
      setup: "Feest & Lounge opstelling",
      location: "Valkenburg"
    }
  },
  {
    id: "4",
    title: "Festival in Roermond",
    description: "Meerdere stretchtenten voor een tweedaags muziekfestival.",
    fullDescription: `Voor dit tweedaagse muziekfestival in Roermond hebben we een complete festival-setting gecreëerd met meerdere stretchtenten. De hoofdtent diende als main stage, terwijl kleinere tenten werden ingezet voor bars, food courts en chill-out areas.

De verschillende tenten werden strategisch geplaatst om een natuurlijke flow over het festivalterrein te creëren. Door het gebruik van verschillende maten en configuraties konden we voor elke activiteit de perfecte ruimte bieden, van intieme loungegebieden tot grote dansvloeren.`,
    image: "/lovable-uploads/7ee4fd54-25f9-481e-a15d-b774fe108b8a.png",
    date: "5 September 2023",
    category: "Festival",
    gallery: [
      "/lovable-uploads/7ee4fd54-25f9-481e-a15d-b774fe108b8a.png",
      "/lovable-uploads/758626f0-c8d3-4cd8-97fe-3e57b0cb0cc6.png",
      "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png"
    ],
    specs: {
      tentSize: "Diverse maten",
      capacity: "500+ personen",
      setup: "Festival configuratie",
      location: "Roermond"
    }
  },
  {
    id: "5",
    title: "Jubileum Viering",
    description: "50-jarig bedrijfsjubileum met stretchtent setup voor 150 personen.",
    fullDescription: `Voor het 50-jarig jubileum van een gerenommeerd bedrijf hebben we een elegante stretchtent opstelling gerealiseerd. De ruimte werd ingericht om zowel het formele gedeelte van de viering als het feestelijke avondprogramma te accommoderen.

De tent werd voorzien van een podium voor speeches en presentaties, een uitgebreid buffet area en een ruime dansvloer. De inrichting weerspiegelde de professionaliteit van het bedrijf, terwijl de stretchtent zelf voor een unieke en moderne uitstraling zorgde.`,
    image: "/lovable-uploads/758626f0-c8d3-4cd8-97fe-3e57b0cb0cc6.png",
    date: "12 September 2023",
    category: "Zakelijk",
    gallery: [
      "/lovable-uploads/758626f0-c8d3-4cd8-97fe-3e57b0cb0cc6.png",
      "/lovable-uploads/7ee4fd54-25f9-481e-a15d-b774fe108b8a.png",
      "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png"
    ],
    specs: {
      tentSize: "12 x 18 meter",
      capacity: "150 personen",
      setup: "Ceremonie & Feest opstelling",
      location: "Maastricht"
    }
  },
  {
    id: "6",
    title: "Zomerfeest Sittard",
    description: "Gemeentelijk zomerfeest met grote stretchtent configuratie.",
    fullDescription: `Het jaarlijkse zomerfeest van de gemeente Sittard werd dit jaar extra speciaal met onze grote stretchtent configuratie. De opstelling bood ruimte aan verschillende activiteiten en entertainment voor alle leeftijden.

De tent werd zo ingericht dat er verschillende zones ontstonden voor kinderactiviteiten, een hoofdpodium voor optredens, een food court en gezellige zithoeken. De open structuur van de stretchtent zorgde voor een perfecte verbinding met de buitenomgeving en creëerde een luchtige, zomerse sfeer.`,
    image: "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png",
    date: "20 September 2023",
    category: "Feest",
    gallery: [
      "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png",
      "/lovable-uploads/7ee4fd54-25f9-481e-a15d-b774fe108b8a.png",
      "/lovable-uploads/758626f0-c8d3-4cd8-97fe-3e57b0cb0cc6.png"
    ],
    specs: {
      tentSize: "20 x 30 meter",
      capacity: "300+ personen",
      setup: "Multi-zone opstelling",
      location: "Sittard"
    }
  }
];