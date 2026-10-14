import { getAllBooks, getOneBook, addBook } from "../modules/books.js";

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
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retireve book" });
  }
}
