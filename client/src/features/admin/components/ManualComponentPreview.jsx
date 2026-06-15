import { useEffect, useMemo, useState } from "react";

const fallbackComponentName = "ManualComponent";

const isValidIdentifier = (value) => /^[A-Za-z_$][\w$]*$/.test(value);

const escapeScriptEnd = (value) => value.replace(/<\/script/gi, "<\\/script");

const createPreviewId = () => `manual-preview-${Math.random().toString(36).slice(2)}`;

const defaultPreviewImage =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fff8f0%22%2F%3E%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%23e8a06e%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232a2622%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22720%22%20cy%3D%22130%22%20r%3D%22150%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.32%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22500%22%20r%3D%22210%22%20fill%3D%22%232a2622%22%20opacity%3D%220.18%22%2F%3E%3Cpath%20d%3D%22M0%20430C180%20350%20315%20520%20515%20420C665%20345%20760%20355%20900%20305V600H0Z%22%20fill%3D%22%232a2622%22%20opacity%3D%220.82%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2296%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2252%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECosmic%20UI%3C%2Ftext%3E%3Ctext%20x%3D%2264%22%20y%3D%22150%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2224%22%20font-weight%3D%22600%22%20fill%3D%22%236d5f56%22%3EPreview%20image%3C%2Ftext%3E%3C%2Fsvg%3E";
const defaultPreviewImageAlt =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%221%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%232a2622%22%2F%3E%3Cstop%20offset%3D%220.5%22%20stop-color%3D%22%237ea7a4%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fff8f0%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url(%23g)%22%2F%3E%3Crect%20x%3D%2282%22%20y%3D%2286%22%20width%3D%22736%22%20height%3D%22428%22%20rx%3D%2242%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ccircle%20cx%3D%22260%22%20cy%3D%22245%22%20r%3D%2292%22%20fill%3D%22%23e8a06e%22%20opacity%3D%220.75%22%2F%3E%3Ccircle%20cx%3D%22610%22%20cy%3D%22340%22%20r%3D%22142%22%20fill%3D%22%232a2622%22%20opacity%3D%220.45%22%2F%3E%3Ctext%20x%3D%2296%22%20y%3D%22490%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2246%22%20font-weight%3D%22800%22%20fill%3D%22%23ffffff%22%3EComponent%20media%3C%2Ftext%3E%3C%2Fsvg%3E";
const defaultAvatarImage =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%232a2622%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e8a06e%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20rx%3D%22150%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22118%22%20r%3D%2254%22%20fill%3D%22%23fff8f0%22%20opacity%3D%220.92%22%2F%3E%3Cpath%20d%3D%22M68%20258C82%20200%20116%20172%20150%20172S218%20200%20232%20258%22%20fill%3D%22%23fff8f0%22%20opacity%3D%220.92%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22286%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2234%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECU%3C%2Ftext%3E%3C%2Fsvg%3E";
const defaultLogoImage = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20160%20160%22%3E%3Crect%20width%3D%22160%22%20height%3D%22160%22%20rx%3D%2236%22%20fill%3D%22%232a2622%22%2F%3E%3Cpath%20d%3D%22M80%2028L118%20126H94L87%20105H50L43%20126H20L58%2028H80Z%22%20fill%3D%22%23e8a06e%22%2F%3E%3Ctext%20x%3D%22104%22%20y%3D%22132%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2230%22%20font-weight%3D%22900%22%20fill%3D%22%23fff8f0%22%3EUI%3C%2Ftext%3E%3C%2Fsvg%3E";
const defaultAudioSource =
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
const defaultVideoSource =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

const mediaPropNames = [
  "image",
  "imageUrl",
  "imageSrc",
  "src",
  "avatar",
  "avatarUrl",
  "authorAvatar",
  "profileImage",
  "userImage",
  "coverImage",
  "coverImageUrl",
  "thumbnail",
  "thumbnailUrl",
  "logoUrl",
  "before",
  "after",
  "beforeImage",
  "afterImage",
  "audioSrc",
  "videoSrc",
];

const getMediaSample = (propName, lowerText) => {
  const lowerName = propName.toLowerCase();

  if (lowerName.includes("audio")) {
    return defaultAudioSource;
  }

  if (lowerName.includes("video")) {
    return defaultVideoSource;
  }

  if (lowerName.includes("avatar") || lowerName.includes("profile") || lowerName.includes("user")) {
    return defaultAvatarImage;
  }

  if (lowerName.includes("logo")) {
    return defaultLogoImage;
  }

  if (lowerName.includes("after")) {
    return defaultPreviewImageAlt;
  }

  if (lowerName === "src") {
    if (lowerText.includes("audio")) {
      return defaultAudioSource;
    }

    if (lowerText.includes("video")) {
      return defaultVideoSource;
    }
  }

  return defaultPreviewImage;
};

