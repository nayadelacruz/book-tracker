import express from "express";
import { getBooks, getBook, createBook } from "../controllers/books.js";

const router = express.Router();
//Working routes
router.get("/books", getBooks);
router.post("/new-book", createBook);

//Future routes
router.get("/books/:id", getBook);
router.put("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.delete("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

export default router;
