// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useToast } from "@/components/ui/use-toast";
// import { authService, LoginCredentials, OtpCredentials } from '@/services/authService';

// interface User {
//   id: string;
//   email?: string;
//   isAdmin: boolean;
//   isPartner?: boolean;
//   phone?: string;
//   name?: string;
//   vehicleType?: string;
//   locality?: string;
//   verified?: boolean;
//   approved?: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   partnerLogin: (phone: string, otp: string) => Promise<void>;
//   logout: () => Promise<void>;
//   isAuthenticated: boolean;
//   approvePartner: (partnerId: string) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Mock users for demonstration - will be replaced with API calls in production
// const MOCK_USERS = [
//   { id: '1', email: 'admin@example.com', password: 'admin123', isAdmin: true, isPartner: false },
//   { id: '2', email: 'user@example.com', password: 'user123', isAdmin: false, isPartner: false },
//   { id: '3', phone: '9876543210', otp: '1234', email: 'partner1@example.com', isAdmin: false, isPartner: true, name: 'Raj Kumar', vehicleType: 'tempo', locality: 'South Delhi', verified: true, approved: true },
//   { id: '4', phone: '8765432109', otp: '1234', email: 'partner2@example.com', isAdmin: false, isPartner: true, name: 'Amit Singh', vehicleType: 'auto', locality: 'North Delhi', verified: true, approved: false },
// ];

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [users, setUsers] = useState<any[]>(MOCK_USERS);
//   const [loading, setLoading] = useState<boolean>(true);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   useEffect(() => {
//     // Check if user is already logged in
//     const storedUser = localStorage.getItem('scrap-admin-user');
    
//     // if (storedUser) {
//     //   setUser(JSON.parse(storedUser));
//     // }
    
//     // In a real application, we would also verify the token with the backend
//     const verifyAuthentication = async () => {
//       setLoading(true);
//       try {
//         if (storedUser) {
//           // Verify token with backend
//           // const response = await authService.verifyToken();
//           // if response is valid, keep the user, otherwise clear localStorage and setUser(null)
//         }
//       } catch (error) {
//         console.error('Token verification failed:', error);
//         localStorage.removeItem('scrap-admin-user');
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     verifyAuthentication();
//   }, []);

//   const login = async (myScrapName: string, myScrapPass: string) => {
//     setLoading(true);
//     try {
//       // For production, replace this with actual API call
//       const response = await authService.login({ myScrapName, myScrapPass });
      
//       // Simulate API call delay
//       // await new Promise(resolve => setTimeout(resolve, 1000));

//       // const foundUser = users.find(
//       //   u => u.email === email && u.password === password
//       // );

//       if (response) {
//         // const { password, otp, ...userWithoutPassword } = foundUser as any;
        
//         // In production:
//         const userWithoutPassword = response;
//         userWithoutPassword["isAdmin"] = true
//         localStorage.setItem('token', response.token);
        
//         setUser(userWithoutPassword);
//         localStorage.setItem('scrap-admin-user', JSON.stringify(userWithoutPassword));
        
//         toast({
//           title: "Login successful",
//           description: `Welcome back!`,
//           duration: 3000,
//         });

//         navigate('/dashboard');
        
