console.log("connected");
const books = document.getElementById("books-display");
let allBooks;

const getAllBooks = async () => {
  const response = await fetch("http://localhost:8000/getAllBooks").then(
    (data) => data.json()
  );
  allBooks = response.books;
  console.log(allBooks);
  showBooks();
};
getAllBooks();

const loadPage = (img) => {
  location.href = `/book/${img.id}`;
};
/* <div class="books-display">
        <div class="books">
            <img src="/Images/hound of baskerville.jpg" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/loose end book.jpg" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/missing by adam nicolas.webp" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/mysterious affair at styles.avif" style="width: 180px; height:280px;">
        </div>
        <div class="books">
            <img src="/Images/women in white.jpg" style="width: 180px; height:280px;">
        </div>
    </div> */
{
  /* <h1 style="margin-left:45%; font-size: 40px;">Fiction</h1>
        <br>
        <br>
        <div class="book-slider">
            <div class="slide-track">
                <div class="books">
                    <img src="/images/hound of baskerville.jpg" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/loose end book.jpg" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/missing by adam nicolas.webp" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/mysterious affair at styles.avif" style="width: 180px; height:280px;">
                </div>
                <div class="books">
                    <img src="/images/women in white.jpg" style="width: 180px; height:280px;">
                </div>
            </div>
        </div> */
}
const showBooks = () => {
  const booksDiv = document.querySelector("#booksContainer");
  const genres = new Set();
  allBooks.forEach((book) => {
    book.genre.forEach((gen) => genres.add(gen));
  });
  genres.forEach((genre) => {
    const bookArray = allBooks.filter((book) => book.genre.includes(genre));
    let card = ``;
    bookArray.forEach((book) => {
      card += `
      <img id=${book._id}  src=${book.bookImage} style="width: 180px; height:280px;" onclick=loadPage(this)>
      `;
    });
    let bookCard = `
    <div>
      <h1 style="margin-left:45%; font-size: 40px;">${genre}</h1>
        <br>
        <br>
        <div class="slide-track">
      <div class="books">
        ${card}
      </div>
      </div>
    </div>
    `;
    booksDiv.innerHTML += bookCard;
  });

  // <div>
  //   <h3>${genre}</h3>
  //   <div></div>
  // </div>;

  console.log(genres);
};
