/* eslint-disable max-lines */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/hooks/useAuth";

// eslint-disable-next-line complexity
const HomePage = () => {
  const { isAuthenticated, user, handleLogout } = useAuth();
  const [copied, setCopied] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(65);
  const [generationStatus, setGenerationStatus] = useState("Compiling responsive layout...");

  const hasSignedInUser = isAuthenticated && Boolean(user);
  const userDisplayName =
    user?.displayName || user?.name || user?.email?.split("@")[0] || "Developer";
  const footerLinks = [
    ["Documentation", "/coming-soon/docs"],
    ["GitHub", "/coming-soon/github"],
    ["Twitter", "/coming-soon/twitter"],
    ["Discord", "/coming-soon/discord"],
    ["Privacy Policy", "/coming-soon/privacy"],
    ["Contact Admin", "/coming-soon/contact"],
  ];

  /* Copy npm install command */
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("npm i cosmic-ui-library");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  /* Simulate AI generation progress bar */
  useEffect(() => {
    const statuses = [
      "Analyzing layout requirements...",
      "Compiling responsive layout...",
      "Generating Tailwind v4 classes...",
      "Structuring DOM hierarchy...",
      "Injecting interactive hooks...",
      "Finalizing React component...",
    ];
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          setGenerationStatus(statuses[Math.floor(Math.random() * statuses.length)]);
          return 30;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-soft-cream-bg text-text-primary flex min-h-screen flex-col overflow-x-hidden">
      {/* ── TOP NAVIGATION ──────────────────────────────── */}
      <nav className="bg-soft-cream-bg/90 border-outline-variant/40 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-16">
          {/* Logo */}
          <Link to="/home" className="flex shrink-0 items-center gap-2">
            <img src="/favicon.svg" alt="Cosmic UI logo" className="h-8 w-8" />
            <span className="navbar-brand-text">Cosmic UI</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <Link
              className="type-body-sm text-charcoal-text border-warm-accent border-b-2 pb-0.5 font-bold"
              to="/home"
            >
              Components
            </Link>
            <Link
              className="type-body-sm text-text-secondary hover:text-charcoal-text font-medium transition-colors"
              to="/coming-soon/docs"
            >
              Documentation
            </Link>
            <Link
              className="type-body-sm text-text-secondary hover:text-charcoal-text font-medium transition-colors"
              to="/coming-soon/showcase"
            >
              Showcase
            </Link>
            <Link
              className="type-body-sm text-text-secondary hover:text-charcoal-text font-medium transition-colors"
              to="/coming-soon/pricing"
            >
              Pricing
            </Link>
          </div>

          {hasSignedInUser ? (
            <div className="relative shrink-0">
              <button
                onClick={() => setShowUserMenu((v) => !v)}
                className="hover:bg-surface-container-low flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 transition-colors select-none"
              >
                <span className="material-symbols-outlined text-charcoal-text text-2xl leading-none">
                  account_circle
                </span>
                <span className="type-label-md text-charcoal-text hidden md:block">
                  {userDisplayName}
                </span>
                <span className="material-symbols-outlined text-text-secondary hidden text-sm leading-none md:block">
                  keyboard_arrow_down
                </span>
              </button>

              {showUserMenu && (
                <>
                  <button
                    aria-label="Close account menu"
                    className="fixed inset-0 z-10 cursor-default bg-transparent"
                    onClick={() => setShowUserMenu(false)}
                    type="button"
                  />
                  <div className="border-outline-variant absolute top-full right-0 z-20 mt-2 w-56 rounded-xl border bg-white py-2 shadow-xl">
                    <div className="border-outline-variant/50 border-b px-4 py-2">
                      <p className="text-text-secondary mb-0.5 text-[10px] font-semibold tracking-widest uppercase">
                        Account
                      </p>
                      <p className="type-body-sm text-charcoal-text truncate font-semibold">
                        {userDisplayName}
                      </p>
                      <p className="type-body-sm text-text-secondary truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/coming-soon/settings"
                        className="type-body-sm text-charcoal-text hover:bg-surface-container-low flex items-center gap-2 px-4 py-2 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px] leading-none">
                          settings
                        </span>
                        Settings
                      </Link>
                      <Link
                        to="/coming-soon/billing"
                        className="type-body-sm text-charcoal-text hover:bg-surface-container-low flex items-center gap-2 px-4 py-2 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px] leading-none">
                          database
                        </span>
                        Usage &amp; Billing
                      </Link>
                    </div>
                    <div className="border-outline-variant/50 border-t pt-1">
                      <button
                        onClick={handleLogout}
                        className="type-body-sm flex w-full cursor-pointer items-center gap-2 px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        <span className="material-symbols-outlined text-[18px] leading-none">
                          logout
                        </span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/"
              className="bg-warm-accent type-label-md text-charcoal-text shrink-0 rounded-full px-5 py-2.5 font-semibold shadow-sm transition-all hover:scale-105 hover:shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* ── MAIN ─────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 pt-16 pb-24 md:px-16">
        {/* HERO */}
        <section className="mb-32 flex flex-col items-center text-center">
          <div className="bg-highlight-pink/40 type-label-sm text-charcoal-text mb-6 inline-flex animate-pulse items-center rounded-full px-4 py-2">
            AI-POWERED REACT UI-LIBRARY
          </div>

          <h1
            className="text-charcoal-text mb-6 max-w-4xl font-extrabold"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            BUILD REACT UI
            <br />
            FASTER WITH AI
          </h1>

          <p className="type-body-lg text-text-secondary mx-auto mb-10 max-w-xl">
            Stop writing boilerplate code. Use Cosmic UI to instantly generate production-ready
            React components simply by describing them.
          </p>

          {/* npm install copy widget */}
          <div className="relative mb-10">
            <button
              onClick={handleCopyCode}
              className="bg-gentle-gray-surface border-outline-variant type-body-sm text-charcoal-text hover:border-warm-accent group flex cursor-pointer items-center gap-4 rounded-lg border px-6 py-3 font-mono shadow-sm transition-all"
              title="Click to copy"
            >
              <span className="text-text-secondary group-hover:text-warm-accent transition-colors">
                $
              </span>
              <span>npm i cosmic-ui-library</span>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-charcoal-text text-[18px] leading-none transition-colors">
                {copied ? "check" : "content_copy"}
              </span>
            </button>
            {copied && (
              <div className="bg-charcoal-text absolute -top-9 left-1/2 -translate-x-1/2 rounded px-3 py-1 text-xs font-semibold text-white shadow">
                Copied!
              </div>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to={hasSignedInUser ? "/coming-soon/generate" : "/"}
              className="bg-warm-accent text-charcoal-text type-label-md cursor-pointer rounded-full px-8 py-4 font-semibold shadow-md transition-transform hover:scale-105"
            >
              GET STARTED
            </Link>
            <Link
              to="/coming-soon/generate"
              className="bg-gentle-gray-surface text-charcoal-text type-label-md border-outline-variant hover:bg-surface-container-high cursor-pointer rounded-full border px-8 py-4 font-semibold transition-colors"
            >
              Generate AI Component
            </Link>
          </div>
        </section>

        {/* CODE EDITOR MOCKUP */}
        <section className="mb-32">
          <div className="border-outline-variant overflow-hidden rounded-xl border bg-[#1E1E1E] shadow-2xl">
            {/* macOS window bar */}
            <div className="flex items-center gap-2 border-b border-[#3D3D3D] bg-[#2D2D2D] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <div className="h-3 w-3 rounded-full bg-[#27C93F]" />
              <div className="flex-1 text-center font-mono text-xs text-gray-400">
                cosmic-ui — Code Editor
              </div>
            </div>

            {/* Editor body */}
            <div className="flex w-full" style={{ minHeight: "340px" }}>
              {/* Sidebar */}
              <div className="hidden w-52 shrink-0 flex-col border-r border-[#333] bg-[#252526] p-4 font-mono text-sm text-gray-400 md:flex">
                <div className="mb-3 text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Explorer
                </div>
                <div className="mb-1 flex items-center gap-2 text-gray-300">
                  <span className="material-symbols-outlined text-[16px] leading-none">
                    folder_open
                  </span>{" "}
                  src
                </div>
                <div className="pl-4">
                  <div className="mb-1 flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-warm-accent text-[16px] leading-none">
                      folder
                    </span>{" "}
                    components
                  </div>
                  <div className="pl-4">
                    <div className="mb-1 flex items-center gap-2 text-gray-300">
                      <span className="material-symbols-outlined text-[16px] leading-none text-yellow-500">
                        code
                      </span>{" "}
                      HeroSection.jsx
                    </div>
                  </div>
                  <div className="mb-1 flex items-center gap-2 text-gray-400">
                    <span className="material-symbols-outlined text-[16px] leading-none">
                      folder
                    </span>{" "}
                    pages
                  </div>
                  <div className="mb-1 flex items-center gap-2 text-gray-400">
                    <span className="material-symbols-outlined text-[16px] leading-none">
                      folder
                    </span>{" "}
                    styles
                  </div>
                </div>
              </div>

              {/* Code area */}
              <div className="relative min-h-0 flex-1 overflow-hidden p-6 font-mono text-sm leading-7 text-gray-300">
                <div>
                  <span className="text-[#569CD6]">import</span>{" "}
                  <span className="text-[#9CDCFE]">{"{ useState }"}</span>{" "}
                  <span className="text-[#569CD6]">from</span>{" "}
                  <span className="text-[#CE9178]">&apos;react&apos;</span>;
                </div>
                <div>
                  <span className="text-[#569CD6]">import</span>{" "}
                  <span className="text-[#9CDCFE]">{"{ Button }"}</span>{" "}
                  <span className="text-[#569CD6]">from</span>{" "}
                  <span className="text-[#CE9178]">&apos;cosmic-ui&apos;</span>;
                </div>
                <br />
                <div>
                  <span className="text-[#569CD6]">export default function </span>
                  <span className="text-[#DCDCAA]">HeroSection</span>
                  <span className="text-gray-300">() {"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-[#C586C0]">return</span> (
                </div>
                <div className="pl-8">
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-[#569CD6]">div</span>{" "}
                  <span className="text-[#9CDCFE]">className</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-[#CE9178]">&quot;hero-section bg-soft-cream&quot;</span>
                  <span className="text-gray-500">&gt;</span>
                </div>
                <div className="pl-12">
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-[#569CD6]">h1</span>
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Build React UI Faster</span>
                  <span className="text-gray-500">&lt;/</span>
                  <span className="text-[#569CD6]">h1</span>
                  <span className="text-gray-500">&gt;</span>
                </div>
                <div className="pl-12">
                  <span className="text-gray-500">&lt;</span>
                  <span className="text-[#569CD6]">Button</span>{" "}
                  <span className="text-[#9CDCFE]">variant</span>
                  <span className="text-gray-500">=</span>
                  <span className="text-[#CE9178]">&quot;primary&quot;</span>
                  <span className="text-gray-500">&gt;</span>
                  <span className="text-white">Get Started</span>
                  <span className="text-gray-500">&lt;/</span>
                  <span className="text-[#569CD6]">Button</span>
                  <span className="text-gray-500">&gt;</span>
                </div>
                <div className="pl-8">
                  <span className="text-gray-500">&lt;/</span>
                  <span className="text-[#569CD6]">div</span>
                  <span className="text-gray-500">&gt;</span>
                </div>
                <div className="pl-4">);</div>
                <div>{"}"}</div>

                {/* AI generation overlay */}
                <div className="border-warm-accent/30 absolute right-6 bottom-6 w-72 rounded-xl border bg-[#2D2D2D]/95 p-4 shadow-2xl">
                  <div className="text-highlight-pink mb-3 flex items-center gap-2 text-xs font-semibold">
                    <span
                      className="material-symbols-outlined text-sm leading-none"
                      style={{ animation: "spin 2s linear infinite" }}
                    >
                      auto_awesome
                    </span>
                    Generating Component...
                  </div>
                  <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-[#1E1E1E]">
                    <div
                      className="bg-highlight-pink h-full rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>
                  <div className="text-[11px] tracking-wide text-gray-400">{generationStatus}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="mb-32">
          <div className="mb-14 text-center">
            <p className="type-label-sm text-text-secondary mb-3 tracking-widest uppercase">
              WHAT&apos;S INSIDE
            </p>
            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
              className="text-charcoal-text"
            >
              Everything you need
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "view_module",
                title: "Prebuilt UI Components",
                desc: "Install CosmicUI and use ready-made, production-grade components instantly.",
              },
              {
                icon: "smart_toy",
                title: "AI Component Generator",
                desc: "Describe your UI in plain English and generate React components in seconds.",
              },
              {
                icon: "tune",
                title: "Customizable Props",
                desc: "Modify component props and preview changes in real-time without rebuilding.",
              },
              {
                icon: "code",
                title: "Clean JSX Code",
                desc: "Copy production-ready JSX directly into your project — zero boilerplate.",
              },
              {
                icon: "inventory_2",
                title: "NPM Library",
                desc: "Import CosmicUI components with a simple npm install command.",
              },
              {
                icon: "play_circle",
                title: "Live Preview",
                desc: "Instantly preview AI-generated components before exporting your code.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-surface border-outline-variant rounded-xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="bg-highlight-pink/40 text-charcoal-text mb-6 flex h-11 w-11 items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-xl leading-none">{icon}</span>
                </div>
                <h4
                  className="text-charcoal-text mb-3 font-bold"
                  style={{ fontFamily: "'Sora', sans-serif", fontSize: "1.1rem" }}
                >
                  {title}
                </h4>
                <p className="type-body-sm text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-32">
          <h2
            className="text-charcoal-text mb-14 text-center font-extrabold"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(2rem, 6vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
          >
            HOW IT WORKS
          </h2>

          <div
            className="relative overflow-hidden rounded-2xl p-10 shadow-xl md:p-16"
            style={{ backgroundColor: "#2a2622" }}
          >
            {/* Grid background */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="relative z-10 grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                {
                  n: "01",
                  title: "Install Library",
                  desc: "npm install cosmic-ui-library to access all prebuilt UI components.",
                },
                {
                  n: "02",
                  title: "Use Components",
                  desc: "Import and customize with props for any design requirement.",
                },
                {
                  n: "03",
                  title: "Generate with AI",
                  desc: "Describe your UI and let AI build the component for you.",
                },
                {
                  n: "04",
                  title: "Copy & Use",
                  desc: "Paste the clean JSX code straight into your project.",
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className="text-center">
                  <div className="text-warm-accent mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg font-bold">
                    {n}
                  </div>
                  <h4
                    className="mb-2 font-semibold text-white"
                    style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem" }}
                  >
                    {title}
                  </h4>
                  <p className="type-body-sm text-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mb-32">
          <div
            className="relative overflow-hidden rounded-3xl p-10 text-center shadow-2xl md:p-24"
            style={{ background: "linear-gradient(135deg, #2a2622 0%, #1a1816 100%)" }}
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
              style={{ backgroundColor: "rgba(232,160,110,0.2)" }}
            />

            <div className="relative z-10 mx-auto max-w-2xl">
              <p className="type-label-sm text-warm-accent mb-4 tracking-widest uppercase">
                START BUILDING
              </p>
              <h2
                className="mb-6 font-bold text-white"
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(1.75rem, 5vw, 3rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                Ready to generate
                <br />
                your new component?
              </h2>

              <p className="type-body-md mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
                Welcome back,{" "}
                <span className="text-warm-accent font-semibold">{userDisplayName}!</span> Continue
                building amazing components.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  to="/coming-soon/generate"
                  className="bg-warm-accent text-charcoal-text type-label-md flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold shadow-[0_4px_16px_rgba(232,160,110,0.4)] transition-transform hover:scale-105"
                >
                  <span className="material-symbols-outlined text-sm leading-none">
                    auto_awesome
                  </span>
                  Generate Component
                </Link>
                <Link
                  to="/coming-soon/components"
                  className="type-label-md flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold transition-colors hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                >
                  <span className="material-symbols-outlined text-sm leading-none">grid_view</span>
                  My Components
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── GIANT FOOTER WORDMARK ──────────────────────── */}
      <div className="border-outline-variant/30 bg-soft-cream-bg w-full overflow-hidden border-t py-10 text-center">
        <span
          className="text-charcoal-text block leading-none font-extrabold tracking-tighter select-none"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2.25rem, 11.5vw, 16rem)",
            opacity: 0.9,
            lineHeight: 0.85,
          }}
        >
          COSMIC UI
        </span>
      </div>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer className="bg-surface-container-low border-outline-variant/30 border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pt-12 pb-8 md:px-16">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <span
              className="text-charcoal-text/10 hidden font-extrabold tracking-tighter uppercase select-none md:block"
              style={{ fontFamily: "'Sora', sans-serif", fontSize: "3rem" }}
            >
              COSMIC UI
            </span>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map(([label, to]) => (
                <Link
                  key={label}
                  to={to}
                  className="type-label-sm text-on-surface-variant hover:text-warm-accent transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="border-outline-variant/20 flex flex-col items-center justify-between gap-3 border-t pt-6 md:flex-row">
            <p className="type-body-sm text-on-surface-variant">
              © 2026 Cosmic UI. Built with precision and warmth.
            </p>
            <p className="type-body-sm text-on-surface-variant hover:text-warm-accent transition-colors">
              admin@cosmicui.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
