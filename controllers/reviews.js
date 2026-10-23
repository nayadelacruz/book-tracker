import { addReview, getReviewByBookId } from "../modules/reviews.js";
import { getOneBook } from "../modules/books.js";

export async function createReview(req, res) {
  try {
    const bookId = req.params.id;
    const { rating, reviewText } = req.body;

    // Check if the book exists
    const book = await getOneBook(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Create the review object
    const newReview = {
      bookId: bookId,
      rating: rating,
      reviewText: reviewText,
    };

    // Save review in MongoDB
    const result = await addReview(newReview);

    return res.status(201).json({
      message: "Review created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "This book already has a review",
      });
    }

    return res.status(500).json({
      message: "Failed to create review",
    });
  }
}

export async function getReview(req, res) {
  try {
    const bookId = req.params.id;

    // Check if the book exists
    const book = await getOneBook(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    // Retrieve the review
    const review = await getReviewByBookId(bookId);

    if (!review) {
      return res.status(404).json({
        message: "Review not found for this book",
      });
    }

    return res.status(200).json(review);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to retrieve review",
    });
  }
}
