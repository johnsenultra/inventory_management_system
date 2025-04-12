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
} from "@mui/material";
import { supabase } from "../utils/supabase";
import { useState } from "react";

export const UpdateEquipment = ({ open, onClose, inventoryId }) => {
   
   const [updateEquipment, setUpdateEquipment] = useState({
      equipment_name: "",
      category: "",
      quantity: "",
      status: "",
      added_at: new Date().toISOString().split("T")[0]
   })
   const [isLoading, setIsLoading] = useState(false);

   const handleUpdate = async () => {
      setIsLoading(true);

      try {
         const { data, error: supabaseError } = await supabase
         .from("equipment_inventory")
         .update({
            
         })

         if(supabaseError) throw supabaseError;

      } catch (err) {
         console.err("Error Updating Equipment", err)
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
            sx={{
               p: 2,
               width: 550,
               height: 300,
            }}
         >
            <Box component="form" direction="row">
               {/* // Status Alert here... */}

               <Grid container spacing={2}>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField 
                        label="Equipment Name"
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                     />
                  </Grid>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField 
                        label="Category"
                        size="small"
                        fullWidth
                        type="text"
                        variant="outlined"
                     />
                  </Grid>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField 
                        label="Quantity"
                        size="small"
                        fullWidth
                        type="number"
                        variant="outlined"
                     />
                  </Grid>
                  <Grid size={{ xs: 6, md: 6 }}>
                     <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                           label="Status"
                           size="small"
                           fullWidth
                           type="text"
                           variant="outlined"
                        >
                           <MenuItem value={"Availabe"}>Available</MenuItem>
                           <MenuItem value={"Serviceable"}>Serviceable</MenuItem>
                           <MenuItem value={"Not Serviceable"}>Not Serviceable</MenuItem>
                        </Select>
                     </FormControl>
                  </Grid>

                  <Grid size={{ xs: 6, md: 6 }}>
                     <TextField 
                        label="Added at"
                        size="smajll"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                     />
                  </Grid>
               </Grid>
            </Box>
         </Paper>
      </Dialog>
   );
};