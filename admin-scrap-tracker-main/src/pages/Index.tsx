
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { blogsService } from "@/services";
// import BlogSection from "@/components/BlogSection";

// const Index = () => {
//   // Check if blogs exist
//   const { data: blogs = [] } = useQuery({
//     queryKey: ['publishedBlogs'],
//     queryFn: blogsService.getPublishedBlogs,
//     staleTime: 60000, // 1 minute
//   });

//   const hasBlogs = blogs && blogs.length > 0;

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="bg-white border-b py-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <div className="text-2xl font-bold text-admin-primary">Scrap Management</div>
//           <div className="space-x-4">
//             <Link to="/login">
//               <Button className="bg-admin-primary hover:bg-blue-800">Login</Button>
//             </Link>
//           </div>
//         </div>
//       </header>
      
//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="bg-gradient-to-b from-white to-gray-100 py-16">
//           <div className="container mx-auto px-4 text-center space-y-8">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
//               Streamlined Scrap Collection & Management
//             </h1>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               A comprehensive platform for efficient scrap collection, recycling partner coordination, and waste management.
//             </p>
            
//             <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
//               <Link to="/login">
//                 <Button size="lg" className="w-full sm:w-auto bg-admin-primary hover:bg-blue-800">
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/partner/register">
//                 <Button size="lg" className="w-full sm:w-auto bg-admin-primary hover:bg-blue-800">
//                   Register as Partner
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </section>
        
//         {/* Features Section */}
//         <section className="py-16">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">Smart Waste Management Solutions</h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Our platform connects waste generators with recyclers for efficient resource recovery
//               </p>
//             </div>
            
//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="bg-white p-6 rounded-lg shadow-md text-center">
//                 <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 text-admin-primary rounded-full flex items-center justify-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-medium mb-2">For Administrators</h3>
//                 <p className="text-gray-600">Manage partners, track collections, generate reports, and monitor overall performance.</p>
//               </div>
              
//               <div className="bg-white p-6 rounded-lg shadow-md text-center">
//                 <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 text-admin-primary rounded-full flex items-center justify-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-medium mb-2">For Partners</h3>
//                 <p className="text-gray-600">Manage pickup requests, confirm collections, track earnings, and request payouts.</p>
//               </div>
              
//               <div className="bg-white p-6 rounded-lg shadow-md text-center">
//                 <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 text-admin-primary rounded-full flex items-center justify-center">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-medium mb-2">For Customers</h3>
//                 <p className="text-gray-600">Schedule pickups, view collection history, and earn rewards for recycling efforts.</p>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* How It Works Section */}
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <div className="text-center mb-12">
//               <h2 className="text-3xl font-bold mb-4">How It Works</h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Our simplified process makes scrap management easy for everyone
//               </p>
//             </div>
            
//             <div className="grid md:grid-cols-4 gap-8">
//               <div className="text-center">
//                 <div className="w-16 h-16 rounded-full bg-admin-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
//                 <h3 className="text-xl font-medium mb-2">Schedule Pickup</h3>
//                 <p className="text-gray-600">Request a pickup through our platform with just a few clicks</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-16 h-16 rounded-full bg-admin-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
//                 <h3 className="text-xl font-medium mb-2">Partner Assignment</h3>
//                 <p className="text-gray-600">Our system assigns the nearest available collection partner</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-16 h-16 rounded-full bg-admin-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
//                 <h3 className="text-xl font-medium mb-2">Collection</h3>
//                 <p className="text-gray-600">Partner collects and weighs your scrap at your doorstep</p>
//               </div>
              
