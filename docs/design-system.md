# Design system

Cosmic UI uses a **"Soft Minimalism"** aesthetic: warm neutrals, peach accent, generous spacing, and purposeful motion.

The canonical, detailed guide lives at:

**[`client/src/Design/design.md`](../client/src/Design/design.md)**

This document summarizes what is **implemented in code** today.

## Philosophy

| Principle           | Implementation                                    |
| ------------------- | ------------------------------------------------- |
| Clarity first       | Limited palette per component; strong hierarchy   |
| Warmth              | Cream backgrounds, charcoal text, peach accent    |
| Motion with purpose | Framer Motion on login; CSS transitions elsewhere |
| Generous spacing    | 8px base scale in tokens                          |
| Subtle depth        | Warm charcoal-tinted shadows                      |

## Colors (implemented in `client/src/app/index.css`)

### Primary

| Token           | Hex       | Tailwind / usage                |
| --------------- | --------- | ------------------------------- |
| Cream / surface | `#FFFBF7` | `bg-surface`, `bg-soft-cream`   |
| Gray light      | `#F5F3F1` | `bg-surface-dim`                |
| Charcoal        | `#2A2622` | `text-charcoal`, dark panels    |
| Warm accent     | `#E8A06E` | `text-warm-accent`, CTAs, focus |
| Soft pink       | `#F4D4D4` | `--color-pink-soft`             |

### Secondary (status / highlights)

| Token       | Hex       |
| ----------- | --------- |
| Soft blue   | `#D4E8F0` |
| Soft green  | `#D4F0DF` |
| Soft red    | `#F0D4D4` |
| Soft purple | `#E8D4F0` |
| Soft yellow | `#F0E8D4` |

### Text & borders

| Role           | Hex       |
| -------------- | --------- |
| Primary text   | `#2A2622` |
| Secondary text | `#6F6B67` |
| Tertiary text  | `#A5A39F` |
| Divider        | `#E5E1DD` |

## Typography

| Role               | Font                         | Size token                         |
| ------------------ | ---------------------------- | ---------------------------------- |
| Display / headings | Sora (`--font-sora`)         | `--text-h1` … `--text-h4`          |
| Body               | System stack (`--font-body`) | `--text-body-l/m/s`, `--text-tiny` |

**Type scale (from tokens):**

| Level  | Size | Weight |
| ------ | ---- | ------ |
| H1     | 32px | 700    |
| H2     | 24px | 700    |
| H3     | 18px | 600    |
| H4     | 16px | 600    |
| Body L | 16px | 400    |
| Body M | 14px | 400    |
| Body S | 12px | 400    |
| Tiny   | 11px | 500    |

## Spacing (8px base)

```
--spacing-xs:  4px
--spacing-sm:  8px
--spacing-md:  16px
--spacing-lg:  24px
--spacing-xl:  32px
--spacing-2xl: 48px
```

## Border radius

```
--radius-sm:  4px
--radius-md:  8px
--radius-lg:  12px  (also --radius-custom)
--radius-full: 9999px
```

## Shadows

Warm charcoal-tinted shadows (`rgba(42, 38, 34, …)`):

- `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`

## Motion

Login page (`LoginPage.jsx`) uses **Framer Motion**:

- Auto-rotating steps every 4s (pauses on hover)
- `layoutId="active-step-bg"` for shared layout animation on desktop
- `AnimatePresence` for step descriptions

Global CSS in `index.css` includes animation utilities (e.g. `animate-fade-in`) and should respect `prefers-reduced-motion` per design.md guidelines.

## Using tokens in components

**Tailwind (preferred on client):**

```jsx
<div className="bg-soft-cream text-charcoal font-sora rounded-custom">...</div>
```

**CSS variables:**

```jsx
<div style={{ backgroundColor: "var(--color-cream)" }}>...</div>
```

## Library vs client styling

| Package    | Styling approach                                  |
| ---------- | ------------------------------------------------- |
| `client/`  | Tailwind + `@theme` tokens                        |
| `library/` | Inline `style` objects; default blue/gray palette |

Aligning library components with Cosmic tokens is a future improvement.

## Accessibility

From the design guide:

- Visible focus states (`focus-visible`, accent outline)
- Respect `prefers-reduced-motion: reduce`
- Sufficient contrast: charcoal on cream/white

## References (design inspiration)

Forma, Apple HIG, Stripe, Linear — cited in `design.md`.
