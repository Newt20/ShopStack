# 🛒 Ecommerce Frontend (React + Vite + TypeScript + Tailwind CSS)

This is the frontend client for the ecommerce application. It provides a modern, responsive UI built with React, Vite, TypeScript, and Tailwind CSS, and connects to the Express.js + MongoDB backend.

---

## 📂 Project Structure

```
├── App.css
├── App.tsx
├── assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components
│   ├── Cart.tsx
│   ├── Navbar.tsx
│   └── ProductList.tsx
├── context
│   └── AuthContext.tsx
├── index.css
├── main.tsx
└── pages
    ├── Home.tsx
    ├── Login.tsx
    └── Register.tsx
 ```

---

## ⚙️ Setup

1. Install dependencies:
   ```bash
   npm install
   npm create vite@latest frontend -- --template react-ts 
   npm install axios react-router-dom
   npm install tailwindcss @tailwindcss/vite 
   ```
   #Configure Vite Plugin, EDit Vite.Config.ts file and add following
   ```bash
   import tailwindcss from '@tailwindcss/vite'
   In the defineConfigfunction -> plugins - add tailwindcss()
    
   export default defineConfig({
   plugins: [tailwindcss(),],
    })

   Add @import "tailwindcss"; #inside the index.css file
   ```

3. Start development server:
   ```
   npm run dev
   ```

The frontend runs on http://localhost:5173 by default.

## 🔗 Backend Connection

The frontend communicates with the backend via REST APIs.

Backend base URL: http://localhost:5000/api

Example usage in code:
```bash
import axios from "axios";

const res = await axios.post("http://localhost:5000/api/users/login", {
  email,
  password,
});
```

Make sure the backend server is running before using the frontend.

## 🧑‍💻 Pages & Features

Home PageDisplays product list fetched from backend (GET /api/products).

Register PageAllows new users to register (POST /api/users/register).On success → redirects to Home.

Login PageAuthenticates existing users (POST /api/users/login).On success → updates AuthContext and redirects to Home.

Cart PageShows items added to cart (GET /api/cart/:userId).Allows adding products (POST /api/cart/add).


## 🧪 Example Flow

Register a new user → redirected to Home.

Login with existing user → redirected to Home, Navbar shows Logout.

Browse products → add items to cart.

View cart → see items tied to logged‑in user.

## 🏗️ Architecture Diagram

          ┌───────────────┐
          │   Frontend    │
          │ React + Vite  │
          │ TypeScript    │
          │ Tailwind CSS  │
          └───────▲───────┘
                  │
                  │ REST API calls
                  │
          ┌───────┴───────┐
          │   Backend     │
          │ Express.js     │
          │ MongoDB        │
          └───────────────┘