//               <div className="text-center">
//                 <div className="w-16 h-16 rounded-full bg-admin-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
//                 <h3 className="text-xl font-medium mb-2">Payment & Recycling</h3>
//                 <p className="text-gray-600">Receive payment and track your environmental impact</p>
//               </div>
//             </div>
//           </div>
//         </section>
        
        {/* Benefits Section */}
        // <section className="py-16">
        //   <div className="container mx-auto px-4">
        //     <div className="text-center mb-12">
        //       <h2 className="text-3xl font-bold mb-4">Benefits of Our Platform</h2>
        //       <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        //         Why choose our scrap management solution?
        //       </p>
        //     </div>
            
        //     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        //       <div className="bg-white p-6 rounded-lg shadow-md">
        //         <h3 className="text-xl font-medium mb-3">Environmental Impact</h3>
        //         <p className="text-gray-600">Reduce landfill waste and lower your carbon footprint through proper recycling</p>
        //       </div>
              
        //       <div className="bg-white p-6 rounded-lg shadow-md">
        //         <h3 className="text-xl font-medium mb-3">Economic Benefits</h3>
        //         <p className="text-gray-600">Earn money for your recyclables while supporting the circular economy</p>
        //       </div>
              
        //       <div className="bg-white p-6 rounded-lg shadow-md">
        //         <h3 className="text-xl font-medium mb-3">Convenience</h3>
        //         <p className="text-gray-600">Door-to-door collection eliminates the need to transport heavy materials</p>
        //       </div>
              
        //       <div className="bg-white p-6 rounded-lg shadow-md">
        //         <h3 className="text-xl font-medium mb-3">Transparency</h3>
        //         <p className="text-gray-600">Clear pricing and real-time tracking of your collection requests</p>
        //       </div>
              
        //       <div className="bg-white p-6 rounded-lg shadow-md">
        //         <h3 className="text-xl font-medium mb-3">Community Impact</h3>
        //         <p className="text-gray-600">Support local employment and contribute to cleaner neighborhoods</p>
        //       </div>
              
        //       <div className="bg-white p-6 rounded-lg shadow-md">
        //         <h3 className="text-xl font-medium mb-3">Data Insights</h3>
        //         <p className="text-gray-600">Track your recycling history and environmental contribution over time</p>
        //       </div>
        //     </div>
        //   </div>
        // </section>
        
//         {/* Blog Section - Conditionally rendered */}
//         {hasBlogs && <BlogSection />}
        
//         {/* CTA Section */}
//         <section className="py-16 bg-admin-primary text-white">
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//             <p className="text-xl max-w-2xl mx-auto mb-8">
//               Join our platform today and be part of the solution for a cleaner, more sustainable future.
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <Link to="/login">
//                 <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-admin-primary">
//                   Login
//                 </Button>
//               </Link>
//               <Link to="/partner/register">
//                 <Button size="lg" className="bg-white text-admin-primary hover:bg-gray-100">
//                   Register as Partner
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
      
//       <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Scrap Management</h3>
//               <p className="text-gray-400">
//                 Revolutionizing waste management through technology and community engagement.
//               </p>
//             </div>
            
//             <div>
//               <h4 className="font-bold mb-4">Quick Links</h4>
//               <ul className="space-y-2">
//                 <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
//                 <li><Link to="/blogs" className="text-gray-400 hover:text-white">Blog</Link></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-bold mb-4">Services</h4>
//               <ul className="space-y-2">
//                 <li><a href="#" className="text-gray-400 hover:text-white">Scrap Collection</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Bulk Orders</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Society Campaigns</a></li>
//                 <li><a href="#" className="text-gray-400 hover:text-white">Corporate Solutions</a></li>
//               </ul>
//             </div>
            
//             <div>
//               <h4 className="font-bold mb-4">Connect With Us</h4>
//               <div className="flex space-x-4 mb-4">
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
//                 </a>
//               </div>
//               <p className="text-gray-400">Email: info@scrapmanagement.com</p>
//               <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
//             </div>
//           </div>
          
//           <div className="border-t border-gray-700 pt-8 text-center">
//             <p>&copy; {new Date().getFullYear()} Scrap Management System. All rights reserved.</p>
//             <div className="mt-4 flex justify-center space-x-6">
//               <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
//               <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
//               <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;



import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogsService } from "@/services";
import BlogSection from "@/components/BlogSection";
import { Play, Apple, Users, TrendingUp, Truck, Building2, Smartphone, Award } from "lucide-react";

