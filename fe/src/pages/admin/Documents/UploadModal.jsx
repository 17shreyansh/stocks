import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { documentAPI } from '../../../utils/api';

const UploadModal = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'KYC Forms',
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file') {
            setFormData(prev => ({ ...prev, file: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.file || !formData.title || !formData.description) {
            setError('All fields are required');
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();
            data.append('document', formData.file);
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('category', formData.category);

            await documentAPI.upload(data);
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Upload error:', error);
            setError(error.response?.data?.message || 'Error uploading document');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay>
            <ModalContent>
                <ModalHeader>
                    <h2>Upload Document</h2>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <label>Title</label>
                        <Input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter document title"
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Description</label>
                        <TextArea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter document description"
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Category</label>
                        <Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="KYC Forms">KYC Forms</option>
                            <option value="Modification Forms">Modification Forms</option>
                            <option value="Legal Documents">Legal Documents</option>
                            <option value="Corporate Forms">Corporate Forms</option>
                            <option value="Trading Forms">Trading Forms</option>
                            <option value="Support Forms">Support Forms</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
                        <label>File (All types supported)</label>
                        <FileInput
                            type="file"
                            name="file"
                            onChange={handleChange}
                        />
                        <small style={{ color: '#666', fontSize: '12px' }}>
                            All file types and sizes are supported. No limitations.
                        </small>
                    </FormGroup>

                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <ButtonGroup>
                        <CancelButton type="button" onClick={onClose} disabled={loading}>
                            Cancel
                        </CancelButton>
                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? 'Uploading...' : 'Upload Document'}
                        </SubmitButton>
                    </ButtonGroup>
                </form>
            </ModalContent>
        </ModalOverlay>
    );
};

// Styled components
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: ${theme.spacing.large};
    border-radius: ${theme.borderRadius.medium};
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.large};

    h2 {
        margin: 0;
        color: ${theme.colors.navy};
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: ${theme.colors.darkGray};
`;

const FormGroup = styled.div`
    margin-bottom: ${theme.spacing.medium};

    label {
        display: block;
        margin-bottom: ${theme.spacing.small};
        color: ${theme.colors.darkGray};
    }
`;

const Input = styled.input`
    width: 100%;
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    font-size: ${theme.typography.fontSize.body};
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    font-size: ${theme.typography.fontSize.body};
    min-height: 100px;
`;

const Select = styled.select`
    width: 100%;
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    font-size: ${theme.typography.fontSize.body};
`;

const FileInput = styled.input`
    width: 100%;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacing.medium};
    margin-top: ${theme.spacing.large};
`;

const Button = styled.button`
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    border-radius: ${theme.borderRadius.small};
    font-size: ${theme.typography.fontSize.body};
    cursor: pointer;
    transition: ${theme.transitions.fast};

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const CancelButton = styled(Button)`
    background: white;
    border: 1px solid ${theme.colors.lightGray};
    color: ${theme.colors.darkGray};

    &:hover:not(:disabled) {
        background: ${theme.colors.lightGray};
    }
`;

const SubmitButton = styled(Button)`
    background: ${theme.colors.green};
    border: none;
    color: white;

    &:hover:not(:disabled) {
        background: ${theme.colors.darkGreen};
    }
`;

const ErrorMessage = styled.div`
    color: ${theme.colors.red};
    padding: ${theme.spacing.small};
    margin-bottom: ${theme.spacing.medium};
    background: ${theme.colors.errorLight};
    border-radius: ${theme.borderRadius.small};
`;

export default UploadModal;
