const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// View all tasks (any logged-in user)
router.get("/tasks", verifyToken, taskController.getAllTasks);

// Create task (admin only)
router.get("/tasks/create", verifyToken, isAdmin, taskController.createTaskForm);
router.post("/tasks/create", verifyToken, isAdmin, taskController.createTask);

// Edit task (admin only)
router.get("/tasks/edit/:id", verifyToken, isAdmin, taskController.editTaskForm);
router.post("/tasks/edit/:id", verifyToken, isAdmin, taskController.updateTask);

// Delete task (admin only)
router.get("/tasks/delete/:id", verifyToken, isAdmin, taskController.deleteTask);

module.exports = router;