import {
  getAllBooks,
  getOneBook,
  addBook,
  updateBookInDb,
  deleteBook,
} from "../modules/books.js";
import { ObjectId } from "mongodb";

export async function getBooks(req, res) {
  try {
    const books = await getAllBooks();
    console.log(books);
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve books" });
  }
}

export async function getBook(req, res) {
  try {
    const id = req.params.id;
    const book = await getOneBook(id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retireve book" });
  }
}

export async function createBook(req, res) {
  try {
    const {
      title,
      author,
      totalPages,
      pagesRead,
      startReadingDate,
      lastReadDate,
      status,
    } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof author !== "string" ||
      !author.trim() ||
      !Number.isInteger(totalPages) ||
      totalPages <= 0 ||
      !Number.isInteger(pagesRead) ||
      pagesRead < 0 ||
      pagesRead > totalPages
    ) {
      return res.status(400).json({ message: "Invalid book information" });
    }

    const newBook = {
      title,
      author,
      totalPages,
      pagesRead,
      startReadingDate: startReadingDate ? new Date(startReadingDate) : null,
      lastReadDate: lastReadDate ? new Date(lastReadDate) : null,
      status,
    };

    if (
      (newBook.startReadingDate &&
        Number.isNaN(newBook.startReadingDate.getTime())) ||
      (newBook.lastReadDate && Number.isNaN(newBook.lastReadDate.getTime()))
    ) {
      return res.status(400).json({ message: "Invalid date" });
    }

    const result = await addBook(newBook);

    res.status(201).json({
      message: "Book created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create book" });
  }
}

export async function updateBook(req, res) {
  try {
    const bookId = req.params.id;
    const pagesRead = req.body.pagesRead;

    const result = await updateBookInDb(bookId, pagesRead);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Reading progress updated successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error updating reading progress",
    });
  }
}

export async function deleteBookController(req, res) {
  try {
    const bookId = req.params.id;

    const result = await deleteBook(bookId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error deleting book",
    });
  }
}
