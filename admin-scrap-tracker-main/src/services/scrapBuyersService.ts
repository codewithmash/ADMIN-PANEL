
import { apiRequest } from '../utils/apiUtils';

interface ScrapBuyer {
  id?: number;
  name: string;
  companyName: string;
  contactNumber: string;
  occupation: 'recycler' | 'individual' | 'student';
  preferredProducts: string;
  companyDetails: string;
  gstNumber: string;
}

// export const scrapBuyersService = {
//   getAll: () => 
//     apiRequest('admin/get-buyers', { 
//       method: 'GET' 
//     }),

//   getById: (id: number) => 
//     apiRequest(`/scrap-buyers/${id}`, { 
//       method: 'GET' 
//     }),

//   create: (buyer) => 
//     apiRequest('admin/add-buyer', { 
//       method: 'POST', 
//       body: buyer
//     }),

//   update: (id, buyer) => 
//     apiRequest(`/update-buyer/${id}`, { 
//       method: 'PUT', 
//       body: buyer
//     }),

//   delete: (id) => 
//     apiRequest(`admin/delete-buyer/${id}`, { 
//       method: 'DELETE' 
//     })
// };




export const scrapBuyersService = {
  getAll: () =>
    apiRequest('admin/get-buyers', {
      method: 'GET'
    }),

  getById: (id: number) =>
    apiRequest(`/scrap-buyers/${id}`, {
      method: 'GET'
    }),

  create: async (buyerData: Omit<ScrapBuyer, 'id' | 'documents'>, file: File | null) => {
    const formData = new FormData();

    // Append all form data fields
    // Ensure that buyerData keys match backend expected field names
    for (const key in buyerData) {
      // Only append if the value is not undefined or null (optional fields)
      if (buyerData[key as keyof typeof buyerData] !== undefined && buyerData[key as keyof typeof buyerData] !== null) {
        formData.append(key, buyerData[key as keyof typeof buyerData] as string | Blob); // FormData can take string or Blob (File is a Blob)
      }
    }

    // Append the file if it exists
    if (file) {
      // 'document' should match the field name your backend expects for the file upload
      formData.append('file', file);
    }

    // Pass the FormData object directly to apiRequest
    return apiRequest('admin/add-buyer', {
      method: 'POST',
      body: formData // apiRequest needs to handle FormData correctly
    });
  },

  update: async (id: number, buyerData: Omit<ScrapBuyer, 'id' | 'documents'>, file: File | null) => {
    const formData = new FormData();

    // Append all form data fields
    for (const key in buyerData) {
      if (buyerData[key as keyof typeof buyerData] !== undefined && buyerData[key as keyof typeof buyerData] !== null) {
        formData.append(key, buyerData[key as keyof typeof buyerData] as string | Blob);
      }
    }

    // Append the file if it exists.
    // For updates, consider if not providing a new file should mean keeping the old one,
    // or if a specific value (e.g., a special string) means removing it.
    if (file) {
      formData.append('file', file); // 'document' should match backend field name
    } else if (buyerData.documents === null) {
        // If the user explicitly cleared the document in the UI, you might send a flag
        formData.append('clearDocument', 'true');
    }


    // Pass the FormData object directly to apiRequest
    return apiRequest(`admin/update-buyer/${id}`, {
      method: 'PUT', // or 'PATCH' depending on your backend API design
      body: formData // apiRequest needs to handle FormData correctly
    });
  },

  delete: (id: number) =>
    apiRequest(`admin/delete-buyer/${id}`, {
      method: 'DELETE'
    })
};