console.log("connected");

const formButton = document.querySelector("#formButton");
const myform = document.querySelector("#myform");

myform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(myform);
  const loadData = new URLSearchParams(formData);
  console.log("submit click");
  const response = await fetch("/register", {
    method: "post",
    body: loadData,
  }).then((data) => data.json());

  //console.log(response.status === "success");

  if (response.status === "success") {
    alert("user created");
    location.href = "/login";
  } else {
    alert(response.msg);
  }

  e.preventDefault();
});
