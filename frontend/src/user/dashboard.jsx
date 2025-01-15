import React from "react";

export default function dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="bg-white w-full lg:w-1/5 p-5 shadow-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
          <h1 className="text-xl font-bold">Academy</h1>
        </div>
        <nav className="space-y-6">
          {[
            { name: "Dashboard", icon: "📊" },
            { name: "Courses", icon: "📚" },
            { name: "Chats", icon: "💬" },
            { name: "Grades", icon: "📑" },
            { name: "Schedule", icon: "🗓️" },
            { name: "Settings", icon: "⚙️" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-gray-600 hover:text-purple-600 cursor-pointer"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
        <div className="mt-12 bg-purple-100 p-4 rounded-lg flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-300 rounded-full"></div>
          <div>
            <h2 className="font-bold">Premium Subscription</h2>
            <p className="text-sm text-gray-600">
              Get access to all premium courses!
            </p>
            <button className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg">
              Learn More
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-lg shadow-sm"
            />
            <button className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center">
              🔔
            </button>
          </div>
        </header>

        {/* New Courses */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">New Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Geography", lessons: "12", color: "bg-yellow-100" },
              { title: "JavaScript", lessons: "15", color: "bg-purple-100" },
              { title: "Photography", lessons: "8", color: "bg-blue-100" },
            ].map((course, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm ${course.color}`}
              >
                <h3 className="font-bold">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.lessons} lessons</p>
                <button className="mt-2 text-purple-500">View Course →</button>
              </div>
            ))}
          </div>
        </section>

        {/* My Courses */}
        <section>
          <h2 className="text-xl font-bold mb-4">My Courses</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="table-auto w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Course Name</th>
                  <th className="p-3">Start</th>
                  <th className="p-3">Rate</th>
                  <th className="p-3">Level</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Web Design", start: "May 12", rate: "4.8", level: "Elementary" },
                  { name: "Development Basics", start: "May 14", rate: "4.4", level: "Intermediate" },
                  { name: "Data with Python", start: "May 17", rate: "4.6", level: "Intermediate" },
                  { name: "HTML Basics", start: "May 26", rate: "4.7", level: "Elementary" },
                  { name: "JavaScript", start: "May 30", rate: "4.9", level: "Advanced" },
                ].map((course, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{course.name}</td>
                    <td className="p-3">{course.start}</td>
                    <td className="p-3">{course.rate}</td>
                    <td className="p-3">{course.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Profile Section */}
      <aside className="bg-white w-full lg:w-1/4 p-5 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="font-bold">Esther Howard</h2>
            <p className="text-sm text-gray-600">Elementary</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-4">Homework Progress</h3>
          {[
            { name: "Styling with CSS", progress: "50%" },
            { name: "Basics of Programming", progress: "65%" },
            { name: "Learn to Program in Java", progress: "25%" },
          ].map((task, index) => (
            <div key={index} className="mb-3">
              <p className="text-sm font-bold">{task.name}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: task.progress }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
