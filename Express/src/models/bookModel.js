import books from "../data/bookData.js";

export default class Book {
    static findAll() {
        return new Promise((resolve, reject) => {
            resolve(books);
        });
    }
}