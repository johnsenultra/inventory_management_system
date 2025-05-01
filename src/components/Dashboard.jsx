import { 
   Typography,
   Box,
   Card,
   Grid2 as Grid,
   CardContent,
   Alert,
   LinearProgress
} from "@mui/material"
import { useState } from "react";
import { Icon } from "lucide-react"
import { crossSquare } from "@lucide/lab"
import { useCallback } from "react";
import { supabase } from "../utils/supabase";
import { useEffect } from "react";

export const Dashboard = () => {
   const [totalEquipment, setTotalEquipment] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   // MEMOIZE API CALLS
   const getTotalEquipmentValue = useCallback(async () => {
      setIsLoading(true);
      try {
         const { count, error } = await supabase
         .from("equipment_inventory")
         .select("*", { count: 'exact', head: true })

         if(error) throw error
         setTotalEquipment(count);
      } catch (err) {
         console.error("Error fetching total values of equipment", err);
         setError("Failed to load data!");
      } finally {
         setIsLoading(false)
      }
   }, [])

   useEffect(() => {
      getTotalEquipmentValue();
   }, [getTotalEquipmentValue]);
   return  (
      <div className="m-5 border-2 border-dotted">

         {  isLoading
            ?
               <LinearProgress />
            :
            <div>
               <Box sx={{ mb: 1 }}>
                  <Typography sx={{ fontSize: "1.5rem" }}>Dashboard</Typography>
               </Box>
               <Box 
                  sx={{
                     display: "flex"
                  }}
               >
                  <Grid container spacing={3} 
                     sx={{                
                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "space-between" 
                     }}
                  >
                     <Grid size={{ xs: 12, md: 4 }}>
                        <Card variant="outlined"
                           sx={{ boxShadow: 5, width: 275, borderRadius: 3, color: "#fff", backgroundColor: "#4453F2", }}
                        >
                           <CardContent>
                              <Box sx={{ backgroundColor: "#fff", color: "#000", width: 35, p: "5px", borderRadius: 3   }}>
                                 <Icon sx={{ p: 2 }} iconNode={crossSquare} size={25}/>
                              </Box>
                              { error && ( <Alert severity="error" sx={{ m: 1 }}>{error}</Alert> )}
                              <Typography sx={{ mt: 1.5, fontSize: 15 }}>Total Equipment</Typography>
                              <Typography sx={{ ml: 0.9, fontSize: 28, fontWeight: 700}}>{totalEquipment}</Typography>
                           </CardContent>
                        </Card>
                     </Grid>

                     <Grid size={{ xs: 12, md: 4 }}>
                        <Card variant="outlined"
                           sx={{ p: 2, boxShadow: 5, width: 275 }}
                        >
                           <Typography></Typography>
                        </Card>
                     </Grid>

                     <Grid size={{ xs: 12, md: 4 }}>
                        <Card variant="outlined"
                           sx={{ p: 2, boxShadow: 5, width: 275}}
                        >
                           
                        </Card>
                     </Grid>
                  </Grid>
               </Box>
            </div>
         }
         
         
         
      </div>
   )
};

const StatusCard = ({ title, value, color }) => {
   <Box 
      
   >

   </Box>
}
