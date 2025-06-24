// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { blogsService } from '@/services';
// import { ArrowRight } from 'lucide-react';

// const AllBlogsPage = () => {
//   const [blogs, setBlogs] = useState([]);

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['allPublishedBlogs'],
//     queryFn: blogsService.getPublishedBlogs,
//   });

//   useEffect(() => {
//     if (data) {
//       setBlogs(data.blogs);
//     }
//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="text-center py-12">
//         <p>Loading all blogs...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="text-center py-12 text-red-600">
//         <p>Error loading blogs: {error.message}</p>
//       </div>
//     );
//   }

//   if (!blogs || blogs.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p>No blogs found.</p>
//       </div>
//     );
//   }

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">All Articles</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Explore all our articles for in-depth information and insights.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {blogs.map((blog) => (
//             <Card key={blog.id} className="overflow-hidden flex flex-col h-full">
//               {blog.images && blog.images.length > 0 && (
//                 <div className="w-full h-48 overflow-hidden">
//                   <img
//                     src={blog.images[0]} // Display the first image
//                     alt={blog.title}
//                     className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                   />
//                 </div>
//               )}
//               <CardHeader className="pb-4">
//                 <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
//                 <CardDescription className="text-xs">
//                   {new Date(blog.createdAt._seconds * 1000).toLocaleDateString()}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="pb-4 flex-grow">
//                 <p className="text-gray-700 line-clamp-3">{blog.description}</p>
//               </CardContent>
//               <CardFooter>
//                 <Link to={`/blog/${blog.id}`}> {/* Assuming slug is 'id' based on provided data structure */}
//                   <Button variant="outline" size="sm">
//                     Read More <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AllBlogsPage;



// import { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { blogsService } from '@/services';
// import { ArrowRight, XCircle } from 'lucide-react'; // Import XCircle for close button

// const AllBlogsPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [selectedBlogId, setSelectedBlogId] = useState(null); // State to store the ID of the blog to display fully

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['allPublishedBlogs'],
//     queryFn: blogsService.getPublishedBlogs,
//   });

//   useEffect(() => {
//     if (data) {
//       setBlogs(data.blogs);
//     }
//   }, [data]);

//   if (isLoading) {
//     return (
//       <div className="text-center py-12">
//         <p>Loading all blogs...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="text-center py-12 text-red-600">
//         <p>Error loading blogs: {error.message}</p>
//       </div>
//     );
//   }

//   if (!blogs || blogs.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <p>No blogs found.</p>
//       </div>
//     );
//   }

