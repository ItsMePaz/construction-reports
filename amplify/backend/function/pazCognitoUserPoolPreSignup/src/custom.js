/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  try {
    // Initialize event.response if it is undefined
    event.response = event.response || {};

    // Confirm the user if preferred_username is "PM"
    if (event.request.userAttributes.preferred_username === "PM") {
      event.response.autoConfirmUser = true;

      // Set the email as verified if it is in the request
      if (event.request.userAttributes.hasOwnProperty("email")) {
        event.response.autoVerifyEmail = true;
      }
    }

    // Return the modified event object
    console.log(event);
    context.succeed(event);
    return event;
  } catch (error) {
    // Log and handle any errors
    console.error("Error in Pre Sign-up trigger:", error);
    throw error; // Rethrow the error to propagate it
  }
};
