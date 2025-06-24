
import { apiRequest } from '../utils/apiUtils';

interface CustomerOrder {
  id?: number;
  customerName: string;
  address: string;
  contactNumber: string;
  email: string;
  orderItems: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export const customerOrdersService = {
  getAll: () => 
    apiRequest('orders/orders', { 
      method: 'GET' 
    }),

   approveOrder: (data) => 
    apiRequest('orders/approve_order', { 
      method: 'POST',
      body: JSON.stringify(data)  
    }),


    rejectOrder: (data) => 
    apiRequest('orders/reject_order', { 
      method: 'POST',
      body: JSON.stringify(data)  
    }),

  getById: (id: number) => 
    apiRequest(`/customer-orders/${id}`, { 
      method: 'GET' 
    }),

  create: (order: CustomerOrder) => 
    apiRequest('/customer-orders', {
      method: 'POST', 
      body: JSON.stringify(order) 
    }),

    updateOrderStatus : (data) => 
      apiRequest(`orders/update_order_status`, { 
      method: 'POST' ,
      body: JSON.stringify(data)  
    }),

  update: (id: number, order: CustomerOrder) => 
    apiRequest(`/customer-orders/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(order) 
    }),

  delete: (id: number) => 
    apiRequest(`/customer-orders/${id}`, { 
      method: 'DELETE' 
    }),
    
  updateStatus: (id: number, status: 'pending' | 'processing' | 'completed' | 'cancelled') => 
    apiRequest(`/customer-orders/${id}/status`, { 
      method: 'PATCH', 
      body: JSON.stringify({ status }) 
    })
};
