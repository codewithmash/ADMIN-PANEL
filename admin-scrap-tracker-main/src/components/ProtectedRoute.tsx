
// import { useEffect, useState } from 'react';
// import { useNavigate, Outlet } from 'react-router-dom';
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from '@/context/AuthContext';
// import { Loader2, FileCheck,AlertCircle } from 'lucide-react';
// // import { Card, CardTitle, CardDescription } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// interface ProtectedRouteProps {
//   requireAdmin?: boolean;
//   requirePartner?: boolean;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
//   requireAdmin = false,
//   requirePartner = false
// }) => {
//   const { user, loading, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     if (!loading) {
//       if (!isAuthenticated) {
//         toast({
//           title: "Authentication required",
//           description: "Please log in to access this page",
//           variant: "destructive",
//           duration: 3000,
//         });
        
//         const loginPath = requirePartner ? '/partner/login' : '/login';
//         navigate(loginPath);
//       } else if (requireAdmin && !user?.isAdmin) {
//         toast({
//           title: "Access denied",
//           description: "You don't have permission to access this area",
//           variant: "destructive",
//           duration: 3000,
//         });
        
//         if (user?.isPartner) {
//           navigate('/partner/dashboard');
//         } else {
//           navigate('/dashboard');
//         }
//       } else if (requirePartner && !user?.isPartner) {
//         toast({
//           title: "Access denied",
//           description: "You don't have permission to access this area",
//           variant: "destructive",
//           duration: 3000,
//         });
        
//         if (user?.isAdmin) {
//           navigate('/dashboard');
//         } else {
//           navigate('/login');
//         }
//       }
//     }
//   }, [loading, isAuthenticated, navigate, toast, requireAdmin, requirePartner, user]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin text-admin-primary" />
//         <span className="ml-2 text-lg">Loading...</span>
//       </div>
//     );
//   }

//   // Show pending approval screen for partners who are not yet approved
//   if (requirePartner && user?.isPartner && user.approved === false) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
//         <Card className="border-0 shadow-xl text-center p-8 max-w-md">
//           <div className="flex flex-col items-center justify-center space-y-6">
//             <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white">
//               <FileCheck className="h-10 w-10" />
//             </div>
//             <CardTitle className="text-2xl font-bold">
//               Approval Pending
//             </CardTitle>
//             <CardDescription className="text-lg">
//               Your account is currently under review. Our team is verifying your documents and qualifications.
//             </CardDescription>
//             <div className="bg-blue-50 p-4 rounded-lg mt-4 text-admin-primary w-full">
//               <p className="font-medium">What happens next?</p>
//               <ul className="text-left list-disc pl-5 mt-2">
//                 <li>We'll complete the verification process</li>
//                 <li>You'll receive an approval notification</li>
//                 <li>Once approved, you can start accepting pickups</li>
//               </ul>
//             </div>
//             <Button 
//               onClick={() => navigate('/login')} 
//               variant="outline"
//               className="mt-4"
//             >
//               Back to Login
//             </Button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;



import { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { Loader2, FileCheck, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define roles and routes as constants for better maintainability
const USER_ROLES = {
  ADMIN: 'admin',
  PARTNER: 'partner',
  CUSTOMER: 'customer', // Assuming a default user role
};

const APP_ROUTES = {
  LOGIN: '/login',
  PARTNER_LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PARTNER_DASHBOARD: '/partner/dashboard',
};

// Define partner statuses as constants
const PARTNER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  requirePartner?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAdmin = false,
  requirePartner = false
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please log in to access this page",
          variant: "destructive",
          duration: 3000,
        });

        const loginPath = requirePartner ? APP_ROUTES.PARTNER_LOGIN : APP_ROUTES.LOGIN;
        navigate(loginPath);
        window.location.reload();
        return; // Exit useEffect after navigation
      }

      let accessDenied = false;
      let redirectPath = '';
      const commonDeniedToast = {
        title: "Access denied",
        description: "You don't have permission to access this area",
        variant: "destructive",
        duration: 3000,
      };

      if (requireAdmin && user && !user.isAdmin) {
        accessDenied = true;
        if (user.isPartner) {
          redirectPath = APP_ROUTES.PARTNER_DASHBOARD;
        } else {
          redirectPath = APP_ROUTES.DASHBOARD;
        }
      } else if (requirePartner && user && !user.isPartner) {
        accessDenied = true;
        if (user.isAdmin) {
          redirectPath = APP_ROUTES.DASHBOARD;
        } else {
          redirectPath = APP_ROUTES.LOGIN; // Or a more appropriate public landing page
        }
      }

      if (accessDenied) {
        toast(commonDeniedToast);
        navigate(redirectPath);
        return; // Exit useEffect after navigation
      }
    }
  }, [loading, isAuthenticated, navigate, toast, requireAdmin, requirePartner, user]);

  if (loading) {
    return (
      <div role="status" aria-live="polite" className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-admin-primary" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  // Ensure user is not null when checking status after loading
  if (user && requirePartner) {
    if (user.isPartner && user.status === PARTNER_STATUS.PENDING) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
          <Card className="border-0 shadow-xl text-center p-8 max-w-md">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center text-white">
                <FileCheck className="h-10 w-10" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Approval Pending
              </CardTitle>
              <CardDescription className="text-lg">
                Your account is currently under review. Our team is verifying your documents and qualifications.
              </CardDescription>
              <div className="bg-blue-50 p-4 rounded-lg mt-4 text-admin-primary w-full">
                <p className="font-medium">What happens next?</p>
                <ul className="text-left list-disc pl-5 mt-2">
                  <li>We'll complete the verification process</li>
                  <li>You'll receive an approval notification</li>
                  <li>Once approved, you can start accepting pickups</li>
                </ul>
              </div>
              <Button
                onClick={() => navigate(APP_ROUTES.LOGIN)}
                variant="outline"
                className="mt-4"
              >
                Back to Login
              </Button>
            </div>
          </Card>
        </div>
      );
    } else if (user.isPartner && user.status === PARTNER_STATUS.REJECTED) {
      return (
        <div className="space-y-6 p-4 md:p-8 lg:p-12"> {/* Added padding for better layout */}
          <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Account Rejected</AlertTitle>
            <AlertDescription>
              Your partner account is **Rejected**. Please contact the admin for further details.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>
                Your application details and current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> {/* Responsive grid */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Name</p>
                    <p>{user.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{user.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Vehicle Type</p>
                    <p>{user.vehicleType || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Service Area</p>
                    <p>{user.locality || 'Not provided'}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Application Timeline
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    {/* Application Submitted */}
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="h-full w-px bg-gray-300"></div>
                      </div>
                      <div className="pb-6">
                        <p className="text-sm font-medium">Application Submitted</p>
                        <p className="text-sm text-muted-foreground">Your application was received.</p>
                      </div>
                    </div>

                    {/* Documents Verified */}
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="h-full w-px bg-gray-300"></div>
                      </div>
                      <div className="pb-6">
                        <p className="text-sm font-medium">Documents Verified</p>
                        <p className="text-sm text-muted-foreground">Your documents have been verified.</p>
                      </div>
                    </div>

                    {/* Application Rejected */}
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        {/* Changed to red for rejected status */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                          {/* X mark for rejected status */}
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Application Rejected</p>
                        <p className="text-sm text-muted-foreground">Your application has been rejected. Please contact the admin for more information.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => navigate(APP_ROUTES.LOGIN)} variant="ghost">
                Back to Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }
  }

  // If none of the above conditions are met, render the children (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;