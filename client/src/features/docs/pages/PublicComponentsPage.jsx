import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getPublicComponentsService } from "../../components/services/componentService";
import GeneratedPreview from "../../generate/components/GeneratedPreview";

const normalizeProps = (props) => {
  if (Array.isArray(props)) {
    return props;
  }

  if (props && typeof props === "object") {
    return Object.keys(props);
  }

  return [];
};

const getApiErrorMessage = (error, fallback) =>
  error.response?.data?.error || error.response?.data?.message || error.message || fallback;

const getPropExample = (propName) => {
  const lowerName = propName.toLowerCase();

  if (lowerName.startsWith("on")) {
    return `${propName}={() => {}}`;
  }

  if (
    lowerName.includes("count") ||
    lowerName.includes("price") ||
    lowerName.includes("rating") ||
    lowerName.includes("value") ||
    lowerName.includes("total")
  ) {
    return `${propName}={3}`;
  }

  if (
    lowerName.includes("disabled") ||
    lowerName.includes("loading") ||
    lowerName.includes("active") ||
    lowerName.includes("open")
  ) {
    return `${propName}={false}`;
  }

  if (
    lowerName.includes("items") ||
    lowerName.includes("links") ||
    lowerName.includes("features") ||
    lowerName.includes("rows") ||
    lowerName.includes("cards")
  ) {
    return `${propName}={[]}`;
  }

  return `${propName}="${propName} value"`;
};

const createUsageCode = (componentName, componentProps) => {
  const propLines = componentProps.slice(0, 10).map((propName) => `        ${getPropExample(propName)}`);
  const propsBlock = propLines.length > 0 ? `\n${propLines.join("\n")}\n      ` : "";

  return `import { ${componentName} } from "./components/${componentName}";

export default function App() {
  return (
    <div>
      <${componentName}${propsBlock}/>
    </div>
  );
}`;
};

const copyToClipboard = async (text) => {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    return false;
  }

  await navigator.clipboard.writeText(text);
  return true;
};

