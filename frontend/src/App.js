import { Routes, Route } from "react-router";
import "./App.css";
import LoginPage from "./pages/Auth/Login";
import IncomeReportPage from "./pages/IncomeReport/IncomeReport";
import InstructorDetailPage from "./pages/Instructor/InstructorDetail";
import ListInstructorPage from "./pages/Instructor/ListInsructor";
import InstructorCreate from "./pages/Instructor/InstructorCreate";
import DefaultLayout from "./layouts/DefaultLayout";
function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="income-report" element={<IncomeReportPage />} />
        <Route path="instructors" element={<ListInstructorPage />} />
        <Route path="instructors/create" element={<InstructorCreate />} />
        <Route
          path="instructors/:instructorId"
          element={<InstructorDetailPage />}
        />
      </Route>
    </Routes>
  );
}

export default App;
