import React from "react";

function TableRow(props) {
  const {service, startService} = props;

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
      <button type={'button'} className={'mr-1 btn btn-warning'}>Restart</button>} {service.status === 'running' &&
    <button type={'button'} className={'btn btn-danger'}>Stop</button>} {service.status === 'stopped' &&
    <button type={'button'} className={'btn btn-success'} onClick={() => startService(service['service-name'])}>Start</button>}
    </td>
  </tr>
}

export default TableRow;