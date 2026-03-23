# Local Development Guide

This document provides instructions for setting up and running **PixelPerfect** locally.

## Quick Start (Windows)

Double-click the **`local.bat`** file in the root directory. This will:
1. Check for and install dependencies (if missing).
2. Open your default browser to [http://localhost:3000](http://localhost:3000).
3. Start the development server.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 18 or later recommended).
- [npm](https://www.npmjs.com/) (Version 9 or later recommended).

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/pixelperfect.git
cd pixelperfect
```

### 2. Install Dependencies

```bash
npm install
```

---

## Development Workflow

### 1. Start the Development Server

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

### 2. Live Reloading
Next.js will automatically hot-reload the page when you save changes to your code.

### 3. Linting
To check for code errors and style issues:

```bash
npm run lint
```

---

## Production Build

To test the application in a production environment:

### 1. Build the Application

```bash
npm run build
```

### 2. Start the Production Server

```bash
npm run start
```

---

## Technical Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand.docs.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/)

## Troubleshooting

- **Caching**: If you encounter issues with caching, try deleting the `.next` folder and rebuilding.
- **Port Conflicts**: If port 3000 is already in use, you can specify a different port: `npm run dev -- -p 3001`.
- **Dependency Issues**: If you experience errors with `npm install`, try deleting the `node_modules` folder and `package-lock.json`, and then run `npm install` again.
