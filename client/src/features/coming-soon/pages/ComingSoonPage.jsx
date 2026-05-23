import { Link, useParams } from "react-router-dom";

const pageLabels = {
  billing: "Usage & Billing",
  components: "My Components",
  contact: "Contact Admin",
  discord: "Discord",
  docs: "Documentation",
  generate: "AI Component Generator",
  github: "GitHub",
  pricing: "Pricing",
  privacy: "Privacy Policy",
  security: "Security",
  settings: "Settings",
  showcase: "Showcase",
  terms: "Terms of Service",
  twitter: "Twitter",
};

const ComingSoonPage = () => {
  const { page = "feature" } = useParams();
  const pageTitle = pageLabels[page] || "This page";

  return (
    <div className="bg-soft-cream-bg text-charcoal-text min-h-screen">
      <header className="border-outline-variant/40 bg-soft-cream-bg/90 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-16">
          <Link to="/home" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Cosmic UI logo" className="h-8 w-8" />
            <span className="navbar-brand-text">Cosmic UI</span>
          </Link>
          <Link
            to="/home"
            className="bg-warm-accent type-label-md text-charcoal-text rounded-full px-5 py-2.5 font-semibold shadow-sm transition-all hover:scale-105 hover:shadow-md"
          >
            Back to Main
          </Link>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center">
        <div className="bg-highlight-pink/40 text-charcoal-text mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl">
          <span className="material-symbols-outlined text-3xl leading-none">construction</span>
        </div>
        <p className="type-label-sm text-text-secondary mb-4 tracking-widest uppercase">
          Coming soon
        </p>
        <h1
          className="text-charcoal-text mb-6 font-extrabold"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            lineHeight: 1.05,
          }}
        >
          {pageTitle}
        </h1>
        <p className="type-body-lg text-text-secondary mb-10 max-w-xl">
          This part of Cosmic UI is not ready yet. We are still shaping it, so for now you can head
          back to the main page.
        </p>
        <Link
          to="/home"
          className="bg-charcoal-text type-label-md rounded-full px-8 py-4 font-semibold text-white shadow-md transition-all hover:scale-105"
        >
          Go Back Home
        </Link>
      </main>
    </div>
  );
};

export default ComingSoonPage;
