import express from "express";
import { borrowBook, getBorrowedBooksSummary } from "./borrow.controller";

const borrowRoute = express.Router();

borrowRoute.post("/", borrowBook);
borrowRoute.get("/", getBorrowedBooksSummary);

export default borrowRoute;
