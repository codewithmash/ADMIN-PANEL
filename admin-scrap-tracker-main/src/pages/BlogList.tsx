
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { blogsService } from '@/services';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['publishedBlogs'],
    queryFn: blogsService.getPublishedBlogs,
  });

  const filteredBlogs = blogs.filter((blog: any) => 
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-admin-primary">Scrap Management</Link>
          <div className="space-x-4">
            <Link to="/login">
              <Button className="bg-admin-primary hover:bg-blue-800">Login</Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4">Our Blog</h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8">
              Insights, updates and news about scrap management and recycling
            </p>
            
            {/* Search bar */}
            <div className="max-w-md mx-auto mb-12">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                <Button>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="text-center py-12">
              <p>Loading articles...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-4">No articles found</h2>
              <p className="text-gray-600">
                {searchQuery ? "No articles match your search" : "Check back soon for new content"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog: any) => (
                <Card key={blog.id} className="overflow-hidden flex flex-col h-full">
                  {blog.imageUrl && (
                    <div className="w-full h-48 overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {new Date(blog.createdAt).toLocaleDateString()} • {blog.authorName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <p className="text-gray-700 line-clamp-3">{blog.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/blog/${blog.slug}`}>
                      <Button variant="outline" size="sm">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Scrap Management System. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogList;
