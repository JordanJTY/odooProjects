import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddContratacion from "./components/AddContratacion";
import UpdateContratacion from "./components/UpdateContratacion";
import ContratacionList from "./components/ContratacionList";

import ContratacionService from "./services/ContratacionService";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      ContratacionService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/contratacion" className="navbar-brand">
          <div className="bicycle-logo" >
            <img src="/app/bicycle-logo.jpg" alt="Bikes" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/app/contratacion"} className="nav-link">
              Companies
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/app" element={<ContratacionList />} />
          <Route path="/app/contratacion" element={<ContratacionList />} />
          <Route path="/app/add" element={<AddContratacion />} />
          <Route path="/app/contratacion/:id" element={<UpdateContratacion />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
