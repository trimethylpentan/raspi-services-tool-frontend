import React, {useEffect, useState} from "react";
import TableRow from "./TableRow";
import Modal from "../Modal";

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [clickedService, setClickedService] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const openPasswordModal = (clickedService) => {
    setClickedService(clickedService);
    setOpenModal(true);
  }

  const startService = (serviceName, password) => {
    setOpenModal(false);
    fetch('http://testing.raspi-services-tools.local/api/services/start', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: JSON.stringify({
        "service-name": serviceName,
        "password": password
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        const oldState = [...services];
        setServices(oldState.map((service) => service['service-name'] === serviceName ? data.service : service));
      })
      .catch((error) => alert(error))
  }

  const restartService = (serviceName) => {
    //TODO: Implement API-Request
  }

  const stopService = (serviceName) => {
    //TODO: Implement API-Request
  }

  useEffect(() => {
    fetch('http://testing.raspi-services-tools.local/api/services/list')
      .then(result => result.json())
      .then((data) => setServices(data.services))
      .catch((error) => setError('Could not connect to API! ' + error));
  }, [])

  return <div>
    {error !== '' &&  <div className="alert alert-danger" role="alert">{error}</div>}
    {openModal && <Modal serviceName={clickedService} closeModal={() => setOpenModal(false)} send={startService}/>}
    <table className={'table table-dark'}>
      <thead>
        <tr>
          <th>Service-Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {services.map((service) => <TableRow key={service['service-name'] + 'row'} startService={openPasswordModal} service={service}/>)}
      </tbody>
    </table>
  </div>
}

export default ServiceTable;