import { useState,useEffect } from 'react';
import ScrapRatesPopup from '@/components/ScrapRatesPopup';

import mobilehome from "./Images/mobile_home.png"

import bannerhome from "./Images/banner_home.png"
import media_home from "./Images/media_home.png"

import logo from "./Images/logo.png"

const Index = () => {
  // Check if blogs exist
  // const { data: blogs = [] } = useQuery({
  //   queryKey: ['publishedBlogs'],
  //   queryFn: blogsService.getPublishedBlogs,
  //   staleTime: 60000, // 1 minute
  // });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Optional
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogsService.getPublishedBlogs();
        
        setBlogs(data.blogs || []);
        console.log("data",blogs)
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setError(err); // Optional
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

    const intervalId = setInterval(fetchBlogs, 60000); // Refresh every 1 minute

    return () => clearInterval(intervalId); // Clean up
  }, []);
  const [isScrapRatesOpen, setIsScrapRatesOpen] = useState(false);
  const hasBlogs = blogs && blogs.length > 0;

  console.log("hasBlogs",hasBlogs)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* <div className="bg-white px-6 py-3 rounded text-gray-800 font-medium">Logo</div> */}
          <img src={logo}  style={{width:100}}></img>
          {/* <div className="bg-white px-6 py-3 rounded text-gray-800 font-medium">Scrap Rates</div> */}
           <Button 
            className="bg-white px-6 py-3 rounded text-gray-800 font-medium hover:bg-gray-100" 
            variant="ghost"
            onClick={() => setIsScrapRatesOpen(true)}
          >
            Scrap Rates
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-200 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            Streamline Scrap Collection & Management
          </h1>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
              <Play className="w-4 h-4" />
              <Apple className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="bg-white text-gray-800 border-gray-300">
              About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Smart Scrap Management Solutions */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Scrap Management Solutions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our platform helps collect scrap directly from the source and ensures it 
            reaches the right recyclers for efficient recovery
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Truck className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scrap Pickup</h3>
              <p className="text-gray-600 text-sm">Got Scrap? Book a free pickup for 10+ kg</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bulk Collections</h3>
              <p className="text-gray-600 text-sm">Have 100+ kg scrap? Get a custom pickup quote</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Buy Scrap</h3>
              <p className="text-gray-600 text-sm">Source Scrap directly from us</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Campaigns for Apartments</h3>
              <p className="text-gray-600 text-sm">Run a community scrap drive right from your apartment</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Corporate Tie-ups</h3>
              <p className="text-gray-600 text-sm">Partner with us for regular office or facility pickups</p>
            </div>
          </div>
        </div>
      </section> */}


      <section className="py-16 bg-white">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Smart Scrap Management Solutions</h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-12">
      Our platform helps collect scrap directly from the source and ensures it 
      reaches the right recyclers for efficient recovery
    </p>

    {/* First Row with 3 columns */}
    <div className="grid md:grid-cols-3 gap-8 mb-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Truck className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Scrap Pickup</h3>
        <p className="text-gray-600 text-sm">Got Scrap? Book a free pickup for 10+ kg</p>
      </div>

      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Users className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Bulk Collections</h3>
        <p className="text-gray-600 text-sm">Have 100+ kg scrap? Get a custom pickup quote</p>
      </div>

      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Buy Scrap</h3>
        <p className="text-gray-600 text-sm">Source Scrap directly from us</p>
      </div>
    </div>

    {/* Second Row with 2 columns */}
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Campaigns for Apartments</h3>
        <p className="text-gray-600 text-sm">Run a community scrap drive right from your apartment</p>
      </div>

      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Award className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Corporate Tie-ups</h3>
        <p className="text-gray-600 text-sm">Partner with us for regular office or facility pickups</p>
      </div>
    </div>
  </div>
