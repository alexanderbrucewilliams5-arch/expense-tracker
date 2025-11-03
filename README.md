# 💰 Expense Tracker Application (MERN Stack)

A full-stack Expense Tracker Application built with **MongoDB, Express, React, and Node.js**.  
It allows users to add, edit, delete, and filter transactions (income and expenses),  
view summaries by category/type, and visualize spending patterns.

---

## 🚀 Features
- Add, edit, delete transactions
- Filter by type, category, and date range
- Paginated transaction list
- Responsive UI with charts
- Secure backend API with helmet & rate limiting

---

## 🛠️ Tech Stack
**Frontend:** React + Redux Toolkit + TailwindCSS + Vite  
**Backend:** Node.js + Express + MongoDB + Mongoose  
**Security:** Helmet, Express Rate Limit  
**Charting:** Recharts  

---

## ⚙️ Setup Instructions

### 🧩 1. Clone the Repository
```bash
git clone https://github.com/shivlalsharma/expense-tracker.git
cd expense-tracker
```

#### 🧩 2. Backend Setup
```bash
cd backend
npm install
```

#### 🧩 3. Create a .env file inside Backend Folder
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173


#### 🧩 4. Then run:
```bash
npm run dev
```

#### 🧩 5. Your backend should run on:
http://localhost:5000


#### 🧩 6. Frontend Setup
```bash
cd ../frontend
npm install
```

#### 🧩 7. Create a .env file inside Frontend Folder
VITE_BACKEND_URL=http://localhost:5000


#### 🧩 8. Then run:
```bash
npm run dev
```

#### 🧩 9. Your frontend should run on:
http://localhost:5173

## 🧪 API Example

Fetch transactions between dates:

GET http://localhost:5000/api/transaction?startDate=2025-11-01&endDate=2025-11-03

## 🧾 License
This project is licensed under a [custom license](./LICENSE).