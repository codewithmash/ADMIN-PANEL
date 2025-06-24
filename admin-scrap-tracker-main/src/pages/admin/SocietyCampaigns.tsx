// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useToast } from "@/components/ui/use-toast";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Pencil, Trash2, Plus, Search, CalendarIcon } from "lucide-react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { useEffect } from 'react';
// import { societyCampaignsService } from '@/services/societyCampaignsService'

// // Updated interface to match the new data structure
// interface Campaign {
//   firestoreId: string;
//   apartmentName: string;
//   apartmentType: string;
//   personInCharge: string;
//   contactNumber: string;
//   extraInfo: string;
//   createdAt: {
//     _seconds: number;
//     _nanoseconds: number;
//   };
//   status?: 'scheduled' | 'completed' | 'cancelled'; // Making status optional
// }

// const SocietyCampaigns = () => {
//   const [campaigns, setCampaigns] = useState<Campaign[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState<string>('all');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
//   const [formData, setFormData] = useState<Omit<Campaign, 'firestoreId' | 'createdAt'>>({
//     apartmentName: '',
//     apartmentType: 'residential',
//     personInCharge: '',
//     contactNumber: '',
//     extraInfo: '',
//     status: 'scheduled',
//   });
  
//   const { toast } = useToast();

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   const fetchCampaigns = async () => {
//     try {
//       const data = await societyCampaignsService.getAll();
//       console.log("data",data)
//       // Add status to campaigns if not present
//       const campaignsWithStatus = data["enquiries"].map((campaign: Campaign) => ({
//         ...campaign,
//         status: campaign?.status || 'scheduled' // Default to scheduled if status doesn't exist
//       }));
//       setCampaigns(campaignsWithStatus);
//       console.log("Campaigns",campaigns)
//     } catch (error) {
//       toast({
//         title: "Error fetching campaigns",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   const filteredCampaigns = campaigns.filter(campaign => {
//     // Filter by search term
//     const matchesSearch = 
//       campaign.apartmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       campaign.personInCharge.toLowerCase().includes(searchTerm.toLowerCase());
    
//     // Filter by status
//     const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
//     return matchesSearch && matchesStatus;
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleStatusChange = (value: string) => {
//     setFormData(prev => ({ 
//       ...prev, 
//       status: value as 'scheduled' | 'completed' | 'cancelled' 
//     }));
//   };

//   const handleDateChange = (date: Date | undefined) => {
//     if (date) {
//       // Convert to Firestore timestamp format if needed
//       // This would be handled differently if you're saving to Firestore
//     }
//   };

//   const handleAddCampaign = async () => {
//     try {
//       // Here you would call your service to add to Firestore
//       // For now, we'll mock the response
//       const newCampaign = {
//         ...formData,
//         firestoreId: Math.random().toString(36).substring(2, 9),
//         createdAt: {
//           _seconds: Math.floor(Date.now() / 1000),
//           _nanoseconds: 0
//         }
//       };
      
//       setCampaigns([...campaigns, newCampaign]);
//       setFormData({
//         apartmentName: '',
//         apartmentType: 'residential',
//         personInCharge: '',
//         contactNumber: '',
//         extraInfo: '',
//         status: 'scheduled',
//       });
//       setIsAddDialogOpen(false);
//       toast({
//         title: "Campaign added",
//         description: `Campaign for ${formData.apartmentName} has been added successfully.`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast({
//         title: "Error adding campaign",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleEditCampaign = async () => {
//     if (!currentCampaign) return;
    
//     try {
//       // Here you would call your service to update in Firestore
//       const updatedCampaigns = campaigns.map(campaign => 
//         campaign.firestoreId === currentCampaign.firestoreId ? { 
//           ...campaign, 
//           ...formData 
//         } : campaign
//       );
      
//       setCampaigns(updatedCampaigns);
//       setIsEditDialogOpen(false);
//       toast({
//         title: "Campaign updated",
//         description: `Campaign for ${formData.apartmentName} has been updated successfully.`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast({
//         title: "Error updating campaign",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleDeleteCampaign = async () => {
//     if (!currentCampaign) return;
    
//     try {
//       // Here you would call your service to delete from Firestore
//       setCampaigns(campaigns.filter(campaign => campaign.firestoreId !== currentCampaign.firestoreId));
//       setIsDeleteDialogOpen(false);
//       toast({
//         title: "Campaign deleted",
//         description: `Campaign for ${currentCampaign.apartmentName} has been deleted successfully.`,
//         duration: 3000,
//       });
//     } catch (error) {
//       toast({
//         title: "Error deleting campaign",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   const openEditDialog = (campaign: Campaign) => {
//     setCurrentCampaign(campaign);
//     setFormData({
//       apartmentName: campaign.apartmentName,
//       apartmentType: campaign.apartmentType,
//       personInCharge: campaign.personInCharge,
//       contactNumber: campaign.contactNumber,
//       extraInfo: campaign.extraInfo,
//       status: campaign.status || 'scheduled',
//     });
//     setIsEditDialogOpen(true);
//   };

//   const openDeleteDialog = (campaign: Campaign) => {
//     setCurrentCampaign(campaign);
//     setIsDeleteDialogOpen(true);
//   };

//   const getStatusBadge = (status: string = 'scheduled') => {
//     switch(status) {
//       case 'scheduled':
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
//       case 'completed':
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
//       case 'cancelled':
//         return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
//       default:
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
//     }
//   };

//   const formatFirestoreDate = (timestamp: { _seconds: number, _nanoseconds: number }) => {
//     return format(new Date(timestamp._seconds * 1000), 'MMM dd, yyyy');
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Society Campaigns</h1>
//         <p className="text-muted-foreground">
//           Manage scrap collection campaigns at apartment societies
//         </p>
//       </div>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Campaigns List</CardTitle>
//             <CardDescription>
//               All scheduled and past scrap collection campaigns
//             </CardDescription>
//           </div>
//           <div className="flex space-x-2">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search campaigns..."
//                 className="pl-8 w-[200px]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Select 
//               onValueChange={setStatusFilter}
//               defaultValue="all"
//             >
//               <SelectTrigger className="w-[150px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Statuses</SelectItem>
//                 <SelectItem value="scheduled">Scheduled</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="cancelled">Cancelled</SelectItem>
//               </SelectContent>
//             </Select>
//             <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Campaign
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[525px]">
//                 <DialogHeader>
//                   <DialogTitle>Schedule New Society Campaign</DialogTitle>
//                   <DialogDescription>
//                     Enter details for the new scrap collection campaign.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="apartmentName" className="text-right">
//                       Apartment Name
//                     </Label>
//                     <Input
//                       id="apartmentName"
//                       name="apartmentName"
//                       value={formData.apartmentName}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="apartmentType" className="text-right">
//                       Apartment Type
//                     </Label>
//                     <Select
//                       name="apartmentType"
//                       value={formData.apartmentType}
//                       onValueChange={(value) => setFormData(prev => ({ ...prev, apartmentType: value }))}
//                     >
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="residential">Residential</SelectItem>
//                         <SelectItem value="commercial">Commercial</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="personInCharge" className="text-right">
//                       Person In Charge
//                     </Label>
//                     <Input
//                       id="personInCharge"
//                       name="personInCharge"
//                       value={formData.personInCharge}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="contactNumber" className="text-right">
//                       Contact Number
//                     </Label>
//                     <Input
//                       id="contactNumber"
//                       name="contactNumber"
//                       value={formData.contactNumber}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="extraInfo" className="text-right">
//                       Additional Information
//                     </Label>
//                     <Textarea
//                       id="extraInfo"
//                       name="extraInfo"
//                       value={formData.extraInfo}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="status" className="text-right">
//                       Status
//                     </Label>
//                     <Select 
//                       onValueChange={handleStatusChange}
//                       defaultValue={formData.status}
//                     >
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="scheduled">Scheduled</SelectItem>
//                         <SelectItem value="completed">Completed</SelectItem>
//                         <SelectItem value="cancelled">Cancelled</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleAddCampaign}>
//                     Schedule Campaign
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
//                 <TableHead>Apartment Name</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Person In Charge</TableHead>
//                 <TableHead>Contact</TableHead>
//                 <TableHead>Created At</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredCampaigns.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
//                     No campaigns found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredCampaigns.map(campaign => (
//                   <TableRow key={campaign.firestoreId}>
//                     <TableCell className="font-medium">{campaign.apartmentName}</TableCell>
//                     <TableCell>{campaign.apartmentType}</TableCell>
//                     <TableCell>{campaign.personInCharge}</TableCell>
//                     <TableCell>{campaign.contactNumber}</TableCell>
//                     <TableCell>{formatFirestoreDate(campaign.createdAt)}</TableCell>
//                     <TableCell>{getStatusBadge(campaign.status)}</TableCell>
//                     <TableCell className="space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openEditDialog(campaign)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-destructive"
//                         onClick={() => openDeleteDialog(campaign)}
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

//       {/* Edit Dialog - Similar to Add Dialog but with existing values */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="sm:max-w-[525px]">
//           <DialogHeader>
//             <DialogTitle>Edit Campaign</DialogTitle>
//             <DialogDescription>
//               Update the campaign details.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             {/* Similar form fields as in Add Dialog, but with current values */}
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-apartmentName" className="text-right">
//                 Apartment Name
//               </Label>
//               <Input
//                 id="edit-apartmentName"
//                 name="apartmentName"
//                 value={formData.apartmentName}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             {/* Include all other fields similarly */}
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditCampaign}>
//               Save Changes
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Dialog remains the same */}
//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete the campaign for {currentCampaign?.apartmentName}? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteCampaign}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default SocietyCampaigns;



