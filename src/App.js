import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Navbars/Navbar";
import SideNav from "./Components/Navbars/SideNav";

function App() {
  return (
    <>
      <Navbar/>
      <div id="layoutSidenav">
        <SideNav/>
        <div id="layoutSidenav_content">
          <main>
            {renderApp()}
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

function renderApp() {
  return <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
    </header>
  </div>
}

export default App;
