import React, { useState } from "react";
import Header from "./Header";
import LazyLoad from "react-lazy-load";
import { FaChevronRight } from "react-icons/fa6";

const exams = [
  {
    title: "Introduction to HTML",
    description: "Complete the basic structure of HTML",
    type: "quiz",
    state: "completed",
    deadline: "2025-02-20 12:00:00",
  },
  {
    title: "Introduction to CSS",
    description: "Complete the basic structure of CSS",
    type: "assignment",
    state: "pending",
    deadline: "2025-02-20 12:00:00",
  },
  {
    title: "Introduction to React",
    description: "Complete the basic structure of React",
    type: "assignment",
    state: "completed",
    deadline: "2025-02-20 12:00:00",
  },
  {
    title: "Introduction to Node",
    description: "Complete the basic structure of Node",
    type: "quiz",
    state: "pending",
    deadline: "2025-02-20 12:00:00",
  },
  {
    title: "Introduction to Node",
    description: "Complete the basic structure of Node",
    type: "quiz",
    state: "pending",
    deadline: "2025-02-20 12:00:00",
  },
  {
    title: "Introduction to Node",
    description: "Complete the basic structure of Node",
    type: "quiz",
    state: "pending",
    deadline: "2025-02-20 12:00:00",
  },
  {
    title: "Introduction to Node",
    description: "Complete the basic structure of Node",
    type: "quiz",
    state: "pending",
    deadline: "2025-02-20 12:00:00",
  },
];

const courses = [
  {
    title: "Information Technology",
    modules: "20 modules",
    image: "/images/register_bg.png",
  },
  {
    title: "Information Technology",
    modules: "20 modules",
    image: "/images/register_bg.png",
  },
  {
    title: "Information Technology",
    modules: "20 modules",
    image: "/images/register_bg.png",
  },
  {
    title: "Information Technology",
    modules: "20 modules",
    image: "/images/register_bg.png",
  },
  {
    title: "Information Technology",
    modules: "20 modules",
    image: "/images/register_bg.png",
  },
];

const course = {
  title: "Information Technology",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  lectures: ["Mr.Ruwan", "Mr.Kamal", "Mr.Saman", "Mr.Nimal", "Mr.Sunil"],
  price: 5000,
};

export default function Course() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };
  return (
    <section className="lg:w-4/6 lg:px-10 px-5 w-full">
      <Header />

      <div className="mt-10">
        {/* title */}
        <span className="text-2xl font-semibold text-primary4">
          Assignments | Quizzes
        </span>

        {/* assignment | quiz cards */}
        <div className="flex flex-col gap-4 mt-6 w-full max-h-screen overflow-y-auto whitespace-nowrap scrollbar-hide">
          {exams.map((exam, index) => (
            <div
              key={index}
              className={`w-full h-full ${
                exam.state == "pending" ? "bg-white" : "bg-green-200"
              } rounded-xl flex justify-start px-4 py-2`}
            >
              {/* image */}
              <div className="h-32 w-32">
                <img
                  src={`${
                    exam.type == "quiz"
                      ? "/images/quiz.png"
                      : "/images/assignment.png"
                  }`}
                />
              </div>

              {/* content */}
              <div className="h-10 ml-4">
                <p className="text-xl font-semibold">{exam.title}</p>
                <p className="text-md text-gray-600 mt-1">{exam.deadline}</p>
                <p
                  className={`text-md font-medium ${
                    exam.state == "pending" ? "text-red-600" : "text-green-800"
                  }`}
                >
                  {exam.state}
                </p>
                <p className="text-md text-gray-500 mt-2">{exam.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* course cards */}
      <div className="flex gap-x-4 mt-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {courses.map((course, index) => (
          <div
            key={index}
            onClick={() => handleCourseClick(course)}
            className="bg-primary2 w-52 h-60 rounded-xl p-2 overflow-hidden flex flex-col justify-between flex-shrink-0 hover:cursor-pointer"
          >
            <div className="h-1/2 w-full rounded-lg flex justify-center items-center bg-primary3">
              <LazyLoad className="w-24">
                <img src={course.image} />
              </LazyLoad>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mt-2">
                {course.title}
              </p>
              <p className="text-gray-700 text-xs mt-1">{course.modules}</p>
            </div>

            {/* card bottom */}
            <div className="flex justify-between mt-3">
              {/* 3 lecture photos */}
              <div className="relative flex items-end">
                <div className="w-8 h-8 bg-purple-400 rounded-full hover:scale-110 hover:-translate-y-2 transition-transform"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full hover:scale-110 hover:-translate-y-2 transition-transform absolute left-6"></div>
                <div className="w-8 h-8 bg-purple-600 rounded-full hover:scale-110 hover:-translate-y-2 transition-transform absolute left-12"></div>
              </div>

              {/* go to course page */}
              <div className="flex items-center justify-center h-10 w-10 bg-primary3 rounded-lg text-primary1 hover:cursor-pointer hover:scale-110 transition-transform">
                <FaChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* course details - appears when click on course card */}
      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="w-full lg:w-1/2 bg-primary2 rounded-xl p-4">
            <h1 className="font-semibold text-2xl">{course.title}</h1>
            <p className="text-gray-800 mt-3">{course.description}</p>
            <div className="bg-white rounded-lg mt-5 p-4">
              <p className="font-medium text-lg">Lecture Panel</p>
              <div className="grid grid-cols-2 gap-4 mt-3">
                {course.lectures.map((lecture, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <div className="h-10 w-10 bg-primary3 rounded-full"></div>
                    <span className="font-thin">{lecture}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-5 mt-5">
                <span className="font-medium text-lg">Price</span>
                <span className="text-gray-800">
                  Rs. {course.price} / month
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
