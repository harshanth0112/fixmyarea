/**
 * FixMyArea - Shared Project Constants & Design Tokens
 * 
 * Inspired by Ellipsus Help Center:
 * Clean, editorial, warm neutral palette, spacious layout tokens.
 * All developers should reference these design classes and tokens
 * to guarantee complete visual consistency across pages.
 */

// 1. Color Palette Tokens & Tailwind Classes
export const THEME = {
  colors: {
    bg: "#F7F6F2",          // Warm off-white background
    surface: "#FFFFFF",     // Clean card/surface white
    textPrimary: "#202020", // Deep charcoal
    textMuted: "#737373",   // Muted neutral gray
    border: "#E7E5E0",      // Light warm gray border
    accent: "#536B4F",      // Deep forest/olive green
    accentHover: "#435740", // Darker forest hover
    accentSoft: "#DDE6D8",  // Soft sage green
  },
  
  // Tailwind Utility Presets for common elements
  classes: {
    body: "bg-[#F7F6F2] text-[#202020] min-h-screen flex flex-col font-sans antialiased selection:bg-[#DDE6D8] selection:text-[#202020]",
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    card: "bg-white border border-[#E7E5E0] rounded-xl p-5 hover:border-[#D1CECA] hover:shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all",
    cardHover: "bg-white border border-[#E7E5E0] rounded-xl p-5 hover:border-[#536B4F]/40 hover:shadow-[0_4px_16px_rgba(83,107,79,0.06)] hover:-translate-y-0.5 transition-all",
    
    // Buttons
    btnPrimary: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#536B4F] hover:bg-[#435740] active:scale-[0.98] rounded-full shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#536B4F] focus-visible:ring-offset-2",
    btnSecondary: "inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-[#202020] bg-white border border-[#E7E5E0] hover:bg-[#F7F6F2] active:scale-[0.98] rounded-full shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#536B4F]",
    
    // Form elements
    input: "w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] rounded-xl text-sm text-[#202020] placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#536B4F] focus:border-transparent transition-all",
    select: "w-full px-3.5 py-2.5 bg-white border border-[#E7E5E0] rounded-xl text-sm text-[#202020] focus:outline-none focus:ring-2 focus:ring-[#536B4F] focus:border-transparent transition-all",
    label: "block text-xs font-semibold uppercase tracking-wider text-[#555] mb-1.5",
  }
};

// 2. Standard Issue Categories
export const CATEGORIES = [
  "Road & Potholes",
  "Streetlights",
  "Waste Management",
  "Water & Drainage",
  "Public Spaces",
  "Other Issues"
];

// 3. Standard Issue Statuses & Badges
export const STATUSES = {
  REPORTED: "Reported",
  UNDER_REVIEW: "Under Review",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved"
};

export const STATUS_STYLES = {
  "Reported": "bg-[#F0EFEB] text-[#555] border-[#DEDBD5]",
  "Under Review": "bg-[#FEF5E7] text-[#9A6218] border-[#FCD9A5]",
  "In Progress": "bg-[#EBF3FC] text-[#1E56A0] border-[#BFD9F8]",
  "Resolved": "bg-[#EBF5EA] text-[#2D6A28] border-[#C3E4BF]"
};

// 4. Standard Urgency / Priorities
export const PRIORITIES = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High"
};

// 5. Shared Tailwind CDN & Font Configuration snippet
// Developers can paste this inside the <head> of any page for identical styling.
export const TAILWIND_CONFIG_HEAD = `
  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
          colors: {
            brand: {
              DEFAULT: '#536B4F',
              hover: '#435740',
              soft: '#DDE6D8',
            },
            canvas: '#F7F6F2',
            surface: '#FFFFFF',
            borderLight: '#E7E5E0',
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #F7F6F2;
      color: #202020;
    }
  </style>
`;
