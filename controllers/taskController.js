const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("project")
    .populate("assignedTo");

  res.render("tasks/index", { tasks });
};

exports.createTaskForm = async (req, res) => {
  const projects = await Project.find();
  const users = await User.find();

  res.render("tasks/create", { projects, users });
};

exports.createTask = async (req, res) => {
  const { title, project, assignedTo } = req.body;

  await Task.create({
    title,
    project,
    assignedTo
  });

  res.redirect("/tasks");
};

// Show edit form
exports.editTaskForm = async (req, res) => {
    const task = await Task.findById(req.params.id);
    const projects = await Project.find();
    const users = await User.find();
  
    res.render("tasks/edit", { task, projects, users });
  };
  
  // Update task
  exports.updateTask = async (req, res) => {
    const { title, project, assignedTo } = req.body;
  
    await Task.findByIdAndUpdate(req.params.id, {
      title,
      project,
      assignedTo
    });
  
    res.redirect("/tasks");
  };
  
  // Delete task
  exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/tasks");
  };