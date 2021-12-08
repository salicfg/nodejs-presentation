import { commonControllerHandler } from "../utils.js";
import Book from "../models/bookModel.js";

export function findAll(req, res) {
  commonControllerHandler(res, async () => {
    const allBooks = await Book.findAll();
    res.status(200).send(allBooks);
  });
}
