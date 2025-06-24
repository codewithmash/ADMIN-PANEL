
import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowUpCircle, 
  BarChart3, 
  LineChart as LineChartIcon, 
  Star 
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Mock data for charts
const monthlyData = [
  { name: 'Jan', collections: 22, earnings: 6500 },
  { name: 'Feb', collections: 28, earnings: 7800 },
  { name: 'Mar', collections: 35, earnings: 9200 },
  { name: 'Apr', collections: 29, earnings: 8100 },
  { name: 'May', collections: 33, earnings: 8900 },
  { name: 'Jun', collections: 39, earnings: 10600 },
  { name: 'Jul', collections: 42, earnings: 11300 },
  { name: 'Aug', collections: 44, earnings: 12100 },
  { name: 'Sep', collections: 40, earnings: 10800 },
  { name: 'Oct', collections: 38, earnings: 10200 },
  { name: 'Nov', collections: 32, earnings: 8700 },
  { name: 'Dec', collections: 30, earnings: 8200 },
];

const weeklyData = [
  { name: 'Mon', collections: 5, earnings: 1480 },
  { name: 'Tue', collections: 8, earnings: 2120 },
  { name: 'Wed', collections: 10, earnings: 2600 },
  { name: 'Thu', collections: 7, earnings: 1920 },
  { name: 'Fri', collections: 9, earnings: 2380 },
  { name: 'Sat', collections: 12, earnings: 3100 },
  { name: 'Sun', collections: 4, earnings: 1150 },
];

const completionRateData = [
  { month: 'Jan', rate: 94 },
  { month: 'Feb', rate: 96 },
  { month: 'Mar', rate: 92 },
  { month: 'Apr', rate: 98 },
  { month: 'May', rate: 95 },
  { month: 'Jun', rate: 97 },
  { month: 'Jul', rate: 99 },
  { month: 'Aug', rate: 98 },
  { month: 'Sep', rate: 96 },
  { month: 'Oct', rate: 97 },
  { month: 'Nov', rate: 95 },
  { month: 'Dec', rate: 98 },
];

const ratingsData = [
  { date: '2023-06-12', customer: 'Priya Sharma', rating: 5, feedback: 'Very punctual and professional service!' },
  { date: '2023-06-10', customer: 'Rahul Verma', rating: 4, feedback: 'Good service, but was 15 minutes late.' },
  { date: '2023-06-08', customer: 'Anjali Gupta', rating: 5, feedback: 'Excellent service, very thorough.' },
  { date: '2023-06-05', customer: 'Vikram Singh', rating: 3, feedback: 'Average service. Could be more organized.' },
  { date: '2023-06-02', customer: 'Neha Patel', rating: 5, feedback: 'Great experience. Will definitely use again.' },
  { date: '2023-05-28', customer: 'Kiran Reddy', rating: 4, feedback: 'Good collection service. Very professional.' },
  { date: '2023-05-25', customer: 'Mohammad Ali', rating: 5, feedback: 'Prompt and efficient. Highly recommended.' },
];

const effortMilestoneData = [
  {
    name: '100 Collections',
    description: 'Complete 100 successful collections',
    progress: 98,
    reward: '₹1,000 bonus',
    completed: false
  },
  {
    name: 'Perfect Month',
    description: 'Complete a month with 100% on-time pickups',
    progress: 100,
    reward: '₹2,000 bonus',
    completed: true
  },
  {
    name: '5-Star Service',
    description: 'Achieve an average rating of 4.8+ for 3 months',
    progress: 95,
    reward: 'Premium partner badge',
    completed: false
  },
  {
    name: 'Eco Warrior',
    description: 'Collect over 1000kg of recyclable materials',
    progress: 100,
    reward: 'Certificate of recognition',
    completed: true
  }
];

const Performance = () => {
  const [period, setPeriod] = useState('monthly');
  const [dataType, setDataType] = useState('collections');
  
  const chartData = period === 'monthly' ? monthlyData : weeklyData;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Performance Dashboard</h1>
        <div className="flex gap-2">
          <Select defaultValue="monthly" onValueChange={(value) => setPeriod(value)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
              Collections
            </CardTitle>
            <CardDescription>
              Total collections {period === 'monthly' ? 'this year' : 'this week'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {chartData.reduce((sum, item) => sum + item.collections, 0)}
            </div>
            <div className="text-sm text-muted-foreground mt-1 flex items-center">
              <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">8%</span>
              <span className="ml-1">from previous {period}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <LineChartIcon className="mr-2 h-5 w-5 text-muted-foreground" />
              Earnings
            </CardTitle>
            <CardDescription>
              Total earnings {period === 'monthly' ? 'this year' : 'this week'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ₹{chartData.reduce((sum, item) => sum + item.earnings, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1 flex items-center">
              <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="ml-1">from previous {period}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Star className="mr-2 h-5 w-5 text-muted-foreground" />
              Average Rating
            </CardTitle>
            <CardDescription>
              Based on customer feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.7</div>
            <div className="flex text-yellow-400 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill={i < 4 ? "currentColor" : "none"} className="h-4 w-4" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="charts">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">Performance Charts</TabsTrigger>
          <TabsTrigger value="ratings">Customer Ratings</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Collections & Earnings Trend</CardTitle>
              <div className="flex justify-end">
                <Select defaultValue="collections" onValueChange={setDataType}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collections">Collections</SelectItem>
                    <SelectItem value="earnings">Earnings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => {
                        return dataType === 'earnings' ? [`₹${value}`, 'Earnings'] : [value, 'Collections'];
                      }}
                    />
                    <Bar 
                      dataKey={dataType} 
                      fill="#1e40af" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pickup Completion Rate</CardTitle>
              <CardDescription>
                Percentage of pickups completed on time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={completionRateData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Completion Rate']} />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#1e40af" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ratings">
          <Card>
            <CardHeader>
              <CardTitle>Recent Customer Feedback</CardTitle>
              <CardDescription>
                Last 7 ratings from your customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Recent customer feedback and ratings</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Feedback</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ratingsData.map((rating, index) => (
                    <TableRow key={index}>
                      <TableCell>{rating.date}</TableCell>
                      <TableCell>{rating.customer}</TableCell>
                      <TableCell>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              fill={i < rating.rating ? "currentColor" : "none"} 
                              className="h-4 w-4" 
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{rating.feedback}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="milestones">
          <Card>
            <CardHeader>
              <CardTitle>Performance Milestones</CardTitle>
              <CardDescription>
                Complete these goals to earn bonuses and recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {effortMilestoneData.map((milestone, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{milestone.name}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                      {milestone.completed ? (
                        <Badge className="bg-green-600">Completed</Badge>
                      ) : (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          In Progress
                        </Badge>
                      )}
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full mb-2">
                      <div 
                        className="h-2 bg-admin-primary rounded-full" 
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Progress: {milestone.progress}%</span>
                      <span className="font-medium">Reward: {milestone.reward}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;
