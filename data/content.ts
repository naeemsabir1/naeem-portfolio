// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  tagline: string;
  type: string;
  description: string;
  caseStudy: string;
  stack: string[];
  color: string;
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  useIframe?: boolean;
}

// ─── About Data ───────────────────────────────────────────────────────────────

export const aboutData = {
  name: "Naeem Sabir",
  title: "Full-Stack & AI Developer",
  location: "Lahore, Pakistan",
  githubUrl: "https://github.com/naeemsabir1",
  email: "naeemsabir002@gmail.com",
  university: "University of Management & Technology (UMT)",
  bio: "A Full-Stack & AI Developer based in Lahore, pursuing Computer Science at UMT. I build resilient digital ecosystems and AI-powered apps, leveraging agentic models to supercharge creative output.",
  bioExtended:
    "I engineer high-performance websites and intelligent applications. By deeply integrating agentic models like Claude Code into my workflow, I supercharge my creative and technical output, delivering complex solutions at unprecedented speeds. My work spans from crafting pixel-perfect e-commerce storefronts to architecting AI-driven SaaS platforms that push the boundaries of what's possible.",
  techArsenal: [
    { name: "Flutter", icon: "📱" },
    { name: "Dart", icon: "🎯" },
    { name: "Python", icon: "🐍" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "Angular", icon: "🅰️" },
    { name: "TypeScript", icon: "🔷" },
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎨" },
    { name: "Java", icon: "☕" },
  ],
  interests: [
    {
      title: "Padel",
      emoji: "🏓",
      description: "Dominating the padel court on weekends",
      color: "#10B981",
    },
    {
      title: "Anime",
      emoji: "⛩️",
      description: "From Attack on Titan to Jujutsu Kaisen",
      color: "#8B5CF6",
    },
    {
      title: "Bollywood",
      emoji: "🎬",
      description: "A sucker for SRK classics and new-wave cinema",
      color: "#F59E0B",
    },
  ],
  beyondTheCode:
    "When I'm not building resilient UI libraries or architecting SaaS platforms, you can find me on the padel court, binge-watching anime, or quoting Bollywood dialogues.",
  philosophy:
    "I believe that the best software is not just functional, but deeply intuitive and beautifully crafted. My approach blends rigorous system architecture with an obsessive attention to user experience. Whether it's optimizing a complex background job or refining a micro-animation, I treat every line of code as an opportunity to build something exceptional.",
  experience: [
    {
      role: "Freelance Full-Stack Developer",
      period: "2022 - Present",
      description: "Delivering end-to-end web and mobile applications for international clients, focusing on scalable architectures and fluid UI."
    },
    {
      role: "AI Integration Specialist",
      period: "2023 - Present",
      description: "Pioneering the use of agentic models to automate complex development workflows and create intelligent application features."
    }
  ],
};

// ─── Skills / Stack Data ──────────────────────────────────────────────────────

export type SkillCategory = "Web" | "AI & GenAI" | "Mobile" | "Infra" | "DesignOps";
export type SkillCell = "rag" | "phone" | "next" | "neural" | "ts" | "chip";
export type SkillBadge = "new" | "core" | "shipping";

export interface Skill {
  name: string;
  level: number;
  years: string;
  tag: string;            // primary project this powered
  projects?: string[];    // every project this skill powered (for cross-links)
  color: string;
  category: SkillCategory;
  role: string;
  hero?: boolean;
  cell?: SkillCell;       // which renderer the bento should use
  badge?: SkillBadge;     // small ribbon on the cell
  trend?: number[];       // 6 numbers 0–100, drives a sparkline on hover
}

