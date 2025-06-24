
import { apiRequest } from '../utils/apiUtils';

interface ScrapType {
  id?: number;
  name: string;
  description: string;
  rate: number;
}

export const scrapTypesService = {
  getAll: () => 
    apiRequest('scraps/getScrapTypes', { 
      method: 'POST' 
    }),

  getById: (id: number) => 
    apiRequest(`scraps/scrap-types/${id}`, { 
      method: 'GET' 
    }),

  // create: (scrapType) => 
  //   apiRequest('scraps/addScrapType', { 
  //     method: 'POST', 
  //     body: scrapType
  //   }),

  create: (scrapType: FormData) =>
    apiRequest('scraps/addScrapType', {
      method: 'POST',
      body: scrapType,
    }),

  update: (id: number, scrapType) => 
    apiRequest(`scraps/scrap-types/${id}`, { 
      method: 'PUT', 
      body:scrapType
    }),

  delete: (id: number) => 
    apiRequest(`scraps/scrap-types/${id}`, { 
      method: 'DELETE' 
    })
};
