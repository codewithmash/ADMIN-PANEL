
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";
import PartnerLayout from "@/components/PartnerLayout";

// Pages
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerRegister from "./pages/PartnerRegister";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Admins from "./pages/Admins";
import Partners from "./pages/Partners";
import Collections from "./pages/Collections";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AllBlogsPage from "./pages/AllBlogsPage"
import BlogDetailPage from "./pages/BlogDetailPage"
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";


// New Admin Pages
import ScrapTypes from "./pages/admin/ScrapTypes";
import ScrapBuyers from "./pages/admin/ScrapBuyers";
import SocietyCampaigns from "./pages/admin/SocietyCampaigns";
import BulkOrders from "./pages/admin/BulkOrders";
import CustomerOrders from "./pages/admin/CustomerOrders";
import Zones from "./pages/admin/Zones";
import Stores from "./pages/admin/Stores";
import Enquiries from "./pages/admin/Enquiries";
import EnquiryDetails from "./pages/admin/EnquiryDetails";
import Ratings from "./pages/admin/Ratings";
import Blogs from "./pages/admin/Blogs";
import CreateBlog from "./pages/admin/CreateBlog";
import EditBlog from "./pages/admin/EditBlog";
import ViewBlog from "./pages/admin/ViewBlog";

// Partner Pages
import PartnerDashboard from "./pages/partner/Dashboard";
import Orders from "./pages/partner/Orders";
import Pickups from "./pages/partner/Pickups";
import Performance from "./pages/partner/Performance";
import Profile from "./pages/partner/Profile"
import Payouts from "./pages/partner/Payouts";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/blogs" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetail />} /> */}
            
            {/* Partner Login and Registration Routes */}
            <Route path="/partner/login" element={<LoginPage />} />
            <Route path="/partner/register" element={<PartnerRegister />} />
            
            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute requireAdmin={true} />}>
              <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* New Admin Routes */}
                <Route path="/admin/zones" element={<Zones />} />
                <Route path="/admin/stores" element={<Stores />} />
                <Route path="/scrap-types" element={<ScrapTypes />} />
                <Route path="/scrap-buyers" element={<ScrapBuyers />} />
                <Route path="/society-campaigns" element={<SocietyCampaigns />} />
                <Route path="/bulk-orders" element={<BulkOrders />} />
                <Route path="/admin/customer-orders" element={<CustomerOrders />} />
                <Route path="/enquiries" element={<Enquiries />} />
                <Route path="/enquiries/:id" element={<EnquiryDetails />} />
                <Route path="/ratings" element={<Ratings />} />
                
                {/* Blog Routes - Ensuring they're nested within AdminLayout */}
                <Route path="/admin/blogs" element={<Blogs />} />
                <Route path="/create-blog" element={<CreateBlog />} />
                <Route path="/edit-blog/:id" element={<EditBlog />} />
                <Route path="/view-blog/:id" element={<ViewBlog />} />
              </Route>
            </Route>
            
            {/* Protected Partner Routes */}
            <Route element={<ProtectedRoute requirePartner={true} />}>
              <Route element={<PartnerLayout />}>
                <Route path="/partner/dashboard" element={<PartnerDashboard />} />
                <Route path="/partner/orders" element={<Orders />} />
                <Route path="/partner/pickups" element={<Pickups />} />
                <Route path="/partner/schedule" element={<PartnerDashboard />} />
                <Route path="/partner/performance" element={<Performance />} />
                <Route path="/partner/profile" element={<Profile />} />
                <Route path="/partner/payouts" element={<Payouts />} />
              </Route>
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
             <Route path="/blogs" element={<AllBlogsPage />} />
              <Route path="/blog/:blogId" element={<BlogDetailPage />}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
