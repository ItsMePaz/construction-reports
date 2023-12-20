import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import SweetAlert from "react-bootstrap-sweetalert";
import * as queries from "../../graphql/queries";
import ImageList from "../../components/ImageList.js";
import formatDate from "../../utils/formatDate";
// react-bootstrap components
import { Button, Card, Container, Row, Col } from "react-bootstrap";

import ReactTable from "../../components/ReactTable/OwnerReportsReactTable.js";

function ReactTablesPM() {
  const [data, setData] = React.useState([]);

  const [pmEmail, setPMEmail] = useState("");

  const [pmId, setPMId] = useState("");
  const [reportsDataTable, setReportsDataTable] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isRepeat, setIsRepeat] = useState(false);

  const getCurrentUserObjectId = async () => {
    try {
      const currentUserObjectId = await generateClient().graphql({
        query: queries.listProjectManagers,
        variables: {
          filter: {
            email: {
              eq: pmEmail,
            },
          },
        },
        authMode: "userPool",
      });

      setPMId(currentUserObjectId.data.listProjectManagers.items[0].id);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentUserEmail = async () => {
    try {
      const currentSessionId = await fetchAuthSession();

      setPMEmail(currentSessionId.tokens.idToken.payload.email);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getSinglePM = async () => {
    try {
      await generateClient().graphql({
        query: queries.getProjectManager,
        variables: {
          id: "e78d7bc3-a5b7-4b68-857f-7e4c0d4c96d3",
        },
        authMode: "userPool",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getReports = async () => {
    try {
      const reportResponse = await generateClient().graphql({
        query: queries.listReports,

        authMode: "userPool",
      });
      const reportObjects = reportResponse.data.listReports.items.filter(
        (obj) => obj.projectManagerReportId === pmId
      );

      const reportObjectsArray = reportObjects.map((obj) => Object.values(obj));
      setReportsDataTable(reportObjectsArray);
    } catch (error) {
      console.log(error);
    }
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const titleAndTextAlert = async (
    title,
    description,
    images,
    dateSubmitted,
    reportId
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
            <p className="mb-4">
              Title: <strong>{title}</strong>
            </p>
            <p className="mb-4">Description: {description}</p>
            <p className="mb-4">Images:</p>

            <ImageList imageUrls={images} />
            <p className="mb-4 mt-2">Submitted on: {dateSubmitted}</p>
            <p className="mb-4 mt-2">Report ID: {reportId}</p>
          </div>
        </SweetAlert>
      );
    } catch (error) {
      console.error("Error displaying alert:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUserEmail();
      await getSinglePM();
      await getCurrentUserObjectId();

      await getReports();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pmEmail, pmId /* , picId, isUpdated */]);

  const repeatRender = () => {
    setIsRepeat(!isRepeat);
  };

  useEffect(() => {
    setData(
      reportsDataTable.map((prop, key) => {
        return {
          id: key,
          reportId: prop[0],
          title: prop[1],
          imageKeys: prop[3],
          dateSubmitted: formatDate.formateDate(prop[4]),
          description: prop[2],
          actions: (
            <div className="actions-right">
              {/* use this button to add a edit kind of action */}
              <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === key);
                  titleAndTextAlert(
                    obj.title,
                    obj.description,
                    obj.imageKeys,
                    obj.dateSubmitted,
                    obj.reportId
                  );
                }}
                variant="warning"
                size="sm"
                className="text-success btn-link edit"
                title="View"
              >
                <i className="fa fa-magnifying-glass" />
              </Button>{" "}
            </div>
          ),
        };
      })
    );
    if (data.length === 0) {
      repeatRender();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pmEmail, isRepeat]);

  return (
    <>
      {alert}
      <Container fluid>
        <Row>
          <Col md="12">
            <h4 className="title">Your Reports</h4>

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
                      Header: "Date created",
                      accessor: "dateSubmitted",
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
                  /*
                    You can choose between primary-pagination, info-pagination, success-pagination, warning-pagination, danger-pagination or none - which will make the pagination buttons gray
                  */
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

export default ReactTablesPM;
