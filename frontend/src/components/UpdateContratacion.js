import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ContratacionDataService from "../services/ContratacionService";

const Contratacion = props => {
  const { id } = useParams();
  let navigate = useNavigate();

  const initialContratacionState = {
    id: null,
    name: "",
    imagen: "",
    email: "",
    contacto: "",
    telefono: "",
    ingresoAnual: "",
    gastoAnual: "",
    beneficio: "",
  };
  const [currentContratacion, setCurrentContratacion] = useState(initialContratacionState);
  const [message, setMessage] = useState("");

  const getContratacion = id => {
    ContratacionDataService.get(id)
      .then(response => {
        setCurrentContratacion(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getContratacion(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentContratacion({ ...currentContratacion, [name]: value });
  };

  const handleInputChangeImage = event => {
    let { name, value } = event.target;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let base64Data = (reader.result).split(';');
      let base64 = base64Data[1].split(',')
      value = base64[1];
      setCurrentContratacion({ ...currentContratacion, [name]: value });
    };
  };

  const updateContratacion = () => {
    ContratacionDataService.update(currentContratacion.id, currentContratacion)
      .then(response => {
        alert("The company was updated successfully!");
        navigate("/app/contratacion");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteContratacion = () => {
    ContratacionDataService.remove(currentContratacion.id)
      .then(response => {
        navigate("/app/contratacion");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentContratacion ? (
        <div className="edit-form">
          <h4>Company</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={currentContratacion.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="imagen">Imagen</label>
              <img src={"data:{{image/png;base64," + currentContratacion.imagen} alt="" width={300} />
              <input
                type="file"
                className="form-control"
                id="imagen"
                required
                // value={currentContratacion.imagen}
                onChange={handleInputChangeImage}
                name="imagen"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={currentContratacion.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contacto">Contacto</label>
              <input
                type="text"
                className="form-control"
                id="contacto"
                required
                value={currentContratacion.contacto}
                onChange={handleInputChange}
                name="contacto"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Telefono</label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                required
                value={currentContratacion.telefono}
                onChange={handleInputChange}
                name="telefono"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ingresoAnual">Ingreso anual</label>
              <input
                type="text"
                className="form-control"
                id="ingresoAnual"
                required
                value={currentContratacion.ingresoAnual}
                onChange={handleInputChange}
                name="ingresoAnual"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gastoAnual">Gasto anual</label>
              <input
                type="text"
                className="form-control"
                id="gastoAnual"
                required
                value={currentContratacion.gastoAnual}
                onChange={handleInputChange}
                name="gastoAnual"
              />
            </div>

            <div className="form-group">
              <label htmlFor="beneficio">Beneficio</label>
              <input
                type="text"
                className="form-control"
                id="beneficio"
                required
                value={currentContratacion.beneficio}
                onChange={handleInputChange}
                name="beneficio"
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteContratacion}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContratacion}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a company...</p>
        </div>
      )}
    </div>
  );
};

export default Contratacion;
