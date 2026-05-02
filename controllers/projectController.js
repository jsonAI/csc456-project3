const Project = require("../models/Project");
const User = require("../models/User");

// Show all projects
exports.getAllProjects = async (req, res) => {
  const projects = await Project.find().populate("users");
  res.render("projects/index", { projects });
};

// Show create form
exports.createProjectForm = async (req, res) => {
  const users = await User.find();
  res.render("projects/create", { users });
};

// Create project
exports.createProject = async (req, res) => {
  const { title, description, users } = req.body;

  await Project.create({
    title,
    description,
    users
  });

  res.redirect("/projects");
};

// Show edit form
exports.editProjectForm = async (req, res) => {
    const project = await Project.findById(req.params.id);
    const users = await User.find();
  
    res.render("projects/edit", { project, users });
  };
  
  // Update project
  exports.updateProject = async (req, res) => {
    const { title, description, users } = req.body;
  
    await Project.findByIdAndUpdate(req.params.id, {
      title,
      description,
      users
    });
  
    res.redirect("/projects");
  };
  
  // Delete project
  exports.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.redirect("/projects");
  };