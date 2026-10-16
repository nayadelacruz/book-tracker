import express from "express";
import { getBooks, getBook, createBook } from "../controllers/books.js";

const router = express.Router();
//Working routes
router.get("/books", getBooks);
router.post("/new-book", createBook);

//Future routes
router.get("/books/:id", getBook);
router.put("/books", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
