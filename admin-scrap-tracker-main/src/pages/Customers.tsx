import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { customersService, Customer } from "@/services/customersService";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Omit<Customer, 'id'>>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const { toast } = useToast();

  const loadCustomers = async () => {
    try {
      const data = await customersService.getAll();
      setCustomers(data);
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch customers.", variant: "destructive" });
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = async () => {
    try {
      await customersService.create(formData);
      toast({ title: "Customer added", description: `${formData.name} has been added successfully.` });
      setFormData({ name: '', email: '', phone: '', address: '' });
      setIsAddDialogOpen(false);
      loadCustomers();
    } catch {
      toast({ title: "Error", description: "Failed to add customer.", variant: "destructive" });
    }
  };

  const handleEditCustomer = async () => {
    if (!currentCustomer) return;
    try {
      await customersService.update(currentCustomer.id!, formData);
      toast({ title: "Customer updated", description: `${formData.name} has been updated.` });
      setIsEditDialogOpen(false);
      loadCustomers();
    } catch {
      toast({ title: "Error", description: "Failed to update customer.", variant: "destructive" });
    }
  };

  const handleDeleteCustomer = async () => {
    if (!currentCustomer) return;
    try {
      await customersService.delete(currentCustomer.email);
      toast({ title: "Customer deleted", description: `${currentCustomer.name} has been deleted.` });
      setIsDeleteDialogOpen(false);
      loadCustomers();
    } catch {
      toast({ title: "Error", description: "Failed to delete customer.", variant: "destructive" });
    }
  };

  const openEditDialog = (customer: Customer) => {
    setCurrentCustomer(customer);
    setFormData({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (customer: Customer) => {
    setCurrentCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-muted-foreground">Manage your customer database</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Customer List</CardTitle>
            <CardDescription>View and manage all your customers</CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              {/* <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Customer</Button>
              </DialogTrigger> */}
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                  <DialogDescription>Enter the details of the new customer below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {['name', 'email', 'phone'].map((field) => (
                    <div key={field} className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor={field} className="text-right">{field[0].toUpperCase() + field.slice(1)}</Label>
                      <Input
                        id={field}
                        name={field}
                        type={field === 'email' ? 'email' : 'text'}
                        value={(formData as any)[field]}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddCustomer}>Add Customer</Button>
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
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                {/* <TableHead>Address</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No customers found</TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map(customer => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    {/* <TableCell>{customer.address}</TableCell> */}
                    <TableCell className="text-right space-x-2">
                      {/* <Button variant="ghost" size="icon" onClick={() => openEditDialog(customer)}><Pencil className="h-4 w-4" /></Button> */}
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => openDeleteDialog(customer)}><Trash2 className="h-4 w-4" /></Button>
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
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>Update the customer details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {['name', 'email', 'phone', 'address'].map((field) => (
              <div key={field} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={`edit-${field}`} className="text-right">{field[0].toUpperCase() + field.slice(1)}</Label>
                <Input
                  id={`edit-${field}`}
                  name={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={(formData as any)[field]}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditCustomer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>Are you sure you want to delete {currentCustomer?.name}? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
