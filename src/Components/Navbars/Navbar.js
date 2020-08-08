import React from "react";

function Navbar() {

  return <>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <a className="navbar-brand" href="index.html">Start Bootstrap</a>
      <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#">
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
        <div className="input-group">
          <input className="form-control" type="text" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </nav>
  </>
}

export default Navbar;