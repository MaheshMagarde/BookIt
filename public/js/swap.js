const func = async () => {
  // window.alert("Function called");
  response = await fetch(`/swap`, {
    method: "post",
  }).then((data) => data.json());
  // console.log(response);
  setbook(response.books);
};

const setbook = (resp) => {
  let cards = "No Book Available";
  // console.log(resp);
  resp.forEach((book) => {
    if (cards === "No Book Available") {
      cards = `<div id="book">
                    <form action="/chat" >
                        <input type="hidden" name="user" value="${book.id}">
                        <h1 id="UName">Mahesh Magarde</h1><br>
                        <label class="ABook"> Available Book : </label>
                        <p> <b class="BName"> ${book.bookHave} </b> <small class="AName">(${book.bookAuthor})</small></p>
                        <label class="EXBook"> Want Exchange with</label>
                        <p> <b class="ExBName"> ${book.bookWant[0]}</b> <small class="ExBAName">(${book.Abookwant[0]})</small></p>
                        <p> <b class="ExBName"> ${book.bookWant[1]}</b> <small class="ExBAName">(${book.Abookwant[1]})</small></p>
                        <p> <b class="ExBName"> ${book.bookWant[2]}</b> <small class="ExBAName">(${book.Abookwant[2]})</small></p>
                        <button type="submit" class="testbutton" onclick=messageUser()>Swap Request</button>
                    </form>
                  </div>`;
    } else {
      cards += `<div id="book">
                    <form action="/chat" >
                        <input type="hidden" name="user" value="${book.id}">
                        <h1 id="UName">Mahesh Magarde</h1><br>
                        <label class="ABook"> Available Book : </label>
                        <p> <b class="BName"> ${book.bookHave} </b> <small class="AName">(${book.bookAuthor})</small></p>
                        <label class="EXBook"> Want Exchange with</label>
                        <p> <b class="ExBName"> ${book.bookWant[0]}</b> <small class="ExBAName">(${book.Abookwant[0]})</small></p>
                        <p> <b class="ExBName"> ${book.bookWant[1]}</b> <small class="ExBAName">(${book.Abookwant[1]})</small></p>
                        <p> <b class="ExBName"> ${book.bookWant[2]}</b> <small class="ExBAName">(${book.Abookwant[2]})</small></p>
                        <button type="submit" class="testbutton">Swap Request</button>
                    </form>
                  </div>`;
    }
  });
  document.getElementById("container").innerHTML = cards;
};

func();

function messageUser() {
  console.log("click");
}
