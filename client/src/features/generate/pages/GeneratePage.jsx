import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { initializeAuth } from "../../auth/auth.slice";
import GeneratedPreview from "../components/GeneratedPreview";
import {
  generateComponentService,
  publishComponentService,
  saveComponentService,
} from "../services/generateService";

const samplePrompts = [
  "Animated e-commerce card with price, rating, and action buttons",
  "Glassmorphism pricing card with monthly and annual toggle",
  "Responsive dashboard stats panel with compact charts",
];

const getGeneratedPayload = (responseData) => responseData?.component || responseData?.parsed || null;

const getApiErrorMessage = (error, fallback) =>
  error.response?.data?.error || error.response?.data?.message || error.message || fallback;

const isNpmOtpRequired = (error) =>
  error.response?.data?.code === "NPM_OTP_REQUIRED" ||
  getApiErrorMessage(error, "").includes("EOTP");

const normalizeProps = (props) => {
  if (Array.isArray(props)) {
    return props;
  }

  if (props && typeof props === "object") {
    return Object.keys(props);
  }

  return [];
};

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
    return;
  }

  await navigator.clipboard.writeText(text);
};

const CodePanel = ({ code, label = "JSX", maxHeight = "max-h-[520px]" }) => (
  <div className="border-outline-variant overflow-hidden rounded-xl border bg-[#1E1E1E] shadow-sm">
    <div className="flex items-center justify-between border-b border-[#3D3D3D] bg-[#2D2D2D] px-4 py-3">
      <span className="type-label-sm text-gray-400 tracking-widest uppercase">{label}</span>
      <button
        type="button"
        onClick={() => copyToClipboard(code)}
        className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
      >
        <span className="material-symbols-outlined text-[16px] leading-none">content_copy</span>
        Copy
      </button>
    </div>
    <pre className={`${maxHeight} overflow-auto p-5 text-sm leading-7 text-green-200`}>
      <code>{code}</code>
    </pre>
  </div>
);

