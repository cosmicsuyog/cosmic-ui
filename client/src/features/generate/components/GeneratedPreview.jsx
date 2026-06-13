import { useEffect, useMemo, useState } from "react";

const fallbackComponentName = "GeneratedComponent";

const isValidIdentifier = (value) => /^[A-Za-z_$][\w$]*$/.test(value);

const escapeScriptEnd = (value) => value.replace(/<\/script/gi, "<\\/script");

const createPreviewId = () => `generated-preview-${Math.random().toString(36).slice(2)}`;

const detectComponentName = (code, fallbackName) => {
  const patterns = [
    /export\s+const\s+([A-Z][\w$]*)/,
    /export\s+function\s+([A-Z][\w$]*)/,
    /export\s+default\s+function\s+([A-Z][\w$]*)/,
    /const\s+([A-Z][\w$]*)\s*=/,
    /function\s+([A-Z][\w$]*)/,
  ];

  for (const pattern of patterns) {
    const match = code.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return isValidIdentifier(fallbackName) ? fallbackName : fallbackComponentName;
};

const preparePreviewCode = (code) => {
  let prepared = code
    .replace(/^\s*import\s+.*?;?\s*$/gm, "")
    .replace(/export\s+default\s+function\s*\(/g, `function ${fallbackComponentName}(`)
    .replace(/export\s+default\s+function\s+([A-Z][\w$]*)/g, "function $1")
    .replace(/export\s+function\s+([A-Z][\w$]*)/g, "function $1")
    .replace(/export\s+const\s+([A-Z][\w$]*)/g, "const $1")
    .replace(/export\s+default\s+[A-Z][\w$]*\s*;?/g, "");

  if (!prepared.trim()) {
    prepared = `const ${fallbackComponentName} = () => <div>Generate a component to preview it.</div>;`;
  }

  return prepared;
};

const makeSampleProps = (code, componentName, componentProps) => {
  const sampleProps = {};
  const lowerText = `${componentName} ${componentProps.join(" ")} ${code}`.toLowerCase();
  const isButtonLike = lowerText.includes("button") || lowerText.includes("cta");
  const propNames = new Set(componentProps);
  const callbackNames = new Set();

  Array.from(code.matchAll(/\b(on[A-Z][A-Za-z0-9_$]*)\b/g), (match) =>
    callbackNames.add(match[1])
  );

  Array.from(code.matchAll(/(?:^|[\s,{])([A-Za-z_$][\w$]*)\s*=/g), (match) =>
    propNames.add(match[1])
  );

  if (
    propNames.has("links") ||
    propNames.has("navItems") ||
    propNames.has("menuItems") ||
    lowerText.includes("sidebar") ||
    lowerText.includes("navigation")
  ) {
    const links = [
      {
        id: "dashboard",
        label: "Dashboard",
        name: "Dashboard",
        title: "Dashboard",
        href: "#dashboard",
        path: "#dashboard",
        icon: "dashboard",
        active: true,
      },
      {
        id: "components",
        label: "Components",
        name: "Components",
        title: "Components",
        href: "#components",
        path: "#components",
        icon: "widgets",
        active: false,
      },
      {
        id: "settings",
        label: "Settings",
        name: "Settings",
        title: "Settings",
        href: "#settings",
        path: "#settings",
        icon: "settings",
        active: false,
      },
    ];

    sampleProps.links = links;
    sampleProps.navItems = links;
    sampleProps.menuItems = links;
  }

  if (propNames.has("items") || lowerText.includes("accordion")) {
    sampleProps.items = [
      { title: "Fast generation", content: "Create polished JSX components from plain text." },
      { title: "Live preview", content: "Review the real generated component before saving." },
      { title: "Publish ready", content: "Move useful components into your npm library." },
    ];
  }

  if (propNames.has("cards")) {
    sampleProps.cards = [
      {
        title: "Cosmic UI",
        subtitle: "Component studio",
        content: "Generate, preview, save, and publish reusable React components.",
        buttonText: "Explore",
      },
      {
        title: "Design system",
        subtitle: "Warm and focused",
        content: "Preview components against realistic sample content.",
        buttonText: "Open",
      },
    ];
  }

  const scalarSamples = {
    logo: "Cosmic UI",
    brand: "Cosmic UI",
    title: componentName || "Cosmic UI Component",
    subtitle: "Generated with Cosmic UI",
    content: "A real preview rendered from the generated JSX.",
    description: "Preview the generated component before saving or publishing.",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    buttonText: "Get Started",
    text: "Cosmic UI",
    label: "Preview",
    value: "150",
    count: 3,
    price: 149,
    rating: 4.8,
    accent: "#e8a06e",
    accentColor: "#e8a06e",
    bg: isButtonLike ? "#e8a06e" : "#0f172a",
    backgroundColor: "#fffbf7",
    color: isButtonLike ? "#2a2622" : "#fffbf7",
    textColor: isButtonLike ? "#2a2622" : "#fffbf7",
    foregroundColor: isButtonLike ? "#2a2622" : "#fffbf7",
    cardBackgroundColor: "#ffffff",
    cardTextColor: "#2a2622",
    isOpen: true,
    open: true,
    active: true,
  };

  Object.entries(scalarSamples).forEach(([name, value]) => {
    if (propNames.has(name)) {
      sampleProps[name] = value;
    }
  });

  return {
    callbackNames: Array.from(callbackNames).filter(isValidIdentifier),
    props: sampleProps,
  };
};

const createPreviewDocument = ({ code, componentName, componentProps, previewId }) => {
  const detectedName = detectComponentName(code, componentName);
  const renderName = isValidIdentifier(detectedName) ? detectedName : fallbackComponentName;
  const preparedCode = escapeScriptEnd(preparePreviewCode(code));
  const sample = makeSampleProps(code, componentName, componentProps);
  const previewProps = escapeScriptEnd(JSON.stringify(sample.props, null, 2));
  const callbackAssignments = sample.callbackNames
    .map((name) => `previewProps.${name} = () => console.info("${name} called from preview");`)
    .join("\n        ");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      html,
      body {
        min-height: 100%;
        margin: 0;
      }
      body {
        box-sizing: border-box;
        min-height: 100vh;
        padding: 28px;
        background: #2a2622;
        color: #fffbf7;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #root {
        min-height: calc(100vh - 56px);
        width: 100%;
      }
      .preview-shell {
        min-height: calc(100vh - 56px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .preview-error {
        max-width: 680px;
        border: 1px solid rgba(240, 212, 212, 0.45);
        border-radius: 12px;
        background: rgba(240, 212, 212, 0.12);
        color: #ffe8e8;
        padding: 16px;
        font-size: 13px;
        line-height: 1.6;
        white-space: pre-wrap;
      }
      .preview-loading {
        color: rgba(255, 251, 247, 0.58);
        font-size: 13px;
        font-weight: 700;
      }
      * {
        box-sizing: border-box;
      }
    </style>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"><div class="preview-shell"><div class="preview-loading">Rendering generated component...</div></div></div>
    <script type="text/babel" data-presets="env,react">
      const { useCallback, useEffect, useMemo, useRef, useState } = React;
      const rootElement = document.getElementById("root");
      const showError = (error) => {
        rootElement.innerHTML = "";
        const shell = document.createElement("div");
        shell.className = "preview-shell";
        const panel = document.createElement("pre");
        panel.className = "preview-error";
        panel.textContent = error && error.message ? error.message : String(error);
        shell.appendChild(panel);
        rootElement.appendChild(shell);
      };
      const reportPreviewSize = () => {
        const htmlElement = document.documentElement;
        const width = Math.max(rootElement.scrollWidth, document.body.scrollWidth, htmlElement.scrollWidth);
        const height = Math.max(rootElement.scrollHeight, document.body.scrollHeight, htmlElement.scrollHeight);
        window.parent.postMessage(
          {
            type: "cosmic-generated-preview-size",
            previewId: "${previewId}",
            width,
            height,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            isOversized: width > window.innerWidth + 16 || height > window.innerHeight + 16,
          },
          "*"
        );
      };

      try {
${preparedCode}
        const PreviewComponent = typeof ${renderName} !== "undefined" ? ${renderName} : null;
        if (!PreviewComponent) {
          throw new Error("Could not find a component named ${renderName}. Open Code to inspect the AI response.");
        }
        const previewProps = ${previewProps};
        ${callbackAssignments}
        ReactDOM.createRoot(rootElement).render(
          <div className="preview-shell">
            <PreviewComponent {...previewProps} />
          </div>
        );
        requestAnimationFrame(() => {
          reportPreviewSize();
          setTimeout(reportPreviewSize, 250);
          setTimeout(reportPreviewSize, 900);
        });
        if ("ResizeObserver" in window) {
          new ResizeObserver(reportPreviewSize).observe(rootElement);
        }
        window.addEventListener("resize", reportPreviewSize);
      } catch (error) {
        showError(error);
        reportPreviewSize();
      }
    </script>
  </body>
</html>`;
};

const GeneratedPreview = ({ componentCode, componentName, componentProps }) => {
  const [previewId] = useState(createPreviewId);
  const [isLargePreviewOpen, setIsLargePreviewOpen] = useState(false);
  const [isOversized, setIsOversized] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(false);
  const [previewSize, setPreviewSize] = useState({ height: 0, width: 0 });
  const previewDocument = useMemo(
    () =>
      createPreviewDocument({
        code: componentCode,
        componentName,
        componentProps,
        previewId,
      }),
    [componentCode, componentName, componentProps, previewId]
  );
  const largePreviewDocument = useMemo(
    () =>
      createPreviewDocument({
        code: componentCode,
        componentName,
        componentProps,
        previewId: `${previewId}-large`,
      }),
    [componentCode, componentName, componentProps, previewId]
  );

  useEffect(() => {
    setHasMeasured(false);
    setIsOversized(false);
  }, [previewDocument]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.type !== "cosmic-generated-preview-size" ||
        event.data.previewId !== previewId
      ) {
        return;
      }

      setPreviewSize({
        height: Math.round(event.data.height || 0),
        width: Math.round(event.data.width || 0),
      });
      setIsOversized(Boolean(event.data.isOversized));
      setHasMeasured(true);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [previewId]);

  const showCompactPreview = !hasMeasured || !isOversized;

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-semibold text-white/50">
          {isOversized
            ? "This generated component is too large for the regular preview."
            : "Preview checks whether the generated component fits this panel."}
        </p>
        <button
          type="button"
          onClick={() => setIsLargePreviewOpen(true)}
          className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-white/15"
        >
          <span className="material-symbols-outlined text-[16px] leading-none">fullscreen</span>
          View large preview
        </button>
      </div>

      {isOversized && (
        <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
            <span className="material-symbols-outlined text-[22px] leading-none text-white">
              fit_screen
            </span>
          </div>
          <p className="text-sm font-bold text-white">Open this component in the large preview.</p>
          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-white/50">
            Rendered size is about {previewSize.width}px by {previewSize.height}px, so the compact
            panel would crop the component.
          </p>
        </div>
      )}

      {showCompactPreview && (
        <iframe
          title="Generated component preview"
          sandbox="allow-scripts"
          srcDoc={previewDocument}
          className="bg-charcoal min-h-[420px] w-full rounded-lg border border-white/10"
        />
      )}

      {isLargePreviewOpen && (
        <div className="bg-charcoal-text/55 fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm md:p-6">
          <div className="border-outline-variant bg-soft-cream-bg flex h-[min(86vh,860px)] w-[min(1180px,calc(100vw-24px))] flex-col overflow-hidden rounded-xl border shadow-2xl">
            <div className="border-outline-variant/60 bg-white/70 flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-charcoal-text text-sm font-bold">Large Generated Preview</p>
                <p className="text-text-secondary text-xs">
                  Wider canvas for generated components that do not fit the normal panel.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLargePreviewOpen(false)}
                aria-label="Close large preview"
                className="text-text-secondary hover:bg-highlight-pink/50 hover:text-charcoal-text flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] leading-none">close</span>
              </button>
            </div>
            <div className="bg-surface-container-low flex-1 overflow-hidden p-3 md:p-4">
              <iframe
                title="Large generated component preview"
                sandbox="allow-scripts"
                srcDoc={largePreviewDocument}
                className="bg-charcoal border-outline-variant h-full w-full rounded-lg border"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneratedPreview;
