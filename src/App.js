import React, { useEffect, useState } from "react";
import firebaseConfig from "./firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/auth/LoginPage";
import AllUsers from "./pages/user/AllUsers";
import ManageUser from "./components/users/ManageUser";
import NewUser from "./components/users/NewUser";
import AccessDenied from "./pages/auth/AccessDenied";
import NotFound from "./pages/NotFound";

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
  }, [currentUser]);

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

                <Route exact path="/users" component={AllUsers} />

                <Route exact path="/create-user" component={NewUser} />

                <Route exact path="/users/:id" component={ManageUser} />
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
