# 📝 Todo App (Full Stack)

## 🛠 Tech Stack & Versions

### Backend

* Python: 3.11
* FastAPI: 0.110.0

### Frontend

* React: 19.2.5
* React DOM: 19.2.5
* React Scripts: 5.0.1
* Node.js: v22.12.0

This project is a full-stack Todo application built with:

* **Frontend:** React
* **Backend:** FastAPI (Python)
* **Database:** PostgreSQL

The project is structured into two folders:

```
/backend
/frontend
```

---

## 🚀 Quick Start Guide

Follow the steps below to run the application locally.

---

## 1️⃣ Clone the Repository

```bash
git clone <repo-url>
cd <c2_intern_assement>
```

---

## 2️⃣ Setup Python Virtual Environment

Make sure you have **Python 3.11** installed.

```bash
py -3.11 -m venv todo
```

Activate the environment:

**Windows:**

```bash
todo\Scripts\activate
```

---

## 3️⃣ Setup Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Configure Environment Variables

Inside the `backend` folder, locate the `.env` file.

Update the following:

```env
DATABASE_URL=postgresql://postgres:<your-password>@localhost:5432/todo_db
API_KEY=supersecret123
```

Replace `<your-password>` with your PostgreSQL password.

---

## 5️⃣ Setup PostgreSQL Database

Make sure PostgreSQL is installed and running.

Run:

```sql
CREATE DATABASE todo_db;
```

---

## 6️⃣ Run the Backend Server

```bash
uvicorn main:app --reload
```

Open:

```
http://localhost:8000
```

---

## 🧩 Frontend

The frontend is included for code evaluation.
The app is structured so the backend serves everything for easier testing.

---

## ⚠️ Notes

* Ensure PostgreSQL is running
* Default port is **5432**
* API key: `supersecret123`
* If you experience any issues, please reach out

---
