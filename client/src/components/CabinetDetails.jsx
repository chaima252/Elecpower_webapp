import { Box, Typography, Chip, Paper, Divider, Button, List, ListItem, ListItemText } from "@mui/material";

const CabinetDetails = () => {
  const cabinet = {
    name: "Main Control Cabinet",
    description: "Controls the primary electrical flow in the facility.",
    status: "installed",
    installationDate: "2024-03-15",
    qrCodeId: "ABC123XYZ",
    materials: [
      { id: 1, ref: "MTR001", designation: "Copper Wire", quantity: 25 },
      { id: 2, ref: "MTR002", designation: "Circuit Breaker", quantity: 5 },
      { id: 3, ref: "MTR003", designation: "Control Panel", quantity: 2 },
    ],
    maintenanceHistory: [
      { date: "2024-04-10", description: "Replaced damaged copper wire." },
      { date: "2024-05-12", description: "General inspection and testing." },
    ],
  };

  const statusColors = {
    installed: "success",
    "under maintenance": "warning",
    decommissioned: "error",
  };

  return (
    <Box sx={{ p: 4, ml: -30 }}>
      <Typography variant="h4" gutterBottom>
        Cabinet Details
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        {/* Cabinet Info */}
        <Typography variant="h6" gutterBottom>
          {cabinet.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {cabinet.description}
        </Typography>

        <Box sx={{ my: 2 }}>
          <Chip label={cabinet.status} color={statusColors[cabinet.status]} />
          <Typography variant="body2" sx={{ ml: 2, display: "inline" }}>
            Installed: {cabinet.installationDate}
          </Typography>
        </Box>

        {/* QR Code (if exists) */}
        {cabinet.qrCodeId && (
          <Typography variant="body2" gutterBottom>
            QR Code: {cabinet.qrCodeId}
          </Typography>
        )}

        <Divider sx={{ my: 3 }} />

        {/* Materials */}
        <Typography variant="h6">Materials</Typography>
        <Paper elevation={1} sx={{ maxHeight: 300, overflowY: "auto", mt: 2, p: 2 }}>
          <List>
            {cabinet.materials.map((material) => (
              <ListItem key={material.id} divider>
                <ListItemText
                  primary={`${material.designation} (x${material.quantity})`}
                  secondary={`Ref: ${material.ref}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Maintenance History (if exists) */}
        {cabinet.maintenanceHistory.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Maintenance History</Typography>
            <List>
              {cabinet.maintenanceHistory.map((entry, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={entry.description}
                    secondary={`Date: ${entry.date}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>
            Edit
          </Button>
          <Button variant="outlined" color="error">
            Delete
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CabinetDetails;