// services/customersService.ts

import { apiRequest } from '../utils/apiUtils';

interface Customer {
  id?: number;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  registeredDate?: string;
}

export const customersService = {
  getAll: () =>
    apiRequest('admin/users', {
      method: 'POST'
    }),

  delete: (email) =>
    apiRequest(`admin/users/${email}`, {
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
