import { Layout } from "@/components/Layout";
import ReactMarkdown from "react-markdown";

// Since these are static pages, we can define their content directly here
// In a full CMS they would come from the backend, but for this requirement static is fine

const ABOUT_CONTENT = `
# À propos de Kassiri Pulse

**Kassiri Pulse** est un média d'actualité professionnel basé à Bobo Dioulasso, au Burkina Faso. Notre mission est de fournir une information juste, équilibrée et réactive sur les enjeux africains et internationaux.

## Notre Vision

Dans un monde où l'information circule à grande vitesse, Kassiri Pulse s'engage à offrir une lecture claire et approfondie des événements qui façonnent notre époque. Nous croyons en un journalisme de qualité, ancré dans les réalités africaines tout en restant ouvert sur le monde.

## Notre Équipe

Notre rédaction est composée de journalistes passionnés, de correspondants locaux et d'experts spécialisés dans divers domaines : politique, économie, culture, sport et santé. Nous travaillons sans relâche pour vérifier les faits, analyser les contextes et vous livrer une information fiable.

## Nos Engagements

- **Indépendance :** Nous garantissons une ligne éditoriale libre de toute pression.
- **Rigueur :** Chaque information est vérifiée avant publication.
- **Proximité :** Nous donnons la voix aux acteurs locaux tout en couvrant les grands enjeux internationaux.

Rejoignez notre communauté de lecteurs et restez connecté au pouls de l'actualité avec Kassiri Pulse.
`;

const LEGAL_CONTENT = `
# Mentions Légales

## Éditeur du site
Le site **Kassiri Pulse** est édité par la société Kassiri Media, entreprise immatriculée au registre du commerce du Burkina Faso.

- **Siège social :** Rue 10.18, Bobo Dioulasso, Burkina Faso
- **Téléphone :** +226 62 32 24 32
- **Email :** contact@kassiripulse.com
- **Directeur de la publication :** [Nom du Directeur]

## Hébergement
Le site est hébergé par Vercel Inc.
- **Adresse :** 340 S Lemon Ave #4133 Walnut, CA 91789, USA

## Propriété intellectuelle
L'ensemble de ce site relève de la législation burkinabè et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.

## Responsabilité
L'éditeur ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site. En conséquence, l'éditeur décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
`;

const PRIVACY_CONTENT = `
# Politique de Confidentialité

*Dernière mise à jour : 24 Octobre 2023*

Chez **Kassiri Pulse**, nous attachons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.

## Collecte des données
Nous pouvons collecter des informations lorsque vous :
- Vous abonnez à notre newsletter (adresse email).
- Remplissez notre formulaire de contact (nom, email, message).
- Naviguez sur notre site (données de navigation, cookies).

## Utilisation des données
Les informations que nous collectons sont utilisées pour :
- Vous envoyer notre newsletter si vous y avez souscrit.
- Répondre à vos demandes envoyées via le formulaire de contact.
- Améliorer l'expérience utilisateur et analyser le trafic du site.
- Afficher des publicités pertinentes via nos partenaires (ex: Google AdSense).

## Cookies
Notre site utilise des cookies pour améliorer votre expérience. Un cookie est un petit fichier texte stocké sur votre appareil. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités du site.

### Publicités (Google AdSense)
Nous utilisons Google AdSense pour diffuser des publicités. Google utilise des cookies pour diffuser des annonces en fonction des visites antérieures des utilisateurs sur notre site ou sur d'autres sites. Vous pouvez désactiver la publicité personnalisée en visitant les [Paramètres des annonces Google](https://adssettings.google.com/).

## Partage des données
Nous ne vendons, n'échangeons, ni ne transférons vos informations personnelles identifiables à des tiers. Cela n'inclut pas les tiers de confiance qui nous aident à exploiter notre site web ou à mener nos affaires, tant que ces parties conviennent de garder ces informations confidentielles.

## Vos droits
Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Pour exercer ce droit, veuillez nous contacter à l'adresse email : contact@kassiripulse.com.
`;

export function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-lg prose-green max-w-none bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          <ReactMarkdown>{ABOUT_CONTENT}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}

export function Legal() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-lg prose-green max-w-none bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          <ReactMarkdown>{LEGAL_CONTENT}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}

export function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="prose prose-lg prose-green max-w-none bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          <ReactMarkdown>{PRIVACY_CONTENT}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}
