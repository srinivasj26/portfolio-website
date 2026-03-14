# srinivasj.dev - Portfolio Website

A modern, high-performance portfolio website built with **React 19**, **Three.js**, and **Framer Motion**. This project features a sophisticated 3D hero section, custom cursor interactions, and an interactive "Agent Sandbox" demonstration.

## ✨ Features

-   **3D Hero Scene:** Immersive 3D environments powered by `@react-three/fiber` and `@react-three/drei`.
-   **Interactive Agent Sandbox:** A showcase for agentic AI behaviors and sandbox interactions.
-   **Custom Motion & Interactions:** Fluid animations and magnetic button effects using `framer-motion`.
-   **Experience Timeline:** A chronological overview of professional journey and skills.
-   **Modern UI/UX:** Glassmorphism, premium typography, and a tailored dark-mode aesthetic.

## 🛠 Tech Stack

-   **Framework:** [React 19](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **3D Rendering:** [Three.js](https://threejs.org/) / [R3F](https://r3f.docs.pmnd.rs/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Styling:** Vanilla CSS with modern custom properties.

## 🚀 Getting Started

### Prerequisites

-   Node.js (latest LTS recommended)
-   npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

### Build

Build for production:
```bash
npm run build
```

## 📂 Project Structure

-   `src/components/`: Modular React components (Hero, Skills, Scene, etc.).
-   `src/data/`: JSON content (experience, skills, identity, recognition). Recognition uses `recognition.json` (array of `{ title, description, date?, issuer? }`); section is hidden when the array is empty.
-   `src/test/`: Test setup and utilities.
-   `src/*.css`: Component and section-specific styles.
-   `public/`: Static assets and textures.

### Tests

Run the test suite:

```bash
npm run test        # watch mode
npm run test:run    # single run (CI)
```

## 🔮 Future improvements

-   **Profile links:** Update `src/data/identity.json` with your real GitHub and LinkedIn profile URLs (replace `srinivasj` in the paths if your username differs).
-   **Experience:** Edit the optional “Open source & side projects” entry in `src/data/experience.json`, or remove it if you prefer a single role.
-   **E2E:** Add Playwright or Cypress for critical user flows.
-   **Deploy:** Add a deployment section (e.g. Vercel, Netlify) and link the live URL in the README.

## 📜 License

Private. All rights reserved.
