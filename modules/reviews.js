import { connectToMongoDB } from "./connection.js";
import { ObjectId } from "mongodb";

export async function addReview(review) {
  const db = await connectToMongoDB();

  const newReview = {
    bookId: new ObjectId(review.bookId),
    rating: review.rating,
    reviewText: review.reviewText,
    createdAt: new Date(),
    updateedAt: new Date(),
  };

  const result = await db.collection("reviews").insertOne(newReview);
  return result;
}

export async function getReviewByBookId(bookId) {
  const db = await connectToMongoDB();

  const review = await db.collection("reviews").findOne({
    bookId: new ObjectId(bookId),
  });

  return review;
}
