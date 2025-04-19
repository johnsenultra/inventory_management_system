import { 
   Box, 
   Dialog, 
   DialogTitle, 
   Paper, 
   Typography,
   Grid2 as Grid,
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Button,
   Alert,
} from "@mui/material";
import { supabase } from "../utils/supabase";
import { useState } from "react";
import { useEffect } from "react";

export const UpdateEquipment = ({ open, onClose, inventoryId}) => {
   
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSucces] = useState(false);
   const [isUpdating, setIsUpdating] = useState(false)
   const [equipmentData, setEquipmentData] = useState({
      equipment_name: "",
      category: "",
      quantity: "",
      status: "",
      added_at: new Date().toISOString().split("T")[0]
   })


   useEffect(() => {
      const fetchEquipmentData = async () => {
         if (!inventoryId) return

         setIsLoading(true);
         try {
            const { data, error: supabaseError } = await supabase
            .from("equipment_inventory")
            .select("*")
            .eq('id', inventoryId)
            .single();

            if (supabaseError) throw supabaseError;

            if (data) {
               setEquipmentData({
                  equipment_name: data.equipment_name,
                  category: data.category,
                  quantity: data.quantity,
                  status: data.status,
                  added_at: new Date().toISOString().split("T")[0]
               })
            }
         } catch (err) {
            console.error("Error fetching equipment data", err);
            setError("Failed to load equipment data");
         } finally {
            setIsLoading(false);
         }
      }

      fetchEquipmentData();
   }, [inventoryId]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEquipmentData(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const handleUpdate = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null)

      try {
         const { error: supabaseError } = await supabase
         .from("equipment_inventory")
         .update({
            equipment_name: equipmentData.equipment_name,
            category: equipmentData.category,
            quantity: equipmentData.quantity,
            status: equipmentData.status,
            added_at: new Date().toISOString()
         })
         .eq('id', inventoryId);

         if(supabaseError) throw supabaseError;

         setSucces(true);
         setTimeout(() => {
            onClose(setSucces(false));
         }, 1000 * 2)
      } catch (err) {
         console.err("Error Updating Equipment", err)
         setError(err.message || "Failed to update equipment.")
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <Dialog
         open={open}
         onClose={onClose}
      >
         <DialogTitle>
            <Typography>Update Equipment</Typography>   
         </DialogTitle>
         <Paper
            elevation={3}
            sx={{
               p: 2,
               width: 510,
               height: 350,
               borderRadius: 2
            }}
         >
            <Box component="form" direction="row" onSubmit={handleUpdate}>
               {/* // Status Alert here... */}
               { success && <Alert severity="success" sx={{ mb: 2 }}>Equipment updated!</Alert> }

               <Grid container spacing={2}>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField
                        name="equipment_name"
                        label="Equipment Name"
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        value={equipmentData.equipment_name}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField
                        name="category"
                        label="Category"
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                        value={equipmentData.category}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField
                        name="quantity"
                        label="Quantity"
                        size="small"
                        fullWidth
                        type="number"
                        variant="outlined"
                        value={equipmentData.quantity}
                        onChange={handleChange}
                     />
                  </Grid>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                           name="status"
                           label="Status"
                           size="small"
                           fullWidth
                           type="text"
                           variant="outlined"
                           value={equipmentData.status}
                           onChange={handleChange}
                        >
                           <MenuItem value={"Available"}>Available</MenuItem>
                           <MenuItem value={"Serviceable"}>Serviceable</MenuItem>
                           <MenuItem value={"Not Serviceable"}>Not Serviceable</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>

                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField
                        name="added_at"
                        label="Added at"
                        size="small"
                        fullWidth
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={equipmentData.added_at}
                        onChange={handleChange}
                     />
                  </Grid>
               </Grid>
               
               <Box sx={{ textAlign: "center", mt: 10 }}>
                  <Button 
                     type="submit"
                     variant="contained"
                     disabled={isUpdating}
                     sx={{
                        fontWeight: "bold",
                        width: 125,
                        transition: "background-color: 0.5s",
                        "&:hover": {
                           backgroundColor: "#242A37"
                        }
                     }}
                  >
                     { isUpdating ? "Updating..." : "UPDATE" }
                  </Button>
               </Box>
            </Box>
         </Paper>
      </Dialog>
   );
};