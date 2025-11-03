# 📰 Live News Search (React + Node.js)

## 📌 Overview
**Live News Search** is a full-stack web application that allows users to **search and add news articles dynamically**.  
The system maintains a **real-time inverted index**, so when a new article is added, it becomes searchable instantly — no need for full re-indexing.

---

## 🎯 Features
✅ Add new articles dynamically  
✅ Multi-keyword search support  
✅ Real-time relevance ranking (most relevant results appear first)  
✅ Keyword highlighting in search results  
✅ Clean, responsive UI with Bootstrap 5  
✅ Preloaded sample articles for demo  
✅ Separate pages for “Add Article” and “Search News”

---

## 🧩 Technologies Used
### 🌐 Frontend
- React.js  
- Axios (for API calls)  
- Bootstrap 5 (for responsive UI)

### ⚙️ Backend
- Node.js  
- Express.js  
- In-memory data store (can be extended to MongoDB)

---

## 🧠 How It Works
1. The backend creates a **dynamic inverted index** for all articles.
2. When a new article is added, the index updates instantly.
3. The search system splits user input into words and scores each article by **keyword matches**.
4. Results are returned sorted by **relevance score**.
5. The frontend highlights matched words and shows results in descending order of relevance.

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Om-1209/live-news-search.git
cd live-news-search
