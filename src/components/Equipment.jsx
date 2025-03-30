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
} from "@mui/material"
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { AddEquipment } from "./AddEq";

export const Equipment = () => {

   const [inventory, setInventory] = useState([])
   const [isOpen, setIsOpen] = useState(false);

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
                  variant="contained"
                  onClick={handleOpenAddEquipment}
               >
                  Add Equipment
               </Button>

               { isOpen && <AddEquipment onClose={handleCloseEquipment} /> }
               
            </Box>
         </Box>
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
                        <TableCell>
                           {new Date(invent.added_at).toLocaleDateString("en-US")}

                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>            
         </TableContainer>
      </div>
   )
}