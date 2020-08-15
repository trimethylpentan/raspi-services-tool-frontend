import React from "react";
import PropTypes from 'prop-types';

function TableRow(props) {
  const {service, startService, stopService, restartService} = props;

  let className;
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
      <button type={'button'} className={'mr-1 btn btn-warning'} onClick={() => restartService(service['service-name'])}>Restart</button>}
      {service.status === 'running' &&
    <button type={'button'} className={'btn btn-danger'} onClick={() => stopService(service['service-name'])}>Stop</button>}
    {service.status === 'stopped' &&
    <button type={'button'} className={'btn btn-success'} onClick={() => startService(service['service-name'])}>Start</button>}
    </td>
  </tr>
}

TableRow.propTypes = {
  service: PropTypes.object.isRequired,
  startService: PropTypes.func.isRequired,
  stopService: PropTypes.func.isRequired,
  restartService: PropTypes.func.isRequired,
}

export default TableRow;