import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";
import { Form } from "@formio/react";

const PICConfirmationPage = () => {
  const location = useLocation();
  let emailToConfirm = "";
  try {
    emailToConfirm = location.state.email;
  } catch (error) {
    emailToConfirm = "";
  }
  const handleSignUpConfirmation = async ({ username, confirmationCode }) => {
    try {
      await confirmSignUp({ username, confirmationCode });
      alert("Successully signed up");
      navigate("/pic-login");
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmit = (submission) => {
    const username = submission.data.email;
    const confirmationCode = submission.data.confirmationCode;
    handleSignUpConfirmation({ username, confirmationCode });
  };
  const navigate = useNavigate();
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column align-items-center">
        <h2 className="mb-3">Person in Charge (PIC)</h2>
        <h2>Account Verification</h2>
        {emailToConfirm ? (
          <p className="w-75 text-center mt-3">
            Please check your email, <strong>{emailToConfirm}</strong> for a
            verification code and enter it below. Don't forget to also check
            your spam folder
          </p>
        ) : null}
        <div
          style={{
            maxWidth: "60%",
            minWidth: "60%",
          }}
        >
          <Form
            src={"https://aepvzifupjxekdl.form.io/picconfirmation"}
            onSubmit={onSubmit}
          />
        </div>
        <div className="d-flex justify-content-center w-100">
          <button
            className="text-primary cursor-pointer text-decoration-none btn btn-link p-0"
            onClick={() => navigate("/")}
          >
            Back to landing page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PICConfirmationPage;
