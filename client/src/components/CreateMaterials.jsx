import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Pagination,
} from "@mui/material";

// Sample Materials (Replace with your template)
const materialsTemplate = Array.from({ length: 98 }, (_, index) => ({
  id: index + 1,
  ref: `MAT-${index + 1}`,
  designation: `Material ${index + 1}`,
  quantity: "",
}));

const MaterialsForm = () => {
  const [materials, setMaterials] = useState(materialsTemplate);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  // Handle Quantity Change
  const handleQuantityChange = (id, value) => {
    setMaterials((prev) =>
      prev.map((mat) => (mat.id === id ? { ...mat, quantity: value } : mat))
    );
  };

  // Pagination Logic
  const paginatedMaterials = materials.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ marginLeft: -10 }}>
      <Typography variant="h5" gutterBottom>
        Assign Materials
      </Typography>
    
      {/* Scrollable Table */}
      <TableContainer
        component={Paper}
        sx={{ maxWidth:800, maxHeight: 500, overflow: "auto", boxShadow: 3, borderRadius: 3 }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Ref</strong></TableCell>
              <TableCell><strong>Designation</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedMaterials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.ref}</TableCell>
                <TableCell>{material.designation}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={material.quantity}
                    onChange={(e) =>
                      handleQuantityChange(material.id, e.target.value)
                    }
                    size="small"
                    inputProps={{ min: 0 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
    <Pagination
            count={Math.ceil(materials.length / rowsPerPage)}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            sx={{ ml:-50,mt: 1, display: "flex", justifyContent: "center" }}
        />

     

      {/* Sticky Save Button */}
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          background: "#fff",
          py: 2,
          textAlign: "center",
          ml:-40
        }}
      >
        <Button variant="contained" color="primary" onClick={() => console.log(materials)}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default MaterialsForm;
