import { TentCard } from "@/components/TentCard";

const tents = [
  {
    id: "extra-small",
    name: "Compact Mini Stretchtent",
    size: "7,5 x 10m",
    capacity: "Tot 50 personen",
    description: "Ideaal voor kleine bijeenkomsten en intieme feesten in de tuin.",
    features: [
      "Ultra-compact design",
      "Snelle opzettijd",
      "Flexibele configuratie",
      "Perfect voor tuinfeesten"
    ],
    image: "/photo-1482938289607-e9573fc25ebb",
    specifications: {
      width: "7,5 meter",
      length: "10 meter",
      height: "4 meter",
      area: "75m²"
    }
  },
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
  },
  {
    id: "custom",
    name: "Custom Stretchtent",
    size: "Op maat",
    capacity: "Flexibel",
    description: "Een volledig op maat gemaakte stretchtent, aangepast aan uw specifieke wensen en locatie.",
    features: [
      "Volledig maatwerk",
      "Flexibele afmetingen",
      "Aangepaste configuratie",
      "Professioneel advies"
    ],
    image: "/photo-1469474968028-56623f02e42e",
    specifications: {
      width: "Op maat",
      length: "Op maat",
      height: "Op maat",
      area: "Op maat"
    },
    isCustomConfig: true
  }
];

const Stretchtenten = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-4xl font-bold mb-4">Onze Stretchtenten</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ontdek ons assortiment premium stretchtenten, perfect voor elk type evenement
          </p>
        </div>
        <div className="space-y-12">
          {tents.map((tent) => (
            <TentCard key={tent.id} tent={tent} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stretchtenten;