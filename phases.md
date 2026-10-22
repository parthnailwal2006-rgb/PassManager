# Implementation Roadmap: LocalVault

This document provides a complete, sequential, beginner-friendly implementation roadmap for **LocalVault**. Every phase is broken into actionable subphases following a strict 9-step structure.

---

# Roadmap Overview

| Phase | Title | Key Milestones |
| :--- | :--- | :--- |
| **Phase 0** | Prerequisites & Workspace | Environment checks (Node, MongoDB, PowerShell), `.gitignore`, project folder structure. |
| **Phase 1** | Frontend Initialization | React + Vite setup, Tailwind CSS configuration, Lucide icons, base layout shell. |
| **Phase 2** | Authentication Frontend | Register & Login UI forms, controlled inputs, validation, toast notifications, UI redirects. |
| **Phase 3** | Backend Initialization | Express server, `.env` config, local MongoDB via Mongoose, centralized error middleware. |
| **Phase 4** | Authentication Backend | User model, bcrypt hashing, JWT issuance, rate limiting, connecting auth forms to API. |
| **Phase 5** | Protected Routes & Global State | Redux Toolkit `authSlice`, Axios interceptors, route guards (`ProtectedRoute`, `PublicRoute`). |
| **Phase 6** | Vault Cryptography Engine | PBKDF2 key derivation, AES-256-GCM cipher service, IV & Auth Tag validation, tamper tests. |
| **Phase 7** | Vault Backend APIs | VaultItem model, CRUD routes, user ownership enforcement, server-side encryption/decryption. |
| **Phase 8** | Vault Dashboard Frontend | Redux `vaultSlice`, credential cards, search filter, show/hide password, copy to clipboard. |
| **Phase 9** | Credential Modal & CRUD Flows | Add/Edit modal dialogs, delete confirmation prompt, optimistic state updates. |
| **Phase 10** | Password Generator | Cryptographic random generation (`crypto.getRandomValues`), length & character set controls. |
| **Phase 11** | UI Polish & Accessibility | Responsive design, keyboard navigation focus rings, empty states, ARIA labels. |
| **Phase 12** | Security Audit & Verification | MongoDB ciphertext audit, token leakage checks, multi-tenant isolation tests. |
| **Phase 13** | Documentation & Local Handoff | Unified startup instructions, `README.md`, environment reference, project completion. |

---

# PHASE 0: Project Planning, Prerequisites, and Local Environment

---

## PHASE 0.1: System Prerequisites & Environment Verification

### Objective
Verify that all runtime dependencies (Node.js, npm, MongoDB Community Server, and mongosh) are properly installed, accessible in Windows PowerShell, and functioning before generating project files.

### Concepts I will learn
- Verifying Windows PATH environment variables for development tooling.
- Managing Windows Services via PowerShell (`Get-Service`).
- Interacting with local MongoDB instances via `mongosh`.

### Step 1: Terminal commands
Run the following commands in Windows PowerShell from the project root directory (`c:\WEB DEVELOPMENT BY BABBAR\Password manager`):

```powershell
# Check Node.js version (Requires v20.x or higher)
node -v

# Check npm version (Requires v10.x or higher)
npm -v

# Verify MongoDB Windows Service is running
Get-Service -Name MongoDB

# If MongoDB service is stopped, start it with administrator privileges:
# Start-Service -Name MongoDB

# Verify MongoDB connection using mongosh
mongosh --eval "db.adminCommand('ping')"
```

*Package explanations:*
- `node`: The JavaScript runtime executing server-side code and Vite development tools.
- `npm`: Node Package Manager used to install frontend and backend libraries.
- `mongosh`: The official MongoDB command-line client used to test and inspect database documents directly.

### Step 2: Files and folders
No files are created in this subphase. We are verifying the operating environment.

### Step 3: What to implement
- Execute the verification commands.
- Confirm Node.js version is v20+ LTS.
- Confirm MongoDB service status is `Running`.
- Confirm `mongosh` outputs `{ ok: 1 }` in response to the ping.

### Step 4: Hooks, libraries, and concepts
- **PowerShell Execution Policies:** Windows PowerShell may restrict script running. If `npm` scripts fail, running `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` permits running locally authored scripts.
- **Localhost Networking:** MongoDB listens on `127.0.0.1:27017` by default.

### Step 5: Tailwind CSS
Not applicable in this environment verification subphase.

### Step 6: Points to ensure
- Node.js version returns `>= 20.0.0`.
- MongoDB service is active and listening on port 27017.
- Terminal commands execute cleanly without "command not found" errors.

### Step 7: Testing and verification
Run:
```powershell
mongosh --eval "db.version()"
```
*Expected output:* A version string like `7.0.x` or `8.0.x`.

### Step 8: Completion criteria
Proceed only when Node.js, npm, and MongoDB respond successfully without errors.

### Step 9: Requirements covered
- NFR-04 (Portability & Local Execution)

---

## PHASE 0.2: Root Workspace Setup, `.gitignore`, and Directory Blueprint

### Objective
Establish the repository root structure, configure version control exclusions (`.gitignore`) to prevent secret leakage, and create placeholder workspace directories.

### Concepts I will learn
- Git hygiene: preventing accidental commits of `.env` files, build artifacts, and `node_modules`.
- Monorepo-style co-location of `client/` and `server/` within a single learning repository.

### Step 1: Terminal commands
Run in Windows PowerShell from the project root:

```powershell
# Create root .gitignore
New-Item -ItemType File -Name ".gitignore" -Force
```

### Step 2: Files and folders
- Create: `.gitignore` (Root level)
  - *Responsibility:* Tells Git which folders and sensitive files to ignore.
- Planned folders:
  - `client/` (Frontend React application)
  - `server/` (Backend Express application)

### Step 3: What to implement
Configure `.gitignore` with standard MERN exclusions:
- `node_modules/`
- `.env` and `.env.local`
- `dist/` and `build/`
- `.DS_Store` and `Thumbs.db`
- `npm-debug.log*`

### Step 4: Hooks, libraries, and concepts
- **Security Defense-in-Depth:** Ignoring `.env` at the root guarantees that developer secrets, JWT keys, and database credentials are never committed to version control.

### Step 5: Tailwind CSS
Not applicable in this phase.

### Step 6: Points to ensure
- `.env` is explicitly listed in `.gitignore`.
- Root `.gitignore` uses forward slashes or standard directory patterns matching both client and server subdirectories.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
Get-Content .gitignore
```
Verify that `node_modules`, `.env`, and `dist` are present in the output.

### Step 8: Completion criteria
`.gitignore` exists in the project root with the correct rules before any package installations occur.

### Step 9: Requirements covered
- SEC-10 (Environment Isolation & Git Protection)

---

# PHASE 1: Frontend Initialization and Dependencies

---

## PHASE 1.1: Vite + React Setup & Directory Structure

### Objective
Initialize a blazing-fast React application using Vite with JavaScript and set up a clean, scalable folder structure matching professional conventions.

### Concepts I will learn
- Why Vite is preferred over legacy `create-react-app` (faster build times, native ES modules).
- Modular folder organization for React projects (components, pages, features, hooks, services, utils).

### Step 1: Terminal commands
Run in Windows PowerShell from the project root:

```powershell
# Create the Vite React app
npm create vite@latest client -- --template react

# Move into the client folder
cd client

# Install base dependencies
npm install

# Return to root
cd ..
```

*Package explanations:*
- `vite`: Build tool providing local dev server with Hot Module Replacement (HMR).
- `react` & `react-dom`: The core React library and DOM renderer.

### Step 2: Files and folders
Within `client/src/`, create the following folder architecture:
- `client/src/components/` (Reusable UI components like buttons, inputs, modals)
- `client/src/pages/` (Top-level route views like Login, Register, Dashboard)
- `client/src/features/` (Redux state slices grouped by domain: `auth`, `vault`)
- `client/src/app/` (Redux store configuration: `store.js`)
- `client/src/services/` (Axios API client and endpoint functions)
- `client/src/hooks/` (Custom React hooks)
- `client/src/utils/` (Helper functions such as password generator and formatting)

### Step 3: What to implement
- Scaffolding the folder structure inside `client/src/`.
- Cleaning out default boilerplate files in `client/src/` (`App.css`, boilerplate assets).

### Step 4: Hooks, libraries, and concepts
- **Component Colocation:** Grouping by role keeps concerns clean. Reusable inputs belong in `components/`, while route targets belong in `pages/`.

### Step 5: Tailwind CSS
Setup occurs in the next subphase.

### Step 6: Points to ensure
- `client/package.json` contains `"name": "client"` and dependencies for `react` and `react-dom`.
- Running `npm run dev` inside `client/` boots Vite on `http://localhost:5173`.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
cd client
npm run dev
```
Open `http://localhost:5173` in a browser. Confirm the default Vite React page displays. Press `Ctrl+C` to terminate the dev server.

### Step 8: Completion criteria
Vite boots cleanly and the proposed folder structure exists within `client/src/`.

### Step 9: Requirements covered
- NFR-03 (Modular Maintainability)

---

## PHASE 1.2: Tailwind CSS Configuration & Global Theme Styling

### Objective
Install and configure Tailwind CSS v3 with PostCSS and Autoprefixer, and establish a modern dark-slate theme for LocalVault.

### Concepts I will learn
- How Tailwind scans source files (`content` glob in `tailwind.config.js`).
- The `@tailwind base`, `@tailwind components`, `@tailwind utilities` directives in `index.css`.
- Building a consistent dark mode aesthetic using Tailwind's palette (`slate-900`, `slate-950`).

### Step 1: Terminal commands
Run in Windows PowerShell inside `client/`:

```powershell
cd client

# Install Tailwind CSS, PostCSS, and Autoprefixer as dev dependencies
npm install -D tailwindcss@^3.4.10 postcss autoprefixer

# Initialize tailwind.config.js and postcss.config.js
npx tailwindcss init -p

cd ..
```

*Package explanations:*
- `tailwindcss`: The utility-first CSS framework engine.
- `postcss`: Tool for transforming CSS with JavaScript plugins.
- `autoprefixer`: PostCSS plugin that parses CSS and adds vendor prefixes to CSS rules.

### Step 2: Files and folders
- Modify: `client/tailwind.config.js`
  - *Responsibility:* Specifies template file paths so Tailwind can purge unused CSS.
- Modify: `client/src/index.css`
  - *Responsibility:* Injects Tailwind's base, component, and utility layers.

### Step 3: What to implement
- Configure `client/tailwind.config.js`:
  ```javascript
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#eef2ff',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
          }
        }
      },
    },
    plugins: [],
  }
  ```
- Replace `client/src/index.css` content with:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-indigo-500 selection:text-white;
  }
  ```

### Step 4: Hooks, libraries, and concepts
- **Utility-First Paradigm:** Rather than writing custom CSS files for every button, Tailwind applies pre-defined CSS utility classes directly to JSX elements.

### Step 5: Tailwind CSS
- `bg-slate-950`: Deepest charcoal/navy background color.
- `text-slate-100`: High-contrast, readable light text.
- `min-h-screen`: Ensures the viewport is fully covered vertically.
- `antialiased`: Enables smooth font rendering.

### Step 6: Points to ensure
- `tailwind.config.js` includes the exact `./src/**/*.{js,jsx}` glob.
- `client/src/index.css` is imported in `client/src/main.jsx`.

### Step 7: Testing and verification
In `client/src/App.jsx`, add a temporary test tag:
```jsx
<h1 className="text-3xl font-bold text-indigo-400 p-8">Tailwind Works!</h1>
```
Run `npm run dev` and verify that the text renders in bold purple-indigo with padding.

### Step 8: Completion criteria
Tailwind classes compile without warnings and the background color of the app defaults to dark slate.

### Step 9: Requirements covered
- NFR-05 (Visual Theme & Consistent Styling)

---

## PHASE 1.3: Core Frontend Dependencies Installation

### Objective
Install essential client-side libraries: React Router for navigation, Redux Toolkit for state management, Axios for HTTP communication, React Hot Toast for feedback, and Lucide React for UI icons.

### Concepts I will learn
- The purpose of each production dependency.
- Maintaining a lean client dependency tree without bloat.

### Step 1: Terminal commands
Run in Windows PowerShell inside `client/`:

```powershell
cd client

# Install core client dependencies
npm install react-router-dom@^6.26.0 @reduxjs/toolkit@^2.2.7 react-redux@^9.1.2 axios@^1.7.4 react-hot-toast@^2.4.1 lucide-react@^0.439.0

cd ..
```

*Package explanations:*
- `react-router-dom`: Enables dynamic client-side routing without page reloads.
- `@reduxjs/toolkit`: Standard, opinionated package for writing modern Redux logic with minimal boilerplate.
- `react-redux`: Official React bindings for Redux.
- `axios`: Promise-based HTTP client for making API requests with request/response interceptors.
- `react-hot-toast`: Lightweight notification library for non-intrusive feedback.
- `lucide-react`: Modern SVG icon library for visual affordances (keys, locks, eyes, clipboard).

### Step 2: Files and folders
- Inspect: `client/package.json`
  - *Responsibility:* Verify that all 6 packages appear in `"dependencies"`.

### Step 3: What to implement
- Execute the installation command.
- Verify no peer dependency conflicts occur.

### Step 4: Hooks, libraries, and concepts
- **Selective Loading:** Lucide React supports tree-shaking, meaning only the icons explicitly imported (e.g. `import { Lock } from 'lucide-react'`) are bundled into the production output.

### Step 5: Tailwind CSS
Not applicable for package installation.

### Step 6: Points to ensure
- All packages install with 0 vulnerabilities.
- `client/package.json` lists exact compatible version ranges.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
cd client
node -e "console.log(require('./package.json').dependencies)"
```
Confirm that `axios`, `react-router-dom`, `@reduxjs/toolkit`, `react-hot-toast`, and `lucide-react` are listed.

