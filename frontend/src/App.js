import { Routes, Route } from "react-router";
import './App.css';
import LoginPage from './pages/Auth/Login';
import IncomeReportPage from './pages/IncomeReport/IncomeReport';
import InstructorDetailPage from './pages/Instructor/InstructorDetail';
import ListInstructorPage from './pages/Instructor/ListInsructor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="income-report" element={<IncomeReportPage />} />
      <Route path="instructors" element={<ListInstructorPage />} />
      <Route path="instructors/:instructorId" element={<InstructorDetailPage />} />
    </Routes>
  );
}

export default App;
