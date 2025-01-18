import { ScrollArea } from "@/components/ui/scroll-area";

const Huurvoorwaarden = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8">Huurvoorwaarden</h1>
      <ScrollArea className="h-[calc(100vh-300px)] pr-4">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Algemeen</h2>
            <p>Deze huurvoorwaarden zijn van toepassing op alle huurovereenkomsten van StretchTent Limburg, hierna te noemen verhuurder.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Huurperiode</h2>
            <p>De huurperiode gaat in op het moment dat de stretchtent het magazijn verlaat en eindigt wanneer deze weer compleet en in goede staat is teruggebracht.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Huurprijs</h2>
            <ul className="list-disc ml-6 mt-2">
              <li>De huurprijs wordt vooraf overeengekomen en schriftelijk vastgelegd</li>
              <li>Prijzen zijn inclusief op- en afbouw</li>
              <li>Transportkosten worden apart berekend</li>
              <li>Bij reservering dient 50% van de huursom te worden voldaan</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Verplichtingen Huurder</h2>
            <p>De huurder is verplicht:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>De tent en materialen volgens bestemming te gebruiken</li>
              <li>Geen wijzigingen aan te brengen</li>
              <li>Verhuurder toegang te verschaffen voor inspectie</li>
              <li>Onderverhuur alleen met schriftelijke toestemming</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Schade en Aansprakelijkheid</h2>
            <ul className="list-disc ml-6 mt-2">
              <li>Schade dient direct gemeld te worden</li>
              <li>Huurder is aansprakelijk voor schade tijdens de huurperiode</li>
              <li>Verhuurder is niet aansprakelijk voor persoonlijke ongevallen</li>
              <li>Verhuurder is niet aansprakelijk voor schade door weersomstandigheden</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Annulering</h2>
            <p>Bij annulering gelden de volgende voorwaarden:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Tot 30 dagen voor aanvang: 25% van de huursom</li>
              <li>14-30 dagen voor aanvang: 50% van de huursom</li>
              <li>Minder dan 14 dagen: 100% van de huursom</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Weersomstandigheden</h2>
            <p>Bij extreme weersomstandigheden behoudt de verhuurder zich het recht voor om:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>De opbouw uit te stellen</li>
              <li>De tent preventief af te bouwen</li>
              <li>Het evenement te annuleren</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Betaling</h2>
            <ul className="list-disc ml-6 mt-2">
              <li>50% aanbetaling bij reservering</li>
              <li>Restant uiterlijk 7 dagen voor aanvang</li>
              <li>Bij niet tijdige betaling kunnen extra kosten in rekening worden gebracht</li>
            </ul>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Huurvoorwaarden;