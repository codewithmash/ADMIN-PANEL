// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { storesService } from '@/services/storeServices';
// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Edit, Trash2, Plus, Check, X } from 'lucide-react';
// import { useToast } from '@/components/ui/use-toast';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

// // Define the Store interface based on your backend response
// interface Store {
//   id: string;
//   store_name: string;
//   store_address: string;
//   location: [number, number]; // [latitude, longitude]
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// // --- AddStoreDialog Component ---
// interface AddStoreDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// const AddStoreDialog: React.FC<AddStoreDialogProps> = ({ isOpen, onClose, onSuccess }) => {
//   const [storeName, setStoreName] = useState('');
//   const [storeAddress, setStoreAddress] = useState('');
//   const [latitude, setLatitude] = useState('');
//   const [longitude, setLongitude] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await storesService.create({
//         store_name: storeName,
//         store_address: storeAddress,
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//       });
//       toast({
//         title: "Store added",
//         description: "The new store has been added successfully.",
//       });
//       onSuccess();
//       onClose();
//       // Reset form fields
//       setStoreName('');
//       setStoreAddress('');
//       setLatitude('');
//       setLongitude('');
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: `Failed to add store: ${(err as Error).message}`,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add New Store</DialogTitle>
//           <DialogDescription>
//             Enter the details for the new store.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="storeName" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="storeName"
//                 value={storeName}
//                 onChange={(e) => setStoreName(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="storeAddress" className="text-right">
//                 Address
//               </Label>
//               <Input
//                 id="storeAddress"
//                 value={storeAddress}
//                 onChange={(e) => setStoreAddress(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="latitude" className="text-right">
//                 Latitude
//               </Label>
//               <Input
//                 id="latitude"
//                 type="number"
//                 step="any"
//                 value={latitude}
//                 onChange={(e) => setLatitude(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="longitude" className="text-right">
//                 Longitude
//               </Label>
//               <Input
//                 id="longitude"
//                 type="number"
//                 step="any"
//                 value={longitude}
//                 onChange={(e) => setLongitude(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? 'Adding...' : 'Add Store'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // --- EditStoreDialog Component ---
// interface EditStoreDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
//   store: Store; // The store data to be edited
// }

// const EditStoreDialog: React.FC<EditStoreDialogProps> = ({ isOpen, onClose, onSuccess, store }) => {
//   const [storeName, setStoreName] = useState(store.store_name);
//   const [storeAddress, setStoreAddress] = useState(store.store_address);
//   const [latitude, setLatitude] = useState(store.location[0].toString());
//   const [longitude, setLongitude] = useState(store.location[1].toString());
//   const [isLoading, setIsLoading] = useState(false);
//   const { toast } = useToast();

