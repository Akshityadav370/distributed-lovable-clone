# Conventions

Read this once; follow it for the rest of the session.

## Module shape

Every domain lives under `modules/<name>/`, copied from `modules/_template/`:

- `<name>.types.ts` — types matching backend DTOs exactly (field names, nullability). Don't invent fields.
- `<name>.api.ts` — `api.injectEndpoints({...})` from `@/store/api`. All server data goes through RTK Query hooks, never a manually-managed `useState`/`useEffect` fetch.
- `<name>.slice.ts` — UI-only state (dialog open, selected id, composer draft). Never server data — that's what the api cache is for.
- `pages/` — route-level components, composed from `components/`.
- `components/` — reusable pieces local to this module.
- `index.ts` — the module's public barrel. Only export what other modules or `routes/` actually need.

## Import rules

- Cross-module imports go through the target module's barrel (`@/modules/x`), enforced by an eslint `no-restricted-imports` rule — **except** `*.slice.ts` files, which may be imported directly (`@/modules/x/x.slice`). Slices are dependency-free leaves (only import from `@reduxjs/toolkit`); routing a slice-only import through a full barrel that also re-exports pages creates real circular imports between sibling module barrels (this happened once between `projects` and `workspace` — don't reintroduce it).
- `store/`, `components/`, `lib/`, `routes/` are shared infrastructure — modules import from them freely, but they never import from `modules/`, except `store/selectors/*` and `store/index.ts`, which are allowed to reach into module `*.api.ts`/`*.slice.ts` because cross-module derived state and root-reducer wiring have to live somewhere above both modules.

## State ownership

- Server data → RTK Query hooks (`useGetXQuery`).
- UI state → the module's own slice.
- Global state (auth) → `store/auth.slice.ts`.
- Form state → React Hook Form, never Redux.

## Design tokens

Colors, fonts, and the button system come from the `claude.ai/design` handoff bundle (see the plan doc for the full token table) — defined as CSS variables in `styles.css`, consumed via Tailwind classes (`bg-canvas`, `text-ink`, `border-border-subtle`, etc.), never hardcoded hex values in components. `dark` class on `<html>` switches the variable set.

## Gateway routing (verified against the live config-server, not assumed)

api-gateway routes `/api/v1/<service>/**` to each service with `StripPrefix=2`, and each service has its own `server.servlet.context-path` (`/account`, `/workspace`, `/intelligence`) that reappears after stripping. So every client-facing path is `/api/v1/<service><controller-path>` -- e.g. `AuthController`'s `/auth/login` is reachable at `/api/v1/account/auth/login`, not `/auth/login`. Always build paths from `lib/http/gateway.ts`'s `GATEWAY` constants, never hardcode a bare controller path.

## Backend contract gotchas (verified against source, not assumed)

- `GET /projects/{id}/files/content` returns `text/plain`, not JSON — the RTK Query endpoint sets `responseHandler: 'text'`.
- `FileTreeDto` is a **flat list** of path strings, not a nested tree — `modules/workspace/lib/build-file-tree.ts` builds the tree client-side.
- The live `/chat/stream` SSE endpoint only ever emits `{ text }` chunks with no `event:` name. Richer typed events (`THOUGHT`/`FILE_EDIT`/`TOOL_LOG`) only exist on persisted history (`GET /chat/projects/{id}`) — the chat cache is refetched after a stream completes to pick those up.
- There is no `/auth/me` endpoint — the logged-in user only ever arrives via `AuthResponse.user` from signup/login/refresh, persisted through `redux-persist`.
