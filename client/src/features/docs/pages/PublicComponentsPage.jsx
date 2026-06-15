/* eslint-disable complexity, max-lines */
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/hooks/useAuth";
import {
  getMyComponentsService,
  getPublicComponentsService,
  saveMyComponentService,
} from "../../components/services/componentService";
import GeneratedPreview from "../../generate/components/GeneratedPreview";

const componentSources = [
  {
    value: "public",
    label: "Public Components",
    shortLabel: "Public",
    icon: "public",
    badge: "npm",
    heading: "Public Cosmic UI components",
    eyebrow: "Component Library",
    description:
      "Browse npm library components and admin-created documentation components. Preview, copy, and use them from one place.",
    emptyTitle: "No public components yet",
    emptyCopy: "Public components created by admins will appear here once they are saved.",
    loadingTitle: "Loading public components",
    loadingCopy: "Fetching the shared documentation library.",
    errorCopy: "Failed to load public components.",
  },
  {
    value: "mine",
    label: "My Components",
    shortLabel: "Mine",
    icon: "inventory_2",
    badge: "saved",
    heading: "My saved components",
    eyebrow: "Personal Library",
    description:
      "Review components you generated or saved. Switch back to public components whenever you need shared examples.",
    emptyTitle: "No components saved yet",
    emptyCopy:
      "Generate a component, save it, and it will appear here with preview, code, and guide tabs.",
    loadingTitle: "Loading your components",
    loadingCopy: "Fetching saved work from your library.",
    errorCopy: "Failed to load your saved components.",
  },
];

const defaultManualComponentCode = `export const MyComponent = ({
  title = "My Component",
  content = "Saved privately in Cosmic UI.",
  buttonText = "Open"
}) => {
  return (
    <div
      style={{
        width: "320px",
        padding: "24px",
        borderRadius: "14px",
        background: "#ffffff",
        color: "#2a2622",
        boxShadow: "0 16px 40px rgba(42, 38, 34, 0.14)"
      }}
    >
      <h3 style={{ margin: "0 0 10px", fontSize: "1.4rem" }}>{title}</h3>
      <p style={{ margin: "0 0 18px", lineHeight: 1.6 }}>{content}</p>
      <button
        style={{
          border: "none",
          borderRadius: "8px",
          background: "#e8a06e",
          color: "#2a2622",
          padding: "10px 16px",
          fontWeight: 700
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default MyComponent;`;

const getSourceConfig = (source) =>
  componentSources.find((item) => item.value === source) || componentSources[0];

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
  const propLines = componentProps
    .slice(0, 10)
    .map((propName) => `        ${getPropExample(propName)}`);
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
    return "";
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
    <div
      className={`border-outline-variant overflow-hidden rounded-xl border bg-[#1E1E1E] shadow-xl ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#3D3D3D] bg-[#2D2D2D] px-4 py-3">
        <span className="type-label-sm tracking-widest text-gray-400 uppercase">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="material-symbols-outlined text-[16px] leading-none">content_copy</span>
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
        ? "text-charcoal-text bg-white shadow-sm"
        : "text-text-secondary hover:text-charcoal-text"
    }`}
  >
    <span className="material-symbols-outlined text-base leading-none">{icon}</span>
    {label}
  </button>
);

const EmptyState = ({ onAddComponent, sourceConfig }) => (
  <div className="border-outline-variant flex min-h-[420px] items-center justify-center rounded-xl border bg-white p-8 text-center shadow-sm">
    <div className="max-w-md">
      <div className="bg-highlight-pink/40 text-charcoal-text mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl">
        <span className="material-symbols-outlined text-[30px] leading-none">
          {sourceConfig.icon}
        </span>
      </div>
      <h2 className="text-charcoal-text mb-3 text-2xl font-extrabold">{sourceConfig.emptyTitle}</h2>
      <p className="text-text-secondary text-sm leading-6">{sourceConfig.emptyCopy}</p>
      {sourceConfig.value === "mine" && onAddComponent && (
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onAddComponent}
            className="bg-warm-accent text-charcoal-text inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold shadow-sm transition-transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-[18px] leading-none">add</span>
            Add Component
          </button>
          <Link
            to="/generate"
            className="border-outline-variant text-charcoal-text hover:border-warm-accent inline-flex items-center gap-2 rounded-full border bg-white px-5 py-3 text-sm font-extrabold shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] leading-none">auto_awesome</span>
            Generate
          </Link>
        </div>
      )}
    </div>
  </div>
);

