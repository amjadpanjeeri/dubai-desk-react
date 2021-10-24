/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import SideBar from "../../components/Sidebar";
import TopHeader from "../../components/TopHeader";
// import { useDropzone } from "react-dropzone";


export default function AllWorkspaces() {
  const [workspaces, setworkspaces] = useState([]);
  useEffect(() => {
    const db = getFirestore();
    const workspacesRef = collection(db, "workspace");
    //Create a query against the collection.
    const q = query(
      workspacesRef,
      // where("state", "==", "CA"),
      orderBy("lastUpdated")
      //   limit(10)
    );
    const querySnapshot = getDocs(q);
    querySnapshot.then((doc) => {
      let workspaces = [];
      console.log(doc);

      doc.forEach((doc) => {
        workspaces.push(doc.data());
      });
      setworkspaces(workspaces);
      console.log(querySnapshot);
    });
  }, []);

  const handleDelete = (spaceId) => {
    let confirm = window.confirm(
      "Are you sure you want to delete this workspace?"
    );
    console.log(confirm);
    if (confirm) {
      const db = getFirestore();
      console.log(spaceId);
      const deletedUser = doc(db, "workspace", spaceId);
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
        <TopHeader headerValue="Workspace Management" />
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
                    Do you really want to delete this workspace? This action
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
                    <h3 className="card-title">Workspaces</h3>
                    <a
                      href="/create-workspace"
                      className="btn btn-sm btn-success float-right"
                    >
                      Add Workspace
                    </a>
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
                          <th>Workspace Name</th>
                          <th>Address</th>
                          <th>Description</th>
                          <th>Last Updated</th>
                          <th>Owner Name</th>
                          <th>WeekDays Time</th>
                          <th>WorkDays Time</th>
                          {/* <th>Workspace Type</th> */}
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {workspaces} */}
                        {workspaces ? (
                          workspaces.map((workspace, index) => {
                            return (
                              <tr key={index}>
                                {/* <td>ibkh</td> */}
                                <td>{workspace.name}</td>
                                <td>{workspace.address}</td>
                                <td>{workspace.description}</td>
                                <td>{workspace.lastUpdated.toDate().toDateString()}</td>
                                <td>{workspace.ownerId}</td>
                                <td>
                                  {workspace.time["mo-from"]} to{" "}
                                  {workspace.time["mo-to"]}
                                </td>
                                <td>
                                  {workspace.time["fr-from"]} to{" "}
                                  {workspace.time["fr-to"]}
                                </td>
                                {/* <td>{workspace.workspaceType}</td> */}
                                <td>
                                  <div className="text-center">
                                    <Link
                                      className="text-white"
                                      to={`/workspace/${workspace.spaceId}`}
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
                                      className="btn btn-sm btn-danger"
                                      onClick={() =>
                                        handleDelete(workspace.spaceId)
                                      }
                                    >
                                      Delete
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <div>No workspaces</div>
                        )}

                        <tr></tr>
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
