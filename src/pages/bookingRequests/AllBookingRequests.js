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
} from "firebase/firestore";
import UsersCard from "../../components/users/UsersCard";
import { Link } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import NavBar from "../../components/NavBar";
import TopHeader from "../../components/TopHeader";
function AllBookingRequests(props) {
  const [bookingRequests, setbookingRequests] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const bookingRequestsRef = collection(db, "bookings");
    //Create a query against the collection.
    const q = query(
      bookingRequestsRef,
      // where("state", "==", "CA"),
      orderBy("timeStamp")
      //   limit(10)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      let bookingRequests = [];
      console.log(doc.size);

      doc.forEach((doc) => {
        bookingRequests.push(doc.data());
      });
      setbookingRequests(bookingRequests);
      console.log(querySnapshot);
    });
  }, []);
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
                  </div>
                  <div className="card-body table-responsive p-0">
                    <table className="table table-hover text-nowrap">
                      <thead>
                        <tr>
                          <th>User Email</th>
                          <th>Workspace Name</th>
                          <th>Workspace Type</th>
                          <th>Specification</th>
                          <th>Facilities</th>
                          <th>Additional Facilities</th>
                          <th>Special Requests</th>
                          <th>Status</th>
                          <th>isSingleDay</th>
                          <th>From Date</th>
                          <th>To Date</th>
                          <th>From Time</th>
                          <th>To Time</th>
                          {/* <th>Actions</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {bookingRequests ? (
                          bookingRequests.map((bookingRequest, index) => {
                            return (
                              <tr>
                                <td>{bookingRequest.clientEmail}</td>
                                <td>{bookingRequest.spaceId}</td>
                                <td>{bookingRequest.type}</td>
                                <td>{bookingRequest.spec}</td>
                                <td>{bookingRequest.facilities.join(", ")}</td>
                                <td>
                                  {bookingRequest.additionalFacilities.join(
                                    ", "
                                  )}
                                </td>
                                <td>
                                  {bookingRequest.specialRequests ||
                                    "No requests"}
                                </td>
                                <td>{bookingRequest.status}</td>
                                <td>
                                  {bookingRequest.isSingleDay
                                    ? "Single Day"
                                    : "Multiple Day"}
                                </td>
                                <td>
                                  {bookingRequest.fromDate
                                    .toDate()
                                    .toDateString()}
                                </td>
                                <td>
                                  {bookingRequest.toDate
                                    .toDate()
                                    .toDateString()}
                                </td>
                                <td>{bookingRequest.fromTime}</td>
                                <td>{bookingRequest.toTime}</td>
                                {/* <td>
                                <div className="text-center">
                                  <a
                                    href="#"
                                    className="btn btn-sm btn-primary"
                                  >
                                    Edit
                                  </a>
                                  &nbsp;
                                  <a href="#" className="btn btn-sm btn-danger">
                                    Delete
                                  </a>
                                </div>
                              </td> */}
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

export default AllBookingRequests;
