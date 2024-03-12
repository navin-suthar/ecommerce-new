import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProductList from "./ProductList";
import Dashboard from "./components/dashbaord";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark" ,"text-white");
    } else {
      document.body.classList.remove("bg-white" ,"text-dark");
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}>
        {/* <Navbar toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} /> */}
        <Sidebar isOpen={isOpen} darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/productlist" element={<ProductList darkMode={darkMode} />} />
          <Route path="/" element={<Dashboard darkMode={darkMode} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
