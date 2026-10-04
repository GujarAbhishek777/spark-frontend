# 🔥 Spark Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Redux%20Toolkit-2.12-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Axios-1.20-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
</p>

> **Spark** is a modern, high-performance web application designed for tech professionals, developers, and creators to connect, swipe, and pair up. Inspired by Tinder's intuitive card-swiping dynamics, Spark bridges developer networking and social matchmaking with tech skill badges, real-time feedback, interactive animations, and responsive dark-mode aesthetics.

---

## 🚀 Key Features

* ⚡ **Interactive Profile Discovery (Feed Stack)**: Tinder-style card deck featuring swipe gestures, smooth left/right keyframe animations, and instant action buttons (*Interested* vs *Pass*).
* 🤝 **Requests & Connection Management**:
  * View incoming connection requests.
  * Accept or reject requests with immediate store updates.
  * Explore your established network of tech connections with detailed skill cards and bios.
* 🎉 **Mutual Match Celebration**: Interactive match modal with full-screen confetti bursts (`canvas-confetti`) when mutual connections occur.
* 🔐 **Authentication & Session Handling**:
  * Secure Signup & Login workflows.
  * Cookie-based JWT persistent session verification via `/profile/view`.
  * Client-side Route Guarding (`ProtectedRoute` & `PublicAuthRoute`).
* 👤 **Profile & Security Customization**:
  * Edit user details, photo URLs, age, gender, skills tags, and bio.
  * Dedicated Password Change module with password validation.
* 🛡️ **Resilience & Fallback Mechanisms**: Automatic fallback to structured mock data when backend endpoints are unreachable, ensuring uninterrupted development and demonstration.
* 🎨 **Premium Modern Dark UI**:
  * Crafted with Tailwind CSS v4, custom glassmorphic cards (`glass-card`, `glass-nav`), and rich flame gradient themes (`bg-spark-gradient`).
  * Dynamic toast notifications (`Toast.jsx`) for real-time user feedback.

---

## 🛠️ Tech Stack & Architecture

### Core Technologies
* **Framework**: [React 19](https://react.dev/)
* **Build Tool & HMR**: [Vite 8](https://vitejs.dev/)
* **Routing**: [React Router DOM v7](https://reactrouter.com/)
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & `react-redux`
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom `@import "tailwindcss";` layer integration
* **Icons & FX**: [Lucide React](https://lucide.dev/) & [Canvas Confetti](https://github.com/catdad/canvas-confetti)
* **HTTP Client**: [Axios](https://axios-http.com/) (configured with `withCredentials: true`)
* **Linter**: [Oxlint](https://oxc.rs/)

---

## 📁 Directory Structure

```text
spark-frontend/
├── public/                # Static assets
├── src/
│   ├── assets/            # Project images and graphics
│   ├── components/        # Reusable UI & Page Components
│   │   ├── ChangePassword.jsx  # Security & password update modal/page
│   │   ├── Connections.jsx     # Accepted connections gallery
│   │   ├── EditProfile.jsx     # Profile edit form component
│   │   ├── Feed.jsx            # Main swipe feed controller
│   │   ├── Login.jsx           # Login interface
│   │   ├── MatchModal.jsx      # Mutual match notification with confetti
│   │   ├── Navbar.jsx          # Glassmorphic header & profile menu
│   │   ├── Profile.jsx         # User profile container
│   │   ├── Requests.jsx        # Incoming interest requests management
│   │   ├── Signup.jsx          # New user registration screen
│   │   ├── Toast.jsx           # Global floating notification toasts
│   │   └── UserCard.jsx        # Swipeable user profile card widget
│   ├── store/             # Centralized Redux Store & Slices
│   │   ├── appStore.js         # Redux store configuration
│   │   ├── userSlice.js        # Authenticated user slice
│   │   ├── feedSlice.js        # Feed discovery stack slice
│   │   ├── requestSlice.js     # Received requests slice
│   │   └── connectionSlice.js  # Connections list slice
│   ├── utils/             # Helper utilities & API clients
│   │   ├── axiosClient.js      # Global Axios instance with credentials
│   │   └── constants.js        # Base URL & Fallback Mock Data
│   ├── App.css            # Component-specific animation styles
│   ├── App.jsx            # Main routing & layout controller
│   ├── index.css          # Base CSS, Tailwind imports, glassmorphism & gradients
│   └── main.jsx           # Application entry point
├── .env                   # Environment variable configuration
├── index.html             # HTML template
├── package.json           # Scripts and dependencies
└── vite.config.js         # Vite configuration plugin
```

---

## ⚙️ Environment Configuration

Create or verify the `.env` file in the root of `spark-frontend`:

```env
VITE_BASE_URL = "https://sparkv1.scalewithabhi.in/api"
```

> 💡 *For local backend development, update `VITE_BASE_URL` to `http://localhost:7777` or your local backend API endpoint.*

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher (or `yarn` / `pnpm`)

### Installation Steps

1. **Navigate to the frontend directory**:
   ```bash
   cd spark-frontend
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 📜 Available Scripts

In the project directory, you can run:

* `npm run dev`
  Launches the Vite development server with Hot Module Replacement (HMR).
* `npm run build`
  Compiles and optimizes the React application for production into the `dist/` directory. Automatically generates `dist/404.html` to support Single Page Application (SPA) routing on static web hosts.
* `npm run preview`
  Locally previews the production build stored in `dist/`.
* `npm run lint`
  Runs `oxlint` for lightning-fast JavaScript code analysis.

---

## 🔌 API Integration Overview

The frontend communicates with the Spark Node.js/Express backend via `axiosInstance` (`src/utils/axiosClient.js`):

| Category | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/signup` | `POST` | Register new user account |
| **Auth** | `/login` | `POST` | Authenticate user & set JWT cookie |
| **Auth** | `/logout` | `POST` | Clear user session cookie |
| **Profile** | `/profile/view` | `GET` | Fetch authenticated user's profile |
| **Profile** | `/profile/edit` | `PATCH` | Update profile details |
| **Profile** | `/profile/password` | `PATCH` | Update user password |
| **Feed** | `/feed` | `GET` | Fetch stack of user profiles for discovery |
| **Request** | `/request/send/:status/:userId` | `POST` | Send interest (`interested` / `ignored`) to a profile |
| **Request** | `/user/requests/received` | `GET` | Fetch pending connection requests |
| **Request** | `/request/review/:status/:requestId` | `POST` | Review request (`accepted` / `rejected`) |
| **Connections** | `/user/connections` | `GET` | Fetch list of mutual connections |

---

## 🧠 Redux State Architecture

The application utilizes a modular Redux store (`src/store/appStore.js`):

* `user`: Stores currently authenticated user data (`null` if unauthenticated).
* `feed`: Array of potential matches loaded into the swipe card deck.
* `requests`: List of received connection requests waiting for review.
* `connections`: Array of active mutual tech connections.

---

## 🌐 Deployment

### Building for Production
Run the build script:
```bash
npm run build
```

This generates:
* Production assets in `dist/`
* `dist/404.html` duplicate for SPA rewrite handling on GitHub Pages, Cloudflare Pages, Netlify, or Nginx.

### Nginx Configuration Example
When serving `dist/` via Nginx, ensure SPA route fallback is configured:
```nginx
location / {
    root /var/www/spark-frontend/dist;
    try_files $uri $uri/ /index.html;
}
```

---

## 📄 License & Attribution

Developed as part of the **Spark Platform**.  
© 2026 **Spark Dating & Tech Connections**. Built by [ScaleWithAbhi](https://scalewithabhi.in).
