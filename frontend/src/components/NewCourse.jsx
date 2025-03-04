import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./courses.css";

const NewCourse = () => {
  const [courseData, setCourseData] = useState({ 
      title: "", 
      description: "", 
      email: "" ,
      password:""
    });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setUser(decodedUser);
      } catch (err) {
        console.error("Token decoding failed:", err);
        setUser(null);
      }
    }
  }, []);

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user is an admin
    if (!user || user.role !== "admin") {
      alert("Access Denied: Only admins can add courses.");
      return;
    }

    fetch("http://127.0.0.1:3001/api/newCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}` // Attach JWT Token
      },
      body: JSON.stringify(courseData),
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Unauthorized. Please log in.");
        if (res.status === 403) throw new Error("Access denied. Admins only.");
        if (!res.ok) throw new Error("Something went wrong. Please try again.");
        return res.json();
      })
      .then(() => {
        alert("Course added successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error adding course:", err);
        alert(err.message);
      });
  };

  return (
    <div className="form-container" style={{ marginTop: "80px" }}>
      <h2>Add a New Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Course Name" value={courseData.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={courseData.description} onChange={handleChange} required />
        <input type="name" name="name" placeholder="Content Admin Name" value={courseData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Content Admin Email" value={courseData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Content Admin Password" value={courseData.password} onChange={handleChange} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default NewCourse;
