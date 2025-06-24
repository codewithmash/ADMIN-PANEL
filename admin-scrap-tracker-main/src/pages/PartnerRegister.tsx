import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2, Upload, FileCheck } from 'lucide-react';
import { authService } from '@/services';

const formSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Phone number must be 10 digits.' }).max(10),
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email().optional().or(z.literal('')),
  vehicleType: z.string().min(1, { message: 'Please select your vehicle type.' }),
  address: z.string().min(5, { message: 'Please enter your full address.' }),
  bankName: z.string().min(2, { message: 'Bank name is required' }),
  accountNumber: z.string().min(5, { message: 'Account number is required' }),
  ifscCode: z.string().min(5, { message: 'IFSC code is required' }),
  accountHolderName: z.string().min(2, { message: 'Account holder name is required' }),
});

const PartnerRegister = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [files, setFiles] = useState<Record<string, File | null>>({
    profilePhoto: null,
    aadhaarFront: null,
    aadhaarBack: null,
    panCard: null,
    drivingLicense: null,
    vehicleRC: null
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
      fullName: '',
      email: '',
      vehicleType: '',
      address: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: '',
    },
  });

  const handleFileChange = (fieldName: string, file: File | null) => {
    setFiles(prev => ({
      ...prev,
      [fieldName]: file
    }));
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Prepare form data
      const formData = new FormData();
      
      // Append all form values
      Object.entries(values).forEach(([key, value]) => {
        if (value !== '') {
          formData.append(key, value);
        }
      });
      
      // Append bank details as JSON
      const bankDetails = {
        bankName: values.bankName,
        accountNumber: values.accountNumber,
        ifscCode: values.ifscCode,
        accountHolderName: values.accountHolderName
      };
      formData.append('bankDetails', JSON.stringify(bankDetails));

      console.log("JSON.stringify(bankDetails)",JSON.stringify(bankDetails))
      
      // Append all files
      Object.entries(files).forEach(([fieldName, file]) => {
        if (file) {
          formData.append(fieldName, file);
        }
      });

      console.log("formData",formData)


      // for (let [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }

      // const formDataObj = {};
      //   formData.forEach((value, key) => {
      //     formDataObj[key] = value;
      //   });

      // const response = await authService.registerPartner(formDataObj);
      
      // Send to backend
      const response = await authService.registerPartner(formData);
      
      setRegistrationComplete(true);
      toast({
        title: "Registration Successful",
        description: "Your application has been submitted for review. You'll be notified once approved.",
        duration: 5000,
      });
      
      // Navigate to login after 5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 5000);
      
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "There was an error submitting your information. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onFirstStepSubmit = async () => {
    const isValid = await form.trigger([
      'phoneNumber',
      'fullName',
      'vehicleType',
      'address'
    ]);
    
    if (isValid) {
      setStep(2);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-admin-primary to-blue-900 p-4">
      <div className="w-full max-w-2xl">
        {!registrationComplete ? (
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Partner Registration
              </CardTitle>
              <CardDescription className="text-center">
                Complete the following steps to register as a partner
              </CardDescription>
              <div className="flex justify-center mt-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-admin-primary text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                  <div className={`w-16 h-1 ${step > 1 ? 'bg-admin-primary' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-admin-primary text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <Form {...form}>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <div className="flex items-center border border-input rounded-l-md px-3 py-2 bg-muted h-10">
                                  <span>+91</span>
                                </div>
                                <Input 
                                  placeholder="10-digit number" 
                                  className="rounded-l-none" 
                                  {...field} 
                                  onChange={(e) => {
                                    const input = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    field.onChange(input);
                                  }}
                                  maxLength={10}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your email" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="vehicleType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vehicle Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select vehicle type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Auto">Auto</SelectItem>
                                <SelectItem value="Tempo">Tempo</SelectItem>
                                <SelectItem value="Lorry">Lorry</SelectItem>
                                <SelectItem value="Bike">Bike</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Full Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Your complete address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-between mt-6">
                      <Link to="/login">
                        <Button variant="outline" type="button">Back to Login</Button>
                      </Link>
                      <Button 
                        type="button" 
                        className="bg-admin-primary hover:bg-blue-800"
                        onClick={onFirstStepSubmit}
                      >
                        Next: Bank & Documents
                      </Button>
                    </div>
                  </form>
                </Form>
              )}

              {step === 2 && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <h3 className="text-lg font-medium">Bank Account Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Bank name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Account number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ifscCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IFSC Code</FormLabel>
                            <FormControl>
                              <Input placeholder="IFSC code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="accountHolderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Holder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Name as in bank account" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <h3 className="text-lg font-medium mt-6">Upload Required Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Please upload clear images of the following documents for verification.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="profilePhoto">Profile Photo</Label>
                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm text-muted-foreground">Recent passport size photo</p>
                          <Input 
                            id="profilePhoto" 
                            type="file" 
                            className="mt-2" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
                          />
                          {files.profilePhoto && (
                            <p className="text-sm text-green-600 mt-1">{files.profilePhoto.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aadhaarFront">Aadhaar Card (Front)</Label>
                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <Input 
                            id="aadhaarFront" 
                            type="file" 
                            className="mt-2" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange('aadhaarFront', e.target.files?.[0] || null)}
                          />
                          {files.aadhaarFront && (
                            <p className="text-sm text-green-600 mt-1">{files.aadhaarFront.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aadhaarBack">Aadhaar Card (Back)</Label>
                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <Input 
                            id="aadhaarBack" 
                            type="file" 
                            className="mt-2" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange('aadhaarBack', e.target.files?.[0] || null)}
                          />
                          {files.aadhaarBack && (
                            <p className="text-sm text-green-600 mt-1">{files.aadhaarBack.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="panCard">PAN Card</Label>
                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <Input 
                            id="panCard" 
                            type="file" 
                            className="mt-2" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange('panCard', e.target.files?.[0] || null)}
                          />
                          {files.panCard && (
                            <p className="text-sm text-green-600 mt-1">{files.panCard.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="drivingLicense">Driving License</Label>
                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <Input 
                            id="drivingLicense" 
                            type="file" 
                            className="mt-2" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange('drivingLicense', e.target.files?.[0] || null)}
                          />
                          {files.drivingLicense && (
                            <p className="text-sm text-green-600 mt-1">{files.drivingLicense.name}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vehicleRC">Vehicle RC</Label>
                        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
                          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                          <Input 
                            id="vehicleRC" 
                            type="file" 
                            className="mt-2" 
                            accept="image/*" 
                            onChange={(e) => handleFileChange('vehicleRC', e.target.files?.[0] || null)}
                          />
                          {files.vehicleRC && (
                            <p className="text-sm text-green-600 mt-1">{files.vehicleRC.name}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button 
                        variant="outline" 
                        type="button" 
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-admin-primary hover:bg-blue-800"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          'Submit Application'
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl text-center p-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-admin-primary rounded-full flex items-center justify-center text-white">
                <FileCheck className="h-8 w-8" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Application Submitted!
              </CardTitle>
              <CardDescription className="text-lg max-w-md mx-auto">
                Thank you for applying to be our partner. We are reviewing your documents.
              </CardDescription>
              <div className="bg-blue-50 p-4 rounded-lg mt-4 text-admin-primary">
                <p className="font-medium">What happens next?</p>
                <ul className="text-left list-disc pl-5 mt-2">
                  <li>Our team will verify your documentation</li>
                  <li>You'll receive an approval notification on your phone</li>
                  <li>After approval, you can start accepting pickups</li>
                </ul>
              </div>
              <p className="text-muted-foreground mt-6">
                Redirecting you to login page in a few seconds...
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PartnerRegister;