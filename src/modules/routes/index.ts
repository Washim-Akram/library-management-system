import express from "express";
import booksRoute from "../books/books.route";
import borrowRoute from "../borrow/borrow.route";

const routes = express.Router();

routes.use("/api/books", booksRoute);
routes.use("/api/borrow", borrowRoute);

export default routes;
