require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../model/auth");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  console.log(req.body, "req.body");
  console.log(req.query, "req.query");
  const { email, password } = req.query;
  //console.log(req.body);

  if (!email || !password) {
    return res.json({
      status: "failed",
      msg: "please provide valid Email and Password",
    });
  }

  //get user from db
  try {
    const user = await User.find({ email: email });
    console.log(user, "user");

    if (user.length == 0) {
      return res.json({ status: "failed", msg: "User not Found" });
    }
    const match = await bcrypt.compare(password, user[0].password);
    if (match) {
      const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET);
      //console.log(user);
      res.cookie("jwt", token, { httpOnly: true });
      return res.json({ status: "success", msg: "login success", token, user });
    } else {
      console.log("failed");
      return res.json({ status: "failed", msg: "Credentials dont match" });
    }
  } catch (error) {
    console.log(error);
    return res.send("error");
  }
};

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { password, name, email } = req.body;
    //console.log(User.find({ email: email }));
    const userData = await User.find({ email: email });
    console.log(userData.length);
    if (userData.length > 0) {
      return res.json({ status: "failed", msg: "Email already present" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name: name,
      email: email,
      password: hashedPassword,
    };
    const response = await User.create(newUser);
    console.log(newUser);
    //res.json({ msg: "succes" });
    return res.json({ status: "success", user: response, msg: "user created" });
  } catch (error) {
    console.log(error);
    res.json({ status: "failed", msg: "some error occured" });
  }
};

const requireAuth = (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        //console.log(error.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const userData = await User.find({ _id: userId });
    return res.json({ userData });
    console.log("this is user", userData);
  } catch (error) {
    console.log(error);
  }
};

const blockUser = async (req, res) => {
  try {
    const { user, person } = req.query;
    console.log(req.query);
    const response = await User.updateOne(
      {
        _id: `${user}`,
      },
      [
        {
          $set: {
            blockedUsers: {
              $cond: [
                {
                  $in: [`${person}`, "$blockedUsers"],
                },
                {
                  $setDifference: ["$blockedUsers", [`${person}`]],
                },
                {
                  $concatArrays: ["$blockedUsers", [`${person}`]],
                },
              ],
            },
          },
        },
      ]
    );
    console.log(response);
    res.json({ msg: "Operation Completed", response });
  } catch (error) {
    console.log(error);
  }
};

const updateDatabase = async (req, res) => {
  try {
    const response = await User.update(
      {},
      {
        $set: {
          blockedUsers: [],
        },
      },
      { multi: true }
    );
    res.json({ response });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  login,
  register,
  requireAuth,
  getUser,
  updateDatabase,
  blockUser,
};