const getSampleProps = (code) => {
  const sampleProps = {};
  const callbackNames = new Set();
  const lowerText = code.toLowerCase();

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
        image: defaultPreviewImage,
        imageUrl: defaultPreviewImage,
        avatarUrl: defaultAvatarImage,
        tags: ["React", "Preview", "Motion"],
        buttonText: "Explore",
      },
      {
        title: "Component Library",
        subtitle: "Production ready",
        content: "Organize variants, props, and reusable patterns in one clean workflow.",
        icon: "UI",
        image: defaultPreviewImageAlt,
        imageUrl: defaultPreviewImageAlt,
        avatarUrl: defaultAvatarImage,
        tags: ["JSX", "Props"],
        buttonText: "Open",
      },
      {
        title: "Publish Flow",
        subtitle: "Ship faster",
        content: "Save and publish components without leaving the admin studio.",
        icon: "NPM",
        image: defaultPreviewImage,
        imageUrl: defaultPreviewImage,
        avatarUrl: defaultAvatarImage,
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

  if (propNames.has("images") || lowerText.includes("gallery")) {
    sampleProps.images = [
      defaultPreviewImage,
      defaultPreviewImageAlt,
      "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20600%22%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22%23f7efe8%22%2F%3E%3Cpath%20d%3D%22M0%2090H900V600H0Z%22%20fill%3D%22%232a2622%22%20opacity%3D%220.92%22%2F%3E%3Cpath%20d%3D%22M60%20468C210%20315%20310%20450%20455%20332C610%20205%20720%20285%20840%20160%22%20fill%3D%22none%22%20stroke%3D%22%23e8a06e%22%20stroke-width%3D%2246%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%22178%22%20cy%3D%22162%22%20r%3D%2282%22%20fill%3D%22%23e8a06e%22%2F%3E%3Ccircle%20cx%3D%22710%22%20cy%3D%22456%22%20r%3D%2296%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.18%22%2F%3E%3Ctext%20x%3D%2262%22%20y%3D%2270%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2242%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECosmic%20UI%3C%2Ftext%3E%3C%2Fsvg%3E",
    ];
  }

  const scalarSamples = {
    title: "Cosmic UI Component",
    subtitle: "Live manual preview",
    content: "This preview uses sample props so pasted components can render immediately.",
    description: "Preview how your component behaves before saving it.",
    image: defaultPreviewImage,
    imageUrl: defaultPreviewImage,
    imageSrc: defaultPreviewImage,
    src: getMediaSample("src", lowerText),
    avatar: defaultAvatarImage,
    avatarUrl: defaultAvatarImage,
    authorAvatar: defaultAvatarImage,
    profileImage: defaultAvatarImage,
    userImage: defaultAvatarImage,
    coverImage: defaultPreviewImage,
    coverImageUrl: defaultPreviewImage,
    thumbnail: defaultPreviewImage,
    thumbnailUrl: defaultPreviewImage,
    logoUrl: defaultLogoImage,
    before: defaultPreviewImage,
    after: defaultPreviewImageAlt,
    beforeImage: defaultPreviewImage,
    afterImage: defaultPreviewImageAlt,
    audioSrc: defaultAudioSource,
    videoSrc: defaultVideoSource,
    buttonText: "Get Started",
    text: "Cosmic UI",
    label: "Preview",
    value: "150",
    count: 3,
    price: 149,
    rating: 4.8,
    accentColor: "#e8a06e",
    bg: "#ffffff",
    background: "#ffffff",
    backgroundColor: "#ffffff",
    color: "#2a2622",
    textColor: "#2a2622",
    foregroundColor: "#2a2622",
    borderColor: "#d7c2b7",
    cardBackgroundColor: "#ffffff",
    cardTextColor: "#2f2925",
  };

  Object.entries(scalarSamples).forEach(([name, value]) => {
    if (propNames.has(name)) {
      sampleProps[name] = value;
    }
  });

  mediaPropNames.forEach((name) => {
    if (propNames.has(name) && !sampleProps[name]) {
      sampleProps[name] = getMediaSample(name, lowerText);
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
    const frameId = window.requestAnimationFrame(() => {
      setHasMeasured(false);
      setIsOversized(false);
    });

    return () => window.cancelAnimationFrame(frameId);
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
