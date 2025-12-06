# Fridge – Frontend (Angular)

This repository contains the **Angular frontend** for the Fridge application.

The goal of this frontend is to provide a small but realistic SPA that:

- authenticates the user via Basic Auth,
- displays fridge items fetched from the backend,
- allows searching, adding and deleting fridge items,
- visually highlights items by their best-before status (`OK`, `Soon`, `Expired`).

The application is intentionally small in scope, but it is structured similarly to real-world **enterprise Angular projects**, so it can be extended with more features, more state, and more screens without major refactors.

---

## 1. What the application does

Main user flows:

- **Login** using username and password (Basic Auth against the Spring Boot backend).
- **View items** in a table (name, category, quantity, unit, stored date, best-before date, notes).
- **Search** items by name (client-side filtering).
- **Add** new items via a simple inline form.
- **Delete** existing items directly from the table.
- **Visual status badges** for each item (`OK`, `Soon`, `Expired`), computed on the frontend based on its best-before date.

The frontend talks to the backend project `fridge`:

- Backend base URL: `http://localhost:8080`
- API base path (on the backend): `/api/items`

In development, the Angular dev server proxies `/api` to `http://localhost:8080`, so the frontend simply calls `/api/items`.

---

## 2. Tech stack

- **Angular 21**
  - Standalone components
  - Angular **signals** (for local state such as items, loading, error, search, add-form state)
  - Angular Router
  - HttpClient + functional HTTP interceptor
- **Styling**
  - Global **SCSS** with Material-like CSS variables (colors, typography, density)
  - **Tailwind CSS 4** via `@tailwindcss/postcss`
  - Per-component `.tw.css` files using `@apply`
- **Tooling**
  - Angular CLI
  - Node.js & npm
  - Tailwind configured via `.postcssrc.json`

---

## 3. Architecture & folder layout

The frontend code is organized into clear logical layers, similar in spirit to the backend architecture.

### 3.1. Core (`src/app/core`)

Cross-cutting concerns and app infrastructure:

- **Auth**
  - `auth.service.ts`
    - holds the current authentication state (Basic token, loading flag, error message) using **signals**;
    - exposes `login` and `logout`.
  - `auth.interceptor.ts`
    - functional Http interceptor that attaches the `Authorization: Basic ...` header to all `/api/...` requests when the user is logged in.
- **API URLs**
  - `api-url.service.ts`
    - central place for backend URLs (currently `/api/items`);
    - makes it easy to change the base API path or host later.
- **Layout** (optional, depending on your structure)
  - Header / Footer or other layout components that wrap the main content and `router-outlet`.

### 3.2. Features (`src/app/features`)

Each functional area lives in its own feature folder.

#### Auth feature (`features/auth`)

- `login-view` (e.g. `login-view.component.ts/html/scss/tw.css`)
  - Standalone login screen.
  - Uses `AuthService` to perform login, show loading and errors.
  - On successful login, navigates the user to `/app`.

#### Fridge feature (`features/fridge`)

This is the main feature for the coding task.

- **View (container)**
  - `fridge-view`
    - The central container for the fridge feature.
    - Responsibilities:
      - Load items from the backend via `FridgeItemHttpService`.
      - Hold local state via **signals**:
        - `_items`, `isLoading`, `error`
        - `search` (search text)
        - `isAddOpen`, `isSaving` (add-form visibility and saving state)
      - Compute `filteredItems` using a small helper (filter util).
      - Compose the UI by using child components: search, add form, table.
- **Components (`features/fridge/components`)**
  - `fridge-search`
    - Small search component (single input).
    - Takes `search` as input and emits `searchChange`.
  - `fridge-item-add`
    - Simple form for creating a new item.
    - Uses a local `FridgeItemCreateRequest` object (plain TS object, no `ngModel`).
    - Emits:
      - `add` with a valid `FridgeItemCreateRequest`,
      - `cancel` to close the form.
  - `fridge-table`
    - Displays the list of items in a table.
    - Uses a helper to compute expiry status (`OK/Soon/Expired`) and shows a badge per item.
    - Contains delete buttons and emits delete events to the parent.
- **Service (`features/fridge/services`)**
  - `FridgeItemHttpService`
    - Handles all HTTP calls for this feature:
      - `getAll()` – fetch all items,
      - `create(...)` – create new item,
      - `delete(...)` – delete item by id.
    - Uses `ApiUrlService` for the base URL.
