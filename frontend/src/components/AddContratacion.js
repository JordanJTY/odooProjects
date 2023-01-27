import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContratacionDataService from "../services/ContratacionService";

const AddContratacion = () => {
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
  const [contratacion, setContratacion] = useState(initialContratacionState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setContratacion({ ...contratacion, [name]: value });
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
      setContratacion({ ...contratacion, [name]: value });
    };
  };

  const saveContratacion = () => {
    var data = {
      name: contratacion.name,
      imagen: contratacion.imagen,
      email: contratacion.email,
      contacto: contratacion.contacto,
      telefono: contratacion.telefono,
      ingresoAnual: contratacion.ingresoAnual,
      gastoAnual: contratacion.gastoAnual,
      beneficio: contratacion.beneficio
    }

    ContratacionDataService.create(data)
      .then(response => {
        setContratacion({
          id: response.data.id,
          name: response.data.name,
          imagen: response.data.imagen,
          email: response.data.email,
          contacto: response.data.contacto,
          telefono: response.data.telefono,
          ingresoAnual: response.data.ingresoAnual,
          gastoAnual: response.data.gastoAnual,
          beneficio: response.data.beneficio
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newContratacion = () => {
    setContratacion(initialContratacionState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link
            to={"/app/contratacion/"}
            className="btn btn-danger"
          >
            Volver
          </Link>
          <button className="btn btn-success" onClick={newContratacion}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={contratacion.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="imagen">Imagen</label>
            <img src={"data:{{image/png;base64," + contratacion.imagen} alt="" width={300} />
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
              value={contratacion.email}
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
              value={contratacion.contacto}
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
              value={contratacion.telefono}
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
              value={contratacion.ingresoAnual}
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
              value={contratacion.gastoAnual}
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
              value={contratacion.beneficio}
              onChange={handleInputChange}
              name="beneficio"
            />
          </div>

          <button onClick={saveContratacion} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddContratacion;