//         // if (userWithoutPassword.isAdmin) {
//           // navigate('/dashboard');
//         // } else if (userWithoutPassword.isPartner) {
//         //   // If partner is approved, go to dashboard, otherwise they'll see pending screen
//         //   navigate('/partner/dashboard');
//         // } else {
//         //   navigate('/dashboard');
//         // }
//       } else {
//         toast({
//           title: "Login failed",
//           description: "Invalid email or password",
//           variant: "destructive",
//           duration: 5000,
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast({
//         title: "Login error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//         duration: 5000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const partnerLogin = async (phone: string, otp: string) => {
//     setLoading(true);
//     try {
//       // For production, replace this with actual API call
//       // const response = await authService.partnerLogin({ phone, otp });
      
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const foundUser = users.find(
//         u => u.phone === phone && u.otp === otp
//       );

//       if (foundUser) {
//         const { otp, password, ...userWithoutOtp } = foundUser as any;
        
//         // In production:
//         // const userWithoutOtp = response.user;
//         // localStorage.setItem('token', response.token);
        
//         setUser(userWithoutOtp);
//         localStorage.setItem('scrap-admin-user', JSON.stringify(userWithoutOtp));
        
//         toast({
//           title: "Login successful",
//           description: `Welcome back, ${userWithoutOtp.name || phone}!`,
//           duration: 3000,
//         });
        
//         navigate('/partner/dashboard');
//       } else {
//         toast({
//           title: "Login failed",
//           description: "Invalid phone number or OTP",
//           variant: "destructive",
//           duration: 5000,
//         });
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast({
//         title: "Login error",
//         description: "An unexpected error occurred",
//         variant: "destructive",
//         duration: 5000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const approvePartner = async (partnerId: string) => {
//     try {
//       // For production, replace this with actual API call
//       // await authService.approvePartner(partnerId);
      
//       // Update the user in the users array
//       const updatedUsers = users.map(u => 
//         u.id === partnerId 
//           ? { ...u, approved: true } 
//           : u
//       );
      
//       setUsers(updatedUsers);
      
//       // If the current user is the one being approved, update their state too
//       if (user && user.id === partnerId) {
//         const updatedUser = { ...user, approved: true };
//         setUser(updatedUser);
//         localStorage.setItem('scrap-admin-user', JSON.stringify(updatedUser));
//       }
      
//       toast({
//         title: "Partner approved",
//         description: "Partner has been verified and approved successfully",
//         duration: 3000,
//       });
//     } catch (error) {
//       console.error("Partner approval error:", error);
//       toast({
//         title: "Approval error",
//         description: "Failed to approve partner",
//         variant: "destructive",
//         duration: 5000,
//       });
//     }
//   };

//   const logout = async () => {
//     try {
//       // For production, replace with actual API call
//       // await authService.logout();
      
//       setUser(null);
//       localStorage.removeItem('scrap-admin-user');
//       // In production also remove token:
//       // localStorage.removeItem('token');
      
//       toast({
//         title: "Logged out",
//         description: "You have been logged out successfully",
//         duration: 3000,
//       });
      
//       navigate('/login');
//     } catch (error) {
//       console.error("Logout error:", error);
//       toast({
//         title: "Logout error",
//         description: "An error occurred during logout",
//         variant: "destructive",
//         duration: 5000,
//       });
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       loading, 
//       login, 
//       partnerLogin, 
//       logout, 
//       isAuthenticated: !!user,
//       approvePartner 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };



import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { authService, LoginCredentials, OtpCredentials } from '@/services/authService';

import { partnerDashboardService } from '@/services/partnerDahboardService';



interface User {
  id: string;
  email?: string;
  isAdmin: boolean;
  isPartner?: boolean;
  phone?: string;
  name?: string;
  vehicleType?: string;
  locality?: string;
  verified?: boolean;
  approved?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  partnerLogin: (firebaseUser: any) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  approvePartner: (partnerId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // useEffect(() => {
  //   // Check if user is already logged in
  //   const verifyAuthentication = async () => {
  //     setLoading(true);
  //     try {
  //       // Verify token with backend
  //       // const response = await authService.verifyToken();
  //       // if (response && response.user) {
  //       //   setUser(response.user);
  //       // } else {
  //       //   setUser(null);
  //       // }
  //     } catch (error) {
  //       console.error('Token verification failed:', error);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   verifyAuthentication();
  // }, []);

  // const login = async (email: string, password: string) => {
  //   setLoading(true);
  //   try {
  //     // const response = await authService.login({myScrapName: email,myScrapPass: password });


  //     const response = await authService.login({
  //       myScrapName: email,
  //       myScrapPass: password
  //     });

  //     console.log("response",response)
      
  //     if (response && response.user) {
  //       console.log("response",response)
  //       setUser(response.admin);
        
  //       toast({
  //         title: "Login successful",
  //         description: `Welcome back, ${response.user.name || email}!`,
  //         duration: 3000,
  //       });

  //       navigate('/dashboard');
        
  //       // if (response.user.isAdmin) {
  //       //   navigate('/dashboard');
  //       // } else if (response.user.isPartner) {
  //       //   navigate('/partner/dashboard');
  //       // } else {
  //       //   navigate('/dashboard');
  //       // }
  //     } else {
  //       toast({
  //         title: "Login failed",
  //         description: "Invalid email or password",
  //         variant: "destructive",
  //         duration: 5000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     toast({
  //       title: "Login error",
  //       description: "An unexpected error occurred",
  //       variant: "destructive",
  //       duration: 5000,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };




    useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('scrap-admin-user');
    
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser));
    // }
    
    // In a real application, we would also verify the token with the backend
    const verifyAuthentication = async () => {
      setLoading(true);
      try {
        if (storedUser) {
          // Verify token with backend
          // const response = await authService.verifyToken();
          // if response is valid, keep the user, otherwise clear localStorage and setUser(null)
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('scrap-admin-user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuthentication();
  }, []);

  const login = async (myScrapName: string, myScrapPass: string) => {
    setLoading(true);
    try {
      // For production, replace this with actual API call
      const response = await authService.login({ myScrapName, myScrapPass });
      
      // Simulate API call delay
      // await new Promise(resolve => setTimeout(resolve, 1000));

      // const foundUser = users.find(
      //   u => u.email === email && u.password === password
      // );

      if (response) {
        // const { password, otp, ...userWithoutPassword } = foundUser as any;
        
        // In production:
        const userWithoutPassword = response;
        userWithoutPassword["isAdmin"] = true
        localStorage.setItem('token', response.token);
        
        setUser(userWithoutPassword);
        localStorage.setItem('scrap-admin-user', JSON.stringify(userWithoutPassword));
        
        toast({
          title: "Login successful",
          description: `Welcome back!`,
          duration: 3000,
        });

        navigate('/dashboard');
        
        // if (userWithoutPassword.isAdmin) {
          // navigate('/dashboard');
        // } else if (userWithoutPassword.isPartner) {
        //   // If partner is approved, go to dashboard, otherwise they'll see pending screen
        //   navigate('/partner/dashboard');
        // } else {
        //   navigate('/dashboard');
        // }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const partnerLogin = async (firebaseUser: any) => {
    setLoading(true);
    try {
      // Create user object from Firebase user

      const response = await partnerDashboardService.getPartnerStatus(firebaseUser.phone)
      const verified = response.status == "approved" ? true : false
      const user = {
        id: firebaseUser.id,
        phone: firebaseUser.phone,
        isPartner: true,
        status: response.status,
        // verified: firebaseUser.verified,
        verified: verified,
        approved: verified, // You might want to check this against your backend
        name: `Partner ${firebaseUser.phone}` // Default name
      };

      console.log("status",response.status)
      
      setUser(user);
      
      // Store user info in sessionStorage
      sessionStorage.setItem('user', JSON.stringify(user));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
        duration: 3000,
      });
      
      navigate('/partner/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const approvePartner = async (partnerId: string) => {
    try {
      const response = await authService.approvePartner(partnerId);
      
      if (response && response.success) {
        // If the current user is the one being approved, update their state too
        if (user && user.id === partnerId) {
          setUser({...user, approved: true});
        }
        
        toast({
          title: "Partner approved",
          description: "Partner has been verified and approved successfully",
          duration: 3000,
        });
        return;
      }
      
      toast({
        title: "Approval error",
        description: "Failed to approve partner",
        variant: "destructive",
        duration: 5000,
      });
    } catch (error) {
      console.error("Partner approval error:", error);
      toast({
        title: "Approval error",
        description: "Failed to approve partner",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const logout = async () => {
    try {
      // await authService.logout();
      
      setUser(null);
      sessionStorage.removeItem('user');
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
        duration: 3000,
      });
      
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An error occurred during logout",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      partnerLogin, 
      logout, 
      isAuthenticated: !!user,
      approvePartner 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
