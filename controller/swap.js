const SBooks = require("../model/bookreg");

let getbooks= async (req,res)=> {
    try {
        let books = await SBooks.find();
        res.json({books});
        // console.log(books);
    } 
    catch (error) {
        console.log(error);
    }
};
module.exports = getbooks;
