import { Navigate, Route, Routes } from "react-router-dom";
import ClientsPage from "./pages/Clients";
import ProjectsPage from "./pages/Projects";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/clients" />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
    </Routes>
  );
}
