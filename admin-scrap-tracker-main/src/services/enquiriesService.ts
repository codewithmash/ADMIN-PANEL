
import { apiRequest } from '../utils/apiUtils';

interface Reply {
  sender: 'admin' | 'customer';
  message: string;
  timestamp: string;
}

interface Enquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  replies?: Reply[];
}

export const enquiriesService = {
  getAll: () => 
    apiRequest('enquiries/get-buyer-enquiries', { 
      method: 'GET' 
    }),

  getById: (id: string) => 
    apiRequest(`enquiries/get-buyer-enquiry/${id}`, { 
      method: 'GET' 
    }),

  updateStatus: (id: string, status: 'new' | 'in-progress' | 'resolved' | 'closed') => 
    apiRequest(`/enquiries/${id}/status`, { 
      method: 'PATCH', 
      body: JSON.stringify({ status }) 
    }),
    
  create: (enquiry: Enquiry) => 
    apiRequest('/enquiries', { 
      method: 'POST', 
      body: JSON.stringify(enquiry) 
    }),

  update: (enquiryId: string, status: Enquiry) => 
    apiRequest(`enquiries/update-buyer-enquiry-status`, { 
      method: 'POST', 
      body: JSON.stringify({"status":status,"enquiryId":enquiryId}) 
    }),

  // updateStatus: (id: string, status: 'new' | 'in-progress' | 'resolved' | 'closed') => 
  //   apiRequest(`/enquiries/${id}/status`, { 
  //     method: 'PATCH', 
  //     body: JSON.stringify({ status }) 
  //   }),

  addReply: (id: string, message: string) => 
    apiRequest(`/enquiries/${id}/replies`, { 
      method: 'POST', 
      body: JSON.stringify({ 
        message, 
        sender: 'admin' 
      }) 
    }),

  delete: (id: string) => 
    apiRequest(`/enquiries/${id}`, { 
      method: 'DELETE' 
    })
};
