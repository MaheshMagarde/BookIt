const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: [true, "please provide Book Name"],
    maxlength: 50,
  },
  bookAuthor: {
    type: String,
    required: [true, "please provide Author of Book"],
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "please provide Description of Book"],
  },
  location: {
    type: String,
    required: [true, "please provide book location"],
  },
  price: {
    type: Number,
    required: [true, "please provide price of book"],
  },
  bookImage: {
    type: String,
  },
  genre: {
    type: Array,
  },
});

module.exports = mongoose.model("Book", BookSchema);
