import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import ReactTable from "../../components/ReactTable/ReactTable.js";
import SweetAlert from "react-bootstrap-sweetalert";
import * as queries from "../../graphql/queries.js";
import { generateClient } from "aws-amplify/api";

import * as mutations from "../../graphql/mutations.js";
import ImageList from "../../components/ImageList.js";

import PropTypes from "prop-types";
import formatDate from "../../utils/formatDateMethod.js";
import getCurrentUserDetails from "../../services/getCurrentUserDetails.js";
function ReactTables({
  yesterdayReports,
  setYesterdayReports,
  setProjectManagerCount,
  allReportData,
  setAllReportData,

  setCurrentUSerPICId,
}) {
  const [data, setData] = useState([]);
  const [alert, setAlert] = React.useState(null);
  /*   const [isRepeat, setIsRepeat] = useState(false); */
  const [pmList, setPmList] = useState([]);
  const [triggerList, setTriggerList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getListOfAllReferencedPms = async () => {
    try {
      const pmData = await generateClient().graphql({
        query: queries.listProjectManagers,
        authMode: "userPool",
      });
      const pmArrayOfObjects = pmData.data.listProjectManagers.items;
      const pmObjectsToArray = pmArrayOfObjects.map((obj) =>
        Object.values(obj)
      );
      setPmList(pmObjectsToArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getOwnedPMId = async () => {
    const currentPICUSerId = await getCurrentUserDetails.getUserObjectId();
    try {
      setCurrentUSerPICId(currentPICUSerId);
      const projectManagerListResponse = await generateClient().graphql({
        query: queries.listProjectManagers,
        variables: {
          filter: {
            personInChargeProjectManagersId: { eq: currentPICUSerId },
          },
        },
        authMode: "userPool",
      });

      const pmArray = projectManagerListResponse.data.listProjectManagers.items;
      const pmIds = pmArray.map((obj) => obj.id);

      setTriggerList(!triggerList);

      return pmIds;
    } catch (error) {
      console.log(error);
    }
  };

  const selectArraysOnPreviousDay = async (inputArray) => {
    /*  if (inputArray.length === 0) {
      setIsRepeat(!isRepeat);
    } */
    return new Promise((resolve, reject) => {
      if (!Array.isArray(inputArray)) {
        reject("Invalid input. Expected an array.");
      }

      const currentDate = new Date();
      const previousDate = new Date(currentDate);
      previousDate.setDate(currentDate.getDate() - 1);

      const result = inputArray.filter((arr) => {
        const arrayDate = new Date(arr[4]);
        return (
          arrayDate.getFullYear() === previousDate.getFullYear() &&
          arrayDate.getMonth() === previousDate.getMonth() &&
          arrayDate.getDate() === previousDate.getDate()
        );
      });

      setYesterdayReports(result);

      resolve(result);
    });
  };

  const getListOfAllObjectReports = async () => {
    const pmIds = await getOwnedPMId();
    setProjectManagerCount(pmIds.length);

    const uniqueArray = new Set();
    const arrayOfPromises = pmIds.map(async (pmId) => {
      const allReportForEachIdResponse = await generateClient().graphql({
        query: queries.listReports,
        variables: { filter: { projectManagerReportId: { eq: pmId } } },
        authMode: "userPool",
      });
      return allReportForEachIdResponse.data.listReports.items;
    });
    const unConcatenatedArraysOfReports = await Promise.all(arrayOfPromises);
    const flattenedArray = unConcatenatedArraysOfReports.flat();
    const flatArrayToArrays = flattenedArray.map((obj) => Object.values(obj));
    flatArrayToArrays.forEach((arr) => uniqueArray.add(JSON.stringify(arr)));
    const uniqueArray2 = Array.from(uniqueArray).map((str) => JSON.parse(str));
    setAllReportData(uniqueArray2);
  };

  const getProjectManagerName = (projectManagerReportId) => {
    const thePm = pmList.find((obj) => obj[0] === projectManagerReportId);
    if (!thePm) {
      return "Loading...";
    }
    const firstName = thePm[1] || "";
    const middleName = thePm[3] || "";
    const lastName = thePm[2] || "";
    const fullName = firstName + " " + middleName + " " + lastName;
    return fullName;
  };

  const getProjectManagerEmail = (projectManagerReportId) => {
    const thePm = pmList.find((obj) => obj[0] === projectManagerReportId);

    if (thePm === undefined) {
      return "Loading...";
    }
    const email = thePm[5] || "";
    return email;
  };

  const titleAndTextAlert = async (
    title,
    description,
    images,
    dateSubmitted,
    reportId,
    projectManagerName,
    projectManagerEmail
  ) => {
    try {
      setAlert(
        <SweetAlert
          style={{
            display: "block",
            marginTop: "-100px",
            overflowY: "auto",
            maxHeight: "900px",
          }}
          title="Project Report"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnBsStyle="info"
        >
          <div className="d-flex flex-column align-items-center mt-3">
            <h5 className="mb-4">
              <strong> Title: {title}</strong>
            </h5>
            <p className="mb-4">
              <strong>Description:</strong>
            </p>
            <p className="mb-4">{description}</p>

            <p className="mb-4">
              <strong>Images:</strong>
            </p>

            <ImageList imageUrls={images} />
            <p className="mb-4 mt-2">
              <strong>Submitted on:</strong> {dateSubmitted}
            </p>

            <p className="mb-4 mt-2">
              <strong>Project Manager Name:</strong> {projectManagerName}
            </p>
            <p className="mb-4 mt-2">
              <strong>Project Manager Email:</strong> {projectManagerEmail}
            </p>
            <p className="mb-4 mt-2">
              <strong>Report ID:</strong> {reportId}
            </p>
          </div>
        </SweetAlert>
      );
    } catch (error) {
      console.error("Error displaying alert:", error);
    }
  };

  const successDelete = async (id, email) => {
    const client = generateClient();
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Deleted!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnBsStyle="info"
      >
        Project Manager account has been deleted.
      </SweetAlert>
    );
    try {
      const pmDetails = {
        id: id,
      };

      const deletedTodo = await client.graphql({
        query: mutations.deleteProjectManager,
        variables: { input: pmDetails },
        authMode: "userPool",
      });
      if (deletedTodo.errors) {
        console.log("Error deleting Project Manager");
      }
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

  const warningWithConfirmAndCancelMessage = (id, name, email) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => successDelete(id, email)}
        onCancel={() => cancelDelete()}
        confirmBtnBsStyle="info"
        cancelBtnBsStyle="danger"
        confirmBtnText="I'm sure"
        cancelBtnText="Cancel"
        showCancel
      >
        <div>Are you sure you want to delete this Project Manager?</div>
        <br />
        <div>{name}</div>
      </SweetAlert>
    );
  };

  const hideAlert = () => {
    setAlert(null);
    /* 
    setIsRepeat(!isRepeat); */
  };

  const fetchAllReportData = async () => {
    await getListOfAllReferencedPms();
    /*     await getListOfAllReports(); */
    await getListOfAllObjectReports();
    await selectArraysOnPreviousDay(allReportData);
    console.log("allReportData", allReportData);
    setIsLoading(false);
  };
  /*   const repeatRender = () => {
    setIsRepeat(!isRepeat);
  };
 */
  useEffect(
    () => {
      setIsLoading(true);
      fetchAllReportData();
      /*   if (pmList.length === 0) {
        repeatRender();
      } */
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      /* isRepeat */
    ]
  );

  useEffect(() => {
    setData(
      allReportData.map((prop, key) => {
        return {
          id: key,
          reportId: prop[0] || "",
          title: prop[1] || "",
          imageKeys: prop[3] || [],
          dateSubmitted: formatDate.formatDate(prop[4]) || "",
          description: prop[2] || "",
          projectManagerName: getProjectManagerName(prop[6]) || "Loading...",
          projectManagerEmail: getProjectManagerEmail(prop[6]) || "",

          actions: (
            <div className="actions-right">
              <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === key);

                  titleAndTextAlert(
                    obj.title,
                    obj.description,
                    obj.imageKeys,
                    obj.dateSubmitted,
                    obj.reportId,
                    obj.projectManagerName,
                    obj.projectManagerEmail
                  );
                }}
                variant="warning"
                size="sm"
                className="text-success btn-link edit"
                title="View"
              >
                <i className="fa fa-magnifying-glass" />
              </Button>{" "}
              <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === prop[0]);

                  warningWithConfirmAndCancelMessage(
                    obj.id,
                    obj.name,
                    obj.email
                  );
                }}
                variant="danger"
                size="sm"
                className="btn-link remove text-danger"
                title="Delete"
              >
                <i className="fa fa-times" />
              </Button>{" "}
            </div>
          ),
        };
      })
    );
    /*   if (data.length === 0) {
      repeatRender();
    }
    if (allReportData.length === 0) {
      repeatRender();
    } */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* isRepeat */ allReportData]);

  return (
    <>
      {alert}
      <Container fluid>
        <Row>
          <Col md="12">
            <h4 className="title">Your Project Managers' Reports</h4>
            <Card>
              <Card.Body>
                <ReactTable
                  data={data}
                  columns={[
                    {
                      Header: "Title",
                      accessor: "title",
                    },
                    {
                      Header: "Date Created",
                      accessor: "dateSubmitted",
                    },
                    {
                      Header: "Project Manager",
                      accessor: "projectManagerName",
                    },
                    {
                      Header: "Report ID",
                      accessor: "reportId",
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

ReactTables.propTypes = {
  yesterdayReports: PropTypes.array,
  setYesterdayReports: PropTypes.func,
  setProjectManagerCount: PropTypes.func,
  allReportData: PropTypes.array,
  currentUSerPICId: PropTypes.string,
  setCurrentUSerPICId: PropTypes.func,
};

export default ReactTables;
