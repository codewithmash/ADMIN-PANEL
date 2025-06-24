import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogsService } from '@/services';
import { ArrowLeft } from 'lucide-react'; // Import ArrowLeft for back button

const BlogDetailPage = () => {
  const { blogId } = useParams(); // Get the 'blogId' from the URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate

  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey: ['blog', blogId], // Query key includes blogId to re-fetch if ID changes
    // queryFn: () => blogsService.getBlogById(blogId),
    queryFn: async () => { // Make queryFn async if not already
      const response = await blogsService.getBlogById(blogId);
      // Assuming response looks like: { blog: { id: '...', title: '...', ... }, message: '...' }
      // We want to return just the 'blog' object for use in the component
      return response.blog; // Extract the 'blog' property from the response
    },
    enabled: !!blogId, // Only run the query if blogId is available
  });

  if (isLoading) {
    return (
      <div className="text-center py-24">
        <p className="text-xl text-gray-700">Loading blog details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24 text-red-600">
        <p className="text-xl">Error loading blog: {error.message}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-24">
        <p className="text-xl text-gray-700">Blog not found.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
          </Button>
        </div>

        <Card className="p-6 md:p-8 shadow-lg">
          <CardHeader className="p-0 mb-6">
            {blog.images && blog.images.length > 0 && (
              <div className="w-full h-80 md:h-96 overflow-hidden rounded-lg mb-6">
                <img
                  src={blog.images[0]}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardTitle className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              {blog.title}
            </CardTitle>
            <CardDescription className="text-md text-gray-600">
              Published on: {new Date(blog.createdAt._seconds * 1000).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 text-lg leading-relaxed text-gray-800 prose prose-lg max-w-none">
            {/* Render the full description/content here */}
            {/* IMPORTANT: If blog.description contains HTML, you must sanitize it
                         and use dangerouslySetInnerHTML for security.
                         Example: <div dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
                         For now, assuming plain text. */}
            <p className="whitespace-pre-wrap">{blog.description}</p> {/* Use whitespace-pre-wrap for line breaks */}

            {/* If your blog data has a dedicated field for full content, e.g., blog.fullContent,
                use that here. */}
            {/* <div dangerouslySetInnerHTML={{ __html: blog.fullContent || blog.description }} /> */}
          </CardContent>
          {/* No CardFooter needed here as the content is displayed */}
        </Card>
      </div>
    </section>
  );
};

export default BlogDetailPage;