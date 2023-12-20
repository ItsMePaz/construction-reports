import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import ReactTable from "../../components/ReactTable/OwnerReportsReactTable.js";
import SweetAlert from "react-bootstrap-sweetalert";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../graphql/mutations.js";
import { fetchAuthSession } from "aws-amplify/auth";
import { post } from "aws-amplify/api";
import s3DownloadImageHandler from "../../services/s3DownloadImageHandler.js";
import s3DeleteImageHandler from "../../services/s3DeleteImageHandler.js";
import getAPMUserDetails from "../../services/getAPMUserDetails.js";

function ReactTables({ pmData, setIsUpdated, isUpdated }) {
  const [data, setData] = useState([]);
  const [alert, setAlert] = React.useState(null);
  const [isRepeat, setIsRepeat] = useState(false);
  const [allAvailableReports, setAllAvailableReports] = useState([]);
  const [displayedCount, setDisplayedCount] = useState(0);

  const getProfilePictureURL = async (imgKey) => {
    const imgUrl = await s3DownloadImageHandler.getImageUrl(imgKey);
    return imgUrl;
  };

  const titleAndTextAlert = async (
    name,
    email,
    lastUpdate,

    dateCreated,
    status,
    profileImageKey,
    reportCount
  ) => {
    let image = "";
    if (profileImageKey !== " ") {
      image = await getProfilePictureURL(profileImageKey);
    } else {
      image = await getProfilePictureURL("photo/unavailable-profile-pic.jpg");
    }

    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Project Manager Profile"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
      >
        <div className="d-flex flex-column align-items-center mt-3">
          <img
            className="photo"
            src={image}
            alt="profile_img"
            style={{
              maxHeight: "150px",
              maxWidth: "150px",
              overflow: "hidden",
              margin: "auto",
              borderRadius: "100%",
              display: "block",
              border: "3px solid grey",
              marginBottom: "20px",
            }}
          />
          <p className="mb-4">
            Name: <strong>{name}</strong>
          </p>
          <p className="mb-4">Email: {email}</p>
          {status === "Active" ? (
            <p className="mb-4">
              Account Status: <span className="text-success">Active</span>
            </p>
          ) : (
            <p className="mb-4">
              Account Status: <span className="text-danger">Deactivated</span>
            </p>
          )}
          <p className="mb-4">Account created on {dateCreated}</p>
          <p className="mb-4">Account was updated on {lastUpdate}</p>
          <p>Submitted a total of {displayedCount} reports</p>
        </div>
      </SweetAlert>
    );
  };

  const disableUser = async (email) => {
    const token = (await fetchAuthSession()).tokens.accessToken.toString();

    try {
      let apiName = "AdminQueries";
      let path = "/disableUser";
      let options = {
        body: {
          username: email,
          userPoolId: "pazCapstoneUserPool-dev",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      return post({ apiName, path, options });
    } catch (error) {
      console.log("error disabling user:", error);
    }
  };

  const enableUser = async (email) => {
    const token = (await fetchAuthSession()).tokens.accessToken.toString();

    try {
      let apiName = "AdminQueries";
      let path = "/enableUser";
      let options = {
        body: {
          username: email,
          userPoolId: "pazCapstoneUserPool-dev",
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      return post({ apiName, path, options });
    } catch (error) {
      console.log("error disabling user:", error);
    }
  };

  const successDelete = async (id, email, profileImageKey) => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Deactivated!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
      >
        Project Manager account has been deactivated.
      </SweetAlert>
    );
    try {
      const removeImageAndDeactivate = await generateClient().graphql({
        query: mutations.updateProjectManager,
        variables: {
          input: {
            id: id,
            is_active: false,
            profile_picture: "",
          },
        },
        authMode: "userPool",
      });
      if (removeImageAndDeactivate.errors) {
        alert("Error deleting Project Manager");
      }
      await disableUser(email);
      await s3DeleteImageHandler.deleteImage(profileImageKey);
    } catch (error) {
      alert("error deleting Project Manager");
    }
  };

  const successEnable = async (id, email, profileImageKey) => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Enabled!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
      >
        Project Manager account has been enabled.
      </SweetAlert>
    );
    try {
      const activateUser = await generateClient().graphql({
        query: mutations.updateProjectManager,
        variables: {
          input: {
            id: id,
            is_active: true,
          },
        },
        authMode: "userPool",
      });
      if (activateUser.errors) {
        console.log("Error deleting Project Manager");
      }
      await enableUser(email);
    } catch (error) {
      console.log("error deleting Project Manager:", error);
    }
  };

  const cancelDelete = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelled"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
      ></SweetAlert>
    );
  };

  const cancelEnable = () => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Enabling user cancelled"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
      ></SweetAlert>
    );
  };

  const warningWithConfirmAndCancelMessageForDisable = (
    id,
    name,
    email,
    profileImageKey
  ) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => successDelete(id, email, profileImageKey)}
        onCancel={() => cancelDelete()}
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
        confirmBtnText="I'm sure"
        cancelBtnText="Cancel"
        showCancel
      >
        <div>{name}'s account will be deactivated.</div>
        <br />
        <p className="text-muted font-italic">
          Note: Deactivating a user account will revoke all authorizations given
          to the user. The reports the user created prior to deactivation is
          still saved in the database but will not viewable unless the user is
          enabled.
        </p>
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
    setIsUpdated(!isUpdated);
    setIsRepeat(!isRepeat);
  };

  const warningWithConfirmAndCancelMessageForEnable = (
    id,
    name,
    email,
    profileImageKey,
    status
  ) => {
    if (status === "Active") {
      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="User already enabled"
          onConfirm={() => hideAlert()}
          confirmBtnBsStyle="info"
        ></SweetAlert>
      );
    } else {
      setAlert(
        <SweetAlert
          warning
          style={{ display: "block", marginTop: "-100px" }}
          title="Are you sure?"
          onConfirm={() => successEnable(id, email, profileImageKey)}
          onCancel={() => cancelEnable()}
          confirmBtnBsStyle="info"
          cancelBtnBsStyle="danger"
          confirmBtnText="I'm sure"
          cancelBtnText="Cancel"
          showCancel
        >
          <div>{name}'s account will be Enabled.</div>
          <br />
          <p className="text-muted font-italic">
            Note: Enabling will allow the user to access his account again.
            Reports that the user created will be available again.
          </p>
        </SweetAlert>
      );
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    // Create the formatted date string
    return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  };

  const repeatRender = () => {
    setIsRepeat(!isRepeat);
  };

  const getStatusTitle = (status) => {
    if (status === true) {
      return "Active";
    } else if (status === false) {
      return "Deactivated";
    }
  };

  const listAllReports = async () => {
    const reports = await getAPMUserDetails
      .getAllReports
      /* "8f752a2a-8472-4073-8ad2-3ce0e373de9e" */
      ();
    setAllAvailableReports(reports);
  };

  const listOfReportsOfSinglePM = (targetId) => {
    // Use the reduce method to count objects with the specified id
    const count = allAvailableReports.reduce((accumulator, currentObject) => {
      // Check if the current object has the targetId
      if (currentObject.projectManagerReportId === targetId) {
        return accumulator + 1; // Increment the count
      } else {
        return accumulator; // No change to the count
      }
    }, 0); // Initial value of the accumulator is 0
    setDisplayedCount(count);
    return count;
  };

  useEffect(() => {
    listAllReports();

    setData(
      pmData.map((prop, key) => {
        return {
          id: prop[0],
          name: prop[1] + " " + prop[3] + " " + prop[2],
          email: prop[5],
          lastUpdate: formatDate(prop[9]),
          dateCreated: formatDate(prop[8]),

          givenName: prop[1],
          middleName: prop[3],
          familyName: prop[2],
          status: getStatusTitle(prop[6]),
          profileImageKey: prop[7] || " ",
          reportCount: listOfReportsOfSinglePM(prop[0]),

          actions: (
            <div className="actions-right">
              <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === prop[0]);

                  titleAndTextAlert(
                    obj.name,
                    obj.email,
                    obj.lastUpdate,

                    obj.dateCreated,
                    obj.status,
                    obj.profileImageKey,
                    obj.reportCount
                  );
                }}
                variant="warning"
                size="sm"
                className="text-success btn-link edit"
                title="View"
              >
                <i className="fa fa-magnifying-glass" />
              </Button>{" "}
              {/*  <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === prop[0]);
                
                  titleAndTextAlertForUpdate(
                    obj.givenName,
                    obj.middleName,
                    obj.familyName,
                    obj.email,
                    obj.id
                  );
                }}
                variant="warning"
                size="sm"
                className="text-warning btn-link edit"
                title="Update"
              >
                <i className="fa fa-edit" />
              </Button>{" "} */}
              <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === prop[0]);

                  warningWithConfirmAndCancelMessageForDisable(
                    obj.id,
                    obj.name,
                    obj.email,
                    obj.profileImageKey
                  );
                }}
                variant="danger"
                size="sm"
                className="btn-link remove text-danger"
                title="Deactivate?"
              >
                <i className="fa fa-lock" />
              </Button>{" "}
              <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === prop[0]);

                  warningWithConfirmAndCancelMessageForEnable(
                    obj.id,
                    obj.name,
                    obj.email,
                    obj.profileImageKey,
                    obj.status
                  );
                }}
                variant="danger"
                size="sm"
                className="btn-link remove text-success"
                title="Enable?"
              >
                <i className="fa fa-unlock" />
              </Button>{" "}
            </div>
          ),
        };
      })
    );
    if (data.length === 0) {
      repeatRender();
    }
    if (!data) {
      repeatRender();
    }
    if (!pmData) {
      repeatRender();
    }
    if (allAvailableReports.length === 0) {
      repeatRender();
    }

    if (!displayedCount) {
      repeatRender();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pmData, isRepeat]);

  return (
    <>
      {alert}
      <Container fluid>
        <Row>
          <Col md="12">
            <h4 className="title">Your Project Managers</h4>
            {/*  <button onClick={repeatRender}>refresh</button> */}
            <Card>
              <Card.Body>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: "Name",
                      accessor: "name",
                    },
                    {
                      Header: "Email",
                      accessor: "email",
                    },
                    {
                      Header: "Last Report Update",
                      accessor: "lastUpdate",
                    },
                    {
                      Header: "Report Count",
                      accessor: "reportCount",
                    },
                    {
                      Header: "Account Status",
                      accessor: "status",
                    },
                    {
                      Header: "Actions",
                      accessor: "actions",
                      sortable: false,
                      filterable: false,
                    },
                  ]}
                  className="-striped -highlight primary-pagination"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ReactTables;