//   // Reset state when the dialog is opened with a new store or updated store
//   // This is crucial if the same dialog instance is reused for different stores
//   React.useEffect(() => {
//     if (isOpen && store) {
//       setStoreName(store.store_name);
//       setStoreAddress(store.store_address);
//       setLatitude(store.location[0].toString());
//       setLongitude(store.location[1].toString());
//     }
//   }, [isOpen, store]);


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       await storesService.update(store.id, {
//         store_name: storeName,
//         store_address: storeAddress,
//         latitude: parseFloat(latitude),
//         longitude: parseFloat(longitude),
//       });
//       toast({
//         title: "Store updated",
//         description: "The store details have been updated successfully.",
//       });
//       onSuccess();
//       onClose();
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: `Failed to update store: ${(err as Error).message}`,
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit Store</DialogTitle>
//           <DialogDescription>
//             Make changes to the store details here. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="editStoreName" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="editStoreName"
//                 value={storeName}
//                 onChange={(e) => setStoreName(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="editStoreAddress" className="text-right">
//                 Address
//               </Label>
//               <Input
//                 id="editStoreAddress"
//                 value={storeAddress}
//                 onChange={(e) => setStoreAddress(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="editLatitude" className="text-right">
//                 Latitude
//               </Label>
//               <Input
//                 id="editLatitude"
//                 type="number"
//                 step="any"
//                 value={latitude}
//                 onChange={(e) => setLatitude(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="editLongitude" className="text-right">
//                 Longitude
//               </Label>
//               <Input
//                 id="editLongitude"
//                 type="number"
//                 step="any"
//                 value={longitude}
//                 onChange={(e) => setLongitude(e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? 'Saving...' : 'Save Changes'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// // --- Main Stores Component (unchanged from your provided code) ---
// const Stores = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
//   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
//   const [selectedStore, setSelectedStore] = useState<Store | null>(null);
//   const { toast } = useToast();

//   const { data: stores = [], isLoading, error, refetch } = useQuery<Store[]>({
//     queryKey: ['stores'],
//     queryFn: async () => {
//       const response = await storesService.getAll();
//       return response.stores as Store[];
//     },
//   });

//   const handleStatusToggle = async (id: string, currentStatus: boolean) => {
//     try {
//       const response = await storesService.toggleStatus(id);
//       toast({
//         title: "Status updated",
//         description: `Store status updated to ${response.isActive ? 'active' : 'inactive'}`,
//       });
//       refetch();
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: `Failed to update store status: ${(err as Error).message}`,
//         variant: "destructive",
//       });
//     }
//   };

//   const handleEditStore = (store: Store) => {
//     setSelectedStore(store);
//     setIsEditDialogOpen(true);
//   };

//   const handleDeleteClick = (store: Store) => {
//     setSelectedStore(store);
//     setIsDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!selectedStore?.id) return;
//     try {
//       await storesService.delete(selectedStore.id);
//       toast({
//         title: "Store deleted",
//         description: "The store has been deleted successfully",
//       });
//       setIsDeleteDialogOpen(false);
//       refetch();
//     } catch (err) {
//       toast({
//         title: "Error",
//         description: `Failed to delete store: ${(err as Error).message}`,
//         variant: "destructive",
//       });
//     }
//   };

//   const filteredStores = stores.filter(store =>
//     (store.store_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//     (store.store_address ?? '').toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (error) {
//     return (
//       <div className="p-4">
//         <p className="text-red-500">Error loading stores: {(error as Error).message}</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Card className="mb-8">
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle>Stores Management</CardTitle>
//           <Button onClick={() => setIsAddDialogOpen(true)}>
//             <Plus className="mr-2 h-4 w-4" />
//             Add New Store
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <div className="mb-4">
//             <Input
//               placeholder="Search stores..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="max-w-sm"
//             />
//           </div>

//           {isLoading ? (
//             <div className="flex justify-center p-8">
//               <p>Loading stores...</p>
//             </div>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Address</TableHead>
//                   <TableHead>Latitude</TableHead>
//                   <TableHead>Longitude</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="w-[120px]">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredStores.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center">
//                       No stores found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredStores.map((store) => (
//                     <TableRow key={store.id}>
//                       <TableCell>{store.store_name || '—'}</TableCell>
//                       <TableCell>
//                         {store.store_address ? (
//                           <code className="text-xs">{store.store_address}</code>
//                         ) : (
//                           '—'
//                         )}
//                       </TableCell>
//                       <TableCell>{store.location?.[0] ?? '—'}</TableCell>
//                       <TableCell>{store.location?.[1] ?? '—'}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant={store.isActive ? "default" : "outline"}
//                           size="sm"
//                           onClick={() => store.id && handleStatusToggle(store.id, store.isActive)}
//                           className={store.isActive ? "bg-green-500 hover:bg-green-600" : "text-red-500"}
//                         >
//                           {store.isActive ? (
//                             <><Check className="mr-1 h-4 w-4" /> Active</>
//                           ) : (
//                             <><X className="mr-1 h-4 w-4" /> Inactive</>
//                           )}
//                         </Button>
//                       </TableCell>
//                       <TableCell className="flex space-x-2">
//                         <Button variant="ghost" size="sm" onClick={() => handleEditStore(store)}>
//                           <Edit className="h-4 w-4" />
//                         </Button>
//                         <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(store)}>
//                           <Trash2 className="h-4 w-4 text-red-500" />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       <AddStoreDialog
//         isOpen={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         onSuccess={() => {
//           refetch();
//           setIsAddDialogOpen(false);
//         }}
//       />

//       {selectedStore && (
//         <EditStoreDialog
//           isOpen={isEditDialogOpen}
//           onClose={() => setIsEditDialogOpen(false)}
//           store={selectedStore}
//           onSuccess={() => {
//             refetch();
//             setIsEditDialogOpen(false);
//           }}
//         />
//       )}

//       <DeleteConfirmDialog
//         isOpen={isDeleteDialogOpen}
//         onClose={() => setIsDeleteDialogOpen(false)}
//         onConfirm={handleDeleteConfirm}
//         title="Delete Store"
//         description="Are you sure you want to delete this store? This action cannot be undone."
//       />
//     </>
//   );
// };

// export default Stores;



// import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { storesService } from '@/services/storeServices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Assuming you have a DeleteConfirmDialog component.
// If not, you'll need to create it or remove its usage.
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({ isOpen, onClose, onConfirm, title, description }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


// Define the GeoPoint interface to match Firestore's GeoPoint object structure
// Now uses _latitude and _longitude as per your backend data
interface GeoPoint {
  _latitude: number;
  _longitude: number;
}

// Define a simple interface for Firestore Timestamp objects
interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds: number;
}

// Define the Store interface based on your backend response
interface Store {
  id: string;
  store_name: string;
  store_address: string;
  location?: GeoPoint; // Made optional to handle cases where it might be missing or null
  isActive: boolean;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

// Helper function to convert Firestore Timestamp to Date object (optional, but good practice)
const convertFirestoreTimestampToDate = (timestamp: FirestoreTimestamp): Date => {
  return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);
};

// --- AddStoreDialog Component ---
interface AddStoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddStoreDialog: React.FC<AddStoreDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Basic validation for latitude and longitude
      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);

      if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
        toast({
          title: "Validation Error",
          description: "Latitude and Longitude must be valid numbers.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      await storesService.create({
        store_name: storeName,
        store_address: storeAddress,
        latitude: parsedLatitude, // Send as numbers to the backend
        longitude: parsedLongitude, // Send as numbers to the backend
      });
      toast({
        title: "Store added",
        description: "The new store has been added successfully.",
      });
      onSuccess();
      onClose();
      // Reset form fields
      setStoreName('');
      setStoreAddress('');
      setLatitude('');
      setLongitude('');
    } catch (err) {
      toast({
        title: "Error",
        description: `Failed to add store: ${(err as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Store</DialogTitle>
          <DialogDescription>
            Enter the details for the new store.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="storeName" className="text-right">
                Name
              </Label>
              <Input
                id="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="storeAddress" className="text-right">
                Address
              </Label>
              <Input
                id="storeAddress"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
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
                required
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
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Store'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- EditStoreDialog Component ---
interface EditStoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  store: Store; // The store data to be edited
}

const EditStoreDialog: React.FC<EditStoreDialogProps> = ({ isOpen, onClose, onSuccess, store }) => {
  // Initialize states with defensive checks
  const [storeName, setStoreName] = useState(store.store_name || '');
  const [storeAddress, setStoreAddress] = useState(store.store_address || '');
  // Safely access _latitude and _longitude, providing empty string fallback
  const [latitude, setLatitude] = useState(store.location?._latitude?.toString() || '');
  const [longitude, setLongitude] = useState(store.location?._longitude?.toString() || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Reset state when the dialog is opened with a new store or updated store
  useEffect(() => {
    if (isOpen && store) {
      setStoreName(store.store_name || '');
      setStoreAddress(store.store_address || '');
      // Safely set latitude and longitude from the updated store prop
      setLatitude(store.location?._latitude?.toString() || '');
      setLongitude(store.location?._longitude?.toString() || '');
    }
  }, [isOpen, store]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Basic validation for latitude and longitude
      const parsedLatitude = parseFloat(latitude);
      const parsedLongitude = parseFloat(longitude);

      if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
        toast({
          title: "Validation Error",
          description: "Latitude and Longitude must be valid numbers.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      await storesService.update(store.id, {
        store_name: storeName,
        store_address: storeAddress,
        latitude: parsedLatitude, // Send as numbers to the backend
        longitude: parsedLongitude, // Send as numbers to the backend
      });
      toast({
        title: "Store updated",
        description: "The store details have been updated successfully.",
      });
      onSuccess();
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: `Failed to update store: ${(err as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Store</DialogTitle>
          <DialogDescription>
            Make changes to the store details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editStoreName" className="text-right">
                Name
              </Label>
              <Input
                id="editStoreName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editStoreAddress" className="text-right">
                Address
              </Label>
              <Input
                id="editStoreAddress"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editLatitude" className="text-right">
                Latitude
              </Label>
              <Input
                id="editLatitude"
                type="number"
                step="any"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editLongitude" className="text-right">
                Longitude
              </Label>
              <Input
                id="editLongitude"
                type="number"
                step="any"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// --- Main Stores Component ---
const Stores = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const { toast } = useToast();

  const { data: stores = [], isLoading, error, refetch } = useQuery<Store[]>({
    queryKey: ['stores'],
    queryFn: async () => {
      const response = await storesService.getAll();
      // Ensure that the 'stores' array contains objects conforming to the Store interface
      // The location will be GeoPoint objects from Firestore
      return response.stores as Store[];
    },
  });

  const handleStatusToggle = async (id: string, currentStatus: boolean) => {
    try {
      const response = await storesService.toggleStatus(id);
      toast({
        title: "Status updated",
        description: `Store status updated to ${response.isActive ? 'active' : 'inactive'}`,
      });
      refetch();
    } catch (err) {
      toast({
        title: "Error",
        description: `Failed to update store status: ${(err as Error).message}`,
        variant: "destructive",
      });
    }
  };

  const handleEditStore = (store: Store) => {
    setSelectedStore(store);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (store: Store) => {
    setSelectedStore(store);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedStore?.id) return;
    try {
      await storesService.delete(selectedStore.id);
      toast({
        title: "Store deleted",
        description: "The store has been deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      refetch();
    } catch (err) {
      toast({
        title: "Error",
        description: `Failed to delete store: ${(err as Error).message}`,
        variant: "destructive",
      });
    }
  };

  const filteredStores = stores.filter(store =>
    (store.store_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (store.store_address ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading stores: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stores Management</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Store
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading stores...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Latitude</TableHead>
                  <TableHead>Longitude</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No stores found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStores.map((store) => (
                    <TableRow key={store.id}>
                      <TableCell>{store.store_name || '—'}</TableCell>
                      <TableCell>
                        {store.store_address ? (
                          <code className="text-xs">{store.store_address}</code>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      {/* Access _latitude and _longitude from the GeoPoint object with optional chaining */}
                      <TableCell>{store.location?._latitude ?? '—'}</TableCell>
                      <TableCell>{store.location?._longitude ?? '—'}</TableCell>
                      <TableCell>
                        <Button
                          variant={store.isActive ? "default" : "outline"}
                          size="sm"
                          onClick={() => store.id && handleStatusToggle(store.id, store.isActive)}
                          className={store.isActive ? "bg-green-500 hover:bg-green-600" : "text-red-500"}
                        >
                          {store.isActive ? (
                            <><Check className="mr-1 h-4 w-4" /> Active</>
                          ) : (
                            <><X className="mr-1 h-4 w-4" /> Inactive</>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditStore(store)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(store)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AddStoreDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={() => {
          refetch();
          setIsAddDialogOpen(false);
        }}
      />

      {selectedStore && ( // Only render Edit dialog if a store is selected
        <EditStoreDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          store={selectedStore}
          onSuccess={() => {
            refetch();
            setIsEditDialogOpen(false);
          }}
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Store"
        description="Are you sure you want to delete this store? This action cannot be undone."
      />
    </>
  );
};

export default Stores;