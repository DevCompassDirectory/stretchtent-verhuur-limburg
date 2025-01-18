import { Card, CardContent } from "@/components/ui/card";

export const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Wat Onze Klanten Zeggen</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ervaringen van tevreden klanten die kozen voor onze stretchtenten
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="De tent was perfect voor onze bruiloft! Het team was zeer professioneel en de opbouw verliep vlekkeloos."
            author="Lisa & Tom"
            event="Bruiloft in Maastricht"
          />
          <TestimonialCard
            quote="Fantastische service en een prachtige tent. Zelfs met wat regen bleef alles perfect droog."
            author="Mark van der Berg"
            event="Bedrijfsevenement"
          />
          <TestimonialCard
            quote="De sfeer onder de stretchtent was magisch. Precies wat we zochten voor ons tuinfeest!"
            author="Familie Jansen"
            event="Tuinfeest"
          />
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  quote: string;
  author: string;
  event: string;
}

const TestimonialCard = ({ quote, author, event }: TestimonialCardProps) => {
  return (
    <Card className="animate-fade-up h-full">
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="flex flex-col justify-between h-full">
          <p className="text-lg italic mb-6">{quote}</p>
          <div className="mt-auto">
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{event}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};