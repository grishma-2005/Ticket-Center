// StatusEditSidebar.js
import React from 'react';
import styles from './StatusEditSidebar.module.css'; // Create this CSS file

function StatusEditSidebar({ currentStatus, onStatusChange, onClose, onSave, ticket }) {
  const statusOptions = ['IN PROGRESS', 'RESOLVED', 'CLOSED'];

  return (
    <div className={styles.sidebarOverlay}>
      <div className={styles.sidebar}>
        <h3>Edit Ticket Status</h3>
        {ticket && <p>Ticket No: {ticket.No}</p>} {/* Display ticket info if needed */}
        <div className={styles.statusOptions}>
          {statusOptions.map(option => (
            <div key={option} className={styles.option}>
              <input
                type="radio"
                id={option}
                name="status"
                value={option}
                checked={currentStatus === option}
                onChange={() => onStatusChange(option)}
              />
              <label
                htmlFor={option}
                className={`${styles.statusLabel} ${styles[option.toLowerCase().replace(' ', '')]}`}
              >
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.sidebarActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.saveButton} onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default StatusEditSidebar;