const Project = require("../models/Project");
const User = require("../models/User");

// Show all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("users");
    res.render("projects/index", { projects });
  } catch (err) {
    res.status(500).send("Error loading projects");
  }
};

// Show create form
exports.createProjectForm = async (req, res) => {
  try {
    const users = await User.find();
    res.render("projects/create", { users });
  } catch (err) {
    res.status(500).send("Error loading form");
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const { title, description, users } = req.body;

    await Project.create({
      title,
      description,
      users: users || []
    });

    res.redirect("/projects");
  } catch (err) {
    res.status(500).send("Error creating project");
  }
};

// Show edit form
exports.editProjectForm = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const users = await User.find();

    if (!project) return res.status(404).send("Project not found");

    res.render("projects/edit", { project, users });
  } catch (err) {
    res.status(500).send("Error loading edit page");
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const { title, description, users } = req.body;

    await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
      users: users || []
    });

    res.redirect("/projects");
  } catch (err) {
    res.status(500).send("Error updating project");
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect("/projects");
  } catch (err) {
    res.status(500).send("Error deleting project");
  }
};