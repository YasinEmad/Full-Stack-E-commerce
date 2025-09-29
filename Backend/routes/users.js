const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// GET /api/users - return all users
router.get("/", userController.getAllUsers);

// POST /api/users - create a new user
router.post("/", userController.createUser);

// GET /api/users/:id - get a user by ID
router.get('/:id', userController.getUserById);

// PUT /api/users/:id - update a user by ID
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id - delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
