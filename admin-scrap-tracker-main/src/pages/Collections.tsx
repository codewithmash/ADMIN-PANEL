
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarIcon, Pencil, Trash2, Plus, Search, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

// Mock data
const initialCollections = [
  { 
    id: 1, 
    date: new Date(2023, 5, 15), 
    customerName: "Jane Cooper", 
    scrapType: "Metal", 
    weight: 45.5, 
    amount: 182.0, 
    status: "Completed" 
  },
  { 
    id: 2, 
    date: new Date(2023, 5, 16), 
    customerName: "Wade Warren", 
    scrapType: "Paper", 
    weight: 23.2, 
    amount: 69.6, 
    status: "Completed" 
  },
  { 
    id: 3, 
    date: new Date(2023, 5, 17), 
    customerName: "Esther Howard", 
    scrapType: "E-waste", 
    weight: 15.8, 
    amount: 142.2, 
    status: "Pending" 
  },
  { 
    id: 4, 
    date: new Date(2023, 5, 18), 
    customerName: "Cameron Williamson", 
    scrapType: "Plastic", 
    weight: 18.5, 
    amount: 37.0, 
    status: "Completed" 
  },
  { 
    id: 5, 
    date: new Date(2023, 5, 19), 
    customerName: "Brooklyn Simmons", 
    scrapType: "Glass", 
    weight: 12.3, 
    amount: 24.6, 
    status: "Processing" 
  },
];

interface Collection {
  id: number;
  date: Date;
  customerName: string;
  scrapType: string;
  weight: number;
  amount: number;
  status: string;
}

const scrapTypes = ["Metal", "Paper", "Plastic", "E-waste", "Glass"];
const statusOptions = ["Pending", "Processing", "Completed", "Cancelled"];

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(null);
  const [formData, setFormData] = useState<Omit<Collection, 'id'>>({
    date: new Date(),
    customerName: '',
    scrapType: 'Metal',
    weight: 0,
    amount: 0,
    status: 'Pending',
  });
  
  const { toast } = useToast();

  const filteredCollections = collections.filter(collection => {
    // Apply text search
    const matchesSearch = collection.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.scrapType.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = !statusFilter || collection.status === statusFilter;
    
    // Apply type filter
    const matchesType = !typeFilter || collection.scrapType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === 'weight' || name === 'amount' ? parseFloat(value) : value 
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, date }));
    }
  };

  const handleAddCollection = () => {
    const newId = collections.length > 0 ? Math.max(...collections.map(c => c.id)) + 1 : 1;
    const newCollection = { ...formData, id: newId };
    setCollections([...collections, newCollection]);
    resetForm();
    setIsAddDialogOpen(false);
    toast({
      title: "Collection added",
      description: `New collection for ${formData.customerName} has been added.`,
      duration: 3000,
    });
  };

  const handleEditCollection = () => {
    if (!currentCollection) return;
    
    setCollections(collections.map(collection => 
      collection.id === currentCollection.id ? { ...collection, ...formData } : collection
    ));
    
    setIsEditDialogOpen(false);
    toast({
      title: "Collection updated",
      description: `Collection for ${formData.customerName} has been updated.`,
      duration: 3000,
    });
  };

  const handleDeleteCollection = () => {
    if (!currentCollection) return;
    
    setCollections(collections.filter(collection => collection.id !== currentCollection.id));
    setIsDeleteDialogOpen(false);
    toast({
      title: "Collection deleted",
      description: `Collection has been deleted successfully.`,
      duration: 3000,
    });
  };

  const openEditDialog = (collection: Collection) => {
    setCurrentCollection(collection);
    setFormData({
      date: collection.date,
      customerName: collection.customerName,
      scrapType: collection.scrapType,
      weight: collection.weight,
      amount: collection.amount,
      status: collection.status,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (collection: Collection) => {
    setCurrentCollection(collection);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      date: new Date(),
      customerName: '',
      scrapType: 'Metal',
      weight: 0,
      amount: 0,
      status: 'Pending',
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter(null);
    setTypeFilter(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scrap Collections</h1>
        <p className="text-muted-foreground">
          Track and manage daily scrap collections
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Collection Records</CardTitle>
            <CardDescription>
              View and manage all scrap collection records
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search collections..."
                className="pl-8 w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="px-3">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {(statusFilter || typeFilter) && (
                    <span className="ml-1 w-2 h-2 rounded-full bg-admin-primary inline-block"></span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Collections</h4>
                  <div className="space-y-2">
                    <Label htmlFor="status-filter">Status</Label>
                    <Select
                      value={statusFilter || ""}
                      onValueChange={(value) => setStatusFilter(value || null)}
                    >
                      <SelectTrigger id="status-filter">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Statuses</SelectItem>
                        {statusOptions.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type-filter">Scrap Type</Label>
                    <Select
                      value={typeFilter || ""}
                      onValueChange={(value) => setTypeFilter(value || null)}
                    >
                      <SelectTrigger id="type-filter">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        {scrapTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Collection
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Collection</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new scrap collection.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="col-span-3 justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={handleDateChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerName" className="text-right">
                      Customer
                    </Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="scrapType" className="text-right">
                      Scrap Type
                    </Label>
                    <Select
                      value={formData.scrapType}
                      onValueChange={(value) => handleSelectChange('scrapType', value)}
                    >
                      <SelectTrigger id="scrapType" className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {scrapTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="weight" className="text-right">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="amount" className="text-right">
                      Amount ($)
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.1"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger id="status" className="col-span-3">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCollection}>
                    Add Collection
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
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Scrap Type</TableHead>
                <TableHead className="text-right">Weight (kg)</TableHead>
                <TableHead className="text-right">Amount ($)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCollections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No collections found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCollections.map(collection => (
                  <TableRow key={collection.id}>
                    <TableCell>{format(collection.date, "MMM dd, yyyy")}</TableCell>
                    <TableCell className="font-medium">{collection.customerName}</TableCell>
                    <TableCell>{collection.scrapType}</TableCell>
                    <TableCell className="text-right">{collection.weight.toFixed(1)}</TableCell>
                    <TableCell className="text-right">${collection.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        collection.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        collection.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                        collection.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {collection.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(collection)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => openDeleteDialog(collection)}
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
            <DialogTitle>Edit Collection</DialogTitle>
            <DialogDescription>
              Update the collection details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="edit-date"
                    variant="outline"
                    className="col-span-3 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-customerName" className="text-right">
                Customer
              </Label>
              <Input
                id="edit-customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-scrapType" className="text-right">
                Scrap Type
              </Label>
              <Select
                value={formData.scrapType}
                onValueChange={(value) => handleSelectChange('scrapType', value)}
              >
                <SelectTrigger id="edit-scrapType" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {scrapTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-weight" className="text-right">
                Weight (kg)
              </Label>
              <Input
                id="edit-weight"
                name="weight"
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-amount" className="text-right">
                Amount ($)
              </Label>
              <Input
                id="edit-amount"
                name="amount"
                type="number"
                step="0.1"
                value={formData.amount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger id="edit-status" className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(status => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCollection}>
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
              Are you sure you want to delete this collection record? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCollection}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Collections;
