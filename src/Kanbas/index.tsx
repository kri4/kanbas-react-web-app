import React from "react";
// import {Link} from "react-router-dom";
import Nav from "../Nav";
import Courses from "./Courses";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useState, useEffect } from "react";
import axios from "axios";
import store from "./store";
import { Provider } from "react-redux";

const API_BASE = process.env.REACT_APP_BASE_API_URL;
function Kanbas() {
  const COURSES_API = `${API_BASE}/api/courses`;
  const findAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  useEffect(() => {
    findAllCourses();
  }, []);

  const [courses, setCourses] = useState<any[]>([]);


  const [course, setCourse] = useState({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
  });
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    setCourses([ ...courses, response.data ]);
  };

  const deleteCourse = async (courseId: string) => {
    const response = await axios.delete(
      `${COURSES_API}/${courseId}`
    );
    setCourses(courses.filter(
      (c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    const response = await axios.put(
      `${COURSES_API}/${course._id}`,
      course
    );
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };


   return (
    <Provider store={store}>
     <div className="d-flex">
       <div>
         <KanbasNavigation/>
       </div>
       <div style={{ flexGrow: 1 }}>
       <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="Account" element={<h1>Account</h1>} />
          <Route path="Dashboard" element={
                        <Dashboard
                        courses={courses}
                        course={course}
                        setCourse={setCourse}
                        addNewCourse={addNewCourse}
                        deleteCourse={deleteCourse}
                        updateCourse={updateCourse}/>
          
          } />
          <Route path="Courses/:courseId/*" element={
            <Courses courses={courses} />} />
        </Routes>

       </div>
     </div>
     </Provider>

 );}
 export default Kanbas;
