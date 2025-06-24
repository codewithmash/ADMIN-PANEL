

// import { useEffect, useState } from 'react';
// import { Button } from "@/components/ui/button";
// import {
//   Card, CardContent, CardDescription, CardHeader, CardTitle
// } from "@/components/ui/card";
// import {
//   Dialog, DialogContent, DialogDescription, DialogFooter,
//   DialogHeader, DialogTitle, DialogTrigger
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Table, TableBody, TableCell, TableHead, TableHeader, TableRow
// } from "@/components/ui/table";
// import { useToast } from "@/components/ui/use-toast";
// import { Textarea } from "@/components/ui/textarea";
// import { Pencil, Trash2, Plus, Search } from "lucide-react";
// import { scrapTypesService } from '@/services/scrapTypesService';

// interface ScrapType {
//   id: string; // Changed to string to match custom ID from backend
//   name: string;
//   description: string;
//   ratePerKg: string; // stored as string like "10 kg"
//   category: string; // New field
//   scrapImage?: string; // New optional field for image URL
//   docid?: string; // Assuming this is used for backend document ID for update/delete
// }

// const ScrapTypes = () => {
//   const [scrapTypes, setScrapTypes] = useState<ScrapType[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [currentScrapType, setCurrentScrapType] = useState<ScrapType | null>(null);
//   const [formData, setFormData] = useState<{
//     name: string;
//     description: string;
//     ratePerKg: number;
//     category: string; // New field
//     scrapImage: File | null; // For image file upload
//   }>({ name: '', description: '', ratePerKg: 0, category: '', scrapImage: null });

//   const { toast } = useToast();

//   useEffect(() => {
//     fetchScrapTypes();
//   }, []);

//   const fetchScrapTypes = async () => {
//     try {
//       const data = await scrapTypesService.getAll();
//       console.log("data",data)
//       setScrapTypes(data);
//     } catch (error) {
//       toast({
//         title: "Error fetching scrap types",
//         description: "Please try again later.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'ratePerKg' ? parseFloat(value) || 0 : value
//     }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData(prev => ({
//         ...prev,
//         scrapImage: e.target.files![0]
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         scrapImage: null
//       }));
//     }
//   };

//   const handleAddScrapType = async () => {
//     try {
//       const formToSend = new FormData();
//       formToSend.append('name', formData.name);
//       formToSend.append('description', formData.description);
//       formToSend.append('ratePerKg', formData.ratePerKg.toString());
//       formToSend.append('category', formData.category);
//       if (formData.scrapImage) {
//         formToSend.append('scrapImage', formData.scrapImage);
//       }

//       // Assuming your scrapTypesService.create method can handle FormData
//       await scrapTypesService.create(formToSend);

//       await fetchScrapTypes();
//       setFormData({ name: '', description: '', ratePerKg: 0, category: '', scrapImage: null });
//       setIsAddDialogOpen(false);
//       toast({ title: "Scrap type added", description: `${formData.name} has been added successfully.` });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to add scrap type", variant: "destructive" });
//     }
//   };

//   const handleEditScrapType = async () => {
//     if (!currentScrapType) return;
//     try {
//       const formToSend = new FormData();
//       formToSend.append('name', formData.name);
//       formToSend.append('description', formData.description);
//       formToSend.append('ratePerKg', formData.ratePerKg.toString());
//       formToSend.append('category', formData.category); // Include category in edit as well
//       if (formData.scrapImage) {
//         formToSend.append('scrapImage', formData.scrapImage);
//       }

//       await scrapTypesService.update(currentScrapType.docid!, formToSend);
//       await fetchScrapTypes();
//       setIsEditDialogOpen(false);
//       toast({ title: "Scrap type updated", description: `${formData.name} has been updated successfully.` });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to update scrap type", variant: "destructive" });
//     }
//   };

