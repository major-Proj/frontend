import React, { useState } from 'react';

const CollapsibleSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[100vh]">
      <nav id="sidebar" className={`w-full bg-gray-900 text-white py-8 px-4 transition-all duration-300 ${isSidebarOpen ? '' : 'hidden'}`}>
        <ul className="list-none">
          <li><a href="/home" className="block py-2">Home</a></li>
          <li><a href="/feedback" className="block py-2">Feedback</a></li>
          <li><a href="#" className="block py-2">Services</a></li>
          <li><a href="#" className="block py-2">Contact</a></li>
        </ul>

      </nav>

      {/* <div id="content" className="flex-grow p-8">
        
      </div> */}
    </div>
  );
};

export default CollapsibleSidebar;
