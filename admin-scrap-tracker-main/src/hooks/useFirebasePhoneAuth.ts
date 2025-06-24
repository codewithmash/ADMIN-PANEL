// import { useState, useEffect, useRef } from 'react';
// import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
// import { auth } from '@/config/firebase';

// export const useFirebasePhoneAuth = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [otp, setOtp] = useState('');
//   const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [loading, setSending] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [authReady, setAuthReady] = useState(false);
//   const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

//   useEffect(() => {
//     // Wait for auth to be ready
//     const checkAuthReady = () => {
//       if (auth && typeof auth.app !== 'undefined') {
//         setAuthReady(true);
//       } else {
//         // Retry after a short delay
//         setTimeout(checkAuthReady, 100);
//       }
//     };
    
//     checkAuthReady();
//   }, []);

//   useEffect(() => {
//     if (!authReady || !auth) return;
    
//     const initializeRecaptcha = async () => {
//       try {
//         // Clear any existing recaptcha
//         // if (recaptchaVerifierRef.current) {
//         //   recaptchaVerifierRef.current.clear();
//         // }

//         // // Wait a bit to ensure DOM is ready
//         // await new Promise(resolve => setTimeout(resolve, 100));
        
//         // recaptchaVerifierRef.current = new RecaptchaVerifier(
//         //   'recaptcha-container', 
//         //   {
//         //     size: 'invisible',
//         //     callback: (response: any) => {
//         //       console.log('reCAPTCHA verified:', response);
//         //     },
//         //     'expired-callback': () => {
//         //       console.log('reCAPTCHA expired');
//         //       resetRecaptcha();
//         //     }
//         //   },
//         //   auth // Pass auth as third parameter
//         // );


//         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//             size: 'invisible',
//             callback: (response) => {
//                 console.log("reCAPTCHA solved");
//             }
//             });
//       } catch (error) {
//         console.error('Error initializing reCAPTCHA:', error);
//       }
//     };

//     initializeRecaptcha();

//     return () => {
//       if (recaptchaVerifierRef.current) {
//         try {
//           recaptchaVerifierRef.current.clear();
//         } catch (error) {
//           console.error('Error clearing reCAPTCHA:', error);
//         }
//       }
//     };
//   }, [authReady]);

//   const resetRecaptcha = async () => {
//     if (!authReady || !auth) return;
    
//     try {
//       if (recaptchaVerifierRef.current) {
//         recaptchaVerifierRef.current.clear();
//       }
      
//       // Wait a bit before recreating
//       await new Promise(resolve => setTimeout(resolve, 100));
      
//       recaptchaVerifierRef.current = new RecaptchaVerifier(
//         'recaptcha-container',
//         {
//           size: 'invisible',
//           callback: (response: any) => {
//             console.log('reCAPTCHA verified:', response);
//           },
//           'expired-callback': () => {
//             console.log('reCAPTCHA expired');
//           }
//         },
//         auth // Pass auth as third parameter
//       );
//     } catch (error) {
//       console.error('Error resetting reCAPTCHA:', error);
//     }
//   };

//   const sendOtp = async (phone: string) => {
//     if (!authReady || !auth) {
//       throw new Error('Firebase Auth not ready');
//     }

//     setSending(true);
//     try {
//       const formattedPhoneNumber = `+91${phone}`;
      
//       // Initialize recaptcha if not already done
//       if (!recaptchaVerifierRef.current) {
//         await resetRecaptcha();
//       }
      
//       if (!recaptchaVerifierRef.current) {
//         throw new Error('reCAPTCHA not initialized');
//       }

//       const confirmation = await signInWithPhoneNumber(
//         auth,
//         formattedPhoneNumber,
//         recaptchaVerifierRef.current
//       );
      
//       setConfirmationResult(confirmation);
//       setIsOtpSent(true);
//       return { success: true };
//     } catch (error: any) {
//       console.error('Error sending OTP:', error);
//       await resetRecaptcha();
//       throw new Error(error.message || 'Failed to send OTP');
//     } finally {
//       setSending(false);
//     }
//   };

//   const verifyOtp = async (otpCode: string) => {
//     if (!confirmationResult) {
//       throw new Error('No confirmation result available');
//     }
    
//     setVerifying(true);
//     try {
//       const result = await confirmationResult.confirm(otpCode);
//       return {
//         success: true,
//         user: {
//           id: result.user.uid,
//           phone: result.user.phoneNumber,
//           isPartner: true,
//           verified: true
//         }
//       };
//     } catch (error: any) {
//       console.error('Error verifying OTP:', error);
//       throw new Error(error.message || 'Invalid OTP');
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const resetAuth = () => {
//     setPhoneNumber('');
//     setOtp('');
//     setConfirmationResult(null);
//     setIsOtpSent(false);
//     setSending(false);
//     setVerifying(false);
//   };

//   return {
//     phoneNumber,
//     setPhoneNumber,
//     otp,
//     setOtp,
//     isOtpSent,
//     loading,
//     verifying,
//     authReady,
//     sendOtp,
//     verifyOtp,
//     resetAuth
//   };
// };




import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { partnerDashboardService } from '@/services/partnerDahboardService';


declare global {
  interface Window {
    recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
  }
}

export const useFirebasePhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response: any) => {
        console.log("reCAPTCHA solved", response);
      }
    });
  };

  const sendOtp = async () => {
    if (!phoneNumber) return;
    
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const phone = "+91" + phoneNumber

      console.log("phoneNumber",phone)
      
      const confirmation = await signInWithPhoneNumber(
        auth, 
        phone, 
        appVerifier
      );
      
      setConfirmationResult(confirmation);
      setIsOtpSent(true);
      return { success: true };
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      throw new Error(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || !confirmationResult) return;
    
    setVerifying(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const response = await partnerDashboardService.getPartnerStatus(result.user.phoneNumber)
      const verified = response.status == "approved" ? true : false
      return {
        success: true,
        user: {
          id: result.user.uid,
          phone: result.user.phoneNumber,
          isPartner: true,
          verified: verified
        }
      };
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      throw new Error(error.message || 'Invalid OTP');
    } finally {
      setVerifying(false);
    }
  };

  const resetAuth = () => {
    setPhoneNumber('');
    setOtp('');
    setConfirmationResult(null);
    setIsOtpSent(false);
    setLoading(false);
    setVerifying(false);
  };

  return {
    phoneNumber,
    setPhoneNumber,
    otp,
    setOtp,
    isOtpSent,
    loading,
    verifying,
    sendOtp,
    verifyOtp,
    resetAuth
  };
};