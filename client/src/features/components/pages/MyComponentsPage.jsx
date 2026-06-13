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
    <div className={`overflow-hidden rounded-xl border border-cyan-300/10 bg-[#04100f] shadow-[0_20px_80px_rgba(0,0,0,0.22)] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.025] px-4 py-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/35">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold text-white/55 transition-colors hover:bg-white/10 hover:text-cyan-200"
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
    className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-colors ${
      active
        ? "bg-cyan-400/20 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]"
        : "text-white/45 hover:bg-white/5 hover:text-white"
    }`}
  >
    <span className="material-symbols-outlined text-[18px] leading-none">{icon}</span>
    {label}
  </button>
);

const EmptyState = () => (
  <div className="flex min-h-[480px] items-center justify-center rounded-2xl border border-cyan-300/10 bg-[#030915] p-8 text-center">
    <div className="max-w-md">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-200">
        <span className="material-symbols-outlined text-[30px] leading-none">widgets</span>
      </div>
      <h2 className="mb-3 text-2xl font-extrabold text-white">No components saved yet</h2>
      <p className="mb-7 text-sm leading-6 text-white/50">
        Generate a component, save it, and it will appear here with preview, source code, and
        usage guide.
      </p>
      <Link
        to="/generate"
        className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-extrabold text-[#031011] transition-transform hover:scale-105"
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
        <p className="mb-5 text-[12px] font-extrabold uppercase tracking-[0.42em] text-cyan-300/70">
          Usage Guide
        </p>
        <div className="space-y-9">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[21px] leading-none text-white/45">
                content_copy
              </span>
              <span className="text-lg font-extrabold text-cyan-300">01</span>
              <h3 className="text-lg font-bold text-white/75">Copy the component code</h3>
            </div>
            <CodeBlock code={componentCode} label="JSX" />
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[21px] leading-none text-white/45">
                code
              </span>
              <span className="text-lg font-extrabold text-cyan-300">02</span>
              <h3 className="text-lg font-bold text-white/75">Create a new file</h3>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(filePath)}
              className="w-full rounded-xl border border-cyan-300/10 bg-[#04100f] px-5 py-5 text-left transition-colors hover:border-cyan-300/30"
              title="Copy file path"
            >
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-widest text-white/35">
                Filename
              </span>
              <span className="font-mono text-base font-bold text-emerald-200">{filePath}</span>
            </button>
            <p className="text-sm text-white/40">Paste the copied code into this file.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[21px] leading-none text-white/45">
                auto_awesome
              </span>
              <span className="text-lg font-extrabold text-cyan-300">03</span>
              <h3 className="text-lg font-bold text-white/75">Import and use in App.jsx</h3>
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
        <div className="flex min-h-[480px] items-center justify-center rounded-2xl border border-cyan-300/10 bg-[#030915]">
          <div className="text-center">
            <span className="material-symbols-outlined mb-4 animate-spin text-4xl leading-none text-cyan-200">
              progress_activity
            </span>
            <p className="font-bold text-white">Loading your components</p>
            <p className="mt-2 text-sm text-white/45">Fetching saved work from your library.</p>
          </div>
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="flex min-h-[480px] items-center justify-center rounded-2xl border border-red-300/20 bg-red-500/10 p-8 text-center">
          <div className="max-w-md">
            <span className="material-symbols-outlined mb-4 text-4xl leading-none text-red-200">
              error
            </span>
            <h2 className="mb-3 text-2xl font-extrabold text-white">Could not load components</h2>
            <p className="mb-6 text-sm leading-6 text-white/55">{errorMessage}</p>
            <button
              type="button"
              onClick={() => loadComponents()}
              className="rounded-full bg-white px-5 py-3 text-sm font-extrabold text-[#031011]"
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
      <div className="rounded-2xl border border-cyan-300/10 bg-[#030915] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)]">
        <GeneratedPreview
          componentCode={componentCode}
          componentName={componentName}
          componentProps={componentProps}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020b0d] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-[306px] shrink-0 border-r border-cyan-300/10 bg-[#021112] lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="flex items-center gap-3 px-8 py-7">
              <img src="/favicon.svg" alt="Cosmic UI logo" className="h-11 w-11 rounded-2xl" />
              <span className="text-2xl font-extrabold">Cosmic UI</span>
            </div>

            <div className="px-4 pb-6">
              <label className="flex items-center gap-3 rounded-xl border border-cyan-300/10 bg-white/[0.035] px-4 py-3 text-white/45 shadow-[0_16px_54px_rgba(0,0,0,0.25)]">
                <span className="material-symbols-outlined text-[20px] leading-none">search</span>
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/35"
                />
              </label>
            </div>

            <div className="px-1">
              <p className="mb-4 px-4 text-[11px] font-extrabold uppercase tracking-[0.42em] text-white/35">
                My Components - {filteredComponents.length}
              </p>
              <div className="space-y-1 overflow-auto pr-2">
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
                          ? "border border-cyan-300/15 bg-cyan-400/10 text-cyan-200"
                          : "text-white/55 hover:bg-white/[0.045] hover:text-white"
                      }`}
                    >
                      <span className="min-w-0 truncate">{component.name}</span>
                      {isActive && (
                        <span className="material-symbols-outlined text-[18px] leading-none">
                          chevron_right
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-cyan-300/5 px-4 py-5 md:px-8">
            <Link to="/home" className="flex items-center gap-3 lg:hidden">
              <img src="/favicon.svg" alt="Cosmic UI logo" className="h-10 w-10 rounded-2xl" />
              <span className="text-xl font-extrabold">Cosmic UI</span>
            </Link>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-2 text-sm font-semibold text-white/45">
              <Link
                to="/generate"
                className="hidden items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-white/5 hover:text-white md:flex"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">
                  auto_awesome
                </span>
                Generate
              </Link>
              <span className="flex items-center gap-2 rounded-lg px-3 py-2">
                <span className="material-symbols-outlined text-[18px] leading-none">inventory_2</span>
                My Components
              </span>
            </div>
          </header>

          <section className="px-4 py-8 md:px-8 lg:px-10">
            <div className="mb-7 flex flex-col gap-5 border-b border-cyan-300/5 pb-7 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/35 lg:hidden">
                  My Components - {filteredComponents.length}
                </p>
                <h1 className="truncate text-3xl font-extrabold text-white">
                  {activeComponent?.name || "My Components"}
                </h1>
                <p className="mt-2 text-sm font-semibold text-white/45">
                  {headerDescription}
                </p>
                {activeComponent && (
                  <p className="mt-2 text-xs font-semibold text-white/30">
                    {formatDate(activeComponent.createdAt)}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadComponents({ silent: true })}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Refresh components"
                  title="Refresh components"
                >
                  <span className={`material-symbols-outlined text-[20px] leading-none ${refreshing ? "animate-spin" : ""}`}>
                    refresh
                  </span>
                </button>
                {activeComponent && (
                  <div className="flex rounded-xl bg-[#04100f] p-1">
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
              <label className="flex items-center gap-3 rounded-xl border border-cyan-300/10 bg-white/[0.035] px-4 py-3 text-white/45">
                <span className="material-symbols-outlined text-[20px] leading-none">search</span>
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search components..."
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/35"
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
                          ? "bg-cyan-400/20 text-cyan-200"
                          : "bg-white/5 text-white/55"
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
