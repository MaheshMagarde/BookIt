const mongoose = require("mongoose");

const SwapBookSchema = new mongoose.Schema({
  id :{
    type : String,
    required : [1,"Id Not Valid"],
  },
  bookHave: {
    type: String,
    required: [true, "please provide Book Name"],
    maxlength: 50,
  },
  bookAuthor: {
    type: String,
    required: [true, "please provide Author of Book"],
    maxlength: 100,
  },
  bookWant: {
    type: Array,
    required: [true, "please provide Description of Book"],
  },
  Abookwant: {
    type: Array,
    required: [true, "please provide book location"],
  },
});

module.exports = mongoose.model("SwapBook", SwapBookSchema);