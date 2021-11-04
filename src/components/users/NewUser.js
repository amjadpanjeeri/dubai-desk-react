/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  FieldValue,
  doc,
} from "firebase/firestore";
import TopHeader from "../TopHeader";
import SideBar from "../Sidebar";

export default function NewUser() {
  const [createdTime, setcreatedTime] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [loginMethod, setloginMethod] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [profilePic, setprofilePic] = useState(
    "https://lh3.googleusercontent.com/a-/AOh14Gin9IobQ4O2GMxz3n8OA6y9rgebNXByl6xtvj-Xq-w=s96-c"
  );
  const [uid, setuid] = useState("");

  const handleSubmit = (event) => {
    const db = getFirestore();
    const users = doc(collection(db, "users"));
    const docRef = setDoc(users, {
      createdTime: new Date(),
      dob: dob,
      email: email,
      loginMethod: "Custom",
      name: name || "No Name",
      phone: phone,
      profilePic: profilePic,
      uid: users.id,
    });
    docRef
      .then(function (docRef) {
        alert("Success");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    event.preventDefault();
  };

  return (
    <div>
      <SideBar />
      <div className="content-wrapper">
        <TopHeader headerValue="Add New User" />
        <section className="content">
          <div className="card card-primary col-md-8">
            <div className="card-header">
              <h3 className="card-title">Add New Workspace</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div class="form-group">
                  <label for="Name">Name</label>
                  <input
                    type="text"
                    id="Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="email">E-Mail</label>
                  <input
                    type="email"
                    id="email"
                    class="form-control"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    class="form-control"
                    value={phone}
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={(e) => setphone(e.target.value)}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="inputMessage">DOB:</label>
                  <input
                    name="dob"
                    type="date"
                    value={dob}
                    class="form-control"
                    onChange={(e) => setdob(e.target.value)}
                    required
                  />{" "}
                </div>
                <div className="modal-footer justify-content-right">
                  <button className="btn btn-success">Create User</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
