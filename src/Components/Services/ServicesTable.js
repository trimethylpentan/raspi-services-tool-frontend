import React, {useEffect, useState} from "react";

function ServiceTable() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://testing.raspi-services-tools.local/api/services/list')
      .then(result => result.json())
      .then((data) => setServices(data.services))
      .catch((error) => setError('Could not connect to API! ' + error));
  }, [])

  return <div>
    {error !== '' &&  <div className="alert alert-danger" role="alert">{error}</div>}
    <table>
      <tr>
        <th>Name</th>
        <th>Status</th>
      </tr>
    {services.map((service) => <tr><td>{service['service-name']}</td><td>{service.status}</td></tr>)}
    </table>
  </div>
}

export default ServiceTable;