import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Student from "../views/Student/Student";
import Classes from "../views/Classes/Classes";
import Sessions from "../views/Sessions/Sessions";
import Comments from "../views/Comments/Comments";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../views/Auth/Login";
import ListInstructorPage from "../views/Instructor/ListInsructor";
import InstructorDetailPage from "../views/Instructor/InstructorDetail";
import IncomeReportPage from "../views/IncomeReport/IncomeReport";
import PrivateRoute from "./PrivateRoutes";
import InstructorCreate from "../views/Instructor/InstructorCreate";

const AppRouter = () => {
  return (
    <Routes>
      {/* Route đăng nhập */}
      <Route path="/login" element={<LoginPage />} />

      {/* Route bảo vệ bằng PrivateRoute */}
      <Route
        path="*"
        element={
          <PrivateRoute>
            <MainLayout>
              <Routes>
                <Route path="/students" element={<Student />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/income-report" element={<IncomeReportPage />} />
                <Route path="/instructors" element={<ListInstructorPage />} />
                <Route
                  path="/instructors/create"
                  element={<InstructorCreate />}
                />
                <Route
                  path="/instructors/:instructorId"
                  element={<InstructorDetailPage />}
                />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
              </Routes>
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
