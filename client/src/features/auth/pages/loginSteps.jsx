const STEPS = [
  {
    id: "google",
    title: "Login with Google",
    description: "Secure OAuth to unlock all AI tools instantly.",
    icon: (isActive) => (
      <svg
        className={`h-4 w-4 transition-colors duration-500 ${isActive ? "text-charcoal" : "text-white/70"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "credits",
    title: "Get 150 AI Credits",
    description: "Start designing and prototyping immediately.",
    icon: (isActive) => (
      <svg
        className={`h-4 w-4 transition-colors duration-500 ${isActive ? "text-charcoal" : "text-white/70"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "props",
    title: "Customize Props",
    description: "Fine-tune and preview every change live.",
    icon: (isActive) => (
      <svg
        className={`h-4 w-4 transition-colors duration-500 ${isActive ? "text-charcoal" : "text-white/70"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "generate",
    title: "Generate Components",
    description: "Export clean React and Tailwind code instantly.",
    icon: (isActive) => (
      <svg
        className={`h-4 w-4 transition-colors duration-500 ${isActive ? "text-charcoal" : "text-white/70"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    id: "copy",
    title: "Copy or Save",
    description: "Save designs directly to your library or clipboard.",
    icon: (isActive) => (
      <svg
        className={`h-4 w-4 transition-colors duration-500 ${isActive ? "text-charcoal" : "text-white/70"}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export default STEPS;
