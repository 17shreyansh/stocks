import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../utils/adminAPI';
import { theme } from '../../../styles/theme';
import styled from 'styled-components';
import UploadModal from './UploadModal';

const AdminDocuments = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        search: '',
        category: 'All Categories',
        sort: 'newest'
    });

    const fetchDocuments = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getAdminDocuments({
                page,
                ...filters
            });
            
            setDocuments(response.data.documents);
            setTotalPages(response.data.pagination.pages);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setError('Failed to fetch documents. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, [page, filters]);

    const handleStatusToggle = async (id, currentStatus) => {
        try {
            await adminAPI.updateDocumentStatus(id, !currentStatus);
            fetchDocuments(); // Refresh the list
        } catch (error) {
            console.error('Error updating document status:', error);
            setError('Failed to update document status. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this document?')) {
            return;
        }
        
        try {
            await adminAPI.deleteDocument(id);
            fetchDocuments(); // Refresh the list
        } catch (error) {
            console.error('Error deleting document:', error);
            setError('Failed to delete document. Please try again.');
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPage(1); // Reset to first page when filters change
    };

    return (
        <Container>
            <Header>
                <h1>Document Management</h1>
                <UploadButton onClick={() => setIsUploadModalOpen(true)}>
                    Upload New Document
                </UploadButton>
            </Header>

            <UploadModal 
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSuccess={() => {
                    fetchDocuments();
                }}
            />

            <FiltersSection>
                <SearchInput
                    type="text"
                    placeholder="Search documents..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <SelectFilter
                    aria-label="Filter by category"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                    <option value="All Categories">All Categories</option>
                    <option value="KYC Forms">KYC Forms</option>
                    <option value="Modification Forms">Modification Forms</option>
                    <option value="Legal Documents">Legal Documents</option>
                    <option value="Trading Forms">Trading Forms</option>
                </SelectFilter>
                <SelectFilter
                    aria-label="Sort documents"
                    value={filters.sort}
                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="mostDownloaded">Most Downloaded</option>
                    <option value="name">Name A-Z</option>
                </SelectFilter>
            </FiltersSection>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Downloads</th>
                        <th>Last Updated</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map(doc => (
                        <tr key={doc._id}>
                            <td>{doc.title}</td>
                            <td>{doc.category}</td>
                            <td>{doc.downloadCount}</td>
                            <td>{new Date(doc.lastUpdated || doc.createdAt).toLocaleDateString()}</td>
                            <td>
                                <StatusToggle
                                    active={doc.isActive}
                                    onClick={() => handleStatusToggle(doc._id, doc.isActive)}
                                >
                                    {doc.isActive ? 'Active' : 'Inactive'}
                                </StatusToggle>
                            </td>
                            <td>
                                <ActionButtons>
                                    <button onClick={() => {/* Open edit modal */}}>Edit</button>
                                    <button onClick={() => handleDelete(doc._id)}>Delete</button>
                                </ActionButtons>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                <button 
                    disabled={page === 1} 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button 
                    disabled={page === totalPages} 
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                >
                    Next
                </button>
            </Pagination>
        </Container>
    );
};

// Styled components
const Container = styled.div`
    padding: ${theme.spacing.large};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.large};
`;

const FiltersSection = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: ${theme.spacing.medium};
    margin-bottom: ${theme.spacing.large};
`;

const SearchInput = styled.input`
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
`;

const SelectFilter = styled.select`
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${theme.spacing.large};
    
    th, td {
        padding: ${theme.spacing.small};
        border-bottom: 1px solid ${theme.colors.lightGray};
        text-align: left;
    }
`;

const StatusToggle = styled.button`
    padding: ${theme.spacing.micro} ${theme.spacing.small};
    border: none;
    border-radius: ${theme.borderRadius.small};
    background: ${props => props.active ? theme.colors.green : theme.colors.mediumGray};
    color: white;
    cursor: pointer;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: ${theme.spacing.small};
    
    button {
        padding: ${theme.spacing.micro} ${theme.spacing.small};
        border: none;
        border-radius: ${theme.borderRadius.small};
        cursor: pointer;
        
        &:first-child {
            background: ${theme.colors.blue};
            color: white;
        }
        
        &:last-child {
            background: ${theme.colors.red};
            color: white;
        }
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${theme.spacing.medium};
    
    button {
        padding: ${theme.spacing.small};
        border: 1px solid ${theme.colors.lightGray};
        border-radius: ${theme.borderRadius.small};
        background: white;
        cursor: pointer;
        
        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
`;

const UploadButton = styled.button`
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    background: ${theme.colors.green};
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.small};
    cursor: pointer;
    
    &:hover {
        background: ${theme.colors.darkGreen};
    }
`;

const ErrorMessage = styled.div`
    color: ${theme.colors.red};
    padding: ${theme.spacing.medium};
    margin-bottom: ${theme.spacing.medium};
    background: ${theme.colors.errorLight};
    border-radius: ${theme.borderRadius.small};
`;

export default AdminDocuments;
