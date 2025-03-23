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
} from "@mui/material"
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";

export const Equipment = () => {

   const [inventory, setInventory] = useState([])

   const fetchInventory = async () => {
      const { data: equipment_inventory, error} = await supabase
         .from("equipment_inventory")
         .select("*");

      if(error) {
         console.log("Error fetchinng quipment inventory", error)
      }

      if(equipment_inventory) {
         setInventory(equipment_inventory);
         console.log("EQUIPMENT LIST: ", equipment_inventory);
      }
      
   }

   useEffect(() => {
      fetchInventory();
   }, []);

   console.log("This is the inventory equipment component!")
   return (
      <Box>
         <Typography>Equipment Inventory</Typography>
         <TableContainer component={Paper} sx={{ boxShadow: 3, mt: 3 }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Equipment Name</TableCell>
                     <TableCell>Category</TableCell>
                     <TableCell>Stock</TableCell>
                     <TableCell>Status</TableCell>
                     <TableCell>Added At</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {inventory.map((invent) => (
                     <TableRow key={invent.id}>
                        <TableCell>{invent.equipment_name}</TableCell>
                        <TableCell>{invent.category}</TableCell>
                        <TableCell>{invent.quantity}</TableCell>
                        <TableCell>{invent.status}</TableCell>
                        <TableCell>{invent.added_at}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>            
         </TableContainer>
      </Box>
   )
}