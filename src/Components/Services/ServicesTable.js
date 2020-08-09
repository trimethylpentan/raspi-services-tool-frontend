import React, {useEffect, useState} from "react";

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  const startService = (serviceName) => {
    //TODO: Implement API-Request
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
    <table className={'table table-dark'}>
      <tr>
        <th>Service-Name</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
      <tbody>
        {renderTableRows(services)}
      </tbody>
    </table>
  </div>
}

function renderTableRows(services) {
  return services.map((service) => {
    let className = '';
    switch (service.status) {
      case 'running':
        className = 'text-success';
        break;
      case 'stopped':
        className = 'text-danger';
        break;
      case 'unknown':
        className = 'text-warning';
        break;
      default:
          className = '';
    }

    return <tr key={service['service-name']}>
      <td title={service.description}>{service['service-name']}</td>
      <td className={className}>{service.status}</td>
      <td>
        {service.status === 'running' &&
        <button type={'button'} className={'mr-1 btn btn-warning'}>Restart</button>} {service.status === 'running' &&
      <button type={'button'} className={'btn btn-danger'}>Stop</button>} {service.status === 'stopped' &&
      <button type={'button'} className={'btn btn-success'}>Start</button>}
      </td>
    </tr>
  });
}

export default ServiceTable;