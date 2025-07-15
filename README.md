# 🧭 cvFlows Front-End

This is the **TypeScript React** front-end for **cvFlows**, a platform for creating, managing, and securely sharing resumes online.

It connects to the [cvFlows API](https://interactive-cv-backend-latest.onrender.com) to authenticate users, manage documents, and enable public CV sharing.

---

## 🚀 Features

- ⚡ **React + TypeScript** front-end
- 🔐 JWT auth via httpOnly cookies
- 🛡️ CSRF double-submit protection
- 📄 Rich CV editor and entry management in a graph like interface
- 🌐 Public shareable CV views
- 🖨️ PDF export support via back-end
- 🎯 Responsive design

---

## 🧱 Technologies & Dependencies

- React
- TypeScript
- React Router
- Axios or Fetch
- Tailwind CSS (optional)
- Vite or Create React App
- Docker (optional)

---

## 📦 Getting Started

Clone the repository:

```bash
git clone https://github.com/aurelien-darbellay/s05t02_front_typescript.git
cd s05t02_front_typescript
Install dependencies:
npm install

Run in development:
npm run dev

Build for production:
npm run build

Preview production build:
npm run preview

## 🌐 Environment Variables
Example .env file:

env
Copiar
Editar
VITE_API_BASE_URL=https://interactive-cv-backend-latest.onrender.com

📦 Deployment
Example (replace with your actual live link):
cvflows.netlify.app

🔗 Related Repositories
Back-End: cvFlows API

📥 ➡️ 🛠️ ➡️ ✅ CI/CD
If using GitHub Actions:

Example workflow file:

bash
Copiar
Editar
.github/workflows/deploy.yml
