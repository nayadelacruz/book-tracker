import { connectToMongoDB } from "./connection.js";
import { ObjectId } from "mongodb";

export async function getAllBooks() {
  const db = await connectToMongoDB();
  const books = await db.collection("books").find({}).toArray();
  return books;
}

export async function getOneBook(id) {
  const db = await connectToMongoDB();
  const book = await db.collection("books").findOne({ _id: new ObjectId(id) });
  return book;
}

export async function addBook(book) {
  const db = await connectToMongoDB();

  const result = await db.collection("books").insertOne(book);

  return result;
}
