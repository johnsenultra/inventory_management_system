import { 
   Typography,
   Box,
   Card,
   Grid2 as Grid,

} from "@mui/material"

export const Dashboard = () => {


   return  (
      <div className="m-5 border-2 border-dotted">
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
                     sx={{ p: 2, boxShadow: 5, width: 275, borderRadius: 3, backgroundColor: "#4453F2" }}
                  >
                     <Typography>Total Equipment</Typography>
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
   )
};

const StatusCard = ({ title, value, color }) => {
   <Box 
      
   >

   </Box>
}
