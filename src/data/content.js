// All content sourced from resume + PRD Section 2. Nothing invented.
// Missing links follow the PRD's placeholder policy (Section 9): hidden in UI,
// marked with data-todo in code, do not break layout.

export const profile = {
  name: "Umang Pawar",
  role: "AI/GenAI Engineer",
  location: "Nagpur, India",
  phone: "+91 80550 70449",
  email: "umangpawar629@gmail.com",
  github: "https://github.com/Umang07-cell",
  githubLabel: "github.com/Umang07-cell",
  linkedin: "https://www.linkedin.com/in/umang-pawar-208157314",
  portfolio: "umangpawar.vercel.app",
  resumeUrl: "/Umang_Pawar_AI_Engineer.pdf",
};

export const heroCopy = {
  overline: "AI/GENAI ENGINEER — LLMs, RAG & AGENTIC SYSTEMS",
  positioning: "4 AI projects. 2 live deployments.\n45/50 on a hand-checked test set.",
  description:
    "Fresher AI Engineer who built and deployed RAG systems, guardrailed retrieval, and agentic LLM workflows. Skilled in Python, FastAPI, LangChain, and 3 vector stores.",
};

export const aboutCopy = {
  heading: "Building AI that works in the real world.",
  paragraphs: [
    "Fresher AI Engineer who built and deployed RAG systems, guardrailed retrieval, and agentic LLM workflows across 4 AI projects and 2 live deployments. Built an access-controlled HR RAG chatbot for 100+ employees at LanceSoft (45/50 on a hand-checked test set).",
    "I think in pipelines: document ingestion, chunking, embeddings, retrieval, grounding. Skilled in Python, FastAPI, LangChain, and 3 vector stores (Qdrant, FAISS, pgvector). I care about what happens when an LLM answer is wrong and how the system recovers.",
    "Google AI Professional Certificate holder and published ML researcher (IJRASET, 2025). Most recently an AI Engineer Intern at LanceSoft. Targeting AI Engineer roles in Pune, Bangalore, or Hyderabad.",
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
    "Groq",
    "LangChain",
    "FAISS",
    "Railway",
  ],
  features: [
    { icon: "🤖", title: "Multi-mode AI", detail: "Fast / Standard / Deep Research" },
    { icon: "📄", title: "SEC Filing Analysis", detail: "Upload 10-K PDFs, RAG query" },
    { icon: "📊", title: "Visual Reports", detail: "Charts + recommendations" },
    { icon: "💬", title: "Chat Memory", detail: "Full conversation history" },
  ],
  engineeringNote:
    "Tested on sample financial reports with 20+ edge-case questions, checking answers against the source; improved answer quality by fixing chunking and tuning the retrieval pipeline. Deployed on Railway; resolved Pydantic version conflicts and CORS issues.",
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
    stack: ["FastAPI", "LangChain", "Qdrant", "Groq", "ABAC", "PostgreSQL", "Redis"],
    detail:
      "ABAC-secured HR assistant built with RAG, LangChain, Qdrant, and Groq (Llama 3) over 30+ HR policy documents (~4,000 chunks). Deployed to 100+ employees. Evaluated 45/50 on a hand-checked test set with confidence-scored reranking and source-cited grounding guardrails.",
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
      "Production pipeline for query and JD processing, contact retrieval, pgvector-based candidate matching and scoring across 3,000+ candidate records, and staged routing — now powering LanceSoft's live B2B outreach.",
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
    stack: ["Python", "FastAPI", "Groq", "LangChain", "JSearch"],
    detail:
      "Built 4 integrated AI systems in one deployed product: a JSearch job scraper (8-10 jobs per run), an ATS resume scorer, a voice mock-interview engine with LLM follow-ups, and a RAG career chatbot. Fine-tuned Llama 3 with LoRA, integrated a Groq-hosted vision-language model. Cut response latency from 4-5s to ~2s (~2x faster).",
    features: [
      { icon: "🔎", title: "Daily Job Scraper", detail: "Live listings, refreshed daily" },
      { icon: "📝", title: "ATS Resume Scorer", detail: "Scored against target JDs" },
      { icon: "🎙️", title: "Voice Mock Interviews", detail: "LoRA + Vision, 1–2s latency" },
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
    label: "AI / GenAI",
    items: [
      "Retrieval-Augmented Generation (RAG)",
      "LangChain",
      "Agentic Workflows",
      "LoRA Fine-tuning",
      "Prompt Engineering",
      "Reranking",
      "Guardrails",
      "LLM Evaluation",
      "Function/Tool Calling",
      "Vision-Language Models",
    ],
  },
  {
    label: "LLMs / Vector DBs",
    items: [
      "Groq",
      "OpenAI API",
      "Llama 3",
      "Qdrant",
      "FAISS",
      "pgvector",
    ],
  },
  {
    label: "Languages / Backend",
    items: [
      "Python",
      "SQL",
      "FastAPI",
      "Flask",
      "REST APIs",
      "SQLAlchemy",
      "ABAC (Attribute-Based Access Control)",
    ],
  },
  {
    label: "Data / Infra",
    items: ["PostgreSQL", "Redis", "Pandas", "Power BI", "Excel", "Git", "GitHub Actions (CI/CD)", "Docker", "Railway", "Render"],
  },
];

