import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { signOut } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import * as queries from "../../graphql/queries";
import { fetchAuthSession } from "aws-amplify/auth";
import "../../App.css";

// react-bootstrap components
import { Collapse, Nav } from "react-bootstrap";
import s3DownloadImageHandler from "../../services/s3DownloadImageHandler";

function Sidebar({ routes, image, background, lastName, givenName }) {
  const [group, setGroup] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const navigate = useNavigate();
  const getUserAttributes = async () => {
    const currentSessionId = await fetchAuthSession();

    setGroup(currentSessionId.tokens.idToken.payload.preferred_username);
    setUserEmail(currentSessionId.tokens.idToken.payload.email);
  };

  const getProfilePictureURLOfPIC = async () => {
    try {
      const response = await generateClient().graphql({
        query: queries.listPersonInCharges,
        variables: {
          filter: {
            email: { eq: userEmail },
            /* is_active: { eq: true }, */
          },
        },
        authMode: "userPool",
      });
      const profileImgKey =
        response.data.listPersonInCharges.items[0].profile_picture;
      console.log("profileImgKey", profileImgKey);
      if (profileImgKey === "") {
        const profileUrlResponse = await s3DownloadImageHandler.getImageUrl(
          "photo/unavailable-profile-pic.jpg"
        );
        setProfilePictureURL(profileUrlResponse);
        console.log("Display PP", profileUrlResponse);
      } else {
        const profileUrlResponse = await s3DownloadImageHandler.getImageUrl(
          profileImgKey
        );
        setProfilePictureURL(profileUrlResponse);
      }
      console.log("Display PP", response);
    } catch (error) {}
  };

  const getProfilePictureURLOfPM = async () => {
    try {
      const response = await generateClient().graphql({
        query: queries.listProjectManagers,
        variables: {
          filter: {
            email: { eq: userEmail },
          },
        },
        authMode: "userPool",
      });
      console.log("RESPONSE", response);
      const profileImgKey =
        response.data.listProjectManagers.items[0].profile_picture;
      console.log("profileImgKey", response);
      if (profileImgKey === "") {
        const profileUrlResponse = await s3DownloadImageHandler.getImageUrl(
          "photo/unavailable-profile-pic.jpg"
        );
        setProfilePictureURL(profileUrlResponse);
        console.log("Display PP", profileUrlResponse);
      } else {
        const profileUrlResponse = await s3DownloadImageHandler.getImageUrl(
          profileImgKey
        );
        setProfilePictureURL(profileUrlResponse);
      }
      console.log("Display PP", response);
    } catch (error) {
      console.log("error fetching profile picture", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUserAttributes();
      if (group === "PIC") {
        await getProfilePictureURLOfPIC();
      } else {
        await getProfilePictureURLOfPM();
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the user collapse
  const [userCollapseState, setUserCollapseState] = React.useState(false);
  // this is for the rest of the collapses
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    setState(getCollapseStates(routes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes prop
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (const element of routes) {
      if (
        (element.collapse && getCollapseInitialState(element.views)) ||
        location.pathname === element.layout + element.path
      ) {
        return true;
      }
    }
    return false;
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        let st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <Nav.Item
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            as="li"
            key={prop.id}
          >
            <Nav.Link
              className={state[prop.state] ? "collapsed" : ""}
              data-toggle="collapse"
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, ...st });
              }}
              aria-expanded={state[prop.state]}
            >
              <i className={prop.icon}></i>
              <p>
                {prop.name} <b className="caret"></b>
              </p>
            </Nav.Link>
            <Collapse in={state[prop.state]}>
              <div>
                <Nav as="ul">{createLinks(prop.views)}</Nav>
              </div>
            </Collapse>
          </Nav.Item>
        );
      }
      return (
        <Nav.Item
          className={activeRoute(prop.layout + prop.path)}
          key={prop.id}
          as="li"
        >
          <Nav.Link to={prop.layout + prop.path} as={Link}>
            {prop.icon ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };
  return (
    <div className="sidebar" data-color={background} data-image={image}>
      <div className="sidebar-wrapper">
        <div className="logo">
          <a
            className="simple-text logo-mini"
            href="https://www.creative-tim.com"
          >
            <div className="logo-img">
              <img
                src={require("../../assets/img/logo.svg").default}
                alt="react-logo "
              />
            </div>
          </a>
          <a className="simple-text logo-normal" href="/">
            CM REPORTS
          </a>
        </div>
        <div className="user">
          <div className="photo">
            <img alt="..." src={profilePictureURL} />
          </div>
          <div className="info">
            <a
              className={userCollapseState ? "collapsed" : ""}
              data-toggle="collapse"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setUserCollapseState(!userCollapseState);
              }}
              aria-expanded={userCollapseState}
            >
              <span>
                {lastName}, {givenName}
                <b className="caret"></b>
              </span>
            </a>
            <Collapse id="collapseExample" in={userCollapseState}>
              <div>
                <Nav as="ul" className="mt-3">
                  <li>
                    <a
                      className="profile-dropdown"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="sidebar-mini">
                        <i className="fa fa-user" />
                      </span>
                      <span className="sidebar-normal">My Profile</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="profile-dropdown"
                      href={
                        group === "PIC"
                          ? "/pic/dashboard/edit-profile"
                          : "/pm/dashboard/edit-profile"
                      }
                    >
                      <span className="sidebar-mini">
                        <i className="fa fa-edit" />
                      </span>
                      <span className="sidebar-normal">Edit Profile</span>
                    </a>
                  </li>
                  {/*    <li>
                    <a
                      className="profile-dropdown"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="sidebar-mini">S</span>
                      <span className="sidebar-normal">Settings</span>
                    </a>
                  </li> */}
                  <li>
                    <a
                      className="profile-dropdown"
                      href="#pablo"
                      onClick={(e) => handleSignOut()}
                    >
                      <span className="sidebar-mini">
                        <i className="fa fa-sign-out" />
                      </span>
                      <span className="sidebar-normal">Logout</span>
                    </a>
                  </li>
                </Nav>
              </div>
            </Collapse>
          </div>
        </div>
        <Nav as="ul">{createLinks(routes)}</Nav>
      </div>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url('" + image + "')",
        }}
      ></div>
    </div>
  );
}

let linkPropTypes = {
  path: PropTypes.string,
  layout: PropTypes.string,
  name: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

Sidebar.defaultProps = {
  image: "",
  background: "black",
  routes: [],
};

Sidebar.propTypes = {
  image: PropTypes.string,
  givenName: PropTypes.string,
  lastName: PropTypes.string,
  background: PropTypes.oneOf([
    "black",
    "azure",
    "green",
    "orange",
    "red",
    "purple",
  ]),
  routes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        ...linkPropTypes,
        icon: PropTypes.string,
      }),
      PropTypes.shape({
        collapse: true,
        path: PropTypes.string,
        name: PropTypes.string,
        state: PropTypes.string,
        icon: PropTypes.string,
        views: PropTypes.shape({
          ...linkPropTypes,
          mini: PropTypes.string,
        }),
      }),
    ])
  ),
};

export default Sidebar;
