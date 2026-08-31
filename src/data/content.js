// All content sourced from resume + PRD Section 2. Nothing invented.
// Missing links follow the PRD's placeholder policy (Section 9): hidden in UI,
// marked with data-todo in code, do not break layout.

export const profile = {
  name: "Umang Pawar",
  role: "AI Engineer",
  location: "Nagpur, India",
  email: "umangpawar629@gmail.com",
  github: "https://github.com/Umang07-cell",
  githubLabel: "github.com/Umang07-cell",
  linkedin: null, // data-todo: Add LinkedIn URL
  resumeUrl: "/Umang_Pawar_AI_Engineer.pdf",
};

export const heroCopy = {
  overline: "AI ENGINEER — NAGPUR, IN",
  positioning: "Two production AI systems live.\nBuilding what's next.",
  description:
    "I engineer AI applications that ship — RAG pipelines, LLM orchestration, and backend systems built for real users.",
};

export const aboutCopy = {
  heading: "Building AI that works in the real world.",
  paragraphs: [
    "I'm a CS graduate from Nagpur who spent the last year building AI systems that actually get used — not just submitted. My work at LanceSoft has gone from engineering brief to company-wide adoption: an HR chatbot that 100+ employees rely on daily, and a lead generation engine running live B2B outreach.",
    "I think in pipelines: document ingestion, chunking, embeddings, retrieval, grounding. I care about what happens when an LLM answer is wrong and how the system recovers. I'm a published ML researcher, a Google AI Professional Certificate holder, and someone who debugs production issues on Railway at odd hours because the system needs to work.",
    "Currently at LanceSoft as an AI Engineer Intern. Targeting AI Engineer roles in Pune, Bangalore, or Hyderabad.",
  ],
};

export const finsight = {
  label: "FEATURED PROJECT",
  title: "FinSight",
  badge: "LIVE",
  subtitle: "AI Financial Intelligence Platform",
  github: "https://github.com/Umang07-cell/finsight",
  live: "https://finsight-ai-finance.up.railway.app",
  problem:
    "Financial reports are dense, jargon-heavy, and time-consuming to analyze. Retail investors and analysts need answers, not PDFs.",
  solution:
    "Upload any SEC 10-K filing or ask about any public company. FinSight retrieves, grounds, and answers — with citations.",
  stack: [
    "FastAPI",
    "LangChain",
    "ChromaDB",
    "FAISS",
    "Groq API",
    "HuggingFace",
    "React",
    "Vite",
    "Tailwind",
    "SQLite",
    "Railway",
  ],
  features: [
    { icon: "Bot", title: "Multi-mode AI", detail: "Fast / Standard / Deep Research" },
    { icon: "FileText", title: "SEC Filing Analysis", detail: "Upload 10-K PDFs, RAG query" },
    { icon: "BarChart3", title: "Visual Reports", detail: "Charts + recommendations" },
    { icon: "MessageSquare", title: "Chat Memory", detail: "Full conversation history" },
  ],
  engineeringNote:
    "Resolved 6 production bugs including Pydantic v2 migration, deprecated Groq model string, Railway $PORT binding, and CORS header conflicts. Full MLOps ownership from commit to Railway deployment.",
  stats: [
    { value: "< 2s", label: "LLM answers" },
    { value: "6", label: "Analysis modes" },
    { value: "100%", label: "Answers cited" },
  ],
  architecture: [
    { id: "query", label: "User Query", row: 0 },
    { id: "frontend", label: "React Frontend", row: 1 },
    { id: "backend", label: "FastAPI Backend", row: 2 },
    { id: "router", label: "Query Router", row: 3 },
    { id: "fast", label: "Fast", row: 4, branch: true },
    { id: "standard", label: "Standard", row: 4, branch: true },
    { id: "deep", label: "Deep Research", row: 4, branch: true },
    { id: "embeddings", label: "HuggingFace Embeddings", row: 5 },
    { id: "vector", label: "ChromaDB / FAISS", row: 6 },
    { id: "context", label: "Retrieved Context", row: 7 },
    { id: "llm", label: "Groq LLM — Llama 3", row: 8 },
    { id: "response", label: "Structured Response", row: 9 },
    { id: "text", label: "Text Answer", row: 10, branch: true },
    { id: "report", label: "Report + Charts", row: 10, branch: true },
    { id: "history", label: "SQLite Chat History", row: 11, branch: true },
    { id: "pdf", label: "PDF Download", row: 11, branch: true },
  ],
};

