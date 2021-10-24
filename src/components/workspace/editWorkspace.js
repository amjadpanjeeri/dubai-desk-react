import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import TopHeader from "../TopHeader";
import SideBar from "../Sidebar";
import { getAuth } from "firebase/auth";
import { dropzone } from "react-dropzone";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getApp } from "firebase/app";

// import * as firebase from "firebase/app";
// import * as storage from "firebase/storage";
// import {TaskEvent} from "firebase/storage";

export default function EditWorkspace(props) {
  const storage = getStorage();
  const firebaseApp = getApp();
  const auth = getAuth();
  const [addedby, setaddedby] = useState("");
  const [additionalFacilities, setadditionalFacilities] = useState([]);
  const [address, setaddress] = useState("");
  const [description, setdescription] = useState("");
  const [lastUpdated, setlastUpdated] = useState("");
  const [weekfrom, setweekfrom] = useState("");
  const [weekto, setweekto] = useState("");
  const [endfrom, setendfrom] = useState("");
  const [endto, setendto] = useState("");
  const [workspace, setworkspace] = useState("");
  const [name, setname] = useState("");
  const [photoUrl, setphotoUrl] = useState("");
  const [owner, setowner] = useState("");
  const [workspaceObject, setworkspaceObject] = useState("");
  const [workspaceimagefile, setworkspaceimagefile] = useState("");

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
        setweekfrom(docSnap.data().time["mo-from"]);
        setweekto(docSnap.data().time["mo-to"]);
        setendfrom(docSnap.data().time["fr-from"]);
        setendto(docSnap.data().time["fr-to"]);
        setlastUpdated(docSnap.data().lastUpdated);
        setname(docSnap.data().name);
        setowner(docSnap.data().owner);
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
    const db = getFirestore();
    const editingWorkspace = doc(db, "workspace", props.match.params.id);
    let file = workspaceimagefile;
    // var storage = firebase.storage();
    const storageRef = ref(
      storage,
      "workspaces/" +
        props.match.params.id +
        "/" +
        props.match.params.id +
        "." +
        file["type"]
    );
    const metadata = {
      contentType: "image/jpeg",
    };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata).on(
      "state_changed",
      (snapshot) => {
        console.log(132);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        alert("failed");
        // Handle unsuccessful uploads
      },
      () => {
        alert("success");
        console.log(uploadTask);
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setphotoUrl(downloadURL);
        });
      }
    );

    const docRef = setDoc(
      editingWorkspace,
      {
        lastUpdated: new Date(),
        addedby: auth.currentUser.email,
        additionalFacilities: [],
        owner: owner,
        address: address,
        time: {
          "mo-from": weekfrom,
          "mo-to": weekto,
          "fr-from": endfrom,
          "fr-to": endto,
        },
        workspaceType: workspace,
        spaceId: props.match.params.id,
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
                {/* <div className="form-group">
                  <label htmlFor="workspace-type">Workspace Facilities</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="WiFi"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setadditionalFacilities([
                            additionalFacilities,
                            ["WiFi"],
                          ]);
                        }
                      }}
                    ></input>
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
                </div> */}
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
                <div className="form-group">
                  <label htmlFor="weekdays-opening">
                    Opening Time (WeekDays)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="weekdays-opening"
                    placeholder="Enter Opening time"
                    value={weekfrom}
                    onChange={(e) => setweekfrom(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="weekdays-closing">
                    closing Time (WeekDays)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="weekdays-closing"
                    placeholder="Enter closing time"
                    value={weekto}
                    onChange={(e) => setweekto(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="weekend-opening">
                    Opening Time (Weekend)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="weekend-opening"
                    placeholder="Enter Opening time"
                    value={endfrom}
                    onChange={(e) => setendfrom(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="weekend-closing">
                    closing Time (Weekend)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="weekend-closing"
                    placeholder="Enter closing time"
                    value={endto}
                    onChange={(e) => setendto(e.target.value)}
                  ></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputFile">Workspace Image</label>
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="workspace-image"
                        onChange={(e) =>
                          setworkspaceimagefile(e.target.files[0])
                        }
                      ></input>
                      <label
                        className="custom-file-label"
                        htmlFor="workspace-image"
                      >
                        {workspaceimagefile["name"] || "Choose file"}
                      </label>
                    </div>
                    <div className="input-group-append">
                      <span className="input-group-text">Upload</span>
                    </div>
                  </div>
                </div>
                <img
                  className="ref"
                  src={photoUrl}
                  alt={name}
                  height="300"
                  width="400"
                />
              </div>
              <div className="modal-footer justify-content-between">
                <button className="btn btn-success">Update Workspace</button>
              </div>
            </form>
          </div>

          {/* <button className="btn btn-success">Submit</button> */}
          {/* </form> */}
        </section>
      </div>
    </div>
  );
}
