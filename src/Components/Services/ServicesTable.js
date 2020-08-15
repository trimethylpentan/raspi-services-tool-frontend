import React, {useEffect, useState} from "react";
import TableRow from "./TableRow";
import Modal from "../Modal";

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [clickedService, setClickedService] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [sendMethod, setSendMethod] = useState('');

  const openPasswordModal = (clickedService) => {
    setClickedService(clickedService);
    setOpenModal(true);
  }

  const startService = (clickedService) => {
    setSendMethod('start');
    openPasswordModal(clickedService)
  }

  const restartService = (clickedService) => {
    setSendMethod('restart');
    openPasswordModal(clickedService)
  }

  const stopService = (clickedService) => {
    setSendMethod('stop');
    openPasswordModal(clickedService)
  }

  const changeServiceStatus = (serviceName, password) => {
    setOpenModal(false);
    fetch(`http://testing.raspi-services-tools.local/api/services/${sendMethod}`, {
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
        if (data.errors) {
          setError(data.errors);
          return;
        }
        setServices(oldState.map((service) => service['service-name'] === serviceName ? data.service : service));
      })
      .catch((error) => setError(error))
  }

  useEffect(() => {
    fetch('http://testing.raspi-services-tools.local/api/services/list')
      .then(result => result.json())
      .then((data) => setServices(data.services))
      .catch((error) => setError('Could not connect to API! ' + error));
  }, [])

  return <div>
    {error !== '' &&  <div className="alert alert-danger" role="alert">{error}</div>}
    {openModal && <Modal serviceName={clickedService} closeModal={() => setOpenModal(false)} send={changeServiceStatus}/>}
    <table className={'table table-dark'}>
      <thead>
        <tr>
          <th>Service-Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {services.map((service) => <TableRow
        key={service['service-name'] + 'row'}
        startService={startService}
        stopService={stopService}
        restartService={restartService}
        service={service}/>)}
      </tbody>
    </table>
  </div>
}

export default ServiceTable;