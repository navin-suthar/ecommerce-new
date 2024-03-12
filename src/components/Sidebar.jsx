import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import Link from react-router-dom

function Sidebar({ isOpen,darkMode,toggleTheme }) {
  const [open, setOpen] = useState(isOpen);
  const sidebarRef = useRef(null);
  const saveCount = useSelector((state) => state.products.saveCount);

  useEffect(() => {
    setOpen(isOpen); // Synchronize state with prop when it changes
  }, [isOpen]);

  return (
    <div className='mt-0'>
      <nav className={`flex fixed w-full items-center justify-between px-6 h-16  border-b border-gray-200 z-10 absolute ${darkMode ? 'bg-dark text-white' : 'bg-white text-dark'}`}>
        <div className="flex items-center">
          <button className={`mr-2 text-2xl ${darkMode ?  ' text-white':'text-dark' }`} aria-label="Open Menu" onClick={() => setOpen(!open)}>
          <svg xmlns="http://www.w3.org/2000/svg" className={` ${darkMode ?  ' text-white':'text-dark' }`} x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
<path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
</svg>
          </button>
 
        </div>
        <div className="flex items-center">
          <div className="flex justify-between bg-transparent">
     
          <label class="relative flex justify-between items-center group p-2 text-xl">
  {darkMode?'Dark':'Light'}
  <input type="checkbox" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" onClick={toggleTheme} />
  <span class="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-6 group-hover:after:translate-x-1"></span>
</label>
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

      {open && (
        <div className="z-10 fixed inset-0 transition-opacity bg-black opacity-50" tabIndex="0" onClick={() => setOpen(!open)}></div>
      )}

      <aside ref={sidebarRef} className={`transform top-0 left-0 w-64  fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${open ? 'translate-x-0' : '-translate-x-full'} ${darkMode?'bg-dark text-white' : 'bg-white text-dark'}`}>
        <span className="flex w-full items-center p-4 border-b">
          <label>Dashboard</label>
        </span>
        {/* Link to home page */}
        <Link to="/" className={`flex items-center p-4 hover:bg-indigo-500   cursor-pointer`}>
          <span className="mr-2">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          <span>Dashboard</span>
        </Link>
        {/* Link to home page */}
        <Link to="/productlist" className={`flex items-center p-4 hover:bg-indigo-500  cursor-pointer`}>
          <span className="mr-2">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </span>
          <span>Products</span>
        </Link>
      </aside>
    </div>
  );
}

export default Sidebar;
