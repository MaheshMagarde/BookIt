const book = require("../model/book");
const User = require("../model/auth");

const getAllBooks = async (req, res) => {
  const allBooks = await book.find({});
  res.json({ status: "success", books: allBooks });
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const bookData = await book.find({ _id: id });
  res.json(...bookData);
};

module.exports = { getAllBooks, getBook };
