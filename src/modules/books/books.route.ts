import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookByID,
  updateBook,
} from "./books.controller";

const booksRoute = express.Router();

booksRoute.post("/", createBook);
booksRoute.get("/:bookId", getBookByID);
booksRoute.get("/", getAllBooks);
booksRoute.put("/:bookId", updateBook);
booksRoute.delete("/:bookId", deleteBook);

export default booksRoute;
