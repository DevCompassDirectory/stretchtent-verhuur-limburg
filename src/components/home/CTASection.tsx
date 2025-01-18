import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
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
  );
};