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
    imageUrl: "/Sands Collections.png",
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
    imageUrl: "/MM Vapers.png",
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
    imageUrl: "/sop writer.png",
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
    imageUrl: "/moussenmelts.png",
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
    imageUrl: "/creatubeai.png",
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
