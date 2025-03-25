const Task = require("../models/Task");
const e = require("../utils/error");

//! create a new Task
const createTask = async (req, res, next) => {
    try {
        const { projectId } = req.params; // Get projectId from URL
        const { name, description, status, priority, deadline, notes } = req.body;
    
        // Validate required fields
        if (!name || !deadline) {
            return next(e.errorHandler(400, "Name and deadline are required"));
        }
    
        // Create a new task
        const task = new Task({
            name,
            description: description || "",
            status: status || "not started",
            priority: priority || "medium",
            deadline,
            projectId, // Automatically set from the URL
            notes: notes || "",
        });
    
        // Save the task to the database
        await task.save();
    
        // Return the created task
        res.status(201).json({ success: true, data: task });
        } catch (error) {
        next(error);
        }
    };

//! Get all tasks for a specefic project    
const getTasksByProjectId = async (req, res, next) => {
    try {
        const { projectId } = req.params;
    
        // Fetch all tasks for the project
        const tasks = await Task.find({ projectId })
            .populate("projectId", "name description") // Populate project details
            .populate("employeeId", "name email"); // Populate employee details
    
        // Return the list of tasks
        res.status(200).json({ success: true, data: tasks });
        } catch (error) {
        next(error);
        }
    };

//! Get all tasks
const getAllTasks = async (req, res, next) => {
    try {
      // Fetch all tasks from the database
        const tasks = await Task.find()
            .populate("projectId", "name description") // Populate project details
            .populate("employeeId", "name email"); // Populate employee details
    
        // Return the list of tasks
        res.status(200).json({ success: true, data: tasks });
        } catch (error) {
        next(error);
        }
    };    

//! Get a task by ID
const getTaskById = async (req, res, next) => {
    try {
        const { taskId } = req.params;
    
        // Find the task by ID
        const task = await Task.findById(taskId)
            .populate("projectId", "name description") // Populate project details
            .populate("employeeId", "name email"); // Populate employee details
    
        // Check if the task exists
        if (!task) {
            return next(e.errorHandler(404, "Task not found"));
        }
    
        // Return the task
        res.status(200).json({ success: true, data: task });
        } catch (error) {
        next(error);
        }
    };

//! Update a task by ID
const updateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const updatedFields = req.body;
    
        // Check if the task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return next(e.errorHandler(404, "Task not found"));
        }
    
        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedFields, {
            new: true, // Return the updated task
        });
    
        // Return the updated task
        res.status(200).json({ success: true, data: updatedTask });
        } catch (error) {
        next(error);
        }
    };
  
  //! Delete a task by ID
    const deleteTask = async (req, res, next) => {
        try {
        const { taskId } = req.params;
    
        // Find and delete the task by ID
        const task = await Task.findByIdAndDelete(taskId);
    
        // Check if the task exists
        if (!task) {
            return next(e.errorHandler(404, "Task not found"));
        }
    
        // Return success message
        res.status(200).json({ success: true, message: "Task deleted successfully" });
        } catch (error) {
        next(error);
        }
    };

//! Assign an employee to a task
const assignEmployeeToTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { employeeId } = req.body;
    
        // Check if the task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return next(e.errorHandler(404, "Task not found"));
        }
    
        // Assign the employee to the task
        task.employeeId = employeeId;
        await task.save();
    
        // Return the updated task
        res.status(200).json({ success: true, data: task });
        } catch (error) {
        next(error);
        }
    };

module.exports = {
    createTask,
    getTasksByProjectId,
    assignEmployeeToTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
    };