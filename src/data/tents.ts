import type { Tent } from "@/types/tent";

export const tents: Tent[] = [
  {
    id: "extra-small",
    slug: "extra-small",
    name: "Compact Mini Stretchtent",
    size: "7,5 x 10m",
    capacity: "Tot 50 personen",
    description: "Ideaal voor kleine bijeenkomsten en intieme feesten in de tuin.",
    short_description: "Perfect voor kleine bijeenkomsten.",
    features: [
      "Ultra-compact design",
      "Snelle opzettijd",
      "Flexibele configuratie",
      "Perfect voor tuinfeesten"
    ],
    image: "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png",
    width: "7,5 meter",
    length: "10 meter",
    height: "4 meter",
    area: "75m²",
    specifications: {
      width: "7,5 meter",
      length: "10 meter",
      height: "4 meter",
      area: "75m²"
    }
  },
  {
    id: "small",
    slug: "small",
    name: "Compact Stretchtent",
    size: "10 x 15m",
    capacity: "Tot 100 personen",
    description: "Perfect voor kleinere evenementen zoals intieme bruiloften en tuinfeesten.",
    short_description: "Ideaal voor kleinere evenementen.",
    features: [
      "Snelle opzettijd",
      "Compact design",
      "Flexibele configuratie",
      "Waterafstotend materiaal"
    ],
    image: "/lovable-uploads/3f4cfa7b-a0ef-46d8-897a-60b0cc061d60.png",
    width: "10 meter",
    length: "15 meter",
    height: "4.5 meter",
    area: "150m²",
    specifications: {
      width: "10 meter",
      length: "15 meter",
      height: "4.5 meter",
      area: "150m²"
    }
  },
  {
    id: "medium",
    slug: "medium",
    name: "Event Stretchtent",
    size: "15 x 20m",
    capacity: "Tot 200 personen",
    description: "Ideaal voor middelgrote evenementen zoals bedrijfsfeesten en grote bruiloften.",
    short_description: "Perfect voor middelgrote evenementen.",
    features: [
      "Modulair systeem",
      "LED verlichting mogelijk",
      "Meerdere configuraties",
      "UV-bestendig"
    ],
    image: "/lovable-uploads/7ee4fd54-25f9-481e-a15d-b774fe108b8a.png",
    width: "15 meter",
    length: "20 meter",
    height: "5 meter",
    area: "300m²",
    specifications: {
      width: "15 meter",
      length: "20 meter",
      height: "5 meter",
      area: "300m²"
    }
  },
  {
    id: "large",
    slug: "large",
    name: "Festival Stretchtent",
    size: "20 x 30m",
    capacity: "Tot 400 personen",
    description: "De perfecte oplossing voor grote evenementen en festivals.",
    short_description: "Ideaal voor grote evenementen en festivals.",
    features: [
      "Maximale flexibiliteit",
      "Geschikt voor alle weersomstandigheden",
      "Professioneel geluidssysteem mogelijk",
      "Inclusief noodverlichting"
    ],
    image: "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png",
    width: "20 meter",
    length: "30 meter",
    height: "6 meter",
    area: "600m²",
    specifications: {
      width: "20 meter",
      length: "30 meter",
      height: "6 meter",
      area: "600m²"
    }
  },
  {
    id: "custom",
    slug: "custom",
    name: "Custom Stretchtent",
    size: "Op maat",
    capacity: "Onbeperkt",
    description: "Laat een stretchtent op maat maken voor uw specifieke wensen en eisen.",
    short_description: "Volledig op maat gemaakte stretchtent oplossingen.",
    features: [
      "Volledig maatwerk",
      "Persoonlijk advies",
      "Flexibele opties",
      "Professionele begeleiding"
    ],
    image: "/lovable-uploads/69e87368-8229-4425-bfe6-926b1b98030c.png",
    width: "Op maat",
    length: "Op maat",
    height: "Op maat",
    area: "Op maat",
    specifications: {
      width: "Op maat",
      length: "Op maat",
      height: "Op maat",
      area: "Op maat"
    },
    is_custom_config: true
  }
];

export const relatedProjects = {
  "extra-small": [
    {
      id: "0",
      title: "Tuinfeest in Maastricht",
      description: "Een compacte stretchtent setup voor een gezellig tuinfeest.",
      image: "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png",
      date: "10 Juni 2023",
      category: "Tuinfeest"
    }
  ],
  "small": [
    {
      id: "1",
      title: "Bruiloft in Kasteel Hoensbroek",
      description: "Een elegante stretchtent setup voor een intieme bruiloft in de tuinen van Kasteel Hoensbroek.",
      image: "/lovable-uploads/3f4cfa7b-a0ef-46d8-897a-60b0cc061d60.png",
      date: "15 Juni 2023",
      category: "Bruiloft"
    }
  ],
  "medium": [
    {
      id: "2",
      title: "Bedrijfsevenement Maastricht",
      description: "Grote stretchtent configuratie voor een corporate event met meer dan 200 gasten.",
      image: "/lovable-uploads/7ee4fd54-25f9-481e-a15d-b774fe108b8a.png",
      date: "22 Juli 2023",
      category: "Zakelijk"
    }
  ],
  "large": [
    {
      id: "4",
      title: "Festival in Roermond",
      description: "Meerdere stretchtenten voor een tweedaags muziekfestival.",
      image: "/lovable-uploads/d4e76c7f-3ab7-43bb-9963-82f1a64fc9e6.png",
      date: "5 September 2023",
      category: "Festival"
    }
  ]
};
