import React, { useEffect, useMemo, useState } from "react";

const colors = {
  bg: "#ffffff",
  text: "#111827",
  muted: "#6b7280",
  border: "#e5e7eb",
  soft: "#f8fafc",
  accent: "#2563eb",
  success: "#16a34a",
  danger: "#dc2626",
  warning: "#d97706"
};

const cx = (...items) => Object.assign({}, ...items.filter(Boolean));

const toneMap = {
  default: { bg: "#f8fafc", color: "#334155", border: "#e2e8f0" },
  primary: { bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
  success: { bg: "#ecfdf5", color: "#047857", border: "#bbf7d0" },
  warning: { bg: "#fffbeb", color: "#b45309", border: "#fde68a" },
  danger: { bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" }
};

const cardBase = ({
  backgroundColor = colors.bg,
  borderColor = colors.border,
  borderRadius = "8px",
  padding = "20px",
  shadow = true,
  width = "100%"
} = {}) => ({
  backgroundColor,
  border: `1px solid ${  borderColor}`,
  borderRadius,
  padding,
  width,
  boxSizing: "border-box",
  boxShadow: shadow ? "0 8px 28px rgba(15,23,42,0.08)" : "none",
  fontFamily: "inherit"
});

const buttonBase = ({
  backgroundColor = colors.accent,
  textColor = "#ffffff",
  borderRadius = "6px",
  padding = "10px 14px"
} = {}) => ({
  backgroundColor,
  color: textColor,
  border: "none",
  borderRadius,
  padding,
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit"
});

const fieldBase = ({
  width = "100%",
  borderColor = colors.border,
  borderRadius = "6px",
  padding = "10px 12px"
} = {}) => ({
  width,
  border: `1px solid ${  borderColor}`,
  borderRadius,
  padding,
  fontSize: "14px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  outline: "none"
});

const renderItems = (items, render) => items.map((item, index) => render(item, index));

export const Container = ({ children, maxWidth = "1120px", padding = "24px", center = true, style = {} }) => (
  <div style={cx({ width: "100%", maxWidth, padding, margin: center ? "0 auto" : 0, boxSizing: "border-box" }, style)}>{children}</div>
);

export const Section = ({ children, padding = "64px 24px", backgroundColor = "transparent", style = {} }) => (
  <section style={cx({ padding, backgroundColor, boxSizing: "border-box" }, style)}>{children}</section>
);

export const Grid = ({ children, columns = 3, gap = "20px", minWidth = "220px", style = {} }) => (
  <div style={cx({ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(${minWidth}, 1fr))`, gap }, style)}>{children}</div>
);

export const Flex = ({ children, direction = "row", align = "center", justify = "flex-start", gap = "12px", wrap = "wrap", style = {} }) => (
  <div style={cx({ display: "flex", flexDirection: direction, alignItems: align, justifyContent: justify, gap, flexWrap: wrap }, style)}>{children}</div>
);

export const Stack = ({ children, gap = "12px", align = "stretch", style = {} }) => (
  <div style={cx({ display: "flex", flexDirection: "column", gap, alignItems: align }, style)}>{children}</div>
);

export const Box = ({ children, padding = "16px", backgroundColor = colors.soft, borderRadius = "8px", style = {} }) => (
  <div style={cx({ padding, backgroundColor, borderRadius, boxSizing: "border-box" }, style)}>{children}</div>
);

export const Spacer = ({ size = "24px", axis = "vertical" }) => <div style={{ width: axis === "horizontal" ? size : "1px", height: axis === "vertical" ? size : "1px" }} />;

export const Divider = ({ color = colors.border, thickness = "1px", margin = "16px 0", vertical = false }) => (
  <div style={{ backgroundColor: color, width: vertical ? thickness : "100%", height: vertical ? "100%" : thickness, margin }} />
);

export const AspectRatio = ({ children, ratio = "16 / 9", backgroundColor = colors.soft, borderRadius = "8px", style = {} }) => (
  <div style={cx({ aspectRatio: ratio, backgroundColor, borderRadius, overflow: "hidden" }, style)}>{children}</div>
);

export const Center = ({ children, minHeight = "240px", style = {} }) => (
  <div style={cx({ minHeight, display: "grid", placeItems: "center" }, style)}>{children}</div>
);

export const MasonryGrid = ({ items = ["One", "Two", "Three", "Four"], columns = 3, gap = "16px", renderItem }) => (
  <div style={{ columnCount: columns, columnGap: gap }}>{renderItems(items, (item, i) => <div key={i} style={{ breakInside: "avoid", marginBottom: gap }}>{renderItem ? renderItem(item, i) : <Box>{item}</Box>}</div>)}</div>
);

export const SplitLayout = ({ left, right, gap = "32px", leftWidth = "1fr", rightWidth = "1fr", style = {} }) => (
  <div style={cx({ display: "grid", gridTemplateColumns: `${leftWidth} ${rightWidth}`, gap, alignItems: "center" }, style)}><div>{left}</div><div>{right}</div></div>
);

export const SidebarLayout = ({ sidebar, children, sidebarWidth = "260px", gap = "24px", style = {} }) => (
  <div style={cx({ display: "grid", gridTemplateColumns: `${sidebarWidth} 1fr`, gap, minHeight: "100%" }, style)}><aside>{sidebar}</aside><main>{children}</main></div>
);

export const DashboardLayout = ({ header, sidebar, children, sidebarWidth = "260px" }) => (
  <div style={{ minHeight: "100vh", backgroundColor: "#f6f8fb" }}>
    {header}
    <SidebarLayout sidebar={sidebar} sidebarWidth={sidebarWidth} style={{ padding: "20px" }}>{children}</SidebarLayout>
  </div>
);

export const Navbar = ({ brand = "Cosmic UI", links = ["Home", "Docs", "Pricing"], action = "Get Started", onAction = () => {}, backgroundColor = "#ffffff" }) => (
  <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", backgroundColor, borderBottom: `1px solid ${  colors.border}` }}>
    <strong style={{ color: colors.text }}>{brand}</strong>
    <Flex gap="18px">{links.map((link) => <a key={link} href="#" style={{ color: colors.muted, textDecoration: "none", fontSize: "14px" }}>{link}</a>)}</Flex>
    <button style={buttonBase()} onClick={onAction}>{action}</button>
  </nav>
);

export const Sidebar = ({ title = "Workspace", items = ["Dashboard", "Components", "Settings"], active = "Dashboard", onSelect = () => {}, width = "260px" }) => (
  <aside style={{ width, padding: "16px", borderRight: `1px solid ${  colors.border}`, backgroundColor: "#fff", boxSizing: "border-box" }}>
    <strong>{title}</strong>
    <Stack gap="6px" style={{ marginTop: "16px" }}>{items.map((item) => <button key={item} onClick={() => onSelect(item)} style={cx(buttonBase({ backgroundColor: item === active ? colors.accent : "transparent", textColor: item === active ? "#fff" : colors.text }), { textAlign: "left" })}>{item}</button>)}</Stack>
  </aside>
);

export const Menu = ({ items = ["Profile", "Billing", "Logout"], onSelect = () => {} }) => (
  <Stack gap="4px" style={cardBase({ padding: "8px", width: "220px", shadow: false })}>{items.map((item) => <button key={item} onClick={() => onSelect(item)} style={cx(buttonBase({ backgroundColor: "transparent", textColor: colors.text }), { textAlign: "left" })}>{item}</button>)}</Stack>
);

export const DropdownMenu = ({ label = "Options", items = ["Edit", "Duplicate", "Delete"], onSelect = () => {} }) => {
  const [open, setOpen] = useState(false);
  return <div style={{ position: "relative", display: "inline-block" }}><button style={buttonBase()} onClick={() => setOpen(!open)}>{label}</button>{open && <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 20 }}><Menu items={items} onSelect={(item) => { onSelect(item); setOpen(false); }} /></div>}</div>;
};

export const MegaMenu = ({ columns = [{ title: "Build", items: ["Buttons", "Forms", "Cards"] }, { title: "Ship", items: ["Docs", "Themes", "Blocks"] }] }) => (
  <Grid columns={columns.length} style={cardBase({ width: "640px" })}>{columns.map((column) => <Stack key={column.title}><strong>{column.title}</strong>{column.items.map((item) => <span key={item} style={{ color: colors.muted, fontSize: "14px" }}>{item}</span>)}</Stack>)}</Grid>
);

export const Breadcrumb = ({ items = ["Home", "Library", "Card"], separator = "/" }) => (
  <Flex gap="8px">{items.map((item, index) => <React.Fragment key={item}><span style={{ color: index === items.length - 1 ? colors.text : colors.muted, fontSize: "14px" }}>{item}</span>{index < items.length - 1 && <span style={{ color: colors.muted }}>{separator}</span>}</React.Fragment>)}</Flex>
);

export const Pagination = ({ page = 1, total = 5, onChange = () => {} }) => (
  <Flex>{Array.from({ length: total }, (_, i) => i + 1).map((item) => <button key={item} onClick={() => onChange(item)} style={buttonBase({ backgroundColor: item === page ? colors.accent : colors.soft, textColor: item === page ? "#fff" : colors.text, padding: "8px 12px" })}>{item}</button>)}</Flex>
);

export const Tabs = ({ tabs = ["Overview", "Details", "Settings"], activeTab, onChange = () => {}, children }) => {
  const [current, setCurrent] = useState(activeTab || tabs[0]);
  const choose = (tab) => { setCurrent(tab); onChange(tab); };
  return <div><Flex gap="4px" style={{ borderBottom: `1px solid ${  colors.border}` }}>{tabs.map((tab) => <button key={tab} onClick={() => choose(tab)} style={cx(buttonBase({ backgroundColor: "transparent", textColor: current === tab ? colors.accent : colors.muted }), { borderBottom: current === tab ? `2px solid ${  colors.accent}` : "2px solid transparent", borderRadius: 0 })}>{tab}</button>)}</Flex><div style={{ paddingTop: "16px" }}>{children || current}</div></div>;
};

export const Stepper = ({ steps = ["Account", "Profile", "Finish"], current = 1 }) => (
  <Flex>{steps.map((step, i) => <Flex key={step} gap="8px"><span style={{ ...buttonBase({ backgroundColor: i <= current ? colors.accent : colors.soft, textColor: i <= current ? "#fff" : colors.muted, padding: "7px 11px" }), borderRadius: "999px" }}>{i + 1}</span><span style={{ fontSize: "14px", color: i <= current ? colors.text : colors.muted }}>{step}</span></Flex>)}</Flex>
);

export const NavigationRail = ({ items = ["Home", "Search", "Settings"], active = "Home", onSelect = () => {} }) => (
  <Stack gap="8px" style={{ width: "80px", padding: "12px", backgroundColor: "#fff", borderRight: `1px solid ${  colors.border}` }}>{items.map((item) => <button key={item} onClick={() => onSelect(item)} title={item} style={buttonBase({ backgroundColor: item === active ? colors.accent : colors.soft, padding: "12px", textColor: item === active ? "#fff" : colors.text })}>{item.slice(0, 1)}</button>)}</Stack>
);

export const BottomNavigation = ({ items = ["Home", "Search", "Profile"], active = "Home", onSelect = () => {} }) => (
  <Flex justify="space-around" style={{ width: "100%", padding: "10px", borderTop: `1px solid ${  colors.border}`, backgroundColor: "#fff" }}>{items.map((item) => <button key={item} onClick={() => onSelect(item)} style={buttonBase({ backgroundColor: "transparent", textColor: item === active ? colors.accent : colors.muted })}>{item}</button>)}</Flex>
);

export const CommandMenu = ({ commands = ["Create component", "Open settings", "Search docs"], onSelect = () => {} }) => (
  <Stack style={cardBase({ width: "420px", padding: "12px" })}><SearchBar placeholder="Type a command..." /><Menu items={commands} onSelect={onSelect} /></Stack>
);

export const ContextMenu = Menu;

export const IconButton = ({ icon = "+", label = "Action", onClick = () => {}, backgroundColor = colors.soft, textColor = colors.text }) => <button aria-label={label} title={label} onClick={onClick} style={buttonBase({ backgroundColor, textColor, padding: "10px 12px" })}>{icon}</button>;
export const FloatingActionButton = ({ icon = "+", onClick = () => {}, bottom = "24px", right = "24px" }) => <button onClick={onClick} style={cx(buttonBase({ padding: "16px 20px" }), { position: "fixed", bottom, right, borderRadius: "999px", boxShadow: "0 16px 34px rgba(37,99,235,0.3)" })}>{icon}</button>;
export const ButtonGroup = ({ buttons = ["Left", "Center", "Right"], active, onClick = () => {} }) => <Flex gap="0">{buttons.map((button, i) => <button key={button} onClick={() => onClick(button)} style={cx(buttonBase({ backgroundColor: button === active ? colors.accent : "#fff", textColor: button === active ? "#fff" : colors.text }), { border: `1px solid ${  colors.border}`, borderRadius: i === 0 ? "6px 0 0 6px" : i === buttons.length - 1 ? "0 6px 6px 0" : 0 })}>{button}</button>)}</Flex>;
export const ToggleButton = ({ pressed = false, children = "Toggle", onToggle = () => {} }) => <button onClick={() => onToggle(!pressed)} style={buttonBase({ backgroundColor: pressed ? colors.accent : colors.soft, textColor: pressed ? "#fff" : colors.text })}>{children}</button>;
export const SplitButton = ({ text = "Save", options = ["Save draft", "Publish"], onClick = () => {}, onSelect = () => {} }) => <ButtonGroup buttons={[text, "..."]} onClick={(item) => item === text ? onClick() : onSelect(options[0])} />;
export const SocialButton = ({ provider = "Google", onClick = () => {} }) => <button onClick={onClick} style={cx(buttonBase({ backgroundColor: "#fff", textColor: colors.text }), { border: `1px solid ${  colors.border}` })}>Continue with {provider}</button>;

export const Input = ({ label = "Label", placeholder = "Enter text", value, onChange = () => {}, type = "text" }) => <label style={{ display: "grid", gap: "6px", color: colors.text, fontSize: "14px" }}>{label}<input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={fieldBase()} /></label>;
export const Select = ({ label = "Select", options = ["Option 1", "Option 2"], value, onChange = () => {} }) => <label style={{ display: "grid", gap: "6px", fontSize: "14px" }}>{label}<select value={value} onChange={(e) => onChange(e.target.value)} style={fieldBase()}>{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
export const MultiSelect = ({ options = ["React", "Vue", "Svelte"], selected = [], onChange = () => {} }) => <Stack>{options.map((option) => <Checkbox key={option} label={option} checked={selected.includes(option)} onChange={(checked) => onChange(checked ? [...selected, option] : selected.filter((item) => item !== option))} />)}</Stack>;
export const Checkbox = ({ label = "Checkbox", checked = false, onChange = () => {} }) => <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px" }}><input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />{label}</label>;
export const RadioButton = ({ label = "Radio", name = "radio", checked = false, onChange = () => {} }) => <label style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "14px" }}><input type="radio" name={name} checked={checked} onChange={(e) => onChange(e.target.checked)} />{label}</label>;
export const RangeSlider = ({ label = "Range", min = 0, max = 100, value = 50, onChange = () => {} }) => <label style={{ display: "grid", gap: "8px", fontSize: "14px" }}><Flex justify="space-between"><span>{label}</span><strong>{value}</strong></Flex><input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>;
export const SearchBar = ({ placeholder = "Search...", value, onChange = () => {} }) => <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={fieldBase()} />;
export const DatePicker = (props) => <Input {...props} label={props.label || "Date"} type="date" />;
export const TimePicker = (props) => <Input {...props} label={props.label || "Time"} type="time" />;
export const DateTimePicker = (props) => <Input {...props} label={props.label || "Date and time"} type="datetime-local" />;
export const ColorPicker = ({ label = "Color", value = "#2563eb", onChange = () => {} }) => <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px" }}>{label}<input type="color" value={value} onChange={(e) => onChange(e.target.value)} /></label>;
export const FileUpload = ({ label = "Upload file", onChange = () => {} }) => <label style={cx(cardBase({ padding: "18px", shadow: false }), { display: "block", cursor: "pointer", color: colors.muted })}>{label}<input type="file" onChange={(e) => onChange(e.target.files)} style={{ display: "block", marginTop: "10px" }} /></label>;
export const OTPInput = ({ length = 6, value = "", onChange = () => {} }) => <Flex>{Array.from({ length }, (_, i) => <input key={i} maxLength="1" value={value[i] || ""} onChange={(e) => onChange(value.slice(0, i) + e.target.value + value.slice(i + 1))} style={cx(fieldBase({ width: "42px" }), { textAlign: "center" })} />)}</Flex>;
export const FormWrapper = ({ title = "Form", children, onSubmit = () => {} }) => <form onSubmit={(e) => { e.preventDefault(); onSubmit(e); }} style={cardBase({ width: "420px" })}><Stack><h3 style={{ margin: 0 }}>{title}</h3>{children}<button style={buttonBase()}>Submit</button></Stack></form>;
export const FormValidation = ({ message = "This field is required.", tone = "danger" }) => <span style={{ color: toneMap[tone].color, fontSize: "13px" }}>{message}</span>;

export const BasicCard = ({ title = "Card Title", content = "Simple card content.", action = "Learn more" }) => <div style={cardBase({ width: "320px" })}><h3 style={{ marginTop: 0 }}>{title}</h3><p style={{ color: colors.muted }}>{content}</p><button style={buttonBase()}>{action}</button></div>;
export const BlogCard = ({ title = "Design systems that scale", author = "Cosmic UI", excerpt = "Build reusable interfaces faster.", imageUrl = "" }) => <BasicCard title={title} content={`${author} - ${excerpt}`} action="Read" />;
export const TeamCard = ({ name = "Alex Morgan", role = "Product Designer", imageUrl = "" }) => <ProfileSummary name={name} subtitle={role} imageUrl={imageUrl} />;
export const FeatureCard = ({ title = "Fast components", description = "Reusable props and sensible defaults.", icon = "*" }) => <div style={cardBase({ width: "300px" })}><div style={{ fontSize: "24px" }}>{icon}</div><h3>{title}</h3><p style={{ color: colors.muted }}>{description}</p></div>;
export const PricingCard = ({ plan = "Pro", price = "$19", features = ["Unlimited projects", "Priority support"], cta = "Choose plan" }) => <div style={cardBase({ width: "320px" })}><h3>{plan}</h3><strong style={{ fontSize: "34px" }}>{price}</strong><Stack style={{ margin: "18px 0" }}>{features.map((f) => <span key={f}>✓ {f}</span>)}</Stack><button style={buttonBase()}>{cta}</button></div>;
export const TestimonialCard = ({ quote = "This library saved us hours.", name = "Happy User", role = "Founder" }) => <div style={cardBase({ width: "360px" })}><p style={{ fontSize: "18px" }}>"{quote}"</p><strong>{name}</strong><span style={{ color: colors.muted }}>{role}</span></div>;
export const CourseCard = ({ title = "React Basics", lessons = 24, level = "Beginner" }) => <BasicCard title={title} content={`${lessons} lessons - ${level}`} action="Start" />;
export const EventCard = ({ title = "Launch Meetup", date = "June 20", location = "Online" }) => <BasicCard title={title} content={`${date} - ${location}`} action="Register" />;
export const NewsCard = ({ title = "Product update", source = "Cosmic News" }) => <BasicCard title={title} content={`Latest from ${source}`} action="Open" />;
export const StatisticsCard = ({ label = "Revenue", value = "$42K", change = "+12%" }) => <div style={cardBase({ width: "240px" })}><span style={{ color: colors.muted }}>{label}</span><h2 style={{ margin: "8px 0" }}>{value}</h2><strong style={{ color: colors.success }}>{change}</strong></div>;
export const DashboardCard = StatisticsCard;
export const ServiceCard = FeatureCard;
export const AnalyticsCard = StatisticsCard;
export const StatCard = StatisticsCard;
export const RevenueCard = StatisticsCard;
export const KPICard = StatisticsCard;

export const Badge = ({ children = "Badge", tone = "primary" }) => <span style={{ display: "inline-flex", padding: "4px 9px", borderRadius: "999px", backgroundColor: toneMap[tone].bg, color: toneMap[tone].color, border: `1px solid ${  toneMap[tone].border}`, fontSize: "12px", fontWeight: 700 }}>{children}</span>;
export const Chip = ({ label = "Chip", onRemove }) => <Flex gap="6px" style={{ display: "inline-flex", backgroundColor: colors.soft, borderRadius: "999px", padding: "6px 10px" }}><span>{label}</span>{onRemove && <button onClick={onRemove} style={{ border: "none", background: "transparent", cursor: "pointer" }}>x</button>}</Flex>;
export const Tag = Badge;
export const Avatar = ({ name = "User", src = "", size = 40 }) => <div title={name} style={{ width: size, height: size, borderRadius: "999px", background: src ? `url(${src}) center/cover` : colors.accent, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700 }}>{!src && name.slice(0, 1)}</div>;
export const AvatarGroup = ({ users = ["Ana", "Ben", "Cara"], size = 36 }) => <Flex gap="-8px">{users.map((user, i) => <div key={user} style={{ marginLeft: i ? "-10px" : 0, border: "2px solid #fff", borderRadius: "999px" }}><Avatar name={user} size={size} /></div>)}</Flex>;
export const Tooltip = ({ label = "Tooltip", children }) => <span title={label} style={{ display: "inline-flex" }}>{children || <Badge>Hover me</Badge>}</span>;
export const Popover = ({ trigger = "Open popover", content = "Popover content" }) => <DropdownMenu label={trigger} items={[content]} />;
export const Timeline = ({ items = [{ title: "Created", time: "9:00" }, { title: "Reviewed", time: "10:00" }] }) => <Stack>{items.map((item) => <Flex key={item.title} align="flex-start"><Badge>{item.time}</Badge><div><strong>{item.title}</strong><p style={{ margin: 0, color: colors.muted }}>{item.description}</p></div></Flex>)}</Stack>;
export const DataTable = ({ columns = ["Name", "Status"], rows = [{ name: "Cosmic UI", status: "Ready" }] }) => <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{columns.map((c) => <th key={c} style={{ textAlign: "left", padding: "10px", borderBottom: `1px solid ${  colors.border}` }}>{c}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{Object.values(row).map((value, j) => <td key={j} style={{ padding: "10px", borderBottom: `1px solid ${  colors.border}` }}>{value}</td>)}</tr>)}</tbody></table>;
export const List = ({ items = ["First item", "Second item"] }) => <ul style={{ margin: 0, paddingLeft: "20px" }}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
export const DescriptionList = ({ items = { Framework: "React", Package: "Cosmic UI" } }) => <dl>{Object.entries(items).map(([key, value]) => <React.Fragment key={key}><dt style={{ fontWeight: 700 }}>{key}</dt><dd style={{ margin: "0 0 10px", color: colors.muted }}>{value}</dd></React.Fragment>)}</dl>;
export const TreeView = ({ items = [{ label: "src", children: [{ label: "components" }] }] }) => <ul>{items.map((item) => <li key={item.label}>{item.label}{item.children && <TreeView items={item.children} />}</li>)}</ul>;
export const CodeBlock = ({ code = "const component = 'Cosmic UI';", language = "javascript" }) => <pre style={cx(cardBase({ backgroundColor: "#0f172a", borderColor: "#1e293b" }), { color: "#e2e8f0", overflow: "auto" })}><code>{language && `// ${language}\n`}{code}</code></pre>;
export const JSONViewer = ({ data = { name: "Cosmic UI", ready: true } }) => <CodeBlock language="json" code={JSON.stringify(data, null, 2)} />;
export const KeyValueViewer = DescriptionList;

export const Alert = ({ title = "Alert", message = "Something needs your attention.", tone = "primary" }) => <div style={cx(cardBase({ backgroundColor: toneMap[tone].bg, borderColor: toneMap[tone].border, shadow: false }), { color: toneMap[tone].color })}><strong>{title}</strong><div>{message}</div></div>;
export const Toast = ({ message = "Saved successfully", tone = "success" }) => <div style={cx(cardBase({ backgroundColor: toneMap[tone].bg, borderColor: toneMap[tone].border, width: "320px" }), { color: toneMap[tone].color })}>{message}</div>;
export const Snackbar = Toast;
export const Notification = Alert;
export const ProgressBar = ({ value = 60, color = colors.accent }) => <div style={{ width: "100%", height: "10px", backgroundColor: colors.soft, borderRadius: "999px", overflow: "hidden" }}><div style={{ width: `${value}%`, height: "100%", backgroundColor: color }} /></div>;
export const CircularProgress = ({ value = 70, size = 76 }) => <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${colors.accent} ${value}%, ${colors.soft} 0)`, display: "grid", placeItems: "center" }}><span style={{ background: "#fff", borderRadius: "50%", width: size - 18, height: size - 18, display: "grid", placeItems: "center", fontSize: "13px" }}>{value}%</span></div>;
export const SkeletonLoader = ({ lines = 3 }) => <Stack>{Array.from({ length: lines }, (_, i) => <div key={i} style={{ height: "14px", width: i === lines - 1 ? "65%" : "100%", backgroundColor: "#e5e7eb", borderRadius: "999px" }} />)}</Stack>;
export const Spinner = ({ size = 32, color = colors.accent }) => <div style={{ width: size, height: size, border: `3px solid ${colors.border}`, borderTopColor: color, borderRadius: "50%" }} />;
export const LoadingOverlay = ({ label = "Loading..." }) => <Center style={{ backgroundColor: "rgba(255,255,255,0.86)" }}><Stack align="center"><Spinner /><span>{label}</span></Stack></Center>;
export const EmptyState = ({ title = "No data", message = "There is nothing to show yet.", action = "Create" }) => <Center><Stack align="center"><h3>{title}</h3><p style={{ color: colors.muted }}>{message}</p><button style={buttonBase()}>{action}</button></Stack></Center>;
export const ErrorState = (props) => <EmptyState title={props.title || "Something went wrong"} message={props.message || "Please try again."} action={props.action || "Retry"} />;
export const SuccessState = (props) => <EmptyState title={props.title || "Success"} message={props.message || "Your action is complete."} action={props.action || "Done"} />;

export const Modal = ({ open = true, title = "Modal", children = "Modal content", onClose = () => {} }) => open ? <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,23,42,0.45)", display: "grid", placeItems: "center", zIndex: 100 }}><div style={cardBase({ width: "420px" })}><Flex justify="space-between"><h3 style={{ margin: 0 }}>{title}</h3><IconButton icon="x" label="Close" onClick={onClose} /></Flex><div style={{ marginTop: "16px" }}>{children}</div></div></div> : null;
export const Dialog = Modal;
export const Drawer = ({ open = true, children = "Drawer content", side = "right", width = "360px" }) => open ? <div style={{ position: "fixed", top: 0, bottom: 0, [side]: 0, width, backgroundColor: "#fff", padding: "20px", boxShadow: "0 0 40px rgba(0,0,0,0.18)", zIndex: 90 }}>{children}</div> : null;
export const Sheet = Drawer;
export const Popup = Popover;
export const Lightbox = ({ src = "", alt = "Preview" }) => <Modal title="Preview"><Image src={src} alt={alt} /></Modal>;
export const FullscreenModal = ({ open = true, children = "Fullscreen content" }) => open ? <div style={{ position: "fixed", inset: 0, backgroundColor: "#fff", zIndex: 120, padding: "32px" }}>{children}</div> : null;
export const ConfirmationDialog = ({ title = "Are you sure?", message = "This action cannot be undone.", onConfirm = () => {}, onCancel = () => {} }) => <Modal title={title}><p>{message}</p><Flex justify="flex-end"><button style={buttonBase({ backgroundColor: colors.soft, textColor: colors.text })} onClick={onCancel}>Cancel</button><button style={buttonBase({ backgroundColor: colors.danger })} onClick={onConfirm}>Confirm</button></Flex></Modal>;

export const Image = ({ src = "", alt = "Image", width = "100%", height = "auto", borderRadius = "8px" }) => <img src={src} alt={alt} style={{ width, height, borderRadius, objectFit: "cover", display: "block", backgroundColor: colors.soft }} />;
export const ImageGallery = ({ images = [] }) => <Grid columns={3}>{(images.length ? images : ["", "", ""]).map((src, i) => <Image key={i} src={src} height="160px" />)}</Grid>;
export const Carousel = ({ items = ["Slide 1", "Slide 2", "Slide 3"] }) => { const [index, setIndex] = useState(0); return <div style={cardBase({ width: "520px" })}><Center minHeight="180px">{items[index]}</Center><Flex justify="space-between"><button style={buttonBase({ backgroundColor: colors.soft, textColor: colors.text })} onClick={() => setIndex((index - 1 + items.length) % items.length)}>Prev</button><button style={buttonBase()} onClick={() => setIndex((index + 1) % items.length)}>Next</button></Flex></div>; };
export const VideoPlayer = ({ src = "", controls = true }) => <video src={src} controls={controls} style={{ width: "100%", borderRadius: "8px", backgroundColor: "#000" }} />;
export const AudioPlayer = ({ src = "", controls = true }) => <audio src={src} controls={controls} style={{ width: "100%" }} />;
export const ImageComparisonSlider = ({ before = "", after = "" }) => <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", overflow: "hidden", borderRadius: "8px" }}><Image src={before} alt="Before" /><Image src={after} alt="After" /></div>;
export const LightboxGallery = ImageGallery;

export const LoginForm = ({ onSubmit = () => {} }) => <FormWrapper title="Login" onSubmit={onSubmit}><Input label="Email" type="email" /><Input label="Password" type="password" /></FormWrapper>;
export const SignupForm = ({ onSubmit = () => {} }) => <FormWrapper title="Create account" onSubmit={onSubmit}><Input label="Name" /><Input label="Email" type="email" /><Input label="Password" type="password" /></FormWrapper>;
export const ForgotPasswordForm = ({ onSubmit = () => {} }) => <FormWrapper title="Forgot password" onSubmit={onSubmit}><Input label="Email" type="email" /></FormWrapper>;
export const ResetPasswordForm = ({ onSubmit = () => {} }) => <FormWrapper title="Reset password" onSubmit={onSubmit}><Input label="New password" type="password" /><Input label="Confirm password" type="password" /></FormWrapper>;
export const SocialLoginButtons = ({ providers = ["Google", "GitHub"] }) => <Stack>{providers.map((provider) => <SocialButton key={provider} provider={provider} />)}</Stack>;
export const AuthenticationLayout = ({ children, title = "Welcome back" }) => <Center minHeight="100vh"><Stack align="center"><h1>{title}</h1>{children || <LoginForm />}</Stack></Center>;

export const ActivityFeed = ({ items = ["New signup", "Payment received", "Component published"] }) => <Stack>{items.map((item) => <Alert key={item} title={item} message="Just now" tone="default" />)}</Stack>;
export const RecentTransactions = ({ transactions = [{ name: "Order #123", amount: "$99" }] }) => <DataTable columns={["Name", "Amount"]} rows={transactions} />;
export const UserSummary = ({ name = "Suyog", email = "user@example.com" }) => <ProfileSummary name={name} subtitle={email} />;
export const DashboardHeader = ({ title = "Dashboard", action = "New" }) => <Flex justify="space-between"><h2>{title}</h2><button style={buttonBase()}>{action}</button></Flex>;
export const DashboardSidebar = Sidebar;

export const ProductGrid = ({ products = [{ title: "Product", price: "$29" }] }) => <Grid>{products.map((product) => <BasicCard key={product.title} title={product.title} content={product.price} action="Add to cart" />)}</Grid>;
export const ProductList = ({ products = [{ title: "Product", price: "$29" }] }) => <Stack>{products.map((product) => <Flex key={product.title} justify="space-between" style={cardBase({ shadow: false })}><strong>{product.title}</strong><span>{product.price}</span></Flex>)}</Stack>;
export const ProductQuickView = ({ product = { title: "Product", price: "$29", description: "Product details" } }) => <Modal title={product.title}><p>{product.description}</p><strong>{product.price}</strong></Modal>;
export const ProductGallery = ImageGallery;
export const ProductReview = ({ name = "Customer", rating = 5, text = "Great product." }) => <TestimonialCard quote={`${"★".repeat(rating)} ${text}`} name={name} role="Verified buyer" />;
export const ShoppingCart = ({ items = [{ title: "Product", price: "$29" }] }) => <div style={cardBase({ width: "360px" })}><h3>Cart</h3><ProductList products={items} /><Divider /><button style={buttonBase()}>Checkout</button></div>;
export const CartDrawer = ({ items }) => <Drawer><ShoppingCart items={items} /></Drawer>;
export const CheckoutForm = ({ onSubmit }) => <FormWrapper title="Checkout" onSubmit={onSubmit}><Input label="Name" /><Input label="Address" /><Input label="Card number" /></FormWrapper>;
export const Wishlist = ProductGrid;
export const CouponBox = ({ onApply = () => {} }) => <Flex><Input label="Coupon" placeholder="SAVE20" /><button style={buttonBase()} onClick={onApply}>Apply</button></Flex>;
export const OrderSummary = ({ subtotal = "$99", total = "$99" }) => <DescriptionList items={{ Subtotal: subtotal, Total: total }} />;

export const ArticleCard = BlogCard;
export const AuthorCard = ({ name = "Author", bio = "Writes about UI." }) => <ProfileSummary name={name} subtitle={bio} />;
export const CommentSection = ({ comments = ["Looks good!"] }) => <Stack>{comments.map((comment) => <CommentCard key={comment} text={comment} />)}</Stack>;
export const RelatedPosts = ({ posts = ["Post one", "Post two"] }) => <List items={posts} />;
export const TableOfContents = ({ headings = ["Intro", "Usage", "Props"] }) => <List items={headings} />;
export const ReadingProgressBar = ({ value = 35 }) => <ProgressBar value={value} />;

export const PostCard = ({ author = "User", content = "Today I built a component.", actions = ["Like", "Share"] }) => <div style={cardBase({ width: "420px" })}><UserSummary name={author} email="@user" /><p>{content}</p><Flex>{actions.map((action) => <button key={action} style={buttonBase({ backgroundColor: colors.soft, textColor: colors.text })}>{action}</button>)}</Flex></div>;
export const CommentCard = ({ author = "User", text = "Nice work." }) => <Flex align="flex-start" style={cardBase({ shadow: false })}><Avatar name={author} /><div><strong>{author}</strong><p style={{ margin: "4px 0", color: colors.muted }}>{text}</p></div></Flex>;
export const ChatWindow = ({ messages = [{ from: "AI", text: "How can I help?" }] }) => <Stack style={cardBase({ width: "420px" })}>{messages.map((message, i) => <MessageBubble key={i} mine={message.from === "You"}>{message.text}</MessageBubble>)}<PromptInput /></Stack>;
export const MessageBubble = ({ children = "Message", mine = false }) => <div style={{ alignSelf: mine ? "flex-end" : "flex-start", backgroundColor: mine ? colors.accent : colors.soft, color: mine ? "#fff" : colors.text, padding: "10px 12px", borderRadius: "14px", maxWidth: "78%" }}>{children}</div>;
export const UserProfile = UserSummary;
export const FollowersList = ({ users = ["Ana", "Ben", "Cara"] }) => <Stack>{users.map((user) => <UserSummary key={user} name={user} email="@handle" />)}</Stack>;
export const StoryViewer = ({ title = "Story", imageUrl = "" }) => <AspectRatio ratio="9 / 16"><Image src={imageUrl} alt={title} height="100%" /></AspectRatio>;

const ChartFrame = ({ title, children }) => <div style={cardBase({ width: "360px" })}><h3 style={{ marginTop: 0 }}>{title}</h3>{children}</div>;
export const LineChart = ({ data = [20, 50, 35, 80, 60] }) => <ChartFrame title="Line Chart"><svg viewBox="0 0 300 120" width="100%" height="140"><polyline fill="none" stroke={colors.accent} strokeWidth="4" points={data.map((v, i) => `${i * 70},${120 - v}`).join(" ")} /></svg></ChartFrame>;
export const BarChart = ({ data = [40, 70, 55, 90] }) => <ChartFrame title="Bar Chart"><Flex align="flex-end" style={{ height: "140px" }}>{data.map((v, i) => <div key={i} style={{ width: "42px", height: `${v}%`, backgroundColor: colors.accent, borderRadius: "6px 6px 0 0" }} />)}</Flex></ChartFrame>;
export const PieChart = ({ value = 65 }) => <ChartFrame title="Pie Chart"><CircularProgress value={value} size={140} /></ChartFrame>;
export const AreaChart = LineChart;
export const RadarChart = LineChart;
export const DonutChart = PieChart;
export const Heatmap = ({ cells = 24 }) => <ChartFrame title="Heatmap"><Grid columns={6} gap="6px">{Array.from({ length: cells }, (_, i) => <div key={i} style={{ height: "28px", borderRadius: "4px", backgroundColor: `rgba(37,99,235,${0.15 + (i % 6) * 0.12})` }} />)}</Grid></ChartFrame>;
export const AnalyticsDashboard = () => <Grid columns={2}><StatisticsCard /><BarChart /><LineChart /><ActivityFeed /></Grid>;

export const Rating = ({ value = 4, max = 5 }) => <span style={{ color: "#f59e0b" }}>{Array.from({ length: max }, (_, i) => i < value ? "★" : "☆").join("")}</span>;
export const CopyButton = ({ text = "Copy me" }) => <button style={buttonBase()} onClick={() => typeof navigator !== "undefined" && navigator.clipboard?.writeText(text)}>Copy</button>;
export const Clipboard = ({ text = "Copy me" }) => <Flex><CodeBlock code={text} /><CopyButton text={text} /></Flex>;
export const ThemeSwitcher = ({ theme = "light", onChange = () => {} }) => <ButtonGroup buttons={["light", "dark"]} active={theme} onClick={onChange} />;
export const LanguageSwitcher = ({ languages = ["EN", "HI"], active = "EN", onChange = () => {} }) => <ButtonGroup buttons={languages} active={active} onClick={onChange} />;
export const ScrollToTop = () => <FloatingActionButton icon="↑" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />;
export const InfiniteScroll = ({ items = ["Item 1", "Item 2"], renderItem }) => <Stack>{items.map((item, i) => <div key={i}>{renderItem ? renderItem(item, i) : item}</div>)}</Stack>;
export const VirtualList = InfiniteScroll;
export const CountdownTimer = ({ seconds = 60 }) => { const [left, setLeft] = useState(seconds); useEffect(() => { const id = setInterval(() => setLeft((v) => Math.max(0, v - 1)), 1000); return () => clearInterval(id); }, []); return <Badge>{left}s</Badge>; };
export const Stopwatch = () => { const [time, setTime] = useState(0); useEffect(() => { const id = setInterval(() => setTime((v) => v + 1), 1000); return () => clearInterval(id); }, []); return <Badge>{time}s</Badge>; };

export const AIChatInterface = ChatWindow;
export const PromptInput = ({ placeholder = "Ask AI...", onSend = () => {} }) => { const [value, setValue] = useState(""); return <Flex><input value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} style={fieldBase()} /><button style={buttonBase()} onClick={() => { onSend(value); setValue(""); }}>Send</button></Flex>; };
export const AIMessageBubble = MessageBubble;
export const AICodeViewer = CodeBlock;
export const AIResponseCard = ({ title = "AI Response", content = "Generated response appears here." }) => <BasicCard title={title} content={content} action="Use" />;
export const AIMarkdownRenderer = ({ markdown = "## Hello\nRendered markdown text." }) => <div style={cardBase()}>{markdown.split("\n").map((line, i) => line.startsWith("## ") ? <h2 key={i}>{line.replace("## ", "")}</h2> : <p key={i}>{line}</p>)}</div>;
export const AIModelSelector = ({ models = ["gpt-5", "gpt-4.1"], value, onChange }) => <Select label="Model" options={models} value={value} onChange={onChange} />;
export const AIThinkingLoader = () => <Flex><Spinner size={20} /><span style={{ color: colors.muted }}>Thinking...</span></Flex>;

export const HeroSection = ({ title = "Build beautiful components", subtitle = "A prop-first React UI library for fast product work.", action = "Start building" }) => <Section padding="80px 24px"><Container><Stack gap="18px" style={{ maxWidth: "680px" }}><h1 style={{ fontSize: "48px", margin: 0 }}>{title}</h1><p style={{ color: colors.muted, fontSize: "18px" }}>{subtitle}</p><button style={buttonBase({ padding: "12px 18px" })}>{action}</button></Stack></Container></Section>;
export const FeaturesSection = ({ features = ["Fast", "Customizable", "Reusable"] }) => <Section><Container><Grid>{features.map((feature) => <FeatureCard key={feature} title={feature} />)}</Grid></Container></Section>;
export const TestimonialsSection = ({ testimonials = ["Loved by teams"] }) => <Section><Container><Grid>{testimonials.map((quote) => <TestimonialCard key={quote} quote={quote} />)}</Grid></Container></Section>;
export const PricingSection = () => <Section><Container><Grid><PricingCard plan="Starter" price="$0" /><PricingCard plan="Pro" price="$19" /><PricingCard plan="Team" price="$49" /></Grid></Container></Section>;
export const FAQSection = () => <Section><Container><Tabs tabs={["What is it?", "Can I customize it?"]} /></Container></Section>;
export const CTASection = ({ title = "Ready to create?", action = "Get started" }) => <Section><Container><Flex justify="space-between" style={cardBase()}><h2>{title}</h2><button style={buttonBase()}>{action}</button></Flex></Container></Section>;
export const TeamSection = ({ members = ["Ana", "Ben", "Cara"] }) => <Section><Container><Grid>{members.map((name) => <TeamCard key={name} name={name} />)}</Grid></Container></Section>;
export const ContactSection = () => <Section><Container><FormWrapper title="Contact"><Input label="Email" /><Input label="Message" /></FormWrapper></Container></Section>;
export const NewsletterSection = () => <Section><Container><Flex><Input label="Newsletter" placeholder="Email address" /><button style={buttonBase()}>Subscribe</button></Flex></Container></Section>;
export const Footer = ({ brand = "Cosmic UI" }) => <footer style={{ padding: "24px", borderTop: `1px solid ${  colors.border}`, color: colors.muted }}>{brand} © 2026</footer>;

export const KanbanBoard = ({ columns = [{ title: "Todo", cards: ["Design"] }, { title: "Done", cards: ["Setup"] }] }) => <Grid columns={columns.length}>{columns.map((column) => <Stack key={column.title} style={cardBase({ shadow: false })}><strong>{column.title}</strong>{column.cards.map((card) => <Box key={card} backgroundColor="#fff">{card}</Box>)}</Stack>)}</Grid>;
export const Scheduler = CalendarPreview;
export const Whiteboard = ({ children = "Whiteboard area" }) => <Center minHeight="360px" style={{ border: `1px dashed ${  colors.border}`, borderRadius: "8px", backgroundColor: "#fff" }}>{children}</Center>;
export const RichTextEditor = ({ value = "Write something...", onChange = () => {} }) => <textarea value={value} onChange={(e) => onChange(e.target.value)} style={cx(fieldBase(), { minHeight: "180px" })} />;
export const MarkdownEditor = RichTextEditor;
export const CommandPalette = CommandMenu;
export const FileExplorer = ({ files = ["src", "package.json", "README.md"] }) => <TreeView items={files.map((label) => ({ label }))} />;
export const WorkflowBuilder = ({ steps = ["Trigger", "Action", "Done"] }) => <Stepper steps={steps} />;
export const DragAndDropList = ({ items = ["First", "Second", "Third"] }) => <Stack>{items.map((item) => <Box key={item}>{item}</Box>)}</Stack>;
export const ResizablePanel = ({ children = "Resize me" }) => <div style={cx(cardBase(), { resize: "both", overflow: "auto", minWidth: "180px", minHeight: "120px" })}>{children}</div>;
export const SplitPane = SplitLayout;
export const MultiStepForm = ({ steps = ["Account", "Profile", "Finish"] }) => <Stack style={cardBase({ width: "480px" })}><Stepper steps={steps} /><FormWrapper title={steps[0]}><Input label="Field" /></FormWrapper></Stack>;

function ProfileSummary({ name = "User", subtitle = "Member", imageUrl = "" }) {
  return <Flex align="center" style={cardBase({ width: "320px", shadow: false })}><Avatar name={name} src={imageUrl} /><div><strong>{name}</strong><div style={{ color: colors.muted, fontSize: "14px" }}>{subtitle}</div></div></Flex>;
}

function CalendarPreview({ days = 30 }) {
  const cells = useMemo(() => Array.from({ length: days }, (_, i) => i + 1), [days]);
  return <Grid columns={7} gap="6px" style={cardBase({ width: "360px" })}>{cells.map((day) => <Center key={day} minHeight="36px" style={{ backgroundColor: day === 13 ? colors.accent : colors.soft, color: day === 13 ? "#fff" : colors.text, borderRadius: "6px" }}>{day}</Center>)}</Grid>;
}
