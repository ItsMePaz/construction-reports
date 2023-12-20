import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import SinglePMReportsReactTable from "../views/Tables/SinglePMReportsReactTable";
import PMDashBoardInfoCards from "../components/PMDashboardInfoCards";

const PMDashboard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };
  async function handleSignOut() {
    try {
      await signOut();
      handleNavigate();
    } catch (error) {
      alert(error.message);
    }
  }

  const fetchUserAttributes = async () => {
    try {
      const currentSessionId = await fetchAuthSession();
      const userGroups =
        currentSessionId.tokens.accessToken.payload["cognito:groups"];

      if (!userGroups.includes("PM")) {
        alert(
          "You are not authorized to access this page. Please log in first."
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching user attributes:", error);

      handleSignOut();
      setTimeout(() => {
        alert("Please log in first");
      }, 0);
    }
  };

  useEffect(() => {
    fetchUserAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PMDashBoardInfoCards />
      <SinglePMReportsReactTable />
    </div>
  );
};

export default PMDashboard;
