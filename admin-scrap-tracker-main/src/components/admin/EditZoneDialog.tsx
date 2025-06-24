
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin } from 'lucide-react';
import { zonesService, Zone } from '@/services/zonesService';
import MapSelector from './MapSelector';

interface EditZoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  zone: Zone;
}

const EditZoneDialog = ({ isOpen, onClose, onSuccess, zone }: EditZoneDialogProps) => {
  const [name, setName] = useState(zone.name);
  const [description, setDescription] = useState(zone.description);
  const [address, setAddress] = useState(zone.address);
  const [coordinates, setCoordinates] = useState(zone.polygon);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const apiKey = 'AIzaSyAsWUvGXKUlo2uzpmUCpea7P1UBad6vDiQ';

  useEffect(() => {
    if (isOpen) {
      setName(zone.name);
      setDescription(zone.description);
      setAddress(zone.address);
      setCoordinates(zone.polygon);
    }
  }, [isOpen, zone]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !coordinates) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await zonesService.update(zone.id!, {
        name,
        description,
        address,
        polygon:JSON.parse(coordinates),
        status: zone.status,
      });
      toast({
        title: "Success",
        description: "Zone updated successfully",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update zone",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Edit Zone
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Zone Name*</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter zone name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description*</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address*</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Edit Area on Map*</Label>
              <MapSelector 
                apiKey={apiKey}
                address={address} 
                initialCoordinates={coordinates}
                onCoordinatesChange={setCoordinates}
                onAddressChange={setAddress}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Zone"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditZoneDialog;