- **Models & utilities**
  - `interface/fridge-item.ts`
    - `FridgeItem` – shape of items returned by the backend.
    - `FridgeItemCreateRequest` – payload used when creating a new item.
  - `enums/expiry-status.ts`
    - Enum with values `OK`, `SOON`, `EXPIRED`.
  - `utils/expiry-status.util.ts`
    - Helper function that computes the expiry status from the `bestBefore` date.
  - `utils/fridge-filter.util.ts`
    - Helper that performs simple client-side filtering (and optionally basic sorting).
    - Keeps this logic out of `FridgeView`, so the view component stays smaller and easier to read.

---

## 4. Authentication (high level)

Authentication is intentionally simple and aligned with the backend:

- **Basic Auth** using `username:password`.
- **AuthService**
  - Builds the Basic token (`Basic base64(username:password)`).
  - Sends a “test” request to `/api/items` to validate credentials.
  - On success: stores the header in a signal.
  - On error: stores an error message shown on the login screen.
- **auth.interceptor**
  - Intercepts all HTTP requests.
  - If a token exists and the URL starts with `/api`, it adds the `Authorization` header.
- `/` is the login route; on success, the app redirects the user to `/app`.

This is enough for the coding task and is easy to upgrade later (e.g. guards, JWT, real identity provider, etc.).

---

## 5. Styling approach

The styling layer combines **SCSS** with per-component **Tailwind** files.

### 5.1. SCSS

Configures Material-style CSS variables (color, typography, density),
so a standard Angular `*.scss` file (for component-level rules, possibly using Material CSS vars) looks like:

```scss
html {
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
  font: var(--mat-sys-body-medium);
}
```
### 5.2. Tailwind(*.tw.css)

- For each major view or component, there is a `.tw.css` file, e.g.:

  - login-view.component.tw.css

  - fridge-view.tw.css

  - fridge-table.tw.css

  - fridge-item-add.tw.css
- Each uses:
```css
@import "tailwindcss";
```
  and `@apply` to build component-local classes.

  This approach keeps HTML templates clean (semantic class names) and concentrates layout details into `.tw.css` files.

## 6. How to run

### 6.1. Prerequisites

- Node.js & npm
- Angular CLI (optional but convenient)
- Backend ([**fridge**](https://github.com/MrGarrison7212/fridge) Spring Boot app) running on http://localhost:8080

### 6.2. Start the backend

For example, using **IntelliJ IDEA**:

- Open the backend project ([**fridge**](https://github.com/MrGarrison7212/fridge))
- Run the main Spring Boot application class, or from terminal:
```bash
mvn spring-boot:run
```
Backend base URL: `http://localhost:8080`
API: `http://localhost:8080/api/items`

### 6.3. Start the frontend

In the `fridge-frontend` folder:

**1.** Install dependencies:
```bash
npm install

```
**2.** Run the dev server (from Webstorm, IntelliJ or terminal):
```bash
npm start
# or
ng serve --proxy-config proxy.conf.json

```
Frontend URL: `http://localhost:4200`

### 6.4 Proxy configuration (local development)

The project uses `proxy.conf.json` so that the Angular dev server forwards `/api` calls to the backend:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```
This allows the frontend to call `/api/items` while the request is actually sent to `http://localhost:8080/api/items` during development.
It keeps the code simple (no hard-coded host/port in services) and avoids CORS issues.

### 6.5. Login & test flow

Use the same user as on the backend:

- **Username**: `testuser`
- **Password**: `testuser123`

Recommended test flow:

1. Open `http://localhost:4200/`
2. Log in with `testuser / testuser123`
3. On `/app`, use **Add item** to create a few items (e.g. Milk, Cheese, Apples)
4. Verify that:
  - new items appear in the table (check Swagger - GET if you are enthusiastic)
  - search filters by name
  - delete some items from the table and from the backend

---

## 7. Future improvements

The current frontend focuses on the core flow (login → list → search → add → delete), 
but the architecture is intentionally kept **clean and modular** so that it can grow.

Possible extensions:

-  **State management**:
Introduce a dedicated signalStore for the fridge feature (e.g. managing create/edit modes, selection, etc. )

-  **Edit & Update**:
Add an edit form (reusing the add component or a separate one) and a `PUT /api/items/{id}` integration

-  **UX upgrades and polish**:
Better - serious design, additional visual refinements, animations, better empty/error states, etc

-  **Sorting & pagination**:
Add sorting by `storedAt / bestBefore` in the UI, and add client-side or server-side pagination for larger datasets.

-  **Richer filters**:
Filter by category, expiry status (`OK`, `Soon`, `Expired`), or combinations of both.

-  **Multi-user support**:
Wire up a real authentication system (e.g. JWT, OAuth2) and associate items with specific users or fridges.

The codebase is intentionally kept clean, simple and layered,
**following patterns used in enterprise Angular projects**, which makes it a solid base for future growth and experimentation.
