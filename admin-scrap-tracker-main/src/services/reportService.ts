// services/customersService.ts

import { apiRequest } from '../utils/apiUtils';

// interface Partner {
//   id?: number;
//   name: string;
//   email: string;
//   phoneNumber: string;
//   address: string;
//   registeredDate?: string;
// }

export const reportService = {
//   getAll: () =>
//     apiRequest('admin/scrap_analytics', {
//       method: 'GET'
//     }),

        getAll: (fromDate: string, toDate: string) =>
        apiRequest(`admin/scrap_analytics_range?fromDate=${fromDate}&toDate=${toDate}`, {
            method: 'GET'
        }),

        getScrapCustomers : (fromDate: string, toDate: string) =>
        apiRequest(`admin/user_scrap_totals?fromDate=${fromDate}&toDate=${toDate}`, {
            method: 'GET'
        }),


  
};
