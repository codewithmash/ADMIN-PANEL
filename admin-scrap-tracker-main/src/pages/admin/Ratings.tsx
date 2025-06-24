
// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Star, Search, FileX } from "lucide-react";
// import { ratingsService, Rating } from "@/services/ratingsService";

// const Ratings = () => {
//   const { toast } = useToast();
//   const [ratings, setRatings] = useState<Rating[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   // Mock data
//   const mockRatings: Rating[] = [
//     { 
//       id: 1, 
//       customerId: "CUST-001", 
//       customerName: "Rahul Sharma", 
//       partnerId: "PART-001",
//       partnerName: "Akash Gupta",
//       rating: 5, 
//       date: "15 Aug 2023", 
//       comment: "Very professional and punctual. The partner arrived exactly on time and was very polite. Will definitely use the service again.",
//       orderId: "ORD-001"
//     },
//     { 
//       id: 2, 
//       customerId: "CUST-002", 
//       customerName: "Priya Patel", 
//       partnerId: "PART-001",
//       partnerName: "Akash Gupta",
//       rating: 4, 
//       date: "12 Aug 2023", 
//       comment: "Good service overall. The collection was done efficiently, but the partner was slightly late.",
//       orderId: "ORD-002"
//     },
//     { 
//       id: 3, 
//       customerId: "CUST-003", 
//       customerName: "Amit Singh", 
//       partnerId: "PART-002",
//       partnerName: "Rajesh Kumar",
//       rating: 5, 
//       date: "10 Aug 2023", 
//       comment: "Excellent service! The partner was friendly and helped me understand the different types of scrap and their values.",
//       orderId: "ORD-003"
//     },
//     { 
//       id: 4, 
//       customerId: "CUST-004", 
//       customerName: "Sneha Gupta", 
//       partnerId: "PART-003",
//       partnerName: "Vijay Sharma",
//       rating: 3, 
//       date: "8 Aug 2023", 
//       comment: "The partner did their job, but wasn't very communicative. The weighing process could have been explained better.",
//       orderId: "ORD-004"
//     },
//     { 
//       id: 5, 
//       customerId: "CUST-005", 
//       customerName: "Neha Verma", 
//       partnerId: "PART-002",
//       partnerName: "Rajesh Kumar",
//       rating: 4, 
//       date: "5 Aug 2023", 
//       comment: "Good experience overall. The partner was polite and professional.",
//       orderId: "ORD-005"
//     },
//   ];

//   useEffect(() => {
//     const fetchRatings = async () => {
//       setLoading(true);
//       try {
//         // In production, use:
//         // const response = await ratingsService.getAllRatings();
//         // setRatings(response);
        
//         // For demo purposes:
//         await new Promise(resolve => setTimeout(resolve, 800));
//         setRatings(mockRatings);
//       } catch (error) {
//         console.error("Error fetching ratings:", error);
//         toast({
//           title: "Error",
//           description: "Failed to fetch ratings data. Please try again.",
//           variant: "destructive",
//           duration: 3000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRatings();
//   }, [toast]);

//   const filteredRatings = ratings.filter(rating => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       rating.partnerId.toLowerCase().includes(searchLower) ||
//       rating.partnerName.toLowerCase().includes(searchLower) ||
//       rating.customerName.toLowerCase().includes(searchLower) ||
//       rating.orderId.toLowerCase().includes(searchLower)
//     );
//   });

//   const calculateAverageRating = (partnerId: string) => {
//     const partnerRatings = ratings.filter(r => r.partnerId === partnerId);
//     if (partnerRatings.length === 0) return 0;
    
//     const sum = partnerRatings.reduce((acc, curr) => acc + curr.rating, 0);
//     return sum / partnerRatings.length;
//   };

//   // Get unique partner IDs and their average ratings
//   const partnerStats = ratings.reduce((acc: {[key: string]: {id: string, name: string, avg: number, count: number}}, rating) => {
//     if (!acc[rating.partnerId]) {
//       acc[rating.partnerId] = {
//         id: rating.partnerId,
//         name: rating.partnerName,
//         avg: 0,
//         count: 0
//       };
//     }
    
//     acc[rating.partnerId].avg = 
//       (acc[rating.partnerId].avg * acc[rating.partnerId].count + rating.rating) / 
//       (acc[rating.partnerId].count + 1);
//     acc[rating.partnerId].count += 1;
    
//     return acc;
//   }, {});

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Partner Ratings</h1>
//         <p className="text-muted-foreground">
//           Monitor and manage customer ratings for partners
//         </p>
//       </div>

