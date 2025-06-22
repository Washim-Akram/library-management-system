# 📚 Library Management System API

A RESTful API built with **TypeScript**, **Express**, and **MongoDB** for managing books in a library, borrowing functionality, and tracking borrow summaries.

---

## 🚀 Features

- 📘 Add, update, delete, and retrieve books
- 🔍 Filter and sort books by genre and metadata
- 📦 Borrow books with inventory validation
- 🧾 Automatically update book availability
- 📊 View borrowed book summaries using MongoDB aggregation
- ⚙️ Comprehensive error handling and clean API responses

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB + Mongoose
- **Validation**: Mongoose Schema validation
- **Error Handling**: Global error middleware

---

## 📦 Getting Started

### ✅ Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas)
- npm or yarn

---

### 🔧 Installation

```bash
git clone https://github.com/Washim-Akram/library-management-system.git
cd library-management-system
npm install
```

---

### ⚙️ Environment Variables

Create a `.env` file in the root directory:

```
PORT=5000
DATABASE_URL=mongodb://localhost:27017/library-management-system
```

---

### 🏁 Run the Server

#### For Development

```bash
npm run dev
```

#### For Production

```bash
npm run build
npm start
```

---

## 🧪 API Endpoints

### ✅ Base URL

```
https://library-management-system-orcin-two.vercel.app
```

---

### 1. 📘 Create a Book

**POST** `/api/books`

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5
}
```

---

### 2. 📚 Get All Books

**GET** `/api/books`

Supports filtering and sorting:

**Example Query:**

```
/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

Query Params:

| Parameter | Description                     |
| --------- | ------------------------------- |
| filter    | Filter by genre                 |
| sortBy    | Field to sort (e.g., createdAt) |
| sort      | `asc` or `desc`                 |
| limit     | Number of results (default: 10) |

---

### 3. 🔍 Get Single Book

**GET** `/api/books/:bookId`

---

### 4. 🗑️ Delete Book

**DELETE** `/api/books/:bookId`

---

### 5. 📦 Borrow a Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

- Validates if copies are available
- Decreases `copies` and updates `available` to `false` if zero

---

### 6. 📊 Borrowed Books Summary

**GET** `/api/borrow`

**Response:**

```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```

---

## 📁 Project Structure

```
src/
├── config/                  # Configuration and environment setup
├── modules/
│   ├── books/
│   │   ├── books.controller.ts   # Book-related controller logic
│   │   ├── books.interface.ts    # TypeScript interfaces for Book
│   │   ├── books.model.ts        # Mongoose schema for Book
│   │   └── books.route.ts        # Routes for Book API
│   └── borrow/
│       ├── borrow.controller.ts  # Borrow-related controller logic
│       ├── borrow.interface.ts   # TypeScript interfaces for Borrow
│       ├── borrow.model.ts       # Mongoose schema for Borrow
│       └── borrow.route.ts       # Routes for Borrow API
├── routes/
│   └── index.ts             # Aggregates and exports all routes
├── app.ts                   # Express app setup and middlewares
└── server.ts                # Entry point to start the server

.env                         # Environment variables
.vercel.json                 # Vercel deployment config
.gitignore                   # Git ignored files
README.md                    # Project documentation
package.json                 # Project metadata and scripts
tsconfig.json                # TypeScript configuration
```

---

## ⚠️ Error Handling

Every error returns a structured JSON response:

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

---

## 🧾 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributions

All contributions, suggestions, and issues are welcome!
Feel free to fork the repo and submit a pull request.

---

## ✉️ Contact

For any issues or queries, feel free to open a [GitHub Issue](https://github.com/Washim-Akram/library-management-system/issues).

---
