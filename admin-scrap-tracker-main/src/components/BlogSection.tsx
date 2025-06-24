
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { blogsService } from '@/services';
import { ArrowRight } from 'lucide-react';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['publishedBlogs'],
    queryFn: blogsService.getPublishedBlogs,
  });

  useEffect(() => {
    if (data) {
      // Show only the first 3 blogs on homepage
      setBlogs(data.blogs.slice(0, 3));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p>Loading recent blogs...</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest From Our Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest trends and insights in the scrap management industry
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
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
                  {new Date(blog.createdAt._seconds * 1000).toLocaleDateString()} 
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4 flex-grow">
                <p className="text-gray-700 line-clamp-3">{blog.description}</p>
              </CardContent>
              <CardFooter>
                <Link to={`/blog/${blog.id}`}>
                  <Button variant="outline" size="sm">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/blogs">
            <Button className="bg-admin-primary hover:bg-blue-800">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
