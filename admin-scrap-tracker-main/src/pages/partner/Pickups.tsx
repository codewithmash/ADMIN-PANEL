



// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Upload, MapPin, Calendar, Check, X, Camera, FileDown, Scale, Star } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";
// import { useAuth } from "@/context/AuthContext";
// import { partnerDashboardService } from '@/services/partnerDahboardService';

// const Pickups = () => {
//     const [activePickups, setActivePickups] = useState([]);
//     const [completedPickups, setCompletedPickups] = useState([]);
//     const [selectedPickup, setSelectedPickup] = useState(null);
//     const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
//     const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false); // New state for cancel dialog
//     const [isBillDialogOpen, setIsBillDialogOpen] = useState(false);
//     const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
//     const [confirmData, setConfirmData] = useState({
//         actualWeight: '',
//         photos: [] as File[],
//         notes: ''
//     });
//     const [cancelData, setCancelData] = useState({ // New state for cancel data
//         rejectedReason: '',
//         photos: [] as File[],
//     });
//     const [reviewData, setReviewData] = useState({
//         rating: 5,
//         comment: ''
//     });
//     const [isLoading, setIsLoading] = useState(true);

//     const { user } = useAuth();
//     const { toast } = useToast();

//     const fetchPickups = async () => {
//         if (user?.phone && user?.id) { // Ensure user.id is available for completed pickups
//             setIsLoading(true);
//             try {
//                 const todayPickupsResponse = await partnerDashboardService.getOurForPickup(user.phone);
//                 // Assuming 'outforpickup' is the status for active pickups
//                 setActivePickups(todayPickupsResponse.data.filter(p => p.status === 'outForPickup'));

//                 const completedPickupsResponse = await partnerDashboardService.getCompletedPickups(user.phone);
//                 setCompletedPickups(completedPickupsResponse.data);

//             } catch (error) {
//                 console.error("Error fetching partner info:", error);
//                 toast({
//                     title: "Error",
//                     description: "Failed to fetch dashboard data. Please refresh the page.",
//                     variant: "destructive",
//                     duration: 3000,
//                 });
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     };

//     useEffect(() => {
//         fetchPickups();
//     }, [user, toast]);

//     const handleConfirmPickup = (pickup) => {
//         setSelectedPickup(pickup);
//         setConfirmData({ actualWeight: '', photos: [], notes: '' });
//         setIsConfirmDialogOpen(true);
//     };

//     const handleCancelPickup = (pickup) => { // New handler for canceling pickup
//         setSelectedPickup(pickup);
//         setCancelData({ rejectedReason: '', photos: [] });
//         setIsCancelDialogOpen(true);
//     };

//     const handleViewBill = (pickup) => {
//         setSelectedPickup(pickup);
//         setIsBillDialogOpen(true);
//     };

//     const handleReviewCustomer = (pickup) => {
//         setSelectedPickup(pickup);
//         setReviewData({ rating: 5, comment: '' });
//         setIsReviewDialogOpen(true);
//     };

//     const handleSubmitConfirmation = async () => {
//         if (!selectedPickup || !user?.phone) {
//             toast({
//                 title: "Error",
//                 description: "Selected pickup or user information is missing.",
//                 variant: "destructive",
//                 duration: 3000,
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append('collectorId', user.phone);
//         formData.append('orderId', selectedPickup.orderId);
//         formData.append('newStatus', 'completed');
//         formData.append('weight', confirmData.actualWeight);
//         formData.append('additionalInfo', confirmData.notes);

//         confirmData.photos.forEach((photo, index) => {
//             formData.append(`photos`, photo, photo.name);
//         });

//         try {
//             await partnerDashboardService.updateStatus(formData);

//             toast({
//                 title: "Pickup confirmed",
//                 description: `Pickup ${selectedPickup.originalOrderData.pickupId} has been confirmed successfully.`,
//                 duration: 3000,
//             });
//             setIsConfirmDialogOpen(false);
//             fetchPickups(); // Re-fetch data to update UI
//         } catch (error) {
//             console.error("Error confirming pickup:", error);
//             toast({
//                 title: "Error",
//                 description: `Failed to confirm pickup: ${error.message || 'An unexpected error occurred'}`,
//                 variant: "destructive",
//                 duration: 3000,
//             });
//         }
//     };

//     const handleSubmitCancellation = async () => { // New handler for submitting cancellation
//         if (!selectedPickup || !user?.phone) {
//             toast({
//                 title: "Error",
//                 description: "Selected pickup or user information is missing.",
//                 variant: "destructive",
//                 duration: 3000,
//             });
//             return;
//         }

//         const formData = new FormData();
//         formData.append('orderId', selectedPickup.orderId);
//         formData.append('rejectedReason', cancelData.rejectedReason);

//         cancelData.photos.forEach((photo, index) => {
//             formData.append(`images`, photo, photo.name);
//         });

//         try {
//             await partnerDashboardService.cancelPartnerOrder(formData); // Using the new API endpoint

//             toast({
//                 title: "Pickup Cancelled",
//                 description: `Pickup ${selectedPickup.originalOrderData.pickupId} has been cancelled successfully.`,
//                 duration: 3000,
//             });
//             setIsCancelDialogOpen(false);
//             fetchPickups(); // Re-fetch data to update UI
//         } catch (error) {
//             console.error("Error cancelling pickup:", error);
//             toast({
//                 title: "Error",
//                 description: `Failed to cancel pickup: ${error.message || 'An unexpected error occurred'}`,
//                 variant: "destructive",
//                 duration: 3000,
//             });
//         }
//     };

//     const handleSubmitReview = () => {
//         // In a real application, this would save the review to the server
//         // You would likely need a new service method for submitting reviews
//         setIsReviewDialogOpen(false);
//         toast({
//             title: "Review submitted",
//             description: "Thank you for your feedback!",
//             duration: 3000,
//         });
//     };

//     // Helper to format timestamp
//     const formatTimestamp = (timestamp) => {
//         if (!timestamp || !timestamp._seconds) return 'N/A';
//         const date = new Date(timestamp._seconds * 1000);
//         return date.toLocaleString(); // Adjust formatting as needed
//     };

//     return (
//         <div className="space-y-6">
//             <div>
//                 <h1 className="text-3xl font-bold tracking-tight">Pickups</h1>
//                 <p className="text-muted-foreground">
//                     Manage your scrap pickups
//                 </p>
//             </div>

//             <Tabs defaultValue="active">
//                 <TabsList>
//                     <TabsTrigger value="active">Active Pickups</TabsTrigger>
//                     <TabsTrigger value="completed">Completed</TabsTrigger>
//                 </TabsList>

//                 {/* Active Pickups */}
//                 <TabsContent value="active">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Active Pickups</CardTitle>
//                             <CardDescription>
//                                 Pickups in progress or pending confirmation
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             {isLoading ? (
//                                 <div className="py-12 text-center">
//                                     <p className="text-muted-foreground">Loading active pickups...</p>
//                                 </div>
//                             ) : activePickups.length > 0 ? (
//                                 <div className="space-y-4">
//                                     {activePickups.map(pickup => (
//                                         <div key={pickup.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
//                                             <div className="space-y-2">
//                                                 <div className="flex items-center space-x-2">
//                                                     <Badge variant="outline">{pickup.originalOrderData.pickupId}</Badge>
//                                                     <Badge className="bg-blue-500">
//                                                         {pickup.status === 'outforpickup' ? 'Out for Pickup' : 'In Progress'}
//                                                     </Badge>
//                                                 </div>
//                                                 <h3 className="font-semibold">{pickup.originalOrderData.pickupAddressPersonName}</h3>
//                                                 <div className="flex items-start space-x-2 text-sm text-muted-foreground">
//                                                     <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                                                     <span>{pickup.originalOrderData.pickupAddress}</span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                                                     <Calendar className="h-4 w-4" />
//                                                     <span>{formatTimestamp(pickup.originalOrderData.pickupDate)}</span>
//                                                 </div>
//                                                 <div className="flex flex-wrap gap-1 mt-2">
//                                                     {pickup.originalOrderData.items.map((item, i) => (
//                                                         <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType.name}</span>
//                                                     ))}
//                                                     <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. {pickup.originalOrderData.items.reduce((acc, item) => acc + item.quantity, 0)} kg</span>
//                                                 </div>
//                                             </div>
//                                             <div className="mt-4 md:mt-0 flex flex-col space-y-2">
//                                                 <Button
//                                                     onClick={() => handleConfirmPickup(pickup)}
//                                                     className="bg-green-600 hover:bg-green-700"
//                                                 >
//                                                     <Check className="mr-2 h-4 w-4" />
//                                                     Confirm Pickup
//                                                 </Button>
//                                                 <Button // New Cancel Pickup button
//                                                     onClick={() => handleCancelPickup(pickup)}
//                                                     className="bg-red-600 hover:bg-red-700"
//                                                 >
//                                                     <X className="mr-2 h-4 w-4" />
//                                                     Cancel Pickup
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="py-12 text-center">
//                                     <Check className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
//                                     <h3 className="mt-4 text-lg font-medium">No active pickups</h3>
//                                     <p className="mt-2 text-sm text-muted-foreground">All pickups have been completed.</p>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </TabsContent>

//                 {/* Completed Pickups */}
//                 <TabsContent value="completed">
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Completed Pickups</CardTitle>
//                             <CardDescription>
//                                 Successfully completed pickups
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             {isLoading ? (
//                                 <div className="py-12 text-center">
//                                     <p className="text-muted-foreground">Loading completed pickups...</p>
//                                 </div>
//                             ) : completedPickups.length > 0 ? (
//                                 <div className="space-y-4">
//                                     {completedPickups.map(pickup => (
//                                         <div key={pickup.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
//                                             <div className="space-y-2">
//                                                 <div className="flex items-center space-x-2">
//                                                     <Badge variant="outline">{pickup.originalOrderData.pickupId}</Badge>
//                                                     <Badge className="bg-green-500">Completed</Badge>
//                                                 </div>
//                                                 <h3 className="font-semibold">{pickup.originalOrderData.pickupAddressPersonName}</h3>
//                                                 <div className="flex items-start space-x-2 text-sm text-muted-foreground">
//                                                     <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
//                                                     <span>{pickup.originalOrderData.pickupAddress}</span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                                                     <Calendar className="h-4 w-4" />
//                                                     <span>{formatTimestamp(pickup.originalOrderData.pickupDate)}</span>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2 text-sm font-medium">
//                                                     <Scale className="h-4 w-4" />
//                                                     <span>{pickup.weight || 'N/A'} kg</span> {/* Use actualWeight from new data */}
//                                                 </div>
//                                             </div>
//                                             <div className="mt-4 md:mt-0 flex flex-col space-y-2">
//                                                 <Button
//                                                     variant="outline"
//                                                     onClick={() => handleViewBill(pickup)}
//                                                 >
//                                                     <FileDown className="mr-2 h-4 w-4" />
//                                                     View Bill
//                                                 </Button>
//                                                 {/* <Button
//                                                     variant="outline"
//                                                     onClick={() => handleReviewCustomer(pickup)}
//                                                 >
//                                                     <Star className="mr-2 h-4 w-4" />
//                                                     Review
//                                                 </Button> */}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="py-12 text-center">
//                                     <Scale className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
//                                     <h3 className="mt-4 text-lg font-medium">No completed pickups</h3>
//                                     <p className="mt-2 text-sm text-muted-foreground">Your completed pickups will appear here.</p>
//                                 </div>
//                             )}
//                         </CardContent>
//                     </Card>
//                 </TabsContent>
//             </Tabs>

//             {/* Confirm Pickup Dialog */}
//             <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
//                 <DialogContent className="max-w-md md:max-w-2xl">
//                     <DialogHeader>
//                         <DialogTitle>Confirm Pickup: {selectedPickup?.originalOrderData?.pickupId}</DialogTitle>
//                         <DialogDescription>
//                             Enter the actual weight and upload photos to confirm this pickup
//                         </DialogDescription>
//                     </DialogHeader>

//                     {selectedPickup && (
//                         <div className="space-y-6">
//                             <div className="space-y-4">
//                                 <div>
//                                     <Label htmlFor="actualWeight">Actual Weight (kg)</Label>
//                                     <Input
//                                         id="actualWeight"
//                                         type="number"
//                                         placeholder="Enter the actual weight in kg"
//                                         value={confirmData.actualWeight}
//                                         onChange={(e) => setConfirmData({ ...confirmData, actualWeight: e.target.value })}
//                                     />
//                                 </div>

//                                 <div>
//                                     <Label>Upload Photos</Label>
//                                     <div className="grid grid-cols-2 gap-4 mt-2">
//                                         <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
//                                             <Camera className="h-6 w-6 mx-auto mb-2 text-gray-400" />
//                                             <p className="text-sm text-muted-foreground">Photo of scrap</p>
//                                             <Input
//                                                 type="file"
//                                                 className="mt-2"
//                                                 accept="image/*"
//                                                 onChange={(e) => {
//                                                     if (e.target.files && e.target.files[0]) {
//                                                         // Replace photo at index 0 or add if not present
//                                                         const newPhotos = [...confirmData.photos];
//                                                         newPhotos[0] = e.target.files[0];
//                                                         setConfirmData({ ...confirmData, photos: newPhotos });
//                                                     }
//                                                 }}
//                                             />
//                                             {confirmData.photos[0] && <p className="text-xs text-green-500 mt-1">Uploaded: {confirmData.photos[0].name}</p>}
//                                         </div>
//                                         <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
//                                             <Scale className="h-6 w-6 mx-auto mb-2 text-gray-400" />
//                                             <p className="text-sm text-muted-foreground">Photo with weighing scale</p>
//                                             <Input
//                                                 type="file"
//                                                 className="mt-2"
//                                                 accept="image/*"
//                                                 onChange={(e) => {
//                                                     if (e.target.files && e.target.files[0]) {
//                                                         // Replace photo at index 1 or add if not present
//                                                         const newPhotos = [...confirmData.photos];
//                                                         newPhotos[1] = e.target.files[0];
//                                                         setConfirmData({ ...confirmData, photos: newPhotos });
//                                                     }
//                                                 }}
//                                             />
//                                             {confirmData.photos[1] && <p className="text-xs text-green-500 mt-1">Uploaded: {confirmData.photos[1].name}</p>}
//                                         </div>
//                                     </div>
//                                     {confirmData.photos.length > 0 && (
//                                         <div className="mt-2 text-sm text-gray-600">
//                                             Uploaded {confirmData.photos.length} photo(s).
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div>
//                                     <Label htmlFor="notes">Additional Notes</Label>
//                                     <Textarea
//                                         id="notes"
//                                         placeholder="Any additional information about this pickup"
//                                         value={confirmData.notes}
//                                         onChange={(e) => setConfirmData({ ...confirmData, notes: e.target.value })}
//                                     />
//                                 </div>
//                             </div>

//                             <div className="flex justify-end space-x-4 pt-4">
//                                 <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
//                                     Cancel
//                                 </Button>
//                                 <Button
//                                     className="bg-green-600 hover:bg-green-700"
//                                     onClick={handleSubmitConfirmation}
//                                     disabled={!confirmData.actualWeight || confirmData.photos.length < 2} // Require at least 2 photos
//                                 >
//                                     Confirm & Generate Bill
//                                 </Button>
//                             </div>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>

//             {/* Cancel Pickup Dialog */}
//             <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
//                 <DialogContent className="max-w-md">
//                     <DialogHeader>
//                         <DialogTitle>Cancel Pickup: {selectedPickup?.originalOrderData?.pickupId}</DialogTitle>
//                         <DialogDescription>
//                             Please provide a reason and optionally upload images for cancellation.
//                         </DialogDescription>
//                     </DialogHeader>

//                     {selectedPickup && (
//                         <div className="space-y-6">
//                             <div>
//                                 <Label htmlFor="rejectedReason">Reason for Cancellation</Label>
//                                 <Textarea
//                                     id="rejectedReason"
//                                     placeholder="e.g., Customer not available, incorrect items, etc."
//                                     value={cancelData.rejectedReason}
//                                     onChange={(e) => setCancelData({ ...cancelData, rejectedReason: e.target.value })}
//                                     className="mt-2"
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Upload Images (Optional)</Label>
//                                 <div className="border border-dashed border-gray-300 rounded-md p-4 text-center mt-2">
//                                     <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
//                                     <p className="text-sm text-muted-foreground">Drag and drop images here, or click to select files</p>
//                                     <Input
//                                         type="file"
//                                         className="mt-2"
//                                         accept="image/*"
//                                         multiple
//                                         onChange={(e) => {
//                                             if (e.target.files) {
//                                                 setCancelData({ ...cancelData, photos: Array.from(e.target.files) });
//                                             }
//                                         }}
//                                     />
//                                     {cancelData.photos.length > 0 && (
//                                         <div className="mt-2 text-sm text-gray-600">
//                                             Uploaded {cancelData.photos.length} photo(s).
//                                             <ul>
//                                                 {cancelData.photos.map((photo, index) => (
//                                                     <li key={index} className="text-xs">{photo.name}</li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             <DialogFooter>
//                                 <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
//                                     Close
//                                 </Button>
//                                 <Button
//                                     className="bg-red-600 hover:bg-red-700"
//                                     onClick={handleSubmitCancellation}
//                                     disabled={!cancelData.rejectedReason} // Reason is required for cancellation
//                                 >
//                                     Confirm Cancellation
//                                 </Button>
//                             </DialogFooter>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>

//             {/* Bill Dialog */}
//             <Dialog open={isBillDialogOpen} onOpenChange={setIsBillDialogOpen}>
//                 <DialogContent className="max-w-md">
//                     <DialogHeader>
//                         <DialogTitle>Bill: {selectedPickup?.originalOrderData?.pickupId}</DialogTitle>
//                         <DialogDescription>
//                             Digital bill for the scrap collection
//                         </DialogDescription>
//                     </DialogHeader>

//                     {selectedPickup && ( // The bill structure needs to be derived or fetched separately if not part of the initial pickup object
//                         <div className="space-y-6">
//                             <div className="border-b pb-4">
//                                 <div className="text-center mb-4">
//                                     <h2 className="font-bold text-xl">Scrap Collection Receipt</h2>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-4 text-sm">
//                                     <div>
//                                         <p className="text-muted-foreground">Order ID:</p>
//                                         <p className="font-medium">{selectedPickup.originalOrderData.orderId}</p>
//                                     </div>
//                                     <div className="text-right">
//                                         <p className="text-muted-foreground">Date:</p>
//                                         <p className="font-medium">{formatTimestamp(selectedPickup.originalOrderData.pickupDate)}</p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <p className="text-muted-foreground text-sm">Customer:</p>
//                                 <p className="font-medium">{selectedPickup.originalOrderData.pickupAddressPersonName}</p>
//                                 <p className="text-sm">{selectedPickup.originalOrderData.pickupAddress}</p>
//                             </div>

//                             <div>
//                                 <table className="w-full text-sm">
//                                     <thead>
//                                         <tr className="border-b">
//                                             <th className="py-2 text-left">Item</th>
//                                             <th className="py-2 text-right">Qty/Est. Weight</th>
//                                             <th className="py-2 text-right">Rate</th>
//                                             <th className="py-2 text-right">Amount</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {selectedPickup.originalOrderData.items.map((item, i) => (
//                                             <tr key={i} className="border-b">
//                                                 <td className="py-2">{item.scrapType.name}</td>
//                                                 <td className="py-2 text-right">{item.quantity} kg</td>
//                                                 <td className="py-2 text-right">₹{item.scrapType.ratePerKg}/kg</td>
//                                                 <td className="py-2 text-right">₹{item.quantity * item.scrapType.ratePerKg}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                     <tfoot>
//                                         <tr>
//                                             <td colSpan={3} className="py-2 text-right font-medium">Total (Estimated):</td>
//                                             <td className="py-2 text-right font-bold">₹{selectedPickup.originalOrderData.totalAmount}</td>
//                                         </tr>
//                                         {/* You might want to display the actual collected weight and calculated amount here */}
//                                         {selectedPickup.weight && (
//                                             <tr>
//                                                 <td colSpan={3} className="py-2 text-right font-medium">Actual Collected Weight:</td>
//                                                 <td className="py-2 text-right font-bold">{selectedPickup.weight} kg</td>
//                                             </tr>
//                                         )}
//                                         {/* If you have a calculated actual amount after confirmation */}
//                                         {/* <tr>
//                                             <td colSpan={3} className="py-2 text-right font-medium">Actual Amount:</td>
//                                             <td className="py-2 text-right font-bold">₹{selectedPickup.bill?.amount}</td>
//                                         </tr> */}
//                                     </tfoot>
//                                 </table>
//                             </div>

//                             {/* <div className="pt-4">
//                                 <Button className="w-full">
//                                     <FileDown className="mr-2 h-4 w-4" />
//                                     Download Bill
//                                 </Button>
//                             </div> */}
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>

//             {/* Review Dialog */}
//             <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
//                 <DialogContent className="max-w-md">
//                     <DialogHeader>
//                         <DialogTitle>Review Customer</DialogTitle>
//                         <DialogDescription>
//                             Share your feedback about this customer and pickup experience
//                         </DialogDescription>
//                     </DialogHeader>

//                     {selectedPickup && (
//                         <div className="space-y-6">
//                             <div>
//                                 <Label htmlFor="rating">Rating</Label>
//                                 <div className="flex space-x-1 mt-2">
//                                     {[1, 2, 3, 4, 5].map((rating) => (
//                                         <button
//                                             key={rating}
//                                             type="button"
//                                             className="p-0 bg-transparent border-0"
//                                             onClick={() => setReviewData({ ...reviewData, rating })}
//                                         >
//                                             <Star
//                                                 className={`h-6 w-6 ${rating <= reviewData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
//                                             />
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div>
//                                 <Label htmlFor="comment">Comments</Label>
//                                 <Textarea
//                                     id="comment"
//                                     placeholder="Share your experience with this customer..."
//                                     value={reviewData.comment}
//                                     onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
//                                     className="mt-2 h-32"
//                                 />
//                             </div>

//                             <DialogFooter>
//                                 <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>Cancel</Button>
//                                 <Button onClick={handleSubmitReview}>Submit Review</Button>
//                             </DialogFooter>
//                         </div>
//                     )}
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// };

// export default Pickups;



import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Upload, MapPin, Calendar, Check, X, Camera, FileDown, Scale, Star, Plus } from "lucide-react"; // Added Plus icon
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { partnerDashboardService } from '@/services/partnerDahboardService';
// import { scrapTypesService } from '@/services';
import { scrapTypesService } from '@/services/scrapTypesService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Import Select components

const Pickups = () => {
    const [activePickups, setActivePickups] = useState([]);
    const [completedPickups, setCompletedPickups] = useState([]);
    const [selectedPickup, setSelectedPickup] = useState(null);
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
    const [isBillDialogOpen, setIsBillDialogOpen] = useState(false);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false); // New state for Add Item dialog
    const [confirmData, setConfirmData] = useState({
        actualWeight: '',
        photos: [] as File[],
        notes: ''
    });
    const [cancelData, setCancelData] = useState({
        rejectedReason: '',
        photos: [] as File[],
    });
    const [addItemData, setAddItemData] = useState({ // New state for Add Item form
        scrapType: '', // Will store scrap type ID or JSON string
        quantity: '',
        ratePerKg: '',
        image: null as File | null,
    });
    const [scrapTypes, setScrapTypes] = useState([]); // State to store available scrap types
    const [reviewData, setReviewData] = useState({
        rating: 5,
        comment: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useAuth();
    const { toast } = useToast();

    const fetchPickups = async () => {
        if (user?.phone && user?.id) {
            setIsLoading(true);
            try {
                const todayPickupsResponse = await partnerDashboardService.getOurForPickup(user.phone);
                setActivePickups(todayPickupsResponse.data.filter(p => p.status === 'outForPickup'));

                const completedPickupsResponse = await partnerDashboardService.getCompletedPickups(user.phone);
                setCompletedPickups(completedPickupsResponse.data);

            } catch (error) {
                console.error("Error fetching partner info:", error);
                toast({
                    title: "Error",
                    description: "Failed to fetch dashboard data. Please refresh the page.",
                    variant: "destructive",
                    duration: 3000,
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchScrapTypes = async () => {
        try {
            // Assuming you have an API endpoint to fetch scrap types
            // This is a placeholder, replace with your actual service call
            // const response = await partnerDashboardService.getAllScrapTypes();
            const response = await scrapTypesService.getAll()
            console.log("response",response)
            setScrapTypes(response); // Assuming response.data is an array of scrap types
        } catch (error) {
            console.error("Error fetching scrap types:", error);
            toast({
                title: "Error",
                description: "Failed to fetch scrap types. Please try again.",
                variant: "destructive",
                duration: 3000,
            });
        }
    };


    useEffect(() => {
        fetchPickups();
        fetchScrapTypes(); // Fetch scrap types on component mount
        console.log("here")
    }, [user, toast]);

    const handleConfirmPickup = (pickup) => {
        setSelectedPickup(pickup);
        setConfirmData({ actualWeight: '', photos: [], notes: '' });
        setIsConfirmDialogOpen(true);
    };

    const handleCancelPickup = (pickup) => {
        setSelectedPickup(pickup);
        setCancelData({ rejectedReason: '', photos: [] });
        setIsCancelDialogOpen(true);
    };

    const handleViewBill = (pickup) => {
        setSelectedPickup(pickup);
        setIsBillDialogOpen(true);
    };

    const handleReviewCustomer = (pickup) => {
        setSelectedPickup(pickup);
        setReviewData({ rating: 5, comment: '' });
        setIsReviewDialogOpen(true);
    };

    const handleAddItem = () => { // New handler to open Add Item dialog
        setAddItemData({ scrapType: '', quantity: '', ratePerKg: '', image: null });
        setIsAddItemDialogOpen(true);
    };

    const handleSubmitConfirmation = async () => {
        if (!selectedPickup || !user?.phone) {
            toast({
                title: "Error",
                description: "Selected pickup or user information is missing.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append('collectorId', user.phone);
        formData.append('orderId', selectedPickup.orderId);
        formData.append('newStatus', 'completed');
        formData.append('weight', confirmData.actualWeight);
        formData.append('additionalInfo', confirmData.notes);

        confirmData.photos.forEach((photo, index) => {
            formData.append(`photos`, photo, photo.name);
        });

        try {
            await partnerDashboardService.updateStatus(formData);

            toast({
                title: "Pickup confirmed",
                description: `Pickup ${selectedPickup.originalOrderData.pickupId} has been confirmed successfully.`,
                duration: 3000,
            });
            setIsConfirmDialogOpen(false);
            fetchPickups(); // Re-fetch data to update UI
        } catch (error) {
            console.error("Error confirming pickup:", error);
            toast({
                title: "Error",
                description: `Failed to confirm pickup: ${error.message || 'An unexpected error occurred'}`,
                variant: "destructive",
                duration: 3000,
            });
        }
    };

    const handleSubmitCancellation = async () => {
        if (!selectedPickup || !user?.phone) {
            toast({
                title: "Error",
                description: "Selected pickup or user information is missing.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append('orderId', selectedPickup.orderId);
        formData.append('rejectedReason', cancelData.rejectedReason);

        cancelData.photos.forEach((photo, index) => {
            formData.append(`images`, photo, photo.name);
        });

        try {
            await partnerDashboardService.cancelPartnerOrder(formData);

            toast({
                title: "Pickup Cancelled",
                description: `Pickup ${selectedPickup.originalOrderData.pickupId} has been cancelled successfully.`,
                duration: 3000,
            });
            setIsCancelDialogOpen(false);
            fetchPickups(); // Re-fetch data to update UI
        } catch (error) {
            console.error("Error cancelling pickup:", error);
            toast({
                title: "Error",
                description: `Failed to cancel pickup: ${error.message || 'An unexpected error occurred'}`,
                variant: "destructive",
                duration: 3000,
            });
        }
    };

    const handleSubmitAddItem = async () => { // New handler for adding items
        if (!selectedPickup || !user?.phone || !addItemData.scrapType || !addItemData.quantity || !addItemData.ratePerKg) {
            toast({
                title: "Error",
                description: "Please fill all required fields for the new item.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        const selectedScrapType = scrapTypes.find(type => type.id === addItemData.scrapType);

        if (!selectedScrapType) {
            toast({
                title: "Error",
                description: "Invalid scrap type selected.",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        const formData = new FormData();
        formData.append('orderId', selectedPickup.orderId);
        formData.append('partnerOrderId', selectedPickup.id); // Assuming 'id' is the partnerOrderId

        // Construct scrapType JSON string as expected by backend
        const scrapTypeJson = JSON.stringify({
            id: selectedScrapType.id,
            name: selectedScrapType.name,
            ratePerKg: parseFloat(addItemData.ratePerKg),
            quantity: parseFloat(addItemData.quantity),
            category: selectedScrapType.category, // Assuming category exists on scrapType object
            unit: selectedScrapType.unit, // Assuming unit exists on scrapType object
        });
        formData.append('scrapType', scrapTypeJson);

        if (addItemData.image) {
            formData.append('image', addItemData.image, addItemData.image.name);
        }

        try {
            await partnerDashboardService.addItemToPartnerOrder(formData);

            toast({
                title: "Item Added",
                description: `New item "${selectedScrapType.name}" added to pickup ${selectedPickup.originalOrderData.pickupId}.`,
                duration: 3000,
            });
            setIsAddItemDialogOpen(false);
            fetchPickups(); // Re-fetch data to update UI
        } catch (error) {
            console.error("Error adding item:", error);
            toast({
                title: "Error",
                description: `Failed to add item: ${error.message || 'An unexpected error occurred'}`,
                variant: "destructive",
                duration: 3000,
            });
        }
    };


    const handleSubmitReview = () => {
        // In a real application, this would save the review to the server
        setIsReviewDialogOpen(false);
        toast({
            title: "Review submitted",
            description: "Thank you for your feedback!",
            duration: 3000,
        });
    };

    // Helper to format timestamp
    const formatTimestamp = (timestamp) => {
        if (!timestamp || !timestamp._seconds) return 'N/A';
        const date = new Date(timestamp._seconds * 1000);
        return date.toLocaleString(); // Adjust formatting as needed
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Pickups</h1>
                <p className="text-muted-foreground">
                    Manage your scrap pickups
                </p>
            </div>

            <Tabs defaultValue="active">
                <TabsList>
                    <TabsTrigger value="active">Active Pickups</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                {/* Active Pickups */}
                <TabsContent value="active">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Pickups</CardTitle>
                            <CardDescription>
                                Pickups in progress or pending confirmation
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="py-12 text-center">
                                    <p className="text-muted-foreground">Loading active pickups...</p>
                                </div>
                            ) : activePickups.length > 0 ? (
                                <div className="space-y-4">
                                    {activePickups.map(pickup => (
                                        <div key={pickup.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Badge variant="outline">{pickup.originalOrderData.pickupId}</Badge>
                                                    <Badge className="bg-blue-500">
                                                        {pickup.status === 'outforpickup' ? 'Out for Pickup' : 'In Progress'}
                                                    </Badge>
                                                </div>
                                                <h3 className="font-semibold">{pickup.originalOrderData.pickupAddressPersonName}</h3>
                                                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                                    <span>{pickup.originalOrderData.pickupAddress}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{formatTimestamp(pickup.originalOrderData.pickupDate)}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {pickup.originalOrderData.items.map((item, i) => (
                                                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{item.scrapType.name}</span>
                                                    ))}
                                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">Est. {pickup.originalOrderData.items.reduce((acc, item) => acc + item.quantity, 0)} kg</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                                                <Button
                                                    onClick={() => handleConfirmPickup(pickup)}
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Confirm Pickup
                                                </Button>
                                                <Button
                                                    onClick={() => handleCancelPickup(pickup)}
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    <X className="mr-2 h-4 w-4" />
                                                    Cancel Pickup
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <Check className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                                    <h3 className="mt-4 text-lg font-medium">No active pickups</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">All pickups have been completed.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Completed Pickups */}
                <TabsContent value="completed">
                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Pickups</CardTitle>
                            <CardDescription>
                                Successfully completed pickups
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="py-12 text-center">
                                    <p className="text-muted-foreground">Loading completed pickups...</p>
                                </div>
                            ) : completedPickups.length > 0 ? (
                                <div className="space-y-4">
                                    {completedPickups.map(pickup => (
                                        <div key={pickup.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Badge variant="outline">{pickup.originalOrderData.pickupId}</Badge>
                                                    <Badge className="bg-green-500">Completed</Badge>
                                                </div>
                                                <h3 className="font-semibold">{pickup.originalOrderData.pickupAddressPersonName}</h3>
                                                <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                                                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                                    <span>{pickup.originalOrderData.pickupAddress}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{formatTimestamp(pickup.originalOrderData.pickupDate)}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm font-medium">
                                                    <Scale className="h-4 w-4" />
                                                    <span>{pickup.weight || 'N/A'} kg</span> {/* Use actualWeight from new data */}
                                                </div>
                                            </div>
                                            <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleViewBill(pickup)}
                                                >
                                                    <FileDown className="mr-2 h-4 w-4" />
                                                    View Bill
                                                </Button>
                                                {/* <Button
                                                    variant="outline"
                                                    onClick={() => handleReviewCustomer(pickup)}
                                                >
                                                    <Star className="mr-2 h-4 w-4" />
                                                    Review
                                                </Button> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center">
                                    <Scale className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                                    <h3 className="mt-4 text-lg font-medium">No completed pickups</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">Your completed pickups will appear here.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Confirm Pickup Dialog */}
            <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
                <DialogContent className="max-w-md md:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Confirm Pickup: {selectedPickup?.originalOrderData?.pickupId}</DialogTitle>
                        <DialogDescription>
                            Enter the actual weight and upload photos to confirm this pickup
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPickup && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="actualWeight">Actual Weight (kg)</Label>
                                    <Input
                                        id="actualWeight"
                                        type="number"
                                        placeholder="Enter the actual weight in kg"
                                        value={confirmData.actualWeight}
                                        onChange={(e) => setConfirmData({ ...confirmData, actualWeight: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <Label>Upload Photos</Label>
                                    <div className="grid grid-cols-2 gap-4 mt-2">
                                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                                            <Camera className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm text-muted-foreground">Photo of scrap</p>
                                            <Input
                                                type="file"
                                                className="mt-2"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const newPhotos = [...confirmData.photos];
                                                        newPhotos[0] = e.target.files[0];
                                                        setConfirmData({ ...confirmData, photos: newPhotos });
                                                    }
                                                }}
                                            />
                                            {confirmData.photos[0] && <p className="text-xs text-green-500 mt-1">Uploaded: {confirmData.photos[0].name}</p>}
                                        </div>
                                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                                            <Scale className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm text-muted-foreground">Photo with weighing scale</p>
                                            <Input
                                                type="file"
                                                className="mt-2"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files[0]) {
                                                        const newPhotos = [...confirmData.photos];
                                                        newPhotos[1] = e.target.files[0];
                                                        setConfirmData({ ...confirmData, photos: newPhotos });
                                                    }
                                                }}
                                            />
                                            {confirmData.photos[1] && <p className="text-xs text-green-500 mt-1">Uploaded: {confirmData.photos[1].name}</p>}
                                        </div>
                                    </div>
                                    {confirmData.photos.length > 0 && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            Uploaded {confirmData.photos.length} photo(s).
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea
                                        id="notes"
                                        placeholder="Any additional information about this pickup"
                                        value={confirmData.notes}
                                        onChange={(e) => setConfirmData({ ...confirmData, notes: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4">
                                <Button
                                    variant="outline"
                                    onClick={handleAddItem} // New button to add items
                                    className="bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add More Items
                                </Button>
                                <div className="flex space-x-4">
                                    <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
                                        Close
                                    </Button>
                                    <Button
                                        className="bg-green-600 hover:bg-green-700"
                                        onClick={handleSubmitConfirmation}
                                        disabled={!confirmData.actualWeight || confirmData.photos.length < 2 || !confirmData.notes}
                                    >
                                        Confirm & Generate Bill
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Add Item Dialog */}
            <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add New Item to Pickup: {selectedPickup?.originalOrderData?.pickupId}</DialogTitle>
                        <DialogDescription>
                            Add additional scrap items collected during this pickup.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPickup && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="scrapType">Scrap Type</Label>
                                <Select
                                    value={addItemData.scrapType}
                                    onValueChange={(value) => {
                                        setAddItemData(prev => ({ ...prev, scrapType: value }));
                                        // Optional: set ratePerKg automatically if it's part of scrapTypes data
                                        const selected = scrapTypes.find(type => type.id === value);
                                        if (selected && selected.ratePerKg) {
                                            setAddItemData(prev => ({ ...prev, ratePerKg: selected.ratePerKg.toString() }));
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a scrap type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {scrapTypes.map((type) => (
                                            <SelectItem key={type.id} value={type.id}>
                                                {type.name} (₹{type.ratePerKg}/kg)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="quantity">Quantity (kg)</Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    placeholder="Enter quantity in kg"
                                    value={addItemData.quantity}
                                    onChange={(e) => setAddItemData({ ...addItemData, quantity: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="ratePerKg">Rate Per Kg (₹)</Label>
                                <Input
                                    id="ratePerKg"
                                    type="number"
                                    placeholder="Enter rate per kg"
                                    value={addItemData.ratePerKg}
                                    onChange={(e) => setAddItemData({ ...addItemData, ratePerKg: e.target.value })}
                                />
                            </div>
                            <div>
                                <Label htmlFor="itemImage">Upload Image (Optional)</Label>
                                <Input
                                    id="itemImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setAddItemData({ ...addItemData, image: e.target.files ? e.target.files[0] : null })}
                                />
                                {addItemData.image && <p className="text-xs text-green-500 mt-1">Uploaded: {addItemData.image.name}</p>}
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitAddItem}
                            disabled={!addItemData.scrapType || !addItemData.quantity || !addItemData.ratePerKg}
                        >
                            Add Item
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>


            {/* Cancel Pickup Dialog */}
            <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Cancel Pickup: {selectedPickup?.originalOrderData?.pickupId}</DialogTitle>
                        <DialogDescription>
                            Please provide a reason and optionally upload images for cancellation.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPickup && (
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="rejectedReason">Reason for Cancellation</Label>
                                <Textarea
                                    id="rejectedReason"
                                    placeholder="e.g., Customer not available, incorrect items, etc."
                                    value={cancelData.rejectedReason}
                                    onChange={(e) => setCancelData({ ...cancelData, rejectedReason: e.target.value })}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label>Upload Images (Optional)</Label>
                                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center mt-2">
                                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                                    <p className="text-sm text-muted-foreground">Drag and drop images here, or click to select files</p>
                                    <Input
                                        type="file"
                                        className="mt-2"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setCancelData({ ...cancelData, photos: Array.from(e.target.files) });
                                            }
                                        }}
                                    />
                                    {cancelData.photos.length > 0 && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            Uploaded {cancelData.photos.length} photo(s).
                                            <ul>
                                                {cancelData.photos.map((photo, index) => (
                                                    <li key={index} className="text-xs">{photo.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={handleSubmitCancellation}
                                    disabled={!cancelData.rejectedReason}
                                >
                                    Confirm Cancellation
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Bill Dialog */}
            <Dialog open={isBillDialogOpen} onOpenChange={setIsBillDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Bill: {selectedPickup?.originalOrderData?.pickupId}</DialogTitle>
                        <DialogDescription>
                            Digital bill for the scrap collection
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPickup && (
                        <div className="space-y-6">
                            <div className="border-b pb-4">
                                <div className="text-center mb-4">
                                    <h2 className="font-bold text-xl">Scrap Collection Receipt</h2>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Order ID:</p>
                                        <p className="font-medium">{selectedPickup.originalOrderData.orderId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-muted-foreground">Date:</p>
                                        <p className="font-medium">{formatTimestamp(selectedPickup.originalOrderData.pickupDate)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-muted-foreground text-sm">Customer:</p>
                                <p className="font-medium">{selectedPickup.originalOrderData.pickupAddressPersonName}</p>
                                <p className="text-sm">{selectedPickup.originalOrderData.pickupAddress}</p>
                            </div>

                            <div>
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="py-2 text-left">Item</th>
                                            <th className="py-2 text-right">Qty/Est. Weight</th>
                                            <th className="py-2 text-right">Rate</th>
                                            <th className="py-2 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedPickup.originalOrderData.items.map((item, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="py-2">{item.scrapType.name}</td>
                                                <td className="py-2 text-right">{item.quantity} kg</td>
                                                <td className="py-2 text-right">₹{item.scrapType.ratePerKg}/kg</td>
                                                <td className="py-2 text-right">₹{item.quantity * item.scrapType.ratePerKg}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={3} className="py-2 text-right font-medium">Total (Estimated):</td>
                                            <td className="py-2 text-right font-bold">₹{selectedPickup.originalOrderData.totalAmount}</td>
                                        </tr>
                                        {selectedPickup.weight && (
                                            <tr>
                                                <td colSpan={3} className="py-2 text-right font-medium">Actual Collected Weight:</td>
                                                <td className="py-2 text-right font-bold">{selectedPickup.weight} kg</td>
                                            </tr>
                                        )}
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Review Dialog */}
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Review Customer</DialogTitle>
                        <DialogDescription>
                            Share your feedback about this customer and pickup experience
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPickup && (
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="rating">Rating</Label>
                                <div className="flex space-x-1 mt-2">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <button
                                            key={rating}
                                            type="button"
                                            className="p-0 bg-transparent border-0"
                                            onClick={() => setReviewData({ ...reviewData, rating })}
                                        >
                                            <Star
                                                className={`h-6 w-6 ${rating <= reviewData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="comment">Comments</Label>
                                <Textarea
                                    id="comment"
                                    placeholder="Share your experience with this customer..."
                                    value={reviewData.comment}
                                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                    className="mt-2 h-32"
                                />
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>Cancel</Button>
                                <Button onClick={handleSubmitReview}>Submit Review</Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Pickups;