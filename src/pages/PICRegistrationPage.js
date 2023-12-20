import { React, useState, useEffect } from "react";
import { signUp } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import * as mutations from "../graphql/mutations";
import RegisterPage from "../views/Pages/RegisterPage";

const PICRegistrationPage = () => {
  const [userName, setUserName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const navigate = useNavigate();

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  // Helper function to validate password
  const isValidPassword = (password) => {
    // Password must be at least 6 characters
    if (password.trim().length < 6) {
      return false;
    }

    // Password must include at least one capitalized letter, one symbol, and one number
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).*$/;
    return passwordRegex.test(password);
  };

  // Helper function to validate name
  const isValidName = (name) => /^[a-zA-Z ]+$/.test(name);
  const register = async (
    username,
    password,
    given_name,
    middle_name,
    family_name
  ) => {
    try {
      if (!isValidEmail(username)) {
        alert("Invalid email address");
        return;
      }

      if (!isValidPassword(password)) {
        alert(
          "Invalid password please ensure that your password is at least 6 characters long and contains at least one capitalized letter, one symbol, and one number"
        );

        return;
      }

      if (!isValidName(given_name)) {
        alert("Invalid given name");

        return;
      }

      if (!isValidName(middle_name)) {
        alert("Invalid middle name");

        return;
      }

      if (!isValidName(family_name)) {
        alert("Invalid family name");

        return;
      }
      const email = username;
      await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            given_name,
            middle_name,
            family_name,
            preferred_username: "PIC",
          },
        },
      });
      const client = generateClient();
      const newPIC = await client.graphql({
        query: mutations.createPersonInCharge,
        variables: {
          input: {
            email: username,
            given_name: given_name,
            last_name: family_name,
            middle_name: middle_name,
            is_active: true,
            profile_picture: "",
            preferred_username: "PIC",
          },
        },
      });

      if (newPIC.errors) {
        alert("Error in GraphQL mutation:", newPIC.errors);
      } else {
        console.log("GraphQL mutation successful:", newPIC.data);
      }
      navigate("/pic-registration-confirmation", { state: { email: email } });
    } catch (error) {
      alert(error.message);
    }
  };

  const onSubmit = (submission) => {
    register(
      submission.data.email,
      submission.data.password,
      submission.data.givenName,
      submission.data.middleName,
      submission.data.familyName
    );
  };

  useEffect(() => {
    if (isSubmit === true) {
      onSubmit({
        data: {
          email: userName,
          givenName: givenName,
          middleName: middleName,
          familyName: familyName,
          password: password,
        },
      });
      setIsSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmit]);

  return (
    <div>
      <RegisterPage
        setGivenName={setGivenName}
        setMiddleName={setMiddleName}
        setFamilyName={setFamilyName}
        setUserName={setUserName}
        setPassword={setPassword}
        setIsSubmit={setIsSubmit}
      />
    </div>
  );
};

export default PICRegistrationPage;
