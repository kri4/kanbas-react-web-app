import React from "react";

import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaGlasses } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import "./index.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";



function Courses({ courses }: { courses: any[]; }) {
    const { courseId } = useParams();
    const COURSES_API = "https://kanbas-node-server-app-3-7335311db66e.herokuapp.com/";
    // const COURSES_API = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState<any>({ _id: "" });
    const findCourseById = async (courseId?: string) => {
      const response = await axios.get(
        `${COURSES_API}/${courseId}`
      );
      setCourse(response.data);
    };
  
    const { pathname } = useLocation();

    const lastSegment = pathname.split('/').pop();
    useEffect(() => {
        findCourseById(courseId);
      }, [courseId]);
    
    return (
        <div>
                <h2 className="wd-courses-h2">
                    <HiMiniBars3 className="wd-courses-minibar"
                    /> Course {course?.name} 
                     <IoIosArrowForward/> {lastSegment}
                    <button id="student-view"><FaGlasses /> Student View</button>

                </h2>
       
            <CourseNavigation />
            <div>
                <div
                    className="overflow-y-scroll position-fixed bottom-0 end-0"
                    style={{ left: "320px", top: "50px" }} >
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h1>Piazza</h1>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:assignmentId" element={<h1>Assignment Editor</h1>} />
                        <Route path="Grades" element={<h1>Grades</h1>} />
                    </Routes>
                </div>
            </div>
        </div>
    );

}
export default Courses;