const CodeBlock = ({ code, label = "JSX", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const didCopy = await copyToClipboard(code);

    if (!didCopy) {
      return;
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={`border-outline-variant overflow-hidden rounded-xl border bg-[#1E1E1E] shadow-xl ${className}`}>
      <div className="flex items-center justify-between border-b border-[#3D3D3D] bg-[#2D2D2D] px-4 py-3">
        <span className="type-label-sm tracking-widest text-gray-400 uppercase">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="material-symbols-outlined text-[16px] leading-none">
            content_copy
          </span>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-[560px] overflow-auto p-5 text-sm leading-7 text-green-200">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const DockButton = ({ active, icon, label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      active
        ? "bg-white text-charcoal-text shadow-sm"
        : "text-text-secondary hover:text-charcoal-text"
    }`}
  >
    <span className="material-symbols-outlined text-base leading-none">{icon}</span>
    {label}
  </button>
);

const EmptyState = () => (
  <div className="border-outline-variant flex min-h-[420px] items-center justify-center rounded-xl border bg-white p-8 text-center shadow-sm">
    <div className="max-w-md">
      <div className="bg-highlight-pink/40 text-charcoal-text mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
        <span className="material-symbols-outlined text-[30px] leading-none">widgets</span>
      </div>
      <h2 className="text-charcoal-text mb-3 text-2xl font-extrabold">
        No public components yet
      </h2>
      <p className="text-text-secondary text-sm leading-6">
        Public components created by admins will appear here once they are saved.
      </p>
    </div>
  </div>
);

const UsageGuide = ({ componentCode, componentName, componentProps }) => {
  const filePath = `src/components/${componentName}.jsx`;
  const usageCode = createUsageCode(componentName, componentProps);

  return (
    <div className="space-y-8">
      <div>
        <p className="type-label-sm text-warm-accent mb-5 tracking-widest uppercase">
          Usage Guide
        </p>
        <div className="space-y-9">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-text-secondary text-[21px] leading-none">
                content_copy
              </span>
              <span className="text-warm-accent text-lg font-extrabold">01</span>
              <h3 className="text-charcoal-text text-lg font-bold">Copy the component code</h3>
            </div>
            <CodeBlock code={componentCode} label={`${componentName}.jsx`} />
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-text-secondary text-[21px] leading-none">
                code
              </span>
              <span className="text-warm-accent text-lg font-extrabold">02</span>
              <h3 className="text-charcoal-text text-lg font-bold">Create a new file</h3>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(filePath)}
              className="bg-gentle-gray-surface border-outline-variant hover:border-warm-accent w-full rounded-xl border px-5 py-5 text-left shadow-sm transition-colors"
              title="Copy file path"
            >
              <span className="text-text-secondary mb-4 block text-[11px] font-bold uppercase tracking-widest">
                Filename
              </span>
              <span className="text-charcoal-text font-mono text-base font-bold">{filePath}</span>
            </button>
            <p className="text-text-secondary text-sm">Paste the copied code into this file.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-text-secondary text-[21px] leading-none">
                auto_awesome
              </span>
              <span className="text-warm-accent text-lg font-extrabold">03</span>
              <h3 className="text-charcoal-text text-lg font-bold">Import and use in App.jsx</h3>
            </div>
            <CodeBlock code={usageCode} label="App.jsx" />
          </section>
        </div>
      </div>
    </div>
  );
};

const PublicComponentsPage = () => {
  const [components, setComponents] = useState([]);
  const [activeComponentId, setActiveComponentId] = useState("");
  const [activeView, setActiveView] = useState("preview");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadComponents = useCallback(async ({ silent = false } = {}) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setErrorMessage("");

    try {
      const response = await getPublicComponentsService();
      const nextComponents = response.data?.components || [];
      setComponents(nextComponents);
      setActiveComponentId((currentId) => {
        if (nextComponents.some((component) => component._id === currentId)) {
          return currentId;
        }

        return nextComponents[0]?._id || "";
      });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, "Failed to load public components."));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadComponents();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadComponents]);

  const filteredComponents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return components;
    }

    return components.filter((component) =>
      component.name?.toLowerCase().includes(normalizedSearch)
    );
  }, [components, searchTerm]);

  const activeComponent = useMemo(
    () =>
      filteredComponents.find((component) => component._id === activeComponentId) ||
      filteredComponents[0] ||
      null,
    [activeComponentId, filteredComponents]
  );

  const componentName = activeComponent?.name || "GeneratedComponent";
  const componentCode = activeComponent?.code || "";
  const componentProps = useMemo(
    () => normalizeProps(activeComponent?.props),
    [activeComponent?.props]
  );
  const displayedActiveComponentId = activeComponent?._id || "";
  const headerDescription = useMemo(() => {
    if (!activeComponent) {
      return "Preview, code, and guide for public components.";
    }

    if (!componentProps.length) {
      return "Props: no props detected";
    }

    return `Props: ${componentProps.join(", ")}`;
  }, [activeComponent, componentProps]);

  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="border-outline-variant flex min-h-[460px] items-center justify-center rounded-xl border bg-white shadow-sm">
          <div className="text-center">
            <span className="material-symbols-outlined text-warm-accent mb-4 animate-spin text-4xl leading-none">
              progress_activity
            </span>
            <p className="text-charcoal-text font-bold">Loading public components</p>
            <p className="text-text-secondary mt-2 text-sm">Fetching the documentation library.</p>
          </div>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="border-red-soft bg-red-soft/40 flex min-h-[460px] items-center justify-center rounded-xl border p-8 text-center">
          <div className="max-w-md">
            <span className="material-symbols-outlined mb-4 text-4xl leading-none text-red-600">
              error
            </span>
            <h2 className="text-charcoal-text mb-3 text-2xl font-extrabold">
              Could not load components
            </h2>
            <p className="text-text-secondary mb-6 text-sm leading-6">{errorMessage}</p>
            <button
              type="button"
              onClick={() => loadComponents()}
              className="bg-charcoal-text rounded-full px-5 py-3 text-sm font-extrabold text-white shadow-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (!activeComponent) {
      return <EmptyState />;
    }

    if (activeView === "code") {
      return <CodeBlock code={componentCode} label={`${componentName}.jsx`} />;
    }

    if (activeView === "guide") {
      return (
        <UsageGuide
          componentCode={componentCode}
          componentName={componentName}
          componentProps={componentProps}
        />
      );
    }

    return (
      <div className="bg-charcoal rounded-xl p-5 shadow-xl">
        <GeneratedPreview
          componentCode={componentCode}
          componentName={componentName}
          componentProps={componentProps}
        />
      </div>
    );
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
              to="/docs"
              className="border-outline-variant type-label-md rounded-full border bg-white px-5 py-2.5 font-semibold text-text-secondary transition-colors hover:text-charcoal-text"
            >
              Docs
            </Link>
            <Link
              to="/generate"
              className="bg-warm-accent type-label-md text-charcoal-text hidden rounded-full px-5 py-2.5 font-semibold shadow-sm transition-all hover:scale-105 hover:shadow-md sm:inline-flex"
            >
              Generate Component
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:px-16">
        <section className="max-w-4xl">
          <p className="type-label-sm text-warm-accent mb-4 tracking-widest uppercase">
            Component Library
          </p>
          <h1
            className="text-charcoal-text mb-6 font-extrabold"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 1.05,
            }}
          >
            Public Cosmic UI components
          </h1>
          <p className="type-body-lg text-text-secondary max-w-2xl">
            Browse public components from the npm library and admin-created documentation
            components. Preview them, copy the code, and drop them into App.jsx.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="border-outline-variant bg-surface-container-low h-fit rounded-xl border p-4 shadow-sm lg:sticky lg:top-24">
            <label className="border-outline-variant mb-5 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-text-secondary shadow-sm">
              <span className="material-symbols-outlined text-[20px] leading-none">search</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search components..."
                className="text-charcoal-text min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-text-tertiary"
              />
            </label>

            <p className="type-label-sm text-text-secondary mb-4 tracking-widest uppercase">
              Components - {filteredComponents.length}
            </p>
            <div className="max-h-[60vh] space-y-1 overflow-auto pr-1">
              {filteredComponents.map((component) => {
                const isActive = component._id === displayedActiveComponentId;

                return (
                  <button
                    key={component._id}
                    type="button"
                    onClick={() => {
                      setActiveComponentId(component._id);
                      setActiveView("preview");
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-highlight-pink/50 text-charcoal-text shadow-sm"
                        : "text-text-secondary hover:bg-white hover:text-charcoal-text"
                    }`}
                  >
                    <span className="min-w-0 truncate">{component.name}</span>
                    {component.source === "library" && (
                      <span className="bg-blue-soft/70 ml-2 shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold text-charcoal-text">
                        npm
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="border-outline-variant/50 mb-6 flex flex-col gap-5 border-b pb-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <h2 className="text-charcoal-text truncate text-3xl font-extrabold">
                  {activeComponent?.name || "Public Components"}
                </h2>
                <p className="text-text-secondary mt-2 text-sm font-semibold">
                  {headerDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadComponents({ silent: true })}
                  className="border-outline-variant flex h-10 w-10 items-center justify-center rounded-full border bg-white text-text-secondary shadow-sm transition-colors hover:text-charcoal-text"
                  aria-label="Refresh public components"
                  title="Refresh public components"
                >
                  <span className={`material-symbols-outlined text-[20px] leading-none ${refreshing ? "animate-spin" : ""}`}>
                    refresh
                  </span>
                </button>
                {activeComponent && (
                  <div className="bg-surface-container-low flex rounded-full p-1 shadow-sm">
                    <DockButton
                      active={activeView === "preview"}
                      icon="visibility"
                      label="Preview"
                      onClick={() => setActiveView("preview")}
                    />
                    <DockButton
                      active={activeView === "code"}
                      icon="code"
                      label="Code"
                      onClick={() => setActiveView("code")}
                    />
                    <DockButton
                      active={activeView === "guide"}
                      icon="explore"
                      label="Guide"
                      onClick={() => setActiveView("guide")}
                    />
                  </div>
                )}
              </div>
            </div>

            {renderMainContent()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicComponentsPage;
