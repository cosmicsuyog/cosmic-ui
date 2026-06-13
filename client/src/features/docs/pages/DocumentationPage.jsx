import { useState } from "react";
import { Link } from "react-router-dom";

const installCode = "npm i cosmic-ui-library";

const libraryUsageCode = `import { Button, Card, Modal } from "cosmic-ui-library";

export default function App() {
  return (
    <div>
      <Button text="Get Started" />
      <Card title="Cosmic UI" content="Ready-made React UI components." />
    </div>
  );
}`;

const generatedComponentCode = `import React, { useState } from "react";

export const AnimatedButton = ({
  text = "Click Me!",
  bg = "#7c3aed",
  color = "white",
  onClick = () => {}
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#6b21a8" : bg,
        color,
        padding: "12px 24px",
        borderRadius: "12px",
        border: "none",
        fontWeight: "700",
        cursor: "pointer"
      }}
    >
      {text}
    </button>
  );
};`;

const generatedUsageCode = `import { AnimatedButton } from "./components/AnimatedButton";

export default function App() {
  return (
    <div>
      <AnimatedButton
        text="Launch"
        bg="#7c3aed"
        color="white"
        onClick={() => console.log("clicked")}
      />
    </div>
  );
}`;

const docsSteps = [
  {
    n: "01",
    title: "Install Library",
    desc: "Install Cosmic UI once in your React project.",
  },
  {
    n: "02",
    title: "Use Components",
    desc: "Import ready-made components from the npm package.",
  },
  {
    n: "03",
    title: "Generate with AI",
    desc: "Describe your UI, preview it, then copy the generated JSX.",
  },
  {
    n: "04",
    title: "Copy & Use",
    desc: "Create a component file and import it inside App.jsx.",
  },
];

const CodeBlock = ({ code, label, copiedKey, onCopy }) => (
  <div className="border-outline-variant overflow-hidden rounded-xl border bg-[#1E1E1E] shadow-xl">
    <div className="flex items-center justify-between border-b border-[#3D3D3D] bg-[#2D2D2D] px-4 py-3">
      <span className="type-label-sm tracking-widest text-gray-400 uppercase">{label}</span>
      <button
        type="button"
        onClick={() => onCopy(copiedKey, code)}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        <span className="material-symbols-outlined text-[16px] leading-none">
          content_copy
        </span>
        Copy
      </button>
    </div>
    <pre className="max-h-[420px] overflow-auto p-5 text-sm leading-7 text-green-200">
      <code>{code}</code>
    </pre>
  </div>
);

const DocumentationPage = () => {
  const [copied, setCopied] = useState("");

  const handleCopy = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      /* ignore clipboard failures */
    }
  };

  return (
    <div className="bg-soft-cream-bg text-charcoal-text min-h-screen">
      <header className="border-outline-variant/40 bg-soft-cream-bg/90 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-16">
          <Link to="/home" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Cosmic UI logo" className="h-8 w-8" />
            <span className="navbar-brand-text">Cosmic UI</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/generate"
              className="bg-warm-accent type-label-md text-charcoal-text hidden rounded-full px-5 py-2.5 font-semibold shadow-sm transition-all hover:scale-105 hover:shadow-md sm:inline-flex"
            >
              Generate Component
            </Link>
            <Link
              to="/home"
              className="border-outline-variant type-label-md rounded-full border bg-white px-5 py-2.5 font-semibold text-text-secondary transition-colors hover:text-charcoal-text"
            >
              Back to Main
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-20 px-4 py-16 md:px-16">
        <section className="max-w-4xl">
          <p className="type-label-sm text-warm-accent mb-4 tracking-widest uppercase">
            Documentation
          </p>
          <h1
            className="text-charcoal-text mb-6 font-extrabold"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 1.05,
            }}
          >
            Use Cosmic UI in your React app
          </h1>
          <p className="type-body-lg text-text-secondary max-w-2xl">
            Install the library, import ready-made components, or copy AI-generated components into
            your own files and use them from App.jsx.
          </p>
        </section>

        <section
          className="relative overflow-hidden rounded-2xl p-10 shadow-xl md:p-16"
          style={{ backgroundColor: "#2a2622" }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {docsSteps.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="text-warm-accent mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg font-bold">
                  {n}
                </div>
                <h4 className="mb-2 font-sora text-base font-semibold text-white">{title}</h4>
                <p className="type-body-sm text-white/50">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <p className="type-label-sm text-text-secondary tracking-widest uppercase">
              Quick install
            </p>
            <h2 className="font-sora text-3xl font-bold text-charcoal-text">
              Install the npm package
            </h2>
            <p className="type-body-md text-text-secondary">
              Run this command once in your React project. After that, import components directly
              from the package.
            </p>
            <button
              type="button"
              onClick={() => handleCopy("install", installCode)}
              className="bg-gentle-gray-surface border-outline-variant type-body-sm text-charcoal-text hover:border-warm-accent group flex w-full items-center gap-4 rounded-lg border px-5 py-3 text-left font-mono shadow-sm transition-all"
            >
              <span className="text-text-secondary group-hover:text-warm-accent transition-colors">
                $
              </span>
              <span className="min-w-0 flex-1 break-all">{installCode}</span>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-charcoal-text text-[18px] leading-none transition-colors">
                {copied === "install" ? "check" : "content_copy"}
              </span>
            </button>
          </div>

          <CodeBlock
            code={libraryUsageCode}
            copiedKey="library"
            label="App.jsx"
            onCopy={handleCopy}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <p className="type-label-sm text-text-secondary tracking-widest uppercase">
              AI generated components
            </p>
            <h2 className="font-sora text-3xl font-bold text-charcoal-text">
              Copy code into a local component file
            </h2>
            <p className="type-body-md text-text-secondary">
              When the AI generator creates a component, copy the JSX, create a file inside your
              app, then import it in App.jsx.
            </p>
            <div className="border-outline-variant rounded-xl border bg-white p-5">
              <p className="type-label-sm text-text-secondary mb-3 tracking-widest uppercase">
                Create this file
              </p>
              <p className="font-mono text-lg font-bold text-charcoal-text">
                src/components/AnimatedButton.jsx
              </p>
            </div>
          </div>

          <CodeBlock
            code={generatedComponentCode}
            copiedKey="generated"
            label="AnimatedButton.jsx"
            onCopy={handleCopy}
          />
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-5">
            <p className="type-label-sm text-text-secondary tracking-widest uppercase">
              Use in App.jsx
            </p>
            <h2 className="font-sora text-3xl font-bold text-charcoal-text">
              Import the file and pass props
            </h2>
            <p className="type-body-md text-text-secondary">
              The generated guide in the AI studio will create this App.jsx example using the exact
              component name and props returned by the generator.
            </p>
          </div>

          <CodeBlock
            code={generatedUsageCode}
            copiedKey="usage"
            label="App.jsx"
            onCopy={handleCopy}
          />
        </section>
      </main>
    </div>
  );
};

export default DocumentationPage;
