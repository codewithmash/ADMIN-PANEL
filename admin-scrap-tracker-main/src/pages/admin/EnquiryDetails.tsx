// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/components/ui/use-toast";
// import { Separator } from "@/components/ui/separator";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ArrowLeft, Send } from "lucide-react";

// import { enquiriesService } from '@/services/enquiriesService';

// // Adjusted interface to match your Firestore structure
// interface EnquiryDetail {
//   firestoreId: string;
//   enquiryId?: string;
//   type: 'buyer' | 'seller';
//   name: string;
//   company: string;
//   behalfCompany: string;
//   contact: string;
//   designation: string;
//   scrapType: string;
//   description: string;
//   fileUrl?: string;
//   filePath?: string;
//   status: 'pending' | 'in-progress' | 'resolved' | 'closed';
//   createdAt: string;
//   updatedAt: string;
//   replies?: Reply[];
// }

// interface Reply {
//   sender: 'admin' | 'customer';
//   message: string;
//   timestamp: string;
// }

// // Dummy fetch simulation — replace with actual API call or Firestore query
// const fetchEnquiryById = async (id: string): Promise<EnquiryDetail | null> => {
//   const response = await enquiriesService.getById(id); // Your actual endpoint
//   console.log("response",response)
//   // if (!response.ok) return null;
//   const data = response;
//   // console.log("data",data)
//   return data.data.enquiry;
// };

// const EnquiryDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const [enquiry, setEnquiry] = useState<EnquiryDetail | null>(null);
//   const [replyMessage, setReplyMessage] = useState('');
//   const [statusValue, setStatusValue] = useState<string>('');
//   const { toast } = useToast();

//   useEffect(() => {
//     if (!id) return;
//     fetchEnquiryById(id).then((data) => {
//       if (data) {
//         setEnquiry(data);
//         setStatusValue(data.status);
//       }
//     });
//   }, [id]);

//   const handleSendReply = () => {
//     if (!replyMessage.trim() || !enquiry) return;

//     const newReply: Reply = {
//       sender: 'admin',
//       message: replyMessage,
//       timestamp: new Date().toISOString()
//     };

//     const updatedEnquiry = {
//       ...enquiry,
//       replies: [...(enquiry.replies || []), newReply],
//       status: 'in-progress'
//     };

//     setEnquiry(updatedEnquiry);
//     setReplyMessage('');
//     setStatusValue('in-progress');

//     toast({
//       title: "Reply sent",
//       description: "Your reply has been sent successfully.",
//       duration: 3000,
//     });
//   };

//   const handleStatusChange = (newStatus: string) => {
//     if (!enquiry) return;

//     const updatedEnquiry = {
//       ...enquiry,
//       status: newStatus as EnquiryDetail['status']
//     };

//     setEnquiry(updatedEnquiry);
//     setStatusValue(newStatus);

//     toast({
//       title: "Status updated",
//       description: `Enquiry status updated to ${newStatus}.`,
//       duration: 3000,
//     });
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-IN', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(date);
//   };

//   const getStatusBadge = (status: string) => {
//     switch(status) {
//       case 'pending':
//         return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Pending</Badge>;
//       case 'in-progress':
//         return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">In Progress</Badge>;
//       case 'resolved':
//         return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Resolved</Badge>;
//       case 'closed':
//         return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Closed</Badge>;
//       default:
//         return null;
//     }
//   };

//   if (!enquiry) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-muted-foreground">Enquiry not found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <Link to="/enquiries">
//             <Button variant="outline" size="icon">
//               <ArrowLeft className="h-4 w-4" />
//             </Button>
//           </Link>
//           <h1 className="text-3xl font-bold tracking-tight">Enquiry #{enquiry.enquiryId || enquiry.firestoreId}</h1>
//         </div>

//         <div className="flex items-center space-x-4">
//           <div className="flex items-center">
//             <span className="mr-2 font-medium">Status:</span>
//             {getStatusBadge(enquiry.status)}
//           </div>
//           <Select value={statusValue} onValueChange={handleStatusChange}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Change status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="pending">Pending</SelectItem>
//               <SelectItem value="in-progress">In Progress</SelectItem>
//               <SelectItem value="resolved">Resolved</SelectItem>
//               <SelectItem value="closed">Closed</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Enquiry Details</CardTitle>
//           <CardDescription>Received on {formatDate(enquiry.createdAt)}</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
//                 <p className="font-medium">{enquiry.name}</p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
//                 <p>{enquiry.contact}</p>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
//               <p>{enquiry.company}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground">Scrap Type</h3>
//               <p>{enquiry.scrapType}</p>
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
//               <p className="mt-1 bg-slate-50 p-3 rounded-md">{enquiry.description}</p>
//             </div>
//             {enquiry.fileUrl && (
//               <div>
//                 <h3 className="text-sm font-medium text-muted-foreground">Attached Document</h3>
//                 <a href={enquiry.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                   View Document
//                 </a>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Replies */}
//       {/* <Card>
//         <CardHeader>
//           <CardTitle>Conversation History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {(enquiry.replies?.length ?? 0) === 0 ? (
//               <p className="text-center text-muted-foreground py-8">No replies yet</p>
//             ) : (
//               <div className="space-y-6">
//                 {enquiry.replies!.map((reply, index) => (
//                   <div key={index} className={`flex ${reply.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`max-w-[80%] p-4 rounded-lg ${
//                       reply.sender === 'admin'
//                         ? 'bg-blue-100 text-blue-900'
//                         : 'bg-gray-100 text-gray-900'
//                     }`}>
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="font-medium">
//                           {reply.sender === 'admin' ? 'Admin' : enquiry.name}
//                         </span>
//                         <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
//                       </div>
//                       <p>{reply.message}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             <Separator className="my-6" />

