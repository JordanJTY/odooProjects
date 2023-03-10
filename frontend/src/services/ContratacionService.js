import axios from "axios";

const getSessionId = () => {
  return localStorage.getItem("session_id");
}

const getAll = () => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  const config = {
    method: 'POST',
    url: '/api/contratacion/getAll',
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const get = id => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  const config = {
    method: 'POST',
    url: `/api/contratacion/get/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const findByName = name => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "data": {
        "name": name
      }
    }
  });

  const config = {
    method: 'POST',
    url: `/api/contratacion/findByName`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const create = data => {
  const session_id = getSessionId();

  var data_to_send = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "data": {
        "name": data.name,
        "imagen": data.imagen,
        "email": data.email,
        "contacto": data.contacto,
        "telefono": data.telefono,
        "ingresoAnual": data.ingresoAnual,
        "gastoAnual": data.gastoAnual,
        "beneficio": data.beneficio
      }
    }
  });

  var config = {
    method: 'POST',
    url: '/api/contratacion/create',
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data_to_send
  };

  return axios(config);
};

const update = (id, data) => {
  const session_id = getSessionId();

  var data_to_send = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "data": {
        "name": data.name,
        "imagen": data.imagen,
        "email": data.email,
        "contacto": data.contacto,
        "telefono": data.telefono,
        "ingresoAnual": data.ingresoAnual,
        "gastoAnual": data.gastoAnual,
        "beneficio": data.beneficio
      }
    }
  });

  var config = {
    method: 'POST',
    url: `/api/contratacion/update/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data_to_send
  };

  return axios(config);
};

const remove = id => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  var config = {
    method: 'POST',
    url: `/api/contratacion/remove/${id}`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const removeAll = () => {
  const session_id = getSessionId();

  const data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
    }
  });

  var config = {
    method: 'POST',
    url: `/api/contratacion/removeAll`,
    headers: {
      'Content-Type': 'application/json',
      "X-Openerp-Session-Id": session_id,
    },
    data: data
  };

  return axios(config);
};

const initSession = () => {

  var data = JSON.stringify({
    "jsonrpc": "2.0",
    "params": {
      "db": process.env.REACT_APP_ODOO_DB,
      "login": process.env.REACT_APP_ODOO_LOGIN,
      "password": process.env.REACT_APP_ODOO_PASSWORD
    }
  });

  var config = {
    method: 'post',
    url: `${process.env.REACT_APP_ODOO_BASEURL}/web/session/authenticate`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config);
};

const ContratacionService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  initSession
};

export default ContratacionService;