### Step 8: Completion criteria
Dependencies install cleanly and the client builds successfully with `npm run build`.

### Step 9: Requirements covered
- NFR-03 (Maintainability)

---

## PHASE 1.4: Base Layout & Router Shell

### Objective
Set up the application routing hierarchy with React Router DOM, create a reusable main layout with a top navigation bar skeleton, and integrate React Hot Toast globally.

### Concepts I will learn
- Using `<BrowserRouter>`, `<Routes>`, `<Route>`, and `<Outlet />`.
- Positioning `<Toaster />` at the root of the React tree so toasts can be triggered from anywhere.
- Building a responsive header navigation bar with Lucide icons.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/layout/Navbar.jsx`
  - *Responsibility:* Displays brand logo ("LocalVault"), user status, and action buttons.
- Create: `client/src/components/layout/MainLayout.jsx`
  - *Responsibility:* Wraps pages with Navbar, max-width container, and `<Outlet />`.
- Modify: `client/src/App.jsx`
  - *Responsibility:* Configures React Router routes (`/`, `/login`, `/register`, `/dashboard`).
- Modify: `client/src/main.jsx`
  - *Responsibility:* Injects `<BrowserRouter>` and `<Toaster />`.

### Step 3: What to implement
- In `client/src/main.jsx`: Wrap `<App />` with `<BrowserRouter>` and mount `<Toaster position="top-right" />`.
- In `client/src/components/layout/Navbar.jsx`: Build a sticky top bar with:
  - Shield logo and "LocalVault" heading.
  - Right-side placeholder buttons for Login / Register (unauthenticated) and Logout (authenticated).
- In `client/src/App.jsx`: Define routes:
  - `/` -> Redirects to `/login` for now.
  - `/login` -> Placeholder Login page.
  - `/register` -> Placeholder Register page.
  - `/dashboard` -> Placeholder Dashboard page.

### Step 4: Hooks, libraries, and concepts
- **React Router `<Outlet />`:** Renders the matching child route inside `MainLayout`.
- **`<Navigate />`:** Declarative component used for instant client-side redirection.

### Step 5: Tailwind CSS
- `sticky top-0 z-50`: Keeps navbar anchored to the top during page scroll.
- `border-b border-slate-800 bg-slate-900/80 backdrop-blur`: Modern glassmorphic header style.
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`: Centered responsive container.
- `flex items-center justify-between h-16`: Vertical centering and space distribution.

### Step 6: Points to ensure
- Navigating to `/login` renders the Navbar and the Login placeholder.
- Navigating to `/register` renders the Navbar and the Register placeholder.
- Toast notifications render visibly when invoked.

### Step 7: Testing and verification
Run `npm run dev` in `client/`. Navigate to `http://localhost:5173/login` and `http://localhost:5173/register`. Verify the navbar remains visible while the body content swaps.

### Step 8: Completion criteria
The router shell is established, the navbar displays correctly, and route switching functions without page reloads.

### Step 9: Requirements covered
- NFR-05 (Usability & Layout Structure)

---

# PHASE 2: Authentication Frontend

---

## PHASE 2.1: Reusable Form Inputs & Password Visibility Component

### Objective
Create accessible, reusable form input components with built-in label rendering, error messaging, and an interactive password visibility toggle button.

### Concepts I will learn
- Building reusable form controls using React props (`label`, `type`, `error`, `placeholder`).
- Managing local UI toggle state (`showPassword`) with `useState`.
- Proper HTML accessibility attributes (`aria-invalid`, `aria-describedby`).

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/common/InputField.jsx`
  - *Responsibility:* Generic reusable text/email input with label and validation error.
- Create: `client/src/components/common/PasswordField.jsx`
  - *Responsibility:* Password input with integrated show/hide toggle eye button.

### Step 3: What to implement
- Build `InputField.jsx`:
  - Accepts `label`, `name`, `type`, `value`, `onChange`, `error`, `placeholder`, `required`.
  - Renders a styled `<label>` and `<input>`.
  - Conditionally renders red validation error text when `error` prop is present.
- Build `PasswordField.jsx`:
  - Uses `useState(false)` for `showPassword`.
  - Toggles `<input type={showPassword ? 'text' : 'password'}>`.
  - Renders `<Eye />` or `<EyeOff />` icon from `lucide-react` with `type="button"` so clicking it does not submit parent forms.

### Step 4: Hooks, libraries, and concepts
- **`useState` Hook:**
  - *Which hook?* `useState(false)`
  - *Where?* Inside `PasswordField.jsx`.
  - *Why appropriate?* Password visibility is purely local UI state that no other component or backend needs to know about.
  - *Why not Redux?* Putting `showPassword` into Redux would introduce needless complexity and performance overhead for a single-button toggle.
  - *What problem does it solve?* Allows the user to verify their typed master password without leaving it visible permanently.

### Step 5: Tailwind CSS
- `w-full px-3 py-2 bg-slate-900 border rounded-lg`: Standard input surface.
- `border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500`: Subtle active focus indicator.
- `border-rose-500 focus:border-rose-500`: Highlights inputs with validation errors in red.
- `absolute right-3 top-1/2 -translate-y-1/2`: Centers the visibility toggle icon vertically within the input container.
- `text-slate-400 hover:text-slate-200`: Hover state for the toggle button.

### Step 6: Points to ensure
- Clicking the toggle icon changes the input's `type` attribute between `"password"` and `"text"`.
- Clicking the toggle button does *not* trigger form submission (`type="button"` attribute is required).
- Validation errors appear directly beneath the input in readable red text (`text-rose-400 text-xs mt-1`).

### Step 7: Testing and verification
Render both components in a test page. Type a password, click the eye icon to verify it toggles between dots and plaintext, and pass an `error="Field is required"` prop to verify styling.

### Step 8: Completion criteria
Both components render cleanly, respond to user input, and handle visibility toggling seamlessly.

### Step 9: Requirements covered
- FR-03 (Password input)
- FR-24 (Password visibility toggle)
- NFR-05 (Accessible Form Design)

---

## PHASE 2.2: Register Page UI with Validation & Password Strength Helper

### Objective
Build the user registration page (`/register`) with controlled inputs, client-side validation rules, password matching checks, and a visual password strength indicator.

### Concepts I will learn
- Managing multi-field form state using a single `useState` object.
- Client-side validation logic before API submission.
- Dynamic visual feedback based on regular expression checks.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/pages/RegisterPage.jsx`
  - *Responsibility:* Registration view hosting the form, validation logic, and redirect handling.
- Create: `client/src/components/auth/PasswordStrengthIndicator.jsx`
  - *Responsibility:* Renders a dynamic bar and checklist indicating password complexity.

### Step 3: What to implement
- In `RegisterPage.jsx`:
  - Form state: `const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })`.
  - Error state: `const [errors, setErrors] = useState({})`.
  - Loading state: `const [isLoading, setIsLoading] = useState(false)`.
  - Handle changes using a generic handler:
    ```javascript
    const handleChange = (e) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    };
    ```
- In `PasswordStrengthIndicator.jsx`:
  - Checks 4 criteria: (1) Length >= 8, (2) Has uppercase, (3) Has digit, (4) Has special character.
  - Displays a color-coded bar (Red = Weak, Yellow = Moderate, Green = Strong).
- Validate on submit:
  - Email format.
  - Password complexity matching the 4 criteria.
  - `password === confirmPassword`.

### Step 4: Hooks, libraries, and concepts
- **`useState` Hook:**
  - *Where?* `RegisterPage.jsx`.
  - *Why?* Tracks user input synchronously for controlled inputs.
- **`useMemo` Hook:**
  - *Where?* `PasswordStrengthIndicator.jsx`.
  - *Why?* Computes the password strength score (0 to 4) whenever `password` changes, avoiding re-calculation on unrelated renders.

### Step 5: Tailwind CSS
- `max-w-md mx-auto mt-12 p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl`: Modern centered card container.
- `h-1.5 w-full bg-slate-800 rounded-full overflow-hidden`: Strength progress bar background.
- `transition-all duration-300 ease-out`: Smooth width and color transition for the strength meter.
- `w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-lg text-white`: Primary submit button.

### Step 6: Points to ensure
- If passwords do not match, submission is blocked and an error appears under `confirmPassword`.
- If password has < 8 characters, submission is blocked.
- Strength indicator bar changes dynamically as the user types.

### Step 7: Testing and verification
Navigate to `http://localhost:5173/register`. Type weak passwords and verify the strength bar is red. Type a matching, strong password (`P@ssw0rd123!`) and verify the strength bar turns green.

### Step 8: Completion criteria
The registration form accurately captures inputs, validates all criteria, and provides visual feedback without page refreshes.

### Step 9: Requirements covered
- FR-01 (User registration form)
- FR-03 (Password complexity rules)
- NFR-05 (Visual feedback)

---

## PHASE 2.3: Login Page UI & Toast Notification Integration

### Objective
Build the user login page (`/login`) with email and master password fields, loading state feedback, and integration with `react-hot-toast` for alert messages.

### Concepts I will learn
- Controlled form handling for authentication.
- Triggering programmatic toast notifications using `toast.success()` and `toast.error()`.
- Disabling submit buttons and showing spinner icons during pending asynchronous actions.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/pages/LoginPage.jsx`
  - *Responsibility:* Renders the login card, handles submit events, and displays notifications.

### Step 3: What to implement
- In `LoginPage.jsx`:
  - Local state for `email`, `password`, `isLoading`, and `errors`.
  - Basic client validation (non-empty email and password).
  - Temporary UI simulation: on submit, trigger `toast.loading('Verifying master credentials...')`, followed by a 1-second timeout simulating a successful or failed response.
  - Link to `/register` at the bottom of the card.

### Step 4: Hooks, libraries, and concepts
- **React Hot Toast:**
  - Used via `import toast from 'react-hot-toast'`.
  - Dispatches notifications into the `<Toaster />` mounted at the app root.
- **`useState` Hook:**
  - Manages `isLoading` flag to prevent duplicate submissions when clicking "Unlock Vault".

### Step 5: Tailwind CSS
- `flex items-center justify-center min-h-[calc(100vh-4rem)]`: Centers the login card in the remaining vertical screen space.
- `animate-spin -ml-1 mr-2 h-4 w-4 text-white`: Spinning animation for the SVG loading icon.
- `disabled:opacity-50 disabled:cursor-not-allowed`: Styles the button when `isLoading` is true.

### Step 6: Points to ensure
- Form cannot be submitted with empty fields.
- Submit button shows a loading spinner and is disabled while loading.
- Toast notifications appear cleanly at the top-right without overlapping.

### Step 7: Testing and verification
Open `http://localhost:5173/login`. Submit an empty form and verify inline errors appear. Enter sample values, click submit, and verify the toast notification triggers.

### Step 8: Completion criteria
The login UI is visually complete, handles loading states gracefully, and communicates status via toast alerts.

### Step 9: Requirements covered
- FR-04 (Login UI)
- FR-05 (Generic error presentation)

---

## PHASE 2.4: Registration-to-Login Navigation Flow & UX States

### Objective
Connect the navigation lifecycle so that completing registration redirects the user directly to the login page with a success toast, and header links accurately transition between states.

### Concepts I will learn
- Programmatic navigation using React Router's `useNavigate` hook.
- Passing temporary flash messages between routes or invoking toasts upon navigation.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Modify: `client/src/pages/RegisterPage.jsx`
  - *Responsibility:* Triggers `useNavigate('/login')` on successful registration.
- Modify: `client/src/components/layout/Navbar.jsx`
  - *Responsibility:* Highlights the active route (`Login` vs `Register`).

### Step 3: What to implement
- In `RegisterPage.jsx`:
  - Import `useNavigate` from `react-router-dom`.
  - When form validation succeeds (simulated for now before backend connection):
    - `toast.success('Account created successfully! Please sign in.')`
    - `navigate('/login')`
- In `Navbar.jsx`:
  - Use `useLocation()` to detect current path and highlight the active link with `text-indigo-400 font-semibold`.

### Step 4: Hooks, libraries, and concepts
- **`useNavigate` Hook:**
  - *Which hook?* `useNavigate()`
  - *Where?* Inside `RegisterPage.jsx`.
  - *Why appropriate?* Allows imperatively redirecting the user after an asynchronous event (e.g. registration success).
  - *Why not `<Link>`?* `<Link>` is for direct user clicks; `useNavigate` is required when redirection depends on logic execution.

### Step 5: Tailwind CSS
- `text-slate-400 hover:text-white transition-colors`: Default navigation link style.
- `text-indigo-400 border-b-2 border-indigo-400`: Active navigation link indicator.

### Step 6: Points to ensure
- Registering redirects cleanly to `/login` without a full browser refresh.
- The success toast persists across the route transition and appears on the login screen.

