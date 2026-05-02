const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// All routes protected

// View all projects
router.get("/projects", verifyToken, projectController.getAllProjects);

// Create project (admin only)
router.get("/projects/create", verifyToken, isAdmin, projectController.createProjectForm);
router.post("/projects/create", verifyToken, isAdmin, projectController.createProject);

// Edit project (admin only)
router.get("/projects/edit/:id", verifyToken, isAdmin, projectController.editProjectForm);
router.post("/projects/edit/:id", verifyToken, isAdmin, projectController.updateProject);

// Delete project (admin only)
router.get("/projects/delete/:id", verifyToken, isAdmin, projectController.deleteProject);

module.exports = router;