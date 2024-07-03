// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;
    const newUser = await User.insert({ name, bio });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating the user" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
