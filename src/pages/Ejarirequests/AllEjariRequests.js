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
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import UsersCard from "../../components/users/UsersCard";
import { Link } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import NavBar from "../../components/NavBar";
import TopHeader from "../../components/TopHeader";
function AllRequests(props) {
  const [requests, setrequests] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const requestsRef = collection(db, "addRequests");
    //Create a query against the collection.
    const q = query(
      requestsRef,
      // where("state", "==", "CA"),
      orderBy("time")
      //   limit(10)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      let requests = [];
      console.log(doc.size);

      doc.forEach((doc) => {
        requests.push(doc.data());
      });
      setrequests(requests);
      console.log(querySnapshot);
    });
  }, []);

  const handleAccept = (spaceId) => {
    console.log(spaceId);
    let confirm = window.confirm(
      "Are you sure you want to accept this request?"
    );
    console.log(confirm);

    if (confirm) {
      const db = getFirestore();
      const updateRequest = doc(db, "addRequests", spaceId);

      const docRef = setDoc(
        updateRequest,
        {
          status: "accepted",
        },
        { merge: true }
      );
      docRef
        .then(function () {
          alert("Request updated successfully");
        })
        .catch(function (error) {
          alert("Error updating request");
        });
    }
  };

  const handleReject = (spaceId) => {
    console.log(spaceId);
    let confirm = window.confirm(
      "Are you sure you want to reject this request?"
    );
    console.log(confirm);

    if (confirm) {
      const db = getFirestore();
      const updateRequest = doc(db, "addRequests", spaceId);

      const docRef = setDoc(
        updateRequest,
        {
          status: "rejected",
        },
        { merge: true }
      );
      docRef
        .then(function () {
          alert("Request updated successfully");
        })
        .catch(function (error) {
          alert("Error updating request");
        });
    }
  };

  return (
    <div>
      <SideBar />
      <div className="content-wrapper">
        <TopHeader headerValue="Booking Requests" />
        <section className="content">
          <div class="modal fade" id="modal-success">
            <div class="modal-dialog">
              <div class="modal-content bg-success">
                <div class="modal-header">
                  <h4 class="modal-title">Confirm Approval</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>
                    Do you really want to confirm this booking request? &hellip;
                  </p>
                </div>
                <div class="modal-footer justify-content-between">
                  <button
                    type="button"
                    class="btn btn-outline-light"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-outline-light">
                    Confirm Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="modal fade" id="modal-danger">
            <div class="modal-dialog">
              <div class="modal-content bg-danger">
                <div class="modal-header">
                  <h4 class="modal-title">Confirm Reject</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Do you really want to reject this request? &hellip;</p>
                </div>
                <div class="modal-footer justify-content-between">
                  <button
                    type="button"
                    class="btn btn-outline-light"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-outline-light">
                    Confirm Decline
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
                    <h3 className="card-title">Booking Requests</h3>
                    <div className="card-tools">
                      <div
                        className="input-group input-group-sm"
                        style={{ width: "150px" }}
                      ></div>
                    </div>
                    <div className="card-body table-responsive p-0">
                      <table className="table table-hover text-nowrap">
                        <thead>
                          <tr>
                            <th>User Id</th>
                            <th>Requeted Time</th>
                            <th>Type</th>
                            <th>Status</th>
                            {/* <th>Facilities</th>
                            <th>Additional Facilities</th>
                            <th>Special Requests</th>
                            <th>Status</th>
                            <th>isSingleDay</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>From Time</th>
                            <th>To Time</th> */}
                            {/* <th>Actions</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {requests ? (
                            requests.map((bookingRequest, index) => {
                              return (
                                <tr>
                                  <td>{bookingRequest.userId}</td>
                                  <td>
                                    {bookingRequest.time
                                      .toDate()
                                      .toDateString()}
                                  </td>
                                  <td>{bookingRequest.type}</td>
                                  <td>{bookingRequest.status}</td>
                                  <td>
                                    <div className="text-center">
                                      <a
                                        href="#"
                                        className="btn btn-sm btn-success"
                                        onClick={() =>
                                          handleAccept(bookingRequest.requestId)
                                        }
                                      >
                                        Accept
                                      </a>
                                      &nbsp;
                                      <a
                                        href="#"
                                        className="btn btn-sm btn-danger"
                                        onClick={() =>
                                          handleReject(bookingRequest.requestId)
                                        }
                                      >
                                        Reject
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
          </div>
        </section>
      </div>
    </div>
  );
}

export default AllRequests;