//       <div className="relative w-full max-w-sm">
//         <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//         <Input
//           placeholder="Search by partner ID or name..."
//           className="pl-8 w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="grid gap-6 md:grid-cols-3">
//         {Object.values(partnerStats).map(partner => (
//           <Card key={partner.id}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">
//                     {partner.name}
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     {partner.id}
//                   </p>
//                   <div className="flex items-center mt-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         className={`h-4 w-4 ${i < Math.floor(partner.avg) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                       />
//                     ))}
//                     <span className="ml-2 text-sm font-medium">{partner.avg.toFixed(1)}</span>
//                     <span className="ml-1 text-xs text-muted-foreground">({partner.count})</span>
//                   </div>
//                 </div>
//                 <Button 
//                   variant="outline" 
//                   size="sm"
//                   onClick={() => setSearchTerm(partner.id)}
//                 >
//                   View
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Customer Feedback</CardTitle>
//           <CardDescription>
//             All ratings and reviews
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex justify-center py-8">
//               <div className="flex flex-col items-center">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//                 <p className="mt-2 text-sm text-muted-foreground">Loading ratings...</p>
//               </div>
//             </div>
//           ) : filteredRatings.length > 0 ? (
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Partner</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Order ID</TableHead>
//                   <TableHead>Rating</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Comment</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredRatings.map((rating) => (
//                   <TableRow key={rating.id}>
//                     <TableCell>
//                       <div>
//                         <p className="font-medium">{rating.partnerName}</p>
//                         <p className="text-xs text-muted-foreground">{rating.partnerId}</p>
//                       </div>
//                     </TableCell>
//                     <TableCell>{rating.customerName}</TableCell>
//                     <TableCell>{rating.orderId}</TableCell>
//                     <TableCell>
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <Star 
//                             key={i} 
//                             className={`h-4 w-4 ${i < rating.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                           />
//                         ))}
//                       </div>
//                     </TableCell>
//                     <TableCell>{rating.date}</TableCell>
//                     <TableCell className="max-w-xs truncate">{rating.comment}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           ) : (
//             <div className="text-center py-12">
//               <FileX className="h-12 w-12 mx-auto text-gray-300" />
//               <h3 className="mt-4 text-lg font-medium">No ratings found</h3>
//               <p className="mt-2 text-sm text-muted-foreground">
//                 {searchTerm ? 
//                   "No ratings match your search criteria. Try a different search term." : 
//                   "There are no ratings in the system yet."}
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Ratings;



import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star, Search, FileX } from "lucide-react";
import { ratingsService, Rating } from "@/services/ratingsService";

const Ratings = () => {
  const { toast } = useToast();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      try {
        const response = await ratingsService.getAllRatings();
        const fetchedRatings: Rating[] = response.ratings.map((apiRating: any, index: number) => ({
          id: index + 1, // You might need a better unique ID strategy if not provided by backend
          customerId: apiRating.customerId || 'N/A', // Assuming customerId might not always be present
          customerName: apiRating.customerName || 'Unknown Customer', // Assuming customerName might not always be present
          partnerId: apiRating.collectorId,
          partnerName: apiRating.collectorName,
          rating: apiRating.rating,
          date: apiRating.createdAt, // This is a string, consider formatting for display if needed
          comment: apiRating.review || 'No comment provided',
          orderId: apiRating.orderId || 'N/A', // Assuming orderId might not always be present
          userName:apiRating.userName
        }));
        setRatings(fetchedRatings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        toast({
          title: "Error",
          description: "Failed to fetch ratings data. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [toast]);

  const filteredRatings = ratings.filter(rating => {
    const searchLower = searchTerm.toLowerCase();
    return (
      rating.partnerId.toLowerCase().includes(searchLower) ||
      rating.partnerName.toLowerCase().includes(searchLower) ||
      rating.customerName.toLowerCase().includes(searchLower) ||
      rating.orderId.toLowerCase().includes(searchLower)
    );
  });

  const calculateAverageRating = (partnerId: string) => {
    const partnerRatings = ratings.filter(r => r.partnerId === partnerId);
    if (partnerRatings.length === 0) return 0;

    const sum = partnerRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / partnerRatings.length;
  };

  // Get unique partner IDs and their average ratings
  const partnerStats = ratings.reduce((acc: {[key: string]: {id: string, name: string, avg: number, count: number}}, rating) => {
    if (!acc[rating.partnerId]) {
      acc[rating.partnerId] = {
        id: rating.partnerId,
        name: rating.partnerName,
        avg: 0,
        count: 0
      };
    }

    acc[rating.partnerId].avg =
      (acc[rating.partnerId].avg * acc[rating.partnerId].count + rating.rating) /
      (acc[rating.partnerId].count + 1);
    acc[rating.partnerId].count += 1;

    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Partner Ratings</h1>
        <p className="text-muted-foreground">
          Monitor and manage customer ratings for partners
        </p>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by partner ID ..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {Object.values(partnerStats).map(partner => (
          <Card key={partner.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {partner.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {partner.id}
                  </p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(partner.avg) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{partner.avg.toFixed(1)}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({partner.count})</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchTerm(partner.id)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback</CardTitle>
          <CardDescription>
            All ratings and reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p className="mt-2 text-sm text-muted-foreground">Loading ratings...</p>
              </div>
            </div>
          ) : filteredRatings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRatings.map((rating) => (
                  <TableRow key={rating.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{rating.partnerName}</p>
                        <p className="text-xs text-muted-foreground">{rating.partnerId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{rating.userName}</TableCell>
                    <TableCell>{rating.orderId}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < rating.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{rating.date}</TableCell>
                    <TableCell className="max-w-xs truncate">{rating.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <FileX className="h-12 w-12 mx-auto text-gray-300" />
              <h3 className="mt-4 text-lg font-medium">No ratings found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {searchTerm ?
                  "No ratings match your search criteria. Try a different search term." :
                  "There are no ratings in the system yet."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Ratings;