// All content sourced from resume + PRD Section 2. Nothing invented.
// Missing links follow the PRD's placeholder policy (Section 9): hidden in UI,
// marked with data-todo in code, do not break layout.

export const profile = {
  name: "Umang Pawar",
  role: "AI Engineer",
  location: "Nagpur, India",
  phone: "+91 8055070449",
  email: "umangpawar629@gmail.com",
  github: "https://github.com/Umang07-cell",
  githubLabel: "github.com/Umang07-cell",
  linkedin: "https://www.linkedin.com/in/umang-pawar-208157314",
  resumeUrl: "Umang_Pawar_AI_Engineer.pdf",
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
    "I'm a CS graduate from Nagpur who builds production AI systems that actually get used — not just submitted. My work at LanceSoft went from engineering brief to company-wide adoption: an HR chatbot that 100+ employees rely on, and a lead generation engine running live B2B outreach.",
    "I think in pipelines: document ingestion, chunking, embeddings, retrieval, grounding. I care about what happens when an LLM answer is wrong and how the system recovers. I'm a published ML researcher, a Google AI Professional Certificate holder, and someone who debugs production issues on Railway at odd hours because the system needs to work.",
    "Most recently an AI Engineer Intern at LanceSoft. Targeting AI Engineer roles in Pune, Bangalore, or Hyderabad.",
  ],
};

