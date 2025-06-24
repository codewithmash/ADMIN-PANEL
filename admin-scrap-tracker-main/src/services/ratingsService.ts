
import { apiRequest } from '../utils/apiUtils';

export interface Rating {
  id: number;
  customerId: string;
  customerName: string;
  partnerId: string;
  partnerName: string;
  rating: number;
  comment: string;
  date: string;
  orderId: string;
}

export const ratingsService = {
  // Get all ratings
  getAllRatings: () => 
    apiRequest('admin/partners/ratings/all', { 
      method: 'GET' 
    }),
  
  // Get ratings by partner ID
  getRatingsByPartnerId: (partnerId: string) => 
    apiRequest(`/ratings/partner/${partnerId}`, { 
      method: 'GET' 
    }),
  
  // Get ratings by customer ID
  getRatingsByCustomerId: (customerId: string) => 
    apiRequest(`/ratings/customer/${customerId}`, { 
      method: 'GET' 
    }),
  
  // Submit a new rating
  submitRating: (ratingData: Omit<Rating, 'id' | 'date'>) => 
    apiRequest('/ratings', { 
      method: 'POST',
      body: JSON.stringify(ratingData)
    }),
  
  // Update an existing rating
  updateRating: (ratingId: number, ratingData: Partial<Omit<Rating, 'id' | 'date'>>) => 
    apiRequest(`/ratings/${ratingId}`, { 
      method: 'PUT',
      body: JSON.stringify(ratingData)
    }),
  
  // Delete a rating
  deleteRating: (ratingId: number) => 
    apiRequest(`/ratings/${ratingId}`, { 
      method: 'DELETE' 
    }),
  
  // Get average rating for a partner
  // getPartnerAverageRating: (partnerId: string) => 
  //   apiRequest(`partner/getRating/${partnerId}`, { 
  //     method: 'GET' ,
  //     // body: JSON.stringify(ratingData)
  //   })

  getPartnerAverageRating: (partnerId: string) => 
  apiRequest(`partner/getRating?collectorId=${partnerId}`, { 
    method: 'GET'
  })

};
