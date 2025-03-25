const Material = require("../models/Material");
const e = require("../utils/error");

//! Create a new material
const createMaterial = async (req, res, next) => {
    try {
    const { reference, designation, quantity, status, electricalCabinetId, projectId } = req.body;

      // Validate required fields
    if (!reference || !designation || !quantity || !projectId) {
        return next(e.errorHandler(400, "Reference, designation, quantity, and project ID are required"));
    }

      // Create a new material
    const material = new Material({
        reference,
        designation,
        quantity,
        status: status || "available",
        electricalCabinetId: electricalCabinetId || null,
        projectId,
    });

      // Save the material to the database
    await material.save();

      // Return the created material
    res.status(201).json({ success: true, data: material });
    } catch (error) {
    next(error);
    }
};

//! Get all materials
const getAllMaterials = async (req, res, next) => {
    try {
      // Fetch all materials from the database
    const materials = await Material.find();

      // Return the list of materials
    res.status(200).json({ success: true, data: materials });
    } catch (error) {
    next(error);
    }
};

//! Get material by ID
const getMaterialById = async (req, res, next) => {
    try {
    const { materialId } = req.params;

      // Find the material by ID
    const material = await Material.findById(materialId);

      // Check if the material exists
    if (!material) {
        return next(e.errorHandler(404, "Material not found"));
    }

      // Return the material
    res.status(200).json({ success: true, data: material });
    } catch (error) {
    next(error);
    }
};

//! Update material 
const updateMaterial = async (req, res, next) => {
    try {
    const { materialId } = req.params;
    const updatedFields = req.body;

      // Check if the material exists
    const material = await Material.findById(materialId);
        if (!material) {
        return next(e.errorHandler(404, "Material not found"));
    }

      // Update the material
        const updatedMaterial = await Material.findByIdAndUpdate(materialId, updatedFields, {
        new: true, // Return the updated material
        });

      // Return the updated material
        res.status(200).json({ success: true, data: updatedMaterial });
    } catch (error) {
        next(error);
    }
};

//! Delete material 
const deleteMaterial = async (req, res, next) => {
    try {
        const { materialId } = req.params;
    
        // Find and delete the material by ID
        const material = await Material.findByIdAndDelete(materialId);
    
        // Check if the material exists
        if (!material) {
            return next(e.errorHandler(404, "Material not found"));
        }
    
        // Return success message
        res.status(200).json({ success: true, message: "Material deleted successfully" });
        } catch (error) {
        next(error);
        }
    };

//! Get materials by project ID
const getMaterialsByProjectId = async (req, res, next) => {
    try {
        const { projectId } = req.params;
    
        // Find materials by project ID
        const materials = await Material.find({ projectId });
    
        // Return the list of materials
        res.status(200).json({ success: true, data: materials });
        } catch (error) {
        next(error);
        }
    };

//! Get materials by electrical cabinet ID
const getMaterialsByCabinetId = async (req, res, next) => {
    try {
        const { cabinetId } = req.params;
    
        // Find materials by electrical cabinet ID
        const materials = await Material.find({ electricalCabinetId: cabinetId });
    
        // Return the list of materials
        res.status(200).json({ success: true, data: materials });
        } catch (error) {
        next(error);
        }
    };

module.exports = {
    createMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
    getMaterialsByProjectId,
    getMaterialsByCabinetId,
};