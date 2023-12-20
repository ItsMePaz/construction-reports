import React from "react";
import fullScreenImage from "../../assets/img/bg5.jpg";
import PropTypes from "prop-types";
// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";

function RegisterPage({
  setGivenName,
  setMiddleName,
  setFamilyName,
  setUserName,
  setPassword,
  setIsSubmit,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  return (
    <div
      className="full-page register-page section-image"
      data-color="orange"
      data-image={fullScreenImage}
    >
      <div className="content d-flex align-items-center">
        <Container>
          <Card className="card-register card-plain text-center">
            <Card.Header>
              <Row className="justify-content-center ">
                <Col md="8">
                  <div className="header-text">
                    <Card.Title as="h2">
                      Light Bootstrap Dashboard PRO
                    </Card.Title>
                    <Card.Subtitle as="h4">
                      Register for free and experience the dashboard today
                    </Card.Subtitle>
                    <hr />
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body className="mb-6 custom-margin">
              <Row>
                <Col className="ml-auto" md="7" lg="5">
                  <div className="icon">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div className=" card-description">
                    <h4>Person In Charge</h4>
                    <p>
                      They act as the upper-managers for construction projects
                      and are in charge of creating and handling their project
                      manager's accounts and reading their reports.
                    </p>
                  </div>

                  <div className="icon">
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className="card-description">
                    <h4>Project Managers</h4>
                    <p>
                      Their role is to make sure different construction tasks
                      are completed on time. We rely on project managers to send
                      their reports regarding the status of construction to
                      their respective Person In Charge (PICs)
                    </p>
                  </div>

                  <div className="icon">
                    <i className="bi bi-newspaper"></i>
                  </div>
                  <div className="card-description">
                    <h4>Reports</h4>
                    <p>
                      This application helps maintain the flow of information
                      accross project managers and their admins through reports.
                      It includes a friendly form feature to be filled out by
                      project managers in a daily basis and will be
                      automatically organized and made available to their PICs.
                    </p>
                  </div>
                </Col>
                <Col className="mr-auto" md="5" lg="4">
                  <Form action="" method="" onSubmit={handleSubmit}>
                    <Card className="card-plain">
                      <div className="card-body">
                        <Form.Group>
                          <Form.Control
                            placeholder="Your Given Name"
                            required
                            type="text"
                            onChange={(e) => setGivenName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Your Middle Name"
                            type="text"
                            onChange={(e) => setMiddleName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Your Last Name"
                            required
                            type="text"
                            onChange={(e) => setFamilyName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Enter email"
                            required
                            type="email"
                            onChange={(e) => setUserName(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Control
                            placeholder="Password"
                            required
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                      </div>
                      <div className="card-footer text-center">
                        <Button
                          className="btn-fill btn-warning  btn-wd"
                          type="submit"
                          variant="default"
                        >
                          Create PIC Account
                        </Button>
                      </div>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${fullScreenImage})`,
        }}
      ></div>
    </div>
  );
}

RegisterPage.propTypes = {
  setGivenName: PropTypes.func,
  setMiddleName: PropTypes.func,
  setFamilyName: PropTypes.func,
  setUserName: PropTypes.func,
  setPassword: PropTypes.func,
  setIsSubmit: PropTypes.func,
};
export default RegisterPage;
