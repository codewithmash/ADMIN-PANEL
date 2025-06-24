import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { useAuth } from "@/context/AuthContext";

import { partnerDashboardService } from '@/services/partnerDahboardService';

// Define a type for BankDetails
interface BankDetails {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
}

// Define a type for your partner object to ensure type safety and better autocompletion
interface Partner {
  fullName: string;
  phoneNumber: string; // This will now be the partner ID
  email: string;
  vehicleType: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: { _seconds: number };
  createdAt: { _seconds: number };
  updatedAt?: { _seconds: number };
  bankDetails: BankDetails; // Use the BankDetails type here
  documents: {
    profilePhoto?: string;
    aadhaarFront?: string;
    aadhaarBack?: string;
    panCard?: string;
    drivingLicense?: string;
    vehicleRC?: string;
  };
}

const Profile = () => {
  const { user } = useAuth(); // Get user from auth context
  const navigate = useNavigate();
  const { toast } = useToast();

  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingBankDetails, setIsEditingBankDetails] = useState(false);
  const [formData, setFormData] = useState<Partial<Partner>>({});
  const [bankFormData, setBankFormData] = useState<Partial<BankDetails>>({});

  // The partnerId will now come from user.phoneNumber
  const partnerId = user?.phone;

  // Function to fetch partner data
  const fetchPartner = async (pId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await partnerDashboardService.getPartnerById(pId);

      if (response.success && response.partner) {
        setPartner(response.partner);
        setFormData({
          fullName: response.partner.fullName,
          phoneNumber: response.partner.phoneNumber,
          email: response.partner.email,
          vehicleType: response.partner.vehicleType,
          address: response.partner.address,
          status: response.partner.status,
        });
        setBankFormData(response.partner.bankDetails || {}); // Initialize bank details for editing
      } else {
        setError('Failed to fetch partner data.');
        toast({
          title: "Error",
          description: "Could not retrieve partner data.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error fetching partner:", err);
      setError(err.message || "Failed to fetch partner data.");
      toast({
        title: "Error",
        description: err.message || "Failed to fetch partner data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch partner data when component mounts or partnerId changes
  useEffect(() => {
    if (partnerId) {
      fetchPartner(partnerId);
    } else {
      setError("User phone number (partner ID) is not available.");
      setIsLoading(false);
    }
  }, [partnerId]); // Dependency changed to partnerId

  // Handle changes in the main profile edit form
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle changes in the bank details edit form
  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission for updating main partner profile
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId) { // Use partnerId here
      setError("Cannot update: Partner ID (phone number) is missing.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const dataToSend: Partial<Partner> = {
        fullName: formData.fullName,
        email: formData.email,
        vehicleType: formData.vehicleType,
        address: formData.address,
        status: formData.status,
      };

      // Ensure phoneNumber is not updated if it's the ID
      // If phoneNumber is indeed the ID, it should not be part of the `dataToSend` for update
      // unless your backend specifically handles updating the ID itself, which is rare and not recommended.
      // Assuming phoneNumber is immutable as an ID.
      // If it *can* be updated, you'd need to handle that carefully and potentially route differently.

      const response = await partnerDashboardService.updatePartner(partnerId, dataToSend); // Use partnerId here
      if (response.success && response.partner) {
        setPartner(response.partner);
        setIsEditingProfile(false);
        toast({
          title: "Success",
          description: "Partner profile updated successfully!",
        });
      } else {
        setError(response.message || "Failed to update partner.");
        toast({
          title: "Error",
          description: response.message || "Failed to update partner. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error updating partner:", err);
      setError(err.message || "Failed to update partner.");
      toast({
        title: "Error",
        description: err.message || "Failed to update partner. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission for updating bank details
  const handleBankDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerId) { // Use partnerId here
      setError("Cannot update bank details: Partner ID (phone number) is missing.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const bankDetailsToSend: BankDetails = {
        accountHolderName: bankFormData.accountHolderName || '',
        accountNumber: bankFormData.accountNumber || '',
        bankName: bankFormData.bankName || '',
        ifscCode: bankFormData.ifscCode || '',
      };

      console.log(partnerId,bankDetailsToSend)

      const response = await partnerDashboardService.updatePartnerBankDetails(partnerId, bankDetailsToSend); // Use partnerId here
      if (response.success && response.partner) {
        setPartner(response.partner);
        setIsEditingBankDetails(false);
        toast({
          title: "Success",
          description: "Bank details updated successfully!",
        });
      } else {
        setError(response.message || "Failed to update bank details.");
        toast({
          title: "Error",
          description: response.message || "Failed to update bank details. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error updating bank details:", err);
      setError(err.message || "Failed to update bank details.");
      toast({
        title: "Error",
        description: err.message || "Failed to update bank details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to display a document link
  const renderDocumentLink = (label: string, url: string | undefined) => {
    if (!url) return null;
    return (
      <p key={url}>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {label}
        </a>
      </p>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin mr-2" /> Loading partner profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600 bg-red-50 border border-red-200 rounded-md mx-auto max-w-lg">
        <p>Error: {error}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>No partner data found.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Partner Profile</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      {/* Main Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Partner Information
            {isEditingProfile ? (
              <div className="space-x-2">
                <Button onClick={handleProfileSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Profile'}
                </Button>
                <Button variant="outline" onClick={() => setIsEditingProfile(false)} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditingProfile(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            )}
          </CardTitle>
          <CardDescription>General details of the registered partner.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditingProfile ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName || ''}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleProfileChange}
                  disabled // Phone number is now the ID, so it should be disabled for editing.
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                <Input
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType || ''}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group col-span-1 md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || ''}
                  onChange={handleProfileChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <p><strong>Full Name:</strong> {partner.fullName}</p>
              <p><strong>Phone:</strong> {partner.phoneNumber}</p>
              <p><strong>Email:</strong> {partner.email || 'N/A'}</p>
              <p><strong>Vehicle Type:</strong> {partner.vehicleType}</p>
              <p><strong>Address:</strong> {partner.address}</p>
              <p>
                <strong>Status:</strong> <Badge variant={partner.status === 'approved' ? 'default' : partner.status === 'pending' ? 'secondary' : 'destructive'}>
                  {partner.status}
                </Badge>
              </p>
              <p><strong>Approved By:</strong> {partner.approvedBy || 'N/A'}</p>
              <p><strong>Approved At:</strong> {partner.approvedAt ? new Date(partner.approvedAt._seconds * 1000).toLocaleString() : 'N/A'}</p>
              <p><strong>Created At:</strong> {new Date(partner.createdAt._seconds * 1000).toLocaleString()}</p>
              <p><strong>Last Updated:</strong> {partner.updatedAt ? new Date(partner.updatedAt._seconds * 1000).toLocaleString() : 'N/A'}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bank Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Bank Details
            {/* {isEditingBankDetails ? (
              <div className="space-x-2">
                <Button onClick={handleBankDetailsSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Bank Details'}
                </Button>
                <Button variant="outline" onClick={() => setIsEditingBankDetails(false)} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditingBankDetails(true)}>
                <Edit className="mr-2 h-4 w-4" /> Edit Bank Details
              </Button>
            )} */}
          </CardTitle>
          <CardDescription>Financial information of the partner.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditingBankDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={bankFormData.bankName || ''}
                  onChange={handleBankDetailsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Account Number</label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={bankFormData.accountNumber || ''}
                  onChange={handleBankDetailsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
                <Input
                  id="ifscCode"
                  name="ifscCode"
                  value={bankFormData.ifscCode || ''}
                  onChange={handleBankDetailsChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="accountHolderName" className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                <Input
                  id="accountHolderName"
                  name="accountHolderName"
                  value={bankFormData.accountHolderName || ''}
                  onChange={handleBankDetailsChange}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
              <p><strong>Bank Name:</strong> {partner.bankDetails?.bankName || 'N/A'}</p>
              <p><strong>Account No.:</strong> {partner.bankDetails?.accountNumber || 'N/A'}</p>
              <p><strong>IFSC Code:</strong> {partner.bankDetails?.ifscCode || 'N/A'}</p>
              <p><strong>Account Holder:</strong> {partner.bankDetails?.accountHolderName || 'N/A'}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Card */}
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Uploaded documents for verification.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {renderDocumentLink('Profile Photo', partner.documents?.profilePhoto)}
            {renderDocumentLink('Aadhaar Front', partner.documents?.aadhaarFront)}
            {renderDocumentLink('Aadhaar Back', partner.documents?.aadhaarBack)}
            {renderDocumentLink('PAN Card', partner.documents?.panCard)}
            {renderDocumentLink('Driving License', partner.documents?.drivingLicense)}
            {renderDocumentLink('Vehicle RC', partner.documents?.vehicleRC)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;