export const finsight = {
  label: "FEATURED PROJECT",
  title: "FinSight",
  badge: "LIVE",
  subtitle: "AI Financial Intelligence Platform",
  github: "https://github.com/Umang07-cell/finsight",
  live: "https://finsight-17ni.onrender.com/#/chat",
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
    { icon: "🤖", title: "Multi-mode AI", detail: "Fast / Standard / Deep Research" },
    { icon: "📄", title: "SEC Filing Analysis", detail: "Upload 10-K PDFs, RAG query" },
    { icon: "📊", title: "Visual Reports", detail: "Charts + recommendations" },
    { icon: "💬", title: "Chat Memory", detail: "Full conversation history" },
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
    stats: [
      { value: "100+", label: "Employees" },
      { value: "6+", label: "HR Modules" },
    ],
    stack: ["FastAPI", "LangChain", "Qdrant", "Groq", "ABAC", "React"],
    detail:
      "ABAC-secured HR assistant built with RAG, LangChain, Qdrant, and Groq (Llama 3). Deployed to 100+ employees, then packaged into a client-facing knowledge-bot product with grounded answers and PII redaction.",
    features: [
      { icon: "🔒", title: "ABAC Access Control", detail: "Permission-gated by role" },
      { icon: "🕵️", title: "PII Redaction", detail: "Automatic on every answer" },
      { icon: "📚", title: "6+ HR Modules", detail: "Single system of record" },
      { icon: "📎", title: "Source Citation", detail: "Every answer, grounded" },
    ],
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
      "Production pipeline for query and JD processing, contact retrieval, pgvector-based candidate matching and scoring, and staged routing — now powering LanceSoft's live B2B outreach.",
    features: [
      { icon: "🕸️", title: "Automated Scraping", detail: "BeautifulSoup + Selenium" },
      { icon: "🧠", title: "LLM Enrichment", detail: "Structured contact profiling" },
      { icon: "📤", title: "Exportable Lists", detail: "Ready for outreach" },
      { icon: "📡", title: "Live B2B Backbone", detail: "Powers real outreach today" },
    ],
    links: { note: "Internal system — no public repo" },
    size: "large",
  },
  {
    label: "FULL-STACK AI PLATFORM",
    labelVariant: "accent",
    title: "Atlas-AI",
    subtitle: "AI Career Platform — 4 Integrated Systems",
    stack: ["FastAPI", "React", "Groq", "LangChain", "HuggingFace", "RAG", "JSearch"],
    detail:
      "JSearch-powered daily job scraper, ATS resume scorer, LLM voice mock interview engine with dynamic follow-ups, and RAG career chatbot — unified into one deployed product.",
    features: [
      { icon: "🔎", title: "Daily Job Scraper", detail: "Live listings, refreshed daily" },
      { icon: "📝", title: "ATS Resume Scorer", detail: "Scored against target JDs" },
      { icon: "🎙️", title: "Voice Mock Interviews", detail: "Dynamic follow-ups, 1–2s response time" },
      { icon: "💬", title: "RAG Career Chatbot", detail: "Grounded career guidance" },
    ],
    links: { github: null, live: "https://atlas-frontend-uo1y.onrender.com/dashboard" }, // data-todo: Add Atlas-AI GitHub link if public
    size: "medium",
  },
  {
    label: "AI WORKFLOW",
    labelVariant: "accent",
    title: "Closira AI",
    subtitle: "Customer Support Agent",
    stack: ["Python", "Groq (Llama 3.3 70B)", "Prompt Engineering"],
    detail:
      "Four-stage LLM workflow using Groq and Llama 3.3: SOP-grounded FAQ answering, structured lead qualification, two-layer escalation detection, and end-of-session summarization.",
    features: [
      { icon: "❓", title: "FAQ Answering", detail: "SOP-grounded, RAG-style" },
      { icon: "🎯", title: "Lead Qualification", detail: "Structured intake flow" },
      { icon: "🚨", title: "Escalation Detection", detail: "Keyword pre-check + model tags" },
      { icon: "📋", title: "Auto-Summarization", detail: "Every conversation logged" },
    ],
    links: { github: "https://github.com/Umang07-cell/closira-AI-project" },
    size: "medium",
  },
  {
    label: "PAYMENT INFRASTRUCTURE",
    labelVariant: "accent",
    title: "PaySettle",
    subtitle: "Payment Exception & Reconciliation Engine",
    stats: [
      { value: "9", label: "REST Endpoints" },
      { value: "5", label: "Anomaly Rules" },
    ],
    stack: ["Python", "Flask", "MySQL", "SQLAlchemy", "REST APIs", "Chart.js"],
    detail:
      "Automated payment reconciliation across UPI/NEFT/RTGS/IMPS. A 5-rule anomaly engine (duplicate, high-value >₹90K, stale pending >24hr, round-trip, failed) flags exceptions in real time across 9 REST endpoints, with a Chart.js analytics dashboard and CSV export.",
    features: [
      { icon: "⚠️", title: "5-Rule Anomaly Engine", detail: "Duplicate, high-value, stale & more" },
      { icon: "🔌", title: "9 REST Endpoints", detail: "Full reconciliation API" },
      { icon: "📊", title: "Chart.js Dashboard", detail: "Real-time analytics" },
      { icon: "📥", title: "CSV Export", detail: "For downstream reporting" },
    ],
    links: { live: null }, // data-todo: Add PaySettle live URL
    size: "medium",
  },
  {
    label: "ML-INTEGRATED PLATFORM",
    labelVariant: "accent",
    title: "TheReturnPath",
    subtitle: "ML-Integrated Missing Persons Platform",
    stack: ["React.js", "Node.js", "face_recognition", "REST API"],
    detail:
      "Integrated a Python face_recognition ML model into production via a Node.js REST API for real-time face matching and alert notifications.",
    features: [
      { icon: "🧬", title: "Face Recognition ML", detail: "Python model, production-wired" },
      { icon: "⚡", title: "Real-time Matching", detail: "Node.js REST API" },
      { icon: "🔔", title: "Alert Notifications", detail: "On confirmed match" },
      { icon: "🎓", title: "IJRASET Published", detail: "Peer-reviewed research" },
    ],
    links: { live: "https://returnpath3.vercel.app/", paper: "https://doi.org/10.22214/ijraset.2025.75012" }, // data-todo: Add live demo URL
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
      "Multi-Agent Systems",
      "Prompt Engineering",
      "Vector Databases",
      "NLP/NLG",
      "MLOps",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      "FastAPI",
      "Flask",
      "Django",
      "Node.js",
      "Express.js",
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
      "EDA",
      "Statistical Analysis",
    ],
  },
  {
    label: "Infrastructure & DevOps",
    items: ["Python", "Git", "GitHub Actions", "Docker", "Railway", "Render", "AWS", "Azure"],
  },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Suvidha Foundation",
    date: "Sep 2025 – Nov 2025",
    badge: null,
    points: [
      "Built NLP/NLG-powered web applications with text preprocessing and language generation pipelines",
      "Work directly applicable to LLM output processing and later AI workflow development",
    ],
    stack: ["Python", "NLP", "NLG"],
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
    role: "AI Engineer Intern",
    company: "LanceSoft",
    date: "Jul 2026 – Sep 2026",
    badge: "RECENT",
    points: [
      "Architected HR-PolicyIQ, an ABAC-secured RAG chatbot using LangChain, Qdrant, and Groq; deployed to 100+ employees and later packaged for an external client",
      "Cut chatbot response latency from 5–6s to 1–1.5s through embedding caching and retrieval optimization; reduced hallucinations with confidence-scored reranking",
      "Designed and shipped the Lead Generation Engine pipeline for query/JD processing, pgvector candidate matching, scoring, and live B2B outreach",
      "Owned the Policy module end to end: document upload, metadata, in-app viewing, versioning, and supersede workflows",
    ],
    stack: ["FastAPI", "LangChain", "Groq", "Qdrant", "PostgreSQL", "Redis"],
  },
];