### Step 7: Testing and verification
Fill out the registration form with valid test data and click "Create Vault". Verify that the browser URL changes to `/login` and the success toast appears.

### Step 8: Completion criteria
The user navigation loop between registration and login is seamless, responsive, and intuitive.

### Step 9: Requirements covered
- FR-01 (Registration redirect)
- NFR-05 (Usability & Route Flow)

---

# PHASE 3: Backend Initialization

---

## PHASE 3.1: Node.js & Express Server Setup with Environment Variables

### Objective
Initialize the backend Node.js environment, install core server dependencies, configure environment variable parsing via `dotenv`, and launch an Express server on port 5000.

### Concepts I will learn
- Initializing a server-side `package.json` with ES module support (`"type": "module"`).
- Structuring an Express entrypoint (`server.js`).
- Safely reading environment variables with `dotenv`.

### Step 1: Terminal commands
Run in Windows PowerShell from the project root:

```powershell
# Create server directory
New-Item -ItemType Directory -Name "server" -Force
cd server

# Initialize package.json
npm init -y

# Install core backend dependencies
npm install express@^4.19.2 dotenv@^16.4.5 cors@^2.8.5 helmet@^7.1.0

# Install nodemon as a development dependency for hot auto-restart
npm install -D nodemon@^3.1.4

cd ..
```

*Package explanations:*
- `express`: The core HTTP web framework.
- `dotenv`: Loads configuration variables from `.env` into `process.env`.
- `cors`: Middleware to whitelist cross-origin requests from the React client.
- `helmet`: Middleware securing HTTP headers.
- `nodemon`: Utility that automatically restarts the Node application when file changes are detected.

### Step 2: Files and folders
- Create: `server/package.json` (modified to `"type": "module"`)
- Create: `server/.env` (local secrets)
- Create: `server/.env.example` (template with mock placeholders)
- Create: `server/server.js` (main application entrypoint)

### Step 3: What to implement
- In `server/package.json`: Add `"type": "module"` and script:
  ```json
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
  ```
- In `server/.env`:
  ```env
  PORT=5000
  NODE_ENV=development
  CLIENT_URL=http://localhost:5173
  MONGODB_URI=mongodb://localhost:27017/localvault
  JWT_SECRET=super_secret_localvault_jwt_key_learning_project_12345
  SERVER_VAULT_SECRET=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
  ```
- In `server/.env.example`: Replicate the keys with dummy values.
- In `server/server.js`:
  - Load `dotenv.config()`.
  - Initialize `express()`.
  - Add `express.json()` body parser.
  - Listen on `process.env.PORT || 5000`.

### Step 4: Hooks, libraries, and concepts
- **ES Modules (`import/export`):** Using `"type": "module"` in `server/package.json` standardizes JavaScript syntax across both frontend and backend.
- **Environment Isolation:** Secrets are kept out of source code.

### Step 5: Tailwind CSS
Not applicable for backend server code.

### Step 6: Points to ensure
- Server starts on port 5000 without errors.
- `.env` file is excluded by the root `.gitignore`.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
cd server
npm run dev
```
Verify terminal output: `Server running on port 5000 in development mode`.

### Step 8: Completion criteria
The Express server boots successfully and restarts automatically when `server.js` is modified.

### Step 9: Requirements covered
- NFR-02 (Reliability)
- SEC-10 (Environment Isolation)

---

## PHASE 3.2: MongoDB Local Connection via Mongoose & Health Endpoint

### Objective
Connect the Express application to the local MongoDB database using Mongoose and create a public `/api/health` endpoint to verify database connectivity.

### Concepts I will learn
- Connecting to MongoDB via `mongoose.connect()`.
- Handling MongoDB connection lifecycle events (`connected`, `error`, `disconnected`).
- Creating structured REST health-check endpoints.

### Step 1: Terminal commands
Run in Windows PowerShell inside `server/`:

```powershell
cd server
npm install mongoose@^8.6.0
cd ..
```

*Package explanations:*
- `mongoose`: MongoDB object modeling tool providing schema validation, casting, and query building.

### Step 2: Files and folders
- Create: `server/config/db.js`
  - *Responsibility:* Encapsulates Mongoose database connection logic.
- Create: `server/routes/healthRoutes.js`
  - *Responsibility:* Defines the `/api/health` status route.

### Step 3: What to implement
- In `server/config/db.js`:
  - Export an asynchronous `connectDB()` function using `mongoose.connect(process.env.MONGODB_URI)`.
  - Log successful connection with host name (`conn.connection.host`).
  - Gracefully exit the process (`process.exit(1)`) on critical connection failure.
- In `server/routes/healthRoutes.js`:
  - Export an Express router with a `GET /` route returning:
    ```json
    { "status": "ok", "db": "connected", "timestamp": "2026-10-17T..." }
    ```
- In `server/server.js`: Call `connectDB()` before mounting routes.

### Step 4: Hooks, libraries, and concepts
- **Connection Pooling:** Mongoose manages an internal connection pool automatically. Calling `mongoose.connect()` once at server startup serves all incoming requests.

### Step 5: Tailwind CSS
Not applicable for backend code.

### Step 6: Points to ensure
- Server logs `MongoDB Connected: localhost`.
- If MongoDB service is stopped, the server logs a clear connection error instead of hanging indefinitely.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
```
*Expected output:*
```json
status    db        timestamp
------    --        ---------
ok        connected 2026-10-17T...
```

### Step 8: Completion criteria
Mongoose connects to the local database and the `/api/health` endpoint confirms the active connection.

### Step 9: Requirements covered
- Section 14.3 (Health Endpoint)
- NFR-02 (Reliability & Lifecycle Handling)

---

## PHASE 3.3: Security Middleware Pipeline & Centralized Error Handler

### Objective
Equip the Express server with HTTP security headers (Helmet), restricted CORS policies, JSON payload parsing limits, and a centralized error-handling middleware.

### Concepts I will learn
- The Express middleware chain (`(req, res, next) => {}`).
- Protecting HTTP headers against MIME sniffing and clickjacking using Helmet.
- Securing cross-origin communication with CORS options.
- The 4-argument Express error middleware `(err, req, res, next)`.

### Step 1: Terminal commands
No new package installations are needed (`helmet` and `cors` were installed in Phase 3.1).

### Step 2: Files and folders
- Create: `server/middleware/errorMiddleware.js`
  - *Responsibility:* Catches all unhandled errors, formats a uniform JSON error response, and suppresses stack traces in production.
- Modify: `server/server.js`
  - *Responsibility:* Mounts Helmet, CORS, body parsers, and error middleware in the correct order.

### Step 3: What to implement
- Configure Helmet in `server.js`: `app.use(helmet())`.
- Configure CORS in `server.js`:
  ```javascript
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }));
  ```
- Add payload size limits: `app.use(express.json({ limit: '10kb' }))`.
- Build `server/middleware/errorMiddleware.js`:
  - `notFound(req, res, next)`: Creates a 404 error for unknown routes.
  - `errorHandler(err, req, res, next)`:
    - Logs error details internally.
    - Sets appropriate HTTP status code (`res.statusCode === 200 ? 500 : res.statusCode`).
    - Returns standardized JSON: `{ success: false, error: { message: err.message, code: err.code || 'SERVER_ERROR' } }`.

### Step 4: Hooks, libraries, and concepts
- **Middleware Ordering:** Security headers (Helmet) and CORS must execute *before* routes; error handlers must execute *after* all routes as the final middleware.

### Step 5: Tailwind CSS
Not applicable for backend code.

### Step 6: Points to ensure
- Attempting to access an unknown route (e.g. `GET /api/unknown`) returns a 404 JSON error, not default HTML.
- Response headers include `X-Content-Type-Options: nosniff` and lack `X-Powered-By: Express`.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/nonexistent" -Method Get
```
Inspect headers and verify `X-Content-Type-Options: nosniff` is present, and status is 404 with JSON body.

### Step 8: Completion criteria
Security headers are injected, cross-origin requests from ports other than 5173 are rejected, and unhandled errors return clean JSON responses.

### Step 9: Requirements covered
- SEC-08 (Security Headers via Helmet)
- SEC-09 (CORS Whitelisting)
- Section 18.2 (Standardized Error Schema)

---

# PHASE 4: Authentication Backend

---

## PHASE 4.1: User Mongoose Model with Vault Salt Generation

### Objective
Create the User Mongoose model enforcing email uniqueness, storing the bcrypt account password hash, and generating a cryptographically secure random salt for vault key derivation.

### Concepts I will learn
- Designing Mongoose schemas with validation constraints (`unique`, `lowercase`, `trim`).
- Generating random cryptographic bytes in Node.js using `crypto.randomBytes()`.
- Segregating account authentication data from vault encryption parameters.

### Step 1: Terminal commands
Run in Windows PowerShell inside `server/`:

```powershell
cd server
npm install bcryptjs@^2.4.3
cd ..
```

*Package explanations:*
- `bcryptjs`: A pure JavaScript implementation of bcrypt for secure password hashing.

### Step 2: Files and folders
- Create: `server/models/User.js`
  - *Responsibility:* Defines schema and model for user accounts and their associated vault salt.

### Step 3: What to implement
- Define `userSchema` in `server/models/User.js`:
  - `email`: Type String, required, unique, lowercase, trim.
  - `passwordHash`: Type String, required.
  - `vaultSalt`: Type String, required.
  - `timestamps: true`.
- Pre-save hook / model initialization:
  - When creating a user, generate a 16-byte random salt in hex format (`crypto.randomBytes(16).toString('hex')`) to populate `vaultSalt`.

### Step 4: Hooks, libraries, and concepts
- **Salt Uniqueness:** Every user receives an independent, random `vaultSalt`. Even if two users choose the exact same Master Password, their derived Vault Encryption Keys will be completely different.
- **bcrypt Work Factor:** bcrypt internally generates its own salt for `passwordHash`. `vaultSalt` is specifically dedicated to the user's AES key derivation via PBKDF2.

### Step 5: Tailwind CSS
Not applicable for backend code.

### Step 6: Points to ensure
- Email field has a unique index in MongoDB.
- Plaintext password is never stored on the User model.
- `vaultSalt` is automatically populated with a 32-character hex string.

### Step 7: Testing and verification
Create a short verification script or test in `mongosh` after running Phase 4.2 to verify documents in the `users` collection have `email`, `passwordHash` (starting with `$2a$` or `$2b$`), and `vaultSalt`.

### Step 8: Completion criteria
The User schema is defined with strict typing, uniqueness constraints, and salt generation.

### Step 9: Requirements covered
- FR-01 (User Registration schema)
- SEC-01 (bcrypt hashing requirement)
- SEC-05 (Key Separation)

---

## PHASE 4.2: Registration Controller & Zod Validation Middleware

### Objective
Implement defensive request validation using Zod and create the registration controller (`POST /api/auth/register`) that hashes the master password and persists the new user.

### Concepts I will learn
- Request body schema validation using Zod.
- Building an Express validation middleware wrapper.
- Hashing passwords using `bcrypt.hash(password, 12)`.
- Handling MongoDB duplicate key errors (code 11000).

### Step 1: Terminal commands
Run in Windows PowerShell inside `server/`:

```powershell
cd server
npm install zod@^3.23.8
cd ..
```

*Package explanations:*
- `zod`: TypeScript-first schema declaration and validation library with static inference and expressive error messages.

### Step 2: Files and folders
- Create: `server/middleware/validateMiddleware.js`
  - *Responsibility:* Middleware wrapper that validates `req.body` against a given Zod schema.
- Create: `server/validators/authValidators.js`
  - *Responsibility:* Defines Zod schemas for registration and login payloads.
- Create: `server/controllers/authController.js`
  - *Responsibility:* Handles registration, password hashing, and database persistence.
- Create: `server/routes/authRoutes.js`
  - *Responsibility:* Maps `/register` and `/login` endpoints to controller methods.

### Step 3: What to implement
- In `server/validators/authValidators.js`:
  - Define `registerSchema`:
    - `email`: Valid email format, trimmed, lowercase.
    - `password`: Min 8 chars, max 100 chars, regex for at least 1 uppercase, 1 lowercase, 1 digit, 1 special character.
- In `server/middleware/validateMiddleware.js`:
  - If validation fails, return `400 Bad Request` with structured error array.
  - If validation passes, call `next()`.
- In `server/controllers/authController.js` (`registerUser`):
  - Check if user exists (`User.findOne({ email })`). If yes, return `409 Conflict` ("Email is already registered").
  - Hash password: `const passwordHash = await bcrypt.hash(password, 12)`.
  - Generate `vaultSalt = crypto.randomBytes(16).toString('hex')`.
  - Save user to database.
  - Return `201 Created` with `{ success: true, message: "User registered successfully" }`.

### Step 4: Hooks, libraries, and concepts
- **bcrypt Rounds (Cost Factor):** Salt rounds = 12 represents $2^{12} = 4096$ iterations. On a modern laptop, this takes ~250ms, deliberately slowing down brute-force dictionary attacks while remaining imperceptible to the logging-in user.

### Step 5: Tailwind CSS
Not applicable for backend code.

### Step 6: Points to ensure
- Submitting an invalid email returns HTTP 400 with descriptive error details.
- Submitting an existing email returns HTTP 409 without crashing.
- Successful registration returns HTTP 201 without returning the password hash or salt.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
# Test valid registration
$body = @{ email = "tester@localvault.dev"; password = "Password123!" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```
*Expected response:* `{ success: $true, message: "User registered successfully" }`.

