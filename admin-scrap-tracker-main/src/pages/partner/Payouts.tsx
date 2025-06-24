
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CircleDollarSign, Calendar, Clock, CheckCircle, AlertCircle, Download, Wallet 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data
const payoutHistory = [
  { 
    id: "PAY-001", 
    period: "1-7 Aug 2023", 
    amount: 8750, 
    status: "completed", 
    processedDate: "8 Aug 2023",
    bankAccount: "XXXX1234"
  },
  { 
    id: "PAY-002", 
    period: "8-14 Aug 2023", 
    amount: 10200, 
    status: "processing", 
    processedDate: "15 Aug 2023",
    bankAccount: "XXXX1234"
  },
  { 
    id: "PAY-003", 
    period: "15-21 Aug 2023", 
    amount: 9300, 
    status: "pending", 
    processedDate: null,
    bankAccount: "XXXX1234"
  }
];

const currentEarnings = 13900;
const weeklyBreakdown = [
  { day: "Monday", earnings: 1750, pickups: 3 },
  { day: "Tuesday", earnings: 2400, pickups: 5 },
  { day: "Wednesday", earnings: 2100, pickups: 4 },
  { day: "Thursday", earnings: 2650, pickups: 6 },
  { day: "Friday", earnings: 1900, pickups: 4 },
  { day: "Saturday", earnings: 1400, pickups: 3 },
  { day: "Sunday", earnings: 1700, pickups: 4 },
];

const Payouts = () => {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [isPayoutDetailDialogOpen, setIsPayoutDetailDialogOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const { toast } = useToast();

  const handleRequestPayout = () => {
    setIsRequestDialogOpen(false);
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted successfully.",
      duration: 3000,
    });
  };

  const handleViewPayout = (payout: any) => {
    setSelectedPayout(payout);
    setIsPayoutDetailDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payouts</h1>
        <p className="text-muted-foreground">
          Manage your earnings and request payouts
        </p>
      </div>

      {/* Current Earnings Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Current Earnings
                </p>
                <h2 className="text-3xl font-bold">₹{currentEarnings.toLocaleString()}</h2>
                <p className="text-xs text-muted-foreground">
                  For the current week
                </p>
              </div>
            </div>
            <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <CircleDollarSign className="mr-2 h-4 w-4" />
                  Request Payout
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Payout</DialogTitle>
                  <DialogDescription>
                    Confirm your payout request for the current earnings
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Payout Information</AlertTitle>
                    <AlertDescription>
                      Payouts are processed at the end of each week. Funds will be transferred to your registered bank account within 2-3 business days.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-bold text-lg">₹{currentEarnings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Period</p>
                        <p className="font-medium">Current Week</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bank Account</p>
                        <p className="font-medium">XXXX1234</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Expected Processing</p>
                        <p className="font-medium">End of Week</p>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsRequestDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleRequestPayout}>
                    Confirm Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="history">
        <TabsList>
          <TabsTrigger value="history">Payout History</TabsTrigger>
          <TabsTrigger value="breakdown">Weekly Breakdown</TabsTrigger>
        </TabsList>
        
        {/* Payout History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>
                Your recent payout transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutHistory.map(payout => (
                  <div key={payout.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{payout.id}</Badge>
                        <Badge className={
                          payout.status === 'completed' ? 'bg-green-500' : 
                          payout.status === 'processing' ? 'bg-blue-500' : 
                          'bg-yellow-500'
                        }>
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </Badge>
                      </div>
                      <h3 className="font-semibold">₹{payout.amount.toLocaleString()}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Period: {payout.period}</span>
                      </div>
                      {payout.processedDate && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Processed: {payout.processedDate}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Button 
                        variant="outline"
                        onClick={() => handleViewPayout(payout)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Weekly Breakdown */}
        <TabsContent value="breakdown">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Earnings</CardTitle>
              <CardDescription>
                Breakdown of your daily earnings for the current week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyBreakdown.map((day, index) => (
                  <div key={index} className="grid grid-cols-3 items-center p-4 border-b last:border-0">
                    <div className="font-medium">{day.day}</div>
                    <div className="text-center">
                      <span className="inline-flex items-center text-muted-foreground">
                        <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                        {day.pickups} pickups
                      </span>
                    </div>
                    <div className="text-right font-bold">₹{day.earnings.toLocaleString()}</div>
                  </div>
                ))}
                
                <div className="grid grid-cols-3 items-center p-4 bg-muted rounded-md">
                  <div className="font-bold">Total</div>
                  <div className="text-center">
                    <span className="inline-flex items-center">
                      <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                      {weeklyBreakdown.reduce((sum, day) => sum + day.pickups, 0)} pickups
                    </span>
                  </div>
                  <div className="text-right font-bold text-lg">₹{currentEarnings.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payout Detail Dialog */}
      <Dialog open={isPayoutDetailDialogOpen} onOpenChange={setIsPayoutDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payout Details: {selectedPayout?.id}</DialogTitle>
            <DialogDescription>
              Details of your payout transaction
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayout && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <Badge className={
                    selectedPayout.status === 'completed' ? 'bg-green-500' : 
                    selectedPayout.status === 'processing' ? 'bg-blue-500' : 
                    'bg-yellow-500'
                  }>
                    {selectedPayout.status.charAt(0).toUpperCase() + selectedPayout.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Payout ID</p>
                    <p className="font-medium">{selectedPayout.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="font-bold">₹{selectedPayout.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Period</p>
                    <p className="font-medium">{selectedPayout.period}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Processing Date</p>
                    <p className="font-medium">{selectedPayout.processedDate || 'Pending'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bank Account</p>
                    <p className="font-medium">{selectedPayout.bankAccount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-medium">Direct Bank Transfer</p>
                  </div>
                </div>
                
                {selectedPayout.status === 'completed' && (
                  <div className="pt-4">
                    <Button className="w-full" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Receipt
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payouts;
