/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import TopHeader from "../TopHeader";
import SideBar from "../Sidebar";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
export default function EditWorkspacePrice(props) {
  const storage = getStorage();
  const firebaseApp = getApp();
  const auth = getAuth();
  const [businessMeetingPerDay, setbusinessMeetingPerDay] = useState("");
  const [businessMeetingPerHour, setbusinessMeetingPerHour] = useState("");
  const [conferencePerDay, setconferencePerDay] = useState("");
  const [conferencePerHour, setconferencePerHour] = useState("");
  const [productLaunchPerDay, setproductLaunchPerDay] = useState("");
  const [productLaunchPerHour, setproductLaunchPerHour] = useState("");
  const [meetingRoomPerDay, setmeetingRoomPerDay] = useState("");
  const [meetingRoomPerHour, setmeetingRoomPerHour] = useState("");
  const [_20sqftPerDay, set_20sqftPerDay] = useState("");
  const [_20sqftPerHour, set_20sqftPerHour] = useState("");
  const [_100sqftPerDay, set_100sqftPerDay] = useState("");
  const [_100sqftPerHour, set_100sqftPerHour] = useState("");
  const [_500sqftPerDay, set_500sqftPerDay] = useState("");
  const [_500sqftPerHour, set_500sqftPerHour] = useState("");
  const [oneCompanyPerDay, setoneCompanyPerDay] = useState("");
  const [oneCompanyPerHour, setoneCompanyPerHour] = useState("");
  const [multipleCompanyPerDay, setmultipleCompanyPerDay] = useState("");
  const [multipleCompanyPerHour, setmultipleCompanyPerHour] = useState("");
  
  useEffect((e) => {
    const db = getFirestore();
    const docRef = doc(db, "workspace", props.match.params.id); //id from url params
    const docSnap = getDoc(docRef);

    docSnap.then((docSnap) => {
      if (docSnap.data()) {
        // console.log("Document data:", docSnap.data());
        setbusinessMeetingPerDay(
          docSnap.data().price["Business Meeting"].PerDay
        );
        setbusinessMeetingPerHour(
          docSnap.data().price["Business Meeting"].PerHour
        );
        setconferencePerDay(docSnap.data().price["Conference/Seminar"].PerDay);
        setconferencePerHour(
          docSnap.data().price["Conference/Seminar"].PerHour
        );
        setproductLaunchPerDay(docSnap.data().price["Product Launch"].PerDay);
        setproductLaunchPerHour(docSnap.data().price["Product Launch"].PerHour);
        setmeetingRoomPerDay(docSnap.data().price["Meeting Room"].PerDay);
        setmeetingRoomPerHour(docSnap.data().price["Meeting Room"].PerHour);
        set_20sqftPerDay(docSnap.data().price["20 sqft"].PerDay);
        set_20sqftPerHour(docSnap.data().price["20 sqft"].PerHour);
        set_100sqftPerDay(docSnap.data().price["100 sqft"].PerDay);
        set_100sqftPerHour(docSnap.data().price["100 sqft"].PerHour);
        set_500sqftPerDay(docSnap.data().price["500 sqft"].PerDay);
        set_500sqftPerHour(docSnap.data().price["500 sqft"].PerHour);
        setoneCompanyPerDay(docSnap.data().price["One Company"].PerDay);
        setoneCompanyPerHour(docSnap.data().price["One Company"].PerHour);
        setmultipleCompanyPerDay(
          docSnap.data().price["Multiple Company"].PerDay
        );
        setmultipleCompanyPerHour(
          docSnap.data().price["Multiple Company"].PerHour
        );
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    // console.log(docSnap);
  });

  function handleBusinessMeetingPerDay(e) {
    setbusinessMeetingPerDay(e.currentTarget.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const db = getFirestore();
    const editingWorkspace = doc(db, "workspace", props.match.params.id);
    const docRef = setDoc(
      editingWorkspace,
      {
        price: {
          "100 sqft": {
            PerDay: _100sqftPerDay,
            PerHour: _100sqftPerHour,
          },
          "500 sqft": {
            PerDay: _500sqftPerDay,
            PerHour: _500sqftPerHour,
          },
          "20 sqft": {
            PerDay: _20sqftPerDay,
            PerHour: _20sqftPerHour,
          },
          "Conference/Seminar": {
            PerDay: conferencePerDay,
            PerHour: conferencePerHour,
          },
          "Meeting Room": {
            PerDay: meetingRoomPerDay,
            PerHour: meetingRoomPerHour,
          },
          "Multiple Company": {
            PerDay: multipleCompanyPerDay,
            PerHour: multipleCompanyPerHour,
          },
          "One Company": {
            PerDay: oneCompanyPerDay,
            PerHour: oneCompanyPerHour,
          },
          "Product Launch": {
            PerDay: productLaunchPerDay,
            PerHour: productLaunchPerHour,
          },
          "Business Meeting": {
            PerDay: businessMeetingPerDay,
            PerHour: businessMeetingPerHour,
          },
        },
      },
      { merge: true }
    );
    console.log(docRef);
    docRef
      .then(function (docRef) {
        alert("Price edited Successfully");
      })
      .catch(function (error) {
        console.error("Error adding workspace: ", error);
        alert(`Error adding workspace: ${error}`);
      });
  };

  return (
    <div>
      <SideBar />
      <div className="content-wrapper">
        <TopHeader headerValue="Edit workspace price" />
        <section className="content">
          <div className="card card-primary col-md-8">
            <div className="card-header">
              <h3 className="card-title">Edit Workspace price</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div>
                  <h4>Conference Hall</h4>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Business Meeting(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={businessMeetingPerDay}
                          onChange={handleBusinessMeetingPerDay}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Business Meeting(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          // defaultValue={businessMeetingPerHour}
                          value={businessMeetingPerHour}
                          onChange={(e) =>
                            setbusinessMeetingPerHour(e.currentTarget.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Conference/Seminar(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={conferencePerDay}
                          onChange={(e) => setconferencePerDay(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Conference/Seminar(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={conferencePerHour}
                          onChange={(e) => setconferencePerHour(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Product Launch(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={productLaunchPerDay}
                          onChange={(e) =>
                            setproductLaunchPerDay(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Product Launch(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={productLaunchPerHour}
                          onChange={(e) =>
                            setproductLaunchPerHour(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div>
                  <h4>Meeting Room</h4>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Per Day</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={meetingRoomPerDay}
                          onChange={(e) => setmeetingRoomPerDay(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Per Hour</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={meetingRoomPerHour}
                          onChange={(e) =>
                            setmeetingRoomPerHour(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>

                <div>
                  <h4>Office Space</h4>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>20 sq.ft(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={_20sqftPerDay}
                          onChange={(e) => set_20sqftPerDay(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>20 sq.ft(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={_20sqftPerHour}
                          onChange={(e) => set_20sqftPerHour(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>100 sq.ft(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={_100sqftPerDay}
                          onChange={(e) => set_100sqftPerDay(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>100 sq.ft(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={_100sqftPerHour}
                          onChange={(e) => set_100sqftPerHour(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>500 sq.ft(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={_500sqftPerDay}
                          onChange={(e) => set_500sqftPerDay(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>500 sq.ft(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={_500sqftPerHour}
                          onChange={(e) => set_500sqftPerHour(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div>
                  <h4>Coworking</h4>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>One Company(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={oneCompanyPerDay}
                          onChange={(e) => setoneCompanyPerDay(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>One Company(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={oneCompanyPerHour}
                          onChange={(e) => setoneCompanyPerHour(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Multiple Companies(Per Day)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={multipleCompanyPerDay}
                          onChange={(e) =>
                            setmultipleCompanyPerDay(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>Multiple Companies(Per Hour)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Price"
                          value={multipleCompanyPerHour}
                          onChange={(e) =>
                            setmultipleCompanyPerHour(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer justify-content-right">
                  <button className="btn btn-success">Update Price</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
