/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  doc,
  deleteDoc
} from "firebase/firestore";
import UsersCard from "../../components/users/UsersCard";
import { Link } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import TopHeader from "../../components/TopHeader";

export default function AllUsers() {
  const [users, setusers] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    //Create a query against the collection.
    const q = query(
      usersRef,
      // where("state", "==", "CA"),
      orderBy("createdTime")
      //   limit(10)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      let users = [];
      doc.forEach((doc) => {
        users.push(doc.data());
      });
      setusers(users);
      console.log(users);
    });
  }, []);


  const handleDelete = (uid) => {
    let confirm = window.confirm("Are you sure you want to delete this uid?");
    console.log(confirm);
    if (confirm) {
      const db = getFirestore();
      console.log(uid);
      const deletedUser = doc(db, "users", uid);
      deleteDoc(deletedUser)
        .then(function () {
          alert("User deleted successfully");
        })
        .catch(function (error) {
          alert("Error deleting user");
        });
    } else {
    }
  };

  return (
    <div>
      <SideBar />
      <div className="content-wrapper">
        <TopHeader headerValue="Registered Users" />
        <section className="content">
          <div className="modal fade" id="modal-danger">
            <div className="modal-dialog">
              <div className="modal-content bg-danger">
                <div className="modal-header">
                  <h4 className="modal-title">Confirm Delete</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>
                    Do you really want to delete this user account? This action
                    cannot be undone&hellip;
                  </p>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-light"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-outline-light">
                    Confirm Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Registered Users</h3>
                    <button className="btn btn-sm btn-success float-right">
                      <Link to={`/create-user`} className="text-white ">
                        Create User
                      </Link>
                    </button>
                    <div className="card-tools">
                      <div
                        className="input-group input-group-sm"
                        style={{ width: "150px" }}
                      ></div>
                    </div>
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>User Name</th>
                          <th>Email</th>
                          <th>Date Of Birth</th>
                          <th>Phone</th>
                          <th>Created Time</th>
                          <th>Login Method</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {users ? (
                          <div>
                            {users.forEach((user, index) => {
                              return <UsersCard key={index} user={user} />;
                            })}
                          </div>
                        ) : (
                          <div>No Users</div>
                        )} */}
                        {users ? (
                          users.map((user, index) => {
                            return (
                              <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.dob}</td>
                                <td>{user.phone}</td>
                                <td>{user.createdTime.toDate().toDateString()}</td>
                                <td>{user.loginMethord}</td>
                                <td>
                                  <div className="text-center">
                                  <Link
                                      className="text-white"
                                      to={`/users/${user.uid}`}
                                    >
                                      <a
                                        className="btn btn-sm btn-primary text-white"
                                        // onClick={() => editWorkspace(workspace)}
                                      >
                                        Edit
                                      </a>
                                    </Link>
                                    &nbsp;
                                    <a
                                      onClick={() => handleDelete(user.uid)}
                                      className="btn btn-sm btn-danger"
                                    >
                                      Delete
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <div>No Users</div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
