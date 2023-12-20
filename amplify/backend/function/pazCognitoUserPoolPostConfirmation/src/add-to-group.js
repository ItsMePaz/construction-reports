const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  const groupName =
    event.request.userAttributes.preferred_username === "PM"
      ? "PM"
      : process.env.GROUP;

  const groupParams = {
    GroupName: groupName,
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: groupName,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  try {
    // Check if the group exists; if it doesn't, create it.
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
  } catch (e) {
    // Group doesn't exist; create it.
    await cognitoIdentityServiceProvider.send(
      new CreateGroupCommand(groupParams)
    );
  }

  // Add the user to the group.
  await cognitoIdentityServiceProvider.send(
    new AdminAddUserToGroupCommand(addUserParams)
  );

  return event;
};
