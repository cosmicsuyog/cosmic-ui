# Component library

**Package name:** `cosmic-ui-library`  
**Location:** `library/`  
**Description:** React UI components for Cosmic UI (publishable npm package).

## Build

```bash
cd library
npm install
npm run build
```

**Tool:** [tsup](https://tsup.egoist.dev/) — bundles `src/index.js` to:

| Output           | Format   |
| ---------------- | -------- |
| `dist/index.js`  | CommonJS |
| `dist/index.mjs` | ESM      |

**Config (`tsup.config.js`):**

- `external: ["react"]` — React is not bundled
- `dts: false` — no TypeScript declarations generated yet
- `clean: true` — clears `dist` before build

## package.json highlights

```json
{
  "name": "cosmic-ui-library",
  "version": "1.0.1",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "peerDependencies": { "react": ">=18" }
}
```

## Installation (in another project)

```bash
npm install cosmic-ui-library
# or link locally: npm link from library/dist after build
```

```javascript
import { Button, Card, ProfileCard } from "cosmic-ui-library";
```

## Exported components

### `Button`

Configurable button with hover color transition.

| Prop                   | Default       | Description                    |
| ---------------------- | ------------- | ------------------------------ |
| `text`                 | `"Click me"`  | Label                          |
| `backgroundColor`      | `#007bff`     | Background                     |
| `hoverBackgroundColor` | `#0056b3`     | Hover background               |
| `textColor`            | `#ffffff`     | Text color                     |
| `size`                 | `"medium"`    | `small` \| `medium` \| `large` |
| `borderRadius`         | `"4px"`       | Corner radius                  |
| `padding`              | `"10px 20px"` | Override padding               |
| `fontSize`             | `"16px"`      | Font size                      |
| `disabled`             | `false`       | Disables interaction           |
| `onClick`              | `() => {}`    | Click handler                  |

Uses inline styles and local hover state.

---

### `Card`

Content card with optional image and CTA button.

| Prop              | Default           | Description           |
| ----------------- | ----------------- | --------------------- |
| `title`           | `"Card Title"`    | Heading               |
| `subtitle`        | `"Card Subtitle"` | Subheading            |
| `content`         | long default text | Body copy             |
| `imageUrl`        | `""`              | Optional header image |
| `imageAlt`        | `"Card image"`    | Alt text              |
| `backgroundColor` | `#ffffff`         | Card background       |
| `textColor`       | `#333333`         | Text color            |
| `accentColor`     | `#007bff`         | Button color          |
| `borderRadius`    | `"8px"`           | Corners               |
| `shadow`          | `true`            | Box shadow            |
| `hoverable`       | `true`            | Lift on hover         |
| `width`           | `"320px"`         | Card width            |
| `padding`         | `"20px"`          | Inner padding         |
| `buttonText`      | `"Learn More"`    | CTA label             |
| `showButton`      | `true`            | Show/hide button      |
| `onButtonClick`   | `() => {}`        | Button callback       |

---

### `ProfileCard`

User profile card with avatar, bio, contact info, and actions.

| Prop                        | Default               | Description                       |
| --------------------------- | --------------------- | --------------------------------- |
| `name`                      | `"John Doe"`          | Display name                      |
| `role`                      | `"Software Engineer"` | Job title                         |
| `company`                   | `"Tech Corp"`         | Company                           |
| `location`                  | `"San Francisco, CA"` | Location                          |
| `avatarUrl`                 | placeholder URL       | Profile image                     |
| `coverImageUrl`             | `""`                  | Cover banner image                |
| `email`, `phone`, `website` | sample values         | Contact fields                    |
| `bio`                       | long default          | Biography text                    |
| `backgroundColor`           | `#ffffff`             | Card background                   |
| `textColor`                 | `#333333`             | Primary text                      |
| `accentColor`               | `#4f46e5`             | Accent (indigo default)           |
| `borderRadius`              | `"16px"`              | Card radius                       |
| `shadow`                    | `true`                | Drop shadow                       |
| `showContactInfo`           | `true`                | Contact block                     |
| `showSocialLinks`           | `true`                | Twitter / LinkedIn / GitHub links |
| `onConnect`                 | `() => {}`            | Primary button                    |
| `onMessage`                 | `() => {}`            | Secondary button                  |

Includes a **Follow / Following** toggle in the top-right corner.

## Source layout

```
library/src/
├── index.js                    # Re-exports all components
└── components/
    ├── Button/Button.jsx
    ├── Card/Card.jsx
    └── ProfileCard/ProfileCard.jsx
```

## Design alignment

Library components use **generic blue/gray defaults**, not the Cosmic cream/charcoal/warm-accent tokens from `client/src/app/index.css`. To align:

1. Import shared CSS variables, or
2. Accept theme props matching design tokens, or
3. Ship a `@cosmic-ui/theme` package

See [Design system](./design-system.md).

## Publishing checklist

- [ ] Run `npm run build`
- [ ] Bump version in `library/package.json`
- [ ] Verify `files: ["dist"]` includes built output
- [ ] Add README in package for npm
- [ ] Consider generating `.d.ts` (`dts: true` in tsup)

## Usage example

```jsx
import { Button, Card, ProfileCard } from "cosmic-ui-library";

export function Demo() {
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <Button text="Generate" backgroundColor="#e8a06e" hoverBackgroundColor="#d8905e" />
      <Card title="AI Card" content="Generated by Cosmic UI" />
      <ProfileCard name="Alex" role="Designer" aiCredit={150} />
    </div>
  );
}
```
