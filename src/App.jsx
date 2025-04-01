import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SideBar } from "./components/SideBar";
import { Dashboard } from "./components/Dashboard";
import { Equipment } from "./components/Equipment";
import "./css/index.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<SideBar /> }>
          <Route index element={<Dashboard />} />
          <Route path="equipment" element={<Equipment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
