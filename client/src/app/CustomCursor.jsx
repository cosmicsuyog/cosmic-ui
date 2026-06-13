import { useEffect, useRef } from "react";

const interactiveSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "[role='button']",
  "[tabindex]:not([tabindex='-1'])",
  ".cursor-pointer",
].join(",");

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!supportsFinePointer) {
      return undefined;
    }

    const root = document.documentElement;
    root.classList.add("cosmic-custom-cursor-enabled");

    const setCursorPosition = (event) => {
      const point = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorRef.current.style.transform = point;
      ringRef.current.style.transform = point;
      cursorRef.current.classList.add("is-visible");
      ringRef.current.classList.add("is-visible");
    };

    const setCursorVisible = () => {
      cursorRef.current.classList.add("is-visible");
      ringRef.current.classList.add("is-visible");
    };

    const setCursorHidden = () => {
      cursorRef.current.classList.remove("is-visible");
      ringRef.current.classList.remove("is-visible");
    };

    const setInteractiveState = (event) => {
      const isInteractive = Boolean(event.target.closest(interactiveSelector));
      const isTextInput = Boolean(event.target.closest("input, textarea, [contenteditable='true']"));

      cursorRef.current.classList.toggle("is-interactive", isInteractive);
      ringRef.current.classList.toggle("is-interactive", isInteractive);
      cursorRef.current.classList.toggle("is-text-input", isTextInput);
      ringRef.current.classList.toggle("is-text-input", isTextInput);
    };

    const setPressed = () => {
      cursorRef.current.classList.add("is-pressed");
      ringRef.current.classList.add("is-pressed");
    };

    const clearPressed = () => {
      cursorRef.current.classList.remove("is-pressed");
      ringRef.current.classList.remove("is-pressed");
    };

    window.addEventListener("pointermove", setCursorPosition);
    window.addEventListener("pointermove", setInteractiveState);
    window.addEventListener("pointerenter", setCursorVisible);
    window.addEventListener("pointerleave", setCursorHidden);
    window.addEventListener("pointerdown", setPressed);
    window.addEventListener("pointerup", clearPressed);
    window.addEventListener("blur", setCursorHidden);
    window.addEventListener("focus", setCursorVisible);

    return () => {
      root.classList.remove("cosmic-custom-cursor-enabled");
      window.removeEventListener("pointermove", setCursorPosition);
      window.removeEventListener("pointermove", setInteractiveState);
      window.removeEventListener("pointerenter", setCursorVisible);
      window.removeEventListener("pointerleave", setCursorHidden);
      window.removeEventListener("pointerdown", setPressed);
      window.removeEventListener("pointerup", clearPressed);
      window.removeEventListener("blur", setCursorHidden);
      window.removeEventListener("focus", setCursorVisible);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cosmic-cursor-ring" aria-hidden="true" />
      <div ref={cursorRef} className="cosmic-cursor-mark" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" focusable="false">
          <path
            d="M5.5 3.75 22.5 14.3 14.08 16.42 10.1 24.4 5.5 3.75Z"
            fill="#2A2622"
            stroke="#FFFBF7"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
          <path d="M8.75 8.05 18.25 13.98 13.15 15.28 10.78 19.98 8.75 8.05Z" fill="#E8A06E" />
        </svg>
      </div>
    </>
  );
};

export default CustomCursor;
