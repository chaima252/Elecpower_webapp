
import './App.css'
import Button from '@mui/material/Button';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ProjectsList from './pages/ProjectsList';
import Employees from './pages/Employees';
import Cabinets from './pages/Cabinets';
import Materials from './pages/Materials';
function App() {

  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={< Layout />} >
        <Route path="projects" element={<ProjectsList />} />
        <Route path="employees" element={<Employees />} />
        <Route path="cabinets" element={<Cabinets />} />
        <Route path="materials" element={<Materials />} />
        </Route>
      </Routes>
    
    </BrowserRouter>

  )
}

export default App