</section>


      {/* Our Impact Section */}
      <section className="py-16 bg-gray-100" >
        <div className="container mx-auto px-4 text-center" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-gray-600 mb-8">
            Scheduling a scrap pickup with ScrapIt is simple—just book, bag it, and 
            we'll handle the rest.
          </p>
          
          {/* <div className="bg-white rounded-lg p-8 mb-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-5xl font-bold text-green-600">81,10,504</span>
              <p className="text-gray-600">kg scrap saved from landfills</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">13.8 crores</div>
                <div className="text-sm text-gray-600">money given</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">5,46,536</div>
                <div className="text-sm text-gray-600">kgs of e-money</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">3.5 lakh</div>
                <div className="text-sm text-gray-600">campaigns</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">10,245</div>
                <div className="text-sm text-gray-600">number of trees</div>
              </div>
            </div>
          </div> */}

          <div style={{ width: '80%' ,marginBottom:"5%"}}>
            <img src={bannerhome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Banner" />
          </div>

          
          
          
        </div>
        <div className="text-left  mx-auto" style={{padding:"5%"}}>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Enablers of the Circular Movement</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  At ScrapIt, we are building a sustainable future by powering the circular 
                  economy.
                </p>
                <p className="text-gray-600">
                  Our platform helps to connect households and businesses with efficient 
                  scrap collection and recycling solutions, turning waste into reusable 
                  resources. By reducing landfill waste and promoting reuse, we bring 
                  transparency to the scrap value chain and help create a cleaner, circular 
                  economy for all.
                </p>
              </div>
              <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center">
                <span className="text-gray-600">Image Placeholder</span>
              </div>
            </div>
          </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-white" style={{padding:"4%"}}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className=" rounded-lg p-8">
              {/* <div className="bg-green-600 rounded-lg p-8 text-white relative">
                <Smartphone className="w-12 h-12 mb-4" />
                <div className="text-sm mb-2">Online ordering • Inventory</div>
                <div className="text-sm mb-4">Book Online/Brand</div>
                <div className="text-lg font-semibold mb-4">What would you like to sell?</div>
                
                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div className="bg-white text-gray-800 rounded p-3">
                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-1"></div>
                    <div>Papers</div>
                  </div>
                  <div className="bg-white text-gray-800 rounded p-3">
                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-1"></div>
                    <div>Plastics</div>
                  </div>
                  <div className="bg-white text-gray-800 rounded p-3">
                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-1"></div>
                    <div>Metals</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 text-center text-xs">
                  <div className="bg-white text-gray-800 rounded p-3">
                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-1"></div>
                    <div>E-waste</div>
                  </div>
                  <div className="bg-white text-gray-800 rounded p-3">
                    <div className="w-8 h-8 bg-gray-200 rounded mx-auto mb-1"></div>
                    <div>Other Items</div>
                  </div>
                </div>
              </div> */}
              <img src={mobilehome} style={{maxWidth:"60%"}}></img>
            </div>
            
            <div>
              <div className=" rounded  inline-block mb-4">
                {/* <span className="text-gray-800 font-medium">Logo</span> */}
                <img src={logo} style={{maxWidth:"20%"}}></img>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                The Best App for All Your Scrap Needs
              </h2>
              <p className="text-gray-600 mb-6">
                Book pickups, track status, and manage scrap — all in one place.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <Play className="w-4 h-4" />
                <Apple className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Who is ScrapIt for Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Who is ScrapIt for?</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            ScrapIt serves both scrap generators and buyers, making it easy to 
            dispose of or source scrap through a reliable, tech-enabled platform.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-8">
              <div className="bg-gray-200 h-40 rounded-lg mb-6"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-800">For Scrap Generators</h3>
              </div>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <p>✅ Individuals & Businesses Looking to Dispose Scrap Responsibly</p>
                <p>✅ Join the movement towards a cleaner, greener future by disposing</p>
                <p>✅ clearing industrial waste—ScrapIt helps you schedule pickups, declutter</p>
                <p>✅ efficiently, and ensure your scrap is sent for responsible recycling.</p>
                <p>✅ Free pickups (min. 10 kg)</p>
                <p>✅ Bulk collection for 100+ kg</p>
                <p>✅ Community campaigns and tie-ups</p>
                <p>✅ Easy, eco-friendly scrap disposal</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8">
              <div className="bg-gray-200 h-40 rounded-lg mb-6"></div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <h3 className="text-xl font-semibold text-gray-800">For Scrap Buyers</h3>
              </div>
              <div className="text-left space-y-2 text-sm text-gray-600">
                <p>✅ Businesses or Individuals Looking to Source Scrap Material</p>
                <p>✅ Need a reliable supply of quality scrap? ScrapIt supplies verified scrap</p>
                <p>✅ materials directly from the source—ideal for recyclers, manufacturers,</p>
                <p>✅ and individual buyers.</p>
                <p>✅ Verified and sorted scrap supply</p>
                <p>✅ Custom quotes for bulk buyers</p>
                <p>✅ Quality assurance and reliability</p>
                <p>✅ Transparent and traceable process</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <Button className="bg-gray-300 text-gray-800 hover:bg-gray-400">
              Learn About Our Services
            </Button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-lg py-8 px-6">
                <span className="text-gray-600 font-medium">Logo</span>
              </div>
            ))}
          </div>
          
          {/* <h3 className="text-2xl font-bold text-gray-800 mb-4">Benefits of Our Platform</h3>
          <p className="text-gray-600 mb-8">Why choose our scrap management solution?</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">Environmental Impact</h4>
              <p className="text-gray-600 text-sm">
                Reduce landfill waste and lower your carbon footprint 
                through proper recycling
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">Economic Benefits</h4>
              <p className="text-gray-600 text-sm">
                Earn money for your recyclables while supporting the 
                circular economy
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">Convenience</h4>
              <p className="text-gray-600 text-sm">
                Door-to-door collection eliminates the need to 
                transport heavy materials
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">Transparency</h4>
              <p className="text-gray-600 text-sm">
                Clear pricing and real-time tracking of your collection 
                requests
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">Community Impact</h4>
              <p className="text-gray-600 text-sm">
                Support local employment and contribute to cleaner 
                neighborhoods
              </p>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-800 mb-2">Data Insights</h4>
              <p className="text-gray-600 text-sm">
                Track you recycling history and environmental 
                contribution over time
              </p>
            </div>
          </div> */}



          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Benefits of Our Platform</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Why choose our scrap management solution?
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Environmental Impact</h3>
                <p className="text-gray-600">Reduce landfill waste and lower your carbon footprint through proper recycling</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Economic Benefits</h3>
                <p className="text-gray-600">Earn money for your recyclables while supporting the circular economy</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Convenience</h3>
                <p className="text-gray-600">Door-to-door collection eliminates the need to transport heavy materials</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Transparency</h3>
                <p className="text-gray-600">Clear pricing and real-time tracking of your collection requests</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Community Impact</h3>
                <p className="text-gray-600">Support local employment and contribute to cleaner neighborhoods</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-3">Data Insights</h3>
                <p className="text-gray-600">Track your recycling history and environmental contribution over time</p>
              </div>
            </div>
          </div>

          
        </div>
      </section>

      {/* Media Moments */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center" style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Media Moments</h2>
          {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4">
                <div className="bg-gray-200 h-24 rounded mb-3"></div>
                <p className="text-xs text-gray-600">Media coverage description</p>
              </div>
            ))}
          </div> */}
          <img src={media_home} style={{maxWidth:"80%"}}></img>
        </div>
      </section>

      {/* Blog Section - Conditionally rendered */}
       {hasBlogs && <BlogSection />}

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join our platform today and be part of the solution for a cleaner, more 
            sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-blue-600 bg-white hover:bg-gray-100">
                Login
              </Button>
            </Link>
            <Link to="/partner/register">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Register as Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Scrap Management</h3>
              <p className="text-gray-400">
                Revolutionizing waste management through technology and community engagement.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/blogs" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Scrap Collection</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Bulk Orders</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Society Campaigns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Corporate Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <p className="text-gray-400">Email: info@scrapmanagement.com</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Scrap Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>


      <ScrapRatesPopup 
        isOpen={isScrapRatesOpen} 
        onClose={() => setIsScrapRatesOpen(false)} 
      />
      
    </div>
  );
};

export default Index;
