import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

const Contact = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Heeft u vragen of wilt u een offerte aanvragen? Neem contact met ons op.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;