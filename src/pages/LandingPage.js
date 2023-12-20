import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showIntro, setShowIntro] = useState(false);

  const navigate = useNavigate();

  const AUTH_OPTIONS = {
    PC_REGISTRATION: "Register as a PIC",
    PC_LOGIN: "Log in as a PIC",
    PM_LOGIN: "Log in as a PM",
  };

  const navOptions = [
    AUTH_OPTIONS.PC_REGISTRATION,
    AUTH_OPTIONS.PC_LOGIN,
    AUTH_OPTIONS.PM_LOGIN,
  ];

  const handleNavigateTo = (navOption) => {
    switch (navOption) {
      case AUTH_OPTIONS.PC_REGISTRATION:
        return () => navigate("/pic-registration");
      case AUTH_OPTIONS.PC_LOGIN:
        return () => navigate("/pic-login");
      case AUTH_OPTIONS.PM_LOGIN:
        return () => navigate("/pm-login");
      default:
        return () => navigate("/");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 position-relative">
      <div className="d-flex z-1">
        <h1>Welcome to CM Reports! </h1>
        <button
          className="btn btn-secondary m-2 rounded-circle z-1 h-2"
          style={{ width: "40px", height: "40px" }}
          title="Click me for a short introduction!"
          onClick={() => setShowIntro(!showIntro)}
        >
          ?
        </button>
      </div>

      <nav>
        {navOptions.map((navOption) => (
          <button
            key={navOption}
            className="btn btn-primary m-2 z-1"
            onClick={handleNavigateTo(navOption)}
          >
            {navOption}
          </button>
        ))}
      </nav>
      {showIntro ? (
        <section className="position-absolute z-2 card rounded height-300 width-250 bg-white">
          <div className="card-body d-flex flex-column justify-content-center text-center max-width-50">
            <h5 className="card-title mb-4">Introduction</h5>
            <p className="card-text">
              This is a simple web application that allows you to register as a{" "}
              <strong> Person In Charge (PIC) </strong>or login as a PIC or{" "}
              <strong>Project Manager (PM)</strong>.
            </p>
            <p className="card-text">
              PMs are responsible for submitting reports to their PICs.
            </p>
            <p className="card-text">
              PICs are responsible for viewing reports submitted by their PMs.
            </p>
            <p className="card-text">
              Also, PICs are responsible in creating, manipulating, and deleting
              PM accounts.
            </p>
            <button
              className="btn btn-secondary m-2 z-1 max-width-25 mx-auto"
              style={{ width: "100px" }}
              onClick={() => setShowIntro(!showIntro)}
            >
              Close
            </button>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default LandingPage;
