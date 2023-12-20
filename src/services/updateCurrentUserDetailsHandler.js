import getCurrentUserDetails from "./getCurrentUserDetails";
import { updatePassword } from "aws-amplify/auth";
import { updateUserAttributes } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";

const updateUserGivenName = async (newUserGivenName) => {
  try {
    const id = await getCurrentUserDetails.getUserObjectId();
    const group = await getCurrentUserDetails.getUserGroup();
    //Updates user attributes in cognito
    await updateUserAttributes({
      userAttributes: {
        given_name: newUserGivenName,
      },
    });

    if (group === "PIC") {
      //Updates user attributes in DynamoDB
      await generateClient().graphql({
        query: mutations.updatePersonInCharge,
        variables: {
          input: {
            id: id,
            given_name: newUserGivenName,
          },
        },
        authMode: "userPool",
      });
      alert("Successfully updated given name");
    } else if (group === "PM") {
      //Updates user attributes in DynamoDB
      await generateClient().graphql({
        query: mutations.updateProjectManager,
        variables: {
          input: {
            id: id,
            given_name: newUserGivenName,
          },
        },
        authMode: "userPool",
      });
      alert("Successfully updated given name");
    }
  } catch (error) {
    alert(error.message);
  }
};

const updateUserMiddleName = async (newUserMiddleName) => {
  try {
    const id = await getCurrentUserDetails.getUserObjectId();
    const group = await getCurrentUserDetails.getUserGroup();

    //Updates user attributes in cognito
    await updateUserAttributes({
      userAttributes: {
        middle_name: newUserMiddleName,
      },
    });

    if (group === "PIC") {
      //Updates user attributes in DynamoDB
      await generateClient().graphql({
        query: mutations.updatePersonInCharge,
        variables: {
          input: {
            id: id,
            middle_name: newUserMiddleName,
          },
        },
        authMode: "userPool",
      });
      alert("Successfully updated middle name");
    } else if (group === "PM") {
      //Updates user attributes in DynamoDB
      await generateClient().graphql({
        query: mutations.updateProjectManager,
        variables: {
          input: {
            id: id,
            middle_name: newUserMiddleName,
          },
        },
        authMode: "userPool",
      });
      alert("Successfully updated middle name");
    }
  } catch (error) {
    alert(error.message);
  }
};

const updateUserFamilyName = async (newUserFamilyName) => {
  try {
    const id = await getCurrentUserDetails.getUserObjectId();
    const group = await getCurrentUserDetails.getUserGroup();
    //Updates user attributes in cognito
    await updateUserAttributes({
      userAttributes: {
        family_name: newUserFamilyName,
      },
    });

    if (group === "PIC") {
      //Updates user attributes in DynamoDB
      await generateClient().graphql({
        query: mutations.updatePersonInCharge,
        variables: {
          input: {
            id: id,
            last_name: newUserFamilyName,
          },
        },
        authMode: "userPool",
      });
      alert("Successfully updated family name");
    } else if (group === "PM") {
      //Updates user attributes in DynamoDB
      await generateClient().graphql({
        query: mutations.updateProjectManager,
        variables: {
          input: {
            id: id,
            last_name: newUserFamilyName,
          },
        },
        authMode: "userPool",
      });
      alert("Successfully updated family name");
    }
  } catch (error) {
    alert(error.message);
  }
};

const updateCurrentUserPassword = async (oldPassword, newPassword) => {
  try {
    await updatePassword({ oldPassword, newPassword });
    alert("Successfully changed password");
  } catch (err) {
    alert(err.message);
  }
};

const updateCurrentUserDetailsHandler = {
  updateCurrentUserPassword,
  updateUserGivenName,
  updateUserMiddleName,
  updateUserFamilyName,
};

export default updateCurrentUserDetailsHandler;
