import { apiRequest } from '../utils/apiUtils';

export const adminDashboardService = {
   
    getallCounts: () =>
    apiRequest(`admin/dashCounts`, {
      method: 'GET'
    }),

}