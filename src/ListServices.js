import React from "react";
import Navbar from "./Components/Navbars/Navbar";
import SideNav from "./Components/Navbars/SideNav";

function ListServices() {
  return (
    <>
      <Navbar/>
      <div id="layoutSidenav">
        <SideNav/>
        <div id="layoutSidenav_content">
          <main>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Your Website 2020</div>
                <div>
                  <a href="#">Privacy Policy</a>
                  &middot;
                  <a href="#">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default ListServices;