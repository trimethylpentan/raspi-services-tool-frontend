import React, {useContext, useEffect, useState} from "react";
import TableRow from "./TableRow";
import Modal from "../Modal";
import Credentials from "../../Context/Credentials";

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [clickedService, setClickedService] = useState('');
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [sendMethod, setSendMethod] = useState('');
  const [filter, setFilter] = useState('');
  const [orderBy, setOrderBy] = useState({orderBy: '', isAscending: true})

  const credentials = useContext(Credentials);

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

  const changeOrderBy = (orderByColumn) => {
    let isAscending = true;
    if (orderByColumn === orderBy.orderBy) {
      isAscending = !orderBy.isAscending;
    }

    setOrderBy({orderBy: orderByColumn, isAscending});
  }

  const renderTableRows = () => {
    return services.filter((service) => service['service-name'].includes(filter) || service.description.includes(filter) || service.status.includes(filter))
      .sort((service1, service2) => {
        let bigger = 1;
        let smaller = -1;
        if (orderBy.isAscending) {
          bigger = -1;
          smaller = 1;
        }
        if (orderBy.orderBy === 'service-name') {
          return service1['service-name'].toLowerCase() < service2['service-name'].toLowerCase() ? smaller : bigger;
        }
        if (orderBy.orderBy === 'status') {
          return service1.status < service2.status ? smaller : bigger;
        }

        return -1;
      })
      .map((service) =>
        <TableRow key={service['service-name'] + 'row'} startService={startService} stopService={stopService} restartService={restartService} service={service}/>)
  }

  useEffect(() => {
    if (credentials === null) {
      setError('Not logged in!');
      return;
    }

    fetch('http://testing.raspi-services-tools.local/api/services/list', {
      method: 'GET',
      headers: {
        "API-Key": credentials,
        Accept: 'application/json',
      }
    })
      .then(result => result.json())
      .then((data) => setServices(data.services))
      .catch((error) => setError('Could not connect to API! ' + error));
  }, [credentials])

  return <div className="bg-dark">
    {error !== '' &&  <div className="alert alert-danger" role="alert">{error}</div>}
    {openModal && <Modal serviceName={clickedService} closeModal={() => setOpenModal(false)} send={changeServiceStatus}/>}
    <div className="row-cols-6 mt-1 mb-1">
      <div className="col-3">
        <input type="text" placeholder={'Filter process list'} onChange={(event) => setFilter(event.target.value)}/>
      </div>
    </div>
    <table className={'table table-dark'}>
      <thead>
        <tr>
          <th style={{cursor: 'pointer'}} onClick={() => changeOrderBy('service-name')}>Service-Name</th>
          <th style={{cursor: 'pointer'}} onClick={() => changeOrderBy('status')}>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {renderTableRows()}
      </tbody>
    </table>
  </div>
}

export default ServiceTable;