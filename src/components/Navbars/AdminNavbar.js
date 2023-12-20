import React, { useState } from "react";
import { Button, Container, Navbar } from "react-bootstrap";

function AdminNavbar() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [showCoverButton, setShowCoverButton] = useState(false);

  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-mini");
    setShowCoverButton(!showCoverButton); // Toggle the visibility of Button 3
  };

  const toggleNavOpen = () => {
    document.documentElement.classList.toggle("nav-open");
    setShowCoverButton(!showCoverButton); // Toggle the visibility of Button 3
  };

  return (
    <Navbar expand="lg">
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-minimize">
            {/* Button 1 */}
            <Button
              className="btn-fill btn-round btn-icon d-none d-lg-block bg-dark border-dark"
              variant="dark"
              onClick={toggleSidebar}
            >
              <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
              <i className="fas fa-bars visible-on-sidebar-mini"></i>
            </Button>
            {/* Button 2 */}
            <Button
              className="btn-fill btn-round btn-icon d-block d-lg-none bg-dark border-dark"
              variant="dark"
              onClick={toggleNavOpen}
            >
              <i className="fas fa-ellipsis-v visible-on-sidebar-regular"></i>
              <i className="fas fa-bars visible-on-sidebar-mini"></i>
            </Button>
            {/* Button 3 */}
            {showCoverButton && (
              <Button
                className="btn btn-fill  btn-icon fixed-top fixed-right  position-fixed vw-100 vh-100 bg-dark opacity-50 d-lg-none"
                variant="dark"
                onClick={toggleNavOpen}
              ></Button>
            )}
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
