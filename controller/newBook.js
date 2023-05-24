const book = require("../model/book");
const path = require("path");

const newFile = async (req, res) => {
  console.log(req.body, req.fileName);
  const { name, author, price, description, genre, bookImage } = req.body;
  const location = path.join(
    __dirname,
    "../uploadedFiles/" + `${req.fileName}`
  );
  //console.log(location);
  const genreArray = genre.split(",");
  const newBook = {
    bookName: name,
    bookAuthor: author,
    description,
    price,
    location,
    genre: genreArray,
    bookImage,
  };
  try {
    const response = await book.create(newBook);
    console.log(response.location);
    return res.json({ status: "success", book: response });
  } catch (error) {
    console.log(error);
    res.send("error");
  }
};

module.exports = newFile;
