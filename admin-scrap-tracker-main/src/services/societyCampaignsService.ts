
import { apiRequest } from '../utils/apiUtils';

interface Campaign {
  id?: number;
  apartmentName: string;
  inchargePerson: string;
  contactNumber: string;
  email: string;
  address: string;
  campaignDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const societyCampaignsService = {
  // Get all enquiries
  getAll: () => 
    apiRequest('enquiries/getEnquiries', { 
      method: 'GET' 
    }),

  // Add a new enquiry
  create: (data) => 
    apiRequest('enquiries/addEnquiry', { 
      method: 'POST', 
      body: JSON.stringify(data) // no need to wrap in { data }
    }),

  // Approve or reject an enquiry (status update)
  approveOrReject: (enquiryId, statusPayload) =>
    apiRequest(`enquiries/updateEnquiryStatus/${enquiryId}`, {
      method: 'POST',
      body: JSON.stringify(statusPayload)
    }),

  // Update only the location of an enquiry
  updateLocation: (enquiryId, locationPayload) =>
    apiRequest(`enquiries/updateEnquiryLocation/${enquiryId}`, {
      method: 'POST',
      body: JSON.stringify(locationPayload)
    }),

  // Delete enquiry using custom enquiryId
  delete: (enquiryId) =>
    apiRequest('enquiries/delete-enquiry', {
      method: 'POST',
      body: JSON.stringify({ enquiryId })
    }),
};
