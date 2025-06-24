
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { useAuth } from "@/context/AuthContext";
// import { Calendar } from "@/components/ui/calendar";
// import { useToast } from "@/components/ui/use-toast";
// import { Truck, Package, Calendar as CalendarIcon, DollarSign, AlertCircle, Star } from "lucide-react";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { ratingsService } from "@/services";
// import { partnerDashboardService } from "@/services/partnerDahboardService";

// // Mock data
// const todayPickups = [
//   { id: 1, time: '10:00 AM', customer: 'Rahul Sharma', location: 'Green Park', scrapType: 'Mixed', weight: '15 kg' },
//   { id: 2, time: '11:30 AM', customer: 'Priya Patel', location: 'Hauz Khas', scrapType: 'Paper', weight: '8 kg' },
//   { id: 3, time: '2:00 PM', customer: 'Vikram Singh', location: 'Saket', scrapType: 'Metal', weight: '20 kg' },
// ];

// const PartnerDashboard = () => {
//   const { user } = useAuth();
//   const { toast } = useToast();
//   const [date, setDate] = useState<Date | undefined>(new Date());
//   const [isOnline, setIsOnline] = useState(true);
//   const [partnerRating, setPartnerRating] = useState<number | null>(null);
//   const [isLoadingRating, setIsLoadingRating] = useState(false);

//   const [todayPickups,settodayPickups] = useState([]);
//   const [todayPickupsCount,setTodayPickupsCount] = useState(0);
//   const [countPickups,setCountPickups] = useState({});




//   useEffect(() => {
//     const fetchPartnerInfo = async () => {
//       if (user?.id) {
//         setIsLoadingRating(true);
//         try {
//           // In production, use:
//           const response = await partnerDashboardService.getTodayPickup(user.id);
//           settodayPickups(response.data)
//           setTodayPickupsCount(response.count)

//           const response2 = await partnerDashboardService.getPickupCount(user.id);
//           setCountPickups(response2.data)

//           // setPartnerRating(response.averageRating);
          
//           // For demo purposes:
//           // await new Promise(resolve => setTimeout(resolve, 500));
//           // setPartnerRating(4.5);
//         } catch (error) {
//           console.error("Error fetching partner rating:", error);
//           toast({
//             title: "Error",
//             description: "Failed to fetch your rating. Please refresh the page.",
//             variant: "destructive",
//             duration: 3000,
//           });
//         } finally {
//           setIsLoadingRating(false);
//         }
//       }
//     };

//     fetchPartnerInfo();
//   }, [user, toast]);



//   console.log("user",user)

//   useEffect(() => {
//     const fetchPartnerRating = async () => {
//       if (user?.id) {
//         setIsLoadingRating(true);
//         try {
//           // In production, use:
//           // const response = await ratingsService.getPartnerAverageRating(user.id);
//           // setPartnerRating(response.averageRating);
          
//           // For demo purposes:
//           await new Promise(resolve => setTimeout(resolve, 500));
//           setPartnerRating(4.5);
//         } catch (error) {
//           console.error("Error fetching partner rating:", error);
//           toast({
//             title: "Error",
//             description: "Failed to fetch your rating. Please refresh the page.",
//             variant: "destructive",
//             duration: 3000,
//           });
//         } finally {
//           setIsLoadingRating(false);
//         }
//       }
//     };

//     fetchPartnerRating();
//   }, [user, toast]);

//   const handleGoOnline = () => {
//     setIsOnline(true);
//     toast({
//       title: "You're now online",
//       description: "You'll receive pickup requests.",
//       duration: 3000,
//     });
//   };

//   const handleGoOffline = () => {
//     setIsOnline(false);
//     toast({
//       title: "You're now offline",
//       description: "You won't receive any new pickup requests.",
//       duration: 3000,
//     });
//   };

//   // Check if partner is approved
//   if (user?.isPartner && !user.approved) {
//     return (
//       <div className="space-y-6">
//         <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>
        
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Account Under Review</AlertTitle>
//           <AlertDescription>
//             Your partner account is currently under review. You'll be notified once your application is approved.
//           </AlertDescription>
//         </Alert>
        
//         <Card>
//           <CardHeader>
//             <CardTitle>Application Status</CardTitle>
//             <CardDescription>
//               Your application details and current status
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Name</p>
//                   <p>{user.name || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Phone</p>
//                   <p>{user.phone || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Vehicle Type</p>
//                   <p>{user.vehicleType || 'Not provided'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Service Area</p>
//                   <p>{user.locality || 'Not provided'}</p>
//                 </div>
//               </div>
              
