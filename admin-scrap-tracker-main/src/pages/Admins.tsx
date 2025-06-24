import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"; // Corrected import path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Corrected import path
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Corrected import path
import { Input } from "@/components/ui/input"; // Corrected import path
import { Label } from "@/components/ui/label"; // Corrected import path
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; // Corrected import path
import { useToast } from "@/components/ui/use-toast"; // Corrected import path
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { adminService } from "@/services/AdminService"; // Corrected import path

// Define the Admin interface based on the backend response
interface Admin {
  id: string; // This will typically be the email
  email: string; // Corresponds to myScrapName
  password: string; // Corresponds to myScrapPass
}

const Admins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isUpdatePasswordDialogOpen, setIsUpdatePasswordDialogOpen] = useState(false); // Changed from isEditDialogOpen
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const { toast } = useToast();

  // Function to load admins from the backend
  const loadAdmins = async () => {
    try {
      const response = await adminService.getAll();
      // Ensure the response structure is handled correctly
      if (response && response.admins && Array.isArray(response.admins)) {
        // Map the backend response to the Admin interface
        const fetchedAdmins: Admin[] = response.admins.map((admin: any) => ({
          id: admin.id || admin.myScrapName, // Use 'id' if present, otherwise 'myScrapName'
          email: admin.myScrapName,
          password: admin.myScrapPass,
        }));
        setAdmins(fetchedAdmins);
      } else {
        setAdmins([]); // No admins found or unexpected response
      }
    } catch (err) {
      console.error("Failed to fetch admins:", err);
      toast({ title: "Error", description: "Failed to fetch administrators.", variant: "destructive" });
    }
  };

  // Load admins on component mount
  useEffect(() => {
    loadAdmins();
  }, []);

  // Filter admins based on search term
  const filteredAdmins = admins.filter(admin =>
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.password.toLowerCase().includes(searchTerm.toLowerCase()) // Allow searching by password as well (for demo, in real app, might not expose)
  );

  // Handle input changes for form data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle adding a new admin
  const handleAddAdmin = async () => {
    try {
      await adminService.create({ email: formData.email, password: formData.password });
      toast({ title: "Administrator added", description: `${formData.email} has been added successfully.` });
      setFormData({ email: '', password: '' }); // Clear form
      setIsAddDialogOpen(false); // Close dialog
      loadAdmins(); // Reload admins
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast({ title: "Error", description: error.message || "Failed to add administrator.", variant: "destructive" });
    }
  };

  // Handle updating an admin's password
  const handleUpdatePassword = async () => {
    if (!currentAdmin) return; // Ensure an admin is selected
    try {
      await adminService.updatePassword(currentAdmin.email, formData.password);
      toast({ title: "Admin updated", description: `Password for ${currentAdmin.email} has been updated.` });
      setIsUpdatePasswordDialogOpen(false); // Close dialog
      loadAdmins(); // Reload admins
    } catch (error: any) {
      console.error("Error updating admin password:", error);
      toast({ title: "Error", description: error.message || "Failed to update administrator password.", variant: "destructive" });
    }
  };

  // Handle deleting an admin
  const handleDeleteAdmin = async () => {
    if (!currentAdmin) return; // Ensure an admin is selected
    try {
      await adminService.delete(currentAdmin.email);
      toast({ title: "Admin deleted", description: `${currentAdmin.email} has been deleted.` });
      setIsDeleteDialogOpen(false); // Close dialog
      loadAdmins(); // Reload admins
    } catch (error: any) {
      console.error("Error deleting admin:", error);
      toast({ title: "Error", description: error.message || "Failed to delete administrator.", variant: "destructive" });
    }
  };

  // Open the update password dialog
  const openUpdatePasswordDialog = (admin: Admin) => {
    setCurrentAdmin(admin);
    setFormData({ email: admin.email, password: '' }); // Populate email, clear password for new input
    setIsUpdatePasswordDialogOpen(true);
  };

  // Open the delete confirmation dialog
  const openDeleteDialog = (admin: Admin) => {
    setCurrentAdmin(admin);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 p-4 md:p-8 lg:p-12"> {/* Added padding for better layout */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Administrators</h1>
        <p className="text-muted-foreground">Manage your admin accounts</p>
      </div>

      <Card className="rounded-xl shadow-lg"> {/* Added rounded corners and shadow */}
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <CardTitle>Admin List</CardTitle>
            <CardDescription>View, add, update, and delete admin accounts</CardDescription>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search admins by email or password..."
                className="pl-8 w-full md:w-[250px] rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Add Admin Dialog Trigger and Content */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-shrink-0 rounded-md"><Plus className="mr-2 h-4 w-4" /> Add Admin</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-lg">
                <DialogHeader>
                  <DialogTitle>Add New Administrator</DialogTitle>
                  <DialogDescription>Enter the email and password for the new administrator.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="col-span-3 rounded-md"
                      placeholder="admin@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="col-span-3 rounded-md"
                      placeholder="********"
                    />
                  </div>
                </div>
                <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
                  <Button variant="outline" className="rounded-md" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button className="rounded-md" onClick={handleAddAdmin}>Add Administrator</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Password (Masked)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No administrators found</TableCell>
                </TableRow>
              ) : (
                filteredAdmins.map(admin => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.email}</TableCell>
                    <TableCell>********</TableCell> {/* Masking password for display */}
                    <TableCell className="text-right space-x-2">
                      {/* Update Password Button */}
                      <Button variant="ghost" size="icon" className="rounded-md" onClick={() => openUpdatePasswordDialog(admin)}><Pencil className="h-4 w-4" /></Button>
                      {/* Delete Button */}
                      <Button variant="ghost" size="icon" className="text-destructive rounded-md" onClick={() => openDeleteDialog(admin)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Update Password Dialog */}
      <Dialog open={isUpdatePasswordDialogOpen} onOpenChange={setIsUpdatePasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Update Admin Password</DialogTitle>
            <DialogDescription>Enter the new password for {currentAdmin?.email}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">Email</Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                className="col-span-3 rounded-md"
                readOnly // Email should not be editable as it's the ID
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-password" className="text-right">New Password</Label>
              <Input
                id="edit-password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="col-span-3 rounded-md"
                placeholder="********"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <Button variant="outline" className="rounded-md" onClick={() => setIsUpdatePasswordDialogOpen(false)}>Cancel</Button>
            <Button className="rounded-md" onClick={handleUpdatePassword}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete administrator <span className="font-semibold">{currentAdmin?.email}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
            <Button variant="outline" className="rounded-md" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" className="rounded-md" onClick={handleDeleteAdmin}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admins;
