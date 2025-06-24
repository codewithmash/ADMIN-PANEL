// services/customersService.ts

import { apiRequest } from '../utils/apiUtils';

interface Partner {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  registeredDate?: string;
}

export const partnerService = {
  getAll: () =>
    apiRequest('admin/partners', {
      method: 'GET'
    }),

   approveRejectPartner: (data) =>
    apiRequest('admin/approve-partner', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

    updatePartner: (partnerId, formData) =>
  apiRequest(`admin/update-partner/${partnerId}`, {
    method: 'POST',
    body: formData
  }),

    deletePartner: (id) =>
    apiRequest(`admin/delete-partner/${id}`, {
      method: 'DELETE'
    }),


  getById: (id: number) =>
    apiRequest(`/customers/${id}`, {
      method: 'GET'
    }),

  create: (customer: Customer) =>
    apiRequest('/customers', {
      method: 'POST',
      body: JSON.stringify(customer)
    }),

  update: (id: number, customer: Customer) =>
    apiRequest(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer)
    }),

  
};
