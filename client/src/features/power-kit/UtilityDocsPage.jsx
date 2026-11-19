import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Battery,
  Clipboard,
  Gauge,
  KeyRound,
  MapPin,
  Network,
  ShieldCheck,
} from "lucide-react";
import "./power-kit.css";
const modules = [
  [
    Clipboard,
    "Clipboard",
    "copyToClipboard, readClipboard",
    "Browser clipboard access with a write fallback.",
  ],
  [
    Network,
    "Network",
    "isOnline, ping, getConnectionInfo",
    "Connection state and HTTP availability helpers.",
  ],
  [
    Battery,
    "Device",
    "getBattery, vibrate, getScreenInfo",
    "Battery, haptics, viewport, visibility, and idle utilities.",
  ],
  [
    MapPin,
    "Location",
    "getCurrentLocation, watchLocation",
    "Typed coordinates and native watch controls.",
  ],
  [
    Gauge,
    "Performance",
    "debounce, throttle",
    "Cancelable timing primitives for expensive interactions.",
  ],
  [KeyRound, "General", "generateOTP", "Secure code generation using Web Crypto."],
];
export default function UtilityDocsPage() {
  return (
    <div
      className="power-kit pk-docs"
      data-theme={document.documentElement.dataset.theme || "dark"}
    >
      <header className="pk-navbar">
        <Link className="pk-brand" to="/">
          <span className="pk-brand-mark">C</span>
          <span>Cosmic UI</span>
          <small>DOCS</small>
        </Link>
        <Link className="pk-button pk-button-quiet" to="/">
          <ArrowLeft size={16} /> Back home
        </Link>
      </header>
      <main className="pk-doc-main">
        <aside>
          <p>DOCUMENTATION</p>
          <a href="#install">Installation</a>
          <a href="#modules">Browser APIs</a>
          <a href="#performance">Performance</a>
          <a href="#general">General</a>
        </aside>
        <article>
          <p className="pk-eyebrow">
            <ShieldCheck size={15} /> cosmic-ui-library
          </p>
          <h1>Utilities that stay out of your way.</h1>
          <p className="pk-lede">
            Every utility is a named export. Import only what you use, and use a module subpath when
            your bundler needs one.
          </p>
          <section id="install">
            <h2>Install</h2>
            <pre className="pk-doc-code">
              <code>npm install cosmic-ui-library</code>
            </pre>
            <pre className="pk-doc-code">
              <code>
                {
                  'import { debounce, copyToClipboard } from "cosmic-ui-library";\nimport { generateOTP } from "cosmic-ui-library/utils/general";'
                }
              </code>
            </pre>
          </section>
          <section id="modules">
            <h2>API modules</h2>
            <div className="pk-doc-grid">
              {modules.map(([Icon, title, exportsList, description]) => (
                <div className="pk-doc-card" key={title}>
                  <Icon size={20} />
                  <h3>{title}</h3>
                  <code>{exportsList}</code>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </section>
          <section id="performance">
            <h2>Designed for cleanup</h2>
            <p>
              Listener subscriptions return teardown callbacks. Debounced and throttled functions
              expose <code>cancel()</code> and <code>flush()</code>, so React effects can clean up
              predictably.
            </p>
          </section>
          <section id="general">
            <h2>Progressive browser support</h2>
            <p>
              Availability is checked before browser APIs are used. Unsupported features return safe
              fallbacks when practical, or a useful error when the requested operation cannot
              happen.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
