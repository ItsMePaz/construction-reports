import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";
import * as queries from "../graphql/queries";

const getUserAttributesAll = async () => {
  try {
    const currentSessionId = await fetchAuthSession();
    const userAttributes = currentSessionId.tokens.idToken.payload;

    return userAttributes;
  } catch (error) {
    console.log("Error fetching user attributes:", error);
  }
};

const getUserEmail = async () => {
  try {
    const currentSessionId = await fetchAuthSession();
    const userEmail = currentSessionId.tokens.idToken.payload.email;

    return userEmail;
  } catch (error) {
    console.log("Error fetching user email:", error);
  }
};

const getUserGivenName = async () => {
  try {
    const currentSessionId = await fetchAuthSession();
    const userFirstName = currentSessionId.tokens.idToken.payload.given_name;

    return userFirstName;
  } catch (error) {
    console.log("Error fetching user first name:", error);
  }
};

const getUserMiddleName = async () => {
  try {
    const currentSessionId = await fetchAuthSession();
    const userMiddleName = currentSessionId.tokens.idToken.payload.middle_name;

    return userMiddleName;
  } catch (error) {
    console.log("Error fetching user middle name:", error);
  }
};

const getUserFamilyName = async () => {
  try {
    const currentSessionId = await fetchAuthSession();
    const userLastName = currentSessionId.tokens.idToken.payload.family_name;
    return userLastName;
  } catch (error) {
    console.log("Error fetching user last name:", error);
  }
};

const getUserGroup = async () => {
  try {
    const currentSessionId = await fetchAuthSession();
    const userGroups =
      currentSessionId.tokens.accessToken.payload["cognito:groups"];

    return userGroups[0];
  } catch (error) {
    console.log("Error fetching user groups:", error);
  }
};

const getUserObjectId = async () => {
  try {
    const group = await getUserGroup();
    const currentUserEmail = await getUserEmail();
    if (group === "PIC") {
      const picResponse = await generateClient().graphql({
        query: queries.listPersonInCharges,
        filter: {
          email: {
            eq: currentUserEmail,
          },
        },
        authMode: "userPool",
      });
      const picObject = picResponse.data.listPersonInCharges.items;
      const foundObject = picObject.find(
        (obj) => obj.email === currentUserEmail
      );
      if (foundObject) {
        return foundObject.id;
      } else {
        return null;
      }
    } else if (group === "PM") {
      const pmResponse = await generateClient().graphql({
        query: queries.listProjectManagers,
        filter: {
          email: {
            eq: currentUserEmail,
          },
        },
        authMode: "userPool",
      });
      const pmObject = pmResponse.data.listProjectManagers.items;

      const foundObject = pmObject.find(
        (obj) => obj.email === currentUserEmail
      );

      if (foundObject) {
        return foundObject.id;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log("Error fetching user object id:", error);
  }
};

const getUserStatus = async () => {
  try {
    const group = await getUserGroup();

    const currentUserObjectId = await getUserObjectId();
    if (group === "PIC") {
      const picResponse = await generateClient().graphql({
        query: queries.getPersonInCharge,
        variables: {
          id: currentUserObjectId,
        },
        authMode: "userPool",
      });

      const picObject = picResponse.data.getPersonInCharge;

      if (picObject) {
        return picObject.is_active;
      } else {
        console.log("User Not found");
        return null;
      }
    } else if (group === "PM") {
      const pmResponse = await generateClient().graphql({
        query: queries.getProjectManager,
        variables: {
          id: currentUserObjectId,
        },
        authMode: "userPool",
      });
      const pmObject = pmResponse.data.getProjectManager;

      if (pmObject) {
        return pmObject.is_active;
      } else {
        console.log("User Not found");
        return null;
      }
    }
  } catch (error) {
    console.log("Error fetching user status:", error);
  }
};

const getObjectSchemaAttributes = async () => {
  const group = await getUserGroup();
  const currentUserObjectId = await getUserObjectId();
  if (group === "PIC") {
    const picResponse = await generateClient().graphql({
      query: queries.getPersonInCharge,
      variables: {
        id: currentUserObjectId,
      },
      authMode: "userPool",
    });
    const picObject = picResponse.data.getPersonInCharge;
    return picObject;
  } else if (group === "PM") {
    const pmResponse = await generateClient().graphql({
      query: queries.getProjectManager,
      variables: {
        id: currentUserObjectId,
      },
      authMode: "userPool",
    });
    const pmObject = pmResponse.data.getProjectManager;
    return pmObject;
  }
};

const getCurrentUserDetails = {
  getUserAttributesAll,
  getUserEmail,
  getUserGivenName,
  getUserMiddleName,
  getUserFamilyName,
  getUserGroup,
  getUserStatus,
  getUserObjectId,
  getObjectSchemaAttributes,
};

export default getCurrentUserDetails;
