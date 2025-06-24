
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Search, Edit, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const receivedReviews = [
  { 
    id: 1, 
    customerName: "Rahul Sharma", 
    rating: 5, 
    date: "15 Aug 2023", 
    comment: "Very professional and punctual. The partner arrived exactly on time and was very polite. Will definitely use the service again.",
    orderId: "ORD-001"
  },
  { 
    id: 2, 
    customerName: "Priya Patel", 
    rating: 4, 
    date: "12 Aug 2023", 
    comment: "Good service overall. The collection was done efficiently, but the partner was slightly late.",
    orderId: "ORD-002"
  },
  { 
    id: 3, 
    customerName: "Amit Singh", 
    rating: 5, 
    date: "10 Aug 2023", 
    comment: "Excellent service! The partner was friendly and helped me understand the different types of scrap and their values.",
    orderId: "ORD-003"
  },
  { 
    id: 4, 
    customerName: "Sneha Gupta", 
    rating: 3, 
    date: "8 Aug 2023", 
    comment: "The partner did their job, but wasn't very communicative. The weighing process could have been explained better.",
    orderId: "ORD-004"
  }
];

const givenReviews = [
  { 
    id: 1,
    customerName: "Rahul Sharma",
    rating: 5,
    date: "15 Aug 2023",
    comment: "Great customer! Very organized scrap and was ready on time for the pickup.",
    orderId: "ORD-001"
  },
  { 
    id: 3,
    customerName: "Amit Singh",
    rating: 4,
    date: "10 Aug 2023",
    comment: "Pleasant interaction. Customer had sorted the scrap properly which made collection easier.",
    orderId: "ORD-003"
  }
];

const pendingReviews = [
  {
    id: 2,
    customerName: "Priya Patel",
    date: "12 Aug 2023",
    orderId: "ORD-002"
  },
  {
    id: 4,
    customerName: "Sneha Gupta",
    date: "8 Aug 2023",
    orderId: "ORD-004"
  }
];

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: ''
  });
  const { toast } = useToast();

  const handleWriteReview = (customer: any) => {
    setSelectedCustomer(customer);
    setReviewData({ rating: 5, comment: '' });
    setIsWriteReviewOpen(true);
  };

  const handleSubmitReview = () => {
    // In a real application, this would submit the review to the server
    setIsWriteReviewOpen(false);
    toast({
      title: "Review submitted",
      description: `Your review for ${selectedCustomer.customerName} has been submitted.`,
      duration: 3000,
    });
  };

  const filterReviews = (reviews: any[], searchTerm: string) => {
    if (!searchTerm) return reviews;
    
    return reviews.filter(review => 
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review.comment && review.comment.toLowerCase().includes(searchTerm.toLowerCase())) ||
      review.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground">
          Manage your customer reviews and feedback
        </p>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="received">
        <TabsList>
          <TabsTrigger value="received">Reviews from Customers</TabsTrigger>
          <TabsTrigger value="given">Reviews You've Given</TabsTrigger>
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
        </TabsList>
        
        {/* Received Reviews */}
        <TabsContent value="received">
          <Card>
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
              <CardDescription>
                Reviews and ratings customers have given you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filterReviews(receivedReviews, searchTerm).length > 0 ? (
                  filterReviews(receivedReviews, searchTerm).map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{review.customerName}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              for order {review.orderId} • {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                    <h3 className="mt-4 text-lg font-medium">No reviews found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {searchTerm ? "Try a different search term." : "You haven't received any reviews yet."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Given Reviews */}
        <TabsContent value="given">
          <Card>
            <CardHeader>
              <CardTitle>Your Reviews</CardTitle>
              <CardDescription>
                Reviews you've provided for your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filterReviews(givenReviews, searchTerm).length > 0 ? (
                  filterReviews(givenReviews, searchTerm).map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{review.customerName}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground ml-2">
                              for order {review.orderId} • {review.date}
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                      <p className="mt-3 text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                    <h3 className="mt-4 text-lg font-medium">No reviews found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {searchTerm ? "Try a different search term." : "You haven't given any reviews yet."}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Pending Reviews */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>
                Customers you still need to review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterReviews(pendingReviews, searchTerm).length > 0 ? (
                  filterReviews(pendingReviews, searchTerm).map(customer => (
                    <div key={customer.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{customer.customerName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Order {customer.orderId} • {customer.date}
                        </p>
                      </div>
                      <Button onClick={() => handleWriteReview(customer)}>
                        <Star className="mr-2 h-4 w-4" />
                        Write Review
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
                    <h3 className="mt-4 text-lg font-medium">No pending reviews</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You've reviewed all your customers!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Write Review Dialog */}
      <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review {selectedCustomer?.customerName}</DialogTitle>
            <DialogDescription>
              Share your experience with this customer
            </DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Rating</p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      className="p-0 bg-transparent border-0"
                      onClick={() => setReviewData({ ...reviewData, rating })}
                    >
                      <Star 
                        className={`h-6 w-6 ${rating <= reviewData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Comments</p>
                <Textarea
                  placeholder="Share your experience with this customer..."
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="h-32"
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsWriteReviewOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitReview}>Submit Review</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
