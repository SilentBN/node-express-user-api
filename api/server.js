// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    const { name, bio } = req.body;

    // Input validation
    if (!name || !bio) {
      return res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    }

    const newUser = await User.insert({ name, bio });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating the user" });
  }
});

// New GET endpoint to fetch all users
server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the users" });
  }
});

// New GET endpoint to fetch a user by ID
server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving the user" });
  }
});

// DELETE endpoint to remove a user by ID
server.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.remove(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
