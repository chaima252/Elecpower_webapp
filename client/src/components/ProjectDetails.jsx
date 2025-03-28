import { Box, Typography, Chip, Button, Paper, Divider, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { useState } from "react";

const project = {
  id: 1,
  name: "Project Alpha",
  status: "In Progress",
  startdate: "2025-06-15",
  deadline: "2025-07-20",
  description: "A detailed project to build advanced cabinets for office use.",
  destination: "Paris Office",
  cabinets: ["Cabinet A", "Cabinet B"],
  materials: [
    { ref: "MAT-001", designation: "Wood Panel", quantity: 20 },
    { ref: "MAT-002", designation: "Steel Handle", quantity: 10 },
  ],
};

const ProjectDetails = () => {
  const [showMaterials, setShowMaterials] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress": return "warning";
      case "Completed": return "success";
      case "Not Started": return "default";
      default: return "info";
    }
  };

  return (
    <Box p={3} sx={{ml:-30}}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">{project.name}</Typography>
        <Chip label={project.status} color={getStatusColor(project.status)} />
      </Box>

      {/* Project Info */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6">Project Overview</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography><strong>Start Date:</strong> {project.startdate}</Typography>
        <Typography><strong>Deadline:</strong> {project.deadline}</Typography>
        <Typography><strong>Destination:</strong> {project.destination}</Typography>
        <Typography><strong>Description:</strong> {project.description}</Typography>
      </Paper>

      {/* Cabinets */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
        <Typography variant="h6">Cabinets</Typography>
        <Divider sx={{ my: 2 }} />
        <List>
          {project.cabinets.map((cabinet, index) => (
            <ListItem key={index}><ListItemText primary={cabinet} /></ListItem>
          ))}
        </List>
      </Paper>

      {/* Materials */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, mb: 8 }}>
        <Typography variant="h6">Materials</Typography>
        <Divider sx={{ my: 2 }} />
        <Button onClick={() => setShowMaterials(!showMaterials)}>
          {showMaterials ? "Hide Materials" : "Show Materials"}
        </Button>
        <Collapse in={showMaterials}>
          <List>
            {project.materials.map((material) => (
              <ListItem key={material.ref}>
                <ListItemText
                  primary={`${material.designation} (x${material.quantity})`}
                  secondary={`Ref: ${material.ref}`}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Paper>

      {/* Action Bar */}
      <Box position="fixed" bottom={20} right={20} display="flex" gap={2}>
        <Button variant="contained" color="primary">Edit</Button>
        <Button variant="outlined" color="error">Delete</Button>
        <Button variant="outlined" onClick={() => window.history.back()}>Back to Projects</Button>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
