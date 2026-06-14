import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GeneratedPreview from "../../generate/components/GeneratedPreview";
import { getMyComponentsService } from "../services/componentService";

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

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "Saved component";
  }

  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
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
        <span className="type-label-sm tracking-widest text-gray-400 uppercase">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="material-symbols-outlined text-[18px] leading-none">content_copy</span>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-[620px] overflow-auto p-5 text-sm leading-7 text-emerald-200">
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
    <span className="material-symbols-outlined text-[18px] leading-none">{icon}</span>
    {label}
  </button>
);

const EmptyState = () => (
  <div className="border-outline-variant flex min-h-[480px] items-center justify-center rounded-xl border bg-white p-8 text-center shadow-sm">
    <div className="max-w-md">
      <div className="bg-highlight-pink/40 text-charcoal-text mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
        <span className="material-symbols-outlined text-[30px] leading-none">widgets</span>
      </div>
      <h2 className="text-charcoal-text mb-3 text-2xl font-extrabold">No components saved yet</h2>
      <p className="text-text-secondary mb-7 text-sm leading-6">
        Generate a component, save it, and it will appear here with preview, source code, and
        usage guide.
      </p>
      <Link
        to="/generate"
        className="bg-warm-accent text-charcoal-text inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold shadow-sm transition-transform hover:scale-105"
      >
        <span className="material-symbols-outlined text-[18px] leading-none">auto_awesome</span>
        Generate Component
      </Link>
    </div>
  </div>
);

const UsageGuide = ({ componentName, componentCode, componentProps }) => {
  const fileName = `${componentName}.jsx`;
  const filePath = `src/components/${fileName}`;
  const usageCode = createUsageCode(componentName, componentProps);

  return (
    <div className="space-y-7">
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
            <CodeBlock code={componentCode} label="JSX" />
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
            <CodeBlock code={usageCode} label="JSX" className="mb-2" />
          </section>
        </div>
      </div>
    </div>
  );
};

