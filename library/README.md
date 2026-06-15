# Cosmic UI Library

Cosmic UI Library is a React component package for quickly dropping polished UI blocks into apps. It includes foundational components, cards, forms, navigation, feedback, dashboard widgets, e-commerce blocks, AI interface components, and landing-page sections.

## Install

```bash
npm install cosmic-ui-library
```

## Usage

```jsx
import { Button, Card, Input, Modal, Navbar } from "cosmic-ui-library";

export default function App() {
  return (
    <main>
      <Navbar brand="Cosmic UI" />
      <Card
        title="Launch faster"
        subtitle="Cosmic UI"
        content="Use ready-made React components and customize them with props."
        buttonText="Get Started"
      />
      <Input placeholder="Search components" />
      <Button>Generate Component</Button>
    </main>
  );
}
```

## Available Components

The package exports 150+ React components, including:

- Layout: `Container`, `Section`, `Grid`, `Flex`, `Stack`, `Box`, `Divider`
- Navigation: `Navbar`, `Sidebar`, `Menu`, `DropdownMenu`, `Tabs`, `Pagination`
- Forms: `Input`, `Textarea`, `Select`, `Checkbox`, `RadioButton`, `Switch`
- Cards: `Card`, `ProductCard`, `PricingCard`, `ProfileCard`, `TestimonialCard`
- Data display: `Badge`, `Avatar`, `Tooltip`, `Accordion`, `Table`, `CodeBlock`
- Feedback: `Alert`, `Toast`, `ProgressBar`, `SkeletonLoader`, `EmptyState`
- Overlays: `Modal`, `Dialog`, `Drawer`, `Sheet`, `ConfirmationDialog`
- AI UI: `AIChatInterface`, `AIMessageBubble`, `PromptInput`, `AIResponseCard`

## Styling

Components are self-contained React components. Most components accept props for content, colors, spacing, and interaction handlers so they can be used without a required global stylesheet.

## Requirements

- React 18 or newer

## Development

```bash
npm install
npm run build
```

The build outputs CommonJS and ESM bundles in `dist`.

## License

ISC
