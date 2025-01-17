import { ScrollArea } from "@/components/ui/scroll-area";

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <h1 className="text-4xl font-bold mb-8">Privacybeleid</h1>
      <ScrollArea className="h-[calc(100vh-300px)] pr-4">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-8">
            Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Inleiding</h2>
            <p>
              StretchTent Limburg, gevestigd in Limburg, is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze privacyverklaring.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Contactgegevens</h2>
            <p>Website: www.stretchtentverhuurlimburg.nl</p>
            <p>E-mail: info@stretchtentverhuurlimburg.nl</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Persoonsgegevens die wij verwerken</h2>
            <p>StretchTent Limburg verwerkt uw persoonsgegevens doordat u gebruik maakt van onze diensten en/of omdat u deze zelf aan ons verstrekt. Hieronder vindt u een overzicht van de persoonsgegevens die wij verwerken:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Voor- en achternaam</li>
              <li>Adresgegevens</li>
              <li>Telefoonnummer</li>
              <li>E-mailadres</li>
              <li>IP-adres</li>
              <li>Overige persoonsgegevens die u actief verstrekt</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Bijzondere en/of gevoelige persoonsgegevens</h2>
            <p>Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger zijn dan 16 jaar, tenzij ze toestemming hebben van ouders of voogd. Als u er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een minderjarige, neem dan contact met ons op, dan verwijderen wij deze informatie.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Met welk doel wij persoonsgegevens verwerken</h2>
            <p>StretchTent Limburg verwerkt uw persoonsgegevens voor de volgende doelen:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Het afhandelen van uw betaling</li>
              <li>U te kunnen bellen of e-mailen indien dit nodig is om onze dienstverlening uit te kunnen voeren</li>
              <li>U te informeren over wijzigingen van onze diensten en producten</li>
              <li>Om goederen en diensten bij u af te leveren</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Geautomatiseerde besluitvorming</h2>
            <p>StretchTent Limburg neemt niet op basis van geautomatiseerde verwerkingen besluiten over zaken die (aanzienlijke) gevolgen kunnen hebben voor personen. Het gaat hier om besluiten die worden genomen door computerprogramma's of -systemen, zonder dat daar een mens tussen zit.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Hoe lang we persoonsgegevens bewaren</h2>
            <p>StretchTent Limburg bewaart uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren waarvoor uw gegevens worden verzameld. Wij hanteren de volgende bewaartermijnen voor de volgende (categorieën) van persoonsgegevens:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Klantgegevens: 7 jaar (Wettelijke verplichting)</li>
              <li>E-mailcorrespondentie: 2 jaar</li>
              <li>Offertes en facturen: 7 jaar (Wettelijke verplichting)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Delen van persoonsgegevens met derden</h2>
            <p>StretchTent Limburg verkoopt uw gegevens niet aan derden en verstrekt deze uitsluitend indien dit nodig is voor de uitvoering van onze overeenkomst met u of om te voldoen aan een wettelijke verplichting.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Cookies, of vergelijkbare technieken, die wij gebruiken</h2>
            <p>StretchTent Limburg gebruikt alleen technische en functionele cookies, en analytische cookies die geen inbreuk maken op uw privacy. Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen op uw computer, tablet of smartphone. De cookies die wij gebruiken zijn noodzakelijk voor de technische werking van de website en uw gebruiksgemak.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Gegevens inzien, aanpassen of verwijderen</h2>
            <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te verwijderen. Daarnaast heeft u het recht om uw eventuele toestemming voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van uw persoonsgegevens door StretchTent Limburg en heeft u het recht op gegevensoverdraagbaarheid.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Hoe wij persoonsgegevens beveiligen</h2>
            <p>StretchTent Limburg neemt de bescherming van uw gegevens serieus en neemt passende maatregelen om misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als u de indruk heeft dat uw gegevens niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan contact op via info@stretchtentverhuurlimburg.nl</p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Privacy;