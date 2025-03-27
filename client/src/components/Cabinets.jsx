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

const cabinets = [
  { id: 1, name: "339754", status: "installed", installationDate: "2025-10-10" },
  { id: 2, name: "339754", status: "under maintenance", installationDate: "2025-10-10" },
  { id: 3, name: "339754", status: "installed", installationDate: "2025-10-10" },

];

const Cabinets = () => {
  const [page, setPage] = useState(1);

  return (
    <Box sx={{ marginLeft: -30 }}>
      <Typography variant="h4" gutterBottom>
        Cabinets List
      </Typography>

      {/* Search & Filter Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Search Cabinet Name"
          variant="outlined"
          size="small"
          fullWidth
          
        />
       
        <Select displayEmpty size="small" defaultValue="" sx={{ minWidth: 150 }}>
          <MenuItem value="">All Status</MenuItem>
          <MenuItem value="Installed">Installed</MenuItem>
          <MenuItem value="Under maintenance">Under maintenance</MenuItem>
        </Select>
      </Box>

      {/* cabinets Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Installation Date</strong></TableCell>
              <TableCell><strong>QR code</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cabinets.map((cabinet) => (
              <TableRow key={cabinet.id}>
                <TableCell>{cabinet.name}</TableCell>
                <TableCell>{cabinet.status}</TableCell>
                <TableCell>{cabinet.installationDate}</TableCell>
                <TableCell>
                <Button variant="outlined" color="primary" size="small">
                    Print QR Code
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

export default Cabinets;
