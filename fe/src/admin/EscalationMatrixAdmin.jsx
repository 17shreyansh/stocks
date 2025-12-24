import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../utils/axios';

const AdminContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #1a365d;
  font-size: 2rem;
  font-weight: 700;
`;

const AddButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #1a365d, #3498db);
`;

const TableHeaderCell = styled.th`
  padding: 15px;
  color: white;
  font-weight: 600;
  text-align: left;
  font-size: 14px;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
  
  &:hover {
    background: #f8faff;
  }
`;

const TableCell = styled.td`
  padding: 15px;
  color: #4a5568;
  font-size: 14px;
  vertical-align: top;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled.button`
  background: #38a169;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #2f855a;
  }
`;

const DeleteButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: #c53030;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  color: #1a365d;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #718096;
  
  &:hover {
    color: #1a365d;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #1a365d;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #2980b9;
  }
`;

const CancelButton = styled.button`
  background: #718096;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #4a5568;
  }
`;

const EscalationMatrixAdmin = () => {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [formData, setFormData] = useState({
    detailsOf: '',
    contactPerson: { name: '', designation: '' },
    address: '',
    contactNo: '',
    emailId: '',
    workingHours: '',
    order: 0
  });

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get('/escalation-matrix/admin');
      if (response.data.success) {
        setEntries(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const handleAdd = () => {
    setEditingEntry(null);
    setFormData({
      detailsOf: '',
      contactPerson: { name: '', designation: '' },
      address: '',
      contactNo: '',
      emailId: '',
      workingHours: '',
      order: 0
    });
    setShowModal(true);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData(entry);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`/escalation-matrix/${id}`);
        fetchEntries();
      } catch (error) {
        console.error('Failed to delete entry:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEntry) {
        // Clean the data before sending
        const { _id, __v, createdAt, updatedAt, ...cleanData } = formData;
        await axios.put(`/escalation-matrix/${editingEntry._id}`, cleanData);
      } else {
        await axios.post('/escalation-matrix', formData);
      }
      setShowModal(false);
      fetchEntries();
      alert('Entry saved successfully!');
    } catch (error) {
      console.error('Failed to save entry:', error);
      alert('Failed to save entry. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <AdminContainer>
      <Header>
        <Title>Escalation Matrix Management</Title>
        <AddButton onClick={handleAdd}>Add New Entry</AddButton>
      </Header>

      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>Details Of</TableHeaderCell>
            <TableHeaderCell>Contact Person</TableHeaderCell>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>Contact No.</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Working Hours</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {entries.map((entry) => (
            <TableRow key={entry._id}>
              <TableCell>{entry.detailsOf}</TableCell>
              <TableCell>
                <div>{entry.contactPerson.name}</div>
                <div style={{ fontSize: '12px', color: '#718096' }}>
                  {entry.contactPerson.designation}
                </div>
              </TableCell>
              <TableCell>{entry.address}</TableCell>
              <TableCell>{entry.contactNo}</TableCell>
              <TableCell>{entry.emailId}</TableCell>
              <TableCell>{entry.workingHours}</TableCell>
              <TableCell>
                <ActionButtons>
                  <EditButton onClick={() => handleEdit(entry)}>Edit</EditButton>
                  <DeleteButton onClick={() => handleDelete(entry._id)}>Delete</DeleteButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {editingEntry ? 'Edit Entry' : 'Add New Entry'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Details Of</Label>
                <Input
                  name="detailsOf"
                  value={formData.detailsOf}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Contact Person Name</Label>
                <Input
                  name="contactPerson.name"
                  value={formData.contactPerson.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Designation</Label>
                <Input
                  name="contactPerson.designation"
                  value={formData.contactPerson.designation}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Address</Label>
                <Textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Contact Number</Label>
                <Input
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email ID</Label>
                <Input
                  type="email"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Working Hours</Label>
                <Input
                  name="workingHours"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                  placeholder="e.g., Mon-Fri 9AM-6PM or 10AM-2PM"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Order</Label>
                <Input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormButtons>
                <CancelButton type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit">
                  {editingEntry ? 'Update' : 'Create'}
                </SaveButton>
              </FormButtons>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </AdminContainer>
  );
};

export default EscalationMatrixAdmin;