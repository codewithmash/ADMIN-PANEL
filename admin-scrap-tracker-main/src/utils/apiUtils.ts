
// Base URL for API - replace with your actual API base URL
// const API_BASE_URL = 'http://localhost:3007/';
const API_BASE_URL = 'https://147.93.98.199:3007/';



// Generic API request function
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Default headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Add authorization header if token exists in localStorage
    ...(localStorage.getItem('token') && {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };
  
  // Don't override Content-Type if FormData is being sent
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : defaultHeaders),
    ...options.headers
  };
  
  try {
    const response = await fetch(url, {
      ...options,
      headers
    });
    
    if (!response.ok) {
      // Try to parse error response as JSON
      let errorMessage = `API request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If parsing fails, use default error message
      }
      
      throw new Error(errorMessage);
    }
    
    // Check if response is empty or not JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};
