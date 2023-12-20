import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Form } from "@formio/react";

import updateCurrentUserDetailsHandler from "../services/updateCurrentUserDetailsHandler";

const EditProfilePage = () => {
  const onSubmit = (submission) => {
    try {
      const { firstName, middleName, lastName } = submission.data;

      if (firstName) {
        updateCurrentUserDetailsHandler.updateUserGivenName(firstName);
      }

      if (middleName) {
        updateCurrentUserDetailsHandler.updateUserMiddleName(middleName);
      }

      if (lastName) {
        updateCurrentUserDetailsHandler.updateUserFamilyName(lastName);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmitPassword = (submission) => {
    const oldPassword = submission.data.oldPassword;
    const newPassowrd = submission.data.newPassword;
    updateCurrentUserDetailsHandler.updateCurrentUserPassword(
      oldPassword,
      newPassowrd
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h4 className="title">Update Profile Details </h4>
          <Card>
            <Card.Body>
              <div
                className="container d-flex align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                <div style={{ width: "100vh" }} className="my-5">
                  <div>
                    <Form
                      src={"https://ymzjzgouwasattu.form.io/updateuserprofile"}
                      onSubmit={onSubmit}
                    />
                  </div>
                </div>
              </div>
              <p className="text-muted font-italic">
                Note: In this form, you can fill up only the attributes you want
                to change and leave the others blank before clicking submit.
                Submit button will appear when there is any input.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md="12">
          <h4 className="title">Update password</h4>
          <Card>
            <Card.Body>
              <div
                className="container d-flex align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                <div style={{ width: "100vh" }} className="my-5">
                  <div>
                    <Form
                      src={"https://ymzjzgouwasattu.form.io/updatepassword"}
                      onSubmit={onSubmitPassword}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;
