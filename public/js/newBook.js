console.log("connected");

const myform = document.getElementById("myform");
const myfile = document.getElementById("myfile");

myform.addEventListener("submit", async (e) => {
  e.preventDefault();
  alert("clicked");
  const formData = new FormData(myform);
  const response = await fetch("http://localhost:8000/newBook", {
    method: "post",
    body: formData,
  }).then((data) => data.json());
  console.log(response);
});
