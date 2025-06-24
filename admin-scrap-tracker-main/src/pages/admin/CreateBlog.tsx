
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { blogsService } from '@/services';
// import { useToast } from '@/hooks/use-toast';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Switch } from '@/components/ui/switch';
// import { useAuth } from '@/context/AuthContext';
// import { Image, Loader2 } from 'lucide-react';

// const CreateBlog = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const { user } = useAuth();
  
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [content, setContent] = useState('');
//   const [isPublished, setIsPublished] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0];
//       setImage(selectedFile);
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImagePreview(event.target?.result as string);
//       };
//       reader.readAsDataURL(selectedFile);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!title || !description || !content) {
//       toast({
//         title: "Missing fields",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       });
//       return;
//     }
    
//     setIsSubmitting(true);
    
//     try {
//       // First upload the image if available
//       let imageUrl = '';
//       if (image) {
//         const imageResponse = await blogsService.uploadBlogImage(image);
//         imageUrl = imageResponse.url;
//       }
      
//       // Then create the blog
//       await blogsService.createBlog({
//         title,
//         description,
//         content,
//         imageUrl,
//         published: isPublished
//       });
      
//       toast({
//         title: "Blog created",
//         description: "Your blog has been created successfully.",
//       });
      
//       navigate('/blogs');
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to create blog. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Create New Blog</h1>
//         <p className="text-muted-foreground mt-2">
//           Create a new blog post for your scrap management platform
//         </p>
//       </div>

//       <Card>
//         <form onSubmit={handleSubmit}>
//           <CardHeader>
//             <CardTitle>Blog Details</CardTitle>
//             <CardDescription>
//               Enter the information for your new blog post
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="title">Title*</Label>
//               <Input
//                 id="title"
//                 placeholder="Enter blog title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="description">Short Description*</Label>
//               <Textarea
//                 id="description"
//                 placeholder="Enter a brief description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 required
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="content">Content*</Label>
//               <Textarea
//                 id="content"
//                 placeholder="Enter the blog content"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 className="min-h-[200px]"
//                 required
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="image">Featured Image</Label>
//               <div className="flex items-center gap-4">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => document.getElementById('image')?.click()}
//                 >
//                   <Image className="mr-2 h-4 w-4" />
//                   Select Image
//                 </Button>
//                 <Input
//                   id="image"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="hidden"
//                 />
//                 {imagePreview && (
//                   <div className="relative">
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="h-20 w-20 object-cover rounded border"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <Switch
//                 id="published"
//                 checked={isPublished}
//                 onCheckedChange={setIsPublished}
//               />
//               <Label htmlFor="published">Publish immediately</Label>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate('/blogs')}
//             >
//               Cancel
//             </Button>
//             <Button 
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-admin-primary hover:bg-blue-800"
//             >
//               {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//               {isPublished ? 'Create & Publish' : 'Save as Draft'}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   );
// };

// export default CreateBlog;



import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogsService } from '@/services'; // Assuming this service will be updated
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch'; // Keep if used elsewhere, but not directly for this backend
import { useAuth } from '@/context/AuthContext'; // Keep if used elsewhere
import { Image, Loader2, XCircle } from 'lucide-react'; // Added XCircle for image removal

const CreateBlog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth(); // Keep if used elsewhere

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Removed content and isPublished as they are not in the new backend schema for creation
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);

      selectedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreviews((prevPreviews) => [
            ...prevPreviews,
            event.target?.result as string,
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all required fields (Title, Description).',
        variant: 'destructive',
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: 'Missing Images',
        description: 'Please upload at least one image for the blog.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      // Append each image file
      images.forEach((imageFile) => {
        formData.append('images', imageFile);
      });

      // Assuming blogsService.createBlog is updated to accept FormData
      await blogsService.createBlog(formData);

      toast({
        title: 'Blog created',
        description: 'Your blog has been created successfully.',
      });

      navigate('/admin/blogs');
    } catch (error: any) {
      console.error('Error creating blog:', error);
      toast({
        title: 'Error',
        description:
          error.response?.data?.error || 'Failed to create blog. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Blog</h1>
        <p className="text-muted-foreground mt-2">
          Create a new blog post for your scrap management platform
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Blog Details</CardTitle>
            <CardDescription>
              Enter the information for your new blog post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title*</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description*</Label>
              <Textarea
                id="description"
                placeholder="Enter a brief description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Removed Content field as it's not in the new backend schema */}

            <div className="space-y-2">
              <Label htmlFor="images">Featured Images*</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('images')?.click()}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Select Images
                </Button>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple // Allow multiple file selection
                />
              </div>
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Removed Publish Switch as it's not in the new backend schema for creation */}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/blogs')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-admin-primary hover:bg-blue-800"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Blog
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateBlog;