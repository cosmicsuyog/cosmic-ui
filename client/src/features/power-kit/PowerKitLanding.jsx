import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Code2,
  Copy,
  Github,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Zap,
} from "lucide-react";
import "./power-kit.css";

const utilities = [
  ["Clipboard", "Read and write clipboard content safely."],
  ["Network", "Connection state, ping, and local throughput helpers."],
  ["Storage", "Typed local and session storage with fallbacks."],
  ["Device APIs", "Battery, screen, vibration, visibility, and location."],
  ["Performance", "Cancelable debounce and throttle primitives."],
  ["OTP", "Secure, configurable one-time-password generation."],
];
const code = `import { copyToClipboard, debounce, generateOTP } from "cosmic-ui-library";\n\nawait copyToClipboard("Ready to ship");\nconst search = debounce((query) => fetchResults(query), 250);\nconst code = generateOTP(6, { digits: true });`;

export default function PowerKitLanding() {
  const [theme, setTheme] = useState(() => localStorage.getItem("cosmic-ui-theme") || "dark");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("cosmic-ui-theme", theme);
  }, [theme]);
  const copyCode = async () => {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="power-kit" data-theme={theme}>
      <header className="pk-navbar">
        <Link to="/" className="pk-brand" aria-label="Cosmic UI home">
          <span className="pk-brand-mark">C</span>
          <span>Cosmic UI</span>
          <small>POWER KIT</small>
        </Link>
        <nav aria-label="Primary navigation">
          <a href="#utilities">Utilities</a>
          <Link to="/utility-docs">Docs</Link>
          <Link to="/docs">Components</Link>
          <Link to="/pricing">Pricing</Link>
        </nav>
        <div className="pk-actions">
          <button
            className="pk-icon-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            className="pk-button pk-button-quiet"
            href="https://github.com/cosmicsuyog/cosmic-ui"
            target="_blank"
            rel="noreferrer"
          >
            <Github size={16} /> GitHub
          </a>
          <Link className="pk-button pk-button-solid" to="/login">
            Start building <ArrowRight size={15} />
          </Link>
        </div>
      </header>
      <main>
        <section className="pk-hero">
          <div className="pk-orbit pk-orbit-one" />
          <div className="pk-orbit pk-orbit-two" />
          <div className="pk-hero-copy">
            <p className="pk-eyebrow">
              <Sparkles size={15} /> Cosmic UI × WebDev Power Kit
            </p>
            <h1>
              Browser power.
              <br />
              <span>Product velocity.</span>
            </h1>
            <p className="pk-lede">
              A polished component platform paired with tiny, typed browser utilities—built for
              teams making real products, not demos.
            </p>
            <div className="pk-hero-actions">
              <Link to="/generate" className="pk-button pk-button-solid">
                Generate a component <ArrowRight size={16} />
              </Link>
              <Link to="/utility-docs" className="pk-button pk-button-quiet">
                <BookOpen size={16} /> Browse utilities
              </Link>
            </div>
            <p className="pk-install">
              <Terminal size={14} /> npm install cosmic-ui-library
            </p>
          </div>
          <div className="pk-code-window" aria-label="Code example">
            <div className="pk-window-bar">
              <i />
              <i />
              <i />
              <span>app.ts</span>
              <button onClick={copyCode} aria-label="Copy code">
                {copied ? <ShieldCheck size={15} /> : <Copy size={15} />}
              </button>
            </div>
            <pre>
              <code>{code}</code>
            </pre>
            <div className="pk-window-footer">
              <span>
                <Zap size={14} /> zero runtime dependencies
              </span>
              <span>TypeScript ready</span>
            </div>
          </div>
        </section>
        <section className="pk-proof" aria-label="Platform capabilities">
          <span>
            <strong>140+</strong> UI components
          </span>
          <span>
            <strong>16</strong> browser modules
          </span>
          <span>
            <strong>0</strong> utility dependencies
          </span>
          <span>
            <strong>∞</strong> product ideas
          </span>
        </section>
        <section id="utilities" className="pk-section">
          <div className="pk-section-heading">
            <p className="pk-eyebrow">
              <Boxes size={15} /> Utility catalog
            </p>
            <h2>Small APIs. Serious finish.</h2>
            <p>
              Tree-shakeable browser primitives with explicit fallbacks, teardown functions, and
              modern TypeScript types.
            </p>
          </div>
          <div className="pk-utility-grid">
            {utilities.map(([name, description], index) => (
              <Link className="pk-utility-card" to="/utility-docs" key={name}>
                <span className="pk-card-index">0{index + 1}</span>
                <Code2 size={21} />
                <h3>{name}</h3>
                <p>{description}</p>
                <ArrowRight className="pk-card-arrow" size={17} />
              </Link>
            ))}
          </div>
        </section>
        <section className="pk-section pk-product-section">
          <div className="pk-section-heading">
            <p className="pk-eyebrow">
              <Sparkles size={15} /> Build without context switching
            </p>
            <h2>One workflow from prompt to publish.</h2>
          </div>
          <div className="pk-workflow-grid">
            <article>
              <span>01</span>
              <h3>Generate</h3>
              <p>Describe a component and use the existing OpenRouter workflow to create it.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Preview</h3>
              <p>Inspect generated code and live output before it becomes part of your library.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Publish</h3>
              <p>
                Save components, share public work, and use the same utilities across every build.
              </p>
            </article>
          </div>
        </section>
        <section className="pk-pricing-teaser">
          <div>
            <p className="pk-eyebrow">
              <Zap size={15} /> Plans that scale with ideas
            </p>
            <h2>
              Start with the toolkit.
              <br />
              Scale with the generator.
            </h2>
          </div>
          <div>
            <p>
              Use the component library and browser utilities as a single package, then choose a
              Cosmic UI plan when your team needs more generation credits.
            </p>
            <Link to="/pricing" className="pk-button pk-button-solid">
              See pricing <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="pk-product-callout">
          <div>
            <p className="pk-eyebrow">
              <Zap size={15} /> The complete kit
            </p>
            <h2>
              Generate, preview,
              <br />
              publish, repeat.
            </h2>
          </div>
          <div>
            <p>
              Cosmic UI keeps its AI generation, Firebase sign-in, component dashboard, and Razorpay
              plans—now inside the same focused visual system as the utility catalog.
            </p>
            <Link to="/generate" className="pk-button pk-button-solid">
              Open generator <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <footer className="pk-footer">
        <div className="pk-brand">
          <span className="pk-brand-mark">C</span>
          <span>Cosmic UI</span>
        </div>
        <p>Includes WebDev Power Kit utilities. MIT attribution: Aditya Kumar Gupta.</p>
        <div>
          <Link to="/utility-docs">Docs</Link>
          <a href="https://github.com/cosmicsuyog/cosmic-ui" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
