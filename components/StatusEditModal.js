import React from 'react';
import styles from './StatusEditModal.module.css';

function StatusEditModal({ currentStatus, onStatusChange, onClose, onSave }) {
  // Status options - never show CREATED in the modal
  const statusOptions = ['IN PROGRESS', 'RESOLVED', 'CLOSED'];
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Change Ticket Status</h3>
        <div className={styles.statusOptions}>
          {(statusOptions).map(option => (
            <div key={option} className={styles.option} className2={styles.option}>
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
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
          <button className={styles.saveButton} onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default StatusEditModal;