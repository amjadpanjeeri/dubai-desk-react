import React from "react";

export default function AccessDenied() {
  return (
    <section class="content">
      <div class="error-page">
        <h2 class="headline text-warning">403</h2>

        <div class="error-content">
          <h3>
            <i class="fas fa-exclamation-triangle text-warning"></i> Access
            Denied.
          </h3>
          <center className="mt-5">
            {" "}
            <a className="btn btn-success" href="/login">
              Please login{" "}
            </a>
          </center>
        </div>
      </div>
    </section>
  );
}
