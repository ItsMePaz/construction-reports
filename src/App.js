import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PICRegistrationPage from "./pages/PICRegistrationPage";
import PICLoginPage from "./pages/PICLoginPage";
import PMLoginPage from "./pages/PMLoginPage";
import PICConfirmationPage from "./pages/PICConfirmationPage";
import PICDashboard from "./pages/PICDashboard";
import PMDashboard from "./pages/PMDashboard";
import AddProjectManagerPage from "./pages/AddProjectManagerPage";
import PICLayout from "./layouts/PICLayout";
import PMLayout from "./layouts/PMLayout";

import ListProjectManagers from "./pages/ListProjectManagers";
import AddReportPage from "./pages/AddReportPage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pic-registration" element={<PICRegistrationPage />} />
      <Route path="/pic-login" element={<PICLoginPage />} />
      <Route path="/pm-login" element={<PMLoginPage />} />
      <Route
        path="/pic-registration-confirmation"
        element={<PICConfirmationPage />}
      />

      {/* <Route path="/pm-dashboard" element={<PMDashboard />} /> */}

      <Route
        path="/pic/dashboard"
        element={
          <PICLayout>
            <Outlet />
          </PICLayout>
        }
      >
        <Route index element={<PICDashboard />} />
        <Route path="add-project-manager" element={<AddProjectManagerPage />} />
        <Route path="list-project-manager" element={<ListProjectManagers />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
      </Route>
      <Route
        path="/pm/dashboard"
        element={
          <PMLayout>
            <Outlet />
          </PMLayout>
        }
      >
        <Route index element={<PMDashboard />} />
        <Route path="add-report" element={<AddReportPage />} />
        <Route path="edit-profile" element={<EditProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
