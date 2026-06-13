import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../auth/hooks/useAuth";
import ManualComponentPreview from "../components/ManualComponentPreview";
import {
  getAdminComponentsService,
  getAdminStatsService,
  getAdminUsersService,
  saveAdminComponentService,
} from "../services/adminService";

const defaultCode = `export const MyComponent = ({ title = "Cosmic UI" }) => {
  return (
    <div style={{ padding: 24, borderRadius: 16 }}>
      <h1>{title}</h1>
    </div>
  );
};`;

const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(
        new Date(value)
      )
    : "Draft";

const getLastSevenDays = () =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (6 - index));
    return date;
  });

const makeActivityData = (components) => {
  const days = getLastSevenDays();

  return days.map((day) => {
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const count = components.filter((component) => {
      const createdAt = new Date(component.createdAt);
      return createdAt >= day && createdAt < nextDay;
    }).length;

    return {
      count,
      label: new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(day),
    };
  });
};

const AdminPage = () => {
  const { user, handleLogout } = useAuth();
  const [activeView, setActiveView] = useState("dashboard");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalComponents: 0,
    publicComponents: 0,
    privateComponents: 0,
  });
  const [users, setUsers] = useState([]);
  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState("");
  const [componentName, setComponentName] = useState("");
  const [propInput, setPropInput] = useState("");
  const [propsList, setPropsList] = useState([]);
  const [code, setCode] = useState(defaultCode);
  const [manualView, setManualView] = useState("code");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const filteredComponents = useMemo(
    () =>
      components.filter((component) =>
        component.name?.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [components, search]
  );

  const activityData = useMemo(() => makeActivityData(components), [components]);
  const maxActivityCount = Math.max(...activityData.map((item) => item.count), 1);
  const weeklyPublished = activityData.reduce((sum, item) => sum + item.count, 0);

  const loadAdminData = async () => {
    setLoading(true);
    setError("");

    try {
      const [statsResponse, usersResponse, componentsResponse] = await Promise.all([
        getAdminStatsService(),
        getAdminUsersService(),
        getAdminComponentsService(),
      ]);

      setStats(statsResponse.data?.stats || {});
      setUsers(usersResponse.data?.users || []);
      setComponents(componentsResponse.data?.components || []);
    } catch (loadError) {
      setError(loadError.response?.data?.message || "Failed to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const addProp = () => {
    const nextProp = propInput.trim();
    if (!nextProp || propsList.includes(nextProp)) {
      return;
    }
    setPropsList((current) => [...current, nextProp]);
    setPropInput("");
  };

  const handlePropKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addProp();
    }
  };

  const handleSaveComponent = async () => {
    if (!componentName.trim() || !code.trim() || saving) {
      setError("Component name and code are required.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      await saveAdminComponentService({
        name: componentName.trim(),
        props: propsList,
        code,
      });
      setMessage("Component saved as public.");
      setComponentName("");
      setPropsList([]);
      setPropInput("");
      setCode(defaultCode);
      await loadAdminData();
      setActiveView("dashboard");
    } catch (saveError) {
      setError(saveError.response?.data?.message || "Failed to save component.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-soft-cream-bg text-charcoal-text min-h-screen">
      <div className="flex min-h-screen">
        <aside className="border-outline-variant/50 bg-surface-container-low fixed inset-y-0 left-0 z-40 hidden w-72 shrink-0 flex-col border-r lg:flex">
          <div className="border-outline-variant/40 flex items-center gap-3 border-b px-6 py-7">
            <img src="/favicon.svg" alt="Cosmic UI logo" className="h-11 w-11" />
            <div>
              <p className="navbar-brand-text">Cosmic UI</p>
              <p className="type-label-sm text-warm-accent mt-1 tracking-widest uppercase">Admin</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
            {[
              ["dashboard", "grid_view", "Dashboard"],
              ["add", "deployed_code", "Add Component"],
            ].map(([id, icon, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveView(id)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left font-semibold transition-all ${
                  activeView === id
                    ? "bg-highlight-pink/50 text-charcoal-text shadow-sm"
                    : "text-text-secondary hover:bg-white hover:text-charcoal-text"
                }`}
              >
                <span className="material-symbols-outlined text-[20px] leading-none">{icon}</span>
                {label}
              </button>
            ))}
          </nav>

          <div className="border-outline-variant/40 border-t p-4">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <span className="material-symbols-outlined text-[20px] leading-none">logout</span>
              Logout
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:pl-72">
          <header className="border-outline-variant/40 bg-soft-cream-bg/90 sticky top-0 z-40 border-b backdrop-blur-md">
            <div className="flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <h1 className="type-headline-md text-charcoal-text">
                  {activeView === "dashboard" ? "Dashboard" : "Add Component"}
                </h1>
                <p className="type-body-sm text-text-secondary">
                  Welcome back, {user?.name || user?.displayName || "Admin"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/generate"
                  className="bg-warm-accent text-charcoal-text flex items-center gap-2 rounded-full px-5 py-3 font-bold shadow-md transition-transform hover:scale-105"
                >
                  <span className="material-symbols-outlined text-[18px] leading-none">add</span>
                  AI Component
                </Link>
                <Link
                  to="/home"
                  className="border-outline-variant bg-white text-text-secondary hover:text-charcoal-text rounded-full border px-4 py-3 text-sm font-semibold"
                >
                  Home
                </Link>
              </div>
            </div>
          </header>

          <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
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

            {activeView === "dashboard" ? (
              <>
                <section className="grid gap-4 md:grid-cols-2">
                  {[
                    ["Total Users", stats.totalUsers || users.length + 1, "group"],
                    ["Components Made", stats.totalComponents || components.length, "code_blocks"],
                    ["Public Components", stats.publicComponents || 0, "public"],
                    ["Private Components", stats.privateComponents || 0, "lock"],
                  ].map(([label, value, icon]) => (
                    <div key={label} className="border-outline-variant bg-white rounded-xl border p-6 shadow-sm">
                      <div className="bg-blue-soft/70 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
                        <span className="material-symbols-outlined text-charcoal-text">
                          {icon}
                        </span>
                      </div>
                      <p className="type-headline-lg text-charcoal-text">{value}</p>
                      <p className="type-body-sm text-text-secondary">{label}</p>
                    </div>
                  ))}
                </section>

                <section className="border-outline-variant bg-white rounded-xl border p-6 shadow-sm">
                  <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="type-headline-sm text-charcoal-text">
                        Public Components Published
                      </h2>
                      <p className="type-body-sm text-text-secondary">
                        Daily component activity from the last 7 days
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-warm-accent/20 text-charcoal-text rounded-full px-3 py-1 text-xs font-bold">
                        {weeklyPublished} this week
                      </span>
                      <span className="bg-purple-soft/70 text-charcoal-text rounded-full px-3 py-1 text-xs font-bold">
                        Last 7 days
                      </span>
                    </div>
                  </div>
                  <div className="border-outline-variant/60 bg-soft-cream-bg rounded-lg border p-5">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="type-label-sm text-text-secondary tracking-widest uppercase">
                          Published volume
                        </p>
                        <p className="type-body-sm text-text-secondary mt-1">
                          Bars stay readable even when most days are quiet.
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="type-headline-md text-charcoal-text">{maxActivityCount}</p>
                        <p className="type-body-sm text-text-secondary">peak day</p>
                      </div>
                    </div>

                    <div className="border-outline-variant/40 bg-white/60 relative h-56 rounded-lg border px-4 pt-8 pb-4">
                      <div className="pointer-events-none absolute inset-x-4 top-8 bottom-12 flex flex-col justify-between">
                        {[0, 1, 2, 3].map((line) => (
                          <span
                            key={line}
                            className="border-outline-variant/50 block border-t border-dashed"
                          />
                        ))}
                      </div>

                      <div className="relative z-10 grid h-full grid-cols-7 items-end gap-3">
                        {activityData.map((item) => {
                          const hasActivity = item.count > 0;
                          const barHeight = hasActivity
                            ? Math.max((item.count / maxActivityCount) * 112, 28)
                            : 8;

                          return (
                            <div key={item.label} className="flex h-full flex-col items-center justify-end gap-3">
                              <span className="text-charcoal-text text-xs font-bold">
                                {item.count}
                              </span>
                              <div className="flex h-32 w-full items-end justify-center">
                                <div
                                  className={`w-full max-w-12 rounded-t-lg transition-all ${
                                    hasActivity
                                      ? "bg-warm-accent shadow-[0_8px_20px_rgba(232,160,110,0.22)]"
                                      : "bg-surface-container-high"
                                  }`}
                                  style={{ height: `${barHeight}px` }}
                                />
                              </div>
                              <span className="text-text-secondary whitespace-nowrap text-xs font-semibold">
                                {item.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="border-outline-variant bg-white overflow-hidden rounded-xl border shadow-sm">
                  <div className="border-outline-variant/50 flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="type-headline-sm text-charcoal-text">Public Components</h2>
                      <p className="type-body-sm text-text-secondary">
                        {filteredComponents.length} components visible in admin library
                      </p>
                    </div>
                    <div className="border-outline-variant bg-surface-container-low flex items-center gap-2 rounded-lg border px-3 py-2">
                      <span className="material-symbols-outlined text-text-tertiary text-[18px]">
                        search
                      </span>
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search components..."
                        className="bg-transparent text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div className="divide-outline-variant/40 divide-y">
                    {loading ? (
                      <p className="p-6 text-text-secondary">Loading admin data...</p>
                    ) : (
                      filteredComponents.map((component) => (
                        <div key={component._id} className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
                          <div className="flex items-start gap-4">
                            <div className="bg-purple-soft/70 flex h-11 w-11 items-center justify-center rounded-lg">
                              <span className="material-symbols-outlined text-[20px] leading-none">
                                code
                              </span>
                            </div>
                            <div>
                              <h3 className="font-sora text-lg font-bold text-charcoal-text">
                                {component.name}
                              </h3>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {(component.props || []).slice(0, 4).map((prop) => (
                                  <span key={prop} className="bg-purple-soft/60 rounded-md px-2 py-1 text-xs font-bold text-on-surface-variant">
                                    {prop}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-text-secondary">
                            <span>{formatDate(component.createdAt)}</span>
                            <span className="bg-green-soft/70 rounded-full px-3 py-1 text-xs font-bold text-on-surface-variant">
                              {component.visibility}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </section>
              </>
            ) : (
              <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
                <div>
                  <h2 className="type-headline-md text-charcoal-text">Add Component</h2>
                  <p className="type-body-sm text-text-secondary">
                    Manually add a public component by name, props, and JSX code.
                  </p>
                </div>

                <div className="border-outline-variant bg-white rounded-xl border p-6 shadow-sm">
                  <label className="type-label-sm text-text-secondary tracking-widest uppercase">
                    Component Name
                  </label>
                  <input
                    value={componentName}
                    onChange={(event) => setComponentName(event.target.value)}
                    placeholder='e.g. "PricingCard", "HeroSection"'
                    className="border-outline-variant mt-3 w-full rounded-lg border bg-surface-container-low px-4 py-3 outline-none focus:border-warm-accent"
                  />
                </div>

                <div className="border-outline-variant bg-white rounded-xl border p-6 shadow-sm">
                  <label className="type-label-sm text-text-secondary tracking-widest uppercase">
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
                        onClick={() => setPropsList((current) => current.filter((item) => item !== prop))}
                        className="bg-purple-soft/70 rounded-full px-3 py-1 text-sm font-bold text-on-surface-variant"
                      >
                        {prop} x
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3">
                    <input
                      value={propInput}
                      onChange={(event) => setPropInput(event.target.value)}
                      onKeyDown={handlePropKeyDown}
                      placeholder='e.g. "title", "onClick", "children"'
                      className="border-outline-variant flex-1 rounded-lg border bg-surface-container-low px-4 py-3 outline-none focus:border-warm-accent"
                    />
                    <button
                      type="button"
                      onClick={addProp}
                      className="bg-purple-soft text-charcoal-text rounded-lg px-5 py-3 font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="border-outline-variant bg-white overflow-hidden rounded-xl border shadow-sm">
                  <div className="border-outline-variant/50 flex items-center justify-between border-b p-5">
                    <label className="type-label-sm text-text-secondary tracking-widest uppercase">
                      Component Code
                    </label>
                    <div className="bg-surface-container-low flex rounded-full p-1">
                      <button
                        type="button"
                        aria-label="Edit component code"
                        title="Code"
                        onClick={() => setManualView("code")}
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
                        onClick={() => setManualView("preview")}
                        className={`flex h-9 w-10 items-center justify-center rounded-full transition-colors ${
                          manualView === "preview"
                            ? "bg-blue-soft text-charcoal-text shadow-sm"
                            : "text-text-secondary hover:text-charcoal-text"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px] leading-none">
                          visibility
                        </span>
                      </button>
                    </div>
                  </div>
                  {manualView === "code" ? (
                    <textarea
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      className="min-h-80 w-full resize-y bg-[#11151d] p-5 font-mono text-sm leading-7 text-white/80 outline-none"
                    />
                  ) : (
                    <div className="bg-charcoal p-5">
                      <ManualComponentPreview
                        componentName={componentName.trim() || "ManualComponent"}
                        code={code}
                      />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSaveComponent}
                  disabled={saving}
                  className="bg-warm-accent text-charcoal-text w-fit rounded-lg px-6 py-3 font-bold shadow-md transition-transform hover:scale-105 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Component"}
                </button>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