### Step 8: Completion criteria
New users can be registered via `POST /api/auth/register`, inputs are strictly validated, and passwords are saved exclusively as bcrypt hashes.

### Step 9: Requirements covered
- FR-01, FR-02, FR-03 (Registration, uniqueness, complexity)
- SEC-01 (bcrypt hashing)

---

## PHASE 4.3: Login Controller, JWT Issuance, & Key Wrapping

### Objective
Implement the login controller (`POST /api/auth/login`) that verifies master passwords with bcrypt, derives the user's vault key, wraps it inside the signed JWT payload, and returns the authentication token.

### Concepts I will learn
- Verifying passwords with `bcrypt.compare()`.
- Deriving 256-bit encryption keys from user passwords via `crypto.pbkdf2Sync()`.
- Encrypting (wrapping) the vault key with `SERVER_VAULT_SECRET` (AES-256-GCM) so the server stays stateless without storing the key in the database.
- Signing JSON Web Tokens with `jsonwebtoken`.

### Step 1: Terminal commands
Run in Windows PowerShell inside `server/`:

```powershell
cd server
npm install jsonwebtoken@^9.0.2
cd ..
```

*Package explanations:*
- `jsonwebtoken`: Library to sign and verify JSON Web Tokens (JWT).

### Step 2: Files and folders
- Create: `server/utils/jwt.js`
  - *Responsibility:* Signs and verifies JWT tokens with wrapped vault payload.
- Create: `server/services/cryptoService.js` (Initial key derivation helpers)
  - *Responsibility:* Contains PBKDF2 key derivation and server key wrapping functions.
- Modify: `server/controllers/authController.js`
  - *Responsibility:* Adds the `loginUser` controller function.

### Step 3: What to implement
- In `server/services/cryptoService.js`:
  - `deriveUserVaultKey(password, salt)`: Returns 32-byte Buffer using `crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256')`.
  - `wrapVaultKey(userVaultKey)`: Encrypts the 32-byte key using AES-256-GCM with `process.env.SERVER_VAULT_SECRET`.
  - `unwrapVaultKey(wrappedKey)`: Decrypts and recovers the 32-byte Buffer.
- In `server/controllers/authController.js` (`loginUser`):
  - Find user by email. If not found, return `401 Unauthorized` ("Invalid email or password").
  - Compare password using `bcrypt.compare(password, user.passwordHash)`. If false, return `401 Unauthorized`.
  - Derive `userVaultKey = deriveUserVaultKey(password, user.vaultSalt)`.
  - Wrap key: `const wrappedKey = wrapVaultKey(userVaultKey)`.
  - Sign JWT containing `{ id: user._id, email: user.email, wrappedKey }` with 2-hour expiration.
  - Return `200 OK` with `{ token, user: { id: user._id, email: user.email } }`.

### Step 4: Hooks, libraries, and concepts
- **Timing Attack Prevention & Generic Errors:** Always return the exact same generic error message ("Invalid email or password") whether the email is not found or the password is wrong. This prevents attackers from enumerating valid registered emails.
- **Why Wrap the Key in JWT?** Storing the vault key in MongoDB would mean any database dump exposes the data. Leaving it in server memory alone breaks if the server restarts. Wrapping it inside the signed JWT encrypted with a server secret means *only an authenticated user with an active session can provide the decryption key to the server*.

### Step 5: Tailwind CSS
Not applicable for backend code.

