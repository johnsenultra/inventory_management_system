import {
   Box,
   Dialog,
   Typography,
   DialogTitle,
   Paper,
   Grid2 as Grid,
   TextField,
   Button,
   Alert,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
} from "@mui/material";
import { supabase } from "../utils/supabase";
import { useState } from "react";

export const AddEquipment = ({ onClose }) => {

   const [isAdding, setIsAdding] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSucces] = useState(false)
   const [equipment, setEquipment] = useState({
      equipment_name: "",
      category: "",
      quantity: "",
      status: "",
      added_at: new Date().toISOString().split("T")[0]
   })

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEquipment(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const addEquipment = async (e) => {
      e.preventDefault();
      setIsAdding(true);
      setError(null)

      // Input validation
      if(!equipment.equipment_name || !equipment.category || !equipment.quantity || !equipment.status || !equipment.added_at) {
         setError("Please fill all the required fields")
         setIsAdding(false);
         return;
      }

      try {
         const { data, error: supabaseError } = await supabase
         .from("equipment_inventory")
         .insert({
            equipment_name: equipment.equipment_name,
            category: equipment.category,
            quantity: Number(equipment.quantity),
            status: equipment.status,
            added_at: new Date().toISOString()
         })
         .select()
         
         if(supabaseError) throw supabaseError;

         setSucces(true);
         setTimeout(() => {
            setEquipment(data);
            onClose();
         }, 1000)
      } catch (err) {
         console.error("Error adding equipment:", err);
         setError(err.message || "Failed to add equipment. Check RLS policies.");
      } finally {
         setIsAdding(false);
      }
   }

   return (
      <Dialog
         open
         onClose={onClose}
      >
         <DialogTitle>
            <Typography sx={{ fontSize: "1.5rem" }}>Add Equipment</Typography>
         </DialogTitle>

         <Paper
            elevation={3}
            sx={{ 
               p: 2,
               width: 510, 
               height: 350,
               borderRadius: 2,
            }}
         >
            <Box component="form" onSubmit={addEquipment}>
               {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
               {success && <Alert severity="success" sx={{ mb: 2 }}>Equipment added!</Alert>}
               <Grid container spacing={2}>
                  <Grid size={{ xs: 6, md: 6 }}>  
                     <TextField 
                        label="Equipment Name"
                        size="small"
                        fullWidth
                        name="equipment_name"
                        type="text"
                        variant="outlined"
                        onChange={handleChange}
                        value={equipment.equipment_name}
                     />
                  </Grid>

                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField
                        label="Category"
                        size="small"
                        fullWidth
                        name="category"
                        type="text"
                        variant="outlined"
                        value={equipment.category}
                        onChange={handleChange}
                     />
                  </Grid>

                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField
                        label="Quantity"
                        size="small"
                        fullWidth
                        name="quantity"
                        type="number"
                        variant="outlined"
                        onChange={handleChange}
                        value={equipment.quantity}
                     />
                 
                  </Grid>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select 
                           label="Status"
                           size="small"
                           fullWidth
                           name="status"
                           type="text"
                           variant="outlined"
                           onChange={handleChange }
                           value={equipment.status}
                        >
                           <MenuItem value={"Available"}>Available</MenuItem>
                           <MenuItem value={"Serviceable"}>Serviceable</MenuItem>
                           <MenuItem value={"Not Serviceable"}>Not Serviceable</MenuItem>
                        </Select>

                     </FormControl>
                  </Grid>
                 
                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField fullWidth
                        label="Added at"
                        size="small"
                        name="added_at"
                        type="date"
                        variant="outlined"
                        onChange={handleChange}
                        value={equipment.added_at}
                     />
                  </Grid>
               </Grid>

               <Box sx={{ textAlign: "center", mt: 15 }}>
                  <Button 
                     type="submit"
                     variant="contained"
                     disabled={isAdding}
                     sx={{
                        fontWeight: "bold",
                        width: 125,
                        transition: "background-color: 0.5s",
                        "&:hover": {
                           backgroundColor: "#242A37"
                        }
                     }}
                  >
                     { isAdding ? "Adding..." : "ADD +" }
                  </Button>
               </Box>
            </Box>
         
         </Paper>

      </Dialog>
   )
}