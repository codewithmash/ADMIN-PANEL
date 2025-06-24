
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { 
//   Card, 
//   CardContent, 
//   CardDescription, 
//   CardHeader, 
//   CardTitle 
// } from '@/components/ui/card';
// import { blogsService } from '@/services';
// import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// const Blogs = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);

//   const { data: blogs = [], isLoading, refetch } = useQuery({
//     queryKey: ['blogs'],
//     queryFn: blogsService.getAllBlogs
//   });

//   const filteredBlogs = blogs.filter((blog: any) => 
//     blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     blog.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const confirmDelete = (id: string) => {
//     setDeleteBlogId(id);
//   };

//   const handleDelete = async () => {
//     if (!deleteBlogId) return;
    
//     try {
//       await blogsService.deleteBlog(deleteBlogId);
//       toast({
//         title: "Blog deleted",
//         description: "The blog has been successfully deleted.",
//       });
//       refetch();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete blog. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setDeleteBlogId(null);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
//           <p className="text-muted-foreground mt-2">
//             Create and manage blogs for your scrap management platform
//           </p>
//         </div>
//         <Button 
//           onClick={() => navigate('/create-blog')} 
//           className="bg-admin-primary hover:bg-blue-800"
//         >
//           <Plus className="mr-2 h-4 w-4" /> Create Blog
//         </Button>
//       </div>

//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle>All Blogs</CardTitle>
//           <CardDescription>
//             Manage your blog posts and articles
//           </CardDescription>
//           <div className="flex w-full max-w-sm items-center space-x-2 pt-4">
//             <Input
//               placeholder="Search blogs..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full"
//             />
//             <Button type="submit">
//               <Search className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="text-center py-4">Loading blogs...</div>
//           ) : filteredBlogs.length === 0 ? (
//             <div className="text-center py-4">
//               {searchQuery ? "No blogs match your search" : "No blogs created yet"}
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead>Author</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredBlogs.map((blog: any) => (
//                   <TableRow key={blog.id}>
//                     <TableCell className="font-medium">{blog.title}</TableCell>
//                     <TableCell className="max-w-xs truncate">{blog.description}</TableCell>
//                     <TableCell>{blog.authorName}</TableCell>
//                     <TableCell>{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
//                     <TableCell>
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         blog.published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
//                       }`}>
//                         {blog.published ? 'Published' : 'Draft'}
//                       </span>
//                     </TableCell>
//                     <TableCell className="text-right space-x-2">
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => navigate(`/view-blog/${blog.id}`)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => navigate(`/edit-blog/${blog.id}`)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => confirmDelete(blog.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* Confirmation Dialog for Delete */}
//       <AlertDialog open={!!deleteBlogId} onOpenChange={(open) => !open && setDeleteBlogId(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the blog post from the database.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default Blogs;



// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import { blogsService } from '@/services';
// import { Plus, Search, Edit, Trash2, Eye, Loader2 } from 'lucide-react'; // Added Loader2
// import { useToast } from '@/hooks/use-toast';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";

// // Define a type for your blog data to ensure type safety
// interface Blog {
//   id: string;
//   title: string;
//   description: string;
//   images: string[];
//   createdAt: {
//     _seconds: number;
//     _nanoseconds: number;
//   };
//   updatedAt: {
//     _seconds: number;
//     _nanoseconds: number;
//   };
// }

// const Blogs = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   // State for blogs data
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   // State for loading status
//   const [isLoading, setIsLoading] = useState(true);
//   // State for errors
//   const [error, setError] = useState<string | null>(null);
//   // State for search query
//   const [searchQuery, setSearchQuery] = useState('');
//   // State for the blog ID to be deleted (for AlertDialog)
//   const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);

//   // Function to fetch blogs
//   const fetchBlogs = async () => {
//     setIsLoading(true); // Start loading
//     setError(null);    // Clear any previous errors
//     try {
//       const response = await blogsService.getAllBlogs();
//       setBlogs(response.blogs);
//       // if (response && Array.isArray(response.blogs)) {
//       //   setBlogs(response.blogs); // Set the blogs data
//       // } else {
//       //   console.error("API response does not contain a valid 'blogs' array:", response);
//       //   setBlogs([]); // Set to empty array if response is unexpected
//       //   setError("Unexpected API response format.");
//       // }
//     } catch (err: any) {
//       console.error("Error fetching blogs:", err);
//       setError(err.response?.data?.error || "Failed to fetch blogs."); // Set error message
//       toast({
//         title: "Error",
//         description: err.response?.data?.error || "Failed to fetch blogs. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false); // End loading
//     }
//   };

//   // useEffect to call fetchBlogs on component mount
//   useEffect(() => {
//     fetchBlogs();
//   }, []); // Empty dependency array means this runs once on mount

//   // Filtered blogs based on search query
//   const filteredBlogs = blogs.filter((blog: Blog) =>
//     blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     blog.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Logging for debugging (optional, remove in production)
//   useEffect(() => {
//       console.log("Blogs Component State Update:");
//       console.log("isLoading:", isLoading);
//       console.log("error:", error);
//       console.log("blogs:", blogs);
//       console.log("filteredBlogs:", filteredBlogs);
//   }, [isLoading, error, blogs, filteredBlogs]);

//   // Function to set the ID of the blog to be deleted
//   const confirmDelete = (id: string) => {
//     setDeleteBlogId(id);
//   };

//   // Function to handle the actual deletion
//   const handleDelete = async () => {
//     if (!deleteBlogId) return;

//     try {
//       await blogsService.deleteBlog(deleteBlogId);
//       toast({
//         title: "Blog deleted",
//         description: "The blog has been successfully deleted.",
//       });
//       fetchBlogs(); // Re-fetch blogs after successful deletion
//     } catch (err: any) {
//       console.error("Error deleting blog:", err);
//       toast({
//         title: "Error",
//         description: err.response?.data?.error || "Failed to delete blog. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setDeleteBlogId(null); // Close the dialog
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
//           <p className="text-muted-foreground mt-2">
//             Create and manage blogs for your scrap management platform
//           </p>
//         </div>
//         <Button
//           onClick={() => navigate('/create-blog')}
//           className="bg-admin-primary hover:bg-blue-800"
//         >
//           <Plus className="mr-2 h-4 w-4" /> Create Blog
//         </Button>
//       </div>

//       <Card>
//         <CardHeader className="pb-3">
//           <CardTitle>All Blogs</CardTitle>
//           <CardDescription>
//             Manage your blog posts and articles
//           </CardDescription>
//           <div className="flex w-full max-w-sm items-center space-x-2 pt-4">
//             <Input
//               placeholder="Search blogs..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full"
//             />
//             <Button type="submit">
//               <Search className="h-4 w-4" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="flex justify-center items-center py-4">
//               <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading blogs...
//             </div>
//           ) : error ? (
//             <div className="text-center py-4 text-red-500">
//               Error: {error}
//             </div>
//           ) : filteredBlogs.length === 0 ? (
//             <div className="text-center py-4">
//               {searchQuery ? "No blogs match your search" : "No blogs created yet"}
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead>Created</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredBlogs.map((blog) => (
//                   <TableRow key={blog.id}>
//                     <TableCell className="font-medium">{blog.title}</TableCell>
//                     <TableCell className="max-w-xs truncate">{blog.description}</TableCell>
//                     {/* Convert Firebase timestamp to readable date */}
//                     <TableCell>{new Date(blog.createdAt._seconds * 1000).toLocaleDateString()}</TableCell>
//                     <TableCell className="text-right space-x-2">
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => navigate(`/view-blog/${blog.id}`)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => navigate(`/edit-blog/${blog.id}`)}
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         onClick={() => confirmDelete(blog.id)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* Confirmation Dialog for Delete */}
//       <AlertDialog open={!!deleteBlogId} onOpenChange={(open) => !open && setDeleteBlogId(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the blog post from the database.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default Blogs;



import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { blogsService } from '@/services';
import { Plus, Search, Edit, Trash2, Eye, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge'; // Assuming you have a Badge component

// Define a type for your blog data to ensure type safety
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

const Blogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for blogs data
  const [blogs, setBlogs] = useState<Blog[]>([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for errors
  const [error, setError] = useState<string | null>(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for the blog ID to be deleted (for AlertDialog)
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  // State to hold the currently viewed blog (for the "view" functionality)
  const [viewingBlog, setViewingBlog] = useState<Blog | null>(null);

  // Function to fetch blogs
  const fetchBlogs = async () => {
    setIsLoading(true); // Start loading
    setError(null);    // Clear any previous errors
    try {
      const response = await blogsService.getAllBlogs();
      setBlogs(response.blogs);
    } catch (err: any) {
      console.error("Error fetching blogs:", err);
      setError(err.response?.data?.error || "Failed to fetch blogs."); // Set error message
      toast({
        title: "Error",
        description: err.response?.data?.error || "Failed to fetch blogs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // useEffect to call fetchBlogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []); // Empty dependency array means this runs once on mount

  // Filtered blogs based on search query
  const filteredBlogs = blogs.filter((blog: Blog) =>
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to set the ID of the blog to be deleted
  const confirmDelete = (id: string) => {
    setDeleteBlogId(id);
  };

  // Function to handle the actual deletion
  const handleDelete = async () => {
    if (!deleteBlogId) return;

    try {
      await blogsService.deleteBlog(deleteBlogId);
      toast({
        title: "Blog deleted",
        description: "The blog has been successfully deleted.",
      });
      fetchBlogs(); // Re-fetch blogs after successful deletion
    } catch (err: any) {
      console.error("Error deleting blog:", err);
      toast({
        title: "Error",
        description: err.response?.data?.error || "Failed to delete blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteBlogId(null); // Close the dialog
    }
  };

  // Function to handle viewing a blog
  const handleViewBlog = (blogId: string) => {
    const blogToView = blogs.find(blog => blog.id === blogId);
    if (blogToView) {
      setViewingBlog(blogToView);
    } else {
      toast({
        title: "Error",
        description: "Blog not found.",
        variant: "destructive",
      });
    }
  };

  // Function to go back to the blog list
  const handleBackToList = () => {
    setViewingBlog(null);
  };

  if (viewingBlog) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="outline" onClick={handleBackToList}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
            </Button>
            <h1 className="text-3xl font-bold tracking-tight mt-4">{viewingBlog.title}</h1>
            <p className="text-muted-foreground mt-2">
              Published on: {new Date(viewingBlog.createdAt._seconds * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            {viewingBlog.images && viewingBlog.images.length > 0 && (
              <div className="mb-4">
                <img
                  src={viewingBlog.images[0]} // Display the first image
                  alt={viewingBlog.title}
                  className="w-full h-64 object-cover rounded-md"
                />
              </div>
            )}
            <p className="text-lg leading-relaxed">{viewingBlog.description}</p>
            {/* You can add more details here if your blog object has them */}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage blogs for your scrap management platform
          </p>
        </div>
        <Button
          onClick={() => navigate('/create-blog')}
          className="bg-admin-primary hover:bg-blue-800"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Blog
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Blogs</CardTitle>
          <CardDescription>
            Manage your blog posts and articles
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 pt-4">
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading blogs...
            </div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">
              Error: {error}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-4">
              {searchQuery ? "No blogs match your search" : "No blogs created yet"}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{blog.description}</TableCell>
                    {/* Convert Firebase timestamp to readable date */}
                    <TableCell>{new Date(blog.createdAt._seconds * 1000).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleViewBlog(blog.id)} // Changed to use local state
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {/* <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigate(`/edit-blog/${blog.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button> */}
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => confirmDelete(blog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog for Delete */}
      <AlertDialog open={!!deleteBlogId} onOpenChange={(open) => !open && setDeleteBlogId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Blogs;