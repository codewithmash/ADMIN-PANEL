
import { apiRequest } from '../utils/apiUtils';

export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName: string;
  published: boolean;
  slug: string;
}

export interface CreateBlogInput {
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  published?: boolean;
}

export interface UpdateBlogInput {
  title?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  published?: boolean;
}

export const blogsService = {
  // Get all blogs
  getAllBlogs: () => 
    apiRequest('blogs/blogs', { 
      method: 'GET' 
    }),
  
  // Get published blogs (for public viewing)
  getPublishedBlogs: () => 
    apiRequest('blogs/blogs', { 
      method: 'GET' 
    }),
  
  // Get blog by ID
  getBlogById: (id: string) => 
    apiRequest(`blogs/blogs/${id}`, { 
      method: 'GET' 
    }),

  // Get blog by slug
  getBlogBySlug: (slug: string) => 
    apiRequest(`/blogs/slug/${slug}`, { 
      method: 'GET' 
    }),
  
  // Create a new blog
  // createBlog: (blogData: CreateBlogInput) => 
  //   apiRequest('blogs/blogs', { 
  //     method: 'POST',
  //     body: JSON.stringify(blogData)
  //   }),

  createBlog: (blogData: FormData) =>
    apiRequest('blogs/blogs', {
      method: 'POST',
      body: blogData, // Pass the FormData object directly
      // Do NOT set 'Content-Type': 'application/json' here.
      // If apiRequest automatically adds JSON headers, you'll need
      // to modify apiRequest to conditionally add them or provide an option to override.
    }),

  
  // Update an existing blog
  updateBlog: (id: string, blogData: UpdateBlogInput) => 
    apiRequest(`/blogs/${id}`, { 
      method: 'PUT',
      body: JSON.stringify(blogData)
    }),
  
  // Delete a blog
  deleteBlog: (id: string) => 
    apiRequest(`blogs/blogs/${id}`, { 
      method: 'DELETE' 
    }),
  
  // Upload blog image
  uploadBlogImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return apiRequest('/blogs/upload-image', {
      method: 'POST',
      body: formData,
      // Content-Type header will be set automatically for FormData
    });
  },
  
  // Publish a blog
  publishBlog: (id: string) => 
    apiRequest(`/blogs/${id}/publish`, { 
      method: 'PUT' 
    }),
  
  // Unpublish a blog
  unpublishBlog: (id: string) => 
    apiRequest(`/blogs/${id}/unpublish`, { 
      method: 'PUT' 
    })
};
