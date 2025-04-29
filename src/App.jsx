import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Dashboard } from "./components/Dashboard";
import { Equipment } from "./components/Equipment";
import "./css/index.css";
import theme from "./utils/theme"
import { ThemeProvider } from "@mui/material";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<SideBar /> }>
            <Route index element={<Dashboard />} />
            <Route path="equipment" element={<Equipment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