export const SKILLS: Skill[] = [
  // ── Hero showpieces (live demo cells) ─────────────────────────────────────
  { name: "Generative AI",  level: 92, years: "2 yrs", tag: "SopWriter",        projects: ["SopWriter", "CreatubeAI", "Talkio"], color: "#A855F7", category: "AI & GenAI", role: "RAG + agent architecture",     hero: true, cell: "rag",    badge: "core",     trend: [40,55,62,71,84,92] },
  { name: "Flutter",        level: 95, years: "4 yrs", tag: "Talkio",           projects: ["Talkio"],                              color: "#027DFD", category: "Mobile",     role: "Cross-platform mobile",        hero: true, cell: "phone",  badge: "shipping", trend: [70,78,85,90,93,95] },
  { name: "Next.js",        level: 92, years: "3 yrs", tag: "Sands Collections",projects: ["Sands Collections", "MoussenMelts"],   color: "#E2E8F0", category: "Web",        role: "Full-stack React framework",   hero: true, cell: "next",   badge: "core",     trend: [60,70,78,85,90,92] },
  { name: "OpenAI",         level: 90, years: "2 yrs", tag: "Talkio",           projects: ["Talkio", "SopWriter", "CreatubeAI"],   color: "#10A37F", category: "AI & GenAI", role: "LLM integration",              hero: true, cell: "neural", badge: "shipping", trend: [50,62,72,82,88,90] },
  { name: "TypeScript",     level: 88, years: "3 yrs", tag: "CreatubeAI",       projects: ["CreatubeAI", "Sands Collections"],     color: "#3178C6", category: "Web",        role: "Type-safe everything",         hero: true, cell: "ts",     badge: "core",     trend: [55,66,74,80,85,88] },

  // ── Primary chips (always visible) ────────────────────────────────────────
  { name: "React",          level: 90, years: "4 yrs", tag: "SopWriter",        projects: ["SopWriter", "Sands Collections"],      color: "#61DAFB", category: "Web",        role: "UI component layer",                                                  trend: [60,70,78,85,88,90] },
  { name: "Python",         level: 85, years: "3 yrs", tag: "SopWriter",        projects: ["SopWriter", "CreatubeAI"],             color: "#3776AB", category: "AI & GenAI", role: "AI & backend scripting"                                              },
  { name: "Node.js",        level: 84, years: "3 yrs", tag: "MoussenMelts",     projects: ["MoussenMelts", "Sands Collections"],   color: "#339933", category: "Web",        role: "Server-side runtime"                                                  },
  { name: "Firebase",       level: 85, years: "3 yrs", tag: "Talkio",           projects: ["Talkio", "MoussenMelts"],              color: "#FFCA28", category: "Infra",      role: "Realtime backend"                                                     },
  { name: "RAG",            level: 88, years: "2 yrs", tag: "SopWriter",        projects: ["SopWriter", "CreatubeAI"],             color: "#F97316", category: "AI & GenAI", role: "Retrieval-augmented gen.",   badge: "shipping"                        },
  { name: "Vercel AI SDK",  level: 82, years: "1 yr",  tag: "Sands Collections",projects: ["Sands Collections"],                   color: "#0EA5E9", category: "AI & GenAI", role: "Streaming UI for LLMs",      badge: "new"                             },

  // ── Extended arsenal (collapsible) ────────────────────────────────────────
  { name: "LangGraph",      level: 78, years: "1 yr",  tag: "SopWriter",        projects: ["SopWriter"],                           color: "#1C7E5F", category: "AI & GenAI", role: "Multi-agent orchestration",  badge: "new"                             },
  { name: "LangChain",      level: 80, years: "1 yr",  tag: "SopWriter",        projects: ["SopWriter"],                           color: "#3ECFCF", category: "AI & GenAI", role: "LLM tooling framework"                                                },
  { name: "LlamaIndex",     level: 76, years: "1 yr",  tag: "SopWriter",        projects: ["SopWriter"],                           color: "#FFB800", category: "AI & GenAI", role: "Document indexing",          badge: "new"                             },
  { name: "Pinecone",       level: 80, years: "2 yrs", tag: "SopWriter",        projects: ["SopWriter", "CreatubeAI"],             color: "#0BA5A4", category: "AI & GenAI", role: "Vector database"                                                      },
  { name: "pgvector",       level: 78, years: "1 yr",  tag: "CreatubeAI",       projects: ["CreatubeAI"],                          color: "#4169E1", category: "Infra",      role: "Postgres vector search",     badge: "new"                             },
  { name: "Claude",         level: 86, years: "1 yr",  tag: "Talkio",           projects: ["Talkio", "SopWriter"],                 color: "#D97706", category: "AI & GenAI", role: "Long-context reasoning",     badge: "new"                             },
  { name: "Gemini",         level: 76, years: "1 yr",  tag: "CreatubeAI",       projects: ["CreatubeAI"],                          color: "#4285F4", category: "AI & GenAI", role: "Multimodal LLM",             badge: "new"                             },
  { name: "MCP",            level: 72, years: "<1 yr", tag: "SopWriter",        projects: ["SopWriter"],                           color: "#FF6B6B", category: "AI & GenAI", role: "Model Context Protocol",     badge: "new"                             },
  { name: "Whisper",        level: 84, years: "1 yr",  tag: "Talkio",           projects: ["Talkio"],                              color: "#6F1FFF", category: "AI & GenAI", role: "Speech transcription"                                                 },
  { name: "Stable Diffusion",level:72, years: "1 yr",  tag: "CreatubeAI",       projects: ["CreatubeAI"],                          color: "#E6007E", category: "AI & GenAI", role: "Image generation"                                                     },
  { name: "ElevenLabs",     level: 82, years: "1 yr",  tag: "Talkio",           projects: ["Talkio"],                              color: "#FF6B35", category: "AI & GenAI", role: "AI voice synthesis"                                                   },
  { name: "FastAPI",        level: 82, years: "2 yrs", tag: "SopWriter",        projects: ["SopWriter"],                           color: "#009688", category: "AI & GenAI", role: "High-perf Python API"                                                 },
  { name: "Cursor",         level: 90, years: "1 yr",  tag: "Workflow",         projects: ["Workflow"],                            color: "#7C3AED", category: "DesignOps",  role: "AI-pair-programming",        badge: "shipping"                        },
  { name: "n8n",            level: 72, years: "1 yr",  tag: "MoussenMelts",     projects: ["MoussenMelts"],                        color: "#EA4B71", category: "Infra",      role: "Visual workflow automation"                                           },
  { name: "Dart",           level: 90, years: "4 yrs", tag: "Talkio",           projects: ["Talkio"],                              color: "#0175C2", category: "Mobile",     role: "Flutter's native language"                                            },
  { name: "RevenueCat",     level: 78, years: "1 yr",  tag: "Talkio",           projects: ["Talkio"],                              color: "#E54D2E", category: "Mobile",     role: "Subscription monetisation"                                            },
  { name: "Angular",        level: 78, years: "2 yrs", tag: "Enterprise Apps",  projects: ["Enterprise Apps"],                     color: "#DD0031", category: "Web",        role: "Enterprise frontend"                                                  },
  { name: "Supabase",       level: 80, years: "2 yrs", tag: "SopWriter",        projects: ["SopWriter"],                           color: "#3ECF8E", category: "Infra",      role: "Open-source BaaS"                                                     },
  { name: "MongoDB",        level: 80, years: "3 yrs", tag: "MoussenMelts",     projects: ["MoussenMelts"],                        color: "#47A248", category: "Infra",      role: "Document database"                                                    },
  { name: "PostgreSQL",     level: 76, years: "2 yrs", tag: "SopWriter",        projects: ["SopWriter", "CreatubeAI"],             color: "#4169E1", category: "Infra",      role: "Relational database"                                                  },
  { name: "AWS",            level: 74, years: "2 yrs", tag: "CreatubeAI",       projects: ["CreatubeAI"],                          color: "#FF9900", category: "Infra",      role: "Cloud infrastructure"                                                 },
  { name: "Redis",          level: 72, years: "1 yr",  tag: "CreatubeAI",       projects: ["CreatubeAI"],                          color: "#DC382D", category: "Infra",      role: "In-memory cache"                                                      },
  { name: "Stripe",         level: 78, years: "2 yrs", tag: "SopWriter",        projects: ["SopWriter"],                           color: "#635BFF", category: "Infra",      role: "Payment infrastructure"                                               },
];

