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

const CreateCabinetForm= () => {
  const [formData, setFormData] = useState({
    cabinetName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return(
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" sx={{ marginLeft: -30, marginTop:-7 }}>
        <Card sx={{ width: 500, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>

        <Typography variant="h4" gutterBottom>
            Add A Cabinet
            </Typography>
            <form onSubmit={handleSubmit}>
            <TextField
                label="Cabinet Name"
                name="cabinetName"
                fullWidth
                required
                margin="normal"
                value={formData.cabinetName}
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
            <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" type="submit">
                    Save
                </Button>
            </Box>        
            </form>
        </CardContent>
        </Card>
    </Box>
  )

};

export default CreateCabinetForm;