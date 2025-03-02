import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Import authentication context
import "./courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth(); // Get current user from auth context

  useEffect(() => {
    fetch("http://127.0.0.1:3001/api/courses")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="courses-container">
      <h1 className="page-title">Explore Our Courses</h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="What do you want to learn?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="courses-grid">
        {courses
          .filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((course) => (
            <div key={course._id} className="course-card">
              <h2 className="course-title">{course.title}</h2>
              <p className="course-description">{course.description}</p>
              <p><strong>Content Admin Name : </strong> {course.admin}</p>
              <Link to={`/courses/${course._id}`}>
                <button className="explore-button">Explore</button>
              </Link>
            </div>
          ))}
      </div>

      {/* Show "Add New Course" button only if user is an admin */}
      {currentUser?.role === "admin" && (
        <Link to="/add-course">
          <button className="add-course-button">Add New Course</button>
        </Link>
      )}
    </div>
  );
};

export default Courses;
