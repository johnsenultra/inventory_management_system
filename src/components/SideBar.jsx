import Logo from "../assets/nddrmc_logo.png";
import { 
   Stack,
   Box,
   Typography,
   Divider,
   ListItemIcon,
   ListItemButton,
   ListItemText,
   Drawer as MuiDrawer,
   AppBar as MuiAppBar,
   Toolbar as MuiToolbar,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { tabsClasses } from '@mui/material/Tabs';
import { Settings2 } from "lucide-react";
import { CircleGauge } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;
const appBarHeight = 68;

const AppBar = styled(MuiAppBar)(() => ({
   height: appBarHeight,
   boxSizing: "border-box",
   display: "block",
   boxShadow: 0,
   bgcolor: 'background.paper',
   backgroundImage: 'none',
   borderBottom: '1px solid',
   color: "#0C1017",
   width: `calc(100% - ${drawerWidth}px)`,
}));

const Drawer = styled(MuiDrawer)(({ theme }) => ({
   width: drawerWidth,
   flexShrink: 0,
   '& .MuiDrawer-paper': {
      width: drawerWidth,
      backgroundColor: "#0C1017",
      color: "#FFFFE8",
      boxSizing: 'border-box',
      position: 'fixed',
      top: 'var(--template-frame-height, 0px)',
      height: '100vh',
      borderRight: `1px solid ${theme.palette.divider}`,
   },
}));

const Toolbar = styled(MuiToolbar)({
   width: '100%',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'start',
   justifyContent: 'center',
   gap: '12px',
   flexShrink: 0,
   [`& ${tabsClasses.flexContainer}`]: {
      gap: '8px',
      p: '8px',
      pb: 0,
   },
});

export const SideBar = () => {
   return (
      <Box sx={{ display: 'flex' }}>
         {/* AppBar */}
         <AppBar position="fixed" sx={{ backgroundColor: "#0C1017" }}>
            <Toolbar>
               <Stack direction="row" alignItems="center" sx={{ height: '100%', textTransform: "uppercase", color: "#FFFFE8" }}>
                  <Typography variant="h6">Inventory Management System</Typography>
               </Stack>
            </Toolbar>
         </AppBar>

         {/* Drawer */}
         <Drawer variant="permanent">
            <Box sx={{ background: "background.paper", padding: 1 }}>
               {/* Header Section */}
               <Stack direction="row" sx={{ paddingLeft: 1.5, alignItems: "center" }}>
                  <img src={Logo} alt="Logo" style={{ borderRadius: "50%", width: 50 }} />
                  <Typography sx={{ letterSpacing: 1.5, fontSize: "1.5rem", ml: 2 }}>NDRRMC</Typography>
               </Stack>

               <Divider sx={{ mt: 1, mb: 1, background: "#FFFFE8", opacity: 1 }} />

               {/* Navigation Links */}
               <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemButton 
                     sx={{ 
                        minHeight: 48,
                        borderRadius: 2
                     }}
                  >
                     <ListItemIcon
                        sx={{ 
                           minWidth: 0,
                           mr: 2,
                           justifyContent: "center",
                           color: "#FFFFE8"
                        }}
                     >
                        <CircleGauge size={20} />
                     </ListItemIcon>
                     <ListItemText primary="Dashboard" />
                  </ListItemButton>
               </Link>

               <Link to="/equipment" style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItemButton
                     sx={{
                        minHeight: 48,
                        borderRadius: 2
                     }}
                  >
                     <ListItemIcon
                        sx={{ 
                           minWidth: 0,
                           mr: 2,
                           justifyContent: "center",
                           color: "#FFFFE8"
                        }}
                     >
                        <Settings2 size={20} />
                     </ListItemIcon>
                     <ListItemText primary="Equipment" />
                  </ListItemButton>
               </Link>
            </Box>
         </Drawer>
         
         {/* Main content */}
         <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
            <Outlet />

         </Box>
      </Box>
   );
};