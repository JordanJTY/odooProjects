import React, { useState, useEffect } from "react";
import ContratacionDataService from "../services/ContratacionService";
import { Link, useNavigate } from "react-router-dom";

const ContratacionList = () => {
  const [contratacion, setContratacion] = useState([]);
  const [currentContratacion, setCurrentContratacion] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveContratacion();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveContratacion = () => {
    ContratacionDataService.getAll()
      .then(response => {
        setContratacion(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveContratacion();
    setCurrentContratacion(null);
    setCurrentIndex(-1);
  };

  const setActiveContratacion = (contratacion, index) => {
    setCurrentContratacion(contratacion);
    setCurrentIndex(index);
  };

  const removeAllContratacion = () => {
    ContratacionDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteContratacion = () => {
    ContratacionDataService.remove(currentContratacion.id)
      .then(response => {
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {

    if (searchName === '') {
      refreshList();
      return;
    }

    ContratacionDataService.findByName(searchName)
      .then(response => {
        setContratacion(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Companies List</h4>

        <ul className="list-group">
          {contratacion &&
            contratacion.map((contratacion, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveContratacion(contratacion, index)}
                key={index}
              >
                {contratacion.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllContratacion}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentContratacion ? (
          <div>
            <h4>Company</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentContratacion.name}
            </div>
            <div>
              <label>
                <strong>Email:</strong>
              </label>{" "}
              {currentContratacion.email}
            </div>
            <div>
              <label>
                <strong>Telefono:</strong>
              </label>{" "}
              {currentContratacion.telefono}
            </div>
            <Link
              to={"/app/contratacion/" + currentContratacion.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
            <button className="badge badge-danger" onClick={ deleteContratacion } >
              Delete
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a company...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContratacionList;
