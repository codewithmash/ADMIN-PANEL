import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { zonesService, Zone } from '@/services/zonesService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AddZoneDialog from '@/components/admin/AddZoneDialog';
import EditZoneDialog from '@/components/admin/EditZoneDialog';
import DeleteConfirmDialog from '@/components/admin/DeleteConfirmDialog';

const Zones = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const { toast } = useToast();

  // const { data: zones = [], isLoading, error, refetch } = useQuery({
  //   queryKey: ['zones'],
  //   queryFn: zonesService.getAll,
  // });

  const { data: zones = [], isLoading, error, refetch } = useQuery({
  queryKey: ['zones'],
  queryFn: async () => {
    const response = await zonesService.getAll();
    return response.zones; // 👈 only return zones
  },
});


  const handleStatusToggle = async (id: number, currentStatus: boolean | null) => {
    const newStatus = !currentStatus;
    try {
      await zonesService.updateStatus(id, newStatus);
      toast({
        title: "Status updated",
        description: `Zone status updated to ${newStatus ? 'active' : 'inactive'}`,
      });
      refetch();
    } catch {
      toast({
        title: "Error",
        description: "Failed to update zone status",
        variant: "destructive",
      });
    }
  };

  const handleEditZone = (zone: Zone) => {
    setSelectedZone(zone);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (zone: Zone) => {
    setSelectedZone(zone);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedZone?.id) return;
    try {
      await zonesService.delete(selectedZone.id);
      toast({
        title: "Zone deleted",
        description: "The zone has been deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      refetch();
    } catch {
      toast({
        title: "Error",
        description: "Failed to delete zone",
        variant: "destructive",
      });
    }
  };

  const filteredZones = (zones as Zone[]).filter(zone =>
    (zone.name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (zone.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error loading zones: {(error as Error).message}</p>
      </div>
    );
  }

  return (
    <>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Zones Management</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Zone
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search zones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8">
              <p>Loading zones...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredZones.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      No zones found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredZones.map((zone) => (
                    <TableRow key={zone.id}>
                      <TableCell>{zone.name || '—'}</TableCell>
                      <TableCell>{zone.description || '—'}</TableCell>
                      <TableCell>
                        {zone.address ? (
                          <code className="text-xs">{zone.address}</code>
                        ) : (
                          '—'
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={zone.isActive ? "default" : "outline"}
                          size="sm"
                          onClick={() => zone.id && handleStatusToggle(zone.id, zone.isActive)}
                          className={zone.isActive ? "bg-green-500 hover:bg-green-600" : "text-red-500"}
                        >
                          {zone.isActive ? (
                            <><Check className="mr-1 h-4 w-4" /> Active</>
                          ) : (
                            <><X className="mr-1 h-4 w-4" /> Inactive</>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditZone(zone)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(zone)}>
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

      <AddZoneDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={() => {
          refetch();
          setIsAddDialogOpen(false);
        }}
      />

      {selectedZone && (
        <EditZoneDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          zone={selectedZone}
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
        title="Delete Zone"
        description="Are you sure you want to delete this zone? This action cannot be undone."
      />
    </>
  );
};

export default Zones;