export const otherProjects = [
  {
    label: "PRODUCTION — LANCESOFT",
    labelVariant: "success",
    title: "HR-PolicyIQ",
    subtitle: "ABAC-Secured HR Assistant Chatbot",
    stat: "100+ employees · 6+ HR modules · Daily use",
    stack: ["FastAPI", "LangChain", "ChromaDB", "Groq", "ABAC", "React"],
    detail:
      "End-to-end RAG pipeline: document ingestion → HuggingFace embeddings → ChromaDB retrieval → grounded Llama 3 answers with PII redaction, gated by attribute-based access control.",
    links: { note: "Private/internal system — no public GitHub" },
    size: "large",
  },
  {
    label: "PRODUCTION — LANCESOFT",
    labelVariant: "success",
    title: "Lead Generation Engine",
    subtitle: "AI-Powered B2B Outreach System",
    stack: ["Python", "FastAPI", "BeautifulSoup", "Selenium", "LLM Enrichment", "PostgreSQL"],
    detail:
      "Automated pipeline identifying HR and decision-maker contacts at target companies — now powering LanceSoft's live B2B outreach.",
    links: { note: "Internal system — no public repo" },
    size: "large",
  },
  {
    label: "FULL-STACK AI PLATFORM",
    labelVariant: "accent",
    title: "Atlas-AI",
    subtitle: "AI Career Platform — 4 Integrated Systems",
    stack: ["FastAPI", "React", "Groq", "LangChain", "HuggingFace", "RAG"],
    detail:
      "Job scraper + ATS resume scorer + voice mock interview engine + RAG career chatbot — unified into one product.",
    links: { github: null }, // data-todo: Add Atlas-AI GitHub link if public
    size: "medium",
  },
  {
    label: "AI WORKFLOW",
    labelVariant: "accent",
    title: "Closira AI",
    subtitle: "Customer Support Agent",
    stack: ["Python", "Groq (Llama 3.3 70B)", "Prompt Engineering"],
    detail:
      "FAQ answering, lead qualification, escalation detection, and conversation summarization in a single CLI workflow.",
    links: { github: "https://github.com/Umang07-cell/closira-AI-project" },
    size: "medium",
  },
];

export const techGroups = [
  {
    label: "AI & Generative AI",
    items: [
      "LangChain",
      "RAG",
      "Groq API",
      "OpenAI API",
      "ChromaDB",
      "FAISS",
      "HuggingFace Embeddings",
      "LLM Orchestration",
      "Prompt Engineering",
      "Vector Databases",
      "NLP/NLG",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      "FastAPI",
      "Flask",
      "Node.js",
      "REST APIs",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQLite",
      "SQLAlchemy",
      "ABAC Security",
      "Web Scraping",
    ],
  },
  {
    label: "Frontend & Data",
    items: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
      "Framer Motion",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "ETL Pipelines",
    ],
  },
  {
    label: "Infrastructure & DevOps",
    items: ["Python", "Git", "GitHub Actions", "Docker", "Railway", "Render", "AWS", "Azure"],
  },
];

export const experience = [
  {
    role: "AI Engineer Intern",
    company: "LanceSoft",
    date: "Jul 2026 – Present",
    badge: "CURRENT",
    points: [
      "Policy module: document upload, version/supersede workflows, 100+ employees",
      "AI Lead Generation Engine: live B2B outreach backbone",
      "End-to-end ownership: requirements → deployment",
    ],
    stack: ["FastAPI", "LangChain", "Groq", "ChromaDB", "PostgreSQL"],
  },
  {
    role: "Data Analyst Intern",
    company: "CarrierDomain",
    date: "Mar 2026 – Jun 2026",
    badge: null,
    points: [
      "ETL pipelines processing 637,494+ live client records",
      "Enrollment Performance Dashboard: primary stakeholder tool for weekly decisions",
    ],
    stack: ["Python", "Pandas", "SQL"],
  },
  {
    role: "Software Developer Intern",
    company: "Syncsas Technologies",
    date: "Nov 2025 – Mar 2026",
    badge: null,
    points: [
      "3 client-facing full-stack features, zero post-release defects",
      "CI/CD via GitHub Actions: 60% reduction in manual deployment steps",
    ],
    stack: ["Python", "Flask", "PostgreSQL", "GitHub Actions"],
  },
];

