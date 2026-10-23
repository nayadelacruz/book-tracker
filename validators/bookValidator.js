import { body, param } from "express-validator";
import { getOneBook } from "../modules/books.js";

export const bookIdRules = [
  param("id").isMongoId().withMessage("Invalid book ID"),
];

export const updateBookRules = [
  body("pagesRead")
    .isInt({ min: 0 })
    .withMessage("Pages read must be a non-negative integer")
    .custom(async (pagesRead, { req }) => {
      // Don't query MongoDB if the ID is invalid
      if (!/^[a-fA-F0-9]{24}$/.test(req.params.id)) {
        return true;
      }

      // Retrieve the book from MongoDB
      const book = await getOneBook(req.params.id);

      // Let the controller handle books that don't exist
      if (!book) {
        return true;
      }

      // Compare reading progress against total pages
      if (Number(pagesRead) > book.totalPages) {
        throw new Error("Pages read cannot exceed the book's total pages");
      }

      return true;
    }),
  param("id").isMongoId().withMessage("Invalid book ID"),
];

export const createBookRules = [
  body("title").isString().notEmpty().withMessage("Title is required"),

  body("author").isString().notEmpty().withMessage("Author is required"),

  body("totalPages")
    .isInt({ min: 1 })
    .withMessage("Total pages must be greater than 0"),

  body("pagesRead")
    .isInt({ min: 0 })
    .withMessage("Pages read must be a non-negative integer")
    .custom((pagesRead, { req }) => {
      if (pagesRead > req.body.totalPages) {
        throw new Error("Pages read cannot exceed total pages");
      }
      return true;
    }),

  body("startReadingDate")
    .optional({ values: "null" })
    .isISO8601()
    .withMessage("Invalid start reading date"),

  body("lastReadDate")
    .optional({ values: "null" })
    .isISO8601()
    .withMessage("Invalid last read date"),

  body("status")
    .isIn(["Reading", "Completed", "Not Started"])
    .withMessage("Invalid reading status"),
];
