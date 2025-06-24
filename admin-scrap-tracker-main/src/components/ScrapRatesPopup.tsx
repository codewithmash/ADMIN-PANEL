import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { scrapTypesService } from '@/services/scrapTypesService';

interface ScrapRatesPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScrapRatesPopup = ({ isOpen, onClose }: ScrapRatesPopupProps) => {
  const { data: scrapTypes = [], isLoading, error } = useQuery({
    queryKey: ['scrapTypes'],
    queryFn: scrapTypesService.getAll,
    enabled: isOpen,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">Current Scrap Rates</DialogTitle>
          {/* <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>
        
        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center p-4">
              <p>Loading rates...</p>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-4">
              <p>Failed to load scrap rates</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scrapTypes.map((scrapType: any) => (
                <div key={scrapType.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">{scrapType.name}</h3>
                    <p className="text-sm text-gray-600">{scrapType.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-green-600">₹{scrapType.ratePerKg}</span>
                    {/* <p className="text-xs text-gray-500">per kg</p> */}
                  </div>
                </div>
              ))}
              {scrapTypes.length === 0 && (
                <p className="text-center text-gray-500 py-4">No scrap rates available</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScrapRatesPopup;
