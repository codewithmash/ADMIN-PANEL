
import { apiRequest } from '../utils/apiUtils';

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface OtpCredentials {
  phone: string;
  otp: string;
}

export interface PartnerRegistrationData {
  name: string;
  phone: string;
  vehicleType: string;
  gender: string;
  education: string;
  locality: string;
  languages: string;
  emergencyContact: string;
  // Optional fields that might be set later
  documents?: Record<string, string>; // URLs to uploaded documents
  testAnswers?: Record<string, string>; // Answers to qualification test
}

export interface PasswordChangeData {
  email: string;
  password: string;
}

export const authService = {
  // Admin/User Login with email/password
  login: (credentials: LoginCredentials) => 
    apiRequest('admin/adminLogin', { 
      method: 'POST', 
      body: JSON.stringify(credentials) 
    }),
    

  // Partner Login with phone/OTP
  partnerLogin: (credentials: OtpCredentials) => 
    apiRequest('/auth/partner-login', { 
      method: 'POST', 
      body: JSON.stringify(credentials) 
    }),

  // Admin/User Logout
  logout: () => 
    apiRequest('/auth/logout', { 
      method: 'POST' 
    }),

  // Send OTP for partner login
  sendOtp: (phone: string) =>
    apiRequest('partner/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber: phone } )
    }),

  // Validate OTP
  validateOtp: (phone: string, otp: string | number) =>
    apiRequest(`/auth/validate-otp?phone=${encodeURIComponent(phone)}&otp=${encodeURIComponent(otp)}`, {
      method: 'GET'
    }),

  // Register new partner
  registerPartner: (data: PartnerRegistrationData) =>
    apiRequest('partner/signup', {
      method: 'POST',
      body: data
    }),
    
  // Upload partner documents
  uploadPartnerDocuments: (partnerId: string, documentType: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiRequest(`/auth/partner/${partnerId}/documents/${documentType}`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header as it will be set automatically with boundary
    });
  },

  // Check if all required partner documents exist
  checkPartnerDocuments: (partnerId: string) =>
    apiRequest(`/auth/partner/${partnerId}/documents/check`, {
      method: 'GET'
    }),

  // Get qualification test questions
  getQualificationTest: () =>
    apiRequest('/auth/qualification-test', {
      method: 'GET'
    }),

  // Submit partner qualification test
  submitQualificationTest: (partnerId: string, answers: Record<string, string>) =>
    apiRequest(`/auth/partner/${partnerId}/qualification-test`, {
      method: 'POST',
      body: JSON.stringify({ answers })
    }),
  
  // Change password for any user type
  changePassword: (data: PasswordChangeData) =>
    apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  // Verify auth token
  verifyToken: () => 
    apiRequest('/auth/verify', { 
      method: 'GET' 
    }),
    
  // Admin approves partner
  approvePartner: (partnerId: string) =>
    apiRequest(`/auth/partner/${partnerId}/approve`, {
      method: 'PUT'
    }),
    
  // Get partner approval status
  getPartnerStatus: (partnerId: string) =>
    apiRequest(`/auth/partner/${partnerId}/status`, {
      method: 'GET'
    })
};
