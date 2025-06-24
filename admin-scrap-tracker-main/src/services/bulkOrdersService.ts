
import { apiRequest } from '../utils/apiUtils';

interface BulkOrder {
  id?: number;
  customerName: string;
  companyName: string;
  contactNumber: string;
  email: string;
  approxWeight: string;
  scrapOrigin: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
}
export const bulkOrdersService = {
  // GET all bulk enquiries
  getAll: () => 
    apiRequest('enquiries/get-bulk-enquiries', {
      method: 'GET'
    }),

  // POST to create new bulk enquiry with file (multipart/form-data)
  create: (formData: FormData) => 
    apiRequest('enquiries/submit-bulk-enquiry', {
      method: 'POST',
      body: formData,
      isFormData: true
    }),

  // POST to update the status of a bulk enquiry
  updateStatus: (
    enquiryId: string, 
    status: 'pending' | 'approved' | 'rejected'
  ) => 
    apiRequest('enquiries/update-bulk-enquiry-status', {
      method: 'POST',
      body: JSON.stringify({ enquiryId, status })
    }),

  // POST to delete a bulk enquiry using enquiryId
  delete: (enquiryId: string) => 
    apiRequest('enquiries/delete-bulk-enquiry', {
      method: 'POST',
      body: JSON.stringify({ enquiryId })
    })
};
