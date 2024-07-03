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
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The users information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
});

// New GET endpoint to fetch a user by ID
server.get("/api/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user information could not be retrieved",
        err: err.message,
        stack: err.stack,
      });
    });
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

// PUT endpoint to update a user by ID
server.put("/api/users/:id", async (req, res) => {
  try {
    const { name, bio } = req.body;

    // Input validation
    if (!name || !bio) {
      return res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    }

    const updatedUser = await User.update(req.params.id, { name, bio });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
