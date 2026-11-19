/** Browser APIs with availability checks and teardown functions where listeners are registered. */
export type StorageType = "local" | "session";

const hasWindow = () => typeof window !== "undefined";
const requireWindow = () => {
  if (!hasWindow())
    throw new Error("This browser utility cannot run during server-side rendering.");
};

/** Copies text with a legacy fallback for browsers without the Clipboard API. */
export async function copyToClipboard(text: string): Promise<void> {
  requireWindow();
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Clipboard write is not supported by this browser.");
}

/** Reads clipboard text when permission and browser support allow it. */
export function readClipboard(): Promise<string> {
  requireWindow();
  if (!navigator.clipboard?.readText)
    return Promise.reject(new Error("Clipboard read is not supported by this browser."));
  return navigator.clipboard.readText();
}

export function isDarkMode(): boolean {
  return hasWindow() && window.matchMedia?.("(prefers-color-scheme: dark)").matches === true;
}

export function toggleDarkMode(className = "dark"): boolean {
  requireWindow();
  return document.documentElement.classList.toggle(className);
}

/** Subscribes to system-theme changes and returns an unsubscribe function. */
export function onThemeChange(callback: (isDark: boolean) => void): () => void {
  requireWindow();
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const listener = () => callback(media.matches);
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  heading?: number | null;
  speed?: number | null;
  timestamp: number;
}
export type LocationOptions = PositionOptions;
const toCoordinates = (position: GeolocationPosition): Coordinates => ({
  ...position.coords,
  latitude: position.coords.latitude,
  longitude: position.coords.longitude,
  accuracy: position.coords.accuracy,
  altitude: position.coords.altitude,
  heading: position.coords.heading,
  speed: position.coords.speed,
  timestamp: position.timestamp,
});

export function getCurrentLocation(options?: LocationOptions): Promise<Coordinates> {
  requireWindow();
  if (!navigator.geolocation)
    return Promise.reject(new Error("Geolocation is not supported by this browser."));
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(toCoordinates(position)),
      reject,
      options
    )
  );
}

export function watchLocation(
  callback: (location: Coordinates) => void,
  onError?: PositionErrorCallback,
  options?: LocationOptions
): number {
  requireWindow();
  if (!navigator.geolocation) throw new Error("Geolocation is not supported by this browser.");
  return navigator.geolocation.watchPosition(
    (position) => callback(toCoordinates(position)),
    onError,
    options
  );
}

export function clearLocationWatch(id: number): void {
  navigator.geolocation?.clearWatch(id);
}

