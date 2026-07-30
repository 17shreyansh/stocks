import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../../styles/theme';
import axios from '../../utils/axios';

const EscalationSection = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #f8faff 0%, #ffffff 100%);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  color: #1a365d;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  overflow-x: auto;
  border: 2px solid #e2e8f0;
  
  @media (max-width: 768px) {
    border-radius: 8px;
    margin: 0 -10px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1100px;
  font-size: 15px;
  
  @media (max-width: 768px) {
    min-width: 900px;
    font-size: 13px;
  }
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #1a365d, #0059cc);
`;

const TableHeaderCell = styled.th`
  padding: 24px 20px;
  color: #ffffff !important;
  font-weight: 600;
  text-align: left;
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  
  &:last-child {
    border-right: none;
  }
  
  &:nth-child(1) { width: 16%; }
  &:nth-child(2) { width: 22%; }
  &:nth-child(3) { width: 28%; }
  &:nth-child(4) { width: 14%; }
  &:nth-child(5) { width: 20%; }
  
  @media (max-width: 768px) {
    padding: 18px 15px;
    font-size: 13px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled(motion.tr)`
  border-bottom: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8faff;
  }
  
  &:nth-child(even) {
    background: #fafbfc;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 20px 20px;
  color: #2d3748;
  font-size: 15px;
  line-height: 1.6;
  vertical-align: top;
  font-weight: 400;
  border-right: 1px solid #e5e7eb;
  
  &:last-child {
    border-right: none;
  }
  
  &:nth-child(1) { 
    font-weight: 600;
    color: #1a365d;
  }
  
  @media (max-width: 768px) {
    padding: 16px 15px;
    font-size: 14px;
  }
`;

const ContactName = styled.div`
  font-weight: 500;
  color: #1a365d;
  margin-bottom: 3px;
  font-size: 14px;
`;

const ContactTitle = styled.div`
  font-size: 12px;
  color: #666;
  font-weight: 400;
  line-height: 1.2;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  font-weight: 400;
`;

const Icon = styled.span`
  color: #3498db;
  font-size: 14px;
`;

const WorkingHours = styled.div`
  background: #f0f8ff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #1a365d;
  font-weight: 500;
  text-align: center;
  border: 1px solid #d1e7ff;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 16px;
  color: #4b5563;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #4b5563;
`;

const EscalationMatrix = () => {
  const [escalationData, setEscalationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEscalationData();
  }, []);

  const fetchEscalationData = async () => {
    try {
      const response = await axios.get('/escalation-matrix');
      if (response.data.success) {
        setEscalationData(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch escalation data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <EscalationSection>
        <Container>
          <LoadingSpinner>Loading escalation matrix...</LoadingSpinner>
        </Container>
      </EscalationSection>
    );
  }

  return (
    <EscalationSection>
      <Container>
        <SectionTitle>Escalation Matrix</SectionTitle>
        
        <TableContainer>
          {escalationData.length === 0 ? (
            <EmptyState>
              <h3>No escalation contacts available</h3>
              <p>Please check back later or contact our support team.</p>
            </EmptyState>
          ) : (
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Details Of</TableHeaderCell>
                  <TableHeaderCell>Contact Person</TableHeaderCell>
                  <TableHeaderCell>Address</TableHeaderCell>
                  <TableHeaderCell>Contact No.</TableHeaderCell>
                  <TableHeaderCell>Email Id</TableHeaderCell>
                  <TableHeaderCell>Working Hours</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {escalationData.map((item, index) => (
                  <TableRow
                    key={item._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TableCell>
                      <ContactName>{item.detailsOf}</ContactName>
                    </TableCell>
                    <TableCell>
                      <ContactName>{item.contactPerson.name}</ContactName>
                      <ContactTitle>{item.contactPerson.designation}</ContactTitle>
                    </TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>
                      {item.contactNo}
                    </TableCell>
                    <TableCell>
                      {item.emailId}
                    </TableCell>
                    <TableCell>
                      <WorkingHours>{item.workingHours}</WorkingHours>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </EscalationSection>
  );
};

export default EscalationMatrix;