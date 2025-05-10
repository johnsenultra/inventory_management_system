import { 
   Typography,
   Box,
   Card,
   Grid2 as Grid,
   CardContent,
   Alert,
   LinearProgress,
   CardHeader,
} from "@mui/material"
import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from "react";
import { Icon } from "lucide-react"
import { crossSquare } from "@lucide/lab"
import { useCallback } from "react";
import { supabase } from "../utils/supabase";
import { useEffect } from "react";

export const Dashboard = () => {
   const [totalEquipment, setTotalEquipment] = useState(0);
   const [available, setAvailable] = useState(0);
   const [serviceable, setServiceible] = useState(0);
   const [notServiceable, setNotServiceable] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);

   // MEMOIZE API CALLS
   const getTotalEquipmentValue = useCallback(async () => {
      setIsLoading(true);  
      try {
         const { count, error } = await supabase
         .from("equipment_inventory")
         .select("*", { count: 'exact', head: true })

         const { count: availableCount } = await supabase
         .from("equipment_inventory")
         .select("status", { count: "exact", head: true })
         .eq('status', 'Available');

         const { count: serviceableCount } = await supabase
         .from("equipment_inventory")
         .select("status", { count: "exact", head: true })
         .eq('status','Serviceable')

         const { count: notServiceableCount } = await supabase
         .from("equipment_inventory")
         .select("status", { count: "exact", head: true })
         .eq('status', 'Not Serviceable')
         
         

         if(error) throw error
         setTotalEquipment(count);
         setAvailable(availableCount);
         setServiceible(serviceableCount);
         setNotServiceable(notServiceableCount);
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
      <div className="m-5">

         {}
         

         {  error ? (
            <Alert severity="error" sx={{ m: 1 }}>{error}</Alert>
         )  :
         
            isLoading ? (
               <LinearProgress />
            ) : (

               <div>
                  { error && ( <Alert severity="error" sx={{ m: 1 }}>{error}</Alert> )}
                  <Box sx={{ mb: 1 }}>
                     <Typography sx={{ fontSize: "1.5rem" }}>Dashboard</Typography>
                  </Box>
                  <Box 
                     sx={{
                        display: "flex"
                     }}
                  >
                     <Grid container spacing={4} 
                        sx={{                
                           // display: "flex",
                           // alignItems: "center",
                           // justifyContent: "space-between" 
                        }}
                     >
                        <Grid size={{ xs: 12, sm: 4 }}>
                           <Card variant="outlined"
                              sx={{ boxShadow: 5, width: 275, borderRadius: 3, color: "#fff", backgroundColor: "#4453F2", }}
                           >
                              <CardContent>
                                 <Box sx={{ backgroundColor: "#fff", color: "#000", width: 32.3, p: "5px", borderRadius: 3   }}>
                                    <Icon sx={{ p: 2 }} iconNode={crossSquare} size={22}/>
                                 </Box>
                                 <Typography sx={{ mt: 1.5, fontSize: 15 }}>Total Equipment</Typography>
                                 <Typography sx={{ ml: 0.9, fontSize: 28, fontWeight: 700}}>{totalEquipment}</Typography>
                              </CardContent>
                           </Card>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                           <Card variant="outlined"
                              sx={{ p: 2, boxShadow: 5, width: 275 }}
                           >
                              <Typography></Typography>
                           </Card>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 4 }}>
                           <Card variant="outlined"
                              sx={{ p: 2, boxShadow: 5, width: 400, borderRadius: 3 }}
                           > 
                           <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: "1rem" }}>Equipment Status</Typography>
                              <PieChart 
                                 sx={{
                                    '& .MuiChartsLegend-root': {
                                       fontSize: '1rem',
                                    },
                                 }}
                                 series={[
                                    {
                                       data: [
                                          { id: 0, value: available, label: "Available" },
                                          { id: 1, value: serviceable, label: "Serviceable" },
                                          { id: 2, value: notServiceable, label: "Not Serviceable" }
                                       ],
                                       highlightScope: { fade: "global", highlight: "item" },
                                       faded: { innerRadius: 0, additionalRadius: -30, color: "gray" },
                                    }
                                 ]}
                                 height={200}
                                 width={200}
                                 // slotProps={{
                                 //    legend: {
                                 //       direction: "column"
                                 //    }
                                 // }}
                              />
                           </Card>
                        </Grid>
                     </Grid>
                  </Box>
               </div>
            )
         }
         
         
         
      </div>
   )
};

const StatusCard = ({ title, value, color }) => {
   <Box 
      
   >

   </Box>
}