export interface ConnectionInfo {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  isSupported: boolean;
}
export function getConnectionInfo(): ConnectionInfo {
  const connection = hasWindow()
    ? (navigator as Navigator & { connection?: Omit<ConnectionInfo, "isSupported"> }).connection
    : undefined;
  return connection ? { ...connection, isSupported: true } : { isSupported: false };
}
export function isOnline(): boolean {
  return hasWindow() && navigator.onLine;
}
export function onNetworkChange(callback: (online: boolean) => void): () => void {
  requireWindow();
  const listener = () => callback(navigator.onLine);
  window.addEventListener("online", listener);
  window.addEventListener("offline", listener);
  return () => {
    window.removeEventListener("online", listener);
    window.removeEventListener("offline", listener);
  };
}
export interface PingResult {
  success: boolean;
  status?: number;
  time?: number;
  error?: string;
}
export async function ping(url: string): Promise<PingResult> {
  if (!/^https?:\/\//.test(url)) throw new TypeError("ping requires an absolute http(s) URL.");
  const start = performance.now();
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    return {
      success: response.ok,
      status: response.status,
      time: Math.round(performance.now() - start),
    };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
export interface SpeedTestResult {
  speedMbps: number;
  timeTaken: number;
  success: boolean;
  error?: string;
}
/** Measures local Blob read throughput; it is not a real internet bandwidth measurement. */
export async function testNetworkSpeed(sizeInMB = 1): Promise<SpeedTestResult> {
  if (!Number.isFinite(sizeInMB) || sizeInMB <= 0)
    throw new TypeError("sizeInMB must be a positive number.");
  const bytes = sizeInMB * 1024 * 1024,
    start = performance.now(),
    url = URL.createObjectURL(new Blob([new Uint8Array(bytes)]));
  try {
    await fetch(url).then((response) => response.arrayBuffer());
    const timeTaken = Math.max(1, performance.now() - start);
    return {
      success: true,
      speedMbps: Number(((bytes * 8) / (timeTaken / 1000) / 1048576).toFixed(2)),
      timeTaken: Math.round(timeTaken),
    };
  } catch (error) {
    return {
      success: false,
      speedMbps: 0,
      timeTaken: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function requestNotificationPermission(): Promise<NotificationPermission> {
  requireWindow();
  if (!("Notification" in window))
    return Promise.reject(new Error("Notifications are not supported by this browser."));
  return Notification.requestPermission();
}
/** Sends a notification and returns it so callers can attach their own lifecycle handlers. */
export function sendNotification(title: string, options?: NotificationOptions): Notification {
  requireWindow();
  if (!("Notification" in window) || Notification.permission !== "granted")
    throw new Error("Notification permission has not been granted.");
  return new Notification(title, options);
}

const storageFor = (type: StorageType): Storage | null => {
  if (!hasWindow()) return null;
  try {
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    const key = "__cosmic_ui_storage_probe__";
    storage.setItem(key, key);
    storage.removeItem(key);
    return storage;
  } catch {
    return null;
  }
};
export function setItem<T>(key: string, value: T, type: StorageType = "local"): boolean {
  try {
    storageFor(type)?.setItem(key, JSON.stringify(value));
    return Boolean(storageFor(type));
  } catch {
    return false;
  }
}
export function getItem<T>(key: string, type: StorageType = "local"): T | null {
  try {
    const item = storageFor(type)?.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch {
    return null;
  }
}
export function removeItem(key: string, type: StorageType = "local"): boolean {
  try {
    storageFor(type)?.removeItem(key);
    return Boolean(storageFor(type));
  } catch {
    return false;
  }
}
export function clearStorage(type: StorageType = "local"): boolean {
  try {
    storageFor(type)?.clear();
    return Boolean(storageFor(type));
  } catch {
    return false;
  }
}
export function hasItem(key: string, type: StorageType = "local"): boolean {
  return storageFor(type)?.getItem(key) !== null;
}
export function getAllKeys(type: StorageType = "local"): string[] {
  const storage = storageFor(type);
  return storage
    ? Array.from({ length: storage.length }, (_, index) => storage.key(index)).filter(
        (key): key is string => key !== null
      )
    : [];
}

export interface ScreenInfo {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  devicePixelRatio: number;
  orientation: string;
  isLandscape: boolean;
}
export function getScreenInfo(): ScreenInfo {
  requireWindow();
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    devicePixelRatio: window.devicePixelRatio,
    orientation: screen.orientation?.type ?? "unknown",
    isLandscape: window.innerWidth > window.innerHeight,
  };
}
export function onScreenResize(callback: (info: ScreenInfo) => void): () => void {
  requireWindow();
  const listener = () => callback(getScreenInfo());
  window.addEventListener("resize", listener);
  window.addEventListener("orientationchange", listener);
  return () => {
    window.removeEventListener("resize", listener);
    window.removeEventListener("orientationchange", listener);
  };
}
export function isTabVisible(): boolean {
  return hasWindow() && document.visibilityState === "visible";
}
export function onTabVisibilityChange(callback: (visible: boolean) => void): () => void {
  requireWindow();
  const listener = () => callback(isTabVisible());
  document.addEventListener("visibilitychange", listener);
  return () => document.removeEventListener("visibilitychange", listener);
}
export function vibrate(pattern: VibratePattern): boolean {
  return hasWindow() && "vibrate" in navigator ? navigator.vibrate(pattern) : false;
}
export function stopVibration(): boolean {
  return vibrate(0);
}

export interface BatteryManagerLike extends EventTarget {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
}
export async function getBattery(): Promise<BatteryManagerLike> {
  requireWindow();
  const getBattery = (navigator as Navigator & { getBattery?: () => Promise<BatteryManagerLike> })
    .getBattery;
  if (!getBattery) throw new Error("Battery API is not supported by this browser.");
  return getBattery.call(navigator);
}
export async function getBatteryLevel(): Promise<number> {
  return (await getBattery()).level * 100;
}
export async function isBatteryCharging(): Promise<boolean> {
  return (await getBattery()).charging;
}
export async function onBatteryChange(
  callback: (battery: BatteryManagerLike) => void
): Promise<() => void> {
  const battery = await getBattery();
  const listener = () => callback(battery);
  battery.addEventListener("levelchange", listener);
  battery.addEventListener("chargingchange", listener);
  return () => {
    battery.removeEventListener("levelchange", listener);
    battery.removeEventListener("chargingchange", listener);
  };
}

let idleTimer: ReturnType<typeof setTimeout> | undefined;
let idleListener: (() => void) | undefined;
const idleEvents = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"] as const;
/** Starts one shared idle timer. Call stopIdleTimer when the owning view unmounts. */
export function startIdleTimer(timeout: number, callback: () => void): () => void {
  requireWindow();
  if (!Number.isFinite(timeout) || timeout < 0)
    throw new TypeError("timeout must be a non-negative number.");
  stopIdleTimer();
  idleListener = () => {
    if (idleTimer) clearTimeout(idleTimer);
    idleTimer = setTimeout(callback, timeout);
  };
  idleEvents.forEach((event) => window.addEventListener(event, idleListener!, { passive: true }));
  idleListener();
  return stopIdleTimer;
}
export function resetIdleTimer(): void {
  idleListener?.();
}
export function stopIdleTimer(): void {
  if (hasWindow() && idleListener)
    idleEvents.forEach((event) => window.removeEventListener(event, idleListener!));
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = undefined;
  idleListener = undefined;
}

let preventCloseListener: ((event: BeforeUnloadEvent) => void) | undefined;
export function enablePreventClose(): void {
  requireWindow();
  if (preventCloseListener) return;
  preventCloseListener = (event) => {
    event.preventDefault();
    event.returnValue = true;
  };
  window.addEventListener("beforeunload", preventCloseListener);
}
export function disablePreventClose(): void {
  if (preventCloseListener) window.removeEventListener("beforeunload", preventCloseListener);
  preventCloseListener = undefined;
}
