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

export const partnerDashboardService = {
  getAll: () =>
    apiRequest('admin/partners', {
      method: 'GET'
    }),

   approveRejectPartner: (data) =>
    apiRequest('admin/approve-partner', {
      method: 'POST',
      body: JSON.stringify(data)
    }),


  getById: (id: number) =>
    apiRequest(`partner/partner?partnerId = ${id}`, {
      method: 'GET'
    }),

    getPickupCount: (id: number) =>
    apiRequest(`partner/count/${id}`, {
      method: 'GET'
    }),


    // getCompletedPickups: (id) =>
    // apiRequest(`partner/getCompletedPickups/${id}`, {
    //   method: 'GET'
    // }),


    getCompletedPickups: (id) =>
      apiRequest(`partner/getCompletedPickups?collectorId=${id}`, {
        method: 'GET'
      }),

    getTodayPickup: (id: number) =>
    apiRequest(`partner/today/${id}`, {
      method: 'GET'
    }),

    
getPartnerById: (partnerId: string) =>
  apiRequest(`partner/partner/${partnerId}`, {
    method: 'GET'
  }),



    getOurForPickup: (id: number) =>
  apiRequest(`partner/getOutForPickups?collectorId=${id}`, {
    method: 'GET'
  }),

   getPartnerStatus: (phone: string) =>
  apiRequest(`partner/partner-status?partnerPhone=${encodeURIComponent(phone)}`, {
    method: 'GET'
  }),

  getPartnerOrders: (phone) =>
  apiRequest(`partner/Porders?collectorId=${phone}`, {
    method: 'GET'
  }),


  updatePartner: (id: string, partnerData: Partial<Partner>) =>
  apiRequest(`partner/${id}`, {
    method: 'PUT',
    body: JSON.stringify(partnerData),
    headers: {
      'Content-Type': 'application/json'
    }
  }),

  // getPartnerOrders: (phone) =>
  // apiRequest(`partner/Porders`, {
  //   method: 'GET'
  // }),


  // reschedulePartnerPickup: (collectorId: string, orderId: string, newPickupDate: string) =>
  // apiRequest('partner/reschedulePartnerPickup', {
  //   method: 'PATCH',
  //   body: {
  //     collectorId,
  //     orderId,
  //     newPickupDate,
  //   },
  // }),



  reschedulePartnerPickup: (collectorId: string, orderId: string, newPickupDate: string) =>
  apiRequest('partner/reschedulePartnerPickup', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      collectorId,
      orderId,
      newPickupDate,
    }),
  }),


  markPickupReady: (collectorId: string, orderId: string) =>
  apiRequest('partner/markPickupReady', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collectorId, orderId }),
  }),

  updateStatus: (formData) => 
  apiRequest('partner/updatePartnerOrderStatus', {
    method: 'PATCH',
    body: formData,
    // Do not set 'Content-Type' manually for FormData
  }),

  cancelPartnerOrder: (formData) =>
  apiRequest('partner/cancel-partner-order', {
    method: 'POST',
    body: formData,
    // Don't set 'Content-Type'; let the browser set it for FormData
  }),

  addItemToPartnerOrder: (formData) =>
  apiRequest('partner/partners_orders/add_items_to_order', {
    method: 'POST',
    body: formData,
    // Note: DO NOT set 'Content-Type' — browser handles it for FormData
  }),


  updatePartnerBankDetails: (id: string, bankDetails) =>
  apiRequest(`partner/${id}/bank-details`, {
    method: 'PUT',
    body: JSON.stringify({ bankDetails }),
    headers: {
      'Content-Type': 'application/json'
    }
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

  delete: (id: number) =>
    apiRequest(`/customers/${id}`, {
      method: 'DELETE'
    })
};
