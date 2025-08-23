// Error handling utilities

export const handleApiError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return data.message || data.error || 'Invalid request';
      case 401:
        return 'Authentication required. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'A conflict occurred. The resource may already exist.';
      case 422:
        return 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return data.message || data.error || defaultMessage;
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection and try again.';
  } else {
    // Other error
    return error.message || defaultMessage;
  }
};

export const handleUploadError = (error) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return 'File size too large. Maximum size is 10MB.';
  } else if (error.code === 'LIMIT_FILE_COUNT') {
    return 'Too many files. Please upload one file at a time.';
  } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return 'Unexpected file field. Please use the correct upload form.';
  } else if (error.message && error.message.includes('Only PDF files')) {
    return 'Only PDF files are allowed.';
  } else {
    return handleApiError(error, 'File upload failed');
  }
};

export const showErrorNotification = (message, duration = 5000) => {
  console.error('Error:', message);
  // Integration point for notification systems
};

export const showSuccessNotification = (message, duration = 3000) => {
  console.log('Success:', message);
  // Integration point for notification systems
};

export const validateResponse = (response) => {
  if (!response) {
    throw new Error('No response received');
  }
  
  if (!response.data) {
    throw new Error('No data in response');
  }
  
  return response.data;
};

export const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

export const createErrorBoundary = (component) => {
  // Error boundary factory - returns class component definition
  // Note: This should be used in a .jsx file for proper JSX support
  return {
    displayName: 'ErrorBoundary',
    getInitialState: () => ({ hasError: false, error: null }),
    handleError: (error) => ({ hasError: true, error }),
    render: function(hasError, children) {
      if (hasError) {
        return 'Error occurred. Please refresh the page.';
      }
      return children;
    }
  };
};