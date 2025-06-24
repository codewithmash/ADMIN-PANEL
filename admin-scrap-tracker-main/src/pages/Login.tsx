
// import { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Loader2 } from 'lucide-react';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, loading } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     await login(email, password);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-admin-primary to-blue-900 p-4">
//       <div className="w-full max-w-md">
//         <Card className="border-0 shadow-xl">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-bold text-center">
//               Scrap Admin
//             </CardTitle>
//             <CardDescription className="text-center">
//               Enter your credentials to access the admin panel
//             </CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="admin@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   autoComplete="email"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Password</Label>
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   autoComplete="current-password"
//                 />
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button 
//                 type="submit" 
//                 className="w-full bg-admin-primary hover:bg-blue-800" 
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Please wait
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//         <div className="mt-4 text-center text-white text-opacity-80 text-sm">
//           <p>For demo purposes:</p>
//           <p>Admin: admin@example.com / admin123</p>
//           <p>Regular user: user@example.com / user123</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useFirebasePhoneAuth } from '@/hooks/useFirebasePhoneAuth';

const LoginPage = () => {
  // Email/Password login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, partnerLogin, loading } = useAuth();
  const { toast } = useToast();
  const {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    isOtpSent,
    loading: sendingOtp,
    verifying,
    sendOtp,
    verifyOtp,
    resetAuth
  } = useFirebasePhoneAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    try {
      await sendOtp(phoneNumber);
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone",
        duration: 3000,
      });
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      toast({
        title: "OTP Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await verifyOtp(otp);
      if (result.success) {
        await partnerLogin(result.user);
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast({
        title: "Verification Error",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-admin-primary to-blue-900 p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Scrap Management System
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access the dashboard
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="email">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="email">Email Login</TabsTrigger>
              <TabsTrigger value="phone">Phone Login</TabsTrigger>
            </TabsList>
            
            <TabsContent value="email">
              <form onSubmit={handleEmailLogin}>
                <CardContent className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-admin-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-admin-primary hover:bg-blue-800" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="phone">
              {!isOtpSent ? (
                <form onSubmit={handleSendOtp}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center">
                        <div className="flex items-center border border-input rounded-l-md px-3 py-2 bg-muted h-10">
                          <span>+91</span>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phoneNumber}
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setPhoneNumber(input);
                          }}
                          required
                          className="rounded-l-none"
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div id="recaptcha-container"></div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-admin-primary hover:bg-blue-800" 
                      disabled={sendingOtp || phoneNumber.length !== 10}
                    >
                      {sendingOtp ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending OTP
                        </>
                      ) : (
                        'Send OTP'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              ) : (
                <form onSubmit={handleOtpLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Button 
                          variant="link" 
                          type="button" 
                          onClick={resetAuth} 
                          className="p-0 h-auto text-admin-primary"
                        >
                          Change Number
                        </Button>
                      </div>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP sent to your phone"
                        value={otp}
                        onChange={(e) => {
                          const input = e.target.value.replace(/\D/g, '').slice(0, 6);
                          setOtp(input);
                        }}
                        required
                        maxLength={6}
                      />
                      <p className="text-sm text-muted-foreground">
                        OTP sent to +91 {phoneNumber}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full bg-admin-primary hover:bg-blue-800" 
                      disabled={verifying || otp.length < 4}
                    >
                      {verifying ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying
                        </>
                      ) : (
                        'Verify & Login'
                      )}
                    </Button>
                  </CardFooter>
                </form>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="px-8 pb-5">
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">Don't have a partner account?</p>
              <Link to="/partner/register" className="text-sm font-medium text-admin-primary hover:underline">
                Register as a Partner
              </Link>
            </div>
          </div>
        </Card>
        
        {/* <div className="mt-4 text-center text-white text-opacity-80 text-sm">
          <p>For demo purposes:</p>
          <p><strong>Email Login:</strong></p>
          <p>Admin: admin@example.com / admin123</p>
          <p>User: user@example.com / user123</p>
          <p><strong>Phone Login:</strong></p>
          <p>Use any valid phone number with Firebase OTP</p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;