const GuideStepCard = ({ number, title, description, isActive = false }) => (
  <div className="text-center">
    <div
      className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border text-lg font-bold ${
        isActive
          ? "border-warm-accent bg-warm-accent text-charcoal-text"
          : "border-white/20 bg-white/5 text-warm-accent"
      }`}
    >
      {number}
    </div>
    <h4 className="mb-2 font-sora text-base font-semibold text-white">{title}</h4>
    <p className="type-body-sm text-white/50">{description}</p>
  </div>
);

const UsageGuide = ({ componentName, componentCode, componentProps }) => {
  const filePath = `src/components/${componentName}.jsx`;
  const usageCode = createUsageCode(componentName, componentProps);
  const installCommand = "npm i cosmic-ui-library";
  const guideSteps = [
    {
      number: "01",
      title: "Install Library",
      description: "Install Cosmic UI once so your project has the package ready.",
    },
    {
      number: "02",
      title: "Create File",
      description: `Create ${filePath} and paste the generated JSX code.`,
    },
    {
      number: "03",
      title: "Import Component",
      description: "Import the component in App.jsx using the generated local path.",
    },
    {
      number: "04",
      title: "Copy & Use",
      description: "Pass props, customize defaults, and use the component in your app.",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="type-label-sm text-warm-accent mb-3 tracking-widest uppercase">
          Component Documentation
        </p>
        <h3 className="font-sora text-2xl font-extrabold text-white">How to use {componentName}</h3>
        <p className="type-body-sm mt-2 max-w-2xl text-white/55">
          Follow the same flow from the main documentation: install the package, create the file,
          import it in App.jsx, then customize the generated props.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-[#2a2622] p-8 shadow-xl">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {guideSteps.map((step, index) => (
            <GuideStepCard key={step.number} {...step} isActive={index === 1} />
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-5">
          <div className="border-outline-variant rounded-xl border bg-surface-container-lowest p-5">
            <p className="type-label-sm text-text-secondary mb-3 tracking-widest uppercase">
              Install command
            </p>
            <button
              type="button"
              onClick={() => copyToClipboard(installCommand)}
              className="bg-gentle-gray-surface border-outline-variant type-body-sm text-charcoal-text hover:border-warm-accent group flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left font-mono shadow-sm transition-all"
              title="Click to copy install command"
            >
              <span className="text-text-secondary group-hover:text-warm-accent transition-colors">
                $
              </span>
              <span className="min-w-0 flex-1 break-all">{installCommand}</span>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-charcoal-text text-[18px] leading-none transition-colors">
                content_copy
              </span>
            </button>
          </div>

          <div className="border-outline-variant rounded-xl border bg-surface-container-lowest p-5">
            <p className="type-label-sm text-text-secondary mb-3 tracking-widest uppercase">
              Create file
            </p>
            <p className="font-mono text-lg font-bold text-charcoal-text">{filePath}</p>
            <p className="type-body-sm text-text-secondary mt-3">
              Copy the generated component code and paste it into this file.
            </p>
          </div>
        </div>

        <CodePanel code={usageCode} label="App.jsx" maxHeight="max-h-[360px]" />
      </div>

      <CodePanel code={componentCode} label={`${componentName}.jsx`} />
    </div>
  );
};

const GeneratePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [prompt, setPrompt] = useState("");
  const [generatedComponent, setGeneratedComponent] = useState(null);
  const [activeView, setActiveView] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [savedComponentId, setSavedComponentId] = useState(null);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [remainingCredits, setRemainingCredits] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [needsNpmOtp, setNeedsNpmOtp] = useState(false);
  const [npmOtp, setNpmOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const componentName = generatedComponent?.name || "GeneratedComponent";
  const componentCode = generatedComponent?.code || "";
  const componentProps = useMemo(
    () => normalizeProps(generatedComponent?.props),
    [generatedComponent]
  );
  const promptHasValue = prompt.trim().length > 0;
  const canSubmit = promptHasValue && !isGenerating;
  const isAdmin = user?.role === "admin";
  const displayedCredits = remainingCredits ?? user?.aiCredit ?? 0;

  const syncStoredCredits = (nextCredits) => {
    if (nextCredits === null || nextCredits === undefined) {
      return;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        localStorage.setItem("user", JSON.stringify({ ...storedUser, aiCredit: nextCredits }));
        dispatch(initializeAuth());
      }
    } catch {
      /* Ignore storage sync failures. */
    }
  };

  const handleAuthFailure = (error) => {
    if (error.response?.status !== 401) {
      return false;
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(initializeAuth());
    navigate("/", { replace: true });
    return true;
  };

  const handleGenerate = async () => {
    if (!promptHasValue || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");
    setStatusMessage("");
    setSavedComponentId(null);
    setIsPublished(false);
    setNeedsNpmOtp(false);
    setNpmOtp("");

    try {
      const response = await generateComponentService(prompt.trim());
      const nextComponent = getGeneratedPayload(response.data);

      if (!nextComponent?.name || !nextComponent?.code) {
        throw new Error("AI response did not include component code.");
      }

      setGeneratedComponent(nextComponent);
      setGeneratedPrompt(prompt.trim());
      if (response.data?.remainingCredits !== undefined) {
        setRemainingCredits(response.data.remainingCredits);
        syncStoredCredits(response.data.remainingCredits);
      }
      setActiveView("preview");
      setStatusMessage("Component generated. Use the Guide button to copy and install it in App.jsx.");
    } catch (error) {
      if (handleAuthFailure(error)) {
        return;
      }

      setErrorMessage(getApiErrorMessage(error, "Failed to generate component."));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedComponent || isSaving) {
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      const response = await saveComponentService({
        name: componentName,
        code: componentCode,
        props: componentProps,
      });
      setSavedComponentId(response.data?.component?._id || null);
      setStatusMessage("Component saved to your library.");
    } catch (error) {
      if (handleAuthFailure(error)) {
        return;
      }

      setErrorMessage(getApiErrorMessage(error, "Failed to save component."));
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!savedComponentId || isPublishing) {
      return;
    }

    setIsPublishing(true);
    setErrorMessage("");

    try {
      await publishComponentService({
        componentId: savedComponentId,
        otp: npmOtp.trim() || undefined,
      });
      setIsPublished(true);
      setNeedsNpmOtp(false);
      setNpmOtp("");
      setStatusMessage("Component published to npm.");
    } catch (error) {
      if (handleAuthFailure(error)) {
        return;
      }

      if (isNpmOtpRequired(error)) {
        setNeedsNpmOtp(true);
        setStatusMessage("");
        setErrorMessage("Enter your npm one-time password to finish publishing.");
        return;
      }

      setErrorMessage(getApiErrorMessage(error, "Failed to publish component."));
    } finally {
      setIsPublishing(false);
    }
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleGenerate();
    }
  };

  const handleOtpKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handlePublish();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-soft-cream-bg text-charcoal-text">
      <div className="pointer-events-none fixed inset-0 opacity-[0.38]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(42,38,34,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(42,38,34,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute right-[-10%] bottom-[-20%] h-96 w-96 rounded-full bg-blue-soft/70 blur-3xl" />
        <div className="absolute top-24 left-[-8%] h-80 w-80 rounded-full bg-highlight-pink/80 blur-3xl" />
      </div>
      <header className="border-outline-variant/40 bg-soft-cream-bg/90 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-16">
          <Link to="/home" className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Cosmic UI logo" className="h-8 w-8" />
            <span className="navbar-brand-text">Cosmic UI</span>
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <button
                type="button"
                aria-label="Admin access"
                title="Admin access"
                className="border-outline-variant bg-green-soft/60 text-charcoal-text flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">
                  admin_panel_settings
                </span>
                <span className="hidden sm:inline">Admin</span>
              </button>
            ) : (
              <button
                type="button"
                aria-label={`${displayedCredits} AI credits remaining`}
                title="AI credits remaining"
                className="border-outline-variant bg-surface-container-low hover:bg-highlight-pink/40 text-charcoal-text flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="material-symbols-outlined text-warm-accent text-[18px] leading-none">
                  bolt
                </span>
                <span>{displayedCredits}</span>
                <span className="text-text-secondary hidden text-xs font-semibold sm:inline">
                  Credits
                </span>
              </button>
            )}
            <Link
              to="/home"
              className="hover:bg-surface-container-low text-text-secondary hover:text-charcoal-text flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-base leading-none">arrow_back</span>
              <span className="hidden sm:inline">Back to Main</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-16 md:py-14">
        <section className="mx-auto max-w-3xl text-center">
          <div className="bg-purple-soft/60 border-outline-variant text-charcoal-text mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 type-label-sm uppercase tracking-widest">
            <span className="material-symbols-outlined text-base leading-none">memory</span>
            AI Component Studio
          </div>
          <h1 className="mb-5 text-charcoal-text" style={{ fontSize: "clamp(2.5rem, 7vw, 4.75rem)" }}>
            Build with <span className="text-warm-accent">AI</span>
          </h1>
          <p className="type-body-lg text-text-secondary">
            Describe your React component in plain English. Preview, save, and publish it in one
            focused workspace.
          </p>
        </section>

        <section className="border-outline-variant bg-surface-container-lowest shadow-lg rounded-xl border p-4 md:p-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-warm-accent mt-1 leading-none">
              auto_awesome
            </span>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              onKeyDown={handleKeyDown}
              className="type-body-md text-charcoal-text placeholder:text-text-tertiary min-h-32 flex-1 resize-none bg-transparent outline-none"
              placeholder="A glassmorphism pricing card with a toggle for monthly/annual billing..."
            />
          </div>

          <div className="mt-4 flex flex-col gap-4 border-t border-outline-variant/50 pt-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setPrompt(sample)}
                  className="bg-surface-container-low hover:bg-highlight-pink/50 text-text-secondary hover:text-charcoal-text rounded-full px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="type-body-sm text-text-tertiary hidden sm:block">
                {isAdmin ? "Admin generation enabled" : "50 credits per generation"}
              </span>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canSubmit}
                className="bg-warm-accent text-charcoal-text disabled:bg-surface-container-high disabled:text-text-tertiary flex items-center justify-center gap-2 rounded-full px-6 py-3 type-label-md font-semibold shadow-md transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <span className="material-symbols-outlined text-base leading-none">
                  {isGenerating ? "progress_activity" : "bolt"}
                </span>
                {isGenerating ? "Generating" : "Generate"}
              </button>
            </div>
          </div>
        </section>

        {(statusMessage || errorMessage) && (
          <div
            className={`rounded-lg border px-4 py-3 type-body-sm ${
              errorMessage
                ? "border-red-soft bg-red-soft/40 text-red-600"
                : "border-green-soft bg-green-soft/50 text-on-surface-variant"
            }`}
          >
            {errorMessage || statusMessage}
          </div>
        )}

        {(isGenerating || generatedComponent) && (
          <section className="border-outline-variant bg-surface-container-lowest overflow-hidden rounded-xl border shadow-lg">
            <div className="border-outline-variant/50 flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between md:p-6">
              <div className="flex items-center gap-3">
                <div className="bg-purple-soft flex h-11 w-11 items-center justify-center rounded-lg text-charcoal-text">
                  <span className="material-symbols-outlined leading-none">layers</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="type-headline-sm text-charcoal-text">{componentName}</h2>
                    {generatedComponent && (
                      <button
                        type="button"
                        onClick={() => setActiveView("guide")}
                        className="bg-blue-soft/70 text-charcoal-text hover:bg-blue-soft flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px] leading-none">
                          explore
                        </span>
                        Guide ready
                      </button>
                    )}
                  </div>
                  <p className="type-body-sm text-text-secondary">
                    {componentProps.length > 0
                      ? `Props: ${componentProps.join(", ")}`
                      : isGenerating
                        ? "Generating component structure..."
                        : "No props detected."}
                  </p>
                </div>
              </div>

              {generatedComponent && (
                <div className="bg-surface-container-low flex w-fit rounded-full p-1">
                  {[
                    ["preview", "visibility", "Preview"],
                    ["code", "code", "Code"],
                    ["guide", "explore", "Guide"],
                  ].map(([view, icon, label]) => (
                    <button
                      key={view}
                      type="button"
                      onClick={() => setActiveView(view)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                        activeView === view
                          ? "bg-white text-charcoal-text shadow-sm"
                          : "text-text-secondary hover:text-charcoal-text"
                      }`}
                    >
                      <span className="material-symbols-outlined text-base leading-none">
                        {icon}
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-charcoal min-h-[420px] p-5 md:p-8">
              {isGenerating ? (
                <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-white/10 bg-[#070b18] p-6">
                  <div className="w-full max-w-sm">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="material-symbols-outlined text-warm-accent animate-spin text-3xl leading-none">
                        progress_activity
                      </span>
                      <div>
                        <p className="font-sora text-lg font-bold text-white">
                          Generating component
                        </p>
                        <p className="type-body-sm text-white/50">
                          Building JSX, props, and preview structure...
                        </p>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="bg-warm-accent h-full w-2/3 animate-pulse rounded-full" />
                    </div>
                  </div>
                </div>
              ) : activeView === "preview" ? (
                <GeneratedPreview
                  componentCode={componentCode}
                  componentName={componentName}
                  componentProps={componentProps}
                />
              ) : activeView === "code" ? (
                <CodePanel code={componentCode} />
              ) : (
                <UsageGuide
                  componentCode={componentCode}
                  componentName={componentName}
                  componentProps={componentProps}
                />
              )}
            </div>

            {generatedComponent && (
              <div className="border-outline-variant/50 flex flex-col gap-3 border-t p-4 md:flex-row md:items-center md:justify-between md:p-6">
                <div className="flex flex-col gap-3">
                  {needsNpmOtp && (
                    <div className="border-yellow-soft bg-yellow-soft/50 flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-warm-accent text-[18px] leading-none">
                          key
                        </span>
                        <span className="type-body-sm text-charcoal-text font-semibold">
                          NPM OTP required earlier
                        </span>
                      </div>
                      <input
                        value={npmOtp}
                        onChange={(event) => setNpmOtp(event.target.value.replace(/\D/g, ""))}
                        onKeyDown={handleOtpKeyDown}
                        inputMode="numeric"
                        maxLength={8}
                        placeholder="Optional now"
                        className="border-outline-variant bg-white text-charcoal-text w-36 rounded-lg border px-3 py-2 text-sm font-semibold outline-none focus:border-warm-accent"
                      />
                      <span className="type-body-sm text-text-secondary">
                        If 2FA is disabled, leave this blank and retry.
                      </span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveView("guide")}
                    className="border-outline-variant bg-blue-soft/70 hover:bg-blue-soft flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-bold text-charcoal-text transition-colors"
                  >
                    <span className="material-symbols-outlined text-base leading-none">
                      integration_instructions
                    </span>
                    Open Guide
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="border-outline-variant bg-surface-container-low hover:bg-green-soft/60 disabled:text-text-tertiary flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold text-on-surface-variant transition-colors disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-base leading-none">
                      check_circle
                    </span>
                    {isSaving ? "Saving" : savedComponentId ? "Saved" : "Save Component"}
                  </button>
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={
                      !savedComponentId ||
                      isPublishing ||
                      isPublished
                    }
                    className="border-outline-variant bg-surface-container-low hover:bg-blue-soft/60 disabled:text-text-tertiary flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold text-on-surface-variant transition-colors disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined text-base leading-none">
                      cloud_upload
                    </span>
                    {isPublishing
                      ? "Publishing"
                      : isPublished
                        ? "Published"
                        : needsNpmOtp
                          ? "Publish with OTP"
                          : "Publish to npm"}
                  </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setGeneratedComponent(null);
                    setGeneratedPrompt("");
                    setSavedComponentId(null);
                    setIsPublished(false);
                    setNeedsNpmOtp(false);
                    setNpmOtp("");
                    setStatusMessage("");
                    setErrorMessage("");
                  }}
                  className="bg-charcoal-text flex items-center justify-center gap-2 rounded-full px-6 py-3 type-label-md font-semibold text-white transition-all hover:scale-105"
                >
                  <span className="material-symbols-outlined text-base leading-none">refresh</span>
                  Generate New
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default GeneratePage;
