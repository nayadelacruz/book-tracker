import express from "express";
import { validateRequest } from "../validators/validate.js";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBookController,
} from "../controllers/books.js";
import {
  updateBookRules,
  bookIdRules,
  createBookRules,
} from "../validators/bookValidator.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = express.Router();
// Protect ALL routes below this line
router.use(requireAuth);

//Working routes
router.get("/books", getBooks);
router.get("/books/:id", bookIdRules, validateRequest, getBook);
router.post("/new-book", createBookRules, validateRequest, createBook);
router.put(
  "/books/:id",
  bookIdRules,
  updateBookRules,
  validateRequest,
  updateBook,
);
router.delete("/books/:id", bookIdRules, validateRequest, deleteBookController);

export default router;
