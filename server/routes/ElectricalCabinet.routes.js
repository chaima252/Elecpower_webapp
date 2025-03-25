const ElectricalCabinet = require("../controllers/ElectricalCabinetController");

module.exports = (app) => {

    app.post("/cabinets/create", ElectricalCabinet.createElectricalCabinet);
    
    app.post("/cabinets/:cabinetId/materials", ElectricalCabinet.addMaterialsToCabinet);

    app.get("/cabinets/all", ElectricalCabinet.getAllCabinets);

    app.get("/projects/:projectId/cabinet", ElectricalCabinet.getCabinetByProjectId);

    app.patch("/cabinets/update/:cabinetId", ElectricalCabinet.updateCabinet);

    app.post("/cabinets/:cabinetId/maintenance", ElectricalCabinet.updateMaintenanceHistory);


};