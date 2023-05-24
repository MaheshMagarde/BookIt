console.log("connected");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const myform = document.querySelector("#myform");
const loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  // const formData = new FormData(myform);
  // const loadData = new URLSearchParams(formData);
  const obj = {
    email: email.value,
    password: password.value,
  };
  console.log(obj, "obj");
  const response = await fetch(
    `/login/?email=${email.value}&password=${password.value}`,
    {
      method: "post",
    }
  ).then((data) => data.json());
  console.log(response, "response");
  if (response.status === "success") {
    // console.log(response, "success response");
    alert(response.msg);
    let user = [...response.user][0];
    localStorage.setItem("token", response.token);
    localStorage.setItem("user_id", user._id);
    location.href = "/home";
  } else {
    alert(response.msg);
  }
  //e.preventDefault();
  //location.href = "/register";
});
