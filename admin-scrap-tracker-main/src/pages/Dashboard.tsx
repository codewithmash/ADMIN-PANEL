import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, PieChart, Radar, ResponsiveContainer, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, Line, Pie, Cell, PolarGrid, PolarAngleAxis, RadarChart, PolarRadiusAxis } from 'recharts';
import { CircleDollarSign, TrendingUp, Truck, Users, Recycle, MapPin, Package, Handshake, Tag, Newspaper, ShoppingBag, MessageSquare, Megaphone } from 'lucide-react';

import { adminDashboardService } from '@/services/adminDashboardServices';
import { useToast } from "@/components/ui/use-toast";

// Mock data
const monthlyCollectionData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 1900 },
  { name: 'Mar', amount: 2000 },
  { name: 'Apr', amount: 2400 },
  { name: 'May', amount: 2700 },
  { name: 'Jun', amount: 3300 },
  { name: 'Jul', amount: 3800 },
  { name: 'Aug', amount: 3500 },
  { name: 'Sep', amoun2t: 4100 },
  { name: 'Oct', amount: 4700 },
  { name: 'Nov', amount: 5000 },
  { name: 'Dec', amount: 5500 },
];

const scrapTypeData = [
  { name: 'Metal', value: 45 },
  { name: 'Paper', value: 25 },
  { name: 'Plastic', value: 15 },
  { name: 'E-waste', value: 10 },
  { name: 'Glass', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState({});

  const loadData = async () => {
    try {
      const data = await adminDashboardService.getallCounts();
      setStats(data.counts);
      console.log("stats", data.counts);
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch dashboard data.", variant: "destructive" });
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your scrap management system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="h-6 w-6 text-admin-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Collections
                </p>
                <h3 className="text-2xl font-bold">{stats.totalCollections?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card> */}
        
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </p>
                <h3 className="text-2xl font-bold">{stats.totalCustomers?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card> */}
        
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <CircleDollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Revenue
                </p>
                <h3 className="text-2xl font-bold">${stats.totalRevenue?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card> */}
        
        {/* <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Recycle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Scrap (kg)
                </p>
                <h3 className="text-2xl font-bold">{stats.totalScrapWeight?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card> */}


        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-lime-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-lime-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <h3 className="text-2xl font-bold">{stats.users?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updated Cards based on provided data */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Zones
                </p>
                <h3 className="text-2xl font-bold">{stats.zones?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold">{stats.orders?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-cyan-100 p-3 rounded-full">
                <Handshake className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Partners
                </p>
                <h3 className="text-2xl font-bold">{stats.partners?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <Tag className="h-6 w-6 text-pink-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Scrap Types
                </p>
                <h3 className="text-2xl font-bold">{stats.scrap_types?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        
        
        {/* Removed "Total Blogs" card as per your request (data is 0) */}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-teal-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Buyers
                </p>
                <h3 className="text-2xl font-bold">{stats.buyers?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-fuchsia-100 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-fuchsia-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Bulk Enquiries
                </p>
                <h3 className="text-2xl font-bold">{stats.bulkEnquiries?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Buyer Enquiries
                </p>
                <h3 className="text-2xl font-bold">{stats.buyerEnquiry?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-violet-100 p-3 rounded-full">
                <Megaphone className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Campaign Enquiries
                </p>
                <h3 className="text-2xl font-bold">{stats.campaignEnquiry?.toLocaleString() || 0}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      {/* <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Monthly Collection Trends</CardTitle>
            <CardDescription>
              Total scrap collected each month in the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyCollectionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#3b82f6" name="Collection (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scrap Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of different types of scrap collected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scrapTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {scrapTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Region Performance</CardTitle>
            <CardDescription>
              Collection performance across different regions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                  { subject: 'North', A: 120, B: 110, fullMark: 150 },
                  { subject: 'South', A: 98, B: 130, fullMark: 150 },
                  { subject: 'East', A: 86, B: 130, fullMark: 150 },
                  { subject: 'West', A: 99, B: 100, fullMark: 150 },
                  { subject: 'Central', A: 85, B: 90, fullMark: 150 },
                ]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar name="Collections" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Target" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
};

export default Dashboard;