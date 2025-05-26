// TicketCenter.js
import React, { useState } from 'react';
import TicketTable from './TicketTable';
import Searchbar from './Searchbar';
import styles from './TicketCenter.module.css';
import Pagination from './Pagination';
import StatusEditSidebar from './StatusEditSidebar';

function TicketCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allTickets, setAllTickets] = useState([
    { No: 3, Issues: 'Others', Description: 'sdreefanewenr', Status: 'CREATED' },
    { No: 4, Issues: 'Course Enrollment', Description: 'mallesh', Status: 'RESOLVED' },
    { No: 5, Issues: 'Account Issue', Description: 'some description with others', Status: 'CREATED' },
    { No: 6, Issues: 'Payment Issue', Description: 'PAYMENT', Status: 'CREATED' },
    { No: 7, Issues: 'Course Enrollment', Description: 'Enrollment', Status: 'RESOLVED' },
    { No: 8, Issues: 'Login & Registration', Description: 'aSDFGHNL', Status: 'CREATED' },
    { No: 9, Issues: 'Others', Description: 'edrghj', Status: 'CREATED' },
    { No: 10, Issues: 'Payment Issue', Description: '1234567892345678', Status: 'IN PROGRESS' },
    { No: 11, Issues: 'Others', Description: 'zxcfhajshnn', Status: 'CREATED' },
  ]);

  const [filteredTickets, setFilteredTickets] = useState([...allTickets]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rowsPerPageOptions = [10, 25, 50];
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false); // State to control the add ticket form visibility
  const [newTicket, setNewTicket] = useState({ // State to hold new ticket data
    Issues: '',
    Description: '',
    Status: 'CREATED', // Default status for new tickets
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = allTickets.filter(ticket =>
      Object.values(ticket).some(value =>
        String(value).toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredTickets(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handleEditClick = (ticket) => {
    setEditingTicket(ticket);
    setIsEditSidebarOpen(true);
  };

  const handleStatusUpdate = (ticketNo, newStatus) => {
    try {
      setAllTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.No === ticketNo ? { ...ticket, Status: newStatus } : ticket
        )
      );
      setFilteredTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.No === ticketNo ? { ...ticket, Status: newStatus } : ticket
        )
      );
      setIsEditSidebarOpen(false);
      setEditingTicket(null);
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  const handleCloseSidebar = () => {
    setIsEditSidebarOpen(false);
    setEditingTicket(null);
  };

  const handleOpenAddTicket = () => {
    setIsAddTicketOpen(true);
    setNewTicket({ Issues: '', Description: '', Status: 'CREATED' }); // Reset the form
  };

  const handleCloseAddTicket = () => {
    setIsAddTicketOpen(false);
  };

  const handleNewTicketChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prevTicket => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleAddTicket = () => {
    if (newTicket.Issues && newTicket.Description) {
      const nextTicketNo = allTickets.length > 0 ? Math.max(...allTickets.map(t => t.No)) + 1 : 1;
      const newTicketWithNo = { No: nextTicketNo, ...newTicket };
      setAllTickets(prevTickets => [...prevTickets, newTicketWithNo]);
      setFilteredTickets(prevTickets => [...prevTickets, newTicketWithNo]);
      setIsAddTicketOpen(false);
      setNewTicket({ Issues: '', Description: '', Status: 'CREATED' }); // Reset form after adding
    } else {
      alert('Please fill in both Issues and Description.'); // Basic validation
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredTickets.length / rowsPerPage);

  return (
    <div className={styles.ticketCenterContainer}>
      <div className={styles.headerWithLogo}>
        <h2>Ticket Center</h2>
        <Searchbar onSearch={handleSearch} />
        <button className={styles.addTicketButton} onClick={handleOpenAddTicket}>
          Add New Ticket
        </button>
      </div>

      {isAddTicketOpen && (
        <div className={styles.addTicketModalOverlay}>
          <div className={styles.addTicketModal}>
            <h3>Add New Ticket</h3>
            <div className={styles.formGroup}>
              <label htmlFor="issues">Issues:</label>
              <input
                type="text"
                id="issues"
                name="Issues"
                value={newTicket.Issues}
                onChange={handleNewTicketChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="Description"
                value={newTicket.Description}
                onChange={handleNewTicketChange}
              />
            </div>
            <div className={styles.formActions}>
              <button className={styles.cancelButton} onClick={handleCloseAddTicket}>
                Cancel
              </button>
              <button className={styles.saveButton} onClick={handleAddTicket}>
                Add Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.tableAndSidebarContainer}>
        <div className={styles.ticketTableContainer}>
          <TicketTable
            tickets={currentTickets}
            onEditClick={handleEditClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            rowsPerPageOptions={rowsPerPageOptions}
            onRowsPerPageChange={handleRowsPerPageChange}
            totalItems={filteredTickets.length}
          />
        </div>
        {isEditSidebarOpen && editingTicket && (
          <StatusEditSidebar
            currentStatus={editingTicket.Status}
            onStatusChange={(newStatus) => setEditingTicket({ ...editingTicket, Status: newStatus })}
            onClose={handleCloseSidebar}
            onSave={() => handleStatusUpdate(editingTicket.No, editingTicket.Status)}
            ticket={editingTicket}
          />
        )}
      </div>
    </div>
  );
}

export default TicketCenter;