//             <div className="mt-6">
//               <div className="flex items-start space-x-3">
//                 <Textarea
//                   placeholder="Type your reply here..."
//                   className="flex-1"
//                   value={replyMessage}
//                   onChange={(e) => setReplyMessage(e.target.value)}
//                 />
//                 <Button onClick={handleSendReply} disabled={!replyMessage.trim()}>
//                   <Send className="h-4 w-4 mr-2" />
//                   Send
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card> */}
//     </div>
//   );
// };

// export default EnquiryDetails;



import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send } from "lucide-react";

import { enquiriesService } from '@/services/enquiriesService';

// Adjusted interface to match your Firestore structure
interface EnquiryDetail {
  firestoreId: string;
  enquiryId?: string;
  type: 'buyer' | 'seller';
  name: string;
  company: string;
  behalfCompany: string;
  contact: string;
  designation: string;
  scrapType: string;
  description: string;
  fileUrl?: string;
  filePath?: string;
  // Status directly reflects backend values
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  replies?: Reply[];
}

interface Reply {
  sender: 'admin' | 'customer';
  message: string;
  timestamp: string;
}

// Dummy fetch simulation — replace with actual API call or Firestore query
const fetchEnquiryById = async (id: string): Promise<EnquiryDetail | null> => {
  try {
    const response = await enquiriesService.getById(id);
    console.log("response", response);
    return response.data.enquiry;
  } catch (error) {
    console.error("Error fetching enquiry by ID:", error);
    return null;
  }
};

const EnquiryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [enquiry, setEnquiry] = useState<EnquiryDetail | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [statusValue, setStatusValue] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    fetchEnquiryById(id).then((data) => {
      if (data) {
        setEnquiry(data);
        setStatusValue(data.status);
      }
    });
  }, [id]);

  const handleSendReply = () => {
    if (!replyMessage.trim() || !enquiry) return;

    const newReply: Reply = {
      sender: 'admin',
      message: replyMessage,
      timestamp: new Date().toISOString()
    };

    const updatedEnquiry = {
      ...enquiry,
      replies: [...(enquiry.replies || []), newReply],
      // When a reply is sent, you might want to set a default status,
      // for example, "approved" if it means the admin is now engaging.
      // Adjust this logic based on your desired workflow.
      status: 'approved' as EnquiryDetail['status'] // Assuming engaging means it's "approved" for processing
    };

    setEnquiry(updatedEnquiry);
    setReplyMessage('');
    setStatusValue('approved'); // Update UI dropdown to reflect new status

    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
      duration: 3000,
    });
  };

  const handleStatusChange = async (newStatus: 'pending' | 'approved' | 'rejected') => {
    if (!enquiry) return;

    try {
      // Call your service to update the status in the backend
      await enquiriesService.update(enquiry.enquiryId, newStatus);

      // Optimistically update the UI after successful API call
      const updatedEnquiry = {
        ...enquiry,
        status: newStatus
      };

      setEnquiry(updatedEnquiry);
      setStatusValue(newStatus);

      toast({
        title: "Status updated",
        description: `Enquiry status updated to ${newStatus}.`,
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to update enquiry status:", error);
      toast({
        title: "Error",
        description: "Failed to update enquiry status. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
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

  const getStatusBadge = (status: EnquiryDetail['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Rejected</Badge>;
      default:
        return null;
    }
  };

  if (!enquiry) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Enquiry not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/enquiries">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Enquiry #{enquiry.enquiryId || enquiry.firestoreId}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2 font-medium">Status:</span>
            {getStatusBadge(enquiry.status)}
          </div>
          <Select value={statusValue} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enquiry Details</CardTitle>
          <CardDescription>Received on {formatDate(enquiry.createdAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                <p className="font-medium">{enquiry.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
                <p>{enquiry.contact}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
              <p>{enquiry.company}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Scrap Type</h3>
              <p>{enquiry.scrapType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1 bg-slate-50 p-3 rounded-md">{enquiry.description}</p>
            </div>
            {enquiry.fileUrl && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Attached Document</h3>
                <a href={enquiry.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Document
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Conversation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(enquiry.replies?.length ?? 0) === 0 ? (
              <p className="text-center text-muted-foreground py-8">No replies yet</p>
            ) : (
              <div className="space-y-6">
                {enquiry.replies!.map((reply, index) => (
                  <div key={index} className={`flex ${reply.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-lg ${
                      reply.sender === 'admin'
                        ? 'bg-blue-100 text-blue-900'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">
                          {reply.sender === 'admin' ? 'Admin' : enquiry.name}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                      </div>
                      <p>{reply.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Separator className="my-6" />

            <div className="mt-6">
              <div className="flex items-start space-x-3">
                <Textarea
                  placeholder="Type your reply here..."
                  className="flex-1"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <Button onClick={handleSendReply} disabled={!replyMessage.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default EnquiryDetails;