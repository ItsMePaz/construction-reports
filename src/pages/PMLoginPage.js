import React, { useEffect } from "react";
import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import LoginPage from "../views/Pages/LoginPage";

const PMLoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submit, setSubmit] = React.useState(false);

  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  async function loginIn({ username, password }) {
    try {
      const user = await signIn({ username, password });

      const currentSessionId = await fetchAuthSession();
      const role = currentSessionId.tokens.idToken.payload.preferred_username;
      if (!role) {
        alert("You are not authorized to access this page");
        handleSignOut();
      } else if (role === "PIC") {
        alert(
          "You are logging in with a PIC account and this page is for PMs only. Please go to PIC Login page"
        );
        handleSignOut();
      } else {
        navigate("/pm/dashboard");
      }

      console.log(user);
      console.log("successully signed in");
    } catch (error) {
      alert(error.message);
    }
  }

  const onSubmit = (submission) => {
    const username = submission.data.email;
    const password = submission.data.password;
    loginIn({ username, password });
  };

  useEffect(() => {
    if (!window.localStorage === false) {
      window.localStorage.clear();
    }
  }, []);

  useEffect(() => {
    if (submit === true) {
      onSubmit({ data: { email: email, password: password } });
      setSubmit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  return (
    <div>
      <LoginPage
        title="PM Login"
        setEmail={setEmail}
        setPassword={setPassword}
        setSubmit={setSubmit}
      />
    </div>
  );
};

export default PMLoginPage;
