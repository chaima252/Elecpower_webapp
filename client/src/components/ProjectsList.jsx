import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const projects = [
  { id: 1, name: "Project Alpha", status: "Not started", startdate: "2025-06-15", deadline: "2025-06-15" },
  { id: 2, name: "Project Beta", status: "In progress", startdate: "2025-06-15", deadline: "2025-07-20" },
  { id: 3, name: "Project Beta", status: "In progress", startdate: "2025-06-15", deadline: "2025-07-20" },
];

const ProjectsList = () => {
  const [page, setPage] = useState(1);

  return (
    <Box sx={{ marginLeft: -30 }}>
      <Typography variant="h4" gutterBottom>
        Projects List
      </Typography>

      {/* Search & Filter Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search Projects"
          variant="outlined"
          size="small"
          fullWidth
        />
        <Select displayEmpty size="small" defaultValue="" sx={{ minWidth: 150 }}>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Not started">Not started</MenuItem>
          <MenuItem value="In progress">In progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </Box>

      {/* Projects Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Start date</strong></TableCell>
              <TableCell><strong>Deadline</strong></TableCell>
              <TableCell><strong>Cabinets</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.startdate}</TableCell>
                <TableCell>{project.deadline}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" size="small">
                    View Cabinet
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" size="small">
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={5}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProjectsList;