### Step 6: Points to ensure
- Invalid password returns 401 with generic message.
- Valid login returns a valid JWT string and user object.
- The JWT payload contains the `wrappedKey` and user metadata.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
$body = @{ email = "tester@localvault.dev"; password = "Password123!" } | ConvertTo-Json
$res = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $body -ContentType "application/json"
$res.token
```
Verify that a long 3-part JWT string (`eyJ...`) is returned.

### Step 8: Completion criteria
Users can authenticate with their master password, receive a signed JWT with the wrapped key, and failed attempts produce 401 Unauthorized.

### Step 9: Requirements covered
- FR-04, FR-05 (Login & Generic Error)
- SEC-01, SEC-05 (Authentication & Key Separation)

---

## PHASE 4.4: Authentication Middleware, Rate Limiting & Frontend API Integration

### Objective
Create the Express authentication guard middleware (`protect`), apply brute-force rate limiting to authentication endpoints, and connect the React frontend forms to the live backend API.

### Concepts I will learn
- Verifying Bearer tokens in Express middleware.
- Unwrapping and attaching the derived vault key to `req.user` for downstream controllers.
- Mitigating credential stuffing using `express-rate-limit`.
- Connecting React forms to real backend endpoints using Axios.

### Step 1: Terminal commands
Run in Windows PowerShell inside `server/`:

```powershell
cd server
npm install express-rate-limit@^7.4.0
cd ..
```

*Package explanations:*
- `express-rate-limit`: Basic rate-limiting middleware for Express to prevent brute-force attacks on login.

### Step 2: Files and folders
- Create: `server/middleware/authMiddleware.js`
  - *Responsibility:* Validates `Authorization: Bearer <token>`, unwraps `userVaultKey`, attaches `req.user`.
- Create: `server/middleware/rateLimitMiddleware.js`
  - *Responsibility:* Limits requests to `/api/auth/*` (e.g. 10 requests per 15 minutes per IP).
- Create: `client/src/services/api.js`
  - *Responsibility:* Configures base Axios instance pointing to `http://localhost:5000/api`.
- Create: `client/src/services/authService.js`
  - *Responsibility:* Client functions for `register(data)` and `login(data)`.
- Modify: `client/src/pages/RegisterPage.jsx` and `LoginPage.jsx`
  - *Responsibility:* Replaces simulated timeouts with real `authService` API calls.

### Step 3: What to implement
- In `server/middleware/rateLimitMiddleware.js`:
  - Export `authLimiter`: 10 requests per 15-minute window with message "Too many login attempts. Please try again later."
- In `server/routes/authRoutes.js`: Apply `authLimiter` to `/register` and `/login`.
- In `server/middleware/authMiddleware.js`:
  - Check `req.headers.authorization`. If missing or doesn't start with `Bearer `, return `401 Unauthorized`.
  - Extract token, verify signature with `JWT_SECRET`.
  - Unwrap `userVaultKey = unwrapVaultKey(decoded.wrappedKey)`.
  - Attach `req.user = { id: decoded.id, email: decoded.email, userVaultKey }`.
  - Call `next()`.
- In `client/src/services/api.js`: Set `baseURL: 'http://localhost:5000/api'`.
- Connect `RegisterPage.jsx` and `LoginPage.jsx`:
  - Call `authService.register` / `authService.login`.
  - On error: Extract `err.response?.data?.error?.message` and display with `toast.error()`.

### Step 4: Hooks, libraries, and concepts
- **Axios Error Interception:** Axios automatically rejects promises on HTTP 4xx and 5xx status codes, making it simple to catch API errors in a standard `try...catch` block.

### Step 5: Tailwind CSS
Not applicable for backend logic; frontend forms reuse existing Phase 2 Tailwind styling.

### Step 6: Points to ensure
- Exceeding 10 rapid login attempts returns HTTP 429 Too Many Requests.
- Registering a user from the React UI creates a real document in MongoDB.
- Logging in from the React UI receives a real token and triggers the success toast.

### Step 7: Testing and verification
From the browser at `http://localhost:5173/register`, create a new account `student@localvault.dev` with `VaultPass123!`. Verify the browser redirects to `/login` and displaying the success toast. Then log in and verify the token is returned.

### Step 8: Completion criteria
Frontend registration and login forms communicate directly with the live Express server, with rate limiting and token verification fully operational.

### Step 9: Requirements covered
- FR-01, FR-04, FR-09 (Register, Login, Auth Guard)
- SEC-07 (Rate Limiting)

---

# PHASE 5: Protected Frontend and State Management

---

## PHASE 5.1: Redux Toolkit Store & Auth Slice Setup

### Objective
Configure the global Redux store and create an `authSlice` to track user authentication status, user profile info, token persistence, and logout clearing.

### Concepts I will learn
- Redux Toolkit architecture: `configureStore()`, `createSlice()`, reducers, and actions.
- Synchronizing Redux state with `localStorage` for offline development persistence.
- Ensuring sensitive cryptographic keys are **never** placed into Redux state.

### Step 1: Terminal commands
No new package installations are needed (`@reduxjs/toolkit` and `react-redux` were installed in Phase 1.3).

### Step 2: Files and folders
- Create: `client/src/app/store.js`
  - *Responsibility:* Configures and exports the central Redux store.
- Create: `client/src/features/auth/authSlice.js`
  - *Responsibility:* Redux slice managing `user`, `token`, `isAuthenticated`, `isLoading`, and `error`.
- Modify: `client/src/main.jsx`
  - *Responsibility:* Wraps the root component with `<Provider store={store}>`.

### Step 3: What to implement
- In `client/src/features/auth/authSlice.js`:
  - Initial state: Read `token` and `user` from `localStorage` if present:
    ```javascript
    const token = localStorage.getItem('localvault_token');
    const user = JSON.parse(localStorage.getItem('localvault_user') || 'null');
    ```
  - Reducers:
    - `setCredentials(state, action)`: Sets `token`, `user`, `isAuthenticated = true`, and syncs to `localStorage`.
    - `logout(state)`: Clears `token`, `user`, `isAuthenticated = false`, and purges `localStorage`.
- In `client/src/app/store.js`:
  - Combine reducers with `auth: authReducer`.
- In `client/src/main.jsx`:
  - Import `Provider` from `react-redux` and wrap the app.

### Step 4: Hooks, libraries, and concepts
- **Redux Toolkit (`createSlice`):** Eliminates traditional Redux boilerplate by automatically generating action creators and action types from reducer function names.
- **Security Checkpoint (SEC-06):** Notice that `authSlice` stores *only* the user's ID, email, and the opaque JWT. It **never** stores the user's Master Password or any encryption key!

### Step 5: Tailwind CSS
Not applicable for Redux state setup.

### Step 6: Points to ensure
- Dispatching `logout()` immediately wipes both Redux store and `localStorage`.
- Redux DevTools (if installed in browser) shows clean auth actions without sensitive plaintext.

### Step 7: Testing and verification
In the browser console or React components, test dispatching `setCredentials` and `logout`. Verify `localStorage.getItem('localvault_token')` reflects the expected value.

### Step 8: Completion criteria
Redux store is mounted, `authSlice` manages user authentication state, and token persistence across page refreshes is functional.

### Step 9: Requirements covered
- FR-06 (Logout state clearing)
- SEC-06 (Memory Hygiene)

---

## PHASE 5.2: Axios Auth Interceptors & Token Synchronization

### Objective
Attach an Axios request interceptor to automatically inject `Authorization: Bearer <token>` on all outgoing API calls, and a response interceptor to handle unexpected 401 errors by logging the user out.

### Concepts I will learn
- Axios request and response interceptors.
- Programmatic injection of bearer headers.
- Global handling of token expiration or invalidation.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Modify: `client/src/services/api.js`
  - *Responsibility:* Injects request and response interceptors into the shared Axios client.

### Step 3: What to implement
- In `client/src/services/api.js`:
  - **Request Interceptor:**
    ```javascript
    api.interceptors.request.use((config) => {
      const token = localStorage.getItem('localvault_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    ```
  - **Response Interceptor:**
    ```javascript
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or invalidated
          localStorage.removeItem('localvault_token');
          localStorage.removeItem('localvault_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
    ```

### Step 4: Hooks, libraries, and concepts
- **Centralized Interceptor vs Manual Headers:** Attaching the token via an interceptor ensures that developers never forget to add the `Authorization` header to future vault API calls.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- Every API call made via `api.js` includes the `Authorization` header when a token is present.
- If the server responds with 401 Unauthorized, the user is automatically redirected to `/login`.

### Step 7: Testing and verification
Make a test call to a protected endpoint using `api.get('/auth/me')`. Inspect the browser's Network tab and confirm the `Authorization: Bearer eyJ...` header is attached.

### Step 8: Completion criteria
Axios automatically attaches authentication tokens and gracefully handles expired credentials.

### Step 9: Requirements covered
- FR-09 (Bearer token transmission)
- NFR-02 (Reliable Session Handling)

---

## PHASE 5.3: Protected Route Guards (`<ProtectedRoute />` & `<PublicRoute />`)

### Objective
Create declarative route guards in React Router to prevent unauthenticated users from visiting `/dashboard` and prevent already-authenticated users from visiting `/login` or `/register`.

### Concepts I will learn
- Protecting client-side routes using React Router components.
- Reading Redux state with `useSelector`.
- Seamless redirection using `<Navigate replace />`.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/auth/ProtectedRoute.jsx`
  - *Responsibility:* Renders children or redirects unauthenticated users to `/login`.
- Create: `client/src/components/auth/PublicRoute.jsx`
  - *Responsibility:* Renders children or redirects authenticated users to `/dashboard`.
- Modify: `client/src/App.jsx`
  - *Responsibility:* Wraps route definitions with the appropriate route guard.

### Step 3: What to implement
- Build `ProtectedRoute.jsx`:
  ```javascript
  const ProtectedRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };
  ```
- Build `PublicRoute.jsx`:
  ```javascript
  const PublicRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
  };
  ```
- In `client/src/App.jsx`:
  - Wrap `/login` and `/register` inside `<PublicRoute />`.
  - Wrap `/dashboard` inside `<ProtectedRoute />`.

### Step 4: Hooks, libraries, and concepts
- **`useSelector` Hook:**
  - *Which hook?* `useSelector((state) => state.auth)`
  - *Where?* Inside route guards and Navbar.
  - *Why appropriate?* Subscribes the component to the global authentication state; component automatically re-evaluates when auth state changes.
  - *Why not local state?* Route access decisions must reflect the single source of truth for the entire application.

### Step 5: Tailwind CSS
Not applicable for route logic.

### Step 6: Points to ensure
- Trying to manually visit `http://localhost:5173/dashboard` while logged out immediately redirects to `/login`.
- Trying to visit `http://localhost:5173/login` while logged in immediately redirects to `/dashboard`.

### Step 7: Testing and verification
1. Clear `localStorage` and try to type `/dashboard` in the browser address bar. Verify redirection to `/login`.
2. Log in successfully. Then type `/login` in the address bar. Verify redirection to `/dashboard`.

### Step 8: Completion criteria
Frontend route guards actively enforce authentication boundaries.

### Step 9: Requirements covered
- FR-07 (Unauthenticated redirect)
- FR-08 (Authenticated redirect)

---

# PHASE 6: Vault Encryption Design and Implementation

---

## PHASE 6.1: Key Derivation Service (PBKDF2 with Salt)

### Objective
Implement the cryptographic key derivation logic using Node.js built-in `crypto.pbkdf2Sync()` to derive high-entropy 256-bit AES encryption keys from user passwords and salts.

### Concepts I will learn
- The difference between password hashing (bcrypt) and Key Derivation Functions (PBKDF2).
- Parameters of PBKDF2: Password, Salt, Iterations (100,000), Key Length (32 bytes = 256 bits), Digest (SHA-256).
- Avoiding third-party cryptographic library vulnerabilities by leveraging Node.js native `crypto`.

### Step 1: Terminal commands
No installations needed! Node.js includes the `crypto` module natively.

### Step 2: Files and folders
- Modify: `server/services/cryptoService.js`
  - *Responsibility:* Houses the core key derivation and key wrapping implementations.

### Step 3: What to implement
- Implement `deriveUserVaultKey(masterPassword, saltHex)` in `cryptoService.js`:
  ```javascript
  import crypto from 'crypto';

  export const deriveUserVaultKey = (masterPassword, saltHex) => {
    const saltBuffer = Buffer.from(saltHex, 'hex');
    // 100,000 iterations of HMAC-SHA256 producing a 32-byte (256-bit) key
    return crypto.pbkdf2Sync(masterPassword, saltBuffer, 100000, 32, 'sha256');
  };
  ```

### Step 4: Hooks, libraries, and concepts
- **Why PBKDF2?** Passwords chosen by humans have low entropy (e.g. predictable character patterns). AES-256 requires a uniform, high-entropy 256-bit key. PBKDF2 stretches and hashes the password 100,000 times with a random salt, making rainbow tables and GPU brute-force attacks computationally impractical.

### Step 5: Tailwind CSS
Not applicable for cryptographic backend code.

### Step 6: Points to ensure
- Function consistently produces a 32-byte Buffer.
- Different salts produce completely different 32-byte keys for the same master password.

### Step 7: Testing and verification
Run a one-line test in PowerShell:
```powershell
node -e "const { deriveUserVaultKey } = await import('./server/services/cryptoService.js'); console.log(deriveUserVaultKey('Password123!', '0123456789abcdef0123456789abcdef').length);"
```
*Expected output:* `32`.

### Step 8: Completion criteria
The PBKDF2 key derivation function operates reliably and conforms to cryptographic standards.

### Step 9: Requirements covered
- SEC-02, SEC-05 (Key Derivation & Separation)

---

## PHASE 6.2: Authenticated Cipher Service (AES-256-GCM with IV & Auth Tag)

### Objective
Implement the authenticated encryption and decryption functions using AES-256-GCM, generating a unique 12-byte IV for every encryption and verifying the 16-byte authentication tag upon decryption.

### Concepts I will learn
- Authenticated Encryption with Associated Data (AEAD) via Galois/Counter Mode (GCM).
- Why Initialization Vectors (IVs) must NEVER be reused with the same key.
- How the authentication tag prevents ciphertext tampering or bit-flipping attacks.

### Step 1: Terminal commands
No installations needed (uses Node.js `crypto`).

### Step 2: Files and folders
- Modify: `server/services/cryptoService.js`
  - *Responsibility:* Adds `encryptVaultPassword` and `decryptVaultPassword`.

### Step 3: What to implement
- Implement `encryptVaultPassword(plaintext, keyBuffer)`:
  ```javascript
  export const encryptVaultPassword = (plaintext, keyBuffer) => {
    // 12 bytes is the standard recommended nonce size for GCM
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    
    return {
      encryptedPassword: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag,
    };
  };
  ```
- Implement `decryptVaultPassword(encryptedHex, ivHex, authTagHex, keyBuffer)`:
  ```javascript
  export const decryptVaultPassword = (encryptedHex, ivHex, authTagHex, keyBuffer) => {
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  };
  ```

### Step 4: Hooks, libraries, and concepts
- **Ciphertext Integrity:** If an attacker modifies even a single bit of `encryptedHex` or `authTagHex`, `decipher.final()` will immediately throw an exception (`Unsupported state or unable to authenticate data`). This guarantees that tampered data will never be accepted.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- Encrypting the exact same plaintext string twice produces different `iv` and different `encryptedPassword` values.
- Decrypting with the correct key and tag returns the original plaintext.
- Decrypting with an incorrect key or modified ciphertext throws an error.

### Step 7: Testing and verification
Verified in the standalone test script in Phase 6.3.

### Step 8: Completion criteria
Encryption produces ciphertext, IV, and authTag; decryption accurately reverses the process and enforces authentication tag verification.

### Step 9: Requirements covered
- SEC-02 (AES-256-GCM)
- SEC-03 (Unique 12-byte IVs)
- SEC-04 (Tamper Detection via Auth Tag)

---

## PHASE 6.3: Cryptographic Unit & Tampering Verification Script

### Objective
Create and execute a standalone test script to verify key derivation, authenticated encryption, decryption, incorrect key rejection, and ciphertext tampering detection before integrating with MongoDB.

### Concepts I will learn
- Defensive testing of cryptographic routines.
- Simulating attacker bit-flipping attacks.
- Verifying cryptographic exceptions.

### Step 1: Terminal commands
Run in Windows PowerShell inside `server/`:

```powershell
# Create a temporary test runner
node -e "
import('./services/cryptoService.js').then(async (c) => {
  const salt = '0123456789abcdef0123456789abcdef';
  const key = c.deriveUserVaultKey('MyMasterSecret!', salt);
  const plain = 'SuperSecretVaultPassword123$';
  
  // 1. Test Encryption
  const enc = c.encryptVaultPassword(plain, key);
  console.log('Encryption Success:', enc.encryptedPassword.length > 0);
  
  // 2. Test Decryption
  const dec = c.decryptVaultPassword(enc.encryptedPassword, enc.iv, enc.authTag, key);
  console.log('Decryption Matches:', dec === plain);
  
  // 3. Test Tampering
  try {
    const tampered = enc.encryptedPassword.slice(0, -2) + 'aa';
    c.decryptVaultPassword(tampered, enc.iv, enc.authTag, key);
    console.error('FAIL: Tampered ciphertext was accepted!');
  } catch (err) {
    console.log('Tamper Detection Passed: Tampered ciphertext threw error correctly.');
  }
});
"
```

### Step 2: Files and folders
No persistent files created (verification command).

### Step 3: What to implement
- Execute the script.
- Verify all 3 assertions pass:
  1. Encryption succeeds and produces hex output.
  2. Decryption accurately matches original plaintext.
  3. Tampering with ciphertext throws an authentication failure exception.

### Step 4: Hooks, libraries, and concepts
- **Failing Fast:** Catching cryptographic defects early prevents corrupting persistent user vaults.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- Output logs:
  - `Encryption Success: true`
  - `Decryption Matches: true`
  - `Tamper Detection Passed`

### Step 7: Testing and verification
Confirm the output in PowerShell terminal matches the 3 successful assertions.

### Step 8: Completion criteria
The cryptographic core is 100% verified and ready for model integration.

### Step 9: Requirements covered
- SEC-02, SEC-03, SEC-04 (Cryptographic integrity)

---

# PHASE 7: Vault Backend APIs

---

## PHASE 7.1: VaultItem Mongoose Schema & Ownership Model

### Objective
Create the `VaultItem` Mongoose model defining the schema for encrypted credentials, indexing by `userId` to guarantee performant, isolated queries.

### Concepts I will learn
- Establishing foreign key references in Mongoose (`ref: 'User'`).
- Compound indexing in MongoDB (`{ userId: 1, serviceName: 1 }`).
- Enforcing schema separation between metadata and encrypted fields.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `server/models/VaultItem.js`
  - *Responsibility:* Mongoose schema and model for encrypted vault entries.

### Step 3: What to implement
- Define schema in `server/models/VaultItem.js`:
  - `userId`: `mongoose.Schema.Types.ObjectId`, ref `'User'`, required, indexed.
  - `serviceName`: String, required, trim.
  - `url`: String, trim, default `''`.
  - `username`: String, required, trim.
  - `encryptedPassword`: String, required.
  - `iv`: String, required (hex string).
  - `authTag`: String, required (hex string).
  - `notes`: String, default `''`, trim.
  - `timestamps: true`.
- Add compound index: `vaultItemSchema.index({ userId: 1, serviceName: 1 })`.

### Step 4: Hooks, libraries, and concepts
- **Multi-Tenant Scoping:** All operations will query by `{ _id, userId: req.user.id }`. Indexing `userId` ensures queries scale efficiently as the vault grows.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- Plaintext password is not a field in the schema.
- `encryptedPassword`, `iv`, and `authTag` are all marked as required.

### Step 7: Testing and verification
Ensure the file imports cleanly into `server.js` without syntax or schema definition errors.

### Step 8: Completion criteria
`VaultItem` model is created and configured with compound indexes and required cryptographic fields.

### Step 9: Requirements covered
- FR-11 (Vault item structure)
- SEC-05 (Key separation in DB)

---

## PHASE 7.2: Vault Controller: Create (`POST /api/vault`) & Encrypted Storage

### Objective
Implement the endpoint to add a new credential (`POST /api/vault`), validating input with Zod, encrypting the password with the user's active vault key, and saving the record.

### Concepts I will learn
- Combining validation middleware with authenticated route handlers.
- Encrypting plaintext data on the fly before passing to Mongoose `.save()`.
- Returning sanitized response objects to the client.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `server/validators/vaultValidators.js`
  - *Responsibility:* Zod schema validating vault creation and update payloads.
- Create: `server/controllers/vaultController.js`
  - *Responsibility:* CRUD controller logic for vault entries.
- Create: `server/routes/vaultRoutes.js`
  - *Responsibility:* REST endpoints mapped to `vaultController` with `protect` middleware.
- Modify: `server/server.js`
  - *Responsibility:* Mounts `vaultRoutes` at `/api/vault`.

### Step 3: What to implement
- In `server/validators/vaultValidators.js`:
  - `createVaultItemSchema`: `serviceName` (min 1), `username` (min 1), `password` (min 1), `url` (optional url or empty), `notes` (optional string).
- In `server/controllers/vaultController.js` (`createVaultItem`):
  - Extract `{ serviceName, url, username, password, notes }` from `req.body`.
  - Encrypt: `const { encryptedPassword, iv, authTag } = encryptVaultPassword(password, req.user.userVaultKey)`.
  - Create item:
    ```javascript
    const item = await VaultItem.create({
      userId: req.user.id,
      serviceName,
      url: url || '',
      username,
      encryptedPassword,
      iv,
      authTag,
      notes: notes || '',
    });
    ```
  - Return `201 Created` with the newly created item (including decrypted password for immediate frontend display).

### Step 4: Hooks, libraries, and concepts
- **Strict Authorization:** `userId` is obtained strictly from `req.user.id` (set by the verified JWT). It is *never* accepted from `req.body`.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- Calling `POST /api/vault` without a Bearer token returns 401.
- In MongoDB, the saved document contains hex strings for `encryptedPassword`, `iv`, and `authTag`. No plaintext password exists in the database.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
# Using the token obtained in Phase 4.3:
$headers = @{ Authorization = "Bearer $token" }
$body = @{ serviceName = "GitHub"; username = "student"; password = "MySecretGitPassword123!" } | ConvertTo-Json
$res = Invoke-RestMethod -Uri "http://localhost:5000/api/vault" -Method Post -Headers $headers -Body $body -ContentType "application/json"
$res._id
```
Verify an `_id` is returned. Then check MongoDB via `mongosh`:
```javascript
use localvault;
db.vaultitems.find({ serviceName: "GitHub" });
```
Confirm `encryptedPassword` is a hex string and plaintext is nowhere in the document!

### Step 8: Completion criteria
New vault credentials are encrypted and stored in MongoDB; unauthenticated requests are rejected.

### Step 9: Requirements covered
- FR-11 (Create credential)
- FR-10, FR-13 (Ownership & Encryption)
- SEC-02, SEC-05 (Encryption at rest)

---

## PHASE 7.3: Vault Controller: List & Read with Decryption

### Objective
Implement `GET /api/vault` and `GET /api/vault/:id`, retrieving only the authenticated user's records from MongoDB, decrypting passwords in memory using `req.user.userVaultKey`, and returning them to the client.

### Concepts I will learn
- Scoped query filtering: `VaultItem.find({ userId: req.user.id }).sort({ updatedAt: -1 })`.
- Iterating and decrypting database records efficiently.
- Protecting against cross-user information leakage.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Modify: `server/controllers/vaultController.js`
  - *Responsibility:* Adds `getVaultItems` and `getVaultItemById`.
- Modify: `server/routes/vaultRoutes.js`
  - *Responsibility:* Registers `GET /` and `GET /:id`.

### Step 3: What to implement
- In `server/controllers/vaultController.js`:
  - `getVaultItems`:
    - Fetch items: `const items = await VaultItem.find({ userId: req.user.id }).sort({ updatedAt: -1 });`
    - Map and decrypt:
      ```javascript
      const decryptedItems = items.map(item => ({
        _id: item._id,
        serviceName: item.serviceName,
        url: item.url,
        username: item.username,
        password: decryptVaultPassword(item.encryptedPassword, item.iv, item.authTag, req.user.userVaultKey),
        notes: item.notes,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      ```
    - Return `200 OK` with `decryptedItems`.
  - `getVaultItemById`:
    - Fetch single item: `const item = await VaultItem.findOne({ _id: req.params.id, userId: req.user.id });`
    - If not found, return `404 Not Found`.
    - Decrypt and return `200 OK`.

### Step 4: Hooks, libraries, and concepts
- **Ownership Guarantee:** By passing `{ _id: req.params.id, userId: req.user.id }`, User A can never read User B's vault items, even if they guess or know User B's record `_id`.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- `GET /api/vault` returns an array of credentials owned by the user.
- Decrypted password matches the exact plaintext string submitted during creation.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
$headers = @{ Authorization = "Bearer $token" }
$items = Invoke-RestMethod -Uri "http://localhost:5000/api/vault" -Method Get -Headers $headers
$items[0].password
```
*Expected output:* `MySecretGitPassword123!`.

### Step 8: Completion criteria
Authorized users can retrieve and read their decrypted vault entries; unauthorized access is blocked.

### Step 9: Requirements covered
- FR-12 (List credentials)
- FR-13 (Read decrypted credential)
- FR-10 (Ownership scoping)

---

## PHASE 7.4: Vault Controller: Update & Delete

### Objective
Implement `PUT /api/vault/:id` to modify existing credentials (re-encrypting if password changed) and `DELETE /api/vault/:id` to remove credentials, strictly enforcing user ownership.

### Concepts I will learn
- Re-encryption workflows: when a user updates their saved password, a fresh IV and fresh ciphertext must be generated.
- Clean resource deletion in MongoDB.
- Returning consistent HTTP status codes (`200 OK`, `404 Not Found`).

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Modify: `server/controllers/vaultController.js`
  - *Responsibility:* Adds `updateVaultItem` and `deleteVaultItem`.
- Modify: `server/routes/vaultRoutes.js`
  - *Responsibility:* Registers `PUT /:id` and `DELETE /:id`.

### Step 3: What to implement
- In `server/controllers/vaultController.js`:
  - `updateVaultItem`:
    - Find item owned by user: `const item = await VaultItem.findOne({ _id: req.params.id, userId: req.user.id });`
    - If not found, return `404 Not Found`.
    - Update fields (`serviceName`, `url`, `username`, `notes`).
    - If `password` is provided:
      - Generate fresh encryption: `encryptVaultPassword(password, req.user.userVaultKey)`.
      - Update `encryptedPassword`, `iv`, `authTag`.
    - Save item and return updated decrypted record.
  - `deleteVaultItem`:
    - Delete item: `const result = await VaultItem.findOneAndDelete({ _id: req.params.id, userId: req.user.id });`
    - If not found, return `404 Not Found`.
    - Return `200 OK` with `{ message: "Credential deleted successfully" }`.

### Step 4: Hooks, libraries, and concepts
- **Always Generate Fresh IV on Update:** Never overwrite `encryptedPassword` using the old `iv`. `crypto.randomBytes(12)` must be called anew every time a password is updated.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- Updating a record updates `updatedAt` timestamp and ciphertext.
- Deleting a record removes it from MongoDB.
- Attempting to update or delete another user's item returns 404.

### Step 7: Testing and verification
Run in PowerShell:
```powershell
$headers = @{ Authorization = "Bearer $token" }
# Update
$updateBody = @{ serviceName = "GitHub Enterprise"; username = "student-pro" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:5000/api/vault/$($items[0]._id)" -Method Put -Headers $headers -Body $updateBody -ContentType "application/json"
# Delete
Invoke-RestMethod -Uri "http://localhost:5000/api/vault/$($items[0]._id)" -Method Delete -Headers $headers
```
Verify the item is updated and then deleted.

### Step 8: Completion criteria
The full create-read-update-delete cycle for encrypted vault items is operational and thoroughly tested on the backend.

### Step 9: Requirements covered
- FR-14 (Update credential)
- FR-15 (Delete credential)
- FR-10 (Multi-tenant ownership enforcement)

---

# PHASE 8: Vault Dashboard Frontend

---

## PHASE 8.1: Vault Redux Slice & Async Thunks

### Objective
Create a `vaultSlice` using Redux Toolkit and `createAsyncThunk` to manage loading, caching, creating, updating, and deleting vault items in client state.

### Concepts I will learn
- Asynchronous data fetching using `createAsyncThunk`.
- Handling Promise lifecycles in Redux: `pending`, `fulfilled`, `rejected` with `extraReducers`.
- Client-side cache mutations (adding new items to state without reloading the entire page).

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/services/vaultService.js`
  - *Responsibility:* Wraps Axios calls for vault CRUD (`getAll`, `create`, `update`, `delete`).
- Create: `client/src/features/vault/vaultSlice.js`
  - *Responsibility:* Redux slice managing `items`, `isLoading`, and `error`.
- Modify: `client/src/app/store.js`
  - *Responsibility:* Registers `vault: vaultReducer` into the store.

### Step 3: What to implement
- In `client/src/features/vault/vaultSlice.js`:
  - Thunks:
    - `fetchVaultItems`: Calls `vaultService.getAll()`.
    - `addVaultItem`: Calls `vaultService.create(data)`.
    - `updateVaultItem`: Calls `vaultService.update(id, data)`.
    - `deleteVaultItem`: Calls `vaultService.delete(id)`.
  - Reducers / ExtraReducers:
    - `fetchVaultItems.fulfilled`: Sets `state.items = action.payload`.
    - `addVaultItem.fulfilled`: Inserts new item to front of `state.items` (`state.items.unshift(action.payload)`).
    - `updateVaultItem.fulfilled`: Replaces matching item in `state.items`.
    - `deleteVaultItem.fulfilled`: Filters out deleted item (`state.items = state.items.filter(i => i._id !== action.payload)`).

### Step 4: Hooks, libraries, and concepts
- **Redux Toolkit `extraReducers`:** The builder callback syntax (`builder.addCase(...)`) allows clean, type-safe handling of async actions without manually writing boilerplate action types.
- **Why Redux for Vault Items?** Keeping items in Redux allows instant search filtering, modal editing, and immediate UI updates across different components without prop-drilling or refetching on every modal close.

### Step 5: Tailwind CSS
Not applicable for Redux slice logic.

### Step 6: Points to ensure
- Failed API calls properly populate `state.error` and trigger a toast notification.
- Logging out clears the `vault` items state so subsequent users don't see previous cache.

### Step 7: Testing and verification
Dispatch `fetchVaultItems()` from `DashboardPage.jsx` within a `useEffect`. Inspect Redux DevTools to verify `vault/fetchVaultItems/fulfilled` populates `state.vault.items`.

### Step 8: Completion criteria
Redux manages vault items with optimistic/fulfilled state updates and error handling.

### Step 9: Requirements covered
- FR-12 (Retrieve and cache credentials)
- NFR-01 (Performance & State Architecture)

---

## PHASE 8.2: Dashboard Header, Summary Counter, & Search Bar

### Objective
Build the Dashboard header featuring an item count badge, quick action buttons ("Add Credential", "Generate Password"), and a real-time search input that filters credentials by service name or username.

### Concepts I will learn
- Debounced or immediate client-side filtering using React state.
- Computing derived state without redundant re-renders using `useMemo`.
- Responsive layout building with Tailwind flex and grid.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/pages/DashboardPage.jsx`
  - *Responsibility:* Main dashboard screen hosting search bar, action buttons, and credential list.
- Create: `client/src/components/vault/VaultHeader.jsx`
  - *Responsibility:* Renders search input, item counter, and modal trigger buttons.

### Step 3: What to implement
- In `DashboardPage.jsx`:
  - `searchTerm` state: `const [searchTerm, setSearchTerm] = useState('')`.
  - Fetch items on mount:
    ```javascript
    useEffect(() => {
      dispatch(fetchVaultItems());
    }, [dispatch]);
    ```
  - Compute filtered items with `useMemo`:
    ```javascript
    const filteredItems = useMemo(() => {
      const term = searchTerm.toLowerCase();
      return items.filter(
        item => item.serviceName.toLowerCase().includes(term) ||
                item.username.toLowerCase().includes(term)
      );
    }, [items, searchTerm]);
    ```
- In `VaultHeader.jsx`:
  - Search input with Lucide `Search` icon.
  - Counter badge: `"Showing {filteredItems.length} of {items.length} credentials"`.
  - "Add Credential" primary button (`Plus` icon).
  - "Generator" secondary button (`Key` icon).

### Step 4: Hooks, libraries, and concepts
- **`useMemo` Hook:**
  - *Which hook?* `useMemo(() => ..., [items, searchTerm])`
  - *Where?* Inside `DashboardPage.jsx`.
  - *Why appropriate?* Avoids re-filtering an array of credentials on unrelated re-renders (e.g. when typing into a modal or toggling a dropdown).
  - *Why not `useEffect` + separate state?* Storing filtered items in a separate `useState` causes redundant re-renders and synchronization bugs; derived state with `useMemo` is the idiomatic React solution.

### Step 5: Tailwind CSS
- `flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800`: Responsive header alignment.
- `relative flex-1 max-w-md`: Wraps search input to anchor the search icon.
- `pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:ring-1 focus:ring-indigo-500`: Styled search bar with icon inset.

### Step 6: Points to ensure
- Typing into search immediately filters visible items without page lag.
- If search yields 0 matches, counter indicates `"Showing 0 of X credentials"`.

### Step 7: Testing and verification
Create multiple credentials with different service names (e.g., "GitHub", "Google", "AWS"). Type "git" into the search box and verify that only "GitHub" remains visible.

### Step 8: Completion criteria
The dashboard header displays accurate credential counts and filters items smoothly in real time.

### Step 9: Requirements covered
- FR-16 (Search & filter credentials)
- NFR-05 (Responsive Header Layout)

---

## PHASE 8.3: Credential Card Component (Masked Password, Toggle, Copy Action)

### Objective
Create a responsive credential card displaying service name, username, masked password with show/hide toggle, one-click copy buttons with visual feedback, and edit/delete actions.

### Concepts I will learn
- Masking sensitive strings (`••••••••••••`).
- Copying data to the OS clipboard using `navigator.clipboard.writeText()`.
- Managing temporary feedback state (e.g. "Copied!" checkmark) with `useRef` and `setTimeout`.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/vault/CredentialCard.jsx`
  - *Responsibility:* Renders an individual credential card with interactive controls.
- Create: `client/src/components/common/CopyButton.jsx`
  - *Responsibility:* Reusable copy-to-clipboard button with 2-second checkmark feedback.

### Step 3: What to implement
- Build `CopyButton.jsx`:
  - Accepts `text` (string to copy) and optional `label`.
  - State: `const [copied, setCopied] = useState(false)`.
  - Ref: `const timeoutRef = useRef(null)`.
  - On click:
    ```javascript
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label || 'Value'} copied!`);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    ```
- Build `CredentialCard.jsx`:
  - State: `const [showPassword, setShowPassword] = useState(false)`.
  - Displays:
    - `serviceName` (and link if `url` is present).
    - `username` + `<CopyButton text={item.username} label="Username" />`.
    - Password display: `{showPassword ? item.password : '••••••••••••'}`.
    - Visibility toggle button (`Eye` / `EyeOff` icon).
    - `<CopyButton text={item.password} label="Password" />`.
    - Action buttons: Edit (`Edit3`) and Delete (`Trash2`).
    - Notes indicator if notes exist.

### Step 4: Hooks, libraries, and concepts
- **`useRef` Hook:**
  - *Which hook?* `useRef(null)`
  - *Where?* Inside `CopyButton.jsx`.
  - *Why appropriate?* Stores the timeout ID (`setTimeout`) across re-renders without triggering a re-render when the timer updates.
  - *What problem does it solve?* Prevents memory leaks and race conditions if the user clicks copy multiple times rapidly, ensuring `clearTimeout` can cleanly cancel previous timers.

### Step 5: Tailwind CSS
- `bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-5 transition-all shadow-sm`: Card container.
- `font-mono text-sm tracking-wider bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800/80`: Monospaced password display box.
- `text-emerald-400 bg-emerald-500/10`: Feedback color when copy is successful.

### Step 6: Points to ensure
- Passwords are masked by default when the card mounts.
- Clicking the eye icon toggles the plaintext password visible for only that individual card.
- Clicking the copy button copies the plaintext value and shows a green checkmark for 2 seconds.

### Step 7: Testing and verification
Render a credential card. Click the copy password button. Paste into Notepad to verify the exact password was copied. Verify the checkmark appears and reverts after 2 seconds.

### Step 8: Completion criteria
The credential card renders cleanly, hides passwords by default, and allows one-click copying and toggling.

### Step 9: Requirements covered
- FR-22 (Copy to clipboard)
- FR-23 (Copy visual feedback)
- FR-24 (Masked password toggle)

---

# PHASE 9: Add, Edit, View, and Delete Credentials

---

## PHASE 9.1: Add Credential Modal with Form Validation

### Objective
Build a modal dialog allowing users to enter a new credential with fields for service name, website URL, username, password, and notes, validating inputs and dispatching `addVaultItem`.

### Concepts I will learn
- Accessible modal dialogs in React (backdrop clicks, `Escape` key listeners).
- Connecting modals to Redux async thunks.
- Resetting form state on successful creation.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/common/Modal.jsx`
  - *Responsibility:* Generic reusable modal container with backdrop, title, and close button.
- Create: `client/src/components/vault/AddCredentialModal.jsx`
  - *Responsibility:* Form for creating a new vault entry.
- Modify: `client/src/pages/DashboardPage.jsx`
  - *Responsibility:* Manages `isAddModalOpen` state and renders the modal.

### Step 3: What to implement
- In `Modal.jsx`:
  - Accepts `isOpen`, `onClose`, `title`, and `children`.
  - Uses `useEffect` to attach a keydown listener for `Escape` to call `onClose()`.
  - Disables background scrolling on `document.body` while open.
- In `AddCredentialModal.jsx`:
  - Fields: `serviceName`, `url`, `username`, `password`, `notes`.
  - Inline "Generate" helper button next to the password input that opens the generator or auto-fills a secure password.
  - On submit:
    - Validate required fields (`serviceName`, `username`, `password`).
    - Dispatch `addVaultItem(formData)`.
    - On success: Display `toast.success('Credential saved to vault!')`, reset form, close modal.

### Step 4: Hooks, libraries, and concepts
- **`useEffect` Hook:**
  - *Where?* Inside `Modal.jsx`.
  - *Why appropriate?* Attaches and detaches global DOM event listeners (`window.addEventListener('keydown')`) and controls `document.body.style.overflow`.
  - *Cleanup function:* Must return a cleanup function `() => window.removeEventListener('keydown')` to prevent memory leaks when the modal closes.

### Step 5: Tailwind CSS
- `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm`: Semi-transparent blurred backdrop.
- `w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6`: Modal content window.
- `flex justify-end gap-3 mt-6`: Aligns "Cancel" and "Save" action buttons.

### Step 6: Points to ensure
- Modal closes when clicking the backdrop or pressing `Escape`.
- Submitting an empty form highlights required fields and prevents API submission.
- Saving a credential immediately prepends it to the dashboard list without a full page refresh.

### Step 7: Testing and verification
Click "Add Credential". Fill in "Reddit", "reddit.com", "myuser", "RedditPass123!". Click Save. Confirm modal closes, toast appears, and "Reddit" card appears at the top of the dashboard.

### Step 8: Completion criteria
New credentials can be created seamlessly through the modal interface with instant list updates.

### Step 9: Requirements covered
- FR-11 (Create credential form)
- NFR-05 (Modal Usability & Focus Management)

---

## PHASE 9.2: Edit Credential Modal with Existing Value Hydration

### Objective
Build the edit credential flow, allowing users to modify existing records, pre-populating the form with current values and dispatching `updateVaultItem`.

### Concepts I will learn
- Hydrating form state from an active item object.
- Tracking changes and submitting only modified properties.
- Updating cached Redux records.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/vault/EditCredentialModal.jsx`
  - *Responsibility:* Pre-populated form for editing an existing vault record.
- Modify: `client/src/pages/DashboardPage.jsx`
  - *Responsibility:* Manages `editingItem` state (`null` or `item` object) to control the edit modal.

### Step 3: What to implement
- In `EditCredentialModal.jsx`:
  - Accepts `item`, `isOpen`, `onClose`.
  - Uses `useEffect` to sync form state whenever `item` changes:
    ```javascript
    useEffect(() => {
      if (item) {
        setFormData({
          serviceName: item.serviceName,
          url: item.url || '',
          username: item.username,
          password: item.password,
          notes: item.notes || '',
        });
      }
    }, [item]);
    ```
  - On submit:
    - Dispatch `updateVaultItem({ id: item._id, data: formData })`.
    - Toast: `"Credential updated!"`.
    - Close modal.

### Step 4: Hooks, libraries, and concepts
- **`useEffect` for State Hydration:** When the user clicks "Edit" on different cards sequentially, `useEffect` ensures the form inputs immediately synchronize with the newly selected credential's values.

### Step 5: Tailwind CSS
Reuses modal and form styles from Phase 9.1 for visual consistency.

### Step 6: Points to ensure
- Form displays the current plaintext values of the selected credential.
- Modifying the password and saving causes the backend to re-encrypt with a fresh IV.
- The dashboard card immediately displays the updated service name or username.

### Step 7: Testing and verification
Click the edit icon on "Reddit". Change username to "myuser_v2". Click Save. Verify the card in the dashboard updates immediately to show "myuser_v2".

### Step 8: Completion criteria
Existing credentials can be updated and reflected across the UI and database.

### Step 9: Requirements covered
- FR-14 (Update credential)

---

## PHASE 9.3: Delete Credential Confirmation Dialog & Cache Invalidation

### Objective
Implement a secure deletion flow requiring explicit user confirmation before permanently deleting a credential from the vault and Redux store.

### Concepts I will learn
- Designing confirmation dialogs to prevent accidental data loss.
- Cleaning up client-side Redux cache after deletion.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/common/ConfirmDialog.jsx`
  - *Responsibility:* Reusable warning confirmation dialog ("Are you sure?").
- Modify: `client/src/pages/DashboardPage.jsx`
  - *Responsibility:* Manages `deletingItem` state and executes `deleteVaultItem`.

### Step 3: What to implement
- Build `ConfirmDialog.jsx`:
  - Displays a warning icon (`AlertTriangle` from `lucide-react`).
  - Clear message: `"Are you sure you want to delete credential for {serviceName}? This action cannot be undone."`
  - "Cancel" button and danger "Delete" button (`bg-rose-600 hover:bg-rose-500`).
- In `DashboardPage.jsx`:
  - Clicking the trash icon on a card sets `setDeletingItem(item)`.
  - Clicking "Delete" in the dialog dispatches `deleteVaultItem(deletingItem._id)`.
  - On success: `toast.success('Credential deleted')`, close dialog.

### Step 4: Hooks, libraries, and concepts
- **Destructive Action Confirmation:** Never execute permanent deletions without explicit user confirmation.

### Step 5: Tailwind CSS
- `bg-rose-500/10 text-rose-400 p-3 rounded-full`: Warning icon container.
- `bg-rose-600 hover:bg-rose-500 text-white font-medium px-4 py-2 rounded-lg`: Danger action button.

### Step 6: Points to ensure
- Deletion does not execute if the user clicks "Cancel" or closes the dialog.
- Deletion removes the card from the UI immediately without a page refresh.
- Deletion permanently removes the document from MongoDB.

### Step 7: Testing and verification
Click the delete icon on a test card. Confirm deletion in the dialog. Verify the card disappears and inspecting MongoDB confirms the document no longer exists.

### Step 8: Completion criteria
Credentials can be deleted safely with mandatory confirmation.

### Step 9: Requirements covered
- FR-15 (Delete credential with confirmation)

---

# PHASE 10: Password Generator

---

## PHASE 10.1: Cryptographically Secure Random Password Generator Utility

### Objective
Implement a client-side password generation utility using `window.crypto.getRandomValues()` that allows customizable length and character sets (uppercase, lowercase, numbers, symbols) while strictly avoiding insecure `Math.random()`.

### Concepts I will learn
- Why `Math.random()` is cryptographically broken (predictable PRNG seed).
- How `crypto.getRandomValues()` obtains true operating system entropy.
- Uniform distribution and unbiased character selection from character sets.

### Step 1: Terminal commands
No installations needed (`window.crypto` is a built-in browser API).

### Step 2: Files and folders
- Create: `client/src/utils/passwordGenerator.js`
  - *Responsibility:* Exports `generatePassword(options)` and entropy calculations.

### Step 3: What to implement
- In `client/src/utils/passwordGenerator.js`:
  - Define character pools:
    - Uppercase: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    - Lowercase: `abcdefghijklmnopqrstuvwxyz`
    - Numbers: `0123456789`
    - Symbols: `!@#$%^&*()_+-=[]{}|;:,.<>?`
  - Implement `generatePassword({ length = 16, uppercase = true, lowercase = true, numbers = true, symbols = true })`:
    - Combine selected character pools into a single `charset` string.
    - If `charset` is empty, throw an error ("At least one character set must be selected").
    - Generate random indices using `crypto.getRandomValues(new Uint32Array(length))`.
    - Map each random 32-bit unsigned integer using modulo `% charset.length`.
    - Ensure generated password contains at least one character from each selected set.
    - Return the randomized password string.

### Step 4: Hooks, libraries, and concepts
- **Cryptographic Randomness:** `window.crypto.getRandomValues()` samples the host operating system's entropy pool (e.g. Windows CNG crypto provider), guaranteeing unpredictable, unguessable password generation.

### Step 5: Tailwind CSS
Not applicable for utility logic.

### Step 6: Points to ensure
- Output matches the requested length exactly (e.g. length 20 produces 20 characters).
- If only numbers are selected, output contains strictly digits.
- `Math.random()` is nowhere in the file.

### Step 7: Testing and verification
Run in browser console:
```javascript
import('./src/utils/passwordGenerator.js').then(g => console.log(g.generatePassword({ length: 16 })));
```
Verify a 16-character complex string is logged.

### Step 8: Completion criteria
The generator utility creates secure, customizable random passwords without relying on `Math.random()`.

### Step 9: Requirements covered
- FR-18, FR-19, FR-20, FR-21 (Password Generator rules)

---

## PHASE 10.2: Password Generator Modal / Widget UI with Interactive Controls

### Objective
Build an interactive UI modal/drawer for the password generator with a length slider, character-set checkboxes, a large monospaced preview, a refresh button, and a one-click copy button.

### Concepts I will learn
- Controlled range slider inputs in React (`<input type="range" min="8" max="64" />`).
- Checkbox state management.
- Live password regeneration upon control adjustments.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/generator/PasswordGeneratorModal.jsx`
  - *Responsibility:* Interactive password generator modal.
- Modify: `client/src/components/layout/Navbar.jsx` & `DashboardPage.jsx`
  - *Responsibility:* Adds trigger button to open the generator modal.

### Step 3: What to implement
- In `PasswordGeneratorModal.jsx`:
  - State:
    - `length`: default 16 (range 8 to 64).
    - `options`: `{ uppercase: true, lowercase: true, numbers: true, symbols: true }`.
    - `generatedPassword`: string.
  - Automatically call `generate()` whenever `length` or `options` change:
    ```javascript
    useEffect(() => {
      regenerate();
    }, [length, options]);
    ```
  - Controls:
    - Large text box displaying the generated password with `CopyButton`.
    - Slider for length with dynamic number display (`Length: 16`).
    - 4 toggle checkboxes for Uppercase, Lowercase, Numbers, Symbols.
    - "Regenerate" button (`RotateCw` icon) to generate another password with identical settings.

### Step 4: Hooks, libraries, and concepts
- **`useCallback` Hook:**
  - *Which hook?* `useCallback`
  - *Where?* Inside `PasswordGeneratorModal.jsx` for the `regenerate` function.
  - *Why appropriate?* Memoizes the generator callback so it can be safely passed into `useEffect` without causing infinite re-render loops.

### Step 5: Tailwind CSS
- `font-mono text-lg tracking-wider text-indigo-300 bg-slate-950 p-4 rounded-xl border border-slate-800 break-all`: Password display.
- `accent-indigo-500`: Customizes the HTML5 range slider thumb and checkbox colors to match brand styling.
- `grid grid-cols-2 gap-3`: Responsive 2-column layout for character-set toggles.

### Step 6: Points to ensure
- Moving the slider immediately updates the password length.
- Unchecking all boxes shows an inline warning and disables the copy button.
- Clicking the copy button copies the generated password and displays a confirmation toast.

### Step 7: Testing and verification
Open the generator modal. Adjust slider to 32 characters. Toggle off symbols. Verify generated password adjusts in real time to 32 alphanumeric characters.

### Step 8: Completion criteria
The generator modal is fully interactive, accessible from the navbar, and provides instant copy feedback.

### Step 9: Requirements covered
- FR-18, FR-19, FR-20, FR-21, FR-22 (Generator UI)

---

# PHASE 11: UI Polish and Accessibility

---

## PHASE 11.1: Responsive Viewport Adaptation

### Objective
Refine all layouts (Navbar, Dashboard, Forms, Modals) using Tailwind CSS responsive breakpoints (`sm:`, `md:`, `lg:`) to ensure seamless usability across mobile (375px), tablet (768px), and desktop (1024px+) viewports.

### Concepts I will learn
- Mobile-first responsive design principles with Tailwind.
- Adapting flex direction and grid column counts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- Preventing horizontal scrolling and mobile input zoom.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Modify: `client/src/pages/DashboardPage.jsx`
  - *Responsibility:* Adjusts grid layout for credential cards.
- Modify: `client/src/components/layout/Navbar.jsx`
  - *Responsibility:* Collapses navigation buttons into responsive flex rows on small screens.

### Step 3: What to implement
- In `DashboardPage.jsx`:
  - Credential container: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`.
  - Header search and action buttons wrap cleanly on mobile viewports (`flex-col sm:flex-row`).
- In `client/index.html`:
  - Ensure `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is present.

### Step 4: Hooks, libraries, and concepts
- **Mobile-First Breakpoints:** In Tailwind, unqualified classes apply to mobile (e.g. `grid-cols-1`), while prefixed classes apply at the breakpoint and above (`md:grid-cols-2`).

### Step 5: Tailwind CSS
- `w-full sm:w-auto`: Full-width buttons on mobile, natural content width on desktop.
- `truncate`: Truncates long URLs or emails with an ellipsis to prevent breaking card borders.
- `overflow-x-hidden`: Prevents horizontal scrollbars.

### Step 6: Points to ensure
- No horizontal scrolling occurs on mobile viewports (375px width).
- Modal dialogs fit comfortably on mobile screens with scrollable overflow if content exceeds screen height.

### Step 7: Testing and verification
Open browser DevTools (F12) and toggle Device Toolbar. Test iPhone SE (375px), iPad Mini (768px), and Desktop (1440px). Verify all text, buttons, and cards wrap neatly.

### Step 8: Completion criteria
The interface adapts smoothly to all standard screen sizes without layout breakage.

### Step 9: Requirements covered
- NFR-05 (Responsive Design)

---

## PHASE 11.2: Accessibility & Empty States

### Objective
Enhance accessibility across the application by adding visible keyboard focus outlines, ARIA labels on icon buttons, screen-reader helper texts, and friendly empty states when no items match.

### Concepts I will learn
- Web Content Accessibility Guidelines (WCAG) AA standards.
- Providing text equivalents for icon-only buttons using `aria-label`.
- Designing helpful, non-intimidating empty states.

### Step 1: Terminal commands
No new package installations are needed.

### Step 2: Files and folders
- Create: `client/src/components/common/EmptyState.jsx`
  - *Responsibility:* Reusable empty state graphic and messaging component.
- Modify: `client/src/components/vault/CredentialCard.jsx` & `CopyButton.jsx`
  - *Responsibility:* Injects `aria-label` attributes.

### Step 3: What to implement
- Build `EmptyState.jsx`:
  - Renders a soft shield/key graphic (`ShieldAlert` or `FolderOpen`).
  - Accepts `title`, `description`, `actionLabel`, `onAction`.
- In `CredentialCard.jsx`:
  - Add `aria-label="Toggle password visibility"` to the eye button.
  - Add `aria-label="Edit credential for {serviceName}"` to the edit button.
  - Add `aria-label="Delete credential for {serviceName}"` to the trash button.
- Global focus rings in `client/src/index.css`:
  - Add `*:focus-visible { @apply outline-none ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950; }`.

### Step 4: Hooks, libraries, and concepts
- **Keyboard Navigation (`Tab` key):** Users who cannot use a mouse rely on visible focus rings to navigate forms and trigger buttons.

### Step 5: Tailwind CSS
- `focus-visible:ring-2 focus-visible:ring-indigo-500`: Clear, high-contrast focus indicator for keyboard users.
- `text-slate-400 text-center max-w-sm mx-auto`: Centered styling for empty state text.

### Step 6: Points to ensure
- Pressing `Tab` cycles through all interactive buttons with a bright focus ring.
- Empty vault displays the friendly empty state prompt with an "Add Credential" button.

### Step 7: Testing and verification
Navigate the dashboard using only the keyboard (`Tab`, `Space`, `Enter`). Verify that every button can be reached, focused, and activated.

### Step 8: Completion criteria
All icon buttons have accessible labels, keyboard focus is clearly visible, and empty states guide the user.

### Step 9: Requirements covered
- FR-17 (Empty states)
- NFR-05 (Accessibility & Focus)

---

# PHASE 12: Testing, Security Review, and Debugging

---

## PHASE 12.1: End-to-End User Flow & Multi-User Isolation Verification

### Objective
Execute comprehensive manual testing of the complete user lifecycle and verify that User A cannot read, modify, or delete credentials owned by User B under any circumstances.

### Concepts I will learn
- Multi-tenant security testing.
- Verifying backend route authorization boundaries independently of frontend UI controls.

### Step 1: Terminal commands
Use Windows PowerShell to execute multi-user isolation verification tests.

### Step 2: Files and folders
No new files created (verification phase).

### Step 3: What to implement
- Step 1: Register User A (`alice@localvault.dev`). Log in and save a credential ("Alice Secret Bank", password `AliceBank123!`). Note the credential's `_id`.
- Step 2: Register User B (`bob@localvault.dev`). Log in.
- Step 3: Verify Bob's dashboard shows 0 credentials.
- Step 4: From PowerShell, using Bob's JWT, send a request to read Alice's credential:
  `GET /api/vault/<alice_item_id>`.
  Confirm the backend responds with **404 Not Found**!
- Step 5: Send a request to delete Alice's credential using Bob's JWT:
  `DELETE /api/vault/<alice_item_id>`.
  Confirm the backend responds with **404 Not Found** and Alice's item remains intact!

### Step 4: Hooks, libraries, and concepts
- **Defense in Depth:** The backend controller never relies on the frontend to hide unauthorized items; the database query itself enforces `{ _id, userId: req.user.id }`.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- User B cannot access User A's credentials through the UI or directly via API.
- Tampering with URL parameters never leaks another user's data.

### Step 7: Testing and verification
Execute the steps outlined in Step 3. Confirm that all cross-tenant access attempts return HTTP 404.

### Step 8: Completion criteria
Multi-tenant user data isolation is 100% verified and impenetrable.

### Step 9: Requirements covered
- FR-10 (Multi-user ownership isolation)
- AC-06 (Cross-tenant security)

---

## PHASE 12.2: Security Audit: MongoDB Ciphertext, Redux Storage, & Tampering

### Objective
Audit the local MongoDB database, browser storage, and network payloads to confirm that plaintext master passwords and encryption keys are nowhere to be found, and verify tamper detection.

### Concepts I will learn
- Security auditing of data at rest and data in transit.
- Inspecting browser `localStorage` and memory dumps.
- Validating the absence of sensitive data in server logs.

### Step 1: Terminal commands
Run in Windows PowerShell:

```powershell
# Inspect MongoDB directly via mongosh
mongosh --eval "
use localvault;
print('=== USERS COLLECTION ===');
db.users.find({}, { email: 1, passwordHash: 1, vaultSalt: 1 });
print('=== VAULT ITEMS COLLECTION ===');
db.vaultitems.find({}, { serviceName: 1, encryptedPassword: 1, iv: 1, authTag: 1 });
"
```

### Step 2: Files and folders
No new files created (audit phase).

### Step 3: What to implement
- **MongoDB Audit:**
  - Verify `passwordHash` is a bcrypt string ($2a$ or $2b$).
  - Verify `encryptedPassword`, `iv`, and `authTag` in `vaultitems` are purely hexadecimal strings.
  - Confirm **no plaintext password** exists in the entire database.
- **Browser Audit:**
  - Open DevTools -> Application tab -> Local Storage.
  - Verify only `localvault_token` and `localvault_user` exist.
  - Confirm master password, vault key, or decrypted passwords are **never** in `localStorage`.
- **Ciphertext Tampering Test in Database:**
  - In `mongosh`, artificially modify one letter of a vault item's `encryptedPassword`:
    ```javascript
    db.vaultitems.updateOne({ serviceName: "GitHub" }, { $set: { encryptedPassword: "aaaa" } });
    ```
  - Refresh the React dashboard. Verify that the server returns an error toast ("Failed to decrypt credential") rather than crashing or displaying corrupted garbage.

### Step 4: Hooks, libraries, and concepts
- **Cryptographic Failure Grace:** Centralized error handling catches `Unsupported state or unable to authenticate data` exceptions and safely notifies the user.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- No plaintext passwords in MongoDB.
- No plaintext keys in `localStorage`.
- Tampered database records throw clean cryptographic errors without crashing the server.

### Step 7: Testing and verification
Review the PowerShell `mongosh` output and browser storage inspector. Confirm all audit criteria are satisfied.

### Step 8: Completion criteria
The security audit confirms full compliance with zero-plaintext storage rules.

### Step 9: Requirements covered
- SEC-01, SEC-02, SEC-05, SEC-06 (Security standards)
- AC-05 (Ciphertext storage)

---

# PHASE 13: Final Local Setup and Documentation

---

## PHASE 13.1: Root Scripts, Local Orchestration, & Verification

### Objective
Create root `package.json` scripts to run both the client and server concurrently during local development and provide single-command startup.

### Concepts I will learn
- Running multi-process local development environments.
- Using `concurrently` to coordinate client and server terminal output.

### Step 1: Terminal commands
Run in Windows PowerShell from the project root:

```powershell
# Install concurrently as a root development dependency
npm install -D concurrently@^8.2.2
```

*Package explanations:*
- `concurrently`: Utility to run multiple npm scripts concurrently from a single terminal window.

### Step 2: Files and folders
- Modify: `package.json` (Root level)
  - *Responsibility:* Adds orchestration scripts for `dev`, `install-all`, and `start`.

### Step 3: What to implement
- In root `package.json`:
  ```json
  "scripts": {
    "server": "npm run dev --prefix server",
    "client": "npm run dev --prefix client",
    "dev": "concurrently -n \"SERVER,CLIENT\" -c \"blue,green\" \"npm run server\" \"npm run client\"",
    "install-all": "npm install && npm install --prefix server && npm install --prefix client"
  }
  ```

### Step 4: Hooks, libraries, and concepts
- **Developer Experience (DX):** Running `npm run dev` in the project root starts both Express (port 5000) and Vite (port 5173) in one PowerShell window with color-coded log prefixes.

### Step 5: Tailwind CSS
Not applicable.

### Step 6: Points to ensure
- Running `npm run dev` in the root launches both backend and frontend without port conflicts.
- Pressing `Ctrl+C` cleanly terminates both processes.

### Step 7: Testing and verification
Run in root PowerShell:
```powershell
npm run dev
```
Verify that both `[SERVER]` and `[CLIENT]` log their startup messages.

### Step 8: Completion criteria
Single-command startup operates reliably.

### Step 9: Requirements covered
- NFR-04 (Local Development Simplicity)

---

## PHASE 13.2: Comprehensive Project `README.md` & Developer Handoff

### Objective
Author an exhaustive, professional `README.md` explaining project setup, architecture, security model, environment variables, known limitations, and future improvements.

### Concepts I will learn
- Technical documentation best practices.
- Documenting cryptographic threat models and architectural trade-offs honestly.

### Step 1: Terminal commands
No installations needed.

### Step 2: Files and folders
- Create: `README.md` (Project root)
  - *Responsibility:* Primary project documentation and onboarding guide.

### Step 3: What to implement
- Structure `README.md` with:
  1. **Project Title & Overview:** What LocalVault is and why it was built.
  2. **Architecture & Tech Stack:** Overview of MERN + Tailwind + Node Crypto.
  3. **Security Architecture:** Explaining the master-key derivation, AES-256-GCM authenticated encryption, and key wrapping design.
  4. **Prerequisites on Windows:** Node v20+, local MongoDB Community Server.
  5. **Step-by-Step Installation & Setup:** PowerShell commands to set up `.env` and run `npm run dev`.
  6. **Environment Variables Reference:** Clear table explaining `JWT_SECRET`, `SERVER_VAULT_SECRET`, `MONGODB_URI`, `CLIENT_URL`.
  7. **API Documentation:** Summary of all authentication and vault endpoints.
  8. **Known Limitations & Learning Retrospective:** Honest discussion of server-side memory key handling and future migration to Web Crypto API.

### Step 4: Hooks, libraries, and concepts
- **Honest Security Posture:** Stating clearly that LocalVault is an educational project running locally, detailing where memory touchpoints occur.

### Step 5: Tailwind CSS
Not applicable for documentation.

### Step 6: Points to ensure
- `README.md` is clearly formatted with markdown headings, tables, and code snippets.
- No real production secrets are committed in documentation.

### Step 7: Testing and verification
Preview `README.md` in your markdown viewer. Verify all commands, links, and tables render accurately.

### Step 8: Completion criteria
`README.md` is complete, and the project is fully documented for future development.

### Step 9: Requirements covered
- Section 23 & 24 (DoD, Documentation, and Retrospective)