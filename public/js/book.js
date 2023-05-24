console.log("connected");
let book;
const showBook = async () => {
  console.log(location.pathname);
  book = await fetch(location.pathname, {
    method: "post",
  }).then((data) => data.json());

  document.querySelector("#author").innerHTML = book.bookAuthor;
  document.querySelector("#description").innerHTML = book.description;
  document.querySelector("#coins").innerHTML = book.price;
  document.querySelector("#book_name").innerHTML = book.bookName;
  document.querySelector("#img").src = book.bookImage;

  console.log(book);
};
showBook();

const viewBook = () => {
  const viewUrl = book.location.split("\\");
  //console.log(viewUrl);
  location.href = `/bookView/${viewUrl[viewUrl.length - 1]}`;
};
