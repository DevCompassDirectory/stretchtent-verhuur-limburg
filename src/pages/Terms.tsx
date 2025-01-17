import { ScrollArea } from "@/components/ui/scroll-area";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8">Algemene Voorwaarden</h1>
      <ScrollArea className="h-[calc(100vh-300px)] pr-4">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Definities</h2>
            <p>In deze algemene voorwaarden wordt verstaan onder:</p>
            <ul className="list-disc ml-6 mt-2">
              <li><strong>StretchTent Limburg:</strong> de verhuurder van stretchtenten, gevestigd in Limburg;</li>
              <li><strong>Huurder:</strong> de natuurlijke of rechtspersoon die met StretchTent Limburg een overeenkomst aangaat;</li>
              <li><strong>Overeenkomst:</strong> de huurovereenkomst tussen StretchTent Limburg en de huurder;</li>
              <li><strong>Materialen:</strong> de stretchtent(en) en eventuele aanvullende materialen.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Toepasselijkheid</h2>
            <p>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen en overeenkomsten van StretchTent Limburg. Afwijkingen van deze voorwaarden zijn slechts geldig indien deze uitdrukkelijk schriftelijk zijn overeengekomen.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Offertes en Aanbiedingen</h2>
            <p>Alle offertes en aanbiedingen van StretchTent Limburg zijn vrijblijvend, tenzij in de offerte een termijn voor aanvaarding is gesteld. Een offerte of aanbieding vervalt indien het product waarop de offerte of de aanbieding betrekking heeft in de tussentijd niet meer beschikbaar is.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Huurperiode</h2>
            <p>De huurperiode vangt aan op het moment dat de materialen het magazijn van StretchTent Limburg verlaten en eindigt op het moment dat de materialen weer in het magazijn zijn teruggebracht, tenzij schriftelijk anders is overeengekomen.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Huurprijs en Betaling</h2>
            <ul className="list-disc ml-6 mt-2">
              <li>De huurprijs wordt vooraf overeengekomen en schriftelijk vastgelegd.</li>
              <li>Betaling dient te geschieden binnen 14 dagen na factuurdatum.</li>
              <li>Bij reservering dient 50% van de huursom te worden voldaan.</li>
              <li>Het resterende bedrag dient uiterlijk 7 dagen voor aanvang van de huurperiode te zijn voldaan.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Verplichtingen Huurder</h2>
            <p>De huurder is verplicht:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>De materialen volgens de bestemming te gebruiken;</li>
              <li>De materialen in dezelfde staat terug te bezorgen;</li>
              <li>Geen wijzigingen aan de materialen aan te brengen;</li>
              <li>StretchTent Limburg toegang tot de materialen te verschaffen;</li>
              <li>Onderverhuur en beschikbaarstelling aan derden uitsluitend met schriftelijke toestemming van StretchTent Limburg te doen geschieden.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Aansprakelijkheid</h2>
            <p>StretchTent Limburg is niet aansprakelijk voor:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Schade ontstaan door het gebruik van de materialen;</li>
              <li>Schade als gevolg van weersomstandigheden;</li>
              <li>Indirecte schade, waaronder gevolgschade en gederfde winst;</li>
              <li>Schade veroorzaakt door hulppersonen.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Verzekering</h2>
            <p>De huurder is verplicht de materialen gedurende de huurperiode te verzekeren tegen diefstal, verlies en beschadiging. StretchTent Limburg kan een bewijs van verzekering verlangen.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Annulering</h2>
            <p>Bij annulering van de overeenkomst door de huurder gelden de volgende voorwaarden:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Bij annulering meer dan 30 dagen voor aanvang: 25% van de huursom;</li>
              <li>Bij annulering tussen 30 en 14 dagen voor aanvang: 50% van de huursom;</li>
              <li>Bij annulering minder dan 14 dagen voor aanvang: 100% van de huursom.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Toepasselijk Recht</h2>
            <p>Op alle rechtsbetrekkingen waarbij StretchTent Limburg partij is, is uitsluitend het Nederlands recht van toepassing. De rechtbank Limburg is bij uitsluiting bevoegd van geschillen kennis te nemen.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Wijziging Voorwaarden</h2>
            <p>StretchTent Limburg is bevoegd wijzigingen in deze voorwaarden aan te brengen. De wijzigingen treden in werking op het aangekondigde tijdstip van inwerkingtreding.</p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Terms;