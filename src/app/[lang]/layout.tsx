import type { Metadata } from "next";
import { Poppins, Dancing_Script } from "next/font/google";
import "../globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const seoTranslations = {
  es: {
    title: "APOLO 27 | NASA Human Exploration Rover Challenge",
    description: "Equipo de estudiantes de INTEC, República Dominicana, compitiendo en el NASA Human Exploration Rover Challenge. Segundo lugar mundial en 2024 y primer equipo latinoamericano en alcanzar el podio.",
    cardDesc: "Estudiantes dominicanos construyendo rovers para la exploración espacial. 2do lugar mundial 2024.",
  },
  en: {
    title: "APOLO 27 | NASA Human Exploration Rover Challenge",
    description: "Team of INTEC students from the Dominican Republic, competing in the NASA Human Exploration Rover Challenge. 2nd Place World Winner in 2024 and first Latin American team to reach the podium.",
    cardDesc: "Dominican students building rovers for space exploration. 2024 World 2nd Place Winner.",
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const t = seoTranslations[lang];

  return {
    metadataBase: new URL("https://apolo27.com"),
    title: t.title,
    description: t.description,
    keywords: [
      "APOLO 27", "NASA", "Rover Challenge", "HERC", "INTEC",
      "República Dominicana", "STEM", "ingeniería espacial", "rover", "space exploration"
    ],
    // Canonical and Alternate URLs for 100/100 SEO Multilingual setup
    alternates: {
      canonical: `https://apolo27.com/${lang}`,
      languages: {
        'es': 'https://apolo27.com/es',
        'en': 'https://apolo27.com/en',
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://apolo27.com/${lang}`,
      siteName: "APOLO 27",
      locale: lang === 'es' ? 'es_DO' : 'en_US',
      type: "website",
      images: [
        {
          url: "/images/Apolo%2027%20HP%20-%20blanco.png",
          width: 1200,
          height: 630,
          alt: "APOLO 27 - NASA Human Exploration Rover Challenge",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.cardDesc,
      images: ["/images/Apolo%2027%20HP%20-%20blanco.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang === 'en' ? 'en' : 'es';
  const t = seoTranslations[lang];

  // Schema.org (JSON-LD) definition for Apolo 27 Team
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "APOLO 27 Team",
    "url": `https://apolo27.com/${lang}`,
    "logo": "https://apolo27.com/logos/Apolo27%20Logo.png",
    "description": t.description,
    "sameAs": [
      "https://instagram.com/apolo27",
      "https://linkedin.com/company/apolo27",
      "https://www.youtube.com/@apolo2730",
      "https://tiktok.com/@apolo27"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santo Domingo",
      "addressCountry": "DO"
    },
    "memberOf": {
      "@type": "CollegeOrUniversity",
      "name": "INTEC - Instituto Tecnológico de Santo Domingo"
    }
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Injecting JSON-LD structurally to the DOM */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={`${dancingScript.variable} ${poppins.variable} antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
