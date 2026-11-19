# WebDev Power Kit merge audit

## Scope

`webdev-power-kit` is a read-only sibling repository. Its source files are
ported into this repository selectively; the source repository is neither
modified nor committed from this worktree.

## Audit decisions

| Area                       | WebDev Power Kit                               | Cosmic UI                                                          | Decision                    | Reason                                                                                                       |
| -------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Browser utilities          | Typed, zero-dependency browser API helpers     | Only an app-specific storage helper                                | Merge                       | The source provides reusable APIs that belong in the published library.                                      |
| Debounce, throttle and OTP | Typed implementations                          | No equivalent library exports                                      | Keep and improve            | They are small, tree-shakeable, and add missing public capabilities.                                         |
| Storage                    | Generic local/session wrapper                  | `client/src/utils/storage.js` for application persistence          | Keep both by layer          | The library needs generic storage; the client adapter remains responsible for Cosmic UI keys and auth usage. |
| Landing and docs design    | Full Next.js landing/docs visual system        | Product-focused Vite pages with a different style                  | Keep source design language | The source is the requested visual authority; it will be converted to Vite/React.                            |
| Product functionality      | No auth, AI generation, payments, or dashboard | Firebase auth, OpenRouter generation, Razorpay, MongoDB, dashboard | Keep Cosmic UI              | These capabilities are outside the source project and must remain intact.                                    |
| Server                     | No server                                      | Express API and models                                             | Keep Cosmic UI unchanged    | No source utility requires an API.                                                                           |
| Tooling                    | Next-specific ESLint/PostCSS                   | Root ESLint, Prettier, Husky, Vite                                 | Keep Cosmic UI tooling      | Avoids two competing quality/tooling stacks.                                                                 |
| Dependencies               | Next.js UI dependencies                        | Vite/React product dependencies                                    | Merge only runtime needs    | `lucide-react` is needed for the port; Next-specific packages are not.                                       |

## Planned structure

- `library/src/utils/browser`, `library/src/utils/performance`, and
  `library/src/utils/general` host the new public utility modules.
- The library package exposes the root package and explicit utility subpaths.
- The Vite client adopts the source's tokens, typography, dark/light theme,
  navigation, cards, and responsive behavior while retaining existing product
  routes.
- A utility catalog/docs route makes the merged library discoverable.

## Attribution

WebDev Power Kit is MIT licensed and credited to Aditya Kumar Gupta. The
merged repository retains this attribution in `NOTICE.md`, the README, and
library documentation.
