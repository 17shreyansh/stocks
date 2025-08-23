// Validation utilities for admin forms

export const validatePolicy = (policy) => {
  const errors = {};
  
  if (!policy.title || !policy.title.trim()) {
    errors.title = 'Policy title is required';
  } else if (policy.title.trim().length < 3) {
    errors.title = 'Policy title must be at least 3 characters';
  } else if (policy.title.trim().length > 200) {
    errors.title = 'Policy title must be less than 200 characters';
  }
  
  if (!policy.department) {
    errors.department = 'Department is required';
  }
  
  if (policy.description && policy.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  if (policy.downloadUrl && !isValidUrl(policy.downloadUrl)) {
    errors.downloadUrl = 'Please provide a valid URL';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDocument = (document) => {
  const errors = {};
  
  if (!document.title || !document.title.trim()) {
    errors.title = 'Document title is required';
  } else if (document.title.trim().length < 3) {
    errors.title = 'Document title must be at least 3 characters';
  } else if (document.title.trim().length > 200) {
    errors.title = 'Document title must be less than 200 characters';
  }
  
  if (!document.category) {
    errors.category = 'Category is required';
  }
  
  if (document.description && document.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }
  
  if (document.downloadUrl && !isValidUrl(document.downloadUrl)) {
    errors.downloadUrl = 'Please provide a valid URL';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePageHeader = (header) => {
  const errors = {};
  
  if (!header.title || !header.title.trim()) {
    errors.title = 'Page title is required';
  } else if (header.title.trim().length < 3) {
    errors.title = 'Page title must be at least 3 characters';
  } else if (header.title.trim().length > 100) {
    errors.title = 'Page title must be less than 100 characters';
  }
  
  if (!header.subtitle || !header.subtitle.trim()) {
    errors.subtitle = 'Page subtitle is required';
  } else if (header.subtitle.trim().length < 10) {
    errors.subtitle = 'Page subtitle must be at least 10 characters';
  } else if (header.subtitle.trim().length > 300) {
    errors.subtitle = 'Page subtitle must be less than 300 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateDepartment = (department) => {
  const errors = {};
  
  if (!department || !department.trim()) {
    errors.department = 'Department name is required';
  } else if (department.trim().length < 2) {
    errors.department = 'Department name must be at least 2 characters';
  } else if (department.trim().length > 50) {
    errors.department = 'Department name must be less than 50 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateCategory = (category) => {
  const errors = {};
  
  if (!category || !category.trim()) {
    errors.category = 'Category name is required';
  } else if (category.trim().length < 2) {
    errors.category = 'Category name must be at least 2 characters';
  } else if (category.trim().length > 50) {
    errors.category = 'Category name must be less than 50 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    // Check for relative URLs
    return string.startsWith('/') || string.startsWith('./') || string.startsWith('../');
  }
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isValidFileType = (file, allowedTypes = ['application/pdf']) => {
  return allowedTypes.includes(file.type);
};

export const isValidFileSize = (file, maxSizeInMB = 10) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};