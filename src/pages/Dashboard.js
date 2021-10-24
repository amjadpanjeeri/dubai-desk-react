import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import TopHeader from "../components/TopHeader";

export default function Dashboard() {
  const [userscount, setuserscount] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "users");
    const q = query(
      usersRef
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      setuserscount(doc.size);
      //   setuserscount(userscount);
      console.log(userscount);
    });
  }, []);


  const [workspaceCount, setworkspaceCount] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "workspace");
    const q = query(
      usersRef
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      setworkspaceCount(doc.size);
      console.log(workspaceCount);
    });
  }, []);


  const [bookingRequestCount, setbookingRequestCount] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const usersRef = collection(db, "bookings");
    const q = query(
      usersRef
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      setbookingRequestCount(doc.size);
      console.log(bookingRequestCount);
    });
  }, []);



  return (
    <div>
      <SideBar />

      <div className="content-wrapper">
        {/* <TopHeader headerValue="Dashboard" /> */}
        <TopHeader headerValue="Dashboard" />

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{userscount}</h3>

                    <p>Registered Users</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person"></i>
                  </div>
                  <a href="/registered-users" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>
                      {bookingRequestCount}
                    </h3>

                    <p>Total Bookings</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars"></i>
                  </div>
                  <a href="/booking-requests" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{workspaceCount}</h3>

                    <p>Workspaces</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-laptop"></i>
                  </div>
                  <a href="/workspaces" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
