import { React, useState, useMemo, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { fetchAuthSession, signOut } from "aws-amplify/auth";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import image3 from "../assets/img/full-screen-image-3.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../pmRoutes";
import PropTypes from "prop-types";
import getCurrentUserDetails from "../services/getCurrentUserDetails";

const PMLayout = ({ children }) => {
  const sidebarImage = useMemo(() => image3, []);
  const sidebarBackground = useMemo(() => "black", []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
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

      const currentUserSchemaDetails =
        await getCurrentUserDetails.getObjectSchemaAttributes();

      setFirstName(currentUserSchemaDetails.given_name);

      setLastName(currentUserSchemaDetails.last_name);
    } catch (error) {
      console.error("Error fetching user attributes:", error);
      if (!firstName) {
        alert("Please log in first");
        handleSignOut();
        navigate("/");
      } else {
        alert(error + " please try again");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchUserAttributes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();
  const isSidebarVisible =
    location.pathname === "/pm/dashboard/" ||
    location.pathname === "/pm/dashboard" ||
    location.pathname === "/pm/dashboard/add-report" ||
    location.pathname === "/pm/dashboard/add-report/" ||
    location.pathname === "/pm/dashboard/edit-profile" ||
    location.pathname === "/pm/dashboard/edit-profile/";

  return (
    <div className="wrapper">
      {isSidebarVisible && (
        <Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
          lastName={lastName}
          givenName={firstName}
        />
      )}
      <div className="main-panel">
        <AdminNavbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

PMLayout.propTypes = {
  children: PropTypes.node,
};

export default PMLayout;
