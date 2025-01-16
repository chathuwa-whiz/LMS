import React, { useState } from "react";
import { FiHome, FiBook, FiCalendar, FiSettings, FiBell, FiBarChart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar (Desktop View) */}
      <aside className="hidden lg:flex flex-col w-64 bg-purple-100 p-4 text-purple-800">
        <nav>
          <ul>
            <li className="flex items-center gap-2 py-2">
              <FiHome /> Dashboard
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiBook /> Courses
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiCalendar /> Schedule
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiBarChart /> Grades
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiSettings /> Settings
            </li>
          </ul>
        </nav>
      </aside>

      {/* Top Navigation Bar (Mobile/Tablet View) */}
      <header className="lg:hidden bg-purple-100 p-4 flex justify-between items-center">
        <h1 className="text-purple-800 text-xl font-bold">Dashboard</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-purple-800"
        >
          ☰
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-purple-100 p-4">
          <ul>
            <li className="flex items-center gap-2 py-2">
              <FiHome /> Dashboard
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiBook /> Courses
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiCalendar /> Schedule
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiSettings /> Grades
            </li>
            <li className="flex items-center gap-2 py-2">
              <FiSettings /> Settings
            </li>
          </ul>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-grow bg-gray-100 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-purple-800">Dashboard</h2>
          <div className="flex items-center gap-4">
            <FiBell className="text-purple-800 text-2xl" />
            <AiOutlineUser className="text-purple-800 text-2xl" />
          </div>
        </div>

        {/* Courses Section */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold text-purple-800">Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-yellow-100 rounded-lg">
              <h4 className="font-bold text-purple-800">Information Technology</h4>
              <p className="text-gray-600">20 modules</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg">
              <h4 className="font-bold text-purple-800">Information Technology</h4>
              <p className="text-gray-600">20 modules</p>
            </div>
            <div className="p-4 bg-purple-100 rounded-lg">
              <h4 className="font-bold text-purple-800">Information Technology</h4>
              <p className="text-gray-600">20 modules</p>
            </div>
          </div>
        </section>

        {/* Modules Section */}
        <section className="mt-6">
          <h3 className="text-xl font-semibold text-purple-800">My Modules</h3>
          <div className="mt-4">
            <ul>
              <li className="flex justify-between py-2 border-b">
                <span>Web Design</span>
                <span>80%</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span>Development Basics</span>
                <span>70%</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span>Python</span>
                <span>55%</span>
              </li>
              <li className="flex justify-between py-2 border-b">
                <span>JavaScript</span>
                <span>34%</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Right Sidebar (Hidden in Mobile/Tablet View) */}
      <aside className="hidden lg:block w-64 bg-purple-100 p-4 text-purple-800">
        <h3 className="font-bold">Profile</h3>
        <div className="mt-4 text-center">
          <div className="bg-purple-200 rounded-full h-16 w-16 mx-auto"></div>
          <p className="mt-2">Mahinda Rajapaksha</p>
        </div>
        <div className="mt-6">
          <h4 className="font-semibold">January 2025</h4>
          <ul className="mt-2">
            <li className="text-red-600">Task 1 high prio</li>
            <li className="text-green-600">Task 2 low prio</li>
            <li className="text-yellow-600">Task 3 medium prio</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
