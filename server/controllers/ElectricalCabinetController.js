const ElectricalCabinet = require("../models/ElectricalCabinet");
const e = require("../utils/error");

//! Create a new electrical cabinet
const createElectricalCabinet = async (req, res, next) => {
    try {
        const { projectId, name, description } = req.body;
    
        // Validate required fields
        if (!projectId || !name) {
            return next(e.errorHandler(400, "Project ID and name are required"));
        }
    
        // Create a new electrical cabinet
        const cabinet = new ElectricalCabinet({
            name,
            description: description || "",
            projectId,
            materials: [],
            qrCodeId: null,
            maintenanceHistory: [],
        });
    
        // Save the cabinet to the database
        await cabinet.save();
    
        // Return the created cabinet
        res.status(201).json({ success: true, data: cabinet });
        } catch (error) {
        next(error);
        }
    };

//! Add materials to electrical cabinet
const addMaterialsToCabinet = async (req, res, next) => {
    try {
        const { cabinetId } = req.params;
        const { materials } = req.body; // Array of { materialId, quantity }
    
        // Validate required fields
        if (!materials || !Array.isArray(materials)) {
        return next(e.errorHandler(400, "Materials array is required"));
        }
    
        // Find the cabinet by ID
        const cabinet = await ElectricalCabinet.findById(cabinetId);
    
        // Check if the cabinet exists
        if (!cabinet) {
        return next(e.errorHandler(404, "Cabinet not found"));
        }
    
        // Add materials to the cabinet
        cabinet.materials = materials;
        await cabinet.save();
    
        // Return the updated cabinet
        res.status(200).json({ success: true, data: cabinet });
    } catch (error) {
        next(error);
    }
};
//! Get electrical cabinet by project ID
const getCabinetByProjectId = async (req, res, next) => {
    try {
        const { projectId } = req.params;
    
        // Find the cabinet by project ID
        const cabinet = await ElectricalCabinet.findOne({ projectId })
            .populate("materials", "reference designation quantity") // Populate materials
            .populate("qrCodeId", "code"); // Populate QR code
    
        // Check if the cabinet exists
        if (!cabinet) {
            return next(e.errorHandler(404, "Cabinet not found"));
        }
    
        // Return the cabinet
        res.status(200).json({ success: true, data: cabinet });
        } catch (error) {
        next(error);
        }
    };

//! get all cabinets
const getAllCabinets = async (req, res, next) => {
    try {
      // Fetch all projects from the database
        const cabinets = await ElectricalCabinet.find()
            .populate("materials", "reference designation quantity") // Populate materials
            .populate("qrCodeId", "code"); // Populate QR code 
    
        // Return the list of cabinets
        res.status(200).json({ cabinets });
        } catch (error) {
            next(error);
       
        }
    };



  //! Update maintenance history
const updateMaintenanceHistory = async (req, res, next) => {
    try {
        const { cabinetId } = req.params;
        const { date, description } = req.body;
    
        // Validate required fields
        if (!date || !description) {
            return next(e.errorHandler(400, "Date and description are required"));
        }
    
        // Find the cabinet by ID
        const cabinet = await ElectricalCabinet.findById(cabinetId);
    
        // Check if the cabinet exists
        if (!cabinet) {
            return next(e.errorHandler(404, "Cabinet not found"));
        }
    
        // Add maintenance entry
        cabinet.maintenanceHistory.push({ date, description });
        await cabinet.save();
    
        // Return the updated cabinet
        res.status(200).json({ success: true, data: cabinet });
        } catch (error) {
        next(error);
        }
    };


    //! update a cabinet by ID
    const updateCabinet = async (req, res, next) => {
        const { cabinetId } = req.params;
        const updatedFields = req.body;
        try {
            // check if cabinet exist
            const cabinet = await ElectricalCabinet.findById(cabinetId);
            if (!cabinet) {
            return next(e.errorHandler(404, "Cabinet not found"));
            }
    
            //update cabinet
            const updatedCabinet = await ElectricalCabinet.findByIdAndUpdate(cabinetId, updatedFields, {
            new: true,
            });
    
            res.status(200).json(updatedCabinet);
        } catch (error) {
            next(error);
        }
    };

module.exports = {
    createElectricalCabinet,
    getCabinetByProjectId,
    updateMaintenanceHistory,
    getAllCabinets,
    updateCabinet,
    addMaterialsToCabinet,
    
    };