export const journey = [
  {
    year: "2022",
    text: "Completed HSC (Science) at Prerna Junior College, Nagpur, scoring 81%.",
  },
  {
    year: "2022",
    text: "Began a B.Tech in Computer Science & Engineering at G.H. Raisoni University, Nagpur.",
  },
  {
    year: "2025",
    text: "Published ML research in IJRASET — first formal research credit, tied to TheReturnPath (an ML-integrated missing persons platform).",
  },
  {
    year: "2025",
    text: "Joined Suvidha Foundation as a Software Developer Intern, building NLP/NLG-powered web applications.",
  },
  {
    year: "2025",
    text: "Joined Syncsas Technologies as a Software Developer Intern, shipping full-stack features in Python and Flask.",
  },
  {
    year: "2025",
    text: "Shipped 3 client-facing features with zero post-release defects, and set up CI/CD with GitHub Actions — cutting manual deployment steps by 60%.",
  },
  {
    year: "2026",
    text: "Moved to CarrierDomain as a Data Analyst Intern, building ETL pipelines over 637,000+ live client records.",
  },
  {
    year: "2026",
    text: "Shipped an Enrollment Performance Dashboard, adopted by stakeholders as the primary tool for weekly decisions.",
  },
  {
    year: "2026",
    text: "Graduated B.Tech in Computer Science & Engineering from G.H. Raisoni University, Nagpur.",
  },
  {
    year: "2026",
    text: "Earned the Google AI Professional Certificate.",
  },
  {
    year: "2026",
    text: "Joined LanceSoft as an AI Engineer Intern, owning HR-PolicyIQ and its Policy module — deployed to 100+ employees and later packaged for an external client.",
  },
  {
    year: "2026",
    text: "Shipped an AI-powered Lead Generation Engine at LanceSoft, now the backbone of live B2B outreach with candidate matching, scoring, and staged routing.",
  },
  {
    year: "2026",
    text: "Built and deployed four AI platforms outside of work — Atlas-AI, FinSight, PaySettle, and Closira.",
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
    link: "https://finsight-17ni.onrender.com/#/chat",
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
    link: "https://atlas-frontend-uo1y.onrender.com/dashboard",
    linkText: "Live Demo",
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

export const challenges = [
  {
    title: "Grounding RAG Architecture",
    detail: "Early versions of the chatbot would hallucinate. I solved this by tightly grounding responses to retrieved context to eliminate LLM hallucinations.",
  },
  {
    title: "Production Stress-Testing",
    detail: "Designing aggressive test cases to push system limits rather than relying on the happy path, and iteratively debugging backend bottlenecks before company-wide rollout.",
  },
  {
    title: "Legacy Auth Migration",
    detail: "Getting up to speed on unfamiliar production codebases from scratch to migrate core authentication systems without breaking active dependencies.",
  },
  {
    title: "Vector Database Evaluation",
    detail: "Choosing the right vector database required researching multiple options and weighing them strictly against the project's retrieval and scale requirements before settling on one.",
  },
  {
    title: "Multi-Modal AI Integration",
    detail: "Building Atlas meant combining a real-time voice-based mock interview engine with a RAG-based conversational chatbot into a single, cohesive user experience.",
  },
  {
    title: "Enterprise AI Security",
    detail: "Implementing Attribute-Based Access Control (ABAC) and PII redaction so the LLM only surfaces information the requesting employee is authorized to see.",
  }
];
