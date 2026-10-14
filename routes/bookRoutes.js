import express from "express";
import { getBooks } from "../controllers/books.js";
import { getBook } from "../controllers/books.js";

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBook);

export default router;
