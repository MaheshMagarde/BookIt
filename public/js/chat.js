console.log("chat js");

const socket = io();
//socket.emit("add-user", "637afeb00fcc319a063dd508");

socket.on("updateChat", (data) => {
  console.log(data);
  let userId = document.getElementById("activeChat").value;
  if (userId == data.to || userId == data.from) {
    let chatBox = document.getElementById("chatBox");
    console.log(data);
    let element = `<div class="message ${
      data.from == userId ? "frnd_message" : "my_message"
    }">
                      <p>${data.message}</p>
                  </div>`;
    chatBox.innerHTML += element;
  }
});
// function fun() {
//   socket.emit("updateChat", { msg: `${msg.value}` });
// }

const sendMessage = async () => {
  let messageDiv = document.getElementById("message");
  const obj = {
    from: `${localStorage.getItem("user_id")}`,
    to: `${document.getElementById("activeChat").value}`,
    message: `${messageDiv.value}`,
  };
  const response = await fetch("http://localhost:8000/chat/addMessage", {
    method: "post",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
  messageDiv.value = "";
  console.log(response);
  socket.emit("updateChat", obj);
  //   socket.emit("send-msg", {
  //     to: "",
  //     from: "",
  //     message: "",
  //   });
};

const getAllMessages = async (id) => {
  const obj = {
    from: `${localStorage.getItem("user_id")}`,
    to: `${id}`,
  };
  const response = await fetch(
    `http://localhost:8000/chat/getAllMessages/?from=${obj.from}&to=${obj.to}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());
  console.log(response);
  return response;
};

{
  /* <div class="block active">
  <div class="imgbox">
    <span class="material-icons cover">account_circle</span>
  </div>
  <div class="details">
    <div class="listhead">
      <h4>John Doe</h4>
      <p class="time">10:45</p>
    </div>
    <div class="message_p">
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, quos.
      </p>
      <b>1</b>
    </div>
  </div>
</div>; */
}

const blockUser = async () => {
  const personId = document.getElementById("activeChat").value;
  const userId = localStorage.getItem("user_id");
  const response = await fetch(
    `http://localhost:8000/chat/blockUser/?user=${userId}&&person=${personId}`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());
  console.log(response);
};
// blockUser();
const getAllChats = async () => {
  const user = `${localStorage.getItem("user_id")}`;
  let chatsDiv = document.getElementById("chatList");
  const { chats } = await fetch(
    `http://localhost:8000/chat/getAllChats/?user=${user}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());
  console.log(chats);
  chats.forEach((chat) => {
    let id = chat._id;
    let element = `<div class="block" id=${id} onclick=updateActiveChat("${id}")>
  <div class="imgbox">
    <span class="material-icons cover">account_circle</span>
  </div>
  <div class="details">
    <div class="listhead">
      <h4>${chat.name}</h4>
    </div>
  </div>
</div>`;
    chatsDiv.innerHTML += element;
  });
};

//getAllMessages();
//sendMessage();
getAllChats();

function updateActiveChat(id) {
  //   alert(id);
  //console.log(id);
  document.getElementById("activeChat").value = id;
  console.log(document.getElementById("activeChat").value);
  chatPanel();
}

{
  /* <div class="header">
                <div class="imgText">
                    <div class="userimg">
                        <img src="./img/user.jpg" class="cover">
                    </div>
                    <h4>John Doe<br><span>online</span></h4>
                </div>
                <ul class="nav_icons">
                    <li><ion-icon name="search-outline"></ion-icon></li>
                    <li><ion-icon name="ellipsis-vertical"></ion-icon></li>
                </ul>
            </div> */
}

{
  /* <div class="message my_message">
                    <!-- <p>hi<br><span>12:15</span></p> -->
                </div> */
}

async function chatPanel() {
  let userId = document.getElementById("activeChat").value;
  if (userId === "") return;
  let chatBox = document.getElementById("chatBox");
  let { userData } = await fetch(
    `http://localhost:8000/getUser/?userId=${userId}`,
    {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((data) => data.json());
  let allMessages = await getAllMessages(userId);
  console.log(userData);
  document.getElementById("person-name").innerHTML = userData[0].name;
  console.log(allMessages);
  chatBox.innerHTML = "";
  allMessages.forEach((msg) => {
    let element = `<div class="message ${
      msg.fromSelf ? "my_message" : "frnd_message"
    }">
                    <p>${msg.message}</p>
                </div>`;
    chatBox.innerHTML += element;
  });
}
chatPanel();
