import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export default function LoginPage(props) {
  const [user, setuser] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;
        setuser(user);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  if (user) {
    return <Redirect to="/" />;
  }
  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="">
            <b>Dubai</b>Desk
          </a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>

            <form onSubmit={handleSubmit} method="post">
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label for="email">Email</label>
    //     <input type="email" name="email" placeholder="Email" />
    //     <label for="password">Password</label>
    //     <input type="password" name="password" placeholder="Password" />
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
}