const MyComponentsPage = () => {
  const navigate = useNavigate();
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
      const response = await getMyComponentsService();
      const nextComponents = response.data?.components || [];
      setComponents(nextComponents);
      setActiveComponentId((currentId) => {
        if (nextComponents.some((component) => component._id === currentId)) {
          return currentId;
        }

        return nextComponents[0]?._id || "";
      });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/", { replace: true });
        return;
      }

      setErrorMessage(getApiErrorMessage(error, "Failed to load your saved components."));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

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
      return "Preview, code, and guide for your saved components";
    }

    if (!componentProps.length) {
      return "Props: no props detected";
    }

    return `Props: ${componentProps.join(", ")}`;
  }, [activeComponent, componentProps]);

  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="border-outline-variant flex min-h-[480px] items-center justify-center rounded-xl border bg-white shadow-sm">
          <div className="text-center">
            <span className="material-symbols-outlined text-warm-accent mb-4 animate-spin text-4xl leading-none">
              progress_activity
            </span>
            <p className="text-charcoal-text font-bold">Loading your components</p>
            <p className="text-text-secondary mt-2 text-sm">Fetching saved work from your library.</p>
          </div>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="border-red-soft bg-red-soft/40 flex min-h-[480px] items-center justify-center rounded-xl border p-8 text-center">
          <div className="max-w-md">
            <span className="mb-4 text-4xl leading-none text-red-600 material-symbols-outlined">
              error
            </span>
            <h2 className="text-charcoal-text mb-3 text-2xl font-extrabold">Could not load components</h2>
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
      return <CodeBlock code={componentCode} label="JSX" />;
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
      <div className="flex min-h-screen">
        <aside className="border-outline-variant/50 bg-surface-container-low hidden w-72 shrink-0 border-r lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <Link to="/home" className="border-outline-variant/40 flex items-center gap-3 border-b px-6 py-7">
              <img src="/favicon.svg" alt="Cosmic UI logo" className="h-10 w-10" />
              <div>
                <p className="navbar-brand-text">Cosmic UI</p>
                <p className="type-label-sm text-warm-accent mt-1 tracking-widest uppercase">
                  Components
                </p>
              </div>
            </Link>

            <div className="px-4 pb-6">
              <label className="border-outline-variant flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-text-secondary shadow-sm">
                <span className="material-symbols-outlined text-[20px] leading-none">search</span>
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search..."
                  className="text-charcoal-text min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-text-tertiary"
                />
              </label>
            </div>

            <div className="min-h-0 flex-1 px-3">
              <p className="type-label-sm text-text-secondary mb-4 px-3 tracking-widest uppercase">
                My Components - {filteredComponents.length}
              </p>
              <div className="space-y-1 overflow-auto pr-1">
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
                      className={`flex w-full items-center justify-between rounded-xl px-5 py-4 text-left text-sm font-bold transition-colors ${
                        isActive
                          ? "bg-highlight-pink/50 text-charcoal-text shadow-sm"
                          : "text-text-secondary hover:bg-white hover:text-charcoal-text"
                      }`}
                    >
                      <span className="min-w-0 truncate">{component.name}</span>
                      {isActive && (
                        <span className="material-symbols-outlined text-warm-accent text-[18px] leading-none">
                          chevron_right
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-outline-variant/40 border-t p-4">
              <Link
                to="/generate"
                className="bg-warm-accent text-charcoal-text flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold shadow-sm transition-transform hover:scale-105"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">
                  auto_awesome
                </span>
                Generate Component
              </Link>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="border-outline-variant/40 bg-soft-cream-bg/90 sticky top-0 z-40 flex items-center justify-between border-b px-4 py-4 backdrop-blur-md md:px-8">
            <Link to="/home" className="flex items-center gap-3 lg:hidden">
              <img src="/favicon.svg" alt="Cosmic UI logo" className="h-8 w-8" />
              <span className="navbar-brand-text">Cosmic UI</span>
            </Link>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
              <Link
                to="/generate"
                className="hover:bg-surface-container-low hover:text-charcoal-text hidden items-center gap-2 rounded-full px-4 py-2 transition-colors md:flex"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">
                  auto_awesome
                </span>
                Generate
              </Link>
              <span className="bg-white border-outline-variant text-charcoal-text flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px] leading-none">inventory_2</span>
                My Components
              </span>
            </div>
          </header>

          <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 lg:px-10">
            <div className="border-outline-variant/50 mb-7 flex flex-col gap-5 border-b pb-7 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <p className="type-label-sm text-warm-accent mb-3 tracking-widest uppercase lg:hidden">
                  My Components - {filteredComponents.length}
                </p>
                <h1 className="text-charcoal-text truncate text-3xl font-extrabold">
                  {activeComponent?.name || "My Components"}
                </h1>
                <p className="text-text-secondary mt-2 text-sm font-semibold">
                  {headerDescription}
                </p>
                {activeComponent && (
                  <p className="text-text-tertiary mt-2 text-xs font-semibold">
                    {formatDate(activeComponent.createdAt)}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadComponents({ silent: true })}
                  className="border-outline-variant flex h-10 w-10 items-center justify-center rounded-full border bg-white text-text-secondary shadow-sm transition-colors hover:text-charcoal-text"
                  aria-label="Refresh components"
                  title="Refresh components"
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

            <div className="mb-6 lg:hidden">
              <label className="border-outline-variant flex items-center gap-3 rounded-lg border bg-white px-4 py-3 text-text-secondary shadow-sm">
                <span className="material-symbols-outlined text-[20px] leading-none">search</span>
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search components..."
                  className="text-charcoal-text min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-text-tertiary"
                />
              </label>
              {filteredComponents.length > 0 && (
                <div className="mt-3 flex gap-2 overflow-auto pb-2">
                  {filteredComponents.map((component) => (
                    <button
                      key={component._id}
                      type="button"
                      onClick={() => {
                        setActiveComponentId(component._id);
                        setActiveView("preview");
                      }}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold ${
                        component._id === displayedActiveComponentId
                          ? "bg-highlight-pink/70 text-charcoal-text"
                          : "bg-white text-text-secondary"
                      }`}
                    >
                      {component.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {renderMainContent()}
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyComponentsPage;
