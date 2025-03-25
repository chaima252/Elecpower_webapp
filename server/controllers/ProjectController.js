const Project = require("../models/Project");
const e = require("../utils/error");

//! Create a new project
const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate, destination, employees } =
      req.body;

    // Validate required fields
    if (!name || !description || !startDate || !endDate || !destination) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new project
    const project = new Project({
      name,
      description,
      startDate,
      endDate,
      destination,
      employees: employees || [], // Optional field
    });

    // Save the project to the database
    await project.save();

    // Return the created project
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//! get all projects

const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find()
      .populate("employees", "name email") // Populate employee details
      .populate("tasks") // Populate tasks
      .populate("electricalCabinetId") // Populate armoire details
      .populate("incidentReports"); // Populate incident reports

    // Return the list of projects
    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//! get a project by ID
const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Find the project by ID
        const project = await Project.findById(projectId)
        .populate("employees", "name email") // Populate employee details
        .populate("tasks") // Populate tasks
        .populate("ElectricalCabinetId") // Populate armoire details
        .populate("incidentReports"); // Populate incident reports

        // Check if the project exists
        if (!project) {
        return res.status(404).json({ message: "Project not found" });
        }

        // Return the project
        res.status(200).json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Server error" });
    }
};

//! update a project by ID
const updateProject = async (req, res, next) => {
    const { projectId } = req.params;
    const updatedFields = req.body;
    try {
        // check if projet exist
        const project = await Project.findById(projectId);
        if (!project) {
        return next(e.errorHandler(404, "Project not found"));
        }

        //update projet
        const updatedProject = await Project.findByIdAndUpdate(projectId, updatedFields, {
        new: true,
        });

        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
};

//! Delete a project by ID
const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Find and delete the project by ID
        const project = await Project.findByIdAndDelete(projectId);

        // Check if the project exists
        if (!project) {
        return res.status(404).json({ message: "Project not found" });
        }

        // Return success message
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