export const MARQUEE_TECH = [
  "Shopify API", "Vercel", "Netlify", "Cloudinary", "WebSocket",
  "Bull Queue", "FFmpeg", "Riverpod", "NextAuth", "Tailwind CSS",
  "GSAP", "Framer Motion", "REST APIs", "GraphQL", "Docker",
  "Git", "CI/CD", "Figma", "Lenis", "Resend",
  "Drizzle", "Zod", "tRPC", "Bun", "Hono",
  "Anthropic", "pnpm", "Turborepo", "Playwright", "Upstash",
];

// ─── Canvas Config ────────────────────────────────────────────────────────────

export const canvasConfig = {
  home: { folderPath: "/Frames", frameCount: 352 },
  websites: { folderPath: "/Frames", frameCount: 352 },
  apps: { folderPath: "/Frames", frameCount: 352 },
};

// ─── Website Projects ─────────────────────────────────────────────────────────

export const websiteProjects: Project[] = [
  {
    id: "sands",
    name: "Sands Collections",
    tagline: "Luxury Redefined in E-Commerce",
    type: "E-Commerce Platform",
    description:
      "A premium e-commerce storefront for a high-end fashion brand, built with performance and elegance at its core.",
    caseStudy: `Sands Collections demanded a digital experience as refined as the products it showcases. The challenge was to build a blazing-fast e-commerce platform that could handle high-resolution imagery without sacrificing load times.

The architecture leverages Next.js for server-side rendering, ensuring every product page is SEO-optimized and loads in under 2 seconds. A custom CMS integration allows the client to manage inventory, pricing, and promotional banners without touching code.

Key decisions included implementing a headless commerce approach with Shopify as the backend, enabling flexible frontend design while maintaining robust order management. The checkout flow was optimized to reduce cart abandonment by 35% through a streamlined single-page process with real-time inventory validation.`,
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Shopify API", "Vercel"],
    color: "#C4A265",
    liveUrl: "https://sands-collections-ns.netlify.app/",
    githubUrl: "https://github.com/naeemsabir1/E-commerce",
    imageUrl: "/Sands Collections.webp",
  },
  {
    id: "mmvapers",
    name: "MM Vapers",
    tagline: "Cloud-Chasing, Digitized",
    type: "Storefront & Catalog",
    description:
      "A sleek digital storefront for a vape brand, featuring animated product showcases and an intuitive browsing experience.",
    caseStudy: `MM Vapers needed a digital presence that matched the boldness of its brand. The goal was to create an immersive product catalog that let users explore flavors and hardware with interactive visual elements.

The design system uses a dark-mode-first approach with neon accent gradients that evoke the vapor aesthetic. Product cards feature hover-activated 3D transforms and smooth parallax effects that give each item a tactile, premium feel.

Performance was critical — with hundreds of product images, I implemented progressive loading with blur-up placeholders and WebP optimization, achieving a Lighthouse performance score of 95+. The filtering system uses client-side search with debounced queries for instant results.`,
    stack: ["React", "CSS Modules", "Node.js", "MongoDB", "Cloudinary"],
    color: "#6366F1",
    liveUrl: "http://moussenmelts.com/",
    githubUrl: "https://github.com/naeemsabir1",
    imageUrl: "/MM Vapers.webp",
  },
  {
    id: "sopwriter",
    name: "SopWriter",
    tagline: "AI-Powered Academic Writing",
    type: "SaaS Platform",
    description:
      "An automated platform that generates polished Statements of Purpose using AI, tailored to each university's requirements.",
    caseStudy: `SopWriter was born from a real pain point — students spending weeks crafting SOPs when AI could do the heavy lifting. The platform uses fine-tuned language models to generate university-specific statements that read naturally and hit all the right notes.

The architecture is a Next.js frontend paired with a Python FastAPI backend. The AI pipeline uses prompt engineering with contextual templates for different universities, programs, and applicant backgrounds. Each generated SOP goes through a multi-pass refinement process that checks for tone, structure, and keyword optimization.

User authentication is handled via NextAuth with Google and email providers. The payment system integrates Stripe for subscription management with tiered pricing. A built-in editor lets users refine AI-generated content with real-time grammar and style suggestions.`,
    stack: ["Next.js", "Python", "FastAPI", "OpenAI", "Stripe", "PostgreSQL"],
    color: "#0EA5E9",
    liveUrl: "https://sopwriter.pk/",
    githubUrl: "https://github.com/naeemsabir1/SopWriter",
    imageUrl: "/sop writer.webp",
  },
  {
    id: "mousse",
    name: "MoussenMelts",
    tagline: "Artisan Bakery, Digital Warmth",
    type: "Bakery Website",
    description:
      "A warm, inviting web app for an artisan bakery featuring online ordering, menu browsing, and a visual feast of baked goods.",
    caseStudy: `MoussenMelts is a local bakery that wanted its website to feel as warm and inviting as walking into the shop. The design prioritizes rich photography, warm color palettes, and smooth animations that make you smell the fresh bread through the screen.

The menu system is dynamic — the owner can update daily specials, seasonal items, and pricing through a custom admin panel built with React. The ordering flow supports both pickup and delivery with time-slot selection and real-time availability checking.

A standout feature is the "Build Your Box" customizer where customers can assemble gift boxes by dragging items into a virtual container with live price calculation. The entire experience is optimized for mobile since 70% of the bakery's customers order from their phones.`,
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    color: "#D97706",
    liveUrl: "http://moussenmelts.com/",
    githubUrl: "https://github.com/naeemsabir1",
    imageUrl: "/moussenmelts.webp",
  },
  {
    id: "creatube",
    name: "CreatubeAI",
    tagline: "Video Generation at Scale",
    type: "Video Generation SaaS",
    description:
      "A SaaS platform that uses AI to automatically generate short-form video content from text prompts and templates.",
    caseStudy: `CreatubeAI tackles the bottleneck of video content creation for social media marketers. The platform takes a text prompt, selects relevant stock footage, generates voiceover, and assembles complete short-form videos — all in under 3 minutes.

The video pipeline is orchestrated with a Python backend that coordinates multiple AI services: text-to-speech, scene matching, and automated editing. The rendering engine uses FFmpeg with custom presets optimized for TikTok, Instagram Reels, and YouTube Shorts aspect ratios.

The Next.js frontend features a real-time preview system with WebSocket connections that stream rendering progress. Users can customize templates, brand colors, fonts, and music tracks. The dashboard includes analytics showing video performance metrics pulled from platform APIs.

Scaling was the biggest challenge — rendering is GPU-intensive, so I implemented a job queue with Bull and Redis that dynamically allocates cloud GPU instances based on demand.`,
    stack: [
      "Next.js",
      "Python",
      "FFmpeg",
      "OpenAI",
      "AWS",
      "Redis",
      "WebSocket",
    ],
    color: "#EC4899",
    liveUrl: "https://creatube.ai/",
    githubUrl: "https://github.com/naeemsabir1",
    imageUrl: "/creatubeai.webp",
  },
];

// ─── App Projects ─────────────────────────────────────────────────────────────

export const appProjects: Project[] = [
  {
    id: "talkio",
    name: "Talkio",
    tagline: "Your AI Voice Companion",
    type: "AI Voice Application",
    description:
      "A premium AI voice companion app built with Flutter, featuring natural conversations, multiple personas, and subscription-based access.",
    caseStudy: `Talkio reimagines how people interact with AI — through natural voice conversations rather than text. The app features multiple AI personas, each with distinct voices, personalities, and expertise areas, making every conversation feel genuinely engaging.

The Flutter architecture uses a clean MVVM pattern with Riverpod for state management. Voice processing happens via a custom pipeline: user speech is captured, sent to Whisper for transcription, processed through GPT-4 for response generation, and converted back to speech using ElevenLabs' neural voice synthesis.

The subscription model is powered by RevenueCat, supporting both iOS App Store and Google Play billing. Three tiers — Free, Plus, and Premium — gate features like conversation history, persona access, and voice customization. The paywall was A/B tested to optimize conversion rates.

The onboarding flow was carefully designed to comply with Apple's App Store Review Guidelines, including proper restore purchase functionality, localized content in 5 languages, and transparent data collection policies. The app achieved approval on the first submission.`,
    stack: [
      "Flutter",
      "Dart",
      "OpenAI",
      "ElevenLabs",
      "RevenueCat",
      "Firebase",
    ],
    color: "#8B5CF6",
    liveUrl: "#",
    githubUrl: "https://github.com/naeemsabir1/Talkio",
    imageUrl: "/Talkio.jpeg",
  },
];

// ─── Unified Projects (Home Showcase) ────────────────────────────────────────

export const allProjects: Project[] = [
  appProjects[0], // Talkio
  websiteProjects[0], // Sands Collections
  websiteProjects[2], // SopWriter
  websiteProjects[3], // MoussenMelts
  websiteProjects[1], // MM Vapers
  websiteProjects[4], // CreatubeAI
];
