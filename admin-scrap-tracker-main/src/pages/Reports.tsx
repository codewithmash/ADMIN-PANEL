



// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { BarChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Cell } from 'recharts';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, Download, FileDown } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/components/ui/use-toast';
// import { DateRange } from 'react-day-picker';
// import { reportService } from '@/services/reportService'; // Assuming this service fetches the report data

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#A284F6', '#FF6B6B', '#2A9D8F']; // Extended colors for more categories

// const Reports = () => {
//   const [reportData, setReportData] = useState(null); // Initialize as null to indicate no data yet
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [dateRange, setDateRange] = useState<DateRange>({
//     from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), // Default to start of last month
//     to: new Date(), // Default to today
//   });

//   const [reportType, setReportType] = useState("monthly"); // State for selected report type
//   const { toast } = useToast();

//   // Helper function to format date for API
//   const formatDateForApi = (date) => {
//     return date ? format(date, 'yyyy-MM-dd') : '';
//   };

//   // Function to load report data from the service
//   const loadReportsData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!dateRange.from || !dateRange.to) {
//         toast({
//           title: "Date Range Required",
//           description: "Please select a valid 'From' and 'To' date for the report.",
//           variant: "destructive",
//         });
//         setLoading(false);
//         setReportData(null); // Clear data if dates are invalid
//         return;
//       }

//       const fromDate = formatDateForApi(dateRange.from);
//       const toDate = formatDateForApi(dateRange.to);

//       const data = await reportService.getAll(fromDate, toDate);

//       // Check if data.data is an empty object or has no entries
//       if (data.data && Object.keys(data.data).length === 0) {
//         setReportData(null); // Set to null if no data
//         toast({
//           title: "No Data Found",
//           description: "No report data exists for the selected date range.",
//           variant: "default",
//         });
//       } else {
//         console.log("data.data",data.data)
//         setReportData(data.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch reports:", err);
//       toast({ title: "Error", description: "Failed to fetch reports data. " + (err.message || "Please try again."), variant: "destructive" });
//       setError("Failed to load report data.");
//       setReportData(null); // Clear data on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect to load data initially when the component mounts
//   useEffect(() => {
//     loadReportsData();
//   }, []); // Empty dependency array: runs only once on mount

//   // Handler for downloading reports
//   const handleDownloadReport = () => {
//     // Check if there's any processed data before allowing download
//     if (!reportData || monthlyCollectionData.length === 0) {
//       toast({
//         title: "No Data to Download",
//         description: "Please generate a report with existing data first before attempting to download.",
//         variant: "default",
//       });
//       return;
//     }

//     toast({
//       title: "Report Download",
//       description: "Your report is being generated and will download shortly.",
//       duration: 3000,
//     });
//     const fromDate = formatDateForApi(dateRange.from);
//     const toDate = formatDateForApi(dateRange.to);
//     console.log("Downloading report for:", { fromDate, toDate, reportType });
//     // Implement actual download logic here, e.g., reportService.downloadReport({ fromDate, toDate, reportType });
//   };

//   // Data processing for charts and tables
//   // These should be re-calculated every time reportData changes
//   const monthlyCollectionData = [];
//   const scrapCategoryDistribution = {};
//   const customerPerformanceData = [
//     // Retaining mock data for customer performance.
//     // In a real app, this would also be fetched and processed from reportData.
//     { name: 'Jane Cooper', value: 1200 },
//     { name: 'Wade Warren', value: 900 },
//     { name: 'Esther Howard', value: 700 },
//     { name: 'Cameron Williamson', value: 500 },
//     { name: 'Brooklyn Simmons', value: 300 },
//   ];

//   if (reportData) {
//     const monthsOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//     monthsOrder.forEach(month => {
//       const monthData = reportData[month];
//       if (monthData) {
//         const entry = { month: month.substring(0, 3) };
//         for (const category in monthData) {
//           const quantity = monthData[category].quantity || 0;
//           const formattedCategory = category.toLowerCase().replace(/\s/g, '');
//           entry[formattedCategory] = quantity;
//           scrapCategoryDistribution[category] = (scrapCategoryDistribution[category] || 0) + quantity;
//         }
//         monthlyCollectionData.push(entry);
//       }
//     });
//   }

//   // Get all unique scrap categories for chart legends and table headers
//   const allScrapCategories = Array.from(new Set(
//     monthlyCollectionData.flatMap(month =>
//       Object.keys(month).filter(key => key !== 'month')
//     )
//   )).sort();

//   // Determine if there's any data to display charts/tables
//   const hasReportData = reportData && monthlyCollectionData.length > 0;
//   const hasScrapCategoryData = Object.keys(scrapCategoryDistribution).length > 0;


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <p>Loading reports...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-96 text-red-500">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
//         <p className="text-muted-foreground">
//           Generate and view detailed reports about scrap collection
//         </p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Report Parameters</CardTitle>
//           <CardDescription>
//             Customize your report by selecting date range and report type
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
//             <div className="space-y-2 md:w-1/3">
//               <label className="text-sm font-medium">Date Range</label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start text-left font-normal"
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {dateRange.from ? (
//                       dateRange.to ? (
//                         <>
//                           {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
//                         </>
//                       ) : (
//                         format(dateRange.from, "LLL dd, y")
//                       )
//                     ) : (
//                       "Select date range"
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     initialFocus
//                     mode="range"
//                     defaultMonth={dateRange.from}
//                     selected={dateRange}
//                     onSelect={setDateRange}
//                     numberOfMonths={2}
//                     className="pointer-events-auto"
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <div className="space-y-2 md:w-1/3">
//               <label className="text-sm font-medium">Report Type</label>
//               <Select value={reportType} onValueChange={setReportType}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select report type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="monthly">Monthly Collection Report</SelectItem>
//                   <SelectItem value="category">Category Distribution Report</SelectItem>
//                   <SelectItem value="customer">Customer Performance Report</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex items-end space-x-2 md:w-1/3">
//               <Button className="w-full" onClick={loadReportsData}>
//                 Submit
//               </Button>
//               <Button className="w-full" onClick={handleDownloadReport} variant="outline" disabled={!hasReportData}> {/* Disable if no data */}
//                 <Download className="mr-2 h-4 w-4" />
//                 Download
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Tabs defaultValue="charts" className="w-full">
//         <TabsList>
//           <TabsTrigger value="charts">Charts</TabsTrigger>
//           <TabsTrigger value="tables">Tables</TabsTrigger>
//         </TabsList>

//         <TabsContent value="charts" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2">
//             {/* Monthly Collection Trend Chart */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Monthly Collection Trend</CardTitle>
//                 <CardDescription>
//                   Amount of scrap collected by category over months
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 flex items-center justify-center">
//                   {hasReportData ? (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={monthlyCollectionData}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="month" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         {allScrapCategories.map((category, index) => (
//                           <Bar
//                             key={category}
//                             dataKey={category}
//                             name={category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1') + ' (kg)'}
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </BarChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-muted-foreground">No data existing for this period.</p>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasReportData}>
//                   <FileDown className="mr-2 h-4 w-4" />
//                   Export
//                 </Button>
//               </CardFooter>
//             </Card>

//             {/* Scrap Category Distribution Chart */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Scrap Category Distribution</CardTitle>
//                 <CardDescription>
//                   Percentage distribution by scrap type
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 flex items-center justify-center">
//                   {hasScrapCategoryData ? (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={Object.keys(scrapCategoryDistribution).map(category => ({
//                             name: category,
//                             value: (scrapCategoryDistribution[category] / Object.values(scrapCategoryDistribution).reduce((a, b) => a + b, 0)) * 100,
//                             quantity: scrapCategoryDistribution[category]
//                           }))}
//                           cx="50%"
//                           cy="50%"
//                           labelLine={false}
//                           outerRadius={80}
//                           fill="#8884d8"
//                           dataKey="value"
//                           label={({ name, quantity }) => `${name} (${quantity} kg)`}
//                         >
//                           {Object.keys(scrapCategoryDistribution).map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip formatter={(value, name, props) => [`${props.payload.quantity} kg (${value.toFixed(1)}%)`, name]} />
//                         <Legend />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-muted-foreground">No data existing for this period.</p>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasScrapCategoryData}>
//                   <FileDown className="mr-2 h-4 w-4" />
//                   Export
//                 </Button>
//               </CardFooter>
//             </Card>

//             {/* Top Performing Customers Chart (still using mock data) */}
//             <Card className="md:col-span-2">
//               <CardHeader>
//                 <CardTitle>Top Performing Customers</CardTitle>
//                 <CardDescription>
//                   Customers who contributed the most by scrap weight
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 flex items-center justify-center">
//                   {customerPerformanceData.length > 0 ? ( // Check if mock data exists
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={customerPerformanceData}
//                         layout="vertical"
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis type="number" />
//                         <YAxis type="category" dataKey="name" width={100} />
//                         <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
//                         <Legend />
//                         <Bar dataKey="value" name="Weight (kg)" fill="#3b82f6" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-muted-foreground">No customer performance data available.</p>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={customerPerformanceData.length === 0}>
//                   <FileDown className="mr-2 h-4 w-4" />
//                   Export
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="tables">
//           <Card>
//             <CardHeader>
//               <CardTitle>Tabular Report</CardTitle>
//               <CardDescription>
//                 Detailed report data in tabular format
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="rounded-md border overflow-x-auto">
//                 {hasReportData ? (
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
//                         {allScrapCategories.map(category => (
//                           <th key={category} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                             {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').replace(/([a-z])([A-Z])/g, '$1 $2')} (kg)
//                           </th>
//                         ))}
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total (kg)</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {monthlyCollectionData.map((monthData, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{monthData.month}</td>
//                           {allScrapCategories.map(category => (
//                             <td key={category} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                               {(monthData[category] || 0).toLocaleString()}
//                             </td>
//                           ))}
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {Object.keys(monthData).filter(key => key !== 'month').reduce((sum, key) => sum + (monthData[key] || 0), 0).toLocaleString()}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total</td>
//                         {allScrapCategories.map(category => (
//                           <td key={`total-${category}`} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                             {monthlyCollectionData.reduce((sum, month) => sum + (month[category] || 0), 0).toLocaleString()}
//                           </td>
//                         ))}
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {monthlyCollectionData.reduce((totalSum, month) => totalSum + Object.keys(month).filter(key => key !== 'month').reduce((sum, key) => sum + (month[key] || 0), 0), 0).toLocaleString()}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 ) : (
//                   <div className="p-6 text-center text-muted-foreground">
//                     No data existing for this period.
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-end">
//               <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasReportData}>
//                 <FileDown className="mr-2 h-4 w-4" />
//                 Export as CSV
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Reports;















// import { useState, useEffect } from 'react';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Button } from '@/components/ui/button';
// import { BarChart, PieChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Pie, Cell } from 'recharts';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// import { Calendar } from '@/components/ui/calendar';
// import { format } from 'date-fns';
// import { Calendar as CalendarIcon, Download, FileDown } from 'lucide-react';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { useToast } from '@/components/ui/use-toast';
// import { DateRange } from 'react-day-picker';
// import { reportService } from '@/services/reportService'; // Assuming this service fetches the report data

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#A284F6', '#FF6B6B', '#2A9D8F']; // Extended colors for more categories

// const Reports = () => {
//   const [reportData, setReportData] = useState(null); // Initialize as null to indicate no data yet
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [dateRange, setDateRange] = useState<DateRange>({
//     from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), // Default to start of last month
//     to: new Date(), // Default to today
//   });

//   const [reportType, setReportType] = useState("monthly"); // State for selected report type
//   const { toast } = useToast();

//   // Helper function to format date for API
//   const formatDateForApi = (date) => {
//     return date ? format(date, 'yyyy-MM-dd') : '';
//   };

//   // Function to load report data from the service
//   const loadReportsData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!dateRange.from || !dateRange.to) {
//         toast({
//           title: "Date Range Required",
//           description: "Please select a valid 'From' and 'To' date for the report.",
//           variant: "destructive",
//         });
//         setLoading(false);
//         setReportData(null); // Clear data if dates are invalid
//         return;
//       }

//       const fromDate = formatDateForApi(dateRange.from);
//       const toDate = formatDateForApi(dateRange.to);

//       // Simulate API call with the new data structure
//       const data = await reportService.getAll(fromDate, toDate);

//       // Check if data.data is null, empty, or doesn't have expected keys
//       if (!data.data || Object.keys(data.data).length === 0 || !data.data.scrapTypeTotals) {
//         setReportData(null); // Set to null if no data or invalid structure
//         toast({
//           title: "No Data Found",
//           description: "No report data exists for the selected date range or data format is unexpected.",
//           variant: "default",
//         });
//       } else {
//         console.log("data.data", data.data);
//         setReportData(data.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch reports:", err);
//       toast({ title: "Error", description: "Failed to fetch reports data. " + (err.message || "Please try again."), variant: "destructive" });
//       setError("Failed to load report data.");
//       setReportData(null); // Clear data on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   // useEffect to load data initially when the component mounts
//   useEffect(() => {
//     loadReportsData();
//   }, []); // Empty dependency array: runs only once on mount

//   // Handler for downloading reports
//   const handleDownloadReport = async () => { // Made async
//     // Check if there's any processed data before allowing download
//     if (!reportData || (!reportData.scrapTypeTotals && customerPerformanceData.length === 0)) {
//       toast({
//         title: "No Data to Download",
//         description: "Please generate a report with existing data first before attempting to download.",
//         variant: "default",
//       });
//       return;
//     }

//     toast({
//       title: "Report Download",
//       description: "Your report is being generated and will download shortly.",
//       duration: 3000,
//     });

//     try {
//         const fromDate = formatDateForApi(dateRange.from);
//         const toDate = formatDateForApi(dateRange.to);

//         // Call the download service
//         await reportService.downloadReport({ from: fromDate, to: toDate, type: reportType });

//         toast({
//             title: "Download Initiated",
//             description: "Your report download should begin shortly.",
//             variant: "success",
//         });

//     } catch (err) {
//         console.error("Failed to download report:", err);
//         toast({
//             title: "Download Failed",
//             description: "Could not download the report. " + (err.message || "Please try again."),
//             variant: "destructive",
//         });
//     }
//   };

//   // Data processing for charts and tables
//   // These should be re-calculated every time reportData changes

//   const scrapCategoryDistributionData = [];
//   const monthlyCollectionDataAdapted = []; // Adapted for the new data structure

//   if (reportData && reportData.scrapTypeTotals) {
//     // Process scrapTypeTotals for Pie Chart and Bar Chart (as overall totals)
//     for (const category in reportData.scrapTypeTotals) {
//       const quantity = reportData.scrapTypeTotals[category].quantity || 0;
//       if (quantity > 0) { // Only include categories with quantity > 0 for charts
//         scrapCategoryDistributionData.push({
//           name: category,
//           value: quantity, // Use quantity directly for both pie and bar chart
//         });
//       }
//     }

//     // Since the new data doesn't provide monthly breakdown,
//     // the "Monthly Collection Trend Chart" will show overall totals
//     // for each category over the selected date range.
//     // We'll create a single "entry" representing the entire period.
//     const overallPeriodEntry = { month: `${format(dateRange.from, 'MMM yy')} - ${format(dateRange.to, 'MMM yy')}` };
//     let hasQuantityDataInOverall = false;
//     for (const category in reportData.scrapTypeTotals) {
//       const quantity = reportData.scrapTypeTotals[category].quantity || 0;
//       if (quantity > 0) {
//         hasQuantityDataInOverall = true;
//       }
//       // Reformat category key for consistency with previous BarChart dataKey
//       const formattedCategory = category.toLowerCase().replace(/\s/g, '');
//       overallPeriodEntry[formattedCategory] = quantity;
//     }
//     if (hasQuantityDataInOverall) {
//       monthlyCollectionDataAdapted.push(overallPeriodEntry);
//     }
//   }


//   const customerPerformanceData = [
//     // Retaining mock data for customer performance.
//     // In a real app, this would also be fetched and processed from reportData.
//     { name: 'Jane Cooper', value: 1200 },
//     { name: 'Wade Warren', value: 900 },
//     { name: 'Esther Howard', value: 700 },
//     { name: 'Cameron Williamson', value: 500 },
//     { name: 'Brooklyn Simmons', value: 300 },
//   ];

//   // Get all unique scrap categories for chart legends and table headers from the new data
//   const allScrapCategories = reportData && reportData.scrapTypeTotals
//     ? Object.keys(reportData.scrapTypeTotals).sort()
//     : [];

//   // Determine if there's any data to display charts/tables
//   const hasReportData = reportData && reportData.scrapTypeTotals && Object.keys(reportData.scrapTypeTotals).length > 0;
//   const hasScrapCategoryData = scrapCategoryDistributionData.length > 0;


//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <p>Loading reports...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center h-96 text-red-500">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
//         <p className="text-muted-foreground">
//           Generate and view detailed reports about scrap collection
//         </p>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Report Parameters</CardTitle>
//           <CardDescription>
//             Customize your report by selecting date range and report type
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
//             <div className="space-y-2 md:w-1/3">
//               <label className="text-sm font-medium">Date Range</label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="w-full justify-start text-left font-normal"
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {dateRange.from ? (
//                       dateRange.to ? (
//                         <>
//                           {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
//                         </>
//                       ) : (
//                         format(dateRange.from, "LLL dd, y")
//                       )
//                     ) : (
//                       "Select date range"
//                     )}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   <Calendar
//                     initialFocus
//                     mode="range"
//                     defaultMonth={dateRange.from}
//                     selected={dateRange}
//                     onSelect={setDateRange}
//                     numberOfMonths={2}
//                     className="pointer-events-auto"
//                   />
//                 </PopoverContent>
//               </Popover>
//             </div>

//             <div className="space-y-2 md:w-1/3">
//               <label className="text-sm font-medium">Report Type</label>
//               <Select value={reportType} onValueChange={setReportType}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select report type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="monthly">Overall Collection Report</SelectItem> {/* Changed description */}
//                   <SelectItem value="category">Category Distribution Report</SelectItem>
//                   <SelectItem value="customer">Customer Performance Report</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex items-end space-x-2 md:w-1/3">
//               <Button className="w-full" onClick={loadReportsData}>
//                 Submit
//               </Button>
//               <Button className="w-full" onClick={handleDownloadReport} variant="outline" disabled={!hasReportData}> {/* Disable if no data */}
//                 <Download className="mr-2 h-4 w-4" />
//                 Download
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <Tabs defaultValue="charts" className="w-full">
//         <TabsList>
//           <TabsTrigger value="charts">Charts</TabsTrigger>
//           <TabsTrigger value="tables">Tables</TabsTrigger>
//         </TabsList>

//         <TabsContent value="charts" className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2">
//             {/* Overall Collection Summary Chart (Adapted) */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Overall Collection Summary</CardTitle>
//                 <CardDescription>
//                   Amount of scrap collected by category for the selected period
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 flex items-center justify-center">
//                   {monthlyCollectionDataAdapted.length > 0 ? (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={monthlyCollectionDataAdapted} // Using adapted data
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="month" /> {/* This will now show the combined date range */}
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         {allScrapCategories.map((category, index) => (
//                           <Bar
//                             key={category}
//                             dataKey={category.toLowerCase().replace(/\s/g, '')} // Use formatted category
//                             name={category + ' (kg)'} // Use original category name for legend
//                             fill={COLORS[index % COLORS.length]}
//                           />
//                         ))}
//                       </BarChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-muted-foreground">No data existing for this period.</p>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasReportData}>
//                   <FileDown className="mr-2 h-4 w-4" />
//                   Export
//                 </Button>
//               </CardFooter>
//             </Card>

//             {/* Scrap Category Distribution Chart */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Scrap Category Distribution</CardTitle>
//                 <CardDescription>
//                   Percentage distribution by scrap type
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 flex items-center justify-center">
//                   {hasScrapCategoryData ? (
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={scrapCategoryDistributionData}
//                           cx="50%"
//                           cy="50%"
//                           labelLine={false}
//                           outerRadius={90} // Slightly increased outerRadius for more space
//                           fill="#8884d8"
//                           dataKey="value"
//                           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} // Simpler label: Name (Percentage)
//                         >
//                           {scrapCategoryDistributionData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip formatter={(value, name, props) => [`${props.payload.value} kg`, name]} /> {/* Tooltip shows quantity and name */}
//                         <Legend />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-muted-foreground">No data existing for this period.</p>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasScrapCategoryData}>
//                   <FileDown className="mr-2 h-4 w-4" />
//                   Export
//                 </Button>
//               </CardFooter>
//             </Card>

//             {/* Top Performing Customers Chart (still using mock data) */}
//             <Card className="md:col-span-2">
//               <CardHeader>
//                 <CardTitle>Top Performing Customers</CardTitle>
//                 <CardDescription>
//                   Customers who contributed the most by scrap weight
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 flex items-center justify-center">
//                   {customerPerformanceData.length > 0 ? ( // Check if mock data exists
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={customerPerformanceData}
//                         layout="vertical"
//                         margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis type="number" />
//                         <YAxis type="category" dataKey="name" width={100} />
//                         <Tooltip formatter={(value) => [`${value} kg`, 'Weight']} />
//                         <Legend />
//                         <Bar dataKey="value" name="Weight (kg)" fill="#3b82f6" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   ) : (
//                     <p className="text-muted-foreground">No customer performance data available.</p>
//                   )}
//                 </div>
//               </CardContent>
//               <CardFooter className="flex justify-end">
//                 <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={customerPerformanceData.length === 0}>
//                   <FileDown className="mr-2 h-4 w-4" />
//                   Export
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="tables">
//           <Card>
//             <CardHeader>
//               <CardTitle>Tabular Report - Overall Collection</CardTitle> {/* Changed title */}
//               <CardDescription>
//                 Detailed report data in tabular format for the selected period
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="rounded-md border overflow-x-auto">
//                 {hasReportData ? (
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scrap Type</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity (kg)</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {Object.keys(reportData.scrapTypeTotals).map((category, index) => (
//                         <tr key={index}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category}</td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {(reportData.scrapTypeTotals[category].quantity || 0).toLocaleString()}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                             {(reportData.scrapTypeTotals[category].totalValue || 0).toLocaleString()}
//                           </td>
//                         </tr>
//                       ))}
//                       <tr className="bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grand Total</td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {(reportData.grandTotals.totalQuantity || 0).toLocaleString()}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           {(reportData.grandTotals.totalValue || 0).toLocaleString()}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 ) : (
//                   <div className="p-6 text-center text-muted-foreground">
//                     No data existing for this period.
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-end">
//               <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasReportData}>
//                 <FileDown className="mr-2 h-4 w-4" />
//                 Export as CSV
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default Reports;


import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Download, FileDown } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

// IMPORTANT: Ensure this path correctly points to your actual report service.
import {reportService} from '@/services/reportService';

// Define the DateRange type if not already defined in your project
interface DateRange {
  from?: Date;
  to?: Date;
}

// Define the shape of the data expected from reportService.getAll
interface ReportData {
  scrapTypeTotals: {
    [key: string]: {
      quantity: number;
      totalValue: number;
    };
  };
  grandTotals: {
    totalQuantity: number;
    totalValue: number;
  };
  dateRange: {
    from: string;
    to: string;
  };
}

// Define the shape of the data expected from reportService.getScrapCustomers
interface CustomerReportData {
  users: {
    userId: string;
    name: string;
    phone: string;
    totalQuantity: number;
    totalValue: number;
    orderCount: number;
  }[];
  grandTotals: {
    totalQuantity: number;
    totalValue: number;
    totalUsers: number;
    totalOrders: number;
  };
  dateRange: {
    from: string;
    to: string;
  };
}

// Color palette for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF194F', '#A2C2F8', '#8DD1E1'];

const Reports = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null); // State for overall scrap data
  const [customerReportData, setCustomerReportData] = useState<CustomerReportData | null>(null); // State for customer data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), // Default to start of last month
    to: new Date(), // Default to today
  });

  const [reportType, setReportType] = useState("monthly"); // State for selected report type
  const { toast } = useToast();

  // Helper function to format date for API
  const formatDateForApi = (date: Date | undefined) => {
    return date ? format(date, 'yyyy-MM-dd') : '';
  };

  // Function to load all report data from the service
  const loadReportsData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!dateRange.from || !dateRange.to) {
        toast({
          title: "Date Range Required",
          description: "Please select a valid 'From' and 'To' date for the report.",
          variant: "destructive",
        });
        setLoading(false);
        setReportData(null);
        setCustomerReportData(null);
        return;
      }

      const fromDate = formatDateForApi(dateRange.from);
      const toDate = formatDateForApi(dateRange.to);

      // --- Fetch Overall Collection Report Data ---
      try {
        const overallResponse = await reportService.getAll(fromDate, toDate);
        if (overallResponse.data && overallResponse.data.scrapTypeTotals && Object.keys(overallResponse.data.scrapTypeTotals).length > 0) {
          console.log("Overall report data fetched:", overallResponse.data);
          setReportData(overallResponse.data);
        } else {
          setReportData(null);
          toast({
            title: "No Overall Data",
            description: "No overall collection data found for the selected date range.",
            variant: "default",
          });
        }
      } catch (err: any) {
        console.error("Failed to fetch overall reports:", err);
        setReportData(null);
        toast({
          title: "Error fetching overall report",
          description: (err.message || "Failed to load overall report data."),
          variant: "destructive"
        });
      }

      // --- Fetch Customer Performance Report Data ---
      try {
        const customerResponse = await reportService.getScrapCustomers(fromDate, toDate);
        if (customerResponse.data && customerResponse.data.users && customerResponse.data.users.length > 0) {
          console.log("Customer report data fetched:", customerResponse.data);
          setCustomerReportData(customerResponse.data);
        } else {
          setCustomerReportData(null);
          toast({
            title: "No Customer Data",
            description: "No customer performance data found for the selected date range.",
            variant: "default",
          });
        }
      } catch (err: any) {
        console.error("Failed to fetch customer reports:", err);
        setCustomerReportData(null);
        toast({
          title: "Error fetching customer report",
          description: (err.message || "Failed to load customer report data."),
          variant: "destructive"
        });
      }

    } catch (err: any) {
      // This catch will only be hit if something fundamentally goes wrong before the individual fetches,
      // or if there's a global error handler for the service.
      // Individual fetch errors are now handled within their respective try/catch blocks.
      console.error("An unexpected error occurred during report loading:", err);
      setError("An unexpected error occurred. Please try again.");
      setReportData(null);
      setCustomerReportData(null);
    } finally {
      setLoading(false);
    }
  };

  // Effect to load data initially when the component mounts
  useEffect(() => {
    loadReportsData();
  }, []); // Empty dependency array: runs only once on mount

  // Effect to reload data when dateRange changes (e.g., from user selection)
  useEffect(() => {
    // Only trigger a reload if the dates have changed and the component is not in its initial loading state
    // where the first useEffect already handles it.
    if (dateRange.from && dateRange.to && !loading && (reportData || customerReportData || error)) {
      // Added a small debounce to prevent excessive API calls if user rapidly changes dates
      const handler = setTimeout(() => {
        loadReportsData();
      }, 300); // 300ms debounce
      return () => clearTimeout(handler);
    }
  }, [dateRange]); // Dependency array: re-run when dateRange changes

  // Handler for downloading reports
  const handleDownloadReport = async () => {
    const hasOverallData = reportData && reportData.scrapTypeTotals && Object.keys(reportData.scrapTypeTotals).length > 0;
    const hasCustomerData = customerReportData && customerReportData.users && customerReportData.users.length > 0;

    if (!hasOverallData && !hasCustomerData) {
      toast({
        title: "No Data to Download",
        description: "Please generate a report with existing data first before attempting to download.",
        variant: "default",
      });
      return;
    }

    toast({
      title: "Report Download",
      description: "Your report is being generated and will download shortly.",
      duration: 3000,
    });

    try {
      const fromDate = formatDateForApi(dateRange.from);
      const toDate = formatDateForApi(dateRange.to);

      // Call the download service. Assuming 'type' is used by your backend
      await reportService.downloadReport({ from: fromDate, to: toDate, type: reportType });

      toast({
        title: "Download Initiated",
        description: "Your report download should begin shortly.",
        variant: "success",
      });

    } catch (err: any) {
      console.error("Failed to download report:", err);
      toast({
        title: "Download Failed",
        description: "Could not download the report. " + (err.message || "Please try again."),
        variant: "destructive",
      });
    }
  };

  // Data processing for charts and tables
  // These should be re-calculated every time reportData or customerReportData changes

  const scrapCategoryDistributionData: { name: string, value: number }[] = [];
  const monthlyCollectionDataAdapted: any[] = []; // Adapted for the new data structure
  const customerPerformanceChartData: { name: string, value: number }[] = []; // Data for customer chart

  // Process overall report data (scrapTypeTotals)
  if (reportData && reportData.scrapTypeTotals) {
    for (const category in reportData.scrapTypeTotals) {
      const quantity = reportData.scrapTypeTotals[category].quantity || 0;
      if (quantity > 0) {
        scrapCategoryDistributionData.push({
          name: category,
          value: quantity,
        });
      }
    }

    // Adapt for the "Overall Collection Summary" Bar Chart
    const overallPeriodEntry: { [key: string]: any } = {
      month: `${format(dateRange.from!, 'MMM yy')} - ${format(dateRange.to!, 'MMM yy')}`
    };
    let hasQuantityDataInOverall = false;
    for (const category in reportData.scrapTypeTotals) {
      const quantity = reportData.scrapTypeTotals[category].quantity || 0;
      if (quantity > 0) {
        hasQuantityDataInOverall = true;
      }
      // Reformat category key for consistency with BarChart dataKey (lowercase, no spaces)
      const formattedCategory = category.toLowerCase().replace(/\s/g, '');
      overallPeriodEntry[formattedCategory] = quantity;
    }
    if (hasQuantityDataInOverall) {
      monthlyCollectionDataAdapted.push(overallPeriodEntry);
    }
  }

  // Process customerReportData for the "Top Performing Customers Chart"
  if (customerReportData && customerReportData.users) {
    // Sort customers by totalQuantity in descending order
    const sortedCustomers = [...customerReportData.users].sort((a, b) => b.totalQuantity - a.totalQuantity);
    sortedCustomers.forEach((user) => {
      if (user.totalQuantity > 0) {
        customerPerformanceChartData.push({
          name: user.name,
          value: user.totalQuantity,
        });
      }
    });
  }

  // Get all unique scrap categories for chart legends and table headers from the new data
  const allScrapCategories = reportData && reportData.scrapTypeTotals
    ? Object.keys(reportData.scrapTypeTotals).sort()
    : [];

  // Determine if there's any data to display charts/tables
  const hasOverallReportData = reportData && reportData.scrapTypeTotals && Object.keys(reportData.scrapTypeTotals).length > 0;
  const hasScrapCategoryChartData = scrapCategoryDistributionData.length > 0;
  const hasCustomerPerformanceChartData = customerPerformanceChartData.length > 0;
  const hasAnyReportData = hasOverallReportData || hasCustomerPerformanceChartData; // For enabling download button

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">
          Generate and view detailed reports about scrap collection
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Parameters</CardTitle>
          <CardDescription>
            Customize your report by selecting date range and report type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="space-y-2 md:w-1/3">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Select date range"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 md:w-1/3">
              <label className="text-sm font-medium">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Overall Collection Report</SelectItem>
                  <SelectItem value="category">Category Distribution Report</SelectItem>
                  <SelectItem value="customer">Customer Performance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2 md:w-1/3">
              <Button className="w-full" onClick={loadReportsData}>
                Submit
              </Button>
              <Button
                className="w-full"
                onClick={handleDownloadReport}
                disabled={!hasAnyReportData} // Disable if no data is present in either category
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Overall Collection Summary Chart (Adapted) */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Collection Summary</CardTitle>
                <CardDescription>
                  Amount of scrap collected by category for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  {monthlyCollectionDataAdapted.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyCollectionDataAdapted}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {allScrapCategories.map((category, index) => (
                          <Bar
                            key={category}
                            dataKey={category.toLowerCase().replace(/\s/g, '')}
                            name={category + ' (kg)'}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No data existing for this period.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasOverallReportData}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>

            {/* Scrap Category Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Scrap Category Distribution</CardTitle>
                <CardDescription>
                  Percentage distribution by scrap type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  {hasScrapCategoryChartData ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={scrapCategoryDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={90}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {scrapCategoryDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any, name: any, props: any) => [`${props.payload.value} kg`, name]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No data existing for this period.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasScrapCategoryChartData}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>

            {/* Top Performing Customers Chart (Now using fetched data) */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Customers</CardTitle>
                <CardDescription>
                  Customers who contributed the most by scrap weight
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  {hasCustomerPerformanceChartData ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={customerPerformanceChartData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={100} />
                        <Tooltip formatter={(value: any) => [`${value} kg`, 'Weight']} />
                        <Legend />
                        <Bar dataKey="value" name="Weight (kg)" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No customer performance data available.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasCustomerPerformanceChartData}>
                  <FileDown className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle>Tabular Report - Overall Collection</CardTitle>
              <CardDescription>
                Detailed report data in tabular format for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                {hasOverallReportData ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scrap Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity (kg)</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th> */}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(reportData!.scrapTypeTotals).map((category, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(reportData!.scrapTypeTotals[category].quantity || 0).toLocaleString()}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(reportData!.scrapTypeTotals[category].totalValue || 0).toLocaleString()}
                          </td> */}
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grand Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {(reportData!.grandTotals.totalQuantity || 0).toLocaleString()}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {(reportData!.grandTotals.totalValue || 0).toLocaleString()}
                        </td> */}
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No data existing for this period.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!hasOverallReportData}>
                <FileDown className="mr-2 h-4 w-4" />
                Export as CSV
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Tabular Report - Customer Performance</CardTitle>
              <CardDescription>
                Detailed customer performance data in tabular format for the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-x-auto">
                {customerReportData && customerReportData.users.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Quantity (kg)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Count</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customerReportData.users.map((user, index) => (
                        <tr key={user.userId || index}> {/* Using userId as key if available, fallback to index */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(user.totalQuantity || 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(user.totalValue || 0).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {(user.orderCount || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grand Total</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {(customerReportData.grandTotals.totalQuantity || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {(customerReportData.grandTotals.totalValue || 0).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {(customerReportData.grandTotals.totalOrders || 0).toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    No customer performance data existing for this period.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!(customerReportData && customerReportData.users.length > 0)}>
                <FileDown className="mr-2 h-4 w-4" />
                Export as CSV
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;