
import { apiRequest } from '../utils/apiUtils';

export interface Zone {
  id?: number;
  name: string;
  address: string;
  coordinates: string; // JSON string of polygon coordinates
  status: 'available' | 'unavailable';
}

// export const zonesService = {
//   getAll: () => 
//     apiRequest('/zones', { 
//       method: 'GET' 
//     }),

//   getById: (id: number) => 
//     apiRequest(`/zones/${id}`, { 
//       method: 'GET' 
//     }),

//   create: (zone: Zone) => 
//     apiRequest('/zones', { 
//       method: 'POST', 
//       body: JSON.stringify(zone) 
//     }),

//   update: (id: number, zone: Zone) => 
//     apiRequest(`/zones/${id}`, { 
//       method: 'PUT', 
//       body: JSON.stringify(zone) 
//     }),

//   delete: (id: number) => 
//     apiRequest(`/zones/${id}`, { 
//       method: 'DELETE' 
//     }),
    
//   updateStatus: (id: number, status: 'available' | 'unavailable') => 
//     apiRequest(`/zones/${id}/status`, { 
//       method: 'PATCH', 
//       body: JSON.stringify({ status }) 
//     })
// };


export const zonesService = {
  getAll: () => 
    apiRequest('zones/zones', { 
      method: 'GET' 
    }),

  create: (zone: Zone) => 
    apiRequest('zones/zones', { 
      method: 'POST', 
      body: JSON.stringify(zone) 
    }),

  update: (name: string, zone: Partial<Zone>) => 
    apiRequest(`zones/zones/${encodeURIComponent(name)}`, { 
      method: 'POST', // backend uses POST for update
      body: JSON.stringify(zone) 
    }),

  delete: (name: string) => 
    apiRequest(`zones/zones/${encodeURIComponent(name)}`, { 
      method: 'DELETE' 
    }),
};
