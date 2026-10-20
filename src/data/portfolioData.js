// Central Portfolio Configuration for Jagan Kumar Rath
// "JAGAN — BEYOND THE CODE"

export const personalInfo = {
  fullName: "Jagan Kumar Rath",
  shortName: "Jagan",
  initials: "JR",
  currentRole: "Associate Software Engineer",
  company: "NEXNUV Private Limited",
  employmentPeriod: "August 2026 – Present",
  primaryIdentity: "MERN Stack Developer | Full Stack Engineer",
  additionalInterests: ["Data Science", "Python", "DevOps", "Cloud Technologies"],
  phone: "+91 6371561513",
  email: "rathjaga83@gmail.com",
  linkedIn: "https://www.linkedin.com/in/jagan-kumar-rath-80a699326/",
  github: "https://github.com/Jaga-rath1",
  featuredLiveUrl: "https://carzodrive1.vercel.app/",
  portfolioName: "JAGAN — BEYOND THE CODE",
  tagline: "Building digital experiences. Engineering scalable systems. Exploring the intelligence in data.",
  professionalSummary: "Motivated Software Engineer with strong full-stack and cross-platform expertise in React.js, React Native, JavaScript, Node.js, Express.js, MongoDB, and Tailwind CSS. Experienced in building responsive web and mobile interfaces, scalable RESTful APIs, robust CRUD workflows, and secure authentication systems. Proficient in containerization and deployment pipelines using Docker, Kubernetes, and CI/CD, while actively expanding skills in Data Science.",
  portraitImage: "/images/jagan-profile.webp",
  portraitFallback: "/images/jagan-profile.jpg",
  resumePath: "/resume/Jagan-Kumar-Rath-Resume.pdf"
};

