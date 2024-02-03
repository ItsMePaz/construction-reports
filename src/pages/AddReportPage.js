import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Form } from "@formio/react";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";
import getCurrentUserDetails from "../services/getCurrentUserDetails";

//This component allows the current PM user to create a report.
const AddReportPage = () => {
  const createReport = async (title, description, reportKey) => {
    const currentPMUserId = await getCurrentUserDetails.getUserObjectId();
    try {
      await generateClient().graphql({
        query: mutations.createReport,
        variables: {
          input: {
            title: title,
            description: description,
            images: reportKey,
            projectManagerReportId: currentPMUserId,
          },
        },
        authMode: "userPool",
      });
      alert("Report Created");
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmit = async (submission) => {
    const reportKeyArray = await submission.data.file.map((obj) => obj.key);

    await createReport(
      submission.data.taskTitle,
      submission.data.description,
      reportKeyArray
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h4 className="title">Create Report</h4>
          <Card>
            <Card.Body>
              <div
                className="container d-flex align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                <div style={{ width: "100vh" }} className="my-5">
                  <div>
                    <Form
                      src={"https://aepvzifupjxekdl.form.io/pmreportform"}
                      onSubmit={onSubmit}
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

export default AddReportPage;
