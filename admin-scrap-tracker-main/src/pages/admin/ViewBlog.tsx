
// import { useParams, useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { blogsService } from '@/services';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Edit, Loader2, ArrowLeft } from 'lucide-react';

// const ViewBlog = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
  
//   const { data: blog, isLoading } = useQuery({
//     queryKey: ['blog', id],
//     queryFn: () => blogsService.getBlogById(id as string),
//     enabled: !!id,
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="text-center py-8">
//         <h2 className="text-2xl font-bold">Blog not found</h2>
//         <p className="text-muted-foreground mt-2">
//           The blog you're looking for doesn't exist or has been removed.
//         </p>
//         <Button 
//           onClick={() => navigate('/blogs')}
//           className="mt-4"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Blogs
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">{blog.title}</h1>
//           <p className="text-muted-foreground mt-2">
//             Published on {new Date(blog.createdAt).toLocaleDateString()} by {blog.authorName}
//           </p>
//         </div>
//         <div className="flex gap-2">
//           <Button 
//             variant="outline"
//             onClick={() => navigate('/blogs')}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back
//           </Button>
//           <Button 
//             onClick={() => navigate(`/edit-blog/${id}`)}
//             className="bg-admin-primary hover:bg-blue-800"
//           >
//             <Edit className="mr-2 h-4 w-4" />
//             Edit
//           </Button>
//         </div>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardDescription>
//             {blog.description}
//           </CardDescription>
//         </CardHeader>
//         {blog.imageUrl && (
//           <div className="px-6">
//             <img 
//               src={blog.imageUrl} 
//               alt={blog.title} 
//               className="w-full h-auto max-h-96 object-cover rounded-md"
//             />
//           </div>
//         )}
//         <CardContent className="pt-6">
//           <div className="prose max-w-none">
//             {blog.content}
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between border-t pt-6">
//           <div className="text-sm text-muted-foreground">
//             Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
//           </div>
//           <div className={`px-3 py-1 rounded-full text-xs ${
//             blog.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
//           }`}>
//             {blog.published ? 'Published' : 'Draft'}
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default ViewBlog;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogsService } from '@/services'; // Ensure this path is correct
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define a type for your blog data to ensure type safety (re-used from Blogs.tsx)
interface Blog {
  id: string;
  title: string;
  description: string;
  images: string[];
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  updatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

const ViewBlog = () => {
  const { id } = useParams<{ id: string }>(); // Get blog ID from URL
  const navigate = useNavigate();
  const { toast } = useToast();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) {
        setError("Blog ID is missing in the URL.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const response = await blogsService.getBlogById(id);
        // Assuming response.blog is the single Blog object
        if (response && response.blog) {
          setBlog(response.blog);
        } else {
          setError("Blog not found or unexpected response format.");
          setBlog(null);
        }
      } catch (err: any) {
        console.error("Error fetching blog details:", err);
        setError(err.response?.data?.error || "Failed to fetch blog details.");
        toast({
          title: "Error",
          description: err.response?.data?.error || "Failed to fetch blog details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, toast]); // Re-fetch if 'id' changes or toast context changes

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading blog details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
        <p>Error: {error}</p>
        <Button onClick={() => navigate('/blogs')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Blog not found.</p>
        <Button onClick={() => navigate('/blogs')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6"> {/* Added some padding */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/blogs')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Details</h1>
          <p className="text-muted-foreground mt-2">Detailed information about the blog post</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>Created: {new Date(blog.createdAt._seconds * 1000).toLocaleDateString()}</CardDescription>
          {blog.updatedAt && (
            <CardDescription>Last Updated: {new Date(blog.updatedAt._seconds * 1000).toLocaleDateString()}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Description:</h3>
            <p>{blog.description}</p>
          </div>
          {blog.images && blog.images.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Images:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {blog.images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Blog image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewBlog;