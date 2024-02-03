import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import format from "../utils/formatDateMethod";
import { generateClient } from "aws-amplify/api";
import * as queries from "../graphql/queries";

//This component displays the number of reports submitted yesterday,
//the total number of reports submitted, and the number of active
//and deactivated project managers.
//available to the current PIC user.
const CountingCard = ({
  yesterdayReports,
  allReportData,
  currentUserPICId,
}) => {
  const [oldestReportDate, setOldestReportDate] = useState("");
  const [latestReportDateFromYesterday, setLatestReportDateFromYesterday] =
    useState("");
  const [activeCount, setActiveCount] = useState(0);
  const [deactivatedCount, setDeactivatedCount] = useState(0);
  const [yesterdayCount, setYesterdayCount] = useState(0);

  //This function returns the number of active and deactivated project managers
  //this PIC User is in charge of.
  const getListOfProjectManagers = async () => {
    try {
      const pmActive = await generateClient().graphql({
        query: queries.listProjectManagers,
        variables: {
          filter: {
            is_active: {
              eq: true,
            },
            personInChargeProjectManagersId: {
              eq: currentUserPICId,
            },
          },
        },
        authMode: "userPool",
      });

      setActiveCount(pmActive.data.listProjectManagers.items.length);

      const pmDeactivated = await generateClient().graphql({
        query: queries.listProjectManagers,
        variables: {
          filter: {
            is_active: {
              eq: false,
            },
            personInChargeProjectManagersId: {
              eq: currentUserPICId,
            },
          },
        },
        authMode: "userPool",
      });
      setDeactivatedCount(pmDeactivated.data.listProjectManagers.items.length);
    } catch (error) {
      console.log(error);
    }
  };

  //This function returns the most recent date of the reports submitted yesterday.
  const getMostRecentDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length === 0) {
      console.error(
        "Invalid input. Expected a non-empty array of date strings."
      );
      return null;
    }

    const arrayOfYesterdayDates = yesterdayReports.map(
      (reportDate) => reportDate[4]
    );

    const dates = arrayOfYesterdayDates.map((date) => new Date(date));
    const mostRecentDate = new Date(Math.max(...dates));

    setLatestReportDateFromYesterday(format.formatDate(mostRecentDate));
  };

  //This function returns the oldest date of the reports submitted.
  const getOldestDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length === 0) {
      console.error(
        "Invalid input. Expected a non-empty array of date strings."
      );
      return null;
    }

    const count = dateArray.length;
    setYesterdayCount(count);

    const arrayOfAllDates = allReportData.map((reportDate) => reportDate[4]);

    const dates = arrayOfAllDates.map((date) => new Date(date));

    const oldestDate = new Date(Math.min(...dates));
    setOldestReportDate(format.formatDate(oldestDate));
  };

  useEffect(() => {
    getMostRecentDate(yesterdayReports);
    getOldestDate(allReportData);
    getListOfProjectManagers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yesterdayReports, allReportData, currentUserPICId]);
  return (
    <Container fluid>
      <Row>
        <Col md="4">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Yesterday Report Count</Card.Title>
            </Card.Header>
            <Card.Body>
              <h1>{yesterdayReports.length}</h1>
              <p className="text-secondary">
                Last updated: {latestReportDateFromYesterday || "Loading..."}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Total Report Count</Card.Title>
            </Card.Header>
            <Card.Body>
              <h1>{yesterdayCount || "Loading"}</h1>
              <p className="text-secondary">Since: {oldestReportDate}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Project Manager Count</Card.Title>
            </Card.Header>
            <Card.Body>
              <h1>{activeCount + deactivatedCount}</h1>
              <p className="text-secondary">
                Active: {activeCount} | Deactivated: {deactivatedCount}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

CountingCard.propTypes = {
  yesterdayReports: PropTypes.array,
  allReportData: PropTypes.array,
  currentUserPICId: PropTypes.string,
};

export default CountingCard;
