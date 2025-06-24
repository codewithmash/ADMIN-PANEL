// services/adminService.ts

import { apiRequest } from '../utils/apiUtils';

interface Admin {
  email: string;
  password: string;
}

export const adminService = {
  create: (admin: Admin) =>
    apiRequest('admin/admin/create', {
      method: 'POST',
      body: JSON.stringify(admin)
    }),

  getAll: () =>
    apiRequest('admin/admin/list', {
      method: 'GET'
    }),

  delete: (email: string) =>
    apiRequest(`admin/admin/delete/${email}`, {
      method: 'DELETE'
    }),

  getByEmail: (email: string) =>
    apiRequest(`admin/admin/${email}`, {
      method: 'GET'
    }),

  updatePassword: (email: string, newPassword: string) =>
    apiRequest(`admin/admin/update`, {
      method: 'PUT',
      body: JSON.stringify({"email":email ,"newPassword":newPassword })
    })
};