export const capabilityPillars = [
  {
    id: "build",
    label: "BUILD",
    tagline: "Modern Full Stack Applications",
    description: "Developing responsive client interfaces with React.js & React Native, paired with robust backend services, RESTful APIs, and scalable databases (MongoDB, MySQL).",
    icon: "Layers",
    color: "#8B5CF6",
    technologies: ["React.js", "React Native", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JavaScript ES6+"]
  },
  {
    id: "deploy",
    label: "DEPLOY",
    tagline: "DevOps & Cloud Pipelines",
    description: "Containerization workflows, multi-container Docker Compose orchestration, Kubernetes cluster concepts with Minikube, and automated CI/CD pipelines.",
    icon: "Cpu",
    color: "#A855F7",
    technologies: ["Docker", "Docker Compose", "Kubernetes", "Minikube", "kubectl", "CI/CD", "Git & GitHub"]
  },
  {
    id: "discover",
    label: "DISCOVER",
    tagline: "Data Science (In Progress)",
    description: "Foundational exploration of Python for data manipulation, numerical computing with NumPy, dataset transformation with Pandas, and machine learning principles.",
    icon: "Compass",
    color: "#C084FC",
    technologies: ["Python", "NumPy", "Pandas", "Data Analysis", "Machine Learning Foundations"]
  }
];

export const skillOrbits = [
  {
    id: "orbit-a",
    name: "Full Stack Development",
    orbitRadius: 1.4,
    badge: "Core Expertise",
    color: "#8B5CF6",
    description: "End-to-end web & mobile engineering with high-fidelity UI and resilient architecture.",
    skills: [
      { name: "JavaScript ES6+", level: "Advanced", type: "Language" },
      { name: "React.js", level: "Advanced", type: "Frontend Library" },
      { name: "React Native", level: "Proficient", type: "Mobile" },
      { name: "Node.js", level: "Proficient", type: "Runtime" },
      { name: "Express.js", level: "Proficient", type: "Backend Framework" },
      { name: "RESTful APIs", level: "Advanced", type: "Architecture" },
      { name: "HTML5 & CSS3", level: "Advanced", type: "Web Standard" },
      { name: "Tailwind CSS", level: "Advanced", type: "Styling" },
      { name: "Material UI", level: "Proficient", type: "UI System" },
      { name: "Bootstrap", level: "Proficient", type: "UI Framework" },
      { name: "Framer Motion", level: "Proficient", type: "Animation" },
      { name: "EJS", level: "Proficient", type: "Templating" }
    ]
  },
  {
    id: "orbit-b",
    name: "Backend & Database",
    orbitRadius: 2.1,
    badge: "System Design",
    color: "#A855F7",
    description: "Scalable server-side architecture, relational & document stores, security & access control.",
    skills: [
      { name: "Node.js", level: "Proficient", type: "Server" },
      { name: "Express.js", level: "Proficient", type: "Server" },
      { name: "MongoDB", level: "Proficient", type: "NoSQL DB" },
      { name: "Mongoose", level: "Proficient", type: "ODM" },
      { name: "MySQL", level: "Proficient", type: "Relational DB" },
      { name: "RESTful APIs", level: "Advanced", type: "API Design" },
      { name: "CRUD Operations", level: "Advanced", type: "Core Pattern" },
      { name: "MVC Architecture", level: "Advanced", type: "Design Pattern" },
      { name: "Authentication", level: "Proficient", type: "Security" },
      { name: "RBAC", level: "Proficient", type: "Authorization" },
      { name: "Session Management", level: "Proficient", type: "State" }
    ]
  },
  {
    id: "orbit-c",
    name: "DevOps & Cloud",
    orbitRadius: 2.8,
    badge: "Infrastructure",
    color: "#6366F1",
    description: "Reliable build pipelines, containerized environments, and cloud asset management.",
    skills: [
      { name: "Docker", level: "Proficient", type: "Containerization" },
      { name: "Docker Compose", level: "Proficient", type: "Orchestration" },
      { name: "Docker Hub", level: "Proficient", type: "Registry" },
      { name: "Kubernetes", level: "Foundational", type: "Orchestration" },
      { name: "Minikube", level: "Foundational", type: "Local K8s" },
      { name: "kubectl", level: "Foundational", type: "CLI Tool" },
      { name: "CI/CD Workflows", level: "Proficient", type: "Automation" },
      { name: "Git & GitHub", level: "Advanced", type: "VCS" },
      { name: "Cloudinary", level: "Proficient", type: "Media Storage" }
    ]
  },
  {
    id: "orbit-d",
    name: "Data Science (In Progress)",
    orbitRadius: 3.5,
    badge: "Active Learning",
    color: "#C084FC",
    description: "Building analytical foundations to unlock data intelligence and explore machine learning.",
    skills: [
      { name: "Python", level: "Active Learning", type: "Language" },
      { name: "NumPy", level: "Active Learning", type: "Numerical Computing" },
      { name: "Pandas", level: "Active Learning", type: "Data Manipulation" },
      { name: "Data Analysis Fundamentals", level: "Active Learning", type: "Analytics" },
      { name: "Machine Learning Foundations", level: "Active Learning", type: "AI Concepts" }
    ]
  },
  {
    id: "orbit-e",
    name: "Programming Languages",
    orbitRadius: 4.2,
    badge: "Core Foundations",
    color: "#E2E8F0",
    description: "Strong algorithmic and programming foundation across diverse languages.",
    skills: [
      { name: "JavaScript", level: "Advanced", type: "Scripting / Web" },
      { name: "Java", level: "Proficient", type: "OOP & DSA" },
      { name: "Python", level: "Active Learning", type: "Scripting & Data" },
      { name: "C", level: "Academic", type: "Systems Foundation" }
    ]
  }
];

export const toolsAndConcepts = [
  "Git & GitHub",
  "Postman",
  "Hoppscotch",
  "Passport.js",
  "MVC Architecture",
  "Role-Based Access Control (RBAC)",
  "Authentication & Session Management"
];

export const workExperience = [
  {
    company: "NEXNUV Private Limited",
    role: "Associate Software Engineer",
    period: "August 2026 – Present",
    type: "Full-Time",
    location: "India",
    summary: "Engineered scalable full-stack features, maintained robust RESTful microservices, and collaborated across agile engineering sprints.",
    responsibilities: [
      "Contributing to full-stack and mobile development using React.js, React Native, and backend services.",
      "Designing, developing, and optimizing RESTful APIs, microservices, and database schemas with MongoDB and MySQL.",
      "Collaborating with engineering teams while following clean code standards, MVC patterns, and industry best practices.",
      "Participating in agile sprints, code reviews, and containerized deployment pipelines using Docker and CI/CD."
    ],
    stack: ["React.js", "React Native", "Node.js", "Express.js", "MongoDB", "MySQL", "Docker", "CI/CD", "Git"]
  }
];

export const projects = [
  {
    id: "carzodrive",
    featured: true,
    title: "CARZODRIVE",
    category: "Live Web Project · Automotive",
    shortCategory: "Automotive SaaS",
    tagline: "Premium Vehicle Rental Platform | Luxury Cars & Bikes",
    description: "Explore my automotive web project through its live website and discover the implementation through its associated source repository. Built to provide a seamless vehicle rental experience with luxury cars, self-drive bikes, chauffeur options, and interactive booking workflows.",
    longDescription: "CARZODRIVE is a production-deployed automotive platform offering high-end vehicle booking, modern self-drive rentals, and professional chauffeur services. Features include responsive vehicle catalogs, categorized filter systems, transparent pricing tiers, and fluid micro-animations engineered for speed and aesthetic excellence.",
    tech: ["React.js", "Tailwind CSS", "JavaScript ES6+", "RESTful APIs", "Vercel"],
    keyFeatures: [
      "Premium vehicle rental catalog with luxury cars & self-drive bikes",
      "Dynamic filtering by vehicle type, transmission, and rental duration",
      "Integrated chauffeur booking and concierge service workflows",
      "Fast, fluid responsive UI optimized for mobile and desktop screens",
      "Direct live deployment on Vercel"
    ],
    links: {
      live: "https://carzodrive1.vercel.app/",
      github: "https://github.com/Jaga-rath1/CarNest"
    },
    visualTheme: "automotive",
    accentColor: "#8B5CF6",
    silverGradient: "from-slate-200 via-purple-300 to-violet-500"
  },
  {
    id: "careflow-health",
    featured: false,
    title: "CAREFLOW HEALTH",
    category: "Full Stack Development · Healthcare",
    shortCategory: "Healthcare Clinic Management",
    tagline: "Coordinated Medical Scheduling & Patient Workflows",
    description: "A clinic management platform designed to coordinate doctor scheduling, patient appointments, and role-based administrative workflows.",
    longDescription: "CareFlow Health addresses clinical operational bottlenecks by providing an intuitive management suite. It facilitates role-based access for clinic administrators, medical practitioners, and patients, ensuring seamless consultation scheduling, secure records retention, and real-time appointment updates.",
    tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Mongoose"],
    keyFeatures: [
      "Doctor scheduling and calendar slot management",
      "Patient appointment booking and confirmation workflows",
      "Role-based administrative dashboards (Admin, Doctor, Staff)",
      "Secure RESTful APIs for patient records and billing",
      "MongoDB & Mongoose integration with normalized schema design"
    ],
    links: {
      github: "https://github.com/Jaga-rath1/Clinic-Management-System"
    },
    visualTheme: "medical",
    accentColor: "#A855F7",
    silverGradient: "from-purple-200 via-violet-300 to-indigo-400"
  },
  {
    id: "docupulse",
    featured: false,
    title: "DOCUPULSE",
    category: "Frontend Engineering · Document SaaS",
    shortCategory: "PDF Utility Suite",
    tagline: "Browser-Based PDF Utility Application",
    description: "A dark-themed browser-based PDF utility application designed to simplify common document operations through a polished interface.",
    longDescription: "DocuPulse provides a sleek, dark-themed interface for client-side document processing. Built with modern JavaScript and Framer Motion, it enables users to manipulate documents securely in the browser without uploading confidential files to third-party servers.",
    tech: ["React.js", "Tailwind CSS", "Framer Motion", "JavaScript ES6+"],
    keyFeatures: [
      "PDF merging: combine multiple files into unified documents",
      "PDF splitting: extract specific page ranges with visual previews",
      "Client-side document compression and encryption",
      "Browser-based local processing for enhanced data privacy",
      "Animated interface states and tactile drag-and-drop zones"
    ],
    links: {
      github: "https://github.com/Jaga-rath1/DocuPulse"
    },
    visualTheme: "document",
    accentColor: "#7928CA",
    silverGradient: "from-slate-100 via-purple-200 to-slate-400"
  },
  {
    id: "carnest",
    featured: false,
    title: "CARNEST",
    category: "Full Stack Development · DevOps",
    shortCategory: "Containerized Vehicle Marketplace",
    tagline: "Containerized Car Marketplace with Docker & CI/CD",
    description: "A car marketplace application featuring vehicle management, RESTful APIs, secure image uploads, and containerized development and deployment workflows.",
    longDescription: "CarNest showcases end-to-end full-stack engineering combined with modern DevOps practices. Beyond CRUD operations and authenticated user sessions, the architecture is containerized with Docker, configured with Docker Compose, and prepared for Kubernetes cluster orchestration.",
    tech: ["Node.js", "Express.js", "MongoDB", "Docker", "Kubernetes", "CI/CD", "Multer", "Cloudinary"],
    keyFeatures: [
      "Vehicle listing CRUD operations with specifications and pricing",
      "RESTful API architecture following MVC standards",
      "Multer & Cloudinary cloud-based multi-image uploading",
      "Dockerized container setup with Docker Compose orchestration",
      "Kubernetes & Minikube deployment manifest experimentation",
      "CI/CD workflow automation for continuous testing"
    ],
    links: {
      github: "https://github.com/Jaga-rath1/CarNest"
    },
    visualTheme: "infrastructure",
    accentColor: "#6366F1",
    silverGradient: "from-indigo-200 via-purple-300 to-violet-400"
  },
  {
    id: "wanderlust",
    featured: false,
    title: "WANDERLUST",
    category: "Full Stack Development · Travel",
    shortCategory: "Vacation Rental Platform",
    tagline: "MVC Vacation Rental Platform with Maps & Geolocation",
    description: "A vacation rental web platform built with MVC architecture, authentication, cloud media storage, and interactive mapping.",
    longDescription: "WanderLust is inspired by modern hospitality booking platforms. Built around an MVC architecture, it integrates location-based searching, Geoapify geocoding, Leaflet.js interactive maps, and Cloudinary media pipelines with robust Passport.js session security.",
    tech: ["Node.js", "Express.js", "MongoDB", "Bootstrap", "Cloudinary", "Passport.js", "Geoapify", "Leaflet.js"],
    keyFeatures: [
      "Passport.js authentication with encrypted credentials and sessions",
      "Vacation rental listings with dynamic pricing and host reviews",
      "Cloudinary cloud media storage for property photo galleries",
      "Geoapify geocoding integration with coordinates resolution",
      "Leaflet.js interactive map pins and location exploration",
      "Robust Model-View-Controller (MVC) modular codebase"
    ],
    links: {
      github: "https://github.com/Jaga-rath1/WanderLust"
    },
    visualTheme: "travel",
    accentColor: "#9333EA",
    silverGradient: "from-purple-100 via-violet-300 to-indigo-300"
  }
];

export const dataScienceLab = {
  sectionTitle: "FROM CODE TO INSIGHT.",
  statusLabel: "Currently Learning",
  supportingCopy: "I'm expanding my engineering toolkit through Python, data analysis, and foundational Data Science concepts to better understand patterns and build intelligent systems.",
  clarification: "This laboratory represents an active area of continuous learning and foundational exploration alongside my primary MERN Stack and Full Stack engineering career.",
  topics: [
    {
      id: "python",
      name: "Python Foundations",
      tagline: "Programming foundations & data manipulation",
      details: "Object-oriented Python, list comprehensions, functional constructs, and writing clean, reproducible scripts for data extraction and preparation.",
      status: "Actively Practicing",
      icon: "Code2",
      metric: "Syntax & Scripting"
    },
    {
      id: "numpy",
      name: "NumPy",
      tagline: "Numerical computing & vector operations",
      details: "Multi-dimensional array structures, vectorized arithmetic operations, matrix indexing, slicing, and high-performance linear computations.",
      status: "Core Foundations",
      icon: "Cpu",
      metric: "N-D Arrays & Slicing"
    },
    {
      id: "pandas",
      name: "Pandas",
      tagline: "Data manipulation & tabular analysis",
      details: "Series and DataFrames, data cleaning workflows, handling missing values, exploratory aggregations, and grouped data transformations.",
      status: "Core Foundations",
      icon: "Database",
      metric: "DataFrames & Cleaning"
    },
    {
      id: "analysis",
      name: "Data Analysis",
      tagline: "Exploratory analysis & pattern discovery",
      details: "Statistical summarization, distributions, correlation analysis, and turning raw operational data into interpretable analytical views.",
      status: "In Progress",
      icon: "BarChart3",
      metric: "Exploratory Analysis"
    },
    {
      id: "ml",
      name: "Machine Learning Foundations",
      tagline: "Understanding core algorithmic concepts",
      details: "Foundational conceptual understanding of supervised learning, linear regressions, classification paradigms, training/testing splits, and evaluation metrics.",
      status: "Conceptual Exploration",
      icon: "Sparkles",
      metric: "Supervised Models"
    }
  ]
};

export const educationList = [
  {
    degree: "MASTER OF COMPUTER APPLICATIONS — MCA",
    institution: "NIIS Institute of Business Administration",
    location: "Bhubaneswar, Odisha",
    period: "2024–2026",
    grade: "CGPA: 8.2",
    note: "Advanced computing, database engineering, software development life cycle, and system architecture."
  },
  {
    degree: "BACHELOR OF SCIENCE — B.Sc.",
    institution: "SVM Autonomous College",
    location: "Jagatsinghpur, Odisha",
    period: "2024",
    grade: "Completed",
    note: "Undergraduate science foundation emphasizing analytical problem solving and quantitative reasoning."
  },
  {
    degree: "HIGHER SECONDARY — +2 SCIENCE",
    institution: "Baranga College of Education & Technology",
    location: "Odisha",
    period: "Passed out in 2021",
    grade: "Science Stream",
    note: "Higher secondary education with core focus on Mathematics, Physics, and Chemistry."
  }
];

export const certifications = [
  {
    title: "MERN Stack Development",
    issuer: "Apna College",
    status: "Completed",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description: "Comprehensive full stack specialization covering React.js, Node.js, Express.js, MongoDB, REST APIs, and full-scale application engineering."
  },
  {
    title: "Data Structures & Algorithms with Java",
    issuer: "Apna College",
    status: "Completed",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    description: "Deep dive into computational complexity, recursion, arrays, linked lists, trees, graphs, dynamic programming, and algorithmic problem-solving."
  },
  {
    title: "Data Science & Analytics",
    issuer: "Apna College & Independent Learning",
    status: "Currently Learning",
    badgeColor: "bg-violet-500/10 text-violet-300 border-violet-500/30",
    description: "Active coursework in Python numerical computing, Pandas data analysis, statistical modeling, and foundational machine learning principles."
  }
];
