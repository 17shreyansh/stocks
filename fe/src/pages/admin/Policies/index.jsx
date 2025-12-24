import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../../utils/adminAPI';
import { theme } from '../../../styles/theme';
import styled from 'styled-components';

const AdminPolicies = () => {
    const [policies, setPolicies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        fetchPolicies();
    }, []);

    const fetchPolicies = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getAdminPolicies();
            setPolicies(response.data);
        } catch (error) {
            console.error('Error fetching policies:', error);
            setError('Failed to fetch policies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleContentChange = (field, value) => {
        setPolicies(prev => ({
            ...prev,
            content: {
                ...prev.content,
                [field]: value
            }
        }));
        setIsDirty(true);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            await adminAPI.updatePolicies(policies.content);
            setIsDirty(false);
            // Show success message
        } catch (error) {
            console.error('Error updating policies:', error);
            setError('Failed to update policies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !policies) {
        return <div>Loading...</div>;
    }

    if (error && !policies) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <Container>
            <Header>
                <h1>Policies Management</h1>
                <SaveButton onClick={handleSave} disabled={!isDirty || loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </SaveButton>
            </Header>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Section>
                <h2>Header Settings</h2>
                <Input
                    type="text"
                    value={policies.content?.header?.title || ''}
                    onChange={(e) => handleContentChange('header.title', e.target.value)}
                    placeholder="Page Title"
                />
                <TextArea
                    value={policies.content?.header?.subtitle || ''}
                    onChange={(e) => handleContentChange('header.subtitle', e.target.value)}
                    placeholder="Page Subtitle"
                />
            </Section>

            <Section>
                <h2>Departments</h2>
                <DepartmentList>
                    {(policies.content?.departments || []).map((dept, index) => (
                        <DepartmentItem key={index}>
                            <Input
                                type="text"
                                value={dept}
                                onChange={(e) => {
                                    const newDepts = [...policies.content.departments];
                                    newDepts[index] = e.target.value;
                                    handleContentChange('departments', newDepts);
                                }}
                            />
                            <button onClick={() => {
                                const newDepts = policies.content.departments.filter((_, i) => i !== index);
                                handleContentChange('departments', newDepts);
                            }}>
                                Remove
                            </button>
                        </DepartmentItem>
                    ))}
                    <button onClick={() => {
                        const newDepts = [...(policies.content?.departments || []), ''];
                        handleContentChange('departments', newDepts);
                    }}>
                        Add Department
                    </button>
                </DepartmentList>
            </Section>

            <Section>
                <h2>Sort Options</h2>
                <SortOptionList>
                    {(policies.content?.sortOptions || []).map((option, index) => (
                        <SortOptionItem key={index}>
                            <Input
                                type="text"
                                value={option.label}
                                onChange={(e) => {
                                    const newOptions = [...policies.content.sortOptions];
                                    newOptions[index] = {
                                        ...newOptions[index],
                                        label: e.target.value
                                    };
                                    handleContentChange('sortOptions', newOptions);
                                }}
                                placeholder="Label"
                            />
                            <Input
                                type="text"
                                value={option.value}
                                onChange={(e) => {
                                    const newOptions = [...policies.content.sortOptions];
                                    newOptions[index] = {
                                        ...newOptions[index],
                                        value: e.target.value
                                    };
                                    handleContentChange('sortOptions', newOptions);
                                }}
                                placeholder="Value"
                            />
                            <button onClick={() => {
                                const newOptions = policies.content.sortOptions.filter((_, i) => i !== index);
                                handleContentChange('sortOptions', newOptions);
                            }}>
                                Remove
                            </button>
                        </SortOptionItem>
                    ))}
                    <button onClick={() => {
                        const newOptions = [
                            ...(policies.content?.sortOptions || []),
                            { label: '', value: '' }
                        ];
                        handleContentChange('sortOptions', newOptions);
                    }}>
                        Add Sort Option
                    </button>
                </SortOptionList>
            </Section>
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

const Section = styled.section`
    margin-bottom: ${theme.spacing.large};
    
    h2 {
        margin-bottom: ${theme.spacing.medium};
    }
`;

const Input = styled.input`
    width: 100%;
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    margin-bottom: ${theme.spacing.small};
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: ${theme.spacing.small};
    border: 1px solid ${theme.colors.lightGray};
    border-radius: ${theme.borderRadius.small};
    margin-bottom: ${theme.spacing.small};
    min-height: 100px;
`;

const SaveButton = styled.button`
    padding: ${theme.spacing.small} ${theme.spacing.medium};
    background: ${theme.colors.green};
    color: white;
    border: none;
    border-radius: ${theme.borderRadius.small};
    cursor: pointer;
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: ${theme.colors.red};
    padding: ${theme.spacing.medium};
    margin-bottom: ${theme.spacing.medium};
    background: ${theme.colors.errorLight};
    border-radius: ${theme.borderRadius.small};
`;

const DepartmentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.small};
`;

const DepartmentItem = styled.div`
    display: flex;
    gap: ${theme.spacing.small};
    
    button {
        padding: ${theme.spacing.small};
        background: ${theme.colors.red};
        color: white;
        border: none;
        border-radius: ${theme.borderRadius.small};
        cursor: pointer;
    }
`;

const SortOptionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.small};
`;

const SortOptionItem = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: ${theme.spacing.small};
    
    button {
        padding: ${theme.spacing.small};
        background: ${theme.colors.red};
        color: white;
        border: none;
        border-radius: ${theme.borderRadius.small};
        cursor: pointer;
    }
`;

export default AdminPolicies;
