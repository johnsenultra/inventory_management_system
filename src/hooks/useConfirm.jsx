import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { useState } from "react"

export const useConfirm =  () => {
   const [open, setOpen] = useState(false);
   const [itemToDelete, setItemToDelete] = useState(null);
   
   const requestDelete = (itemId) => {
      setItemToDelete(itemId);
      setOpen(true);
   }

   const confirmDelete = (onConfirm) => {
      if(itemToDelete !== null) {
         onConfirm(itemToDelete);
      }
      setOpen(false);
      setItemToDelete(null);
   };

   const cancelDelete = () => {
      setOpen(false)
      setItemToDelete(null);
   }
   
   return {
    open,
    itemToDelete,
    requestDelete,
    confirmDelete,
    cancelDelete
   };
};
