import React from "react";
import { Link } from "react-router-dom";
export default function UsersCard(props) {
  return (
    <tr>
      <td>{props.user?.name}</td>
      <td>{props.user?.email}</td>
      <td>{props.user?.dob}</td>
      <td>{props.user?.phone}</td>
      <td>{props.user?.createdTime}</td>
      <td>{props.user?.loginMethod}</td>
      <td>
        <div className="text-center">
          <a href="#" className="btn btn-sm btn-primary">
            Edit
          </a>
          &nbsp;
          <a href="#" className="btn btn-sm btn-danger">
            Delete
          </a>
        </div>
      </td>
    </tr>
    // <div style={{padding:20}}>
    //     <img src={props.user?.profilePicture} width="50px"/>
    //     <h3>{props.user?.name}</h3>
    //     <p>{props.user?.email}</p>

    //     <button><Link to={`/users/${props.user?.uid}`}>Manage User</Link></button>
    //     <hr/>

    // </div>
  );
}
