
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
// import { Pencil, Trash2, Plus, Search, Eye } from "lucide-react";

// import {scrapBuyersService} from "@/services/scrapBuyersService"

// // Mock data for scrap buyers
// const initialScrapBuyers = [
//   { 
//     id: 1, 
//     name: "Raj Sharma", 
//     companyName: "Green Recycling Co.", 
//     contactNumber: "+91 9876543210", 
//     occupation: "recycler", 
//     preferredProducts: "Metal, Paper",
//     companyDetails: "Small recycling plant in South Delhi",
//     gstNumber: "29ABCDE1234F1Z5" 
//   },
//   { 
//     id: 2, 
//     name: "Priya Patel", 
//     companyName: "EcoTech Innovations", 
//     contactNumber: "+91 8765432109", 
//     occupation: "recycler", 
//     preferredProducts: "E-waste, Plastic",
//     companyDetails: "Medium-sized e-waste processing facility",
//     gstNumber: "27PQRST5678G2Y6" 
//   },
//   { 
//     id: 3, 
//     name: "Arjun Kumar", 
//     companyName: "", 
//     contactNumber: "+91 7654321098", 
//     occupation: "individual", 
//     preferredProducts: "Paper, Glass",
//     companyDetails: "",
//     gstNumber: "" 
//   },
//   { 
//     id: 4, 
//     name: "Meera Singh", 
//     companyName: "Environmental Sciences Dept.", 
//     contactNumber: "+91 6543210987", 
//     occupation: "student", 
//     preferredProducts: "Plastic, E-waste",
//     companyDetails: "Delhi University",
//     gstNumber: "" 
//   },
// ];

// interface ScrapBuyer {
//   id: number;
//   name: string;
//   companyName: string;
//   contactNumber: string;
//   occupation: string;
//   preferredProducts: string;
//   companyDetails: string;
//   gstNumber: string;
// }

// const occupationOptions = [
//   { value: "recycler", label: "Recycler" },
//   { value: "individual", label: "Individual" },
//   { value: "student", label: "Student" },
// ];

// const ScrapBuyers = () => {
//   const [scrapBuyers, setScrapBuyers] = useState<ScrapBuyer[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
//   const [currentBuyer, setCurrentBuyer] = useState<ScrapBuyer | null>(null);
//   const [formData, setFormData] = useState<Omit<ScrapBuyer, 'id'>>({
//     name: '',
//     companyName: '',
//     contactNumber: '',
//     occupation: 'individual',
//     preferredProducts: '',
//     companyDetails: '',
//     gstNumber: '',
//   });
  
//   const { toast } = useToast();

//   const filteredBuyers = scrapBuyers.filter(buyer => 
//     buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     buyer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSelectChange = (value: string) => {
//     setFormData(prev => ({ ...prev, occupation: value }));
//   };

//   const handleAddBuyer = () => {
//     const newId = Math.max(...scrapBuyers.map(buyer => buyer.id), 0) + 1;
//     const newBuyer = { ...formData, id: newId };
//     setScrapBuyers([...scrapBuyers, newBuyer]);
//     setFormData({ 
//       name: '',
//       companyName: '',
//       contactNumber: '',
//       occupation: 'individual',
//       preferredProducts: '',
//       companyDetails: '',
//       gstNumber: '',
//     });
//     setIsAddDialogOpen(false);
//     toast({
//       title: "Buyer added",
//       description: `${formData.name} has been added successfully.`,
//       duration: 3000,
//     });
//   };

//   const handleEditBuyer = () => {
//     if (!currentBuyer) return;
    
//     setScrapBuyers(scrapBuyers.map(buyer => 
//       buyer.id === currentBuyer.id ? { ...buyer, ...formData } : buyer
//     ));
    
//     setIsEditDialogOpen(false);
//     toast({
//       title: "Buyer updated",
//       description: `${formData.name} has been updated successfully.`,
//       duration: 3000,
//     });
//   };

//   const handleDeleteBuyer = () => {
//     if (!currentBuyer) return;
    
//     setScrapBuyers(scrapBuyers.filter(buyer => buyer.id !== currentBuyer.id));
//     setIsDeleteDialogOpen(false);
//     toast({
//       title: "Buyer deleted",
//       description: `${currentBuyer.name} has been deleted successfully.`,
//       duration: 3000,
//     });
//   };

