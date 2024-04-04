import { React } from "react";
import { Form } from "@formio/react";
import { signUp } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { Container, Row, Col, Card } from "react-bootstrap";
import * as mutations from "../graphql/mutations";
import getCurrentUserDetails from "../services/getCurrentUserDetails";

const PMRegistration = () => {
  const register = async (
    username,
    password,
    given_name,
    middle_name,
    family_name,
    profilePictureKey
  ) => {
    try {
      const email = username;
      const currentPICUserID = await getCurrentUserDetails.getUserObjectId();
      const client = generateClient();
      //This function creates a new user in the Cognito User Pool.
      //And then moves the user to the PM Group.
      //This function bypasses email verification
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            given_name,
            middle_name,
            family_name,
            preferred_username: "PM",
          },
        },
      });

      await client.graphql({
        query: mutations.createProjectManager,
        variables: {
          input: {
            email: username,
            given_name: given_name,
            last_name: family_name,
            middle_name: middle_name,
            is_active: true,

            preferred_username: "PM",
            profile_picture: profilePictureKey,
            personInChargeProjectManagersId: currentPICUserID,
          },
        },

        authMode: "userPool",
      });
      alert("PM account created");
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmit = async (submission) => {
    const profilePicKey = await submission.data.file[0].key;

    await register(
      submission.data.email,
      submission.data.password,
      submission.data.firstName,
      submission.data.middleName,
      submission.data.lastName,
      profilePicKey
    );
  };
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <h4 className="title">Add Project Manager</h4>
          <Card>
            <Card.Body>
              <div
                className="container d-flex align-items-center justify-content-center"
                style={{ height: "100%" }}
              >
                <div style={{ width: "100vh" }} className="my-5">
                  <div>
                    <Form
                      src={"https://txldmjvisxedgls.form.io/pmregistration"}
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

export default PMRegistration;
