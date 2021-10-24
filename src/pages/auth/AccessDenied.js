import React from "react";

export default function AccessDenied() {
  return (
    <section class="content">
      <center>
        <div class="error-page display-4">
          <i class="fas fa-exclamation-triangle text-warning"></i> Access
          Denied.
        </div>
        <a className="btn my-3 btn-success" href="/login">
          Please login
        </a>
      </center>
    </section>
  );
}
