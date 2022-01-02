/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import firebaseConfig from "./firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/auth/LoginPage";
import AllUsers from "./pages/user/AllUsers";
import ManageUser from "./components/users/ManageUser";
import NewUser from "./components/users/NewUser";
import AccessDenied from "./pages/auth/AccessDenied";
import AllWorkspaces from "./pages/workspace/Allworkspaces";
import AllBookingRequests from "./pages/bookingRequests/AllBookingRequests";
import NewWorkspace from "./components/workspace/newWorkspace";
import EditWorkspace from "./components/workspace/editWorkspace";
import EditWorkspacePrice from "./components/workspace_price/editPrice";
import AllRequests from "./pages/Ejarirequests/AllEjariRequests";
import AllEjariRequests from "./pages/Ejarirequests/AllEjariRequests";
import AllVirtualSpaceRequests from "./pages/VirtualSpaceRequest/Allvirtualrequests";
import AllWorkspaceRequests from "./pages/workspaceRequest/AllworkspaceRequest";

export default function App(props) {
  const [currentUser, setcurretUser] = useState(null);
  const auth = getAuth();
  //run only once whn app is intialized
  useEffect(() => {
    initializeApp(firebaseConfig);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // alert(`Welcome ${user.email}`);
        const uid = user.uid;
        setcurretUser(user);
        // ...
      } else {
        setcurretUser(null);
      }
    });
  }, [auth, currentUser]);

  initializeApp(firebaseConfig);
  return (
    <div>
      <Router>
        <div>
          <NavBar currentUser={currentUser} />
          <Switch>
            {currentUser ? (
              <div>
                <Route exact path="/" component={Dashboard} />

                <Route exact path="/login" component={LoginPage} />

                <Route exact path="/registered-users" component={AllUsers} />
                <Route exact path="/workspaces" component={AllWorkspaces} />
                <Route
                  exact
                  path="/ejari-requests"
                  component={AllEjariRequests}
                />
                <Route
                  exact
                  path="/virtual-office-requests"
                  component={AllVirtualSpaceRequests}
                />
                <Route
                  exact
                  path="/workspace-requests"
                  component={AllWorkspaceRequests}
                />
                <Route
                  exact
                  path="/booking-requests"
                  component={AllBookingRequests}
                />

                <Route exact path="/create-user" component={NewUser} />
                <Route
                  exact
                  path="/create-workspace"
                  component={NewWorkspace}
                />

                <Route exact path="/users/:id" component={ManageUser} />
                <Route exact path="/workspace/:id" component={EditWorkspace} />
                <Route exact path="/workspace_price/:id" component={EditWorkspacePrice} />
              </div>
            ) : (
              <div>
                <Route exact path="/" component={AccessDenied} />
                <Route exact path="/login" component={LoginPage} />
              </div>
            )}
          </Switch>
        </div>
      </Router>
    </div>
  );
}
