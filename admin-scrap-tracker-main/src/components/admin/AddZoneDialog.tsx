import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { MapPin } from 'lucide-react';
import { zonesService } from '@/services/zonesService';
import MapSelector from './MapSelector';

interface AddZoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddZoneDialog = ({ isOpen, onClose, onSuccess }: AddZoneDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Replace this with your actual API key (ideally from env vars)
  const apiKey = 'AIzaSyAsWUvGXKUlo2uzpmUCpea7P1UBad6vDiQ';

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
      await zonesService.create({
        name,
        address,
        description,
        polygon : JSON.parse(coordinates),
        status: 'available',
      });
      toast({
        title: "Success",
        description: "Zone added successfully",
      });
      onSuccess();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add zone",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('')
    setAddress('');
    setCoordinates('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Add New Zone
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
              <Label htmlFor="name">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter zone name"
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
              <Label>Select Area on Map*</Label>
              <MapSelector 
                apiKey={apiKey}
                address={address}
                onCoordinatesChange={setCoordinates}
                onAddressChange={setAddress}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Zone"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddZoneDialog;
