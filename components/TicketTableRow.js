// TicketTableRow.js
import React from 'react';
import { FaEdit } from 'react-icons/fa';

function TicketTableRow({ ticket, onEditClick }) { // Receive onEditClick as a prop

  const handleEdit = () => {
    onEditClick(ticket); // Call the onEditClick function passed from TicketTable
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'CREATED': return 'statusCreated';
      case 'IN PROGRESS': return 'statusInProgress';
      case 'RESOLVED': return 'statusResolved';
      case 'CLOSED': return 'statusClosed';
      default: return '';
    }
  };

  return (
    <tr>
      <td>{ticket.No}</td>
      <td>{ticket.Issues}</td>
      <td>{ticket.Description}</td>
      <td className={getStatusClass(ticket.Status)}>
        {ticket.Status}
      </td>
      <td>
        <button
          onClick={handleEdit}
          disabled={ticket.Status === 'CLOSED'}
          className={ticket.Status === 'CLOSED' ? 'disabledButton' : ''}
        >
          <FaEdit />
        </button>
      </td>
    </tr>
  );
}
export default TicketTableRow;