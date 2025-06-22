import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Book from "../books/books.model";
import Borrow from "./borrow.model";

const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!mongoose.isValidObjectId(bookId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid book ID" });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }

    if (book.copies < quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Not enough copies available" });
    }

    // Update book stock
    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }

    await book.save();

    // Create borrow record
    const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    next(error);
  }
};

const getBorrowedBooksSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(error);
  }
};

export { borrowBook, getBorrowedBooksSummary };
