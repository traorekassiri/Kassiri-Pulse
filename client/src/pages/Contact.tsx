import { Layout } from "@/components/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { useSubmitContact } from "@/hooks/use-contact";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@shared/routes";
import type { ContactInput } from "@shared/routes";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";

export default function Contact() {
  const { mutate: submitContact, isPending } = useSubmitContact();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = (data: ContactInput) => {
    submitContact(data, {
      onSuccess: () => reset()
    });
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-black mb-4">Contactez-nous</h1>
          <p className="text-lg text-primary-foreground/80">
            Vous avez une information à partager, une question ou une proposition de partenariat ? Notre équipe est à votre écoute.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-primary mb-6">Nos Coordonnées</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Siège social</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">Rue 10.18<br/>Bobo Dioulasso<br/>Burkina Faso</p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Téléphone / WhatsApp</h4>
                    <p className="text-muted-foreground text-sm">+226 62 32 24 32</p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">contact@kassiripulse.com</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Horaires de la rédaction</h4>
                    <p className="text-muted-foreground text-sm">Lun - Sam : 08h00 - 19h00<br/>Dimanche : Fermé</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <AdPlaceholder format="rectangle" />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-lg shadow-black/5 border border-border/50">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Envoyez-nous un message</h2>
              <p className="text-muted-foreground mb-8">Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">Nom complet <span className="text-accent">*</span></label>
                    <input 
                      id="name" 
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Jean Dupont"
                    />
                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">Adresse email <span className="text-accent">*</span></label>
                    <input 
                      id="email" 
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="jean@exemple.com"
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-foreground">Sujet <span className="text-accent">*</span></label>
                  <input 
                    id="subject" 
                    {...register("subject")}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Sujet de votre message"
                  />
                  {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">Message <span className="text-accent">*</span></label>
                  <textarea 
                    id="message" 
                    rows={6}
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y"
                    placeholder="Écrivez votre message ici..."
                  ></textarea>
                  {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <><Loader2 size={20} className="animate-spin" /> Envoi en cours...</>
                  ) : (
                    <><Send size={20} /> Envoyer le message</>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
