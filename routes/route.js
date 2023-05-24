const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  login,
  register,
  requireAuth,
  getUser,
  updateDatabase,
  blockUser,
} = require("../controller/auth");
const { getAllBooks, getBook } = require("../controller/dashboard");
const regBook = require("../controller/bookreg");
const getbooks = require("../controller/swap");
//const newFile = require("../controller/newBook");
const {
  addMessage,
  getAllMessages,
  getAllChats,
} = require("../controller/chat");
const newFile = require("../controller/newBook");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadedFiles");
  },
  filename: function (req, file, cb) {
    //console.log(file, req.body);
    const filename = `${Date.now()}.${file.originalname.split(".")[1]}`;
    cb(null, filename);
    req.fileName = filename;
  },
});
const upload = multer({ storage: storage });

router
  .route("/login")
  .post(login)
  .get((req, res) => res.render("login.ejs"));
router
  .route("/register")
  .post(register)
  .get((req, res) => res.render("register.ejs"));

router.route("/home").get((req, res) => res.render("home.ejs", {}));
router.route("/getAllBooks").get(getAllBooks);
router
  .route("/newBook")
  .get(requireAuth, (req, res) => res.render("newBook.ejs"))
  .post(upload.single("file"), newFile);
//router.route("/newBook").post(newFile);

router
  .route("/book/:id")
  .get((req, res) => res.render("book.ejs"))
  .post(getBook);

router.route("/bookView/:id").get((req, res) => res.render("bookView.ejs"));

router
  .route("/chat")
  .get(requireAuth, (req, res) => {
    res.locals.stuff = {
      query: req.query,
    };
    res.render("chat.ejs");
  })
  .get(getAllMessages);

router
  .route("/postbook")
  .get((req, res) => {
    res.render("bookreg.ejs");
  })
  .post(regBook);
router
  .route("/swap")
  .get((req, res) => {
    res.render("swap.ejs");
  })
  .post(getbooks);

router.route("/chat/addMessage").post(addMessage);
router.route("/chat/getAllMessages/").get(getAllMessages);
router.route("/chat/getAllChats/").get(getAllChats);
router.route("/chat/blockUser/").post(blockUser);
router.route("/getUser").get(getUser);

router.route("/updateDatabase").get(updateDatabase);

module.exports = router;
