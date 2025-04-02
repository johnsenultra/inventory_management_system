import {
   Box,
   Typography,
   TableContainer,
   Table,
   TableHead,
   TableRow,
   Paper,
   TableCell,
   TableBody,
   Button,
   IconButton,
   Alert,
} from "@mui/material"
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { AddEquipment } from "./AddEq";
import { Trash2Icon } from "lucide-react";

export const Equipment = () => {

   const [inventory, setInventory] = useState([])
   const [isOpen, setIsOpen] = useState(false);
   const [success, setSucces] = useState(false)

   const fetchInventory = async () => {
      const { data: equipment_inventory, error} = await supabase
         .from("equipment_inventory")
         .select("*");

      if(error) {
         console.log("Error fetchinng quipment inventory", error)
         return;
      }

      if(equipment_inventory) {
         setInventory(equipment_inventory);
         console.log("EQUIPMENT LIST: ", equipment_inventory);
      }
      
   }

   useEffect(() => {
      fetchInventory();
   }, []);

   const handleOpenAddEquipment = () => {
      setIsOpen(true);
   }

   const handleCloseEquipment = () => {
      setIsOpen(false),
      fetchInventory();
   }

   const handleDelete = async (id) => {
      
      const confirmDelete = window.confirm("Are you sure you want to delete this item?")
      if(!confirmDelete) return;

      try {
         const { error: supabaseError } = await supabase
         .from("equipment_inventory")
         .delete()
         .eq('id', id)
         
         if(supabaseError) throw supabaseError;
         
         // Update the local state to remove the deleted item
         setInventory((prevInvent) => 
            prevInvent.filter((invent) => invent.id !== id)
         );

         setSucces(true);
         setTimeout(() => setSucces(false), 300)
      } catch (err) {
         console.error("Delete error", err)
      }
   }

   return (
      <div className="p-3 ">
         {/*  Header  */}
         <Box>
            <Typography 
               sx={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  mt: 1,
               }}
            >
               Equipment List
            </Typography>
            <Box>
               <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={handleOpenAddEquipment}
               >
                  Add Equipment
               </Button>

               { isOpen && <AddEquipment onClose={handleCloseEquipment} /> }
               
            </Box>
            {success && <Alert severity="success" sx={{ my: 2 }}>Item deleted!</Alert>}
         </Box>
         <TableContainer component={Paper} sx={{ boxShadow: 3, mt: 3 }}>
            <Table>
               <TableHead sx={{ background: "#242A37" }}>
                  <TableRow sx={{ fontSize: "2.rem" }}>
                     <TableCell sx={{ fontWeight: "bold", color: "#FFFFE8" }}>Equipment Name</TableCell>
                     <TableCell sx={{ fontWeight: "bold", color: "#FFFFE8" }}>Category</TableCell>
                     <TableCell sx={{ fontWeight: "bold", color: "#FFFFE8" }}>Quantity</TableCell>
                     <TableCell sx={{ fontWeight: "bold", color: "#FFFFE8" }}>Status</TableCell>
                     <TableCell sx={{ fontWeight: "bold", color: "#FFFFE8" }}>Added At</TableCell>
                     <TableCell sx={{ fontWeight: "bold", color: "#FFFFE8" }}>Action</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {inventory.map((invent) => (
                     <TableRow key={invent.id}>
                        <TableCell>{invent.equipment_name}</TableCell>
                        <TableCell>{invent.category}</TableCell>
                        <TableCell>{invent.quantity}</TableCell>
                        <TableCell>{invent.status}</TableCell>
                        <TableCell>
                           {new Date(invent.added_at).toLocaleDateString("en-US")}
                        </TableCell>
                        <TableCell>
                           <IconButton
                              onClick={() => handleDelete(invent.id)}
                           >
                              <Trash2Icon size={24} />
                           </IconButton>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>            
         </TableContainer>
      </div>
   )
}