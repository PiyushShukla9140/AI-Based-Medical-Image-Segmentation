import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import PatientDetails from "../pages/PatientDetails";
import Scans from "../pages/Scans";
import ScanDetails from "../pages/ScanDetails";
import ScanViewer from "../pages/ScanViewer";
import AIAnalysis from "../pages/AIAnalysis";
import Reports from "../pages/Reports";
import CreateReport from "../pages/CreateReport";
import ReportDetails from "../pages/ReportDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetails />} />

          <Route path="/scans" element={<Scans />} />
          <Route path="/scans/:id" element={<ScanDetails />} />
          <Route path="/scans/:id/viewer" element={<ScanViewer />} />
          <Route path="/scans/:id/ai-analysis" element={<AIAnalysis />} />

          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/create/:scanId" element={<CreateReport />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
