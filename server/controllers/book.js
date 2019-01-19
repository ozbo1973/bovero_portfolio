const Book = require("../models/book");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.json(books);
  } catch (error) {
    return res.status(422).send(err);
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await new Book(req.body);
    const newBook = await book.save();
    return res.json(newBook);
  } catch (error) {
    return res.status(422).send(err);
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });
    return res.json(book);
  } catch (error) {
    return res.status(422).send(err);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json(updatedBook);
  } catch (error) {
    return res.status(422).send(err);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const delBook = await Book.findOneAndRemove({ _id: req.params.id });
    return res.json(delBook);
  } catch (error) {
    return res.status(422).send(error);
  }
};