//   const openEditDialog = (buyer: ScrapBuyer) => {
//     setCurrentBuyer(buyer);
//     setFormData({
//       name: buyer.name,
//       companyName: buyer.companyName,
//       contactNumber: buyer.contactNumber,
//       occupation: buyer.occupation,
//       preferredProducts: buyer.preferredProducts,
//       companyDetails: buyer.companyDetails,
//       gstNumber: buyer.gstNumber,
//     });
//     setIsEditDialogOpen(true);
//   };

//   const openDeleteDialog = (buyer: ScrapBuyer) => {
//     setCurrentBuyer(buyer);
//     setIsDeleteDialogOpen(true);
//   };

//   const openViewDialog = (buyer: ScrapBuyer) => {
//     setCurrentBuyer(buyer);
//     setIsViewDialogOpen(true);
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Scrap Buyers</h1>
//         <p className="text-muted-foreground">
//           Manage your scrap buyers and their preferences
//         </p>
//       </div>

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Scrap Buyers List</CardTitle>
//             <CardDescription>
//               All registered scrap buyers and recyclers
//             </CardDescription>
//           </div>
//           <div className="flex space-x-2">
//             <div className="relative">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search buyers..."
//                 className="pl-8 w-[250px]"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button>
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add Buyer
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[525px]">
//                 <DialogHeader>
//                   <DialogTitle>Add New Scrap Buyer</DialogTitle>
//                   <DialogDescription>
//                     Enter the details of the new scrap buyer.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-right">
//                       Name
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
//                     <Label htmlFor="companyName" className="text-right">
//                       Company Name
//                     </Label>
//                     <Input
//                       id="companyName"
//                       name="companyName"
//                       value={formData.companyName}
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
//                     <Label htmlFor="occupation" className="text-right">
//                       Occupation
//                     </Label>
//                     <Select 
//                       onValueChange={handleSelectChange}
//                       defaultValue={formData.occupation}
//                     >
//                       <SelectTrigger className="col-span-3">
//                         <SelectValue placeholder="Select occupation" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {occupationOptions.map(option => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="preferredProducts" className="text-right">
//                       Preferred Products
//                     </Label>
//                     <Input
//                       id="preferredProducts"
//                       name="preferredProducts"
//                       value={formData.preferredProducts}
//                       onChange={handleInputChange}
//                       placeholder="E.g., Metal, Paper, Plastic"
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="companyDetails" className="text-right">
//                       Company Details
//                     </Label>
//                     <Textarea
//                       id="companyDetails"
//                       name="companyDetails"
//                       value={formData.companyDetails}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                   <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="gstNumber" className="text-right">
//                       GST Number
//                     </Label>
//                     <Input
//                       id="gstNumber"
//                       name="gstNumber"
//                       value={formData.gstNumber}
//                       onChange={handleInputChange}
//                       className="col-span-3"
//                     />
//                   </div>
//                 </div>
//                 <DialogFooter>
//                   <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button onClick={handleAddBuyer}>
//                     Add Buyer
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
//                 <TableHead>Name</TableHead>
//                 <TableHead>Company</TableHead>
//                 <TableHead>Contact</TableHead>
//                 <TableHead>Occupation</TableHead>
//                 <TableHead>Preferred Products</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredBuyers.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
//                     No buyers found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredBuyers.map(buyer => (
//                   <TableRow key={buyer.id}>
//                     <TableCell className="font-medium">{buyer.name}</TableCell>
//                     <TableCell>{buyer.companyName || "-"}</TableCell>
//                     <TableCell>{buyer.contactNumber}</TableCell>
//                     <TableCell className="capitalize">{buyer.occupation}</TableCell>
//                     <TableCell>{buyer.preferredProducts}</TableCell>
//                     <TableCell className="space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openViewDialog(buyer)}
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openEditDialog(buyer)}
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="text-destructive"
//                         onClick={() => openDeleteDialog(buyer)}
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
//             <DialogTitle>Buyer Details</DialogTitle>
//           </DialogHeader>
//           {currentBuyer && (
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Name:</p>
//                 <p className="col-span-2">{currentBuyer.name}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Company Name:</p>
//                 <p className="col-span-2">{currentBuyer.companyName || "-"}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Contact Number:</p>
//                 <p className="col-span-2">{currentBuyer.contactNumber}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Occupation:</p>
//                 <p className="col-span-2 capitalize">{currentBuyer.occupation}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Preferred Products:</p>
//                 <p className="col-span-2">{currentBuyer.preferredProducts}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">Company Details:</p>
//                 <p className="col-span-2">{currentBuyer.companyDetails || "-"}</p>
//               </div>
//               <div className="grid grid-cols-3 items-center gap-4">
//                 <p className="text-right font-medium">GST Number:</p>
//                 <p className="col-span-2">{currentBuyer.gstNumber || "-"}</p>
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
//             <DialogTitle>Edit Buyer</DialogTitle>
//             <DialogDescription>
//               Update the buyer details.
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-name" className="text-right">
//                 Name
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
//               <Label htmlFor="edit-companyName" className="text-right">
//                 Company Name
//               </Label>
//               <Input
//                 id="edit-companyName"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-contactNumber" className="text-right">
//                 Contact Number
//               </Label>
//               <Input
//                 id="edit-contactNumber"
//                 name="contactNumber"
//                 value={formData.contactNumber}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-occupation" className="text-right">
//                 Occupation
//               </Label>
//               <Select 
//                 onValueChange={handleSelectChange}
//                 defaultValue={formData.occupation}
//               >
//                 <SelectTrigger className="col-span-3">
//                   <SelectValue placeholder="Select occupation" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {occupationOptions.map(option => (
//                     <SelectItem key={option.value} value={option.value}>
//                       {option.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-preferredProducts" className="text-right">
//                 Preferred Products
//               </Label>
//               <Input
//                 id="edit-preferredProducts"
//                 name="preferredProducts"
//                 value={formData.preferredProducts}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-companyDetails" className="text-right">
//                 Company Details
//               </Label>
//               <Textarea
//                 id="edit-companyDetails"
//                 name="companyDetails"
//                 value={formData.companyDetails}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="edit-gstNumber" className="text-right">
//                 GST Number
//               </Label>
//               <Input
//                 id="edit-gstNumber"
//                 name="gstNumber"
//                 value={formData.gstNumber}
//                 onChange={handleInputChange}
//                 className="col-span-3"
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleEditBuyer}>
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
//               Are you sure you want to delete {currentBuyer?.name}? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
//               Cancel
//             </Button>
//             <Button variant="destructive" onClick={handleDeleteBuyer}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ScrapBuyers;



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
import { Pencil, Trash2, Plus, Search, Eye } from "lucide-react";

