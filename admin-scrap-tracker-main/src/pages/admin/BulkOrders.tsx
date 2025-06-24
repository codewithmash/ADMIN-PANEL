// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useToast } from "@/components/ui/use-toast";
// import { Textarea } from "@/components/ui/textarea";
// import { Badge } from "@/components/ui/badge";
// import { Pencil, Trash2, Plus, Search, Eye } from "lucide-react";
// import {bulkOrdersService} from "@/services/bulkOrdersService"
// interface BulkOrder {
//   firestoreId: string;
//   name: string;
//   company: string;
//   behalfCompany: string;
//   contact: string;
//   origin: string;
//   description: string;
//   quantity: string;
//   imageUrl: string;
//   status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
//   createdAt: string;
//   updatedAt: string;
// }

// const BulkOrders = () => {
//   const [orders, setOrders] = useState<BulkOrder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
//   const [currentOrder, setCurrentOrder] = useState<BulkOrder | null>(null);
//   const [formData, setFormData] = useState<Omit<BulkOrder, 'firestoreId' | 'createdAt' | 'updatedAt' | 'imageUrl'>>({
//     name: '',
//     company: '',
//     behalfCompany: '',
//     contact: '',
//     origin: '',
//     description: '',
//     quantity: '',
//     status: 'pending',
//   });
  
//   const { toast } = useToast();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await bulkOrdersService.getAll();
//         console.log("response",response)
//         const data = response ;
//         // Filter only bulk orders
//         const bulkOrders = data.enquiries.filter((order: any) => order.type === 'bulk');
//         setOrders(bulkOrders);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         toast({
//           title: "Error",
//           description: "Failed to fetch bulk orders",
//           variant: "destructive",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [toast]);

//   const filteredOrders = orders.filter(order => {
//     // Filter by search term
//     const matchesSearch = 
//       order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       order.company.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Filter by status if not 'all'
//     const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleStatusChange = (status: 'pending' | 'scheduled' | 'completed' | 'cancelled') => {
//     setFormData(prev => ({ ...prev, status }));
//   };

//   const handleAddOrder = async () => {
//     try {
//       const response = bulkOrdersService.create(formData)

//       if (!response.ok) throw new Error('Failed to add order');

//       const newOrder = await response.json();
//       setOrders([...orders, newOrder]);
      
//       setFormData({
//         name: '',
//         company: '',
//         behalfCompany: '',
//         contact: '',
//         origin: '',
//         description: '',
//         quantity: '',
//         status: 'pending',
//       });
      
//       setIsAddDialogOpen(false);
//       toast({
//         title: "Order added",
//         description: `Bulk order for ${formData.name} has been added successfully.`,
//         duration: 3000,
//       });
//     } catch (error) {
//       console.error('Error adding order:', error);
//       toast({
//         title: "Error",
//         description: "Failed to add bulk order",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleEditOrder = async () => {
//     if (!currentOrder) return;
    
//     try {
//       const response = await fetch(`YOUR_API_ENDPOINT_HERE/${currentOrder.firestoreId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           updatedAt: new Date().toISOString(),
//         }),
//       });

//       if (!response.ok) throw new Error('Failed to update order');

//       const updatedOrder = await response.json();
      
//       setOrders(orders.map(order => 
//         order.firestoreId === currentOrder.firestoreId ? updatedOrder : order
//       ));
      
//       setIsEditDialogOpen(false);
//       toast({
//         title: "Order updated",
//         description: `Bulk order for ${formData.name} has been updated successfully.`,
//         duration: 3000,
//       });
//     } catch (error) {
//       console.error('Error updating order:', error);
//       toast({
//         title: "Error",
//         description: "Failed to update bulk order",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteOrder = async () => {
//     if (!currentOrder) return;
    
//     try {
//       const response = await fetch(`YOUR_API_ENDPOINT_HERE/${currentOrder.firestoreId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) throw new Error('Failed to delete order');

//       setOrders(orders.filter(order => order.firestoreId !== currentOrder.firestoreId));
//       setIsDeleteDialogOpen(false);
//       toast({
//         title: "Order deleted",
//         description: `Bulk order for ${currentOrder.name} has been deleted successfully.`,
//         duration: 3000,
//       });
//     } catch (error) {
//       console.error('Error deleting order:', error);
//       toast({
//         title: "Error",
//         description: "Failed to delete bulk order",
//         variant: "destructive",
//       });
//     }
//   };

//   const openEditDialog = (order: BulkOrder) => {
//     setCurrentOrder(order);
//     setFormData({
//       name: order.name,
//       company: order.company,
//       behalfCompany: order.behalfCompany,
//       contact: order.contact,
//       origin: order.origin,
//       description: order.description,
//       quantity: order.quantity,
//       status: order.status,
//     });
//     setIsEditDialogOpen(true);
//   };

//   const openDeleteDialog = (order: BulkOrder) => {
//     setCurrentOrder(order);
//     setIsDeleteDialogOpen(true);
//   };

//   const openViewDialog = (order: BulkOrder) => {
//     setCurrentOrder(order);
//     setIsViewDialogOpen(true);
//   };

//   const getStatusBadge = (status: string) => {
//     switch(status) {
//       case 'pending':
//         return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
//       case 'scheduled':
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
//       case 'completed':
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
//       case 'cancelled':
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
//       default:
//         return null;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p>Loading bulk orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Bulk Orders</h1>
//         <p className="text-muted-foreground">
//           Manage large-scale scrap collection orders from businesses and institutions
//         </p>
//       </div>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Bulk Orders List</CardTitle>
//             <CardDescription>
//               All large-scale scrap collection orders and their status
//             </CardDescription>
//           </div>
//           <div className="flex space-x-2">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search orders..."
//                 className="pl-8 w-[250px]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Order
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[525px]">
//                 <DialogHeader>
//                   <DialogTitle>Add New Bulk Order</DialogTitle>
//                   <DialogDescription>
//                     Enter details for the new bulk scrap collection order.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-right">
//                       Customer Name
//                     </Label>
//                     <Input
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="company" className="text-right">
//                       Company Name
//                     </Label>
//                     <Input
//                       id="company"
//                       name="company"
//                       value={formData.company}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="behalfCompany" className="text-right">
//                       On Behalf Of
//                     </Label>
//                     <Input
//                       id="behalfCompany"
//                       name="behalfCompany"
//                       value={formData.behalfCompany}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="contact" className="text-right">
//                       Contact Number
//                     </Label>
//                     <Input
//                       id="contact"
//                       name="contact"
//                       value={formData.contact}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="origin" className="text-right">
//                       Scrap Origin
//                     </Label>
//                     <Input
//                       id="origin"
//                       name="origin"
//                       value={formData.origin}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="quantity" className="text-right">
//                       Quantity
//                     </Label>
//                     <Input
//                       id="quantity"
//                       name="quantity"
//                       value={formData.quantity}
//                       onChange={handleInputChange}
//                       placeholder="E.g., 500 kg"
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="description" className="text-right">
//                       Description
//                     </Label>
//                     <Textarea
//                       id="description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       placeholder="Description of the scrap"
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleAddOrder}>
//                     Add Order
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-end mb-4">
//             <div className="flex space-x-2">
//               <Button 
//                 variant={statusFilter === 'all' ? 'default' : 'outline'} 
//                 size="sm"
//                 onClick={() => setStatusFilter('all')}
//               >
//                 All
//               </Button>
//               <Button 
//                 variant={statusFilter === 'pending' ? 'default' : 'outline'} 
//                 size="sm"
//                 onClick={() => setStatusFilter('pending')}
//               >
//                 Pending
//               </Button>
//               <Button 
//                 variant={statusFilter === 'scheduled' ? 'default' : 'outline'} 
//                 size="sm"
//                 onClick={() => setStatusFilter('scheduled')}
//               >
//                 Scheduled
//               </Button>
//               <Button 
//                 variant={statusFilter === 'completed' ? 'default' : 'outline'} 
//                 size="sm"
//                 onClick={() => setStatusFilter('completed')}
//               >
//                 Completed
//               </Button>
//               <Button 
//                 variant={statusFilter === 'cancelled' ? 'default' : 'outline'} 
//                 size="sm"
//                 onClick={() => setStatusFilter('cancelled')}
//               >
//                 Cancelled
//               </Button>
//             </div>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Customer Name</TableHead>
//                 <TableHead>Company</TableHead>
//                 <TableHead>Contact</TableHead>
//                 <TableHead>Quantity</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredOrders.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                     No bulk orders found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredOrders.map(order => (
//                   <TableRow key={order.firestoreId}>
//                     <TableCell className="font-medium">{order.name}</TableCell>
//                     <TableCell>{order.company}</TableCell>
//                     <TableCell>{order.contact}</TableCell>
//                     <TableCell>{order.quantity}</TableCell>
//                     <TableCell>{getStatusBadge(order.status)}</TableCell>
//                     <TableCell className="space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openViewDialog(order)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openEditDialog(order)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-destructive"
//                         onClick={() => openDeleteDialog(order)}
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* View Dialog */}
//       <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
//         <DialogContent className="sm:max-w-[525px]">
//           <DialogHeader>
//             <DialogTitle>Order Details</DialogTitle>
//           </DialogHeader>
//           {currentOrder && (
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Customer Name:</p>
//                 <p className="col-span-2">{currentOrder.name}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Company:</p>
//                 <p className="col-span-2">{currentOrder.company}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">On Behalf Of:</p>
//                 <p className="col-span-2">{currentOrder.behalfCompany}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Contact Number:</p>
//                 <p className="col-span-2">{currentOrder.contact}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Scrap Origin:</p>
//                 <p className="col-span-2">{currentOrder.origin}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Quantity:</p>
//                 <p className="col-span-2">{currentOrder.quantity}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Description:</p>
//                 <p className="col-span-2">{currentOrder.description}</p>
//               </div>
//               {currentOrder.imageUrl && (
//                 <div className="grid grid-cols-3 items-center gap-4">
//                   <p className="text-right font-medium">Image:</p>
//                   <div className="col-span-2">
//                     <img 
//                       src={currentOrder.imageUrl} 
//                       alt="Scrap" 
//                       className="h-32 w-32 object-cover rounded"
//                     />
//                   </div>
//                 </div>
//               )}
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Status:</p>
//                 <div className="col-span-2">{getStatusBadge(currentOrder.status)}</div>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Created At:</p>
//                 <p className="col-span-2">{new Date(currentOrder.createdAt).toLocaleString()}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Updated At:</p>
//                 <p className="col-span-2">{new Date(currentOrder.updatedAt).toLocaleString()}</p>
//               </div>
//             </div>
//           )}
//           <DialogFooter>
//             <Button onClick={() => setIsViewDialogOpen(false)}>
//               Close
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Edit Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="sm:max-w-[525px]">
//           <DialogHeader>
//             <DialogTitle>Edit Order</DialogTitle>
//             <DialogDescription>
//               Update the bulk order details.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-name" className="text-right">
//                 Customer Name
//               </Label>
//               <Input
//                 id="edit-name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-company" className="text-right">
//                 Company Name
//               </Label>
//               <Input
//                 id="edit-company"
//                 name="company"
//                 value={formData.company}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-behalfCompany" className="text-right">
//                 On Behalf Of
//               </Label>
//               <Input
//                 id="edit-behalfCompany"
//                 name="behalfCompany"
//                 value={formData.behalfCompany}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-contact" className="text-right">
//                 Contact Number
//               </Label>
//               <Input
//                 id="edit-contact"
//                 name="contact"
//                 value={formData.contact}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-origin" className="text-right">
//                 Scrap Origin
//               </Label>
//               <Input
//                 id="edit-origin"
//                 name="origin"
//                 value={formData.origin}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-quantity" className="text-right">
//                 Quantity
//               </Label>
//               <Input
//                 id="edit-quantity"
//                 name="quantity"
//                 value={formData.quantity}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-description" className="text-right">
//                 Description
//               </Label>
//               <Textarea
//                 id="edit-description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-status" className="text-right">
//                 Status
//               </Label>
//               <div className="col-span-3 flex flex-wrap gap-2">
//                 <Button 
//                   size="sm" 
//                   variant={formData.status === 'pending' ? 'default' : 'outline'}
//                   onClick={() => handleStatusChange('pending')}
//                 >
//                   Pending
//                 </Button>
//                 <Button 
//                   size="sm" 
//                   variant={formData.status === 'scheduled' ? 'default' : 'outline'}
//                   onClick={() => handleStatusChange('scheduled')}
//                 >
//                   Scheduled
//                 </Button>
//                 <Button 
//                   size="sm" 
//                   variant={formData.status === 'completed' ? 'default' : 'outline'}
//                   onClick={() => handleStatusChange('completed')}
//                 >
//                   Completed
//                 </Button>
//                 <Button 
//                   size="sm" 
//                   variant={formData.status === 'cancelled' ? 'default' : 'outline'}
//                   onClick={() => handleStatusChange('cancelled')}
//                 >
//                   Cancelled
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditOrder}>
//               Save Changes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete the order from {currentOrder?.name}? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteOrder}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BulkOrders;



import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Search, Eye } from "lucide-react";
import { bulkOrdersService } from "@/services/bulkOrdersService"; // Ensure this path is correct

interface BulkOrder {
  firestoreId: string;
  name: string;
  company: string;
  behalfCompany: string;
  contact: string;
  origin: string;
  description: string;
  quantity: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected'; // Only these 3 statuses
  createdAt: string;
  updatedAt: string;
}

const BulkOrders = () => {
  const [orders, setOrders] = useState<BulkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<BulkOrder | null>(null);
  const [formData, setFormData] = useState<Omit<BulkOrder, 'firestoreId' | 'createdAt' | 'updatedAt' | 'imageUrl'>>({
    name: '',
    company: '',
    behalfCompany: '',
    contact: '',
    origin: '',
    description: '',
    quantity: '',
    status: 'pending',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // For image upload

  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await bulkOrdersService.getAll();
      const data = response;
      // Ensure fetched orders also conform to the new status types
      const bulkOrders = data.enquiries.filter((order: any) => order.type === 'bulk').map((order: any) => ({
        ...order,
        // Map old statuses if they exist in the fetched data to 'pending' or a default
        status: ['pending', 'approved', 'rejected'].includes(order.status) ? order.status : 'pending',
      })) as BulkOrder[];
      setOrders(bulkOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch bulk orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [toast]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.contact.includes(searchTerm);

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // The status type here should also reflect the allowed statuses
  const handleStatusChange = (status: 'pending' | 'approved' | 'rejected') => {
    setFormData(prev => ({ ...prev, status }));
  };

  const handleAddOrder = async () => {
    try {
      const dataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        dataToSend.append(key, value);
      });
      if (selectedFile) {
        dataToSend.append('scrap', selectedFile);
      }

      const response = await bulkOrdersService.create(dataToSend);

      if (!response.success) {
        throw new Error(response.message || 'Failed to add order');
      }

      toast({
        title: "Order added",
        description: `Bulk order for ${formData.name} has been added successfully.`,
        duration: 3000,
      });

      setFormData({
        name: '',
        company: '',
        behalfCompany: '',
        contact: '',
        origin: '',
        description: '',
        quantity: '',
        status: 'pending',
      });
      setSelectedFile(null);
      setIsAddDialogOpen(false);
      fetchOrders();
    } catch (error: any) {
      console.error('Error adding order:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add bulk order",
        variant: "destructive",
      });
    }
  };

  const handleEditOrder = async () => {
    if (!currentOrder) return;

    try {
      // Ensure the status passed to updateStatus is one of the allowed types
      const response = await bulkOrdersService.updateStatus(currentOrder.enquiryId, formData.status as 'pending' | 'approved' | 'rejected');

      if (!response.success) {
        throw new Error(response.message || 'Failed to update order status');
      }

      toast({
        title: "Order updated",
        description: `Bulk order for ${currentOrder.name} has been updated to ${formData.status}.`,
        duration: 3000,
      });

      setIsEditDialogOpen(false);
      fetchOrders();
    } catch (error: any) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update bulk order",
        variant: "destructive",
      });
    }
  };

  const handleDeleteOrder = async () => {
    if (!currentOrder) return;

    try {
      console.log("currentOrder",currentOrder)
      const response = await bulkOrdersService.delete(currentOrder.enquiryId);

      if (!response.success) {
        throw new Error(response.message || 'Failed to delete order');
      }

      toast({
        title: "Order deleted",
        description: `Bulk order for ${currentOrder.name} has been deleted successfully.`,
        duration: 3000,
      });

      setIsDeleteDialogOpen(false);
      fetchOrders();
    } catch (error: any) {
      console.error('Error deleting order:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete bulk order",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (order: BulkOrder) => {
    setCurrentOrder(order);
    setFormData({
      name: order.name,
      company: order.company,
      behalfCompany: order.behalfCompany,
      contact: order.contact,
      origin: order.origin,
      description: order.description,
      quantity: order.quantity,
      status: order.status, // Current status will be one of 'pending', 'approved', 'rejected'
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (order: BulkOrder) => {
    setCurrentOrder(order);
    setIsDeleteDialogOpen(true);
  };

  const openViewDialog = (order: BulkOrder) => {
    setCurrentOrder(order);
    setIsViewDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        // Fallback for unexpected statuses, though with updated interface, this should be rare for new data
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading bulk orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bulk Orders</h1>
        <p className="text-muted-foreground">
          Manage large-scale scrap collection orders from businesses and institutions
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Bulk Orders List</CardTitle>
            <CardDescription>
              All large-scale scrap collection orders and their status
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              {/* <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Order
                </Button>
              </DialogTrigger> */}
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Bulk Order</DialogTitle>
                  <DialogDescription>
                    Enter details for the new bulk scrap collection order.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Customer Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="company" className="text-right">
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="behalfCompany" className="text-right">
                      On Behalf Of
                    </Label>
                    <Input
                      id="behalfCompany"
                      name="behalfCompany"
                      value={formData.behalfCompany}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">
                      Contact Number
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="origin" className="text-right">
                      Scrap Origin
                    </Label>
                    <Input
                      id="origin"
                      name="origin"
                      value={formData.origin}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="E.g., 500 kg"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description of the scrap"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="scrapImage" className="text-right">
                      Scrap Image
                    </Label>
                    <Input
                      id="scrapImage"
                      name="scrapImage"
                      type="file"
                      onChange={handleFileChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrder}>
                    Add Order
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <div className="flex space-x-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('approved')}
              >
                Approved
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No bulk orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map(order => (
                  <TableRow key={order.firestoreId}>
                    <TableCell className="font-medium">{order.name}</TableCell>
                    <TableCell>{order.company}</TableCell>
                    <TableCell>{order.contact}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewDialog(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(order)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => openDeleteDialog(order)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {currentOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Customer Name:</p>
                <p className="col-span-2">{currentOrder.name}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Company:</p>
                <p className="col-span-2">{currentOrder.company}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">On Behalf Of:</p>
                <p className="col-span-2">{currentOrder.behalfCompany}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Contact Number:</p>
                <p className="col-span-2">{currentOrder.contact}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Scrap Origin:</p>
                <p className="col-span-2">{currentOrder.origin}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Quantity:</p>
                <p className="col-span-2">{currentOrder.quantity}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Description:</p>
                <p className="col-span-2">{currentOrder.description}</p>
              </div>
              {currentOrder.imageUrl && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <p className="text-right font-medium">Image:</p>
                  <div className="col-span-2">
                    <img
                      src={currentOrder.imageUrl}
                      alt="Scrap"
                      className="h-32 w-32 object-cover rounded"
                    />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Status:</p>
                <div className="col-span-2">{getStatusBadge(currentOrder.status)}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Created At:</p>
                <p className="col-span-2">{new Date(currentOrder.createdAt).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Updated At:</p>
                <p className="col-span-2">{new Date(currentOrder.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Update the bulk order status. Other fields are not modifiable via this interface.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Display other fields as disabled for context */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Customer Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                className="col-span-3"
                disabled // Disable as per API capabilities
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-company" className="text-right">
                Company Name
              </Label>
              <Input
                id="edit-company"
                name="company"
                value={formData.company}
                className="col-span-3"
                disabled // Disable as per API capabilities
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-behalfCompany" className="text-right">
                On Behalf Of
              </Label>
              <Input
                id="edit-behalfCompany"
                name="behalfCompany"
                value={formData.behalfCompany}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-contact" className="text-right">
                Contact Number
              </Label>
              <Input
                id="edit-contact"
                name="contact"
                value={formData.contact}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-origin" className="text-right">
                Scrap Origin
              </Label>
              <Input
                id="edit-origin"
                name="origin"
                value={formData.origin}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="edit-quantity"
                name="quantity"
                value={formData.quantity}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                className="col-span-3"
                disabled
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <div className="col-span-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={formData.status === 'pending' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('pending')}
                >
                  Pending
                </Button>
                <Button
                  size="sm"
                  variant={formData.status === 'approved' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('approved')}
                >
                  Approved
                </Button>
                <Button
                  size="sm"
                  variant={formData.status === 'rejected' ? 'default' : 'outline'}
                  onClick={() => handleStatusChange('rejected')}
                >
                  Rejected
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditOrder}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the order from {currentOrder?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteOrder}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BulkOrders;