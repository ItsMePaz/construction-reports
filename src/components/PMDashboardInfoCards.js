import React, { useEffect, useState } from "react";

import * as queries from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import formatDate from "../utils/formatDateMethod";
import { Card, Container, Row, Col } from "react-bootstrap";
import getCurrentUserDetails from "../services/getCurrentUserDetails";

const PMDashBoardInfoCards = () => {
  const [picName, setPicName] = useState("");
  const [picEmail, setPicEmail] = useState("");
  const [pmId, setPmId] = useState("");
  const [reportCount, setReportCount] = useState(0);
  const [recentReportDate, setRecentReportDate] = useState("");

  //This function returns all the current PM user's reports and counts the number of reports
  const getReports = async () => {
    try {
      const reports = await generateClient().graphql({
        query: queries.listReports,
        variables: {
          filter: {
            projectManagerReportId: {
              eq: pmId,
            },
          },
        },
        authMode: "userPool",
      });

      const items = reports.data.listReports.items;

      if (items.length === 0) {
        return setRecentReportDate("No reports yet");
      }

      const mostRecentDate = items.reduce((maxDate, currentObject) => {
        const currentDate = currentObject.createdAt;

        if (!maxDate || currentDate > maxDate) {
          return currentDate;
        } else {
          return maxDate;
        }
      }, null);

      const recentCreatedReportDate = formatDate(mostRecentDate);

      setRecentReportDate(recentCreatedReportDate || " ");

      setReportCount(reports.data.listReports.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  //This function returns the name and email details of current PM user's PIC
  const getPICAttributes = async () => {
    try {
      const pmId = await getCurrentUserDetails.getUserObjectId();
      setPmId(pmId);
      const pmOwner = await generateClient().graphql({
        query: queries.getProjectManager,
        variables: {
          id: pmId,
        },
        authMode: "userPool",
      });

      const firstName =
        pmOwner.data.getProjectManager.personInCharge.given_name || " ";
      const middleName =
        pmOwner.data.getProjectManager.personInCharge.middle_name || " ";
      const familyName =
        pmOwner.data.getProjectManager.personInCharge.last_name || " ";
      setPicName(firstName + " " + middleName + " " + familyName);
      setPicEmail(pmOwner.data.getProjectManager.personInCharge.email || " ");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPICDetails = async () => {
      await getPICAttributes();
      await getReports();
    };

    fetchPICDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picEmail]);

  return (
    <Container fluid>
      <Row>
        <Col md="5">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Total Report Sent</Card.Title>
            </Card.Header>
            <Card.Body>
              <h1>{reportCount}</h1>
              <p className="text-secondary">Last updated: {recentReportDate}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md="7">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Your Person In Charge</Card.Title>
            </Card.Header>
            <Card.Body>
              {picName ? <h1>{picName}</h1> : <h1>Loading...</h1>}
              {picEmail ? (
                <p className="text-secondary">{picEmail}</p>
              ) : (
                <p>Loading...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PMDashBoardInfoCards;