import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Search, CheckCircle, XCircle, MapPin } from "lucide-react"; // Added MapPin icon
import { format } from "date-fns";
import { societyCampaignsService } from '@/services/societyCampaignsService';

// Updated interface to match the new data structure from backend, including our custom enquiryId
interface Campaign {
  firestoreId: string; // Firestore's auto-generated ID
  enquiryId: string; // Our custom generated ID
  apartmentName: string;
  apartmentType: string;
  personInCharge: string;
  contactNumber: string;
  extraInfo: string;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
  status?: 'scheduled' | 'approved' | 'rejected'; // Updated status types
  location?: { // Location as GeoPoint comes from Firestore and needs these properties
    _latitude: number;
    _longitude: number;
  };
  approvedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  rejectedAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  rejectionReason?: string;
}

const SocietyCampaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isEditLocationDialogOpen, setIsEditLocationDialogOpen] = useState(false); // New state for edit location dialog

  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [formData, setFormData] = useState<Omit<Campaign, 'firestoreId' | 'createdAt' | 'enquiryId' | 'location' | 'approvedAt' | 'rejectedAt' | 'rejectionReason'>>({
    apartmentName: '',
    apartmentType: 'residential',
    personInCharge: '',
    contactNumber: '',
    extraInfo: '',
    status: 'scheduled',
  });

  // State for latitude, longitude, and rejection reason
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const data = await societyCampaignsService.getAll();
      const campaignsWithStatus = data.enquiries.map((campaign: Campaign) => ({
        ...campaign,
        status: campaign?.status || 'scheduled'
      }));
      setCampaigns(campaignsWithStatus);
    } catch (error) {
      toast({
        title: "Error fetching campaigns",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch =
      campaign.apartmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.personInCharge.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value as 'scheduled' | 'approved' | 'rejected'
    }));
  };

  const handleAddCampaign = async () => {
    try {
      const response = await societyCampaignsService.create(formData);
      if (response.enquiryId) {
        fetchCampaigns(); // Re-fetch campaigns to get the latest data including the new one
        setFormData({
          apartmentName: '',
          apartmentType: 'residential',
          personInCharge: '',
          contactNumber: '',
          extraInfo: '',
          status: 'scheduled',
        });
        setIsAddDialogOpen(false);
        toast({
          title: "Campaign added",
          description: `Campaign for ${formData.apartmentName} has been added successfully.`,
          duration: 3000,
        });
      } else {
        throw new Error("Failed to add campaign.");
      }
    } catch (error) {
      console.error("Error adding campaign:", error);
      toast({
        title: "Error adding campaign",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleEditCampaign = async () => {
    if (!currentCampaign) return;

    try {
      // Backend doesn't have a generic update route for all fields,
      // so this will currently only update client-side state.
      // If you need to update all fields, a new service call would be needed.
      const updatedCampaigns = campaigns.map(campaign =>
        campaign.firestoreId === currentCampaign.firestoreId ? {
          ...campaign,
          ...formData
        } : campaign
      );

      setCampaigns(updatedCampaigns);
      setIsEditDialogOpen(false);
      toast({
        title: "Campaign updated",
        description: `Campaign for ${formData.apartmentName} has been updated successfully.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error updating campaign",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCampaign = async () => {
    if (!currentCampaign) return;

    try {
      await societyCampaignsService.delete(currentCampaign.enquiryId);
      setCampaigns(campaigns.filter(campaign => campaign.firestoreId !== currentCampaign.firestoreId));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Campaign deleted",
        description: `Campaign for ${currentCampaign.apartmentName} has been deleted successfully.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error deleting campaign",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleApproveCampaign = async () => {
    if (!currentCampaign) return;
    if (!latitude || !longitude) {
      toast({
        title: "Missing Information",
        description: "Latitude and Longitude are required for approval.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        status: 'approved',
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      await societyCampaignsService.approveOrReject(currentCampaign.enquiryId, payload);
      fetchCampaigns(); // Re-fetch to update status and location
      setIsApproveDialogOpen(false);
      setLatitude('');
      setLongitude('');
      toast({
        title: "Campaign Approved",
        description: `Campaign for ${currentCampaign.apartmentName} has been approved.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error approving campaign:", error);
      toast({
        title: "Error approving campaign",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleRejectCampaign = async () => {
    if (!currentCampaign) return;

    try {
      const payload = {
        status: 'rejected',
        reason: rejectionReason || "No reason provided",
      };
      await societyCampaignsService.approveOrReject(currentCampaign.enquiryId, payload);
      fetchCampaigns(); // Re-fetch to update status and rejection reason
      setIsRejectDialogOpen(false);
      setRejectionReason('');
      toast({
        title: "Campaign Rejected",
        description: `Campaign for ${currentCampaign.apartmentName} has been rejected.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      toast({
        title: "Error rejecting campaign",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateLocation = async () => {
    if (!currentCampaign) return;
    if (!latitude || !longitude) {
      toast({
        title: "Missing Information",
        description: "Latitude and Longitude are required to update location.",
        variant: "destructive",
      });
      return;
    }

    try {
      const payload = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      await societyCampaignsService.updateLocation(currentCampaign.enquiryId, payload);
      fetchCampaigns(); // Re-fetch to update the table with the new location
      setIsEditLocationDialogOpen(false);
      setLatitude('');
      setLongitude('');
      toast({
        title: "Location Updated",
        description: `Zone location for ${currentCampaign.apartmentName} has been updated successfully.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error updating location:", error);
      toast({
        title: "Error updating location",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setFormData({
      apartmentName: campaign.apartmentName,
      apartmentType: campaign.apartmentType,
      personInCharge: campaign.personInCharge,
      contactNumber: campaign.contactNumber,
      extraInfo: campaign.extraInfo,
      status: campaign.status || 'scheduled',
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setIsDeleteDialogOpen(true);
  };

  const openApproveDialog = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setLatitude(campaign.location?._latitude ? String(campaign.location._latitude) : '');
    setLongitude(campaign.location?._longitude ? String(campaign.location._longitude) : '');
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setRejectionReason(campaign.rejectionReason || '');
    setIsRejectDialogOpen(true);
  };

  const openEditLocationDialog = (campaign: Campaign) => {
    setCurrentCampaign(campaign);
    setLatitude(campaign.location?._latitude ? String(campaign.location._latitude) : '');
    setLongitude(campaign.location?._longitude ? String(campaign.location._longitude) : '');
    setIsEditLocationDialogOpen(true);
  };

  const getStatusBadge = (status: string = 'scheduled') => {
    switch (status) {
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Scheduled</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Unknown</Badge>;
    }
  };

  const formatFirestoreDate = (timestamp: { _seconds: number, _nanoseconds: number }) => {
    if (!timestamp || typeof timestamp._seconds !== 'number') return 'N/A';
    return format(new Date(timestamp._seconds * 1000), 'MMM dd,yyyy');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Society Campaigns</h1>
        <p className="text-muted-foreground">
          Manage scrap collection campaigns at apartment societies
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Campaigns List</CardTitle>
            <CardDescription>
              All scheduled and past scrap collection campaigns
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search campaigns..."
                className="pl-8 w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              onValueChange={setStatusFilter}
              defaultValue="all"
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Schedule New Society Campaign</DialogTitle>
                  <DialogDescription>
                    Enter details for the new scrap collection campaign.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="apartmentName" className="text-right">
                      Apartment Name
                    </Label>
                    <Input
                      id="apartmentName"
                      name="apartmentName"
                      value={formData.apartmentName}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="apartmentType" className="text-right">
                      Apartment Type
                    </Label>
                    <Select
                      name="apartmentType"
                      value={formData.apartmentType}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, apartmentType: value as 'residential' | 'commercial' }))}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="personInCharge" className="text-right">
                      Person In Charge
                    </Label>
                    <Input
                      id="personInCharge"
                      name="personInCharge"
                      value={formData.personInCharge}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contactNumber" className="text-right">
                      Contact Number
                    </Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="extraInfo" className="text-right">
                      Additional Information
                    </Label>
                    <Textarea
                      id="extraInfo"
                      name="extraInfo"
                      value={formData.extraInfo}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCampaign}>
                    Schedule Campaign
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
                <TableHead>Apartment Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Person In Charge</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Zone Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No campaigns found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCampaigns.map(campaign => (
                  <TableRow key={campaign.firestoreId}>
                    <TableCell className="font-medium">{campaign.apartmentName}</TableCell>
                    <TableCell>{campaign.apartmentType}</TableCell>
                    <TableCell>{campaign.personInCharge}</TableCell>
                    <TableCell>{campaign.contactNumber}</TableCell>
                    <TableCell>{formatFirestoreDate(campaign.createdAt)}</TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      {campaign.status === 'approved' && campaign.location ? (
                        <span className="text-sm text-muted-foreground">
                          Lat: {campaign.location._latitude.toFixed(4)}, Lng: {campaign.location._longitude.toFixed(4)}
                        </span>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell className="space-x-2">
                      {/* <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(campaign)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-green-600"
                        onClick={() => openApproveDialog(campaign)}
                        disabled={campaign.status === 'approved' || campaign.status === 'rejected'}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600"
                        onClick={() => openRejectDialog(campaign)}
                        disabled={campaign.status === 'approved' || campaign.status === 'rejected'}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      {campaign.status === 'approved' && ( // Only show edit location for approved campaigns
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600"
                          onClick={() => openEditLocationDialog(campaign)}
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => openDeleteDialog(campaign)}
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
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Update the campaign details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-apartmentName" className="text-right">
                Apartment Name
              </Label>
              <Input
                id="edit-apartmentName"
                name="apartmentName"
                value={formData.apartmentName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-apartmentType" className="text-right">
                Apartment Type
              </Label>
              <Select
                name="apartmentType"
                value={formData.apartmentType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, apartmentType: value as 'residential' | 'commercial' }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-personInCharge" className="text-right">
                Person In Charge
              </Label>
              <Input
                id="edit-personInCharge"
                name="personInCharge"
                value={formData.personInCharge}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-contactNumber" className="text-right">
                Contact Number
              </Label>
              <Input
                id="edit-contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-extraInfo" className="text-right">
                Additional Information
              </Label>
              <Textarea
                id="edit-extraInfo"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={handleStatusChange}
                defaultValue={formData.status}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCampaign}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Approve Campaign</DialogTitle>
            <DialogDescription>
              Enter the zone location (latitude and longitude) for this approved campaign.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="latitude" className="text-right">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 12.9716"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longitude" className="text-right">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 77.5946"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApproveCampaign}>
              Approve Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Campaign</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting the campaign for {currentCampaign?.apartmentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rejectionReason" className="text-right">
                Reason
              </Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Not enough resources, schedule conflict"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectCampaign}>
              Reject Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Location Dialog - NEW */}
      <Dialog open={isEditLocationDialogOpen} onOpenChange={setIsEditLocationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Zone Location</DialogTitle>
            <DialogDescription>
              Update the latitude and longitude for {currentCampaign?.apartmentName}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-lat" className="text-right">
                Latitude
              </Label>
              <Input
                id="edit-lat"
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 12.9716"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-lng" className="text-right">
                Longitude
              </Label>
              <Input
                id="edit-lng"
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 77.5946"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLocationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLocation}>
              Update Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog remains the same */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the campaign for {currentCampaign?.apartmentName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCampaign}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocietyCampaigns;