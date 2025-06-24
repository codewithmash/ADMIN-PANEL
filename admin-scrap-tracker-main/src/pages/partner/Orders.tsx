


// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Search, MapPin, Calendar, Package, AlertCircle } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { partnerDashboardService } from '@/services/partnerDahboardService';
// import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/components/ui/use-toast";

// const Orders = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedOrder, setSelectedOrder] = useState<any>(null);
//   const [isDetailsOpen, setIsDetailsOpen] = useState(false);
//   const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
//   const [newPickupDate, setNewPickupDate] = useState('');
//   const [orders, setOrders] = useState<any[]>([]);
//   const { user } = useAuth();
//   const { toast } = useToast();

//   // Function to fetch orders (refactored for reusability)
//   const fetchOrders = async () => {
//     if (user?.id) {
//       try {
//         const PickupsResponse = await partnerDashboardService.getPartnerOrders(user.phone);

//         if (!PickupsResponse || !Array.isArray(PickupsResponse)) {
//           console.error("API response data is not an array:", PickupsResponse);
//           toast({
//             title: "Error",
//             description: "Invalid data received from server.",
//             variant: "destructive",
//             duration: 3000,
//           });
//           setOrders([]);
//           return;
//         }

//         const formattedOrders = PickupsResponse.map((order: any) => {
//           const originalOrderData = order.originalOrderData || {};
//           const items = originalOrderData.items || [];

//           return {
//             id: order.id,
//             orderId: originalOrderData.orderId,
//             collectorId: order.collectorId,
//             status: order.status,
//             createdAt: order.createdAt,
//             updatedAt: order.updatedAt,
//             photos:order.photos,
//             originalOrderData: {
//               orderId: originalOrderData.orderId,
//               pickupId: originalOrderData.pickupId,
//               userId: originalOrderData.userId,
//               items: items.map((item: any) => ({
//                 scrapItemID: item.scrapItemID,
//                 scrapType: item.scrapType,
//                 quantity: item.quantity,
//                 images: item.images,
//                 notes: item.notes,
//                 status: item.status,
//               })),
//               status: originalOrderData.status,
//               statusTimeline: originalOrderData.statusTimeline,
//               createdAt: originalOrderData.createdAt,
//               pickupAddress: originalOrderData.pickupAddress,
//               notes: originalOrderData.notes,
//               isRecurring: originalOrderData.isRecurring,
//               paymentStatus: originalOrderData.paymentStatus,
//               totalAmount: originalOrderData.totalAmount,
//               preparationInstructions: originalOrderData.preparationInstructions,
//               pickupDate: originalOrderData.pickupDate,
//             },
//           };
//         });
//         setOrders(formattedOrders);
//         console.log("orders", formattedOrders);
//       } catch (error) {
//         console.error("Error fetching partner info:", error);
//         toast({
//           title: "Error",
//           description: "Failed to fetch dashboard data. Please refresh the page.",
//           variant: "destructive",
//           duration: 3000,
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     fetchOrders(); // Initial fetch
//   }, [user, toast]);

//   const handleOpenDetails = (order: any) => {
//     setSelectedOrder(order);
//     setIsDetailsOpen(true);
//   };

//   const filterOrders = (tab: string) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const todayISO = today.toISOString().split('T')[0];

//     let filtered = orders;

//     if (tab === 'today') {
//       filtered = filtered.filter(order => {
//         if (order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds) {
//           const orderDate = new Date(order.originalOrderData.pickupDate._seconds * 1000);
//           orderDate.setHours(0, 0, 0, 0);
//           return orderDate.toISOString().split('T')[0] === todayISO;
//         }
//         return false;
//       });
//     } else if (tab === 'upcoming') {
//       filtered = filtered.filter(order => {
//         if (order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds) {
//           const orderDate = new Date(order.originalOrderData.pickupDate._seconds * 1000);
//           orderDate.setHours(0, 0, 0, 0);
//           return orderDate.getTime() > today.getTime();
//         }
//         return false;
//       });
//     } else if (tab === 'completed') {
//       filtered = filtered.filter(order => order.status === 'completed');
//     }

//     if (searchTerm) {
//       filtered = filtered.filter(order =>
//         order.originalOrderData.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.originalOrderData.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.id.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     return filtered;
//   };

//   const formatDateTime = (seconds: number) => {
//     const date = new Date(seconds * 1000);
//     const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//     const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//     return { date: dateString, time: timeString };
//   };

//   // --- Reschedule Logic ---
//   const handleRescheduleClick = () => {
//     setNewPickupDate('');
//     setIsRescheduleDialogOpen(true);
//   };

//   const confirmReschedule = async () => {
//     if (!selectedOrder || !user?.id || !selectedOrder.id || !newPickupDate) { // Using selectedOrder.id for the orderId parameter
//       toast({
//         title: "Error",
//         description: "Missing required information for reschedule.",
//         variant: "destructive",
//         duration: 3000,
//       });
//       return;
//     }

//     try {
//       await partnerDashboardService.reschedulePartnerPickup(
//         user.phone || user.id,
//         selectedOrder.orderId,
//         newPickupDate
//       );

//       toast({
//         title: "Success",
//         description: `Order ${selectedOrder.id} rescheduled to ${newPickupDate}.`,
//         variant: "default",
//         duration: 3000,
//       });

//       setIsRescheduleDialogOpen(false);
//       setIsDetailsOpen(false);
//       fetchOrders(); // Refresh orders

//     } catch (error) {
//       console.error("Error rescheduling pickup:", error);
//       toast({
//         title: "Error",
//         description: "Failed to reschedule pickup. Please try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     }
//   };
//   // --- End Reschedule Logic ---

//   // --- New Start Pickup Logic ---
//   const handleStartPickupClick = async () => {
//     if (!selectedOrder || !user?.id || !selectedOrder.id) { // Ensure orderId is selectedOrder.id
//       toast({
//         title: "Error",
//         description: "Missing required information to start pickup.",
//         variant: "destructive",
//         duration: 3000,
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('collectorId', user.phone);
//       formData.append('orderId',  selectedOrder.orderId);
//       formData.append('newStatus', "outForPickup");
//       await partnerDashboardService.updateStatus(formData);

//       toast({
//         title: "Success",
//         description: `Pickup for order ${selectedOrder.id} marked as ready.`,
//         variant: "default",
//         duration: 3000,
//       });

//       setIsDetailsOpen(false); // Close details dialog after starting pickup
//       fetchOrders(); // Refresh orders to show updated status

//     } catch (error) {
//       console.error("Error marking pickup ready:", error);
//       toast({
//         title: "Error",
//         description: "Failed to mark pickup as ready. Please try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     }
//   };


//    const handleConfrimPickupClick = async () => {
//     if (!selectedOrder || !user?.id || !selectedOrder.id) { // Ensure orderId is selectedOrder.id
//       toast({
//         title: "Error",
//         description: "Missing required information to confrim pickup.",
//         variant: "destructive",
//         duration: 3000,
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append('collectorId', user.phone);
//       formData.append('orderId',  selectedOrder.orderId);
//       formData.append('newStatus', "confirmed");
//       await partnerDashboardService.updateStatus(formData);

//       toast({
//         title: "Success",
//         description: `Pickup for order ${selectedOrder.id} is ready.`,
//         variant: "default",
//         duration: 3000,
//       });

//       setIsDetailsOpen(false); // Close details dialog after starting pickup
//       fetchOrders(); // Refresh orders to show updated status

//     } catch (error) {
//       console.error("Error marking pickup ready:", error);
//       toast({
//         title: "Error",
//         description: "Failed to mark pickup as ready. Please try again.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     }
//   };
//   // --- End New Start Pickup Logic ---


//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
//         <p className="text-muted-foreground">
//           Manage your pickup requests
//         </p>
//       </div>

//       <div className="flex space-x-2">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search orders..."
//             className="pl-8 w-full"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <Tabs defaultValue="today">
//         <TabsList>
//           <TabsTrigger value="today">Today</TabsTrigger>
//           <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
//           <TabsTrigger value="all">All Orders</TabsTrigger>
//           <TabsTrigger value="completed">Completed</TabsTrigger>
//         </TabsList>

//         {/* Today's Orders */}
//         <TabsContent value="today">
//           <Card>
//             <CardHeader>
//               <CardTitle>Today's Pickups</CardTitle>
//               <CardDescription>
//                 Scheduled pickups for today
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {filterOrders('today').length > 0 ? (
//                 <div className="space-y-4">
//                   {filterOrders('today').map(order => {
//                     const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
//                       ? formatDateTime(order.originalOrderData.pickupDate._seconds)
//                       : { date: 'N/A', time: 'N/A' };
//                     return (
//                       <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
//                         <div className="space-y-2">
//                           <div className="flex items-center space-x-2">
//                             <Badge variant="outline">{order.id}</Badge>
//                             <Badge className="bg-yellow-500">{order.status}</Badge>
//                           </div>
//                           <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
//                           <div className="flex items-start space-x-2 text-sm text-muted-foreground">
//                             <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                             <span>{order.originalOrderData.pickupAddress}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                             <Calendar className="h-4 w-4" />
//                             <span>{dateTime.time}</span>
//                           </div>
//                           <div className="flex flex-wrap gap-1 mt-2">
//                             {(order.originalOrderData.items || []).map((item: any, i: number) => (
//                               <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
//                             ))}
//                             <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. Amount: ₹{order.originalOrderData.totalAmount}</span>
//                           </div>
//                         </div>
//                         <div className="mt-4 md:mt-0" style={{display:"flex",flexDirection:"column"}}>
//                           <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
//                           <Button className="w-auto bg-green-600 hover:bg-green-700" onClick={handleConfrimPickupClick}>
//                             Confirm Pickup
//                           </Button>
//                         </div>
                        
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="py-12 text-center">
//                   <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
//                   <h3 className="mt-4 text-lg font-medium">No pickups scheduled for today</h3>
//                   <p className="mt-2 text-sm text-muted-foreground">Check back later for new orders.</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Upcoming Orders */}
//         <TabsContent value="upcoming">
//           <Card>
//             <CardHeader>
//               <CardTitle>Upcoming Pickups</CardTitle>
//               <CardDescription>
//                 Scheduled for future dates
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {filterOrders('upcoming').length > 0 ? (
//                 <div className="space-y-4">
//                   {filterOrders('upcoming').map(order => {
//                     const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
//                       ? formatDateTime(order.originalOrderData.pickupDate._seconds)
//                       : { date: 'N/A', time: 'N/A' };

//                     return (
//                       <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
//                         <div className="space-y-2">
//                           <div className="flex items-center space-x-2">
//                             <Badge variant="outline">{order.id}</Badge>
//                             <Badge className="bg-yellow-500">{order.status}</Badge>
//                           </div>
//                           <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
//                           <div className="flex items-start space-x-2 text-sm text-muted-foreground">
//                             <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                             <span>{order.originalOrderData.pickupAddress}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                             <Calendar className="h-4 w-4" />
//                             <span>{dateTime.date} at {dateTime.time}</span>
//                           </div>
//                           <div className="flex flex-wrap gap-1 mt-2">
//                             {(order.originalOrderData.items || []).map((item: any, i: number) => (
//                               <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
//                             ))}
//                             <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. Amount: ₹{order.originalOrderData.totalAmount}</span>
//                           </div>
//                         </div>
//                         <div className="mt-4 md:mt-0">
//                           <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="py-12 text-center">
//                   <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
//                   <h3 className="mt-4 text-lg font-medium">No upcoming pickups scheduled</h3>
//                   <p className="mt-2 text-sm text-muted-foreground">Check back later for new orders.</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* All Orders */}
//         <TabsContent value="all">
//           <Card>
//             <CardHeader>
//               <CardTitle>All Orders</CardTitle>
//               <CardDescription>
//                 View all your assigned pickup requests
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {filterOrders('all').length > 0 ? (
//                 <div className="space-y-4">
//                   {filterOrders('all').map(order => {
//                     const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
//                       ? formatDateTime(order.originalOrderData.pickupDate._seconds)
//                       : { date: 'N/A', time: 'N/A' };
//                     return (
//                       <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
//                         <div className="space-y-2">
//                           <div className="flex items-center space-x-2">
//                             <Badge variant="outline">{order.id}</Badge>
//                             <Badge className="bg-yellow-500">{order.status}</Badge>
//                           </div>
//                           <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
//                           <div className="flex items-start space-x-2 text-sm text-muted-foreground">
//                             <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                             <span>{order.originalOrderData.pickupAddress}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                             <Calendar className="h-4 w-4" />
//                             <span>{dateTime.date} at {dateTime.time}</span>
//                           </div>
//                           <div className="flex flex-wrap gap-1 mt-2">
//                             {(order.originalOrderData.items || []).map((item: any, i: number) => (
//                               <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
//                             ))}
//                             <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. Amount: ₹{order.originalOrderData.totalAmount}</span>
//                           </div>
//                         </div>
//                         <div className="mt-4 md:mt-0">
//                           <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="py-12 text-center">
//                   <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
//                   <h3 className="mt-4 text-lg font-medium">No orders found</h3>
//                   <p className="mt-2 text-sm text-muted-foreground">Try a different search term.</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Completed Orders */}
//         <TabsContent value="completed">
//           <Card>
//             <CardHeader>
//               <CardTitle>Completed Pickups</CardTitle>
//               <CardDescription>
//                 All pickups that have been successfully completed
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               {filterOrders('completed').length > 0 ? (
//                 <div className="space-y-4">
//                   {filterOrders('completed').map(order => {
//                     const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
//                       ? formatDateTime(order.originalOrderData.pickupDate._seconds)
//                       : { date: 'N/A', time: 'N/A' };
//                     return (
//                       <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
//                         <div className="space-y-2">
//                           <div className="flex items-center space-x-2">
//                             <Badge variant="outline">{order.id}</Badge>
//                             <Badge className="bg-green-500">{order.status}</Badge>
//                           </div>
//                           <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
//                           <div className="flex items-start space-x-2 text-sm text-muted-foreground">
//                             <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                             <span>{order.originalOrderData.pickupAddress}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                             <Calendar className="h-4 w-4" />
//                             <span>{dateTime.date} at {dateTime.time}</span>
//                           </div>
//                           <div className="flex flex-wrap gap-1 mt-2">
//                             {(order.originalOrderData.items || []).map((item: any, i: number) => (
//                               <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
//                             ))}
//                             <span className="text-xs bg-gray-100 px-2 py-1 rounded">Amount: ₹{order.originalOrderData.totalAmount}</span>
//                           </div>
//                         </div>
//                         <div className="mt-4 md:mt-0">
//                           <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="py-12 text-center">
//                   <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
//                   <h3 className="mt-4 text-lg font-medium">No completed pickups</h3>
//                   <p className="mt-2 text-sm text-muted-foreground">Once pickups are finished, they will appear here.</p>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </TabsContent>

//       </Tabs>

//       {/* Order Details Dialog */}
//       <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
//         <DialogContent className="max-w-md md:max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Order Details: {selectedOrder?.id}</DialogTitle>
//             <DialogDescription>
//               Detailed information about this pickup request
//             </DialogDescription>
//           </DialogHeader>

//           {selectedOrder && (
//             <div className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
//                   <p className="font-medium">{selectedOrder.originalOrderData.userId}</p>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Pickup Status</h3>
//                   <Badge className={selectedOrder.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
//                     {selectedOrder.status}
//                   </Badge>
//                 </div>

//                 <div className="md:col-span-2">
//                   <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
//                   <div className="flex items-start space-x-2 mt-1">
//                     <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                     <span>{selectedOrder.originalOrderData.pickupAddress}</span>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
//                   <p>
//                     {selectedOrder.originalOrderData.pickupDate && selectedOrder.originalOrderData.pickupDate._seconds
//                       ? `${formatDateTime(selectedOrder.originalOrderData.pickupDate._seconds).date} at ${formatDateTime(selectedOrder.originalOrderData.pickupDate._seconds).time}`
//                       : 'N/A'}
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-medium text-muted-foreground">Estimated Amount</h3>
//                   <p>₹{selectedOrder.originalOrderData.totalAmount}</p>
//                 </div>

//                 <div className="md:col-span-2">
//                   <h3 className="text-sm font-medium text-muted-foreground">Scrap Types</h3>
//                   <div className="flex flex-wrap gap-1 mt-1">
//                     {(selectedOrder.originalOrderData.items || []).map((item: any, i: number) => (
//                       <Badge key={i} variant="secondary">{item.scrapType?.name || 'Unknown Scrap'}</Badge>
//                     ))}
//                   </div>
//                 </div>

//                 {selectedOrder.originalOrderData.preparationInstructions && (
//                   <div className="md:col-span-2">
//                     <Alert>
//                       <AlertCircle className="h-4 w-4" />
//                       <AlertTitle>Preparation Instructions</AlertTitle>
//                       <AlertDescription>
//                         {selectedOrder.originalOrderData.preparationInstructions}
//                       </AlertDescription>
//                     </Alert>
//                   </div>
//                 )}

//                 {(selectedOrder.originalOrderData.items || []).some((item: any) => item.images && item.images.length > 0) && (
//                   <div className="md:col-span-2">
//                     <h3 className="text-sm font-medium text-muted-foreground mb-2">Photos</h3>
//                     <div className="grid grid-cols-3 gap-2">
//                       {(selectedOrder.originalOrderData.items || []).flatMap((item: any) => item.images || []).map((image: string, i: number) => (
//                         <img
//                           key={i}
//                           src={image}
//                           alt={`Scrap ${i + 1}`}
//                           className="w-full h-24 object-cover rounded-md"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-between space-x-4 pt-4">
//                 {selectedOrder.status !== 'completed' && (
//                     <>
//                         <Button variant="outline" className="w-full" onClick={handleRescheduleClick}>
//                             Reschedule
//                         </Button>
//                         <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleConfrimPickupClick}>
//                             Confirm Pickup
//                         </Button>
//                         <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handleStartPickupClick}>
//                             Start Pickup
//                         </Button>
//                     </>
//                 )}
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Reschedule Dialog */}
//       <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
//         <DialogContent className="max-w-sm">
//           <DialogHeader>
//             <DialogTitle>Reschedule Pickup</DialogTitle>
//             <DialogDescription>
//               Select a new date for the pickup of order {selectedOrder?.id}.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <label htmlFor="newDate" className="text-right">
//                 New Date
//               </label>
//               <Input
//                 id="newDate"
//                 type="date"
//                 className="col-span-3"
//                 value={newPickupDate}
//                 onChange={(e) => setNewPickupDate(e.target.value)}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>Cancel</Button>
//             <Button onClick={confirmReschedule}>Confirm Reschedule</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Orders;


import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Package, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { partnerDashboardService } from '@/services/partnerDahboardService';
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [newPickupDate, setNewPickupDate] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Function to fetch orders (refactored for reusability)
  const fetchOrders = async () => {
    if (user?.id) {
      try {
        const PickupsResponse = await partnerDashboardService.getPartnerOrders(user.phone);

        if (!PickupsResponse || !Array.isArray(PickupsResponse)) {
          console.error("API response data is not an array:", PickupsResponse);
          toast({
            title: "Error",
            description: "Invalid data received from server.",
            variant: "destructive",
            duration: 3000,
          });
          setOrders([]);
          return;
        }

        const formattedOrders = PickupsResponse.map((order: any) => {
          const originalOrderData = order.originalOrderData || {};
          const items = originalOrderData.items || [];

          return {
            id: order.id,
            orderId: originalOrderData.orderId,
            collectorId: order.collectorId,
            status: order.status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            photos: order.photos,
            originalOrderData: {
              orderId: originalOrderData.orderId,
              pickupId: originalOrderData.pickupId,
              userId: originalOrderData.userId,
              items: items.map((item: any) => ({
                scrapItemID: item.scrapItemID,
                scrapType: item.scrapType,
                quantity: item.quantity,
                images: item.images,
                notes: item.notes,
                status: item.status,
            })),
              status: originalOrderData.status,
              statusTimeline: originalOrderData.statusTimeline,
              createdAt: originalOrderData.createdAt,
              pickupAddress: originalOrderData.pickupAddress,
              notes: originalOrderData.notes,
              isRecurring: originalOrderData.isRecurring,
              paymentStatus: originalOrderData.paymentStatus,
              totalAmount: originalOrderData.totalAmount,
              preparationInstructions: originalOrderData.preparationInstructions,
              pickupDate: originalOrderData.pickupDate,
            },
          };
        });
        setOrders(formattedOrders);
        console.log("orders", formattedOrders);
      } catch (error) {
        console.error("Error fetching partner info:", error);
        toast({
          title: "Error",
          description: "Failed to fetch dashboard data. Please refresh the page.",
          variant: "destructive",
          duration: 3000,
        });
      }
    }
  };

  useEffect(() => {
    fetchOrders(); // Initial fetch
  }, [user, toast]);

  const handleOpenDetails = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const filterOrders = (tab: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISO = today.toISOString().split('T')[0];

    let filtered = orders;

    if (tab === 'today') {
      filtered = filtered.filter(order => {
        if (order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds) {
          const orderDate = new Date(order.originalOrderData.pickupDate._seconds * 1000);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate.toISOString().split('T')[0] === todayISO;
        }
        return false;
      });
    } else if (tab === 'upcoming') {
      filtered = filtered.filter(order => {
        if (order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds) {
          const orderDate = new Date(order.originalOrderData.pickupDate._seconds * 1000);
          orderDate.setHours(0, 0, 0, 0);
          return orderDate.getTime() > today.getTime();
        }
        return false;
      });
    } else if (tab === 'pendingConfirmation') {
      filtered = filtered.filter(order => order.status === 'scheduled');
    } else if (tab === 'completed') {
      filtered = filtered.filter(order => order.status === 'completed');
    }

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.originalOrderData.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.originalOrderData.pickupAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const formatDateTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const dateString = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const timeString = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    return { date: dateString, time: timeString };
  };

  // --- Reschedule Logic ---
  const handleRescheduleClick = () => {
    setNewPickupDate('');
    setIsRescheduleDialogOpen(true);
  };

  const confirmReschedule = async () => {
    if (!selectedOrder || !user?.id || !selectedOrder.orderId || !newPickupDate) { // Using selectedOrder.orderId for the orderId parameter
      toast({
        title: "Error",
        description: "Missing required information for reschedule.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      await partnerDashboardService.reschedulePartnerPickup(
        user.phone || user.id,
        selectedOrder.orderId,
        newPickupDate
      );

      toast({
        title: "Success",
        description: `Order ${selectedOrder.orderId} rescheduled to ${newPickupDate}.`,
        variant: "default",
        duration: 3000,
      });

      setIsRescheduleDialogOpen(false);
      setIsDetailsOpen(false);
      fetchOrders(); // Refresh orders

    } catch (error) {
      console.error("Error rescheduling pickup:", error);
      toast({
        title: "Error",
        description: "Failed to reschedule pickup. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  // --- End Reschedule Logic ---

  // --- Confirm Pickup Logic ---
  const handleConfirmPickupClick = async (orderToConfirm: any) => {
    if (!orderToConfirm || !user?.id || !orderToConfirm.orderId) {
      toast({
        title: "Error",
        description: "Missing required information to confirm pickup.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('collectorId', user.phone);
      formData.append('orderId', orderToConfirm.orderId);
      formData.append('newStatus', "confirmed");
      await partnerDashboardService.updateStatus(formData);

      toast({
        title: "Success",
        description: `Pickup for order ${orderToConfirm.orderId} confirmed.`,
        variant: "default",
        duration: 3000,
      });

      setIsDetailsOpen(false); // Close details dialog if open
      fetchOrders(); // Refresh orders to show updated status

    } catch (error) {
      console.error("Error confirming pickup:", error);
      toast({
        title: "Error",
        description: "Failed to confirm pickup. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  // --- End Confirm Pickup Logic ---


  // --- Start Pickup Logic ---
  const handleStartPickupClick = async () => {
    if (!selectedOrder || !user?.id || !selectedOrder.orderId) {
      toast({
        title: "Error",
        description: "Missing required information to start pickup.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('collectorId', user.phone);
      formData.append('orderId', selectedOrder.orderId);
      formData.append('newStatus', "outForPickup"); // Or 'started', 'enRoute' etc.
      await partnerDashboardService.updateStatus(formData);

      toast({
        title: "Success",
        description: `Pickup for order ${selectedOrder.orderId} marked as out for pickup.`,
        variant: "default",
        duration: 3000,
      });

      setIsDetailsOpen(false); // Close details dialog after starting pickup
      fetchOrders(); // Refresh orders to show updated status

    } catch (error) {
      console.error("Error marking pickup ready:", error);
      toast({
        title: "Error",
        description: "Failed to mark pickup as ready. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  // --- End Start Pickup Logic ---


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Manage your pickup requests
        </p>
      </div>

      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="pendingConfirmation">Pending Confirmation</TabsTrigger>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        {/* Today's Orders */}
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Pickups</CardTitle>
              <CardDescription>
                Scheduled pickups for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterOrders('today').length > 0 ? (
                <div className="space-y-4">
                  {filterOrders('today').map(order => {
                    const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
                      ? formatDateTime(order.originalOrderData.pickupDate._seconds)
                      : { date: 'N/A', time: 'N/A' };
                    return (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{order.id}</Badge>
                            <Badge className="bg-yellow-500">{order.status}</Badge>
                          </div>
                          <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
                          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{order.originalOrderData.pickupAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{dateTime.time}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(order.originalOrderData.items || []).map((item: any, i: number) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
                            ))}
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. Amount: ₹{order.originalOrderData.totalAmount}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                          <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
                          {order.status === 'scheduled' && (
                            <Button className="w-auto bg-green-600 hover:bg-green-700" onClick={() => handleConfirmPickupClick(order)}>
                              Confirm Pickup
                            </Button>
                          )}
                          {/* {order.status === 'confirmed' && (
                            <Button className="w-auto bg-blue-600 hover:bg-blue-700" onClick={() => handleStartPickupClick(order)}>
                              Start Pickup
                            </Button>
                          )} */}
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <h3 className="mt-4 text-lg font-medium">No pickups scheduled for today</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Check back later for new orders.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Orders */}
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Pickups</CardTitle>
              <CardDescription>
                Scheduled for future dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterOrders('upcoming').length > 0 ? (
                <div className="space-y-4">
                  {filterOrders('upcoming').map(order => {
                    const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
                      ? formatDateTime(order.originalOrderData.pickupDate._seconds)
                      : { date: 'N/A', time: 'N/A' };

                    return (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{order.id}</Badge>
                            <Badge className="bg-yellow-500">{order.status}</Badge>
                          </div>
                          <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
                          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{order.originalOrderData.pickupAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{dateTime.date} at {dateTime.time}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(order.originalOrderData.items || []).map((item: any, i: number) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
                            ))}
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. Amount: ₹{order.originalOrderData.totalAmount}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                          <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
                          {order.status === 'scheduled' && (
                            <Button className="w-auto bg-green-600 hover:bg-green-700" onClick={() => handleConfirmPickupClick(order)}>
                              Confirm Pickup
                            </Button>
                          )}
                          {/* {order.status === 'confirmed' && (
                            <Button className="w-auto bg-blue-600 hover:bg-blue-700" onClick={() => handleStartPickupClick(order)}>
                              Start Pickup
                            </Button>
                          )} */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <h3 className="mt-4 text-lg font-medium">No upcoming pickups scheduled</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Check back later for new orders.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Confirmation Orders */}
        <TabsContent value="pendingConfirmation">
          <Card>
            <CardHeader>
              <CardTitle>Pickups Pending Confirmation</CardTitle>
              <CardDescription>
                Orders that are scheduled and need your confirmation to proceed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterOrders('pendingConfirmation').length > 0 ? (
                <div className="space-y-4">
                  {filterOrders('pendingConfirmation').map(order => {
                    const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
                      ? formatDateTime(order.originalOrderData.pickupDate._seconds)
                      : { date: 'N/A', time: 'N/A' };
                    return (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{order.id}</Badge>
                            <Badge className="bg-yellow-500">{order.status}</Badge>
                          </div>
                          <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
                          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{order.originalOrderData.pickupAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{dateTime.date} at {dateTime.time}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(order.originalOrderData.items || []).map((item: any, i: number) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
                            ))}
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. Amount: ₹{order.originalOrderData.totalAmount}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                          <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
                          <Button className="w-auto bg-green-600 hover:bg-green-700" onClick={() => handleConfirmPickupClick(order)}>
                            Confirm Pickup
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <h3 className="mt-4 text-lg font-medium">No pickups pending confirmation</h3>
                  <p className="mt-2 text-sm text-muted-foreground">All scheduled pickups are confirmed or completed.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>


        {/* All Orders */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                View all your assigned pickup requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterOrders('all').length > 0 ? (
                <div className="space-y-4">
                  {filterOrders('all').map(order => {
                    const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
                      ? formatDateTime(order.originalOrderData.pickupDate._seconds)
                      : { date: 'N/A', time: 'N/A' };
                    return (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{order.id}</Badge>
                            <Badge className="bg-yellow-500">{order.status}</Badge>
                          </div>
                          <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
                          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{order.originalOrderData.pickupAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{dateTime.date} at {dateTime.time}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(order.originalOrderData.items || []).map((item: any, i: number) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
                            ))}
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. Amount: ₹{order.originalOrderData.totalAmount}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                          <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
                          {order.status === 'scheduled' && (
                            <Button className="w-auto bg-green-600 hover:bg-green-700" onClick={() => handleConfirmPickupClick(order)}>
                              Confirm Pickup
                            </Button>
                          )}
                          {order.status === 'confirmed' && (
                            <Button className="w-auto bg-blue-600 hover:bg-blue-700" onClick={() => handleStartPickupClick(order)}>
                              Start Pickup
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <h3 className="mt-4 text-lg font-medium">No orders found</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Try a different search term.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Orders */}
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Pickups</CardTitle>
              <CardDescription>
                All pickups that have been successfully completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterOrders('completed').length > 0 ? (
                <div className="space-y-4">
                  {filterOrders('completed').map(order => {
                    const dateTime = order.originalOrderData.pickupDate && order.originalOrderData.pickupDate._seconds
                      ? formatDateTime(order.originalOrderData.pickupDate._seconds)
                      : { date: 'N/A', time: 'N/A' };
                    return (
                      <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{order.id}</Badge>
                            <Badge className="bg-green-500">{order.status}</Badge>
                          </div>
                          <h3 className="font-semibold">{order.originalOrderData.userId}</h3>
                          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                            <span>{order.originalOrderData.pickupAddress}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{dateTime.date} at {dateTime.time}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(order.originalOrderData.items || []).map((item: any, i: number) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType?.name || 'Unknown Scrap'}</span>
                            ))}
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Amount: ₹{order.originalOrderData.totalAmount}</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button onClick={() => handleOpenDetails(order)}>View Details</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                  <h3 className="mt-4 text-lg font-medium">No completed pickups</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Once pickups are finished, they will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details: {selectedOrder?.orderId}</DialogTitle>
            <DialogDescription>
              Detailed information about this pickup request
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
                  <p className="font-medium">{selectedOrder.originalOrderData.userId}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Pickup Status</h3>
                  <Badge className={selectedOrder.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}>
                    {selectedOrder.status}
                  </Badge>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                  <div className="flex items-start space-x-2 mt-1">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{selectedOrder.originalOrderData.pickupAddress}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
                  <p>
                    {selectedOrder.originalOrderData.pickupDate && selectedOrder.originalOrderData.pickupDate._seconds
                      ? `${formatDateTime(selectedOrder.originalOrderData.pickupDate._seconds).date} at ${formatDateTime(selectedOrder.originalOrderData.pickupDate._seconds).time}`
                      : 'N/A'}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Estimated Amount</h3>
                  <p>₹{selectedOrder.originalOrderData.totalAmount}</p>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Scrap Types</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(selectedOrder.originalOrderData.items || []).map((item: any, i: number) => (
                      <Badge key={i} variant="secondary">{item.scrapType?.name || 'Unknown Scrap'}</Badge>
                    ))}
                  </div>
                </div>

                {selectedOrder.originalOrderData.preparationInstructions && (
                  <div className="md:col-span-2">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Preparation Instructions</AlertTitle>
                      <AlertDescription>
                        {selectedOrder.originalOrderData.preparationInstructions}
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {(selectedOrder.originalOrderData.items || []).some((item: any) => item.images && item.images.length > 0) && (
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {(selectedOrder.originalOrderData.items || []).flatMap((item: any) => item.images || []).map((image: string, i: number) => (
                        <img
                          key={i}
                          src={image}
                          alt={`Scrap ${i + 1}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between space-x-4 pt-4">
                {selectedOrder.status !== 'completed' && (
                  <>
                    <Button variant="outline" className="w-full" onClick={handleRescheduleClick}>
                      Reschedule
                    </Button>
                    {selectedOrder.status === 'scheduled' && (
                      <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleConfirmPickupClick(selectedOrder)}>
                        Confirm Pickup
                      </Button>
                    )}
                    {selectedOrder.status === 'confirmed' && (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleStartPickupClick}>
                        Start Pickup
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reschedule Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reschedule Pickup</DialogTitle>
            <DialogDescription>
              Select a new date for the pickup of order {selectedOrder?.orderId}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="newDate" className="text-right">
                New Date
              </label>
              <Input
                id="newDate"
                type="date"
                className="col-span-3"
                value={newPickupDate}
                onChange={(e) => setNewPickupDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmReschedule}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;