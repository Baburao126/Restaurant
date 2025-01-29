// import React, { useState } from "react";
// import { useRazorpay } from "react-razorpay";

// const PaymentComponent = () => {
//   const { error, isLoading, Razorpay } = useRazorpay();
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       // Step 1: Create an order on your server
//       const response = await fetch('http://localhost:8000/create-order', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ amount: 50000 }), // Amount in paise
//       });

//       const { order_id } = await response.json();

//       // Step 2: Set up Razorpay options
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY, // Use environment variable
//         amount: 50000, // Amount in paise
//         currency: "INR",
//         name: "Test Company",
//         description: "Test Transaction",
//         order_id: order_id, // Use the dynamic order ID
//         handler: (response) => {
//           console.log(response);
//           alert("Payment Successful!");
//           // Optionally, send the payment details to your server for verification
//         },
//         prefill: {
//           name: "John Doe",
//           email: "john.doe@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       // Step 3: Open Razorpay
//       const razorpayInstance = new Razorpay(options);
//       razorpayInstance.open();
//     } catch (err) {
//       console.error("Error creating order:", err);
//       alert("Failed to create order. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Payment Page</h1>
//       {isLoading && <p>Loading Razorpay...</p>}
//       {error && <p>Error loading Razorpay: {error}</p>}
//       <button onClick={handlePayment} disabled={isLoading || loading}>
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// };

// export default PaymentComponent;