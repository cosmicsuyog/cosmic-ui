import { useEffect, useMemo, useState } from "react";

const fallbackComponentName = "ManualComponent";

const isValidIdentifier = (value) => /^[A-Za-z_$][\w$]*$/.test(value);

const escapeScriptEnd = (value) => value.replace(/<\/script/gi, "<\\/script");

const createPreviewId = () => `manual-preview-${Math.random().toString(36).slice(2)}`;

const getSampleProps = (code) => {
  const sampleProps = {};
  const callbackNames = new Set();

  const propNames = new Set(
    Array.from(code.matchAll(/(?:^|[\s,{])([A-Za-z_$][\w$]*)\s*=/g), (match) => match[1])
  );

  Array.from(code.matchAll(/\b(on[A-Z][A-Za-z0-9_$]*)\b/g), (match) =>
    callbackNames.add(match[1])
  );

  if (propNames.has("cards") || /\bcards\.map\b/.test(code)) {
    sampleProps.cards = [
      {
        title: "Design System",
        subtitle: "Cosmic UI",
        content: "Reusable interface blocks with polished motion and responsive behavior.",
        icon: "AI",
        tags: ["React", "Preview", "Motion"],
        buttonText: "Explore",
      },
      {
        title: "Component Library",
        subtitle: "Production ready",
        content: "Organize variants, props, and reusable patterns in one clean workflow.",
        icon: "UI",
        tags: ["JSX", "Props"],
        buttonText: "Open",
      },
      {
        title: "Publish Flow",
        subtitle: "Ship faster",
        content: "Save and publish components without leaving the admin studio.",
        icon: "NPM",
        tags: ["NPM", "Admin"],
        buttonText: "Publish",
      },
    ];
  }

  if (propNames.has("items") || /\bitems\.map\b/.test(code)) {
    sampleProps.items = [
      { title: "First item", content: "Useful preview content for the first item." },
      { title: "Second item", content: "Another item so mapped layouts render properly." },
      { title: "Third item", content: "A final item for spacing and scroll checks." },
    ];
  }

  const scalarSamples = {
    title: "Cosmic UI Component",
    subtitle: "Live manual preview",
    content: "This preview uses sample props so pasted components can render immediately.",
    description: "Preview how your component behaves before saving it.",
    image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&q=80",
    buttonText: "Get Started",
    text: "Cosmic UI",
    label: "Preview",
    value: "150",
    count: 3,
    price: 149,
    rating: 4.8,
    accentColor: "#e8a06e",
    backgroundColor: "#f8f3ee",
    cardBackgroundColor: "#ffffff",
    cardTextColor: "#2f2925",
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
    prepared = `const ${fallbackComponentName} = () => <div>Paste component code to preview.</div>;`;
  }

  return prepared;
};

const createPreviewDocument = ({ code, componentName, previewId }) => {
  const detectedName = detectComponentName(code, componentName);
  const renderName = isValidIdentifier(detectedName) ? detectedName : fallbackComponentName;
  const preparedCode = escapeScriptEnd(preparePreviewCode(code));
  const previewSample = getSampleProps(code);
  const previewProps = escapeScriptEnd(JSON.stringify(previewSample.props, null, 2));
  const callbackAssignments = previewSample.callbackNames
    .map((name) => `previewProps.${name} = () => console.info("${name} called from preview");`)
    .join("\n        ");

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html,
      body {
        margin: 0;
        min-height: 100%;
      }
      body {
        box-sizing: border-box;
        padding: 28px;
        background: #2a2622;
        color: #fffbf7;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      #root {
        min-height: 100%;
        width: 100%;
      }
      .preview-error {
        max-width: 560px;
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
        color: rgba(255, 255, 255, 0.5);
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
    <div id="root"><div class="preview-loading">Rendering preview...</div></div>
    <script type="text/babel" data-presets="env,react">
      const { useCallback, useEffect, useMemo, useRef, useState } = React;
      const rootElement = document.getElementById("root");
      const showError = (error) => {
        rootElement.innerHTML = "";
        const panel = document.createElement("pre");
        panel.className = "preview-error";
        panel.textContent = error && error.message ? error.message : String(error);
        rootElement.appendChild(panel);
      };
      const reportPreviewSize = () => {
        const htmlElement = document.documentElement;
        const width = Math.max(rootElement.scrollWidth, document.body.scrollWidth, htmlElement.scrollWidth);
        const height = Math.max(rootElement.scrollHeight, document.body.scrollHeight, htmlElement.scrollHeight);
        window.parent.postMessage(
          {
            type: "cosmic-manual-preview-size",
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
          throw new Error("Could not find a component named ${renderName}. Use an exported PascalCase component name.");
        }
        const previewProps = ${previewProps};
        ${callbackAssignments}
        ReactDOM.createRoot(rootElement).render(<PreviewComponent {...previewProps} />);
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

const ManualComponentPreview = ({ code, componentName }) => {
  const [previewId] = useState(createPreviewId);
  const [isLargePreviewOpen, setIsLargePreviewOpen] = useState(false);
  const [isOversized, setIsOversized] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(false);
  const [previewSize, setPreviewSize] = useState({ height: 0, width: 0 });
  const previewDocument = useMemo(
    () => createPreviewDocument({ code, componentName, previewId }),
    [code, componentName, previewId]
  );
  const largePreviewDocument = useMemo(
    () => createPreviewDocument({ code, componentName, previewId: `${previewId}-large` }),
    [code, componentName, previewId]
  );

  useEffect(() => {
    setHasMeasured(false);
    setIsOversized(false);
  }, [previewDocument]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.type !== "cosmic-manual-preview-size" ||
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
            ? "This component is too large for the regular preview."
            : "Preview checks whether the component fits this panel."}
        </p>
        <button
          type="button"
          onClick={() => setIsLargePreviewOpen(true)}
          className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-white/15 disabled:opacity-50"
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
          title="Manual component preview"
          sandbox="allow-scripts"
          srcDoc={previewDocument}
          className="bg-charcoal min-h-96 w-full rounded-lg border border-white/10"
        />
      )}

      {isLargePreviewOpen && (
        <div className="bg-charcoal-text/55 fixed inset-0 z-50 flex items-center justify-center p-3 backdrop-blur-sm md:p-6">
          <div className="border-outline-variant bg-soft-cream-bg flex h-[min(86vh,860px)] w-[min(1180px,calc(100vw-24px))] flex-col overflow-hidden rounded-xl border shadow-2xl">
            <div className="border-outline-variant/60 bg-white/70 flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-charcoal-text text-sm font-bold">Large Component Preview</p>
                <p className="text-text-secondary text-xs">
                  Wider canvas for components that do not fit the normal panel.
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
                title="Large manual component preview"
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

export default ManualComponentPreview;