import { scrapBuyersService } from "@/services/scrapBuyersService"

interface ScrapBuyer {
  id: number;
  name: string;
  company?: string; // Optional, as per backend
  contact: string;
  designation: string; // Changed from occupation
  scrapTypes: string; // Changed from preferredProducts, will be a comma-separated string
  description: string; // Changed from companyDetails
  documents?: { url: string; path: string } | null; // Optional, for file upload
  approvedBy: string;
  quantity: string;
  rate: string;
}

const designationOptions = [
  { value: "recycler", label: "Recycler" },
  { value: "individual", label: "Individual" },
  { value: "student", label: "Student" },
  { value: "other", label: "Other" }, // Added 'other' for flexibility
];

const ScrapBuyers = () => {
  const [scrapBuyers, setScrapBuyers] = useState<ScrapBuyer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentBuyer, setCurrentBuyer] = useState<ScrapBuyer | null>(null);
  const [formData, setFormData] = useState<Omit<ScrapBuyer, 'id' | 'documents'>>({
    name: '',
    company: '',
    contact: '',
    designation: 'individual',
    scrapTypes: '',
    description: '',
    approvedBy: '',
    quantity: '',
    rate: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const { toast } = useToast();

  // Fetch buyers on component mount
  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const data = await scrapBuyersService.getAll();
        // Assuming the backend returns an array of buyers,
        // and IDs are handled correctly by the service or backend.
        // If your backend assigns string IDs (like Firestore),
        // you might need to adjust the ScrapBuyer interface (id: string;).
        setScrapBuyers(data.data.map((buyer: any, index: number) => ({ ...buyer, id: buyer.id || index + 1 })));
        toast({
          title: "Buyers loaded",
          description: "Scrap buyer data has been loaded.",
          duration: 3000,
        });
      } catch (error: any) {
        toast({
          title: "Error",
          description: `Failed to load buyers: ${error.message}`,
          variant: "destructive",
          duration: 3000,
        });
      }
    };
    fetchBuyers();
  }, []);

  const filteredBuyers = scrapBuyers.filter(buyer =>
    buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (buyer.company && buyer.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, designation: value }));
  };

  const handleAddBuyer = async () => {
    try {
      // Basic validation (more comprehensive validation should be on the backend)
      if (!formData.name || !formData.contact || !formData.scrapTypes || !formData.approvedBy || !formData.description || !formData.quantity || !formData.rate) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (!/^\d{10}$/.test(formData.contact)) {
        toast({
          title: "Validation Error",
          description: "Contact number must be 10 digits.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // Backend expects 'company', not 'companyName'
      const buyerDataToSend = {
        ...formData,
        company: formData.company || undefined, // Send as undefined if empty string
      };

      const response = await scrapBuyersService.create(buyerDataToSend, file);
      // Assuming the backend response contains the full new buyer object with an ID
      setScrapBuyers(prev => [...prev, { ...response.buyerData, id: response.buyerId || prev.length + 1 }]);
      
      setFormData({
        name: '',
        company: '',
        contact: '',
        designation: 'individual',
        scrapTypes: '',
        description: '',
        approvedBy: '',
        quantity: '',
        rate: '',
      });
      setFile(null);
      setIsAddDialogOpen(false);
      toast({
        title: "Buyer added",
        description: `${formData.name} has been added successfully.`,
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error adding buyer:", error);
      toast({
        title: "Error adding buyer",
        description: `Failed to add buyer: ${error.message}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleEditBuyer = async () => {
    if (!currentBuyer) return;

    try {
      // Basic validation
      if (!formData.name || !formData.contact || !formData.scrapTypes || !formData.approvedBy || !formData.description || !formData.quantity || !formData.rate) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      if (!/^\d{10}$/.test(formData.contact)) {
        toast({
          title: "Validation Error",
          description: "Contact number must be 10 digits.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // If you implement an update service, it would look like this:
      await scrapBuyersService.update(currentBuyer.id, formData, file);

      setScrapBuyers(scrapBuyers.map(buyer =>
        buyer.id === currentBuyer.id ? { ...buyer, ...formData, documents: file ? { url: URL.createObjectURL(file), path: file.name } : buyer.documents } : buyer
      ));

      setIsEditDialogOpen(false);
      setFile(null); // Clear file input after edit
      toast({
        title: "Buyer updated",
        description: `${formData.name} has been updated successfully.`,
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error updating buyer:", error);
      toast({
        title: "Error updating buyer",
        description: `Failed to update buyer: ${error.message}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDeleteBuyer = async () => {
    if (!currentBuyer) return;

    try {
      // If you implement a delete service:
      await scrapBuyersService.delete(currentBuyer.id);

      setScrapBuyers(scrapBuyers.filter(buyer => buyer.id !== currentBuyer.id));
      setIsDeleteDialogOpen(false);
      toast({
        title: "Buyer deleted",
        description: `${currentBuyer.name} has been deleted successfully.`,
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error deleting buyer:", error);
      toast({
        title: "Error deleting buyer",
        description: `Failed to delete buyer: ${error.message}`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const openEditDialog = (buyer: ScrapBuyer) => {
    setCurrentBuyer(buyer);
    setFormData({
      name: buyer.name,
      company: buyer.company || '', // Handle potential undefined company
      contact: buyer.contact,
      designation: buyer.designation,
      scrapTypes: buyer.scrapTypes,
      description: buyer.description,
      approvedBy: buyer.approvedBy,
      quantity: buyer.quantity,
      rate: buyer.rate,
    });
    setFile(null); // Clear any previously selected file for edit
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (buyer: ScrapBuyer) => {
    setCurrentBuyer(buyer);
    setIsDeleteDialogOpen(true);
  };

  const openViewDialog = (buyer: ScrapBuyer) => {
    setCurrentBuyer(buyer);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scrap Buyers</h1>
        <p className="text-muted-foreground">
          Manage your scrap buyers and their preferences
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Scrap Buyers List</CardTitle>
            <CardDescription>
              All registered scrap buyers and recyclers
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search buyers..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Buyer
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Scrap Buyer</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new scrap buyer.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
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
                      name="company" // Changed from companyName
                      value={formData.company}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="contact" className="text-right">
                      Contact Number
                    </Label>
                    <Input
                      id="contact"
                      name="contact" // Changed from contactNumber
                      value={formData.contact}
                      onChange={handleInputChange}
                      className="col-span-3"
                      maxLength={10} // Ensure 10 digits
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="designation" className="text-right">
                      Designation
                    </Label>
                    <Select
                      onValueChange={handleSelectChange}
                      defaultValue={formData.designation}
                      value={formData.designation} // Ensure controlled component
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        {designationOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="scrapTypes" className="text-right">
                      Scrap Types
                    </Label>
                    <Input
                      id="scrapTypes"
                      name="scrapTypes" // Changed from preferredProducts
                      value={formData.scrapTypes}
                      onChange={handleInputChange}
                      placeholder="E.g., Metal, Paper, Plastic"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description" // Changed from companyDetails
                      value={formData.description}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="e.g., Small recycling plant in South Delhi, Individual collector..."
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
                      className="col-span-3"
                      placeholder="e.g., 100 kg, 5 tons"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="rate" className="text-right">
                      Rate
                    </Label>
                    <Input
                      id="rate"
                      name="rate"
                      value={formData.rate}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="e.g., 10 INR/kg, 200 USD/ton"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="approvedBy" className="text-right">
                      Approved By
                    </Label>
                    <Input
                      id="approvedBy"
                      name="approvedBy"
                      value={formData.approvedBy}
                      onChange={handleInputChange}
                      className="col-span-3"
                      placeholder="e.g., Admin Name"
                    />
                  </div>
                  {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="document" className="text-right">
                      Document
                    </Label>
                    <Input
                      id="document"
                      name="document"
                      type="file"
                      onChange={handleFileChange}
                      className="col-span-3"
                    />
                  </div> */}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddBuyer}>
                    Add Buyer
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
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Scrap Types</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuyers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No buyers found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBuyers.map(buyer => (
                  <TableRow key={buyer.id}>
                    <TableCell className="font-medium">{buyer.name}</TableCell>
                    <TableCell>{buyer.company || "-"}</TableCell>
                    <TableCell>{buyer.contact}</TableCell>
                    <TableCell className="capitalize">{buyer.designation}</TableCell>
                    <TableCell>{buyer.scrapTypes}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openViewDialog(buyer)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(buyer)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => openDeleteDialog(buyer)}
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
            <DialogTitle>Buyer Details</DialogTitle>
          </DialogHeader>
          {currentBuyer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Name:</p>
                <p className="col-span-2">{currentBuyer.name}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Company Name:</p>
                <p className="col-span-2">{currentBuyer.company || "-"}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Contact Number:</p>
                <p className="col-span-2">{currentBuyer.contact}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Designation:</p>
                <p className="col-span-2 capitalize">{currentBuyer.designation}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Scrap Types:</p>
                <p className="col-span-2">{currentBuyer.scrapTypes}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Description:</p>
                <p className="col-span-2">{currentBuyer.description || "-"}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Quantity:</p>
                <p className="col-span-2">{currentBuyer.quantity}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Rate:</p>
                <p className="col-span-2">{currentBuyer.rate}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Approved By:</p>
                <p className="col-span-2">{currentBuyer.approvedBy}</p>
              </div>
              {/* <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-right font-medium">Document:</p>
                <p className="col-span-2">
                  {currentBuyer.documents?.url ? (
                    <a href={currentBuyer.documents.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Document
                    </a>
                  ) : (
                    "-"
                  )}
                </p>
              </div> */}
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
            <DialogTitle>Edit Buyer</DialogTitle>
            <DialogDescription>
              Update the buyer details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-company" className="text-right">
                Company Name
              </Label>
              <Input
                id="edit-company"
                name="company" // Changed from companyName
                value={formData.company}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Optional"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-contact" className="text-right">
                Contact Number
              </Label>
              <Input
                id="edit-contact"
                name="contact" // Changed from contactNumber
                value={formData.contact}
                onChange={handleInputChange}
                className="col-span-3"
                maxLength={10} // Ensure 10 digits
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-designation" className="text-right">
                Designation
              </Label>
              <Select
                onValueChange={handleSelectChange}
                defaultValue={formData.designation}
                value={formData.designation} // Ensure controlled component
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  {designationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-scrapTypes" className="text-right">
                Scrap Types
              </Label>
              <Input
                id="edit-scrapTypes"
                name="scrapTypes" // Changed from preferredProducts
                value={formData.scrapTypes}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                name="description" // Changed from companyDetails
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
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
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-rate" className="text-right">
                Rate
              </Label>
              <Input
                id="edit-rate"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-approvedBy" className="text-right">
                Approved By
              </Label>
              <Input
                id="edit-approvedBy"
                name="approvedBy"
                value={formData.approvedBy}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {/* <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-document" className="text-right">
                Document
              </Label>
              <Input
                id="edit-document"
                name="document"
                type="file"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBuyer}>
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
              Are you sure you want to delete {currentBuyer?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteBuyer}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrapBuyers;