import React from 'react';
import styles from './Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange, rowsPerPageOptions, onRowsPerPageChange, totalItems }) {
  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(parseInt(event.target.value));
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const startIndex = (currentPage - 1) * (rowsPerPageOptions ? rowsPerPageOptions[0] : totalItems);
  const endIndex = Math.min(startIndex + (rowsPerPageOptions ? rowsPerPageOptions[0] : totalItems), totalItems);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.leftSection}>
        {/* You can keep this empty or remove it if you truly want everything on the right */}
      </div>
      <div className={styles.rightSection}>
        <div className={styles.rowsPerPage}>
          Rows per page:
          <select onChange={handleRowsPerPageChange} value={rowsPerPageOptions ? rowsPerPageOptions[0] : totalItems}>
            {rowsPerPageOptions && rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className={styles.pageControlsAndInfo}>
          <div className={styles.pageControls}>
            <button onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>
              &lt;
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => handlePageClick(number)}
                className={currentPage === number ? styles.active : ''}
              >
                {number}
              </button>
            ))}
            <button onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
          <div className={styles.pageInfo}>
            {totalItems > 0 ? `${startIndex + 1}-${endIndex} of ${totalItems}` : 'No items'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