//   // Find the selected blog if an ID is present in state
//   const selectedBlog = selectedBlogId ? blogs.find(blog => blog.id === selectedBlogId) : null;

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             {selectedBlogId ? "Blog Details" : "All Articles"}
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             {selectedBlogId
//               ? "Read the full article below."
//               : "Explore all our articles for in-depth information and insights."
//             }
//           </p>
//         </div>

//         {selectedBlogId && selectedBlog ? (
//           // Display full blog details
//           <Card className="max-w-3xl mx-auto mb-8">
//             <CardHeader className="relative pb-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => setSelectedBlogId(null)}
//                 className="absolute top-4 right-4 z-10"
//               >
//                 <XCircle className="h-6 w-6 text-gray-500 hover:text-gray-700" />
//               </Button>
//               {selectedBlog.images && selectedBlog.images.length > 0 && (
//                 <div className="w-full h-64 overflow-hidden rounded-md mb-4">
//                   <img
//                     src={selectedBlog.images[0]}
//                     alt={selectedBlog.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               )}
//               <CardTitle className="text-3xl font-bold mb-2">{selectedBlog.title}</CardTitle>
//               <CardDescription className="text-sm text-gray-500">
//                 Published on: {new Date(selectedBlog.createdAt._seconds * 1000).toLocaleDateString()}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="prose max-w-none text-gray-800">
//               {/* This is where the full content goes.
//                   Assuming 'description' holds the full content.
//                   If your API returns a separate 'content' field for full blog post, use that here.
//                   You might need a library like 'dompurify' if rendering HTML directly from API.
//               */}
//               <p>{selectedBlog.description}</p>
//               {/* If you have more detailed content, e.g., blog.fullContent, render it here */}
//               {/* Example: <div dangerouslySetInnerHTML={{ __html: selectedBlog.fullContent }} /> */}
//             </CardContent>
//             <CardFooter className="pt-4">
//               <Button onClick={() => setSelectedBlogId(null)}>
//                 <ArrowRight className="rotate-180 mr-2 h-4 w-4" /> Back to Articles
//               </Button>
//             </CardFooter>
//           </Card>
//         ) : (
//           // Display blog cards in a grid
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogs.map((blog) => (
//               <Card key={blog.id} className="overflow-hidden flex flex-col h-full">
//                 {blog.images && blog.images.length > 0 && (
//                   <div className="w-full h-48 overflow-hidden">
//                     <img
//                       src={blog.images[0]}
//                       alt={blog.title}
//                       className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                   </div>
//                 )}
//                 <CardHeader className="pb-4">
//                   <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
//                   <CardDescription className="text-xs">
//                     {new Date(blog.createdAt._seconds * 1000).toLocaleDateString()}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="pb-4 flex-grow">
//                   <p className="text-gray-700 line-clamp-3">{blog.description}</p>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline" size="sm" onClick={() => setSelectedBlogId(blog.id)}>
//                     Read More <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </CardFooter>
//               </Card>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default AllBlogsPage;




import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogsService } from '@/services';
import { ArrowRight, XCircle, Home } from 'lucide-react'; // Import Home icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allPublishedBlogs'],
    queryFn: blogsService.getPublishedBlogs,
  });

  useEffect(() => {
    if (data) {
      setBlogs(data.blogs);
    }
  }, [data]);

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page (adjust the path if your home route is different)
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>Loading all blogs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Error loading blogs: {error.message}</p>
        <Button onClick={handleGoHome} className="mt-4">
          <Home className="mr-2 h-4 w-4" /> Go to Home Page
        </Button>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-12">
        <p>No blogs found.</p>
        <Button onClick={handleGoHome} className="mt-4">
          <Home className="mr-2 h-4 w-4" /> Go to Home Page
        </Button>
      </div>
    );
  }

  const selectedBlog = selectedBlogId ? blogs.find(blog => blog.id === selectedBlogId) : null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {selectedBlogId ? "Blog Details" : "All Articles"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {selectedBlogId
              ? "Read the full article below."
              : "Explore all our articles for in-depth information and insights."
            }
          </p>
          {/* Add Go to Home Page button here when displaying all articles */}
          {!selectedBlogId && (
            <Button onClick={handleGoHome} className="mt-6">
              <Home className="mr-2 h-4 w-4" /> Go to Home Page
            </Button>
          )}
        </div>

        {selectedBlogId && selectedBlog ? (
          // Display full blog details
          <Card className="max-w-3xl mx-auto mb-8">
            <CardHeader className="relative pb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedBlogId(null)}
                className="absolute top-4 right-4 z-10"
              >
                <XCircle className="h-6 w-6 text-gray-500 hover:text-gray-700" />
              </Button>
              {selectedBlog.images && selectedBlog.images.length > 0 && (
                <div className="w-full h-64 overflow-hidden rounded-md mb-4">
                  <img
                    src={selectedBlog.images[0]}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardTitle className="text-3xl font-bold mb-2">{selectedBlog.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500">
                Published on: {new Date(selectedBlog.createdAt._seconds * 1000).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none text-gray-800">
              <p>{selectedBlog.description}</p>
            </CardContent>
            <CardFooter className="pt-4 flex justify-between items-center"> {/* Added flex and justify-between */}
              <Button onClick={() => setSelectedBlogId(null)}>
                <ArrowRight className="rotate-180 mr-2 h-4 w-4" /> Back to Articles
              </Button>
              <Button onClick={handleGoHome}> {/* Added Go to Home Page button */}
                <Home className="mr-2 h-4 w-4" /> Go to Home Page
              </Button>
            </CardFooter>
          </Card>
        ) : (
          // Display blog cards in a grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden flex flex-col h-full">
                {blog.images && blog.images.length > 0 && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={blog.images[0]}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {new Date(blog.createdAt._seconds * 1000).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4 flex-grow">
                  <p className="text-gray-700 line-clamp-3">{blog.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" onClick={() => setSelectedBlogId(blog.id)}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllBlogsPage;