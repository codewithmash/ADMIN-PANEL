


// import { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { customerOrdersService } from '@/services/customerOrdersService';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Eye, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
// import { useToast } from '@/components/ui/use-toast';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { Textarea } from "@/components/ui/textarea";

// import { partnerService } from '@/services/partnerService';
// // Demo data for customer orders


// const CustomerOrders = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const { toast } = useToast();
//     const [orders, setOrders] = useState([]);
//     const [statusFilter, setStatusFilter] = useState('all'); // New state for status filter
//     const [paymentStatusFilter, setPaymentStatusFilter] = useState('all'); // New state for payment status filter

//     const [selectedOrder, setSelectedOrder] = useState<any>(null);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);



//     const fetchOrders = async () => {
//         try {
//             const response = await customerOrdersService.getAll();
//             console.log("response", response);
//             // Directly access response.orders as per the new structure
//             setOrders(response.orders); 
//         } catch (error) {
//             console.error('Error fetching orders:', error);
//             toast({
//                 title: "Error",
//                 description: "Failed to fetch bulk orders",
//                 variant: "destructive",
//             });
//         } finally {
//             // setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchOrders();

//     }, [toast]);




//     const [editOrder, setEditOrder] = useState<any>(null);
//     const [partners, setPartners] = useState([]);


//     const loadPartners = async () => {
//         try {
//             const data = await partnerService.getAll();

//             const approvedPartners = data.partners.filter(partner => partner.status === 'approved');
//             setPartners(approvedPartners);
//             // setPartners(data.partners);
//         } catch (err) {
//             toast({ title: "Error", description: "Failed to fetch customers.", variant: "destructive" });
//         }
//     };

//     useEffect(() => {
//         loadPartners();
//     }, []);

//     const handleStatusChange = (status: string) => {
//         setEditOrder({ ...editOrder, status });
//     };

//     const handleApproveOrder = async () => {
//         // Here you would typically make an API call to update the order
//         const response = await customerOrdersService.approveOrder(editOrder);
//         console.log('Approving order:', editOrder);
//         // Then close the dialog and refresh orders
//         setEditOrder(null);
//         fetchOrders(); // Uncomment to refresh orders after approval
//     };

//     const handleRejectOrder = async () => {
//         // Here you would typically make an API call to update the order
//         const response = await customerOrdersService.rejectOrder(editOrder);
//         console.log('Rejecting order:', editOrder);
//         // Then close the dialog and refresh orders
//         setEditOrder(null);
//         fetchOrders(); // Uncomment to refresh orders after rejection
//     };

//     const filteredOrders = orders.filter((order: any) => // Add type annotation for 'order'
//         (order.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             order.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase())) &&
//         (statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase()) &&
//         (paymentStatusFilter === 'all' || order.paymentStatus.toLowerCase() === paymentStatusFilter.toLowerCase())
//     );

//     // Status badge color
//     const getStatusColor = (status: string) => {
//         switch (status) {
//             case 'pending':
//             case 'pending_approval':
//                 return 'bg-yellow-100 text-yellow-800';
//             case 'processing':
//                 return 'bg-blue-100 text-blue-800';
//             case 'completed':
//                 return 'bg-green-100 text-green-800';
//             case 'cancelled':
//                 return 'bg-red-100 text-red-800';
//             case 'approved': // Assuming 'approved' is also a status, add a color
//                 return 'bg-purple-100 text-purple-800';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };

//     // Format items for display
//     const formatOrderItems = (items: any[]) => {
//         const itemCount = items.length;
//         // Ensure item.scrapType exists before accessing its properties
//         const uniqueTypes = [...new Set(items.map(item => item.scrapType?.name).filter(Boolean))]; 
//         return `${itemCount} items (${uniqueTypes.join(', ')})`;
//     };

//     const viewOrderDetails = (order: any) => {
//         setSelectedOrder(order);
//     };

//     const goBackToList = () => {
//         setSelectedOrder(null);
//     };

//     if (selectedOrder) {
//         return (
//             <Card className="mb-8">
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                         <Button variant="outline" size="sm" onClick={goBackToList}>
//                             <ArrowLeft className="mr-2 h-4 w-4" />
//                             Back to Orders
//                         </Button>
//                         <CardTitle>Order Details</CardTitle>
//                     </div>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="grid gap-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="border rounded-lg p-4">
//                                 <h3 className="font-medium mb-3">Order Information</h3>
//                                 <div className="space-y-2 text-sm">
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Order ID:</span>
//                                         <span>{selectedOrder.orderId}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Status:</span>
//                                         <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
//                                             {selectedOrder.status.split('_').map((word: string) => // Add type annotation for 'word'
//                                                 word.charAt(0).toUpperCase() + word.slice(1)
//                                             ).join(' ')}
//                                         </span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Created:</span>
//                                         <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Pickup Date:</span>
//                                         <span>{new Date(selectedOrder.pickupDate).toLocaleString()}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Total Amount:</span>
//                                         {/* Handle null totalAmount */}
//                                         <span>₹{selectedOrder.totalAmount !== null ? selectedOrder.totalAmount.toFixed(2) : 'N/A'}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="border rounded-lg p-4">
//                                 <h3 className="font-medium mb-3">Customer Information</h3>
//                                 <div className="space-y-2 text-sm">
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">User:</span>
//                                         <span>{selectedOrder.userId}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Pickup Address:</span>
//                                         <span>{selectedOrder.pickupAddress}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Payment Status:</span>
//                                         <span>{selectedOrder.paymentStatus}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Recurring:</span>
//                                         <span>{selectedOrder.isRecurring ? 'Yes' : 'No'}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="border rounded-lg p-4">
//                             <h3 className="font-medium mb-3">Order Items</h3>
//                             <div className="space-y-4">
//                                 {selectedOrder.items.map((item: any, index: number) => (
//                                     <div key={index} className="border rounded-lg p-4">
//                                         <div className="flex flex-col md:flex-row justify-between gap-4">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center justify-between">
//                                                     {/* Ensure item.scrapType exists */}
//                                                     <h4 className="font-medium">{item.scrapType?.name || 'N/A'}</h4>
//                                                     <span className="text-sm">₹{item.scrapType?.ratePerKg || 0}/kg</span>
//                                                 </div>
//                                                 <div className="mt-2 space-y-1 text-sm">
//                                                     <p>Quantity: {item.scrapType?.quantity || 0} {item.scrapType?.unit || ''}</p>
//                                                     <p>Subtotal: ₹{((item.scrapType?.quantity || 0) * (item.scrapType?.ratePerKg || 0)).toFixed(2)}</p>
//                                                     {item.notes && <p className="text-gray-500">Notes: {item.notes}</p>}
//                                                 </div>
//                                             </div>
//                                             <div className="flex space-x-2 overflow-x-auto">
//                                                 {/* Ensure item.scrapType.scrapImage exists and is an array if multiple images are expected */}
//                                                 {item.scrapType?.scrapImage && (
//                                                     <img
//                                                         src={item.scrapType.scrapImage}
//                                                         alt={`Item ${index + 1}`}
//                                                         className="h-24 w-24 object-cover rounded border"
//                                                     />
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         <div className="border rounded-lg p-4">
//                             <h3 className="font-medium mb-3">Pickup Information</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div className="space-y-2 text-sm">
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Pickup ID:</span>
//                                         <span>{selectedOrder.pickupId}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Scheduled Date:</span>
//                                         <span>{new Date(selectedOrder.pickupDate).toLocaleString()}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Collector:</span>
//                                         <span>{selectedOrder.collectorId || 'Not assigned'}</span>
//                                     </div>
//                                 </div>
//                                 <div className="space-y-2 text-sm">
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Address:</span>
//                                         <span>{selectedOrder.pickupAddress}</span>
//                                     </div>
//                                     <div className="flex">
//                                         <span className="text-gray-500 w-32">Status Timeline:</span>
//                                         <span>
//                                             Created: {new Date(selectedOrder.statusTimeline.created).toLocaleDateString()}
//                                             {selectedOrder.statusTimeline.scheduled && ` | Scheduled: ${new Date(selectedOrder.statusTimeline.scheduled).toLocaleDateString()}`}
//                                             {selectedOrder.statusTimeline.completed && ` | Completed: ${new Date(selectedOrder.statusTimeline.completed).toLocaleDateString()}`}
//                                         </span>
//                                     </div>
//                                     {selectedOrder.notes && (
//                                         <div className="flex">
//                                             <span className="text-gray-500 w-32">Notes:</span>
//                                             <span>{selectedOrder.notes}</span>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {selectedOrder.preparationInstructions && (
//                             <div className="border rounded-lg p-4">
//                                 <h3 className="font-medium mb-3">Preparation Instructions</h3>
//                                 <p className="text-sm">{selectedOrder.preparationInstructions}</p>
//                             </div>
//                         )}

//                         {selectedOrder.status === 'completed' && (
//                             <div className="border rounded-lg p-4">
//                                 <h3 className="font-medium mb-3">Completion Details</h3>
//                                 <div className="space-y-2 text-sm">
//                                     {selectedOrder.weight && (
//                                         <div className="flex">
//                                             <span className="text-gray-500 w-32">Actual Weight:</span>
//                                             <span>{selectedOrder.weight} kg</span>
//                                         </div>
//                                     )}
//                                     {selectedOrder.additionalInfo && (
//                                         <div className="flex">
//                                             <span className="text-gray-500 w-32">Additional Info:</span>
//                                             <span>{selectedOrder.additionalInfo}</span>
//                                         </div>
//                                     )}
//                                     {selectedOrder.photos && selectedOrder.photos.length > 0 && (
//                                         <div className="flex flex-col">
//                                             <span className="text-gray-500 w-32 mb-2">Collected Photos:</span>
//                                             <div className="flex space-x-2 overflow-x-auto">
//                                                 {selectedOrder.photos.map((photo: string, photoIndex: number) => (
//                                                     <img
//                                                         key={photoIndex}
//                                                         src={photo}
//                                                         alt={`Collected Photo ${photoIndex + 1}`}
//                                                         className="h-24 w-24 object-cover rounded border"
//                                                     />
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}

//                     </div>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <Card className="mb-8">
//             <CardHeader className="flex flex-row items-center justify-between">
//                 <CardTitle>Scrap Orders</CardTitle>
//                 <Button>
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add New Order
//                 </Button>
//             </CardHeader>
//             <CardContent>
//                 <div className="mb-4 flex items-center space-x-4">
//                     <Input
//                         placeholder="Search orders by user, order ID or address..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="max-w-sm"
//                     />
//                     <div className="flex space-x-2">
//                         <Button
//                             variant={statusFilter === 'all' ? 'default' : 'outline'}
//                             onClick={() => setStatusFilter('all')}
//                         >
//                             All
//                         </Button>
//                         <Button
//                             variant={statusFilter === 'pending' || statusFilter === 'pending_approval' ? 'default' : 'outline'}
//                             onClick={() => setStatusFilter('pending')}
//                         >
//                             Pending
//                         </Button>
//                         <Button
//                             variant={statusFilter === 'processing' || statusFilter === 'approved' ? 'default' : 'outline'}
//                             onClick={() => setStatusFilter('Scheduled')} // Using 'processing' to cover 'scheduled'/'approved' if they represent a scheduled state
//                         >
//                             Scheduled
//                         </Button>
//                         <Button
//                             variant={statusFilter === 'completed' ? 'default' : 'outline'}
//                             onClick={() => setStatusFilter('completed')}
//                         >
//                             Completed
//                         </Button>
//                         <Button
//                             variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
//                             onClick={() => setStatusFilter('Rejected')}
//                         >
//                             Cancelled
//                         </Button>
//                     </div>

//                     <Select
//                         value={paymentStatusFilter}
//                         onValueChange={setPaymentStatusFilter}
//                     >
//                         <SelectTrigger className="w-[180px]">
//                             <SelectValue placeholder="Payment Status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Payment Status</SelectItem>
//                             <SelectItem value="paid">Paid</SelectItem>
//                             <SelectItem value="pending">Unpaid</SelectItem>
//                             {/* <SelectItem value="refunded">Refunded</SelectItem> */}
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>User</TableHead>

//                             <TableHead>Items</TableHead>
//                             <TableHead>Total Amount</TableHead>
//                             <TableHead>Status</TableHead>
//                             <TableHead>Order ID</TableHead>
//                             <TableHead className="w-[150px]">Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {filteredOrders.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={6} className="text-center">
//                                     No orders found
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             filteredOrders.map((order: any) => ( // Add type annotation for 'order'
//                                 <TableRow key={order.id}>
//                                     <TableCell>
//                                         <div className="font-medium">{order.userId}</div>
//                                         <div className="text-sm text-gray-500">{order.pickupAddress}</div>
//                                     </TableCell>

//                                     <TableCell>
//                                         {formatOrderItems(order.items)}
//                                     </TableCell>
//                                     {/* Handle null totalAmount and display N/A if null */}
//                                     <TableCell>₹{order.totalAmount !== null ? order.totalAmount.toFixed(2) : 'N/A'}</TableCell>
//                                     <TableCell>
//                                         <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
//                                             {order.status.split('_').map((word: string) => // Add type annotation for 'word'
//                                                 word.charAt(0).toUpperCase() + word.slice(1)
//                                             ).join(' ')}
//                                         </span>
//                                     </TableCell>
//                                     <TableCell>
//                                         <div className="flex items-center">
//                                             <span className="mr-2">{order.orderId}</span>
//                                             <Button
//                                                 variant="ghost"
//                                                 size="sm"
//                                                 onClick={() => viewOrderDetails(order)}
//                                                 className="p-1"
//                                             >
//                                                 <Eye className="h-4 w-4 text-blue-500" />
//                                             </Button>
//                                         </div>
//                                     </TableCell>
//                                     <TableCell className="flex space-x-2">
//                                         <Button variant="ghost" size="sm" onClick={() => setEditOrder(order)}>
//                                             <Edit className="h-4 w-4" />
//                                         </Button>
//                                         <Button variant="ghost" size="sm">
//                                             <Trash2 className="h-4 w-4 text-red-500" />
//                                         </Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </CardContent>


//             {editOrder && (
//                 <Dialog open={!!editOrder} onOpenChange={(open) => !open && setEditOrder(null)}>
//                     <DialogContent className="sm:max-w-[600px]">
//                         <DialogHeader>
//                             <DialogTitle>Update Order Status</DialogTitle>
//                             <DialogDescription>
//                                 Update status for order {editOrder.orderId}
//                             </DialogDescription>
//                         </DialogHeader>

//                         <div className="grid gap-4 py-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="status">Status</Label>
//                                 <Select
//                                     value={editOrder.status}
//                                     onValueChange={handleStatusChange}
//                                 >
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select status" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="approve">Approve</SelectItem>
//                                         <SelectItem value="reject">Reject</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>

//                             {editOrder.status === 'approve' && (
//                                 <>
//                                     <div className="space-y-2">
//                                         <Label htmlFor="pickupDate">Pickup Date</Label>
//                                         <Input
//                                             type="datetime-local"
//                                             id="pickupDate"
//                                             value={editOrder.pickupDate ? new Date(editOrder.pickupDate).toISOString().slice(0, 16) : ''}
//                                             onChange={(e) => setEditOrder({
//                                                 ...editOrder,
//                                                 pickupDate: new Date(e.target.value).toISOString()
//                                             })}
//                                         />
//                                     </div>

//                                     <div className="space-y-2">
//                                         <Label htmlFor="partner">Assign Partner</Label>
//                                         <Select
//                                             value={editOrder.collectorId || ''}
//                                             onValueChange={(value) => setEditOrder({
//                                                 ...editOrder,
//                                                 collectorId: value
//                                             })}
//                                         >
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Select a partner" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 {partners.map((partner: any) => ( // Add type annotation for 'partner'
//                                                     <SelectItem key={partner.id} value={partner.id}>
//                                                         {partner.fullName}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </div>
//                                 </>
//                             )}

//                             <div className="space-y-2">
//                                 <Label htmlFor="notes">Notes</Label>
//                                 <Textarea
//                                     id="notes"
//                                     value={editOrder.notes || ''}
//                                     onChange={(e) => setEditOrder({
//                                         ...editOrder,
//                                         notes: e.target.value
//                                     })}
//                                     placeholder="Add any additional notes..."
//                                 />
//                             </div>
//                         </div>

//                         <DialogFooter>
//                             <Button
//                                 variant="outline"
//                                 onClick={() => setEditOrder(null)}
//                             >
//                                 Cancel
//                             </Button>
//                             {editOrder.status === 'approve' ? (
//                                 <Button onClick={handleApproveOrder}>
//                                     Approve Order
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     variant="destructive"
//                                     onClick={handleRejectOrder}
//                                 >
//                                     Reject Order
//                                 </Button>
//                             )}
//                         </DialogFooter>
//                     </DialogContent>
//                 </Dialog>
//             )}
//         </Card>
//     );
// };

// export default CustomerOrders;




import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { customerOrdersService } from '@/services/customerOrdersService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Eye, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";

import { partnerService } from '@/services/partnerService';
// Demo data for customer orders


const CustomerOrders = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { toast } = useToast();
    const [orders, setOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all'); // New state for status filter
    const [paymentStatusFilter, setPaymentStatusFilter] = useState('all'); // New state for payment status filter

    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // New state for payment status update dialog
    const [showPaymentStatusDialog, setShowPaymentStatusDialog] = useState(false);


    const fetchOrders = async () => {
        try {
            const response = await customerOrdersService.getAll();
            console.log("response", response);
            // Directly access response.orders as per the new structure
            setOrders(response.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast({
                title: "Error",
                description: "Failed to fetch bulk orders",
                variant: "destructive",
            });
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

    }, [toast]);




    const [editOrder, setEditOrder] = useState<any>(null);
    const [partners, setPartners] = useState([]);


    const loadPartners = async () => {
        try {
            const data = await partnerService.getAll();

            const approvedPartners = data.partners.filter(partner => partner.status === 'approved');
            setPartners(approvedPartners);
            // setPartners(data.partners);
        } catch (err) {
            toast({ title: "Error", description: "Failed to fetch customers.", variant: "destructive" });
        }
    };

    useEffect(() => {
        loadPartners();
    }, []);

    const handleStatusChange = (status: string) => {
        setEditOrder({ ...editOrder, status });
    };

    const handleApproveOrder = async () => {
        try {
            const response = await customerOrdersService.approveOrder(editOrder);
            console.log('Approving order:', editOrder);
            toast({
                title: "Success",
                description: "Order approved successfully.",
            });
            setEditOrder(null);
            fetchOrders();
        } catch (error) {
            console.error('Error approving order:', error);
            toast({
                title: "Error",
                description: "Failed to approve order.",
                variant: "destructive",
            });
        }
    };

    const handleRejectOrder = async () => {
        try {
        
            const response = await customerOrdersService.rejectOrder(editOrder);
            
            toast({
                title: "Success",
                description: "Order rejected successfully.",
            });
            setEditOrder(null);
            fetchOrders();
        } catch (error) {
            console.error('Error rejecting order:', error);
            toast({
                title: "Error",
                description: "Failed to reject order.",
                variant: "destructive",
            });
        }
    };

    // New function to handle payment processed status update
    const handlePaymentProcessed = async () => {
        try {
            const dataToUpdate = {
                orderId: selectedOrder.orderId,
                status: 'paymentProcessed', // The new status for payment
            };
            await customerOrdersService.updateOrderStatus(dataToUpdate);
            toast({
                title: "Success",
                description: "Payment status updated to 'Payment Processed'.",
            });
            setShowPaymentStatusDialog(false); // Close the dialog
            fetchOrders(); // Refresh orders to show updated status
        } catch (error) {
            console.error('Error updating payment status:', error);
            toast({
                title: "Error",
                description: "Failed to update payment status.",
                variant: "destructive",
            });
        }
    };

    const filteredOrders = orders.filter((order: any) => // Add type annotation for 'order'
        (order.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.pickupAddress.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase()) &&
        (paymentStatusFilter === 'all' || order.paymentStatus.toLowerCase() === paymentStatusFilter.toLowerCase())
    );

    // Status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
            case 'pending_approval':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            case 'approved': // Assuming 'approved' is also a status, add a color
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Format items for display
    const formatOrderItems = (items: any[]) => {
        const itemCount = items.length;
        // Ensure item.scrapType exists before accessing its properties
        const uniqueTypes = [...new Set(items.map(item => item.scrapType?.name).filter(Boolean))];
        return `${itemCount} items (${uniqueTypes.join(', ')})`;
    };

    const viewOrderDetails = (order: any) => {
        setSelectedOrder(order);
    };

    const goBackToList = () => {
        setSelectedOrder(null);
    };

    if (selectedOrder) {
        return (
            <Card className="mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="sm" onClick={goBackToList}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Button>
                        <CardTitle>Order Details</CardTitle>
                    </div>
                    {selectedOrder.status === 'completed' && selectedOrder.paymentStatus !== 'paymentProcessed' && (
                        <Button onClick={() => setShowPaymentStatusDialog(true)}>
                            Update Payment Status
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-3">Order Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Order ID:</span>
                                        <span>{selectedOrder.orderId}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status.split('_').map((word: string) => // Add type annotation for 'word'
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Created:</span>
                                        <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Pickup Date:</span>
                                        <span>{new Date(selectedOrder.pickupDate).toLocaleString()}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Total Amount:</span>
                                        {/* Handle null totalAmount */}
                                        <span>₹{selectedOrder.totalAmount !== null ? selectedOrder.totalAmount.toFixed(2) : 'N/A'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-3">Customer Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">User:</span>
                                        <span>{selectedOrder.userId}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Pickup Address:</span>
                                        <span>{selectedOrder.pickupAddress}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Payment Status:</span>
                                        <span>{selectedOrder.paymentStatus}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Recurring:</span>
                                        <span>{selectedOrder.isRecurring ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-3">Order Items</h3>
                            <div className="space-y-4">
                                {selectedOrder.items.map((item: any, index: number) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <div className="flex flex-col md:flex-row justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    {/* Ensure item.scrapType exists */}
                                                    <h4 className="font-medium">{item.scrapType?.name || 'N/A'}</h4>
                                                    <span className="text-sm">₹{item.scrapType?.ratePerKg || 0}/kg</span>
                                                </div>
                                                <div className="mt-2 space-y-1 text-sm">
                                                    <p>Quantity: {item.scrapType?.quantity || 0} {item.scrapType?.unit || ''}</p>
                                                    <p>Subtotal: ₹{((item.scrapType?.quantity || 0) * (item.scrapType?.ratePerKg || 0)).toFixed(2)}</p>
                                                    {item.notes && <p className="text-gray-500">Notes: {item.notes}</p>}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 overflow-x-auto">
                                                {/* Ensure item.scrapType.scrapImage exists and is an array if multiple images are expected */}
                                                {item.scrapType?.scrapImage && (
                                                    <img
                                                        src={item.scrapType.scrapImage}
                                                        alt={`Item ${index + 1}`}
                                                        className="h-24 w-24 object-cover rounded border"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-3">Pickup Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 text-sm">
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Pickup ID:</span>
                                        <span>{selectedOrder.pickupId}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Scheduled Date:</span>
                                        <span>{new Date(selectedOrder.pickupDate).toLocaleString()}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Collector:</span>
                                        <span>{selectedOrder.collectorId || 'Not assigned'}</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Address:</span>
                                        <span>{selectedOrder.pickupAddress}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-500 w-32">Status Timeline:</span>
                                        <span>
                                            Created: {new Date(selectedOrder.statusTimeline.created).toLocaleDateString()}
                                            {selectedOrder.statusTimeline.scheduled && ` | Scheduled: ${new Date(selectedOrder.statusTimeline.scheduled).toLocaleDateString()}`}
                                            {selectedOrder.statusTimeline.completed && ` | Completed: ${new Date(selectedOrder.statusTimeline.completed).toLocaleDateString()}`}
                                        </span>
                                    </div>
                                    {selectedOrder.notes && (
                                        <div className="flex">
                                            <span className="text-gray-500 w-32">Notes:</span>
                                            <span>{selectedOrder.notes}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedOrder.preparationInstructions && (
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-3">Preparation Instructions</h3>
                                <p className="text-sm">{selectedOrder.preparationInstructions}</p>
                            </div>
                        )}

                        {selectedOrder.status === 'completed' && (
                            <div className="border rounded-lg p-4">
                                <h3 className="font-medium mb-3">Completion Details</h3>
                                <div className="space-y-2 text-sm">
                                    {selectedOrder.weight && (
                                        <div className="flex">
                                            <span className="text-gray-500 w-32">Actual Weight:</span>
                                            <span>{selectedOrder.weight} kg</span>
                                        </div>
                                    )}
                                    {selectedOrder.additionalInfo && (
                                        <div className="flex">
                                            <span className="text-gray-500 w-32">Additional Info:</span>
                                            <span>{selectedOrder.additionalInfo}</span>
                                        </div>
                                    )}
                                    {selectedOrder.photos && selectedOrder.photos.length > 0 && (
                                        <div className="flex flex-col">
                                            <span className="text-gray-500 w-32 mb-2">Collected Photos:</span>
                                            <div className="flex space-x-2 overflow-x-auto">
                                                {selectedOrder.photos.map((photo: string, photoIndex: number) => (
                                                    <img
                                                        key={photoIndex}
                                                        src={photo}
                                                        alt={`Collected Photo ${photoIndex + 1}`}
                                                        className="h-24 w-24 object-cover rounded border"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </CardContent>

                {/* Payment Status Update Dialog */}
                {showPaymentStatusDialog && (
                    <Dialog open={showPaymentStatusDialog} onOpenChange={setShowPaymentStatusDialog}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Confirm Payment Status Update</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to mark the payment for order **{selectedOrder.orderId}** as "Payment Processed"?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setShowPaymentStatusDialog(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handlePaymentProcessed}>
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </Card>
        );
    }

    return (
        <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Scrap Orders</CardTitle>
                {/* <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Order
                </Button> */}
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center space-x-4">
                    <Input
                        placeholder="Search orders by user, order ID or address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-sm"
                    />
                    <div className="flex space-x-2">
                        <Button
                            variant={statusFilter === 'all' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={statusFilter === 'pending' || statusFilter === 'pending_approval' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('pending')}
                        >
                            Pending
                        </Button>
                        <Button
                            variant={statusFilter === 'processing' || statusFilter === 'approved' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('Scheduled')} // Using 'processing' to cover 'scheduled'/'approved' if they represent a scheduled state
                        >
                            Scheduled
                        </Button>
                        <Button
                            variant={statusFilter === 'completed' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('completed')}
                        >
                            Completed
                        </Button>
                        <Button
                            variant={statusFilter === 'cancelled' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('Rejected')}
                        >
                            Cancelled
                        </Button>

                         <Button
                            variant={statusFilter === 'PaymentProcessed' ? 'default' : 'outline'}
                            onClick={() => setStatusFilter('PaymentProcessed')}
                        >
                            PaymentProcessed
                        </Button>
                         
                        
                    </div>

                    <Select
                        value={paymentStatusFilter}
                        onValueChange={setPaymentStatusFilter}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Payment Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Payment Status</SelectItem>
                            <SelectItem value="paid">Paid</SelectItem>
                            <SelectItem value="pending">Unpaid</SelectItem>
                            {/* <SelectItem value="refunded">Refunded</SelectItem> */}
                        </SelectContent>
                    </Select>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>

                            <TableHead>Items</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Order ID</TableHead>
                            <TableHead className="w-[150px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No orders found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredOrders.map((order: any) => ( // Add type annotation for 'order'
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <div className="font-medium">{order.userId}</div>
                                        <div className="text-sm text-gray-500">{order.pickupAddress}</div>
                                    </TableCell>

                                    <TableCell>
                                        {formatOrderItems(order.items)}
                                    </TableCell>
                                    {/* Handle null totalAmount and display N/A if null */}
                                    <TableCell>₹{order.totalAmount !== null ? order.totalAmount.toFixed(2) : 'N/A'}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                                            {order.status.split('_').map((word: string) => // Add type annotation for 'word'
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <span className="mr-2">{order.orderId}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => viewOrderDetails(order)}
                                                className="p-1"
                                            >
                                                <Eye className="h-4 w-4 text-blue-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="flex space-x-2">
                                        <Button variant="ghost" size="sm" onClick={() => setEditOrder(order)}>
                                            <Edit className="h-4 w-4" />
                                            
                                        </Button>
                                        {/* {order.status === 'completed' && order.paymentStatus !== 'paymentProcessed' && (
                                                <Button onClick={() => setShowPaymentStatusDialog(true)}>
                                                    Update Payment Status
                                                </Button>
                                            )} */}
                                        <Button variant="ghost" size="sm">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>


            {editOrder && (
                <Dialog open={!!editOrder} onOpenChange={(open) => !open && setEditOrder(null)}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Update Order Status</DialogTitle>
                            <DialogDescription>
                                Update status for order {editOrder.orderId}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={editOrder.status}
                                    onValueChange={handleStatusChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="approve">Approve</SelectItem>
                                        <SelectItem value="reject">Reject</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {editOrder.status === 'approve' && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="pickupDate">Pickup Date</Label>
                                        <Input
                                            type="datetime-local"
                                            id="pickupDate"
                                            value={editOrder.pickupDate ? new Date(editOrder.pickupDate).toISOString().slice(0, 16) : ''}
                                            onChange={(e) => setEditOrder({
                                                ...editOrder,
                                                pickupDate: new Date(e.target.value).toISOString()
                                            })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="partner">Assign Partner</Label>
                                        <Select
                                            value={editOrder.collectorId || ''}
                                            onValueChange={(value) => setEditOrder({
                                                ...editOrder,
                                                collectorId: value
                                            })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a partner" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {partners.map((partner: any) => ( // Add type annotation for 'partner'
                                                    <SelectItem key={partner.id} value={partner.id}>
                                                        {partner.fullName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={editOrder.rejectedReason || ''}
                                    onChange={(e) => setEditOrder({
                                        ...editOrder,
                                        rejectedReason: e.target.value
                                    })}
                                    placeholder="Add any additional notes..."
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setEditOrder(null)}
                            >
                                Cancel
                            </Button>
                            {editOrder.status === 'approve' ? (
                                <Button onClick={handleApproveOrder}>
                                    Approve Order
                                </Button>
                            ) : (
                                <Button
                                    variant="destructive"
                                    onClick={handleRejectOrder}
                                >
                                    Reject Order
                                </Button>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </Card>
    );
};

export default CustomerOrders;