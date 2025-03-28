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

const materials = [
  {
    id: 1,
    reference: "339754",
    designation: "20 Obturateurs 24 modules",
    quantity: "10",
    status: "available",
  },
  {
    id: 2,
    reference: "339754",
    designation: "20 Obturateurs 24 modules",
    quantity: "10",
    status: "available",
  },
  {
    id: 3,
    reference: "339754",
    designation: "20 Obturateurs 24 modules",
    quantity: "10",
    status: "available",
  },
];

const Materials = () => {
  const [page, setPage] = useState(1);

  return (
    <Box sx={{ marginLeft: -30 }}>
      <Typography variant='h4' gutterBottom>
        Materials Inventory
      </Typography>

      {/* Search & Filter Section */}
      <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
        <Button
          variant='contained'
          color='primary'
          size='small'
          sx={{ mr: 1, width: 200 }}
        >
          Add a Material
        </Button>
        <TextField label='Search Reference' variant='outlined' size='small' />
        <TextField label='Search Designation' variant='outlined' size='small' />
        <Select
          displayEmpty
          size='small'
          defaultValue=''
          sx={{ minWidth: 150 }}
        >
          <MenuItem value=''>All Status</MenuItem>
          <MenuItem value='Out of stock'>Out of stock</MenuItem>
          <MenuItem value='Available'>Available</MenuItem>
        </Select>
      </Box>

      {/* materials Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>reference</strong>
              </TableCell>
              <TableCell>
                <strong>designation</strong>
              </TableCell>
              <TableCell>
                <strong>quantity</strong>
              </TableCell>
              <TableCell>
                <strong>status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {materials.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.reference}</TableCell>
                <TableCell>{project.designation}</TableCell>
                <TableCell>{project.quantity}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button variant='outlined' color='error' size='small'>
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    color='success'
                    size='small'
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
          color='primary'
        />
      </Box>
    </Box>
  );
};

export default Materials;
