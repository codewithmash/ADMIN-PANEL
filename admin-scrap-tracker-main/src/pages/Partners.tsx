



// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/components/ui/use-toast";
// import { Switch } from "@/components/ui/switch"; 
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { Pencil, Trash2, Plus, Search, FileCheck, File, CheckCircle, AlertCircle, ShieldCheck, ArrowLeft, Eye } from "lucide-react"; 

// import { partnerService } from '@/services/partnerService'; 

// interface BankDetails {
//   bankName: string;
//   accountNumber: string;
//   ifscCode: string;
//   accountHolderName: string;
// }

// interface Documents {
//   profilePhoto: string;
//   aadhaarFront: string;
//   aadhaarBack: string;
//   panCard: string;
//   drivingLicense: string;
//   vehicleRC: string;
// }

// interface Partner {
//   id: string;
//   phoneNumber: string;
//   fullName: string;
//   email: string;
//   vehicleType: string;
//   address: string;
//   bankDetails: BankDetails;
//   documents: Documents;
//   status: 'pending' | 'verified' | 'rejected';
//   createdAt: { _seconds: number; _nanoseconds: number };
//   updatedAt: { _seconds: number; _nanoseconds: number };
// }

// const Partners = () => {
//   const [partners, setPartners] = useState<Partner[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
//   const [showDocumentVerificationScreen, setShowDocumentVerificationScreen] = useState(false);
//   const [formData, setFormData] = useState<Omit<Partner, 'id' | 'status' | 'bankDetails' | 'documents' | 'createdAt' | 'updatedAt'>>({
//     phoneNumber: '',
//     fullName: '',
//     email: '',
//     vehicleType: '',
//     address: '',
//   });
//   const [rejectionReason, setRejectionReason] = useState('');
  
//   const { toast } = useToast();

//   const adminUser = JSON.parse(localStorage.getItem('scrap-admin-user') || '{}');
//   const ADMIN_ID = adminUser?.admin?.id || null;

//   const loadPartners = async () => {
//     try {
//       const data = await partnerService.getAll();
//       const typedPartners = data.partners.map((p: any) => ({
//         ...p,
//         status: p.status === 'approved' ? 'verified' : p.status,
//       })) as Partner[];
//       setPartners(typedPartners);
//     } catch (err) {
//       toast({ title: "Error", description: "Failed to fetch partners.", variant: "destructive" });
//     }
//   };

//   useEffect(() => {
//     loadPartners();
//   }, []);

//   const filteredPartners = partners.filter(partner => 
//     (partner.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     partner.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     partner.email?.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const pendingCount = partners.filter(partner => partner.status === 'pending').length;

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddPartner = () => {
//     const newPartner: Partner = { 
//       ...formData,
//       id: formData.phoneNumber, 
//       bankDetails: {
//         bankName: '',
//         accountNumber: '',
//         ifscCode: '',
//         accountHolderName: ''
//       },
//       documents: {
//         profilePhoto: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=ProfilePhoto', 
//         aadhaarFront: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=AadhaarFront', 
//         aadhaarBack: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=AadhaarBack', 
//         panCard: 'https://via.placeholder.com/200/0000FF/FFFFFF?text=PANCard', 
//         drivingLicense: 'https://via.placeholder.com/300/FFFF00/000000?text=DrivingLicense', 
//         vehicleRC: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=VehicleRC', 
//       },
//       status: 'pending',
//       createdAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 },
//       updatedAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 }
//     };
    
//     setPartners([...partners, newPartner]);
//     setFormData({ phoneNumber: '', fullName: '', email: '', vehicleType: '', address: '' });
//     setIsAddDialogOpen(false);
//     toast({
//       title: "Partner added",
//       description: `${formData.fullName} has been added successfully.`,
//       duration: 3000,
//     });
//   };

//   const handleEditPartner = () => {
//     if (!currentPartner) return;
    
//     setPartners(partners.map(partner => 
//       partner.id === currentPartner.id ? { 
//         ...partner, 
//         ...formData,
//         status: partner.status,
//         bankDetails: partner.bankDetails,
//         documents: partner.documents,
//         updatedAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 }
//       } : partner
//     ));
    
//     setIsEditDialogOpen(false);
//     toast({
//       title: "Partner updated",
//       description: `${formData.fullName} has been updated successfully.`,
//       duration: 3000,
//     });
//   };

//   const handleDeletePartner = async() => {
//     if (!currentPartner) return;

//     try{
//       await partnerService.deletePartner(currentPartner.id);
//       loadPartners();
//       setIsDeleteDialogOpen(false);
//       toast({
//         title: "Partner deleted",
//         description: `${currentPartner.fullName} has been deleted successfully.`,
//         duration: 3000,
//       });
//     }catch(error){
//       console.error("Error deleting partner:", error);
//       toast({ title: "Error", description: "Failed to delete partner.", variant: "destructive" });
//     }
//   };

//   const openEditDialog = (partner: Partner) => {
//     setCurrentPartner(partner);
//     setFormData({
//       phoneNumber: partner.phoneNumber,
//       fullName: partner.fullName,
//       email: partner.email,
//       vehicleType: partner.vehicleType,
//       address: partner.address,
//     });
//     setIsEditDialogOpen(true);
//   };

//   const openDeleteDialog = (partner: Partner) => {
//     setCurrentPartner(partner);
//     setIsDeleteDialogOpen(true);
//   };

//   const openDocumentsScreen = (partner: Partner) => {
//     setCurrentPartner(partner);
//     setRejectionReason(''); // Clear rejection reason when opening
//     setShowDocumentVerificationScreen(true); // Show the documents screen
//   };

//   const verifyPartner = async () => {
//     if (!currentPartner) return;

//     try {
//       const data = {adminId:ADMIN_ID,partnerPhone:currentPartner?.phoneNumber,action:'approve'}
//       await partnerService.approveRejectPartner(data);
//       toast({
//         title: "Partner Verified",
//         description: `${currentPartner.fullName} has been verified successfully.`,
//         duration: 3000,
//       });
//       loadPartners(); // Reload partners to get updated status
//       setShowDocumentVerificationScreen(false);
//     } catch (error: any) {
//       toast({
//         title: "Verification Failed",
//         description: error.message || "Failed to verify partner.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     }
//   };

//   const rejectPartner = async () => {
//     if (!currentPartner) return;

//     if (!rejectionReason.trim()) {
//       toast({
//         title: "Rejection Reason Required",
//         description: "Please provide a reason for rejecting the partner.",
//         variant: "destructive",
//         duration: 3000,
//       });
//       return;
//     }

//     try {
//       const data = {adminId:ADMIN_ID,partnerPhone:currentPartner.phoneNumber,action:"reject",rejectionReason:rejectionReason}
//       await partnerService.approveRejectPartner(data);
//       toast({
//         title: "Partner Rejected",
//         description: `${currentPartner.fullName} has been rejected.`,
//         variant: "destructive",
//         duration: 3000,
//       });
//       loadPartners(); // Reload partners to get updated status
//       setShowDocumentVerificationScreen(false);
//     } catch (error: any) {
//       toast({
//         title: "Rejection Failed",
//         description: error.message || "Failed to reject partner.",
//         variant: "destructive",
//         duration: 3000,
//       });
//     }
//   };

//   const reApprovePartner = async (partner: Partner) => {
//     try {
//         const data = { adminId: ADMIN_ID, partnerPhone: partner?.phoneNumber, action: 'approve' };
//         await partnerService.approveRejectPartner(data);
//         toast({
//             title: "Partner Re-Approved",
//             description: `${partner.fullName} has been re-approved successfully.`,
//             duration: 3000,
//         });
//         loadPartners(); // Reload partners to get updated status
        
//     } catch (error: any) {
//         toast({
//             title: "Re-Approval Failed",
//             description: error.message || "Failed to re-approve partner.",
//             variant: "destructive",
//             duration: 3000,
//         });
//     }
//   };


//   const formatDate = (timestamp: { _seconds: number; _nanoseconds: number }) => {
//     if (!timestamp || typeof timestamp._seconds !== 'number') {
//       return 'N/A'; // Handle cases where timestamp might be missing or malformed
//     }
//     return new Date(timestamp._seconds * 1000).toLocaleDateString();
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'verified':
//         return (
//           <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1 max-w-fit">
//             <ShieldCheck className="h-3.5 w-3.5" />
//             Verified
//           </Badge>
//         );
//       case 'pending':
//         return (
//           <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 flex items-center gap-1 max-w-fit">
//             <AlertCircle className="h-3.5 w-3.5" />
//             Pending Verification
//           </Badge>
//         );
//       case 'rejected':
//         return (
//           <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300 hover:bg-red-100 flex items-center gap-1 max-w-fit">
//             <AlertCircle className="h-3.5 w-3.5" />
//             Rejected
//           </Badge>
//         );
//       default:
//         return null;
//     }
//   };

//   if (showDocumentVerificationScreen && currentPartner) {
//     const documentFields = [
//       { key: 'profilePhoto', label: 'Profile Photo' },
//       { key: 'aadhaarFront', label: 'Aadhaar Card (Front)' },
//       { key: 'aadhaarBack', label: 'Aadhaar Card (Back)' },
//       { key: 'panCard', label: 'PAN Card' },
//       { key: 'drivingLicense', label: 'Driving License' },
//       { key: 'vehicleRC', label: 'Vehicle RC' },
//     ];

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon" onClick={() => setShowDocumentVerificationScreen(false)}>
//             <ArrowLeft className="h-6 w-6" />
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">Verify Documents for {currentPartner.fullName}</h1>
//             <p className="text-muted-foreground">
//               Review the documents submitted by {currentPartner.fullName} for verification.
//             </p>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
//           {documentFields.map(({ key, label }) => (
//             <Card key={key}>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <File className="h-5 w-5 text-blue-600" />
//                   {label}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {currentPartner.documents[key as keyof Documents] ? (
//                   <img src={currentPartner.documents[key as keyof Documents]} alt={label} className="max-w-full h-auto rounded-md border" />
//                 ) : (
//                   <div className="bg-slate-50 p-8 flex items-center justify-center rounded-md border border-dashed min-h-[150px]">
//                     <div className="text-center text-muted-foreground">
//                       <FileCheck className="mx-auto h-12 w-12 text-slate-400 mb-2" />
//                       <p>No {label} Uploaded</p>
//                     </div>
//                   </div>
//                 )}
//                 <Button 
//                   variant="outline" 
//                   size="sm"
//                   className="text-blue-600"
//                   onClick={() => window.open(currentPartner.documents[key as keyof Documents], '_blank')}
//                   disabled={!currentPartner.documents[key as keyof Documents]}
//                 >
//                   <Eye className="h-4 w-4 mr-1" />
//                   View Document
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
        
//         {currentPartner.status !== 'verified' && (
//           <>
//             <div className="space-y-2">
//                 <Label htmlFor="rejectionReason">Reason for Rejection (Optional for Approval)</Label>
//                 <Input
//                     id="rejectionReason"
//                     value={rejectionReason}
//                     onChange={(e) => setRejectionReason(e.target.value)}
//                     placeholder="Enter reason for rejection"
//                 />
//             </div>

//             <div className="mt-2 flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
//               <AlertCircle className="h-5 w-5 text-blue-600" />
//               <p className="text-sm text-blue-700">
//                 Please verify the authenticity of all documents before approval. Once verified, the partner will have access to the platform.
//               </p>
//             </div>
            
//             <div className="flex justify-end gap-2">
//               <Button 
//                 variant="destructive"
//                 onClick={rejectPartner}
//                 disabled={currentPartner.status === 'rejected'}
//               >
//                 Reject Partner
//               </Button>
//               <Button 
//                 onClick={verifyPartner}
//                 className="gap-2"
//                 disabled={currentPartner.status === 'verified'}
//               >
//                 <CheckCircle className="h-4 w-4" />
//                 Verify Partner
//               </Button>
//             </div>
//           </>
//         )}

//         {currentPartner.status === 'verified' && (
//             <Alert className="bg-green-50 border-green-200">
//                 <ShieldCheck className="h-4 w-4 text-green-500" />
//                 <AlertTitle className="text-green-800">Partner Verified</AlertTitle>
//                 <AlertDescription className="text-green-700">
//                     This partner has already been verified.
//                 </AlertDescription>
//             </Alert>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
//         <p className="text-muted-foreground">
//           Manage your recycling partners
//         </p>
//       </div>

//       {pendingCount > 0 && (
//         <Alert className="bg-amber-50 border-amber-200">
//           <AlertCircle className="h-4 w-4 text-amber-500" />
//           <AlertTitle className="text-amber-800">Verification Required</AlertTitle>
//           <AlertDescription className="text-amber-700">
//             You have {pendingCount} partner{pendingCount > 1 ? 's' : ''} waiting for document verification.
//           </AlertDescription>
//         </Alert>
//       )}

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Partner List</CardTitle>
//             <CardDescription>
//               View and manage all your recycling partners
//             </CardDescription>
//           </div>
//           <div className="flex space-x-2">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search partners..."
//                 className="pl-8 w-[250px]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Partner
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Add New Partner</DialogTitle>
//                   <DialogDescription>
//                     Enter the details of the new recycling partner below.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="phoneNumber" className="text-right">
//                       Phone Number
//                     </Label>
//                     <Input
//                       id="phoneNumber"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="fullName" className="text-right">
//                       Full Name
//                     </Label>
//                     <Input
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="email" className="text-right">
//                       Email
//                     </Label>
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="vehicleType" className="text-right">
//                       Vehicle Type
//                     </Label>
//                     <Input
//                       id="vehicleType"
//                       name="vehicleType"
//                       value={formData.vehicleType}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="address" className="text-right">
//                       Address
//                     </Label>
//                     <Input
//                       id="address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleAddPartner}>
//                     Add Partner
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Full Name</TableHead>
//                 <TableHead>Phone</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Vehicle Type</TableHead>
//                 <TableHead>Joined Date</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredPartners.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
//                     No partners found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredPartners.map(partner => (
//                   <TableRow key={partner.id}>
//                     <TableCell className="font-medium">{partner.fullName}</TableCell>
//                     <TableCell>{partner.phoneNumber}</TableCell>
//                     <TableCell>{partner.email}</TableCell>
//                     <TableCell>{partner.vehicleType}</TableCell>
//                     <TableCell>{formatDate(partner.createdAt)}</TableCell>
//                     <TableCell>
//                       {getStatusBadge(partner.status)}
//                     </TableCell>
//                     <TableCell className="space-x-2 flex items-center">
//                       {/* Always show Eye button to view documents */}
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-gray-600 hover:bg-gray-100"
//                         onClick={() => openDocumentsScreen(partner)} 
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>

//                       {partner.status === 'pending' && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="text-blue-600 border-blue-200 hover:bg-blue-50"
//                           onClick={() => openDocumentsScreen(partner)} 
//                         >
//                           <FileCheck className="h-4 w-4 mr-1" />
//                           Verify Documents
//                         </Button>
//                       )}
//                       {partner.status === 'rejected' && (
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           className="text-green-600 border-green-200 hover:bg-green-50"
//                           onClick={() => reApprovePartner(partner)} 
//                         >
//                           <CheckCircle className="h-4 w-4 mr-1" />
//                           Re-approve
//                         </Button>
//                       )}
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openEditDialog(partner)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-destructive"
//                         onClick={() => openDeleteDialog(partner)}
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

//       {/* Edit Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Partner</DialogTitle>
//             <DialogDescription>
//               Update the partner details below.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-phoneNumber" className="text-right">
//                 Phone Number
//               </Label>
//               <Input
//                 id="edit-phoneNumber"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-fullName" className="text-right">
//                 Full Name
//               </Label>
//               <Input
//                 id="edit-fullName"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-email" className="text-right">
//                 Email
//               </Label>
//               <Input
//                 id="edit-email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-vehicleType" className="text-right">
//                 Vehicle Type
//               </Label>
//               <Input
//                 id="edit-vehicleType"
//                 name="vehicleType"
//                 value={formData.vehicleType}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-address" className="text-right">
//                 Address
//               </Label>
//               <Input
//                 id="edit-address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditPartner}>
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
//               Are you sure you want to delete {currentPartner?.fullName}? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeletePartner}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }; 

// export default Partners;




import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch"; 
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Pencil, Trash2, Plus, Search, FileCheck, File, CheckCircle, AlertCircle, ShieldCheck, ArrowLeft, Eye } from "lucide-react"; 

