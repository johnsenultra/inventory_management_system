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
   Tooltip,
} from "@mui/material"
import { Trash2Icon, EditIcon } from "lucide-react";
import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import { AddEquipment } from "./AddEq";
import { UpdateEquipment } from "./UpdateEq";


export const Equipment = () => {

   const [inventory, setInventory] = useState([])
   const [isLoading, setIsLoading] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
   const [success, setSucces] = useState(false)
   const [updateModalOpen, setUpdateModalOpen] = useState(false);
   const [selectedInventoryId, setSelectedInventoryId] = useState(null);
   

   const fetchInventory = async () => {
      setIsLoading(true);
      try {
         const { data: equipment_inventory, error} = await supabase
         .from("equipment_inventory")
         .select("*")
         .order("added_at", { ascending: false });

      if(error) {
         console.log("Error fetchinng quipment inventory", error)
         return;
      }
      
      setInventory(equipment_inventory  || [] )
      
      } catch (err) {
         console.err(err);
      } finally {
         setIsLoading(false);
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
         setInventory((prev) => 
            prev.filter((item) => item.id !== id)
         );

         setSucces("Item deleted successfully");
         setTimeout(() => setSucces(null), 3000)
      } catch (err) {
         console.error("Delete error", err)
      }
   }

   const handleUpdateModal = (inventoryId) => {
      setSelectedInventoryId(inventoryId);
      setUpdateModalOpen(true);
   }

   return (
      <Box sx={{ p: 3 }}>
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
            
            {/* { isLoading && <Alert severity="error" sx={{ my: 2 }}>{isLoading}</Alert> } */}
            {success && <Alert severity="success" sx={{ my: 2 }}>{success}</Alert>}

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
                           <Tooltip title="Delete" arrow>
                              <IconButton
                                 onClick={() => handleDelete(invent.id)}
                              >
                                 <Trash2Icon size={24} />
                              </IconButton>
                           </Tooltip>

                           <Tooltip title="Edit" arrow>
                              <IconButton
                                 onClick={() => handleUpdateModal(invent.id)}
                              >
                                 <EditIcon size={25} />
                              </IconButton>
                           </Tooltip>

                        </TableCell>

                           
                     </TableRow>
                  ))}
               </TableBody>
            </Table>            
         </TableContainer>

         <Box>
            {/* Modal */}
            <UpdateEquipment 
               open={updateModalOpen}
               onClose={() => setUpdateModalOpen(false)}
               inventoryId={selectedInventoryId}
            />
         </Box>
      </Box>
   )
}