//               <div className="mt-6">
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <span className="w-full border-t"></span>
//                   </div>
//                   <div className="relative flex justify-center text-xs uppercase">
//                     <span className="bg-background px-2 text-muted-foreground">
//                       Application Timeline
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className="mt-6 space-y-6">
//                   <div className="flex">
//                     <div className="mr-4 flex flex-col items-center">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
//                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                       <div className="h-full w-px bg-gray-300"></div>
//                     </div>
//                     <div className="pb-6">
//                       <p className="text-sm font-medium">Application Submitted</p>
//                       <p className="text-sm text-muted-foreground">Your application was received.</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex">
//                     <div className="mr-4 flex flex-col items-center">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
//                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                         </svg>
//                       </div>
//                       <div className="h-full w-px bg-gray-300"></div>
//                     </div>
//                     <div className="pb-6">
//                       <p className="text-sm font-medium">Documents Verified</p>
//                       <p className="text-sm text-muted-foreground">Your documents have been verified.</p>
//                     </div>
//                   </div>
                  
//                   <div className="flex">
//                     <div className="mr-4 flex flex-col items-center">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
//                         <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium">Awaiting Admin Approval</p>
//                       <p className="text-sm text-muted-foreground">Your application is under review by our team.</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>
//           <p className="text-muted-foreground">
//             Welcome back, {user?.name || 'Partner'}!
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           {partnerRating !== null && (
//             <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-md border border-yellow-200">
//               <div className="flex items-center mr-2">
//                 {[...Array(5)].map((_, i) => (
//                   <Star 
//                     key={i} 
//                     className={`h-4 w-4 ${i < Math.floor(partnerRating) ? 'text-yellow-400 fill-yellow-400' : 
//                       i < partnerRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                   />
//                 ))}
//               </div>
//               <span className="font-medium text-sm">{partnerRating.toFixed(1)}</span>
//             </div>
//           )}
//           {isOnline ? (
//             <Button 
//               variant="outline" 
//               className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
//               onClick={handleGoOffline}
//             >
//               Go Offline
//             </Button>
//           ) : (
//             <Button 
//               className="bg-green-600 hover:bg-green-700"
//               onClick={handleGoOnline}
//             >
//               Go Online
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Status Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="bg-green-100 p-3 rounded-full">
//                 <Truck className="h-6 w-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Today's Pickups
//                 </p>
//                 <h3 className="text-2xl font-bold">3</h3>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="bg-blue-100 p-3 rounded-full">
//                 <Package className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Total Weight
//                 </p>
//                 <h3 className="text-2xl font-bold">43 kg</h3>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="bg-amber-100 p-3 rounded-full">
//                 <CalendarIcon className="h-6 w-6 text-amber-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Upcoming
//                 </p>
//                 <h3 className="text-2xl font-bold">2</h3>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
        
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center space-x-4">
//               <div className="bg-purple-100 p-3 rounded-full">
//                 <DollarSign className="h-6 w-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-muted-foreground">
//                   Today's Earnings
//                 </p>
//                 <h3 className="text-2xl font-bold">₹1,250</h3>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card>
//           <CardHeader>
//             <CardTitle>Today's Pickups</CardTitle>
//             <CardDescription>
//               Scheduled pickups for today
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {todayPickups.map(pickup => (
//                 <div key={pickup.id} className="flex items-center justify-between border-b pb-3">
//                   <div className="space-y-1">
//                     <p className="font-medium">{pickup.time} - {pickup.customer}</p>
//                     <p className="text-sm text-muted-foreground">{pickup.location}</p>
//                     <div className="flex items-center mt-1">
//                       <span className="text-xs bg-gray-100 px-2 py-1 rounded mr-2">{pickup.scrapType}</span>
//                       <span className="text-xs bg-gray-100 px-2 py-1 rounded">{pickup.weight}</span>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">Details</Button>
//                 </div>
//               ))}
//               {todayPickups.length === 0 && (
//                 <div className="text-center py-6 text-muted-foreground">
//                   No pickups scheduled for today
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Schedule</CardTitle>
//             <CardDescription>
//               Your upcoming pickups
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={setDate}
//               className="rounded-md border"
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default PartnerDashboard;



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Truck, Calendar as CalendarIcon, AlertCircle, Star, CheckCircle } from "lucide-react"; // Removed Package and DollarSign, added CheckCircle
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ratingsService } from "@/services";
import { partnerDashboardService } from "@/services/partnerDahboardService";

// This component will display the detailed information of a selected pickup
const PickupDetailsDisplay = ({ pickup, onClose }) => {
  if (!pickup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>Pickup Details: {pickup.pickupId}</CardTitle>
          <CardDescription>Order ID: {pickup.orderId}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Address</p>
            <p>{pickup.pickupAddress}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pickup Date & Time</p>
            <p>{new Date(pickup.pickupDate).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Preparation Instructions</p>
            <p>{pickup.preparationInstructions || 'None'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Items</p>
            <div className="space-y-2">
              {pickup.items.map((item, index) => (
                <div key={index} className="border p-3 rounded-md">
                  <p className="font-medium">{item.scrapType.name}</p>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity} kg</p>
                  <p className="text-sm text-muted-foreground">Rate per Kg: ₹{item.scrapType.ratePerKg}</p>
                  <p className="text-sm text-muted-foreground">Notes: {item.notes || 'N/A'}</p>
                  {item.images && item.images.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {item.images.map((imgSrc, imgIndex) => (
                          <img key={imgIndex} src={imgSrc} alt={`Scrap item ${index + 1} image ${imgIndex + 1}`} className="w-20 h-20 object-cover rounded-md" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <p>{pickup.status}</p>
          </div>
          <Button onClick={onClose} className="mt-4 w-full">Close</Button>
        </CardContent>
      </Card>
    </div>
  );
};


const PartnerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(true);
  const [partnerRating, setPartnerRating] = useState<number | null>(null);
  const [isLoadingRating, setIsLoadingRating] = useState(false);

  const [todayPickups, setTodayPickups] = useState([]);
  // Added 'completedPickupsCount' to the initial state for 'countPickups'
  const [countPickups, setCountPickups] = useState({ todayPickupsCount: 0, upcomingPickupsCount: 0, completedPickupsCount: 0 });
  const [completedPickups, setCompletedPickups] = useState([]); // New state for completed pickups
  const [selectedPickup, setSelectedPickup] = useState(null); // State to hold pickup details for modal

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      if (user?.id) {
        setIsLoadingRating(true);
        try {
          // Fetch today's pickups
          const todayPickupsResponse = await partnerDashboardService.getTodayPickup(user.phone);
          setTodayPickups(todayPickupsResponse.data);

          // Fetch pickup counts. This service call needs to return completedPickupsCount too.
          const pickupCountResponse = await partnerDashboardService.getPickupCount(user.phone);
          console.log("pickupCountResponse",pickupCountResponse)
          setCountPickups(pickupCountResponse.data);

          // Fetch completed pickups - YOU NEED TO IMPLEMENT THIS SERVICE CALL
          // For demonstration, I'm mocking a response.
          const completedPickupsResponse = await partnerDashboardService.getCompletedPickups(user.phone);
          console.log("completedPickupsResponse",completedPickupsResponse.data)
          setCompletedPickups(completedPickupsResponse.data);
          
          // For demo purposes for rating (replace with actual API call if available)
          const ratingResponse = await ratingsService.getPartnerAverageRating(user.id);
          console.log("ratingResponse",ratingResponse)
          setPartnerRating(ratingResponse.averageRating);
          // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
          // setPartnerRating(4.5); 

        } catch (error) {
          console.error("Error fetching partner info:", error);
          toast({
            title: "Error",
            description: "Failed to fetch dashboard data. Please refresh the page.",
            variant: "destructive",
            duration: 3000,
          });
        } finally {
          setIsLoadingRating(false);
        }
      }
    };

    fetchPartnerInfo();
  }, [user, toast]);

  // Handler for showing pickup details in the modal
  const handleShowDetails = (pickup) => {
    setSelectedPickup(pickup);
  };

  // Handler for closing the pickup details modal
  const handleCloseDetails = () => {
    setSelectedPickup(null);
  };


  console.log("user?.status",user?.status)

  // Check if partner is approved - this block remains the same
  if (user?.status == "pending") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Account Under Review</AlertTitle>
          <AlertDescription>
            Your partner account is currently under review. please check after 24hrs
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
              <div className="grid grid-cols-2 gap-4">
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
                  
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Awaiting Admin Approval</p>
                      <p className="text-sm text-muted-foreground">Your application is under review by our team.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }else if(user?.status == "rejected"){
       return (
  <div className="space-y-6">
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
          <div className="grid grid-cols-2 gap-4">
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
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {/* X mark for rejected status */}
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
    </Card>
  </div>
);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Partner Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'Partner'}!
          </p>
        </div>
        <div className="flex items-center gap-4">
          {partnerRating !== null && (
            <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-md border border-yellow-200">
              <div className="flex items-center mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(partnerRating) ? 'text-yellow-400 fill-yellow-400' : 
                      i < partnerRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-medium text-sm">{partnerRating.toFixed(1)}</span>
            </div>
          )}
          {/* {isOnline ? (
            <Button 
              variant="outline" 
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleGoOffline}
            >
              Go Offline
            </Button>
          ) : (
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleGoOnline}
            >
              Go Online
            </Button>
          )} */}
        </div>
      </div>

      {/* Status Cards */}
      {/* Changed grid layout to 3 columns to match the new card count */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"> 
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Today's Pickups
                </p>
                <h3 className="text-2xl font-bold">{countPickups.todayPickupsCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Upcoming Pickups
                </p>
                <h3 className="text-2xl font-bold">{countPickups.upcomingPickupsCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* New Card for Completed Pickups */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" /> {/* Using CheckCircle icon */}
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed Pickups
                </p>
                <h3 className="text-2xl font-bold">{countPickups.completedPickupsCount}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Pickups</CardTitle>
            <CardDescription>
              Scheduled pickups for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayPickups.map(pickup => (
                <div key={pickup.id} className="flex items-center justify-between border-b pb-3">
                  <div className="space-y-1">
                    <p className="font-medium">
                      {new Date(pickup.pickupDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {pickup.orderId}
                    </p>
                    <p className="text-sm text-muted-foreground">{pickup.pickupAddress}</p>
                    <div className="flex items-center mt-1">
                      {/* Displaying a summary of items */}
                      {pickup.items.slice(0, 2).map((item, index) => ( 
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded mr-2">
                          {item.scrapType.name} ({item.quantity} kg)
                        </span>
                      ))}
                      {pickup.items.length > 2 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          +{pickup.items.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleShowDetails(pickup)}>Details</Button>
                </div>
              ))}
              {todayPickups.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No pickups scheduled for today
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* New Card for Completed Pickups List (replaces the Calendar) */}
        <Card>
          <CardHeader>
            <CardTitle>Completed Pickups</CardTitle>
            <CardDescription>
              A list of pickups you've successfully completed
            </CardDescription>
          </CardHeader>
          {/* <CardContent>
            <div className="space-y-4">
              {completedPickups.map(pickup => (
                <div key={pickup.id} className="flex items-center justify-between border-b pb-3">
                  <div className="space-y-1">
                    <p className="font-medium">
                      {new Date(pickup.pickupDate).toLocaleDateString()} - {pickup.orderId}
                    </p>
                    <p className="text-sm text-muted-foreground">{pickup.pickupAddress}</p>
                    <div className="flex items-center mt-1">
                    
                      {pickup.items.slice(0, 2).map((item, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded mr-2">
                          {item.scrapType.name} ({item.quantity} kg)
                        </span>
                      ))}
                      {pickup.items.length > 2 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          +{pickup.items.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleShowDetails(pickup)}>Details</Button>
                </div>
              ))}
              {completedPickups.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No completed pickups yet.
                </div>
              )}
            </div>
          </CardContent> */}

          <CardContent>
  <div className="space-y-4">
    {completedPickups.map(pickup => (
      <div key={pickup.id} className="flex items-center justify-between border-b pb-3">
        <div className="space-y-1">
          <p className="font-medium">
            {/* Access pickupDate from originalOrderData and convert Firebase Timestamp */}
            {new Date(pickup.originalOrderData.pickupDate._seconds * 1000).toLocaleDateString()} - {pickup.originalOrderData.orderId}
          </p>
          <p className="text-sm text-muted-foreground">{pickup.originalOrderData.pickupAddress}</p>
          {/* Uncomment and modify the items display if needed */}
          <div className="flex items-center mt-1">
            {pickup.originalOrderData.items.slice(0, 2).map((item, index) => (
              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded mr-2">
                {item.scrapType.name} ({item.quantity} kg)
              </span>
            ))}
            {pickup.originalOrderData.items.length > 2 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                +{pickup.originalOrderData.items.length - 2} more
              </span>
            )}
          </div>
        </div>
        {/* <Button variant="outline" size="sm" onClick={() => handleShowDetails(pickup)}>Details</Button> */}
      </div>
    ))}
    {completedPickups.length === 0 && (
      <div className="text-center py-6 text-muted-foreground">
        No completed pickups yet.
      </div>
    )}
  </div>
</CardContent>
        </Card>
      </div>

      {/* Conditionally render the PickupDetailsDisplay modal */}
      {selectedPickup && (
        <PickupDetailsDisplay pickup={selectedPickup} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default PartnerDashboard;