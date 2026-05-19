# UI Component Library - Design System Guide

## 🎨 Design Philosophy

Our component library embraces a **"Soft Minimalism"** aesthetic — clean, friendly, and delightfully subtle. We believe great design gets out of the way while making interactions feel like a warm hug.

**Core Principles:**

- **Clarity First**: Every element has a clear purpose
- **Warmth & Approachability**: Cute without being childish
- **Motion with Purpose**: Animations enhance, never distract
- **Generous Spacing**: Breathing room between elements
- **Subtle Depth**: Layers create visual hierarchy through soft shadows

---

## 🎭 Color Palette

Our color system balances playfulness with sophistication. All colors work together harmoniously.

### Primary Colors (Main Brand Colors)

```
Soft Cream:    #FFFBF7  (backgrounds, warmth)
Gentle Gray:   #F5F3F1  (secondary backgrounds)
Charcoal:      #2A2622  (primary text, depth)
Warm Accent:   #E8a06e  (interactions, highlights) - warm peach/tan
Soft Pink:     #F4d4d4  (subtle highlights, hover states)
```

### Secondary Color Palette

```
Soft Blue:     #D4E8F0  (info, secondary actions)
Soft Green:    #D4f0df  (success, positive actions)
Soft Red:      #f0d4d4  (error, alerts - gentle, not alarming)
Soft Purple:   #E8D4F0  (special, premium features)
Soft Yellow:   #F0E8D4  (warnings, important but not critical)
```

### Neutral Colors

```
Text Primary:      #2A2622  (main text)
Text Secondary:    #6F6B67  (labels, captions)
Text Tertiary:     #A5A39F  (disabled, subtle text)
Divider:           #E5E1DD  (borders, separators)
White:             #FFFFFF (surfaces, cards)
```

### Usage Guidelines