export const experience = [
  {
    role: "Software Developer Intern",
    company: "Syncsas Technologies",
    date: "Nov 2025 – Mar 2026",
    badge: null,
    points: [
      "Shipped 3 client-facing full-stack features (Python, Flask, PostgreSQL) across Agile sprints, including an AI chatbot (LangChain + OpenAI API), with testing",
      "Set up GitHub Actions CI/CD pipelines, cutting manual deployment steps by 60%",
    ],
    stack: ["Python", "Flask", "PostgreSQL", "LangChain", "OpenAI API", "GitHub Actions"],
  },
  {
    role: "Data Analyst Intern",
    company: "CarrierDomain",
    date: "Mar 2026 – Jun 2026",
    badge: null,
    points: [
      "Built automated Python/Pandas/SQL ETL pipelines processing 637,494+ client records across multiple source tables into ML-ready datasets",
      "Built Power BI and Excel dashboards that refresh directly from the pipeline, giving stakeholders weekly KPI and segmentation reporting",
    ],
    stack: ["Python", "Pandas", "SQL", "Power BI", "Excel"],
  },
  {
    role: "AI Engineer Intern",
    company: "LanceSoft",
    date: "Jul 2026 – Sep 2026",
    badge: "RECENT",
    points: [
      "Built HR-PolicyIQ, a RAG chatbot (LangChain, Qdrant, Groq Llama 3, FastAPI, PostgreSQL, Redis) over 30+ HR policy documents (~4,000 chunks), deployed to 100+ employees",
      "Evaluated on a 50-question test set, checking every answer against source documents: 45/50 correct with relevant citations; fixed the 5 partially accurate answers by revising the system prompt",
      "Implemented ABAC retrieval for 3 roles (manager, HR, employee) across Hyderabad and Bangalore; ran 20+ edge-case unauthorized-access tests, identified content leaks, and fixed them",
      "Added a confidence-scored reranker and source-cited answers as grounding guardrails against hallucination, plus request logging to monitor query and API-key failures",
      "Benchmarked local Llama 3 (PyTorch) against Groq-hosted Llama 3 and migrated to Groq for production reliability; cut average response latency from 5-6s to 1-1.5s (~4x faster) via embedding caching and pipeline optimization",
      "Built a lead-generation engine matching 3,000+ candidate records to job descriptions and resumes using pgvector and contact retrieval, surfacing qualified leads for managers and HR",
    ],
    stack: ["FastAPI", "LangChain", "Groq", "Qdrant", "PostgreSQL", "Redis", "pgvector"],
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
    text: "Graduated B.Tech in Computer Science & Engineering from G.H. Raisoni University, Nagpur (CGPA: 7.50/10).",
  },
  {
    year: "2026",
    text: "Earned the Google AI Professional Certificate (2026).",
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
    tags: ["Groq", "LangChain", "FAISS", "Railway"],
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
    tags: ["FastAPI", "LangChain", "Qdrant", "Groq", "ABAC"],
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
    tags: ["Python", "FastAPI", "Groq", "LangChain", "JSearch"],
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
