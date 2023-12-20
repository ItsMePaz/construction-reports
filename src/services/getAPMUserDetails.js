import { generateClient } from "aws-amplify/api";
import * as queries from "../graphql/queries";

const getAllReports = async (id) => {
  try {
    const reportResponse = await generateClient().graphql({
      query: queries.listReports,
      authMode: "userPool",
    });

    const reportObject = reportResponse.data.listReports.items;

    // Resolve the promise with the length of reportObject
    return Promise.resolve(reportObject);
  } catch (error) {
    console.log("Error fetching user status:", error);
    // Reject the promise with the error
    return Promise.reject(error);
  }
};

const getAPMUserDetails = { getAllReports };

export default getAPMUserDetails;