**Warm Accent (#E8A06E)** - Use for:

- Primary buttons
- Hover states on interactive elements
- Active states
- Call-to-action elements
- Focus indicators (with opacity)

**Soft Pink (#F4D4D4)** - Use for:

- Subtle hover backgrounds
- Badge backgrounds
- Status indicators
- Gentle highlights

**Color Harmony Rule**:

- Use no more than 3 colors per component
- Let neutral colors (gray/cream) dominate (70%)
- Accent colors should be supporting actors (20%)
- Secondary colors for status/state variations (10%)

---

## 🔤 Typography System

Pairing distinctive fonts with refined body text creates the "cute but sophisticated" feel.

### Font Stack

**Display Font (Headings):**

```css
font-family: "Sora", "Trebuchet MS", sans-serif;
font-weight: 600-700;
letter-spacing: -0.01em;
```

_Why Sora?_ Warm, geometric, friendly, and slightly playful. Modern but not cold.

**Body Font (Text & UI):**

```css
font-family:
  "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell",
  "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
font-weight: 400-500;
line-height: 1.5;
```

_Why System Fonts?_ Crystal clear on any device, loads instantly, optimized for readability.

### Type Scale

| Level      | Size | Weight | Line-Height | Usage            |
| ---------- | ---- | ------ | ----------- | ---------------- |
| **H1**     | 32px | 700    | 1.2         | Page titles      |
| **H2**     | 24px | 700    | 1.25        | Section headers  |
| **H3**     | 18px | 600    | 1.3         | Card titles      |
| **H4**     | 16px | 600    | 1.4         | Subheadings      |
| **Body L** | 16px | 400    | 1.5         | Main body text   |
| **Body M** | 14px | 400    | 1.5         | Default UI text  |
| **Body S** | 12px | 400    | 1.6         | Labels, captions |
| **Tiny**   | 11px | 500    | 1.5         | Metadata, hints  |

### Text Color Combinations

- **Primary text**: Charcoal on Soft Cream/White
- **Secondary text**: Gentle Gray (Text Secondary) on White
- **Disabled text**: Text Tertiary with 50% opacity
- **Inverted**: White text on Charcoal backgrounds
- **Accent text**: Warm Accent for interactive text elements

---

## 🧩 Component Design Tokens

### Spacing Scale (8px base)

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

**Rule**: Always use the scale. Never hardcode spacing values.

### Border Radius

```css
--radius-sm: 4px;      /* inputs, small buttons *)
--radius-md: 8px;      /* cards, badges, medium elements *)
--radius-lg: 12px;     /* larger cards, modals *)
--radius-full: 9999px; /* pills, fully rounded *)
```

### Shadow System

```css
/* Soft, subtle shadows for depth */
--shadow-sm: 0 1px 2px rgba(42, 38, 34, 0.05);
--shadow-md: 0 4px 12px rgba(42, 38, 34, 0.08);
--shadow-lg: 0 12px 24px rgba(42, 38, 34, 0.12);
--shadow-xl: 0 20px 40px rgba(42, 38, 34, 0.15);
```

_Note_: Our shadows are warm-toned (using charcoal) rather than cold black, maintaining the warm aesthetic.

### Border System

```css
--border-thin: 1px solid #e5e1dd;
--border-standard: 1px solid #d4ccc7;
--border-focus: 2px solid #e8a06e;
```

---

## ⏱️ Animation & Motion System

### Philosophy

Our animations serve 3 purposes:

1. **Feedback**: Confirm user actions
2. **Navigation**: Guide attention between states
3. **Delight**: Small moments that spark joy

**Golden Rule**: Animations should be fast (200-400ms), smooth, and feel natural—like physics, not mathematics.

### Animation Presets

```css
/* Timing Functions */
--ease-out: cubic-bezier(0.33, 0.66, 0.66, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.33, 0, 0.67, 0.33);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Core Animation Types

#### 1. **Entrance Animations** (Page Load, Modals)

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

animation: fadeInUp 400ms var(--ease-out) forwards;
animation-delay: var(--stagger-delay); /* 50-100ms between items */
```

**Use Case**: Cards loading on page, modal appears, list items appear

**Timing**: 400ms base, with staggered delays of 50ms for sequential items

---

#### 2. **Button & Interactive Feedback**

```css
/* Hover State */
@keyframes buttonHover {
  to {
    background-color: #e8a06e;
    transform: scale(1.02);
  }
}

/* Click Feedback (Ripple/Scale) */
@keyframes buttonPress {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.96);
  }
}

.button:hover {
  animation: buttonHover 200ms var(--ease-out) forwards;
}

.button:active {
  animation: buttonPress 100ms var(--ease-in) forwards;
}
```

**Timing**: 200ms hover, 100ms press
**Behavior**: Slight scale + color change creates friendly, responsive feel

---

#### 3. **Smooth Transitions (State Changes)**

```css
/* Default transition for most interactive elements */
transition: all 200ms var(--ease-in-out);

/* Specific property transitions */
transition:
  background-color 200ms var(--ease-in-out),
  color 200ms var(--ease-in-out),
  border-color 200ms var(--ease-in-out);
```

**Use Case**: Toggle switches, checkbox states, color changes on hover

**Timing**: 200ms keeps interactions snappy without feeling abrupt

---

#### 4. **Loading States**

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Shimmer (skeleton) */
.skeleton {
  animation: shimmer 2s infinite;
  background: linear-gradient(90deg, #f5f3f1, #fffbf7, #f5f3f1);
  background-size: 1000px 100%;
}

/* Spinner */
.spinner {
  animation: spin 1s linear infinite;
}
```

**Timing**: 2s for shimmer, 1s for spinner
**Effect**: Feels natural, not rushed

---

#### 5. **Micro-interactions (Delight)**

**Success Checkmark**:

```css
@keyframes checkScale {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-icon {
  animation: checkScale 400ms var(--ease-bounce);
}
```

**Bounce on appear** - makes it feel alive!

**Slide & Fade for Toast/Notifications**:

```css
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.toast {
  animation: slideInRight 300ms var(--ease-out) forwards;
}
```

---

#### 6. **Scroll-Triggered Animations**

Use Intersection Observer API (or libraries like AOS, Framer Motion):

```css
@keyframes fadeInFromBottom {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.element-on-scroll {
  animation: fadeInFromBottom 600ms var(--ease-out) both;
}
```

**Effect**: Elements fade in as user scrolls, creates journey feeling

---

### Animation Best Practices

| Scenario           | Duration  | Easing      | Notes                   |
| ------------------ | --------- | ----------- | ----------------------- |
| Button hover/focus | 200ms     | ease-out    | Quick, responsive       |
| Button click       | 100ms     | ease-in     | Snappy, tactile         |
| Modal appear       | 300-400ms | ease-out    | Noticeable but not slow |
| Transition states  | 200ms     | ease-in-out | Smooth change           |
| Loading spinner    | 1s        | linear      | Consistent              |
| Success feedback   | 400ms     | ease-bounce | Celebratory!            |
| Scroll reveal      | 600ms     | ease-out    | Smooth reveal           |
| Tooltip appear     | 200ms     | ease-out    | Quick popup             |
| Dropdown open      | 250ms     | ease-out    | Fluid expansion         |

### CSS Custom Properties for Animations

```css
:root {
  --transition-fast: 100ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
  --transition-slower: 400ms;

  --timing-ease-out: cubic-bezier(0.33, 0.66, 0.66, 1);
  --timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --timing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Usage in components */
.button {
  transition: all var(--transition-base) var(--timing-ease-out);
}

.modal {
  animation: fadeInUp var(--transition-slower) var(--timing-ease-out);
}
```

---

## 🎯 Component Examples

### Button Component

**States & Animations**:

```css
.button {
  background: linear-gradient(135deg, #e8a06e 0%, #e8966d 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms var(--ease-in-out);
  box-shadow: var(--shadow-sm);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.button:focus-visible {
  outline: 2px solid #e8a06e;
  outline-offset: 2px;
}

.button:disabled {
  background: #d4ccc7;
  color: #a5a39f;
  cursor: not-allowed;
  transform: none;
}
```

### Card Component

```css
.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e1dd;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 200ms var(--ease-in-out);
}

.card:hover {
  border-color: #e8a06e;
  box-shadow: var(--shadow-md);
}
```

### Input Component

```css
.input {
  padding: 12px 16px;
  border: 1px solid #e5e1dd;
  border-radius: 8px;
  font-family: inherit;
  font-size: 14px;
  transition: all 200ms var(--ease-in-out);
}

.input:focus {
  outline: none;
  border-color: #e8a06e;
  box-shadow: 0 0 0 3px rgba(232, 160, 110, 0.1);
  background: #fffbf7;
}

.input:hover {
  border-color: #d4ccc7;
}
```

---

## 🎪 Animation in React Components

### Using CSS Classes with Animations

```jsx
import { useState } from "react";
import "./animations.css";

export const Modal = ({ isOpen }) => {
  return <div className={isOpen ? "modal modal--open" : "modal"}>{/* content */}</div>;
};
```

```css
.modal {
  opacity: 0;
  visibility: hidden;
}

.modal--open {
  animation: fadeInUp 400ms cubic-bezier(0.33, 0.66, 0.66, 1) forwards;
  visibility: visible;
}
```

### Using Framer Motion (Recommended for Complex Animations)

```jsx
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const CardList = ({ cards }) => {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {cards.map((card) => (
        <motion.div key={card.id} variants={itemVariants}>
          {card.content}
        </motion.div>
      ))}
    </motion.div>
  );
};
```

---

## ♿ Accessibility + Animation

**Important**: Respect user motion preferences!

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

This ensures users who prefer reduced motion don't experience dizziness or discomfort.

---

## 🎨 Design Tokens CSS File

Create a `tokens.css` file in your project:

```css
:root {
  /* Colors */
  --color-cream: #fffbf7;
  --color-gray-light: #f5f3f1;
  --color-gray-neutral: #e5e1dd;
  --color-gray-dark: #6f6b67;
  --color-charcoal: #2a2622;

  --color-accent-warm: #e8a06e;
  --color-accent-pink: #f4d4d4;
  --color-accent-blue: #d4e8f0;
  --color-accent-green: #d4f0df;
  --color-accent-red: #f0d4d4;

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Typography */
  --font-display: "Sora", "Trebuchet MS", sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(42, 38, 34, 0.05);
  --shadow-md: 0 4px 12px rgba(42, 38, 34, 0.08);
  --shadow-lg: 0 12px 24px rgba(42, 38, 34, 0.12);
  --shadow-xl: 0 20px 40px rgba(42, 38, 34, 0.15);

  /* Transitions */
  --transition-fast: 100ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
  --transition-slower: 400ms;

  /* Timing Functions */
  --ease-out: cubic-bezier(0.33, 0.66, 0.66, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.33, 0, 0.67, 0.33);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

## 📋 Quick Reference Checklist

- [ ] All colors use CSS custom properties from tokens
- [ ] Text always uses approved font families
- [ ] Spacing always aligns to 8px base scale
- [ ] All interactive elements have 200ms transitions
- [ ] Hover states are included (color or scale change)
- [ ] Focus states visible (outline or background)
- [ ] Disabled states clearly differentiated
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No animation longer than 600ms without good reason
- [ ] Loading states use shimmer or spinner
- [ ] Error states use soft red accent
- [ ] Success feedback includes micro-animation
- [ ] All shadows use warm-toned charcoal, not black

---

## 🌟 Inspiration & References

The design draws from:

- **Forma.app** - Minimalism, whitespace, clarity
- **Apple Design System** - Warmth, system fonts, subtle motion
- **Stripe** - Playful accents, clean components
- **Linear** - Smooth transitions, delightful micro-interactions

---

## 📝 Notes for Developers

- Use CSS custom properties everywhere for consistency
- Animate `transform` and `opacity` for best performance
- Avoid animating `width`, `height`, `left`, `top`
- Test animations on slower devices (performance!)
- Always include focus states for keyboard users
- Group related animations with staggered delays for visual flow
- Ask: "Does this animation _help_ the user or distract?"

---

**Created with ❤️ for a library that feels like a warm hug.**
