import express from "express";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBookController,
} from "../controllers/books.js";
import {
  updateBookRules,
  validateBook,
  bookIdRules,
  createBookRules,
} from "../validators/bookValidator.js";

const router = express.Router();
//Working routes
router.get("/books", getBooks);
router.get("/books/:id", bookIdRules, validateBook, getBook);
router.post("/new-book", createBookRules, validateBook, createBook);
router.put(
  "/books/:id",
  bookIdRules,
  updateBookRules,
  validateBook,
  updateBook,
);
router.delete("/books/:id", bookIdRules, validateBook, deleteBookController);

export default router;