//   const handleDeleteScrapType = async () => {
//     if (!currentScrapType) return;
//     try {
//       await scrapTypesService.delete(currentScrapType.docid!);
//       await fetchScrapTypes();
//       setIsDeleteDialogOpen(false);
//       toast({ title: "Scrap type deleted", description: `${currentScrapType.name} has been deleted successfully.` });
//     } catch (error) {
//       toast({ title: "Error", description: "Failed to delete scrap type", variant: "destructive" });
//     }
//   };

//   const openEditDialog = (scrapType: ScrapType) => {
//     const numericRate = parseFloat(scrapType.ratePerKg.replace(' kg', ''));
//     setCurrentScrapType(scrapType);
//     setFormData({
//       name: scrapType.name,
//       description: scrapType.description,
//       ratePerKg: isNaN(numericRate) ? 0 : numericRate,
//       category: scrapType.category, // Set category when opening edit dialog
//       scrapImage: null // Clear image input on edit open, user can re-upload if needed
//     });
//     setIsEditDialogOpen(true);
//   };

//   const openDeleteDialog = (scrapType: ScrapType) => {
//     setCurrentScrapType(scrapType);
//     setIsDeleteDialogOpen(true);
//   };

//   const filteredScrapTypes = scrapTypes.filter(type =>
//     type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     type.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 space-y-6">
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Scrap Types</CardTitle>
//             <CardDescription>Manage the types of scrap materials.</CardDescription>
//           </div>
//           <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
//             <DialogTrigger asChild>
//               <Button>
//                 <Plus className="mr-2 h-4 w-4" />
//                 Add Scrap Type
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add Scrap Type</DialogTitle>
//                 <DialogDescription>Enter details for the new scrap type.</DialogDescription>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Name</Label>
//                   <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <Label htmlFor="description">Description</Label>
//                   <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <Label htmlFor="ratePerKg">Rate per Kg</Label>
//                   <Input id="ratePerKg" name="ratePerKg" type="number" value={formData.ratePerKg} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <Label htmlFor="category">Category</Label>
//                   <Input id="category" name="category" value={formData.category} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                   <Label htmlFor="scrapImage">Scrap Image</Label>
//                   <Input id="scrapImage" name="scrapImage" type="file" onChange={handleFileChange} accept="image/*" />
//                 </div>
//               </div>
//               <DialogFooter>
//                 <Button onClick={handleAddScrapType}>Save</Button>
//               </DialogFooter>
//             </DialogContent>
//           </Dialog>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-4 flex items-center space-x-2">
//             <Search className="w-5 h-5 text-gray-500" />
//             <Input
//               placeholder="Search scrap types..."
//               value={searchTerm}
//               onChange={e => setSearchTerm(e.target.value)}
//               className="max-w-sm"
//             />
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Name</TableHead>
//                 <TableHead>Description</TableHead>
//                 <TableHead>Rate</TableHead>
//                 <TableHead>Category</TableHead> {/* New TableHead */}
//                 <TableHead>Image</TableHead> {/* New TableHead */}
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredScrapTypes.map(scrapType => (
//                 <TableRow key={scrapType.id}>
//                   <TableCell>{scrapType.name}</TableCell>
//                   <TableCell>{scrapType.description}</TableCell>
//                   <TableCell>{scrapType.ratePerKg}</TableCell>
//                   <TableCell>{scrapType.category}</TableCell> {/* Display category */}
//                   <TableCell>
//                     {scrapType.scrapImage && (
//                       <img src={scrapType.scrapImage} alt={scrapType.name} className="w-12 h-12 object-cover rounded" />
//                     )}
//                   </TableCell>
//                   <TableCell className="space-x-2" style={{display:"flex"}}>
//                     <Button size="sm" variant="outline" onClick={() => openEditDialog(scrapType)}>
//                       <Pencil className="w-4 h-4 mr-1" />
//                     </Button>
//                     <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(scrapType)}>
//                       <Trash2 className="w-4 h-4 mr-1" />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Edit Dialog */}
//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Scrap Type</DialogTitle>
//             <DialogDescription>Modify the details of this scrap type.</DialogDescription>
//           </DialogHeader>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="editName">Name</Label>
//               <Input id="editName" name="name" value={formData.name} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="editDescription">Description</Label>
//               <Textarea id="editDescription" name="description" value={formData.description} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="editRatePerKg">Rate per Kg</Label>
//               <Input id="editRatePerKg" name="ratePerKg" type="number" value={formData.ratePerKg} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="editCategory">Category</Label>
//               <Input id="editCategory" name="category" value={formData.category} onChange={handleInputChange} />
//             </div>
//             <div>
//               <Label htmlFor="editScrapImage">Scrap Image (Upload new to replace)</Label>
//               <Input id="editScrapImage" name="scrapImage" type="file" onChange={handleFileChange} accept="image/*" />
//               {currentScrapType?.scrapImage && !formData.scrapImage && (
//                 <p className="text-sm text-gray-500 mt-1">Current Image: <a href={currentScrapType.scrapImage} target="_blank" rel="noopener noreferrer">View</a></p>
//               )}
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={handleEditScrapType}>Update</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete Dialog */}
//       <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Scrap Type</DialogTitle>
//             <DialogDescription>
//               Are you sure you want to delete "{currentScrapType?.name}"? This action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
//             <Button variant="destructive" onClick={handleDeleteScrapType}>Delete</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ScrapTypes;



import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { scrapTypesService } from '@/services/scrapTypesService';

interface ScrapType {
  id: string; // Changed to string to match custom ID from backend
  name: string;
  description: string;
  ratePerKg: string; // stored as string like "10 kg"
  category: string; // New field
  unit: string; // Add unit field
  scrapImage?: string; // New optional field for image URL
  docid?: string; // Assuming this is used for backend document ID for update/delete
}

const ScrapTypes = () => {
  const [scrapTypes, setScrapTypes] = useState<ScrapType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentScrapType, setCurrentScrapType] = useState<ScrapType | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    ratePerKg: number;
    category: string; // New field
    unit: string; // Add unit to formData
    scrapImage: File | null; // For image file upload
  }>({ name: '', description: '', ratePerKg: 0, category: '', unit: '', scrapImage: null });

  const { toast } = useToast();

  useEffect(() => {
    fetchScrapTypes();
  }, []);

  const fetchScrapTypes = async () => {
    try {
      const data = await scrapTypesService.getAll();
      console.log("data",data)
      setScrapTypes(data);
    } catch (error) {
      toast({
        title: "Error fetching scrap types",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ratePerKg' ? parseFloat(value) || 0 : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        scrapImage: e.target.files![0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        scrapImage: null
      }));
    }
  };

  const handleAddScrapType = async () => {
    try {
      const formToSend = new FormData();
      formToSend.append('name', formData.name);
      formToSend.append('description', formData.description);
      formToSend.append('ratePerKg', formData.ratePerKg.toString());
      formToSend.append('category', formData.category);
      formToSend.append('unit', formData.unit); // Append unit
      if (formData.scrapImage) {
        formToSend.append('scrapImage', formData.scrapImage);
      }

      await scrapTypesService.create(formToSend);

      await fetchScrapTypes();
      setFormData({ name: '', description: '', ratePerKg: 0, category: '', unit: '', scrapImage: null }); // Reset unit
      setIsAddDialogOpen(false);
      toast({ title: "Scrap type added", description: `${formData.name} has been added successfully.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add scrap type", variant: "destructive" });
    }
  };

  const handleEditScrapType = async () => {
    if (!currentScrapType) return;
    try {
      const formToSend = new FormData();
      formToSend.append('name', formData.name);
      formToSend.append('description', formData.description);
      formToSend.append('ratePerKg', formData.ratePerKg.toString());
      formToSend.append('category', formData.category);
      formToSend.append('unit', formData.unit); // Append unit for edit as well
      if (formData.scrapImage) {
        formToSend.append('scrapImage', formData.scrapImage);
      }

      await scrapTypesService.update(currentScrapType.docid!, formToSend);
      await fetchScrapTypes();
      setIsEditDialogOpen(false);
      toast({ title: "Scrap type updated", description: `${formData.name} has been updated successfully.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update scrap type", variant: "destructive" });
    }
  };

  const handleDeleteScrapType = async () => {
    if (!currentScrapType) return;
    try {
      await scrapTypesService.delete(currentScrapType.docid!);
      await fetchScrapTypes();
      setIsDeleteDialogOpen(false);
      toast({ title: "Scrap type deleted", description: `${currentScrapType.name} has been deleted successfully.` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete scrap type", variant: "destructive" });
    }
  };

  const openEditDialog = (scrapType: ScrapType) => {
    const numericRate = parseFloat(scrapType.ratePerKg.replace(' kg', ''));
    setCurrentScrapType(scrapType);
    setFormData({
      name: scrapType.name,
      description: scrapType.description,
      ratePerKg: isNaN(numericRate) ? 0 : numericRate,
      category: scrapType.category,
      unit: scrapType.unit, // Set unit when opening edit dialog
      scrapImage: null // Clear image input on edit open, user can re-upload if needed
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (scrapType: ScrapType) => {
    setCurrentScrapType(scrapType);
    setIsDeleteDialogOpen(true);
  };

  const filteredScrapTypes = scrapTypes.filter(type =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    type.unit.toLowerCase().includes(searchTerm.toLowerCase()) // Include unit in search
  );

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Scrap Types</CardTitle>
            <CardDescription>Manage the types of scrap materials.</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Scrap Type
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Scrap Type</DialogTitle>
                <DialogDescription>Enter details for the new scrap type.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="ratePerKg">Rate</Label>
                  <Input id="ratePerKg" name="ratePerKg" type="number" value={formData.ratePerKg} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" name="category" value={formData.category} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label> {/* New input for unit */}
                  <Input id="unit" name="unit" value={formData.unit} onChange={handleInputChange} />
                </div>
                <div>
                  <Label htmlFor="scrapImage">Scrap Image</Label>
                  <Input id="scrapImage" name="scrapImage" type="file" onChange={handleFileChange} accept="image/*" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddScrapType}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search scrap types..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Unit</TableHead> {/* New TableHead for Unit */}
                <TableHead>Image</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredScrapTypes.map(scrapType => (
                <TableRow key={scrapType.id}>
                  <TableCell>{scrapType.name}</TableCell>
                  <TableCell>{scrapType.description}</TableCell>
                  <TableCell>{scrapType.ratePerKg}</TableCell>
                  <TableCell>{scrapType.category}</TableCell>
                  <TableCell>{scrapType.unit}</TableCell> {/* Display unit */}
                  <TableCell>
                    {scrapType.scrapImage && (
                      <img src={scrapType.scrapImage} alt={scrapType.name} className="w-12 h-12 object-cover rounded" />
                    )}
                  </TableCell>
                  <TableCell className="space-x-2" style={{display:"flex"}}>
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(scrapType)}>
                      <Pencil className="w-4 h-4 mr-1" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(scrapType)}>
                      <Trash2 className="w-4 h-4 mr-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Scrap Type</DialogTitle>
            <DialogDescription>Modify the details of this scrap type.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="editName">Name</Label>
              <Input id="editName" name="name" value={formData.name} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="editDescription">Description</Label>
              <Textarea id="editDescription" name="description" value={formData.description} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="editRatePerKg">Rate</Label>
              <Input id="editRatePerKg" name="ratePerKg" type="number" value={formData.ratePerKg} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="editCategory">Category</Label>
              <Input id="editCategory" name="category" value={formData.category} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="editUnit">Unit</Label> {/* New input for unit in edit dialog */}
              <Input id="editUnit" name="unit" value={formData.unit} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="editScrapImage">Scrap Image (Upload new to replace)</Label>
              <Input id="editScrapImage" name="scrapImage" type="file" onChange={handleFileChange} accept="image/*" />
              {currentScrapType?.scrapImage && !formData.scrapImage && (
                <p className="text-sm text-gray-500 mt-1">Current Image: <a href={currentScrapType.scrapImage} target="_blank" rel="noopener noreferrer">View</a></p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditScrapType}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Scrap Type</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentScrapType?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteScrapType}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrapTypes;