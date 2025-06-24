

import { apiRequest } from '../utils/apiUtils';




export const storesService = {
  getAll: () =>
    apiRequest('admin/store/all', {
      method: 'GET',
    }),

  create: (storeData: {
    store_name: string;
    store_address: string;
    latitude: number;
    longitude: number;
  }) =>
    apiRequest('admin/store/add', {
      method: 'POST',
      body: JSON.stringify(storeData),
    }),

  update: (
    id: string,
    storeData: {
      store_name: string;
      store_address: string;
      latitude: number;
      longitude: number;
    }
  ) =>
    apiRequest(`admin/store/edit/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify(storeData),
    }),

  delete: (id: string) =>
    apiRequest(`admin/store/delete/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),

  toggleStatus: (id: string) =>
    apiRequest(`admin/store/toggle/${encodeURIComponent(id)}`, {
      method: 'PATCH',
    }),
};


