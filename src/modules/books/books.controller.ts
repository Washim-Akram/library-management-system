import { NextFunction, Request, Response } from "express";
import Book from "./books.model";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const createdBookData = await Book.create(payload);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: createdBookData,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const query: any = {};

    if (filter) {
      query.genre = filter;
    }

    const sortDirection = sort === "asc" ? 1 : -1;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sortDirection })
      .limit(parseInt(limit as string, 10));

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const getBookByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getBookID = req.params.bookId;
    const book = await Book.findById(getBookID);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updatedBody = req.body;
    const updatedData = await Book.findByIdAndUpdate(bookId, updatedBody, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid Id",
      error: (error as Error).message,
    });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid Id",
      error: (error as Error).message,
    });
  }
};

export { createBook, deleteBook, getAllBooks, getBookByID, updateBook };
