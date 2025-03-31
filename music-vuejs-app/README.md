# 📀 Audiocracy - Vue.js Frontend

This repository contains the frontend, built with Vue.js and Vite.

## 🚀 Features

- User authentication (Register & Login)
- Album listing with upvote/downvote functionality
- Search and sort albums
- Pagination or lazy loading for performance
- Admin role for album management

---

## 📌 Installation & Setup

### **1️⃣ Prerequisites**

Ensure you have the following installed:

- **Node.js**
- **npm**

### **2️⃣ Install Dependencies**

```sh
cd music-vuejs-app
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the root directory and add:

```env
VITE_API_HOST=http://localhost:8000
```

Adjust the `VITE_API_HOST` to match your backend API URL.

### **4️⃣ Run the Development Server**

```sh
npm run dev
```

Then open **http://localhost:5173/** in your browser.

---

## 📁 Project Structure

```
📦 music-vuejs-app
├── 📂 src
│   ├── 📂 assets          # Static assets (CSS, images, etc.)
│   ├── 📂 components      # Reusable Vue components
│   ├── 📂 composables     # Vue 3 composables (state & logic reusability)
│   ├── 📂 router          # Vue Router configuration
│   ├── 📂 views           # Page-level components
│   ├── App.vue           # Root Vue component
│   ├── main.ts           # Entry point
│   ├── axios.ts          # Axios instance configuration
├── .env                  # Environment variables
├── .env-template         # env file template
├── vite.config.ts         # Vite configuration
└── package.json          # Project dependencies & scripts
```
