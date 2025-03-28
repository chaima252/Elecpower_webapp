import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Autocomplete,
  Checkbox,
  ListItemText,
} from "@mui/material";

const employees = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Diana" },
  { id: 5, name: "Eve" },
  { id: 6, name: "chima" },
  { id: 7, name: "Lol" },
];

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "",
    destination: "",
    description: "",
    assignedEmployees: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmployeeChange = (event, newValue) => {
    setFormData({ ...formData, assignedEmployees: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ marginLeft: -30, marginTop:-7 }}>
      <Card sx={{ width: 500, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Add A Project
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Project Name"
              name="projectName"
              fullWidth
              required
              margin="normal"
              value={formData.projectName}
              onChange={handleChange}
            />
            <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            margin="normal"
            required
          />
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              margin="normal"
              value={formData.startDate}
              onChange={handleChange}
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              margin="normal"
              value={formData.endDate}
              onChange={handleChange}
            />
            <TextField
              label="Destination"
              name="destination"
              fullWidth
              required
              margin="normal"
              value={formData.destination}
              onChange={handleChange}
            />

            {/* Employee Selection with Search and Multi-Check */}
            <Autocomplete
              multiple
              options={employees}
              getOptionLabel={(option) => option.name}
              value={formData.assignedEmployees}
              onChange={handleEmployeeChange}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <ListItemText primary={option.name} />
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Assigned Employees" placeholder="Search..." margin="normal" />
              )}
            />

            <Box mt={2} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateProjectForm;
