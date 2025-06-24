import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Search, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";

import {enquiriesService} from "@/services/enquiriesService"

interface Enquiry {
  firestoreId: string;
  enquiryId: string;
  type: 'buyer' | 'seller' | 'general'; // Assuming possible types
  name: string;
  company: string;
  behalfCompany: string;
  contact: string;
  designation?: string;
  scrapType?: string;
  description: string;
  fileUrl?: string;
  filePath?: string;
  status: 'pending' | 'approved' | 'rejected' | 'closed';
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  data?: {
    enquiries: Enquiry[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  };
  error?: string;
}

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await enquiriesService.getAll(); // Replace with your actual API endpoint
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      const data =  response;
      console.log("resp",data)
      if (data?.data?.enquiries) {
        setEnquiries(data.data.enquiries);
      } else if (data?.error) {
        setError(data.error);
        toast({
          title: "Error fetching enquiries",
          description: data.error,
          variant: "destructive",
        });
      } else {
        setError("Failed to load enquiries");
        toast({
          title: "Error fetching enquiries",
          description: "Failed to load enquiry data.",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      setError(e.message);
      toast({
        title: "Error fetching enquiries",
        description: e.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.behalfCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.enquiryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enquiry.scrapType && enquiry.scrapType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      enquiry.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">rejected</Badge>;
      // case 'closed':
      //   return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Closed</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return <div>Loading enquiries...</div>;
  }

  if (error) {
    return <div>Error loading enquiries: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Enquiries</h1>
        <p className="text-muted-foreground">
          Manage and respond to customer inquiries
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Enquiry List</CardTitle>
            <CardDescription>
              View and manage all customer enquiries
            </CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search enquiries..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-4">
            <div className="flex space-x-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('approved')}
              >
                Approved
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('rejected')}
              >
                Rejected
              </Button>
              {/* <Button
                variant={statusFilter === 'closed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('closed')}
              >
                Closed
              </Button> */}
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Scrap Type</TableHead>
                <TableHead className="max-w-[200px]">Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnquiries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No enquiries found
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnquiries.map((enquiry) => (
                  <TableRow key={enquiry.firestoreId}>
                    <TableCell className="font-medium">{enquiry.enquiryId}</TableCell>
                    <TableCell>{formatDate(enquiry.createdAt)}</TableCell>
                    <TableCell>{enquiry.name}</TableCell>
                    <TableCell>{enquiry.company}</TableCell>
                    <TableCell>{enquiry.contact}</TableCell>
                    <TableCell>{enquiry.scrapType || '-'}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{enquiry.description}</TableCell>
                    <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                    <TableCell>
                      <Link to={`/enquiries/${enquiry.firestoreId}`}>
                        <Button variant="ghost" size="sm">
                          <FileSearch className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Enquiries;