export const journey = [
  {
    year: "2022",
    text: "Started programming. Began with Python basics, building small scripts to understand how things work.",
  },
  {
    year: "2023",
    text: "Deepened into data: Pandas, NumPy, SQL. First contact with machine learning — Scikit-learn, regression models, understanding that data quality matters.",
  },
  {
    year: "2024",
    text: "Published ML research in IJRASET. First formal signal that I could contribute something original. Software development internship (Syncsas). Shipped production code for real clients for the first time.",
  },
  {
    year: "2025",
    text: "Discovered LangChain and RAG. The moment I understood what a grounded LLM answer meant — and what it takes to build one reliably — was the shift. Earned Google AI Professional Certificate.",
  },
  {
    year: "2026",
    text: "AI Engineer at LanceSoft. Two production systems in use by real people. FinSight live on Railway. Atlas-AI deployed. Figuring out what comes next.",
  },
];

export const horizontalTimeline = [
  {
    id: "finsight",
    year: "2026",
    title: "FinSight",
    subtitle: "AI Financial Intelligence Platform",
    description: "Upload SEC 10-K filings, ask questions, get grounded answers with citations. Multi-mode RAG with visual reports.",
    image: null,
    imageAlt: "FinSight dashboard showing financial analysis",
    badge: "LIVE",
    tags: ["FastAPI", "LangChain", "ChromaDB", "Groq", "React"],
    link: "https://finsight-ai-finance.up.railway.app",
    linkText: "Live Demo",
  },
  {
    id: "hr-policyiq",
    year: "2026",
    title: "HR-PolicyIQ",
    subtitle: "ABAC-Secured HR Assistant Chatbot",
    description: "End-to-end RAG pipeline with document versioning, PII redaction, and attribute-based access control. 100+ daily users at LanceSoft.",
    image: null,
    badge: "INTERNAL",
    tags: ["FastAPI", "LangChain", "ChromaDB", "Groq", "ABAC"],
    link: null,
  },
  {
    id: "lead-gen",
    year: "2026",
    title: "Lead Generation Engine",
    subtitle: "AI-Powered B2B Outreach System",
    description: "Automated pipeline identifying HR and decision-maker contacts at target companies — powering live B2B outreach.",
    image: null,
    badge: "INTERNAL",
    tags: ["Python", "FastAPI", "Selenium", "LLM Enrichment", "PostgreSQL"],
    link: null,
  },
  {
    id: "atlas-ai",
    year: "2025",
    title: "Atlas-AI",
    subtitle: "AI Career Platform — 4 Integrated Systems",
    description: "Job scraper + ATS resume scorer + voice mock interview engine + RAG career chatbot unified into one product.",
    image: null,
    badge: "DEPLOYED",
    tags: ["FastAPI", "React", "Groq", "LangChain", "RAG"],
    link: null,
  },
  {
    id: "closira",
    year: "2025",
    title: "Closira AI",
    subtitle: "Customer Support Agent",
    description: "FAQ answering, lead qualification, escalation detection, and conversation summarization in a single CLI workflow.",
    image: null,
    badge: "OPEN SOURCE",
    tags: ["Python", "Groq (Llama 3.3 70B)", "Prompt Engineering"],
    link: "https://github.com/Umang07-cell/closira-AI-project",
    linkText: "View on GitHub",
  },
  {
    id: "research",
    year: "2024",
    title: "Published ML Research",
    subtitle: "IJRASET Publication",
    description: "First formal signal I could contribute something original. Research on ML model optimization published in peer-reviewed journal.",
    image: null,
    badge: "PUBLISHED",
    tags: ["Python", "Scikit-learn", "Research"],
    link: null,
  },
];

export const currentlyBuilding = [
  {
    title: "Advanced RAG Systems",
    detail: "Going beyond naive retrieval: re-ranking, hybrid search, query decomposition, confidence routing.",
    status: "BUILDING",
  },
  {
    title: "AI Agents & Orchestration",
    detail: "Multi-agent systems, tool use, memory management, agent evaluation frameworks.",
    status: "EXPLORING",
  },
  {
    title: "LLM Evaluation",
    detail: "Building systematic approaches to measure when LLM answers are wrong and why.",
    status: "LEARNING",
  },
  {
    title: "Production MLOps",
    detail: "CI/CD for AI systems, model versioning, monitoring, rollback strategies.",
    status: "LEARNING",
  },
];