const UsageGuide = ({ componentCode, componentName, componentProps }) => {
  const filePath = `src/components/${componentName}.jsx`;
  const usageCode = createUsageCode(componentName, componentProps);

  return (
    <div className="space-y-8">
      <div>
        <p className="type-label-sm text-warm-accent mb-5 tracking-widest uppercase">Usage Guide</p>
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
              <span className="text-text-secondary mb-4 block text-[11px] font-bold tracking-widest uppercase">
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

const ManualAddComponentForm = ({
  code,
  componentName,
  error,
  manualView,
  message,
  onAddProp,
  onBack,
  onCodeChange,
  onComponentNameChange,
  onManualViewChange,
  onPropInputChange,
  onPropKeyDown,
  onRemoveProp,
  onSave,
  propInput,
  propsList,
  saving,
}) => {
  const previewName = componentName.trim() || "MyComponent";

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="space-y-5">
        {(message || error) && (
          <div
            className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
              error
                ? "border-red-soft bg-red-soft/40 text-red-700"
                : "border-green-soft bg-green-soft/60 text-on-surface-variant"
            }`}
          >
            {error || message}
          </div>
        )}

        <div className="border-outline-variant rounded-xl border bg-white p-5 shadow-sm">
          <label
            htmlFor="manual-component-name"
            className="type-label-sm text-text-secondary tracking-widest uppercase"
          >
            Component Name
          </label>
          <input
            id="manual-component-name"
            value={componentName}
            onChange={(event) => onComponentNameChange(event.target.value)}
            placeholder='e.g. "PricingCard", "HeroSection"'
            className="border-outline-variant bg-surface-container-low focus:border-warm-accent mt-3 w-full rounded-lg border px-4 py-3 text-sm font-semibold outline-none"
          />
        </div>

        <div className="border-outline-variant rounded-xl border bg-white p-5 shadow-sm">
          <label
            htmlFor="manual-component-prop"
            className="type-label-sm text-text-secondary tracking-widest uppercase"
          >
            Props
          </label>
          <div className="mt-4 flex flex-wrap gap-2">
            {propsList.length === 0 && (
              <span className="type-body-sm text-text-tertiary">No props added yet</span>
            )}
            {propsList.map((prop) => (
              <button
                key={prop}
                type="button"
                onClick={() => onRemoveProp(prop)}
                className="bg-purple-soft/70 text-on-surface-variant rounded-full px-3 py-1 text-sm font-bold"
                title={`Remove ${prop}`}
              >
                {prop} x
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <input
              id="manual-component-prop"
              value={propInput}
              onChange={(event) => onPropInputChange(event.target.value)}
              onKeyDown={onPropKeyDown}
              placeholder='e.g. "title", "onClick", "children"'
              className="border-outline-variant bg-surface-container-low focus:border-warm-accent min-w-0 flex-1 rounded-lg border px-4 py-3 text-sm font-semibold outline-none"
            />
            <button
              type="button"
              onClick={onAddProp}
              className="bg-purple-soft text-charcoal-text rounded-lg px-5 py-3 text-sm font-bold"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="bg-warm-accent text-charcoal-text inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-extrabold shadow-md transition-transform hover:scale-105 disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px] leading-none">save</span>
            {saving ? "Saving..." : "Save Component"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="border-outline-variant text-text-secondary hover:text-charcoal-text rounded-lg border bg-white px-5 py-3 text-sm font-extrabold shadow-sm transition-colors"
          >
            Back to Library
          </button>
        </div>
      </div>

      <div className="border-outline-variant overflow-hidden rounded-xl border bg-white shadow-sm">
        <div className="border-outline-variant/50 flex items-center justify-between border-b p-4">
          <label
            htmlFor="manual-component-code"
            className="type-label-sm text-text-secondary tracking-widest uppercase"
          >
            Component Code
          </label>
          <div className="bg-surface-container-low flex rounded-full p-1">
            <button
              type="button"
              aria-label="Edit component code"
              title="Code"
              onClick={() => onManualViewChange("code")}
              className={`flex h-9 w-10 items-center justify-center rounded-full transition-colors ${
                manualView === "code"
                  ? "bg-blue-soft text-charcoal-text shadow-sm"
                  : "text-text-secondary hover:text-charcoal-text"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] leading-none">
                data_object
              </span>
            </button>
            <button
              type="button"
              aria-label="Preview component"
              title="Preview"
              onClick={() => onManualViewChange("preview")}
              className={`flex h-9 w-10 items-center justify-center rounded-full transition-colors ${
                manualView === "preview"
                  ? "bg-blue-soft text-charcoal-text shadow-sm"
                  : "text-text-secondary hover:text-charcoal-text"
              }`}
            >
              <span className="material-symbols-outlined text-[18px] leading-none">visibility</span>
            </button>
          </div>
        </div>
        {manualView === "code" ? (
          <textarea
            id="manual-component-code"
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            className="min-h-[560px] w-full resize-y bg-[#11151d] p-5 font-mono text-sm leading-7 text-white/80 outline-none"
          />
        ) : (
          <div className="bg-charcoal p-5">
            <GeneratedPreview
              componentCode={code}
              componentName={previewName}
              componentProps={propsList}
            />
          </div>
        )}
      </div>
    </section>
  );
};

const PublicComponentsPage = ({ initialSource = "public" }) => {
  const { isAuthenticated } = useAuth();
  const [componentSource, setComponentSource] = useState(initialSource);
  const [components, setComponents] = useState([]);
  const [activeComponentId, setActiveComponentId] = useState("");
  const [activeView, setActiveView] = useState("preview");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [workspaceView, setWorkspaceView] = useState("browse");
  const [manualComponentName, setManualComponentName] = useState("");
  const [manualPropInput, setManualPropInput] = useState("");
  const [manualPropsList, setManualPropsList] = useState([]);
  const [manualCode, setManualCode] = useState(defaultManualComponentCode);
  const [manualView, setManualView] = useState("code");
  const [manualMessage, setManualMessage] = useState("");
  const [manualError, setManualError] = useState("");
  const [manualSaving, setManualSaving] = useState(false);
  const sourceConfig = useMemo(() => getSourceConfig(componentSource), [componentSource]);
  const canAddComponent = componentSource === "mine" && isAuthenticated;
  const isManualAddView = canAddComponent && workspaceView === "add";

  const handleSourceChange = (nextSource) => {
    setComponentSource(nextSource);
    setSearchTerm("");
    setActiveView("preview");
    setActiveComponentId("");
    setWorkspaceView("browse");
    setManualMessage("");
    setManualError("");
  };

  const loadComponents = useCallback(
    async ({ silent = false } = {}) => {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      try {
        const response =
          componentSource === "mine"
            ? await getMyComponentsService()
            : await getPublicComponentsService();
        const nextComponents = response.data?.components || [];
        setComponents(nextComponents);
        setActiveComponentId((currentId) => {
          if (nextComponents.some((component) => component._id === currentId)) {
            return currentId;
          }

          return nextComponents[0]?._id || "";
        });
      } catch (error) {
        if (componentSource === "mine" && error.response?.status === 401) {
          setComponents([]);
          setActiveComponentId("");
          setErrorMessage("Sign in to view your saved components.");
        } else {
          setErrorMessage(getApiErrorMessage(error, sourceConfig.errorCopy));
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [componentSource, sourceConfig.errorCopy]
  );

  const resetManualForm = () => {
    setManualComponentName("");
    setManualPropsList([]);
    setManualPropInput("");
    setManualCode(defaultManualComponentCode);
    setManualView("code");
  };

  const handleOpenManualAdd = () => {
    if (!isAuthenticated) {
      setWorkspaceView("browse");
      setManualError("Sign in to add components to your library.");
      return;
    }

    setComponentSource("mine");
    setWorkspaceView("add");
    setManualMessage("");
    setManualError("");
    setActiveView("preview");
  };

  const handleCloseManualAdd = () => {
    setWorkspaceView("browse");
    setManualError("");
  };

  const addManualProp = () => {
    const nextProp = manualPropInput.trim();

    if (!nextProp || manualPropsList.includes(nextProp)) {
      return;
    }

    setManualPropsList((current) => [...current, nextProp]);
    setManualPropInput("");
  };

  const handleManualPropKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addManualProp();
    }
  };

  const handleSaveManualComponent = async () => {
    const trimmedName = manualComponentName.trim();
    const trimmedCode = manualCode.trim();

    if (!trimmedName || !trimmedCode || manualSaving) {
      setManualError("Component name and code are required.");
      return;
    }

    setManualSaving(true);
    setManualMessage("");
    setManualError("");

    try {
      const response = await saveMyComponentService({
        name: trimmedName,
        props: manualPropsList,
        code: trimmedCode,
      });
      const savedComponentId = response.data?.component?._id || "";

      resetManualForm();
      setWorkspaceView("browse");
      setSearchTerm("");
      setActiveView("preview");
      await loadComponents({ silent: true });
      if (savedComponentId) {
        setActiveComponentId(savedComponentId);
      }
      setManualMessage("Component saved to My Components.");
    } catch (saveError) {
      setManualError(getApiErrorMessage(saveError, "Failed to save component."));
    } finally {
      setManualSaving(false);
    }
  };

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
  const activeSavedDate = formatDate(activeComponent?.createdAt);
  const headerDescription = useMemo(() => {
    if (!activeComponent) {
      return `Preview, code, and guide for ${sourceConfig.label.toLowerCase()}.`;
    }

    if (!componentProps.length) {
      return "Props: no props detected";
    }

    return `Props: ${componentProps.join(", ")}`;
  }, [activeComponent, componentProps, sourceConfig.label]);
  const contentTitle = isManualAddView
    ? "Add Component"
    : activeComponent?.name || sourceConfig.label;
  const contentDescription = isManualAddView
    ? "Paste JSX, add props, preview it, and save it privately to My Components."
    : headerDescription;

  const renderMainContent = () => {
    if (isManualAddView) {
      return (
        <ManualAddComponentForm
          code={manualCode}
          componentName={manualComponentName}
          error={manualError}
          manualView={manualView}
          message={manualMessage}
          onAddProp={addManualProp}
          onBack={handleCloseManualAdd}
          onCodeChange={setManualCode}
          onComponentNameChange={setManualComponentName}
          onManualViewChange={setManualView}
          onPropInputChange={setManualPropInput}
          onPropKeyDown={handleManualPropKeyDown}
          onRemoveProp={(prop) =>
            setManualPropsList((current) => current.filter((item) => item !== prop))
          }
          onSave={handleSaveManualComponent}
          propInput={manualPropInput}
          propsList={manualPropsList}
          saving={manualSaving}
        />
      );
    }

    if (loading) {
      return (
        <div className="border-outline-variant flex min-h-[460px] items-center justify-center rounded-xl border bg-white shadow-sm">
          <div className="text-center">
            <span className="material-symbols-outlined text-warm-accent mb-4 animate-spin text-4xl leading-none">
              progress_activity
            </span>
            <p className="text-charcoal-text font-bold">{sourceConfig.loadingTitle}</p>
            <p className="text-text-secondary mt-2 text-sm">{sourceConfig.loadingCopy}</p>
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
            {componentSource === "mine" && errorMessage.includes("Sign in") && (
              <Link
                to="/"
                className="border-outline-variant text-charcoal-text mt-3 inline-flex rounded-full border bg-white px-5 py-3 text-sm font-extrabold shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      );
    }

    if (!activeComponent) {
      return (
        <EmptyState
          onAddComponent={canAddComponent ? handleOpenManualAdd : undefined}
          sourceConfig={sourceConfig}
        />
      );
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

          <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
            <Link
              to="/home"
              className="type-body-sm text-text-secondary hover:text-charcoal-text font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/docs"
              className="type-body-sm text-charcoal-text border-warm-accent border-b-2 pb-0.5 font-bold"
            >
              Components
            </Link>
            <Link
              to="/pricing"
              className="type-body-sm text-text-secondary hover:text-charcoal-text font-medium transition-colors"
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
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
            {sourceConfig.eyebrow}
          </p>
          <h1
            className="text-charcoal-text mb-6 font-extrabold"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              lineHeight: 1.05,
            }}
          >
            {sourceConfig.heading}
          </h1>
          <p className="type-body-lg text-text-secondary max-w-2xl">{sourceConfig.description}</p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="border-outline-variant bg-surface-container-low h-fit rounded-xl border p-4 shadow-sm lg:sticky lg:top-24">
            <label
              htmlFor="component-source-select"
              className="type-label-sm text-text-secondary mb-2 block tracking-widest uppercase"
            >
              Component Source
            </label>
            <div className="relative mb-4">
              <span className="material-symbols-outlined text-text-secondary pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[20px] leading-none">
                {sourceConfig.icon}
              </span>
              <select
                id="component-source-select"
                value={componentSource}
                onChange={(event) => handleSourceChange(event.target.value)}
                className="border-outline-variant text-charcoal-text hover:border-warm-accent focus:border-warm-accent h-12 w-full appearance-none rounded-lg border bg-white pr-10 pl-12 text-sm font-extrabold transition-colors outline-none"
              >
                {componentSources.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined text-text-secondary pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[20px] leading-none">
                expand_more
              </span>
            </div>

            {canAddComponent && (
              <button
                type="button"
                onClick={handleOpenManualAdd}
                className={`mb-4 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-extrabold shadow-sm transition-colors ${
                  isManualAddView
                    ? "bg-warm-accent text-charcoal-text"
                    : "text-text-secondary hover:text-charcoal-text bg-white"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] leading-none">add</span>
                Add Component
              </button>
            )}

            <label className="border-outline-variant text-text-secondary mb-5 flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-sm">
              <span className="material-symbols-outlined text-[20px] leading-none">search</span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search components..."
                className="text-charcoal-text placeholder:text-text-tertiary min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none"
              />
            </label>

            <p className="type-label-sm text-text-secondary mb-4 tracking-widest uppercase">
              {sourceConfig.shortLabel} - {filteredComponents.length}
            </p>
            <div className="max-h-[60vh] space-y-1 overflow-auto pr-1">
              {filteredComponents.map((component) => {
                const isActive = component._id === displayedActiveComponentId;
                const componentBadge =
                  componentSource === "public" && component.source === "library"
                    ? "npm"
                    : sourceConfig.badge;

                return (
                  <button
                    key={component._id}
                    type="button"
                    onClick={() => {
                      setActiveComponentId(component._id);
                      setActiveView("preview");
                      setWorkspaceView("browse");
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-highlight-pink/50 text-charcoal-text shadow-sm"
                        : "text-text-secondary hover:text-charcoal-text hover:bg-white"
                    }`}
                  >
                    <span className="min-w-0 truncate">{component.name}</span>
                    <span className="bg-blue-soft/70 text-charcoal-text ml-2 shrink-0 rounded-full px-2 py-1 text-[10px] font-extrabold">
                      {componentBadge}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="border-outline-variant/50 mb-6 flex flex-col gap-5 border-b pb-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-charcoal-text truncate text-3xl font-extrabold">
                    {contentTitle}
                  </h2>
                  <span className="bg-highlight-pink/50 text-charcoal-text inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold">
                    <span className="material-symbols-outlined text-[15px] leading-none">
                      {sourceConfig.icon}
                    </span>
                    {sourceConfig.shortLabel}
                  </span>
                </div>
                <p className="text-text-secondary mt-2 text-sm font-semibold">
                  {contentDescription}
                </p>
                {activeSavedDate && componentSource === "mine" && !isManualAddView && (
                  <p className="text-text-tertiary mt-2 text-xs font-semibold">
                    Saved {activeSavedDate}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {canAddComponent && (
                  <button
                    type="button"
                    onClick={isManualAddView ? handleCloseManualAdd : handleOpenManualAdd}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold shadow-sm transition-colors ${
                      isManualAddView
                        ? "border-outline-variant text-text-secondary hover:text-charcoal-text border bg-white"
                        : "bg-warm-accent text-charcoal-text"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] leading-none">
                      {isManualAddView ? "arrow_back" : "add"}
                    </span>
                    {isManualAddView ? "Back to Library" : "Add Component"}
                  </button>
                )}
                {!isManualAddView && (
                  <button
                    type="button"
                    onClick={() => loadComponents({ silent: true })}
                    className="border-outline-variant text-text-secondary hover:text-charcoal-text flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition-colors"
                    aria-label={`Refresh ${sourceConfig.label.toLowerCase()}`}
                    title={`Refresh ${sourceConfig.label.toLowerCase()}`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] leading-none ${refreshing ? "animate-spin" : ""}`}
                    >
                      refresh
                    </span>
                  </button>
                )}
                {activeComponent && !isManualAddView && (
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

            {!isManualAddView && (manualMessage || manualError) && (
              <div
                className={`mb-5 rounded-lg border px-4 py-3 text-sm font-semibold ${
                  manualError
                    ? "border-red-soft bg-red-soft/40 text-red-700"
                    : "border-green-soft bg-green-soft/60 text-on-surface-variant"
                }`}
              >
                {manualError || manualMessage}
              </div>
            )}

            {renderMainContent()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicComponentsPage;
