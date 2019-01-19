const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  price: Number
});

module.exports = mongoose.model("Book", bookSchema);
