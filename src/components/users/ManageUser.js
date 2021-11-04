/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  getFirestore,
  collection,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import SideBar from "../Sidebar";
import TopHeader from "../TopHeader";

export default function ManageUser(props) {
  const [user, setuser] = useState([]);
  const [createdTime, setcreatedTime] = useState("");
  const [dob, setdob] = useState("");
  const [email, setemail] = useState("");
  const [loginMethod, setloginMethod] = useState("");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [profilePic, setprofilePic] = useState("");

  // useEffect(()/
  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "users", props.match.params.id); //id from url params
    const docSnap = getDoc(docRef);

    docSnap.then((docSnap) => {
      if (docSnap.data()) {
        console.log("Document data:", docSnap.data());
        setuser(docSnap.data());
        setcreatedTime(docSnap.data().createdTime);
        setdob(docSnap.data().dob);
        setemail(docSnap.data().email);
        setloginMethod(docSnap.data().loginMethod);
        setname(docSnap.data().name);
        setphone(docSnap.data().phone);
        setprofilePic(docSnap.data().profilePic);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    // console.log(docSnap);
  },);

  const handleSubmit = (event) => {
    const db = getFirestore();
    const users = doc(db, "users", props.match.params.id);

    const docRef = setDoc(
      users,
      {
        dob: dob,
        email: email,
        name: name || "No Name",
        phone: phone,
      },
      { merge: true }
    );
    docRef
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    event.preventDefault();
  };

  // const handleDelete = (event) => {
  //   let confirm = window.confirm("Are you sure you want to delete this user?");
  //   if (confirm) {
  //     const db = getFirestore();
  //     const users = doc(db, "users", props.match.params.id);
  //     deleteDoc(users)
  //       .then(function () {
  //         alert("User deleted successfully");
  //       })
  //       .catch(function (error) {
  //         alert("Error deleting user");
  //       });
  //   } else {
  //   }
  // };
  return (
    <div>
      <SideBar />
      <div className="content-wrapper">
        <TopHeader headerValue="Edit User" />
        <section className="content">
          <div className="card card-primary col-md-8">
            <div className="card-header">
              <h3 className="card-title">Edit user</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div class="card-body">
                <div class="form-group">
                  <label for="user-name">User Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="user-name"
                    placeholder="Enter User name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    required
                  ></input>
                </div>
                <div class="form-group">
                  <label for="user-email">User Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="user-email"
                    placeholder="Enter User email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  ></input>
                </div>
                <div class="form-group">
                  <label>Date Of Birth</label>
                  <div
                    class="input-group date"
                    id="reservationdate"
                    data-target-input="nearest"
                  >
                    <input
                      type="text"
                      class="form-control datetimepicker-input"
                      data-target="#reservationdate"
                      value={dob}
                      onChange={(e) => setdob(e.target.value)}
                      required
                    />
                    <div
                      class="input-group-append"
                      data-target="#reservationdate"
                      data-toggle="datetimepicker"
                    >
                      <div class="input-group-text">
                        <i class="fa fa-calendar"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="user-phone">Phone Number</label>
                  <input
                    // type="text"
                    class="form-control"
                    id="user-dob"
                    placeholder="Enter Phone Number"
                    type="tel"
                    value={phone}
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    onChange={(e) => setphone(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <button class="btn ml-auto btn-success">Update User</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
