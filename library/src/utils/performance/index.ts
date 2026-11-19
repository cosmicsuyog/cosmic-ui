export type Cancelable<T extends (...args: never[]) => unknown> = ((
  ...args: Parameters<T>
) => void) & { cancel(): void; flush(): void };

/** Creates a trailing debounce with explicit cancellation and flush controls. */
export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number
): Cancelable<T> {
  if (typeof fn !== "function" || !Number.isFinite(delay) || delay < 0)
    throw new TypeError("debounce requires a function and a non-negative delay.");
  let timer: ReturnType<typeof setTimeout> | undefined, args: Parameters<T> | undefined;
  const invoke = () => {
    timer = undefined;
    if (args) {
      const pending = args;
      args = undefined;
      fn(...pending);
    }
  };
  const wrapped = ((...nextArgs: Parameters<T>) => {
    args = nextArgs;
    if (timer) clearTimeout(timer);
    timer = setTimeout(invoke, delay);
  }) as Cancelable<T>;
  wrapped.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    args = undefined;
  };
  wrapped.flush = () => {
    if (timer) {
      clearTimeout(timer);
      invoke();
    }
  };
  return wrapped;
}

/** Creates a leading-and-trailing throttle with explicit cancellation and flush controls. */
export function throttle<T extends (...args: never[]) => unknown>(
  fn: T,
  interval: number
): Cancelable<T> {
  if (typeof fn !== "function" || !Number.isFinite(interval) || interval < 0)
    throw new TypeError("throttle requires a function and a non-negative interval.");
  let last = 0,
    timer: ReturnType<typeof setTimeout> | undefined,
    args: Parameters<T> | undefined;
  const invoke = () => {
    last = Date.now();
    timer = undefined;
    if (args) {
      const pending = args;
      args = undefined;
      fn(...pending);
    }
  };
  const wrapped = ((...nextArgs: Parameters<T>) => {
    args = nextArgs;
    const remaining = interval - (Date.now() - last);
    if (remaining <= 0 || !last) {
      if (timer) clearTimeout(timer);
      invoke();
    } else if (!timer) timer = setTimeout(invoke, remaining);
  }) as Cancelable<T>;
  wrapped.cancel = () => {
    if (timer) clearTimeout(timer);
    timer = undefined;
    args = undefined;
  };
  wrapped.flush = () => {
    if (timer) {
      clearTimeout(timer);
      invoke();
    }
  };
  return wrapped;
}
