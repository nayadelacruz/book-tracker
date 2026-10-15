import express from "express";
import { getBooks, getBook, createBook } from "../controllers/books.js";

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBook);
router.post("/new-book", createBook);

export default router;
