// BUILD YOUR SERVER HERE
const express = require("express");
const User = require("./users/model");
const server = express();
server.use(express.json());

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

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  User.update(id, changes)
    .then((updatedUser) => {
      if (!updatedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else if (!changes.name || !changes.bio) {
        res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      } else {
        res.status(200).json(updatedUser);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user information could not be modified",
        err: err.message,
        stack: err.stack,
      });
    });
});

server.post("/api/users/", (req, res) => {
  const { name, bio } = req.body;
  User.insert({ name, bio })
    .then((newUser) => {
      if (!name || !bio) {
        res.status(400).json({
          message: "Please provide name and bio for the user",
        });
      } else {
        res.status(201).json(newUser);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error while saving the user to the database",
        err: err.message,
        stack: err.stack,
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  User.remove(req.params.id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).json({
          message: "The user with the specified ID does not exist",
        });
      } else res.status(200).json(deletedUser);
    })
    .catch((err) => {
      res.status(500).json({
        message: "The user could not be removed",
        err: err.message,
        stack: err.stack,
      });
    });
});

server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server;
