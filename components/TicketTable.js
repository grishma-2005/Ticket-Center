// TicketTable.js
import React from 'react';
import TicketTableRow from './TicketTableRow';
import styles from './TicketTable.module.css'; // Import CSS Module

function TicketTable({ tickets, onEditClick }) { // Receive onEditClick as a prop
  return (
    <div className={styles.tableContainer}>
      <table className={styles.ticketTable}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Issues</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <TicketTableRow
              key={ticket.No}
              ticket={ticket}
              onEditClick={onEditClick} // Pass onEditClick down to TicketTableRow
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TicketTable;