const Chat = require("../model/chat");
const User = require("../model/auth");

const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    console.log(from, to, message, req.body);
    const data = await Chat.create({
      message,
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added succesfuly to database" });
    return res.json({ msg: "Failed to add message to database" });
  } catch (error) {
    console.log(error);
  }
};

const getAllMessages = async (req, res) => {
  try {
    //console.log(req.query);
    const { from, to } = req.query;
    const messages = await Chat.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    // console.log(messages);
    const mappedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    return res.json(mappedMessages);
  } catch (error) {
    console.log(error);
  }
};

const getAllChats = async (req, res) => {
  const { user } = req.query;
  let chats = await Chat.find({
    users: {
      $all: [user],
    },
  })
    .sort({ updatedAt: 1 })
    .distinct("users");
  console.log(chats);
  chats = chats.filter((chat) => {
    //console.log(chat, user, chat == user, !(chat == user));
    return !(chat == user);
  });

  // chats = chats.map(async (user) => {
  //   return getUser(user);
  // });
  chats = await User.find({
    _id: {
      $in: [...chats],
    },
  });
  //chats = await Promise.all(chats);
  console.log(chats);
  // const mappedChats = chats.map((person) => {
  //   return {
  //     person: person.users[1].toString(),
  //   };
  // });
  //return res.json(mappedChats);
  return res.json({ chats });
};

const getUser = async (id) => {
  const data = User.find({
    _id: id,
  });
  return data;
};

module.exports = { addMessage, getAllMessages, getAllChats };
