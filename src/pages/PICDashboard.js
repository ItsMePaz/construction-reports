import { React, useState, useEffect } from "react";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import AllPMReportsReactTable from "../views/Tables/AllPMReportsReactTable";
import CountingCard from "../components/CountingCard";
import getCurrentUserDetails from "../services/getCurrentUserDetails";

const PICDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [yesterdayReports, setYesterdayReports] = useState([]);
  const [projectManagerCount, setProjectManagerCount] = useState(0);
  const [allReportData, setAllReportData] = useState([]);
  const [currentUSerPICId, setCurrentUSerPICId] = useState("");

  const navigate = useNavigate();

  const fetchUserAttributes = async () => {
    const currentUserGroup = await getCurrentUserDetails.getUserGroup();
    const currentPICUserFirstName =
      (await getCurrentUserDetails.getUserGivenName()) || " ";
    try {
      if (!currentUserGroup.includes("PIC")) {
        alert(
          "You are not authorized to access this page. Please log in first."
        );
        navigate("/");
      } else {
        setFirstName(currentPICUserFirstName);
      }
    } catch (error) {
      console.error("Error fetching user attributes:", error);
      if (!firstName) {
        handleSignOut();
      } else {
        alert(error + " please try again");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchUserAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectManagerCount]);

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <CountingCard
        yesterdayReports={yesterdayReports}
        projectManagerCount={projectManagerCount}
        allReportData={allReportData}
        currentUserPICId={currentUSerPICId}
      />
      <AllPMReportsReactTable
        yesterdayReports={yesterdayReports}
        setYesterdayReports={setYesterdayReports}
        setProjectManagerCount={setProjectManagerCount}
        allReportData={allReportData}
        setAllReportData={setAllReportData}
        setCurrentUSerPICId={setCurrentUSerPICId}
      />
    </div>
  );
};

export default PICDashboard;
