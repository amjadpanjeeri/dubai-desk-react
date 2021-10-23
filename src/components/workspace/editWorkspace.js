import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  setDoc,
  FieldValue,
  doc,
  getDoc,
} from "firebase/firestore";
import TopHeader from "../TopHeader";
import SideBar from "../Sidebar";
import { getAuth, signOut } from "firebase/auth";

export default function EditWorkspace(props) {
  const auth = getAuth();
  const [addedby, setaddedby] = useState("");
  const [additionalFacilities, setadditionalFacilities] = useState("");
  const [address, setaddress] = useState("");
  const [description, setdescription] = useState("");
  const [lastUpdated, setlastUpdated] = useState("");
  const [weekfrom, setweekfrom] = useState("");
  const [weekto, setweekto] = useState("");
  const [endfrom, setendfrom] = useState("");
  const [endto, setendto] = useState("");
  const [time, settime] = useState("");
  const [workspace, setworkspace] = useState("");
  const [name, setname] = useState("");
  const [photoUrl, setphotoUrl] = useState("");
  const [owner, setowner] = useState("");
  const [workspaceObject, setworkspaceObject] = useState("");

  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "workspace", props.match.params.id); //id from url params
    const docSnap = getDoc(docRef);

    docSnap.then((docSnap) => {
      if (docSnap.data()) {
        // console.log("Document data:", docSnap.data());
        setworkspaceObject(docSnap.data());
        setaddedby(docSnap.data().addedby);
        setadditionalFacilities(docSnap.data().additionalFacilities);
        setaddress(docSnap.data().address);
        setdescription(docSnap.data().description);
        settime(docSnap.data().time);
        setlastUpdated(docSnap.data().lastUpdated);
        setname(docSnap.data().name);
        setowner(docSnap.data().ownerId);
        setphotoUrl(docSnap.data().photoUrl);
        setworkspace(docSnap.data().workspaceType);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
    // console.log(docSnap);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("auth.currentUser.email");
    const db = getFirestore();
    console.log(props.match.params.id);
    const editingWorkspace = doc(db, "workspace", props.match.params.id);
    // console.log(editingWorkspace);
    const docRef = setDoc(
      editingWorkspace,
      {
        lastUpdated: new Date(),
        addedby: auth.currentUser.email,
        additionalFacilities: "",
        owner: owner,
        address: address,
        time: {
          "mo-from": weekfrom,
          "mo-to": weekto,
          "fr-from": endfrom,
          "fr-to": endto,
        },
        workspaceType: workspace,
        name: name || "No Name",
        photoUrl: photoUrl,
      },
      { merge: true }
    );
    console.log(docRef);
    docRef
      .then(function (docRef) {
        alert("Success");
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
        <TopHeader headerValue="Edit workspace" />
        <section className="content">
          <div className="card card-primary col-md-8">
            <div className="card-header">
              <h3 className="card-title">Edit Workspace</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="name">Workspace Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Workspace name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    // required
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="workspace-address">Workspace Address</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    id="workspace-address"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    // required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Workspace Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    // required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="workspace-type">Workspace Type</label>
                  <select
                    className="form-control"
                    id="workspace-type"
                    value={workspace}
                    onChange={(e) => setworkspace(e.target.value)}
                    // required
                  >
                    <option>Conference Hall</option>
                    <option>Meeting Room</option>
                    <option>Office Space</option>
                    <option>Coworking Space</option>
                    <option>Virtual Office</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="workspace-type">Workspace Facilities</label>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox"></input>
                    <label className="form-check-label">WiFi</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox"></input>
                    <label className="form-check-label">Electricity</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox"></input>
                    <label className="form-check-label">Food</label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="owner-name">Owner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="owner-name"
                    placeholder="Enter name"
                    value={owner}
                    onChange={(e) => setowner(e.target.value)}
                  ></input>
                </div>
                <div className="bootstrap-timepicker">
                  <div className="form-group">
                    <label htmlFor="open-time">Opening Time (WeekDays)</label>

                    <div
                      className="input-group date"
                      id="timepicker"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        data-target="#timepicker"
                        id="weekdays-opening"
                        value={time["mo-from"]}
                        onChange={(e) => setweekfrom(e.target.value)}
                        // required
                      />
                      <div
                        className="input-group-append"
                        data-target="#timepicker"
                        data-toggle="datetimepicker"
                      >
                        <div className="input-group-text">
                          <i className="far fa-clock"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bootstrap-timepicker">
                  <div className="form-group">
                    <label htmlFor="open-time">Closing Time (WeekDays)</label>

                    <div
                      className="input-group date"
                      id="timepicker"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        data-target="#timepicker"
                        id="weekdays-closing"
                        value={time["mo-to"]}
                        onChange={(e) => setweekto(e.target.value)}
                        // required
                      />
                      <div
                        className="input-group-append"
                        data-target="#timepicker"
                        data-toggle="datetimepicker"
                      >
                        <div className="input-group-text">
                          <i className="far fa-clock"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bootstrap-timepicker">
                  <div className="form-group">
                    <label htmlFor="open-time">Opening Time (Weekend)</label>

                    <div
                      className="input-group date"
                      id="timepicker"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        data-target="#timepicker"
                        id="weekend-opening"
                        value={time["fr-from"]}
                        onChange={(e) => setendfrom(e.target.value)}
                        // required
                      />
                      <div
                        className="input-group-append"
                        data-target="#timepicker"
                        data-toggle="datetimepicker"
                      >
                        <div className="input-group-text">
                          <i className="far fa-clock"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bootstrap-timepicker">
                  <div className="form-group">
                    <label htmlFor="open-time">Closing Time (Weekend)</label>

                    <div
                      className="input-group date"
                      id="timepicker"
                      data-target-input="nearest"
                    >
                      <input
                        type="text"
                        className="form-control datetimepicker-input"
                        data-target="#timepicker"
                        id="weekend-closing"
                        value={time["mo-to"]}
                        onChange={(e) => setendto(e.target.value)}
                        // required
                      />
                      <div
                        className="input-group-append"
                        data-target="#timepicker"
                        data-toggle="datetimepicker"
                      >
                        <div className="input-group-text">
                          <i className="far fa-clock"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputFile">Workspace Image</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="workspace-image"
                      ></input>
                      <label
                        className="custom-file-label"
                        htmlFor="workspace-image"
                      >
                        Choose file
                      </label>
                    </div>
                    <div className="input-group-append">
                      <span className="input-group-text">Upload</span>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-success">Update Workspace</button>
            </form>
          </div>

          {/* <button className="btn btn-success">Submit</button> */}
          {/* </form> */}
        </section>
      </div>
    </div>
  );
}
