export const SUPPORTED_LOCALES = ["en", "da"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const dictionary = {
  en: {
    metadata: {
      title: "Muhammed Altan | Portfolio",
      description: "Personal portfolio of Muhammed Altan",
    },
    sections: {
      introduction: "Introduction",
      about: "About Me",
      projects: "Projects",
      skills: "Skills & Tools",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
      sections: "Sections",
    },
    header: {
      home: "Home",
      linkedIn: "LinkedIn",
      resume: "Resume",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      github: "GitHub",
      mobileSections: "SECTIONS",
    },
    theme: {
      lightMode: "Light mode",
      darkMode: "Dark mode",
      switchTo: "Switch to",
    },
    home: {
      subtitle: "A developer who loves building things.",
      body: "Full stack developer with a background in both web development and multimedia design. I have a strong interest in developing web and system solutions, databases, and user-friendly products. I work in a structured manner, am eager to learn, and thrive both independently and in teams.",
      resumeCta: "Get Resume",
      mailCta: "Send Mail",
    },
    about: {
      title: "About Muhammed",
      subtitle: "More than just a name",
      paragraphs: [
        "I am a passionate backend developer with a strong knack for building full-stack web applications using modern technologies like Next.js, Nuxt.js, Tailwind CSS and more. My journey in tech started with a curiosity for HTML and CSS and later was fueled by a desire to create dynamic, data-driven applications. With my background as a multimedia designer, I have a unique perspective on user experience and design, which I integrate into my development work to create seamless and engaging applications. As a full stack developer with a web development bachelor's degree, I have a solid foundation in both frontend and backend technologies, allowing me to build comprehensive solutions that are not only functional but also user-friendly.",
        "While I may not have years of senior-level experience, I have a solid technical foundation and a strong drive for backend development. I've built backend services, RESTful APIs, and worked with databases, version control, and team collaboration. I'm a fast learner who enjoys picking up new technologies quickly.",
        "I'm particularly drawn to data-driven systems where performance and scalability matter, and I'm eager to grow within cloud technologies, containerized solutions, and DevOps practices.",
        "Outside of tech, my background as a store manager sharpened my communication, structure, and teamwork skills, qualities I bring into every project I work on. I thrive in agile, collaborative environments where knowledge is shared and quality is a shared responsibility.",
      ],
    },
    projects: {
      title: "Projects",
      body: "Projects content goes here.",
    },
    skills: {
      title: "Skills & Tools",
      subtitle: "Learned by coding all night and debugging all day!",
      body: "I specialize in building full-stack web applications using modern technologies. My stack is centred around the Vue / Nuxt ecosystem, with a strong backend foundation using Node.js, Express, MongoDB, Supabase, and RESTful APIs.",
      groups: {
        frontend: "Frontend",
        backendApi: "Backend / API",
        databaseAuth: "Database & Auth",
        testing: "Testing",
        integrations: "Integrations",
        devInfra: "Dev & Infrastructure",
      },
    },
    experience: {
      title: "Experience",
      roleOne: "Frontend / Full Stack Developer",
      roleOneMeta: "3 months internship + collaboration on bachelor's exam project",
      visitSite: "Visit Site",
      roleOneP1: "At LejGoPro.dk, I worked with both frontend and backend development in a real business setup. I helped build and improve platform features with a strong focus on practical, user-friendly solutions that support real customer needs.",
      roleOneP2: "I also developed my bachelor's exam project in collaboration with the same company, where I combined design, frontend development, backend logic, and system structure in one complete solution. This gave me strong hands-on experience in taking a product from concept to delivery and further shaped my profile as a full stack developer.",
      roleTwo: "Academic Project (2nd Semester)",
      roleTwoTitle: "Kantine Web Application",
      roleTwoP1: "I developed a full-stack canteen management web application as part of my second-semester academic project. I built a complete ordering solution with authentication, an admin panel, and order handling features using a modern containerized setup.",
      roleTwoP2: "Through this project, I gained practical experience with Docker, RESTful API design, database security, and responsive UI development. It strengthened my ability to build secure, scalable applications with clear separation of concerns and deployment-ready infrastructure.",
    },
    education: {
      title: "Education",
      degreeOne: "Academy Profession Degree",
      degreeOneTitle: "Multimedia Design",
      degreeOneMeta: "2 years, including an internship",
      degreeOneP1: "Multimedia Design gave me a strong foundation in digital design, user experience, content creation, and frontend development. It taught me how to work from idea to finished solution, while thinking about both usability and the visual side of a product.",
      degreeOneP2: "During my studies, I learned how to approach digital projects in a practical way, often through real cases and collaboration-based assignments. It helped me strengthen my understanding of design processes, frontend thinking, and how to create digital experiences that are both functional and user-focused.",
      degreeTwo: "Bachelor's Degree",
      degreeTwoTitle: "Web Developer",
      degreeTwoMeta: "1.5 years, including an internship",
      degreeTwoP1: "My web development education built on my earlier design background and moved me deeper into programming, system thinking, and the technical side of building web solutions. It gave me a stronger understanding of how to structure applications, work with databases, and develop more complete and scalable solutions.",
      degreeTwoP2: "Through this degree, I developed my skills in both frontend and backend development and gained more confidence in turning ideas into working products. It played a big role in shaping me into a full stack developer and gave me the technical foundation I continue to build on today.",
    },
    contact: {
      title: "Let's talk.",
      subtitle: "Have a question, a project in mind, or just want to say hi? My inbox is always open.",
      email: "Email",
      linkedIn: "LinkedIn",
    },
  },
  da: {
    metadata: {
      title: "Muhammed Altan | Portefolje",
      description: "Muhammed Altans personlige portefolje",
    },
    sections: {
      introduction: "Introduktion",
      about: "Om Mig",
      projects: "Projekter",
      skills: "Kompetencer & Værktøjer",
      experience: "Erfaring",
      education: "Uddannelse",
      contact: "Kontakt",
      sections: "Sektioner",
    },
    header: {
      home: "Hjem",
      linkedIn: "LinkedIn",
      resume: "CV",
      openMenu: "Åbn menu",
      closeMenu: "Luk menu",
      github: "GitHub",
      mobileSections: "SEKTIONER",
    },
    theme: {
      lightMode: "Lys tilstand",
      darkMode: "Mørk tilstand",
      switchTo: "Skift til",
    },
    home: {
      subtitle: "En udvikler, der elsker at bygge ting.",
      body: "Full stack-udvikler med baggrund i både webudvikling og multimediedesign. Jeg har stor interesse for at udvikle web- og systemløsninger, databaser og brugervenlige produkter. Jeg arbejder struktureret, er lærevillig og trives både selvstændigt og i teams.",
      resumeCta: "Hent CV",
      mailCta: "Send Mail",
    },
    about: {
      title: "Om Muhammed",
      subtitle: "Mere end bare et navn",
      paragraphs: [
        "Jeg er en passioneret backend-udvikler med stærkt fokus på at bygge full-stack webapplikationer med moderne teknologier som Next.js, Nuxt.js og Tailwind CSS. Min rejse i tech startede med nysgerrighed for HTML og CSS og blev senere drevet af ønsket om at skabe dynamiske, datadrevne løsninger. Med min baggrund som multimediedesigner har jeg et unikt blik for brugeroplevelse og design, som jeg tager med ind i mit udviklingsarbejde for at skabe sammenhængende og engagerende applikationer. Som full stack-udvikler med en professionsbachelor i webudvikling har jeg et solidt fundament i både frontend og backend, hvilket gør mig i stand til at bygge løsninger, der både er funktionelle og brugervenlige.",
        "Selvom jeg ikke har mange års seniorerfaring, har jeg et solidt teknisk fundament og en stærk drivkraft for backend-udvikling. Jeg har bygget backend-services, RESTful API'er og arbejdet med databaser, versionsstyring og teamsamarbejde. Jeg lærer hurtigt og nyder at tage nye teknologier til mig.",
        "Jeg er særligt tiltrukket af datadrevne systemer, hvor performance og skalerbarhed er afgørende, og jeg vil gerne udvikle mig inden for cloud-teknologier, containerløsninger og DevOps-praksis.",
        "Uden for tech har min baggrund som butikschef styrket mine kommunikations-, struktur- og samarbejdsevner, kvaliteter jeg tager med i hvert projekt. Jeg trives i agile, samarbejdsorienterede miljøer, hvor viden deles, og kvalitet er et fælles ansvar.",
      ],
    },
    projects: {
      title: "Projekter",
      body: "Projektindhold kommer her.",
    },
    skills: {
      title: "Kompetencer & Værktøjer",
      subtitle: "Lært ved at kode hele natten og debugge hele dagen!",
      body: "Jeg specialiserer mig i at bygge full-stack webapplikationer med moderne teknologier. Min stack er centreret omkring Vue/Nuxt-økosystemet med et stærkt backend-fundament i Node.js, Express, MongoDB, Supabase og RESTful API'er.",
      groups: {
        frontend: "Frontend",
        backendApi: "Backend / API",
        databaseAuth: "Database & Auth",
        testing: "Test",
        integrations: "Integrationer",
        devInfra: "Udvikling & Infrastruktur",
      },
    },
    experience: {
      title: "Erfaring",
      roleOne: "Frontend / Full Stack-udvikler",
      roleOneMeta: "3 måneders praktik + samarbejde om bachelorprojekt",
      visitSite: "Besøg side",
      roleOneP1: "Hos LejGoPro.dk arbejdede jeg med både frontend- og backend-udvikling i en reel forretningskontekst. Jeg var med til at bygge og forbedre platformens funktioner med fokus på praktiske og brugervenlige løsninger, der understøtter reelle kundebehov.",
      roleOneP2: "Jeg udviklede også mit bachelorprojekt i samarbejde med samme virksomhed, hvor jeg kombinerede design, frontend-udvikling, backend-logik og systemstruktur i én samlet løsning. Det gav mig stærk praktisk erfaring med at føre et produkt fra idé til levering og formede min profil som full stack-udvikler.",
      roleTwo: "Studieprojekt (2. semester)",
      roleTwoTitle: "Kantine webapplikation",
      roleTwoP1: "Jeg udviklede en full-stack webapplikation til kantinehåndtering som en del af mit studieprojekt på 2. semester. Jeg byggede en komplet bestillingsløsning med autentificering, adminpanel og ordrehåndtering i et moderne containeriseret setup.",
      roleTwoP2: "Gennem projektet fik jeg praktisk erfaring med Docker, design af RESTful API'er, databasesikkerhed og responsiv UI-udvikling. Det styrkede min evne til at bygge sikre og skalerbare løsninger med tydelig ansvarsfordeling og deployment-klar infrastruktur.",
    },
    education: {
      title: "Uddannelse",
      degreeOne: "Erhvervsakademiuddannelse",
      degreeOneTitle: "Multimediedesign",
      degreeOneMeta: "2 år, inkl. praktik",
      degreeOneP1: "Multimediedesign gav mig et stærkt fundament i digitalt design, brugeroplevelse, indholdsproduktion og frontend-udvikling. Uddannelsen lærte mig at arbejde fra idé til færdig løsning med fokus på både brugervenlighed og det visuelle udtryk.",
      degreeOneP2: "Under studiet lærte jeg at angribe digitale projekter praktisk, ofte gennem virkelige cases og samarbejdsbaserede opgaver. Det styrkede min forståelse for designprocesser, frontend-tankegang og hvordan man skaber digitale oplevelser, der både er funktionelle og brugerfokuserede.",
      degreeTwo: "Professionsbachelor",
      degreeTwoTitle: "Webudvikling",
      degreeTwoMeta: "1,5 år, inkl. praktik",
      degreeTwoP1: "Min uddannelse i webudvikling byggede oven på min designbaggrund og førte mig dybere ind i programmering, systemtænkning og den tekniske side af webløsninger. Den gav mig en stærkere forståelse for strukturering af applikationer, arbejde med databaser og udvikling af mere komplette og skalerbare løsninger.",
      degreeTwoP2: "Gennem uddannelsen udviklede jeg mine kompetencer i både frontend og backend og blev mere sikker i at omsætte idéer til fungerende produkter. Den har haft stor betydning for min udvikling som full stack-udvikler og givet mig et teknisk fundament, jeg fortsat bygger videre på.",
    },
    contact: {
      title: "Lad os tage en snak.",
      subtitle: "Har du et spørgsmål, et projekt i tankerne eller vil du bare sige hej? Min indbakke er altid åben.",
      email: "Email",
      linkedIn: "LinkedIn",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale] ?? dictionary[DEFAULT_LOCALE];
}
