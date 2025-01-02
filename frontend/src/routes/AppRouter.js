import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Student from "../views/Student/Student";
import Classes from "../views/Classes/Classes";
import Sessions from "../views/Sessions/Sessions";
import Comments from "../views/Comments/Comments";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../views/Auth/Login";
import ListInstructorPage from "../views/Instructor/ListInsructor";
import InstructorDetailPage from "../views/Instructor/InstructorDetail";
import IncomeReportPage from "../views/IncomeReport/IncomeReport";
const AppRouter = () => {
    return (
        <Routes>
            {/* Sử dụng MainLayout cho tất cả các route */}
            <Route index element={<LoginPage />} />
            <Route
                path="*"
                element={
                    <MainLayout>
                        <Routes>
                            <Route path="/students" element={<Student />} />
                            <Route path="/classes" element={<Classes />} />
                            <Route path="/sessions" element={<Sessions />} />
                            <Route path="/comments" element={<Comments />} />
                            <Route path="/income-report" element={<IncomeReportPage />} />
                            <Route path="/instructors" element={<ListInstructorPage />} />
                            <Route
                                path="/instructors/:instructorId"
                                element={<InstructorDetailPage />}
                            />
                            <Route path="/report" element={<IncomeReportPage />}></Route>
                            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
                        </Routes>
                    </MainLayout>
                }
            />
        </Routes>
    );
};

export default AppRouter;


// import Sidebar from "../components/Sidebar/Sidebar";
// import Header from "../components/Header/Header";
// import Dashboard from "../views/Dashboard/Dashboard";
// import Student from "../views/Student/Student";
// import Classes from "../views/Classes/Classes";
// import Sessions from "../views/Sessions/Sessions";
// import Comments from "../views/Comments/Comments";
