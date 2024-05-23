import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./components/Auth"
import { AmounTIContext } from './AmounTIContext'
import Home from './components/Home'
import TableProjects from './components/TableProjects'
import ProjectOptions from './components/ProjectOptions'
import ListElements from './components/ListElements'

function App() {
  const [token, setToken] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const login = () => { setIsAuthenticated(true); };
  const logout = () => {   setIsAuthenticated(false); };

  return (
    <>
    <AmounTIContext.Provider value={{ token, setToken , isAuthenticated, login, logout} }> 
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/tableprojects" element={<TableProjects />} />
          <Route path="/projectoptions" element={<ProjectOptions />} />
          <Route path="/listelements" element={<ListElements />} />
        </Routes>
      </BrowserRouter>
    </AmounTIContext.Provider>
    </>
  )
}

export default App