import { partnerService } from '@/services/partnerService'; 

interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

interface Documents {
  profilePhoto: string;
  aadhaarFront: string;
  aadhaarBack: string;
  panCard: string;
  drivingLicense: string;
  vehicleRC: string;
}

interface Partner {
  id: string;
  phoneNumber: string;
  fullName: string;
  email: string;
  vehicleType: string;
  address: string;
  bankDetails: BankDetails;
  documents: Documents;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: { _seconds: number; _nanoseconds: number };
  updatedAt: { _seconds: number; _nanoseconds: number };
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  const [showDocumentVerificationScreen, setShowDocumentVerificationScreen] = useState(false);
  const [formData, setFormData] = useState<Omit<Partner, 'id' | 'status' | 'bankDetails' | 'documents' | 'createdAt' | 'updatedAt'>>({
    phoneNumber: '',
    fullName: '',
    email: '',
    vehicleType: '',
    address: '',
  });
  const [rejectionReason, setRejectionReason] = useState('');
  
  const { toast } = useToast();

  const adminUser = JSON.parse(localStorage.getItem('scrap-admin-user') || '{}');
  const ADMIN_ID = adminUser?.admin?.id || null;

  const loadPartners = async () => {
    try {
      const data = await partnerService.getAll();
      const typedPartners = data.partners.map((p: any) => ({
        ...p,
        status: p.status === 'approved' ? 'verified' : p.status,
      })) as Partner[];
      setPartners(typedPartners);
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch partners.", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  const filteredPartners = partners.filter(partner => 
    (partner.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingCount = partners.filter(partner => partner.status === 'pending').length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPartner = () => {
    const newPartner: Partner = { 
      ...formData,
      id: formData.phoneNumber, 
      bankDetails: {
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        accountHolderName: ''
      },
      documents: {
        profilePhoto: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=ProfilePhoto', 
        aadhaarFront: 'https://via.placeholder.com/300/FF0000/FFFFFF?text=AadhaarFront', 
        aadhaarBack: 'https://via.placeholder.com/300/00FF00/FFFFFF?text=AadhaarBack', 
        panCard: 'https://via.placeholder.com/200/0000FF/FFFFFF?text=PANCard', 
        drivingLicense: 'https://via.placeholder.com/300/FFFF00/000000?text=DrivingLicense', 
        vehicleRC: 'https://via.placeholder.com/300/FF00FF/FFFFFF?text=VehicleRC', 
      },
      status: 'pending',
      createdAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 },
      updatedAt: { _seconds: Math.floor(Date.now() / 1000), _nanoseconds: 0 }
    };
    
    setPartners([...partners, newPartner]);
    setFormData({ phoneNumber: '', fullName: '', email: '', vehicleType: '', address: '' });
    setIsAddDialogOpen(false);
    toast({
      title: "Partner added",
      description: `${formData.fullName} has been added successfully.`,
      duration: 3000,
    });
  };

  // const handleEditPartner = async () => {
  //   if (!currentPartner) return;
    
  //   try {
  //     // Prepare the data to send to the backend
  //     const updatePayload = {
  //       fullName: formData.fullName,
  //       email: formData.email,
  //       vehicleType: formData.vehicleType,
  //       address: formData.address,
  //       // Assuming bankDetails are not edited via this dialog. 
  //       // If they were, you'd include them: bankDetails: JSON.stringify(currentPartner.bankDetails)
  //       // Documents are handled separately on the backend via file uploads, not directly in this payload
  //     };

  //     // Call the service to update the partner
  //     await partnerService.updatePartner(currentPartner.id, updatePayload); 
      
  //     // If the update is successful, reload the partners to reflect changes
  //     loadPartners();
  //     setIsEditDialogOpen(false);
  //     toast({
  //       title: "Partner updated",
  //       description: `${formData.fullName} has been updated successfully.`,
  //       duration: 3000,
  //     });
  //   } catch (error: any) {
  //     console.error("Error updating partner:", error);
  //     toast({
  //       title: "Update Failed",
  //       description: error.message || "Failed to update partner.",
  //       variant: "destructive",
  //       duration: 3000,
  //     });
  //   }
  // };


  const handleEditPartner = async () => {
  if (!currentPartner) return;

  try {
    const form = new FormData();

    form.append('fullName', formData.fullName);
    form.append('email', formData.email);
    form.append('vehicleType', formData.vehicleType);
    form.append('address', formData.address);

    // If bankDetails need to be sent, stringify them
    if (currentPartner.bankDetails) {
      form.append('bankDetails', JSON.stringify(currentPartner.bankDetails));
    }

    // If you ever want to include files (e.g., Aadhaar):
    // form.append('aadhaar', selectedFile); // selectedFile must be a File object

    await partnerService.updatePartner(currentPartner.id, form);

    loadPartners();
    setIsEditDialogOpen(false);
    toast({
      title: "Partner updated",
      description: `${formData.fullName} has been updated successfully.`,
      duration: 3000,
    });
  } catch (error: any) {
    console.error("Error updating partner:", error);
    toast({
      title: "Update Failed",
      description: error.message || "Failed to update partner.",
      variant: "destructive",
      duration: 3000,
    });
  }
};


  const handleDeletePartner = async() => {
    if (!currentPartner) return;

    try{
      await partnerService.deletePartner(currentPartner.id);
      loadPartners();
      setIsDeleteDialogOpen(false);
      toast({
        title: "Partner deleted",
        description: `${currentPartner.fullName} has been deleted successfully.`,
        duration: 3000,
      });
    }catch(error){
      console.error("Error deleting partner:", error);
      toast({ title: "Error", description: "Failed to delete partner.", variant: "destructive" });
    }
  };

  const openEditDialog = (partner: Partner) => {
    setCurrentPartner(partner);
    setFormData({
      phoneNumber: partner.phoneNumber, // Phone number is usually not editable as it's often the ID
      fullName: partner.fullName,
      email: partner.email,
      vehicleType: partner.vehicleType,
      address: partner.address,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (partner: Partner) => {
    setCurrentPartner(partner);
    setIsDeleteDialogOpen(true);
  };

  const openDocumentsScreen = (partner: Partner) => {
    setCurrentPartner(partner);
    setRejectionReason(''); // Clear rejection reason when opening
    setShowDocumentVerificationScreen(true); // Show the documents screen
  };

  const verifyPartner = async () => {
    if (!currentPartner) return;

    try {
      const data = {adminId:ADMIN_ID,partnerPhone:currentPartner?.phoneNumber,action:'approve'}
      await partnerService.approveRejectPartner(data);
      toast({
        title: "Partner Verified",
        description: `${currentPartner.fullName} has been verified successfully.`,
        duration: 3000,
      });
      loadPartners(); // Reload partners to get updated status
      setShowDocumentVerificationScreen(false);
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "Failed to verify partner.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const rejectPartner = async () => {
    if (!currentPartner) return;

    if (!rejectionReason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejecting the partner.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    try {
      const data = {adminId:ADMIN_ID,partnerPhone:currentPartner.phoneNumber,action:"reject",rejectionReason:rejectionReason}
      await partnerService.approveRejectPartner(data);
      toast({
        title: "Partner Rejected",
        description: `${currentPartner.fullName} has been rejected.`,
        variant: "destructive",
        duration: 3000,
      });
      loadPartners(); // Reload partners to get updated status
      setShowDocumentVerificationScreen(false);
    } catch (error: any) {
      toast({
        title: "Rejection Failed",
        description: error.message || "Failed to reject partner.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const reApprovePartner = async (partner: Partner) => {
    try {
        const data = { adminId: ADMIN_ID, partnerPhone: partner?.phoneNumber, action: 'approve' };
        await partnerService.approveRejectPartner(data);
        toast({
            title: "Partner Re-Approved",
            description: `${partner.fullName} has been re-approved successfully.`,
            duration: 3000,
        });
        loadPartners(); // Reload partners to get updated status
        
    } catch (error: any) {
        toast({
            title: "Re-Approval Failed",
            description: error.message || "Failed to re-approve partner.",
            variant: "destructive",
            duration: 3000,
        });
    }
  };


  const formatDate = (timestamp: { _seconds: number; _nanoseconds: number }) => {
    if (!timestamp || typeof timestamp._seconds !== 'number') {
      return 'N/A'; // Handle cases where timestamp might be missing or malformed
    }
    return new Date(timestamp._seconds * 1000).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1 max-w-fit">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 flex items-center gap-1 max-w-fit">
            <AlertCircle className="h-3.5 w-3.5" />
            Pending Verification
          </Badge>
        );
      case 'rejected':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300 hover:bg-red-100 flex items-center gap-1 max-w-fit">
            <AlertCircle className="h-3.5 w-3.5" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  if (showDocumentVerificationScreen && currentPartner) {
    const documentFields = [
      { key: 'profilePhoto', label: 'Profile Photo' },
      { key: 'aadhaarFront', label: 'Aadhaar Card (Front)' },
      { key: 'aadhaarBack', label: 'Aadhaar Card (Back)' },
      { key: 'panCard', label: 'PAN Card' },
      { key: 'drivingLicense', label: 'Driving License' },
      { key: 'vehicleRC', label: 'Vehicle RC' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setShowDocumentVerificationScreen(false)}>
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Verify Documents for {currentPartner.fullName}</h1>
            <p className="text-muted-foreground">
              Review the documents submitted by {currentPartner.fullName} for verification.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
          {documentFields.map(({ key, label }) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <File className="h-5 w-5 text-blue-600" />
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentPartner.documents[key as keyof Documents] ? (
                  <img src={currentPartner.documents[key as keyof Documents]} alt={label} className="max-w-full h-auto rounded-md border" />
                ) : (
                  <div className="bg-slate-50 p-8 flex items-center justify-center rounded-md border border-dashed min-h-[150px]">
                    <div className="text-center text-muted-foreground">
                      <FileCheck className="mx-auto h-12 w-12 text-slate-400 mb-2" />
                      <p>No {label} Uploaded</p>
                    </div>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-blue-600"
                  onClick={() => window.open(currentPartner.documents[key as keyof Documents], '_blank')}
                  disabled={!currentPartner.documents[key as keyof Documents]}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Document
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {currentPartner.status !== 'verified' && (
          <>
            <div className="space-y-2">
                <Label htmlFor="rejectionReason">Reason for Rejection (Optional for Approval)</Label>
                <Input
                    id="rejectionReason"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection"
                />
            </div>

            <div className="mt-2 flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-blue-700">
                Please verify the authenticity of all documents before approval. Once verified, the partner will have access to the platform.
              </p>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="destructive"
                onClick={rejectPartner}
                disabled={currentPartner.status === 'rejected'}
              >
                Reject Partner
              </Button>
              <Button 
                onClick={verifyPartner}
                className="gap-2"
                disabled={currentPartner.status === 'verified'}
              >
                <CheckCircle className="h-4 w-4" />
                Verify Partner
              </Button>
            </div>
          </>
        )}

        {currentPartner.status === 'verified' && (
            <Alert className="bg-green-50 border-green-200">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <AlertTitle className="text-green-800">Partner Verified</AlertTitle>
                <AlertDescription className="text-green-700">
                    This partner has already been verified.
                </AlertDescription>
            </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Partners</h1>
        <p className="text-muted-foreground">
          Manage your recycling partners
        </p>
      </div>

      {pendingCount > 0 && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-800">Verification Required</AlertTitle>
          <AlertDescription className="text-amber-700">
            You have {pendingCount} partner{pendingCount > 1 ? 's' : ''} waiting for document verification.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Partner List</CardTitle>
            <CardDescription>
              View and manage all your recycling partners
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search partners..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                {/* <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Partner
                </Button> */}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Partner</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new recycling partner below.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phoneNumber" className="text-right">
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="fullName" className="text-right">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="vehicleType" className="text-right">
                      Vehicle Type
                    </Label>
                    <Input
                      id="vehicleType"
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPartner}>
                    Add Partner
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Joined Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No partners found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPartners.map(partner => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">{partner.fullName}</TableCell>
                    <TableCell>{partner.phoneNumber}</TableCell>
                    <TableCell>{partner.email}</TableCell>
                    <TableCell>{partner.vehicleType}</TableCell>
                    <TableCell>{formatDate(partner.createdAt)}</TableCell>
                    <TableCell>
                      {getStatusBadge(partner.status)}
                    </TableCell>
                    <TableCell className="space-x-2 flex items-center">
                      {/* Always show Eye button to view documents */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-600 hover:bg-gray-100"
                        onClick={() => openDocumentsScreen(partner)} 
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {partner.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => openDocumentsScreen(partner)} 
                        >
                          <FileCheck className="h-4 w-4 mr-1" />
                          Verify Documents
                        </Button>
                      )}
                      {partner.status === 'rejected' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => reApprovePartner(partner)} 
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Re-approve
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(partner)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => openDeleteDialog(partner)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Partner</DialogTitle>
            <DialogDescription>
              Update the partner details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phoneNumber" className="text-right">
                Phone Number
              </Label>
              <Input
                id="edit-phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="col-span-3"
                disabled // Phone number often serves as an ID and shouldn't be edited directly
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-fullName" className="text-right">
                Full Name
              </Label>
              <Input
                id="edit-fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-vehicleType" className="text-right">
                Vehicle Type
              </Label>
              <Input
                id="edit-vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-address" className="text-right">
                Address
              </Label>
              <Input
                id="edit-address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPartner}>
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
              Are you sure you want to delete {currentPartner?.fullName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePartner}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 

export default Partners;