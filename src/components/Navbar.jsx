import React,{useState} from "react";
function Navbar({darkMode }) {

  const [open, setOpen] = useState(isOpen);

  return (

    <nav className={`flex fixed w-full items-center justify-between px-6 h-16  border-b border-gray-200 z-10 absolute ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
    <div className="flex items-center">
      <button className="mr-2 text-2xl" aria-label="Open Menu" onClick={() => setOpen(!open)}>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
<path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
</svg>
      </button>
      <label>Dashboard</label>
    </div>
    <div className="flex items-center">
      <div className="flex justify-between bg-transparent">
      <button onClick={toggleTheme}>Toggle Theme</button>
        <button className="flex items-center p-3 font-medium mr-2 text-center bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6
                    0H9"></path>
          </svg>  {saveCount}
        </button>
        
        <button className="hidden sm:flex items-cente p-3 font-medium mr-2 text-center bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
  );
}

export default Navbar;