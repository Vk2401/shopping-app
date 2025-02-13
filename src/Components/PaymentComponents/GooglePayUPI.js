import React, { useState } from "react";

const GooglePayUPI = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = () => {
    if (!upiId || !amount) {
      alert("Please enter UPI ID and amount");
      return;
    }

    // Google Pay UPI Intent URL
    const upiUrl = `upi://pay?pa=${upiId}&pn=User&mc=0000&tid=123456789&tr=TXN1234&tn=Payment&am=${amount}&cu=INR`;

    // Open Google Pay with the UPI request
    window.location.href = upiUrl;

    // Redirect to a success page after 10 seconds (optional)
    // setTimeout(() => {
    //   window.location.href = "/payment-success"; 
    // }, 10000);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">Google Pay UPI Payment</h2>

      <input
        type="text"
        placeholder="Enter UPI ID (e.g., user@okhdfcbank)"
        className="border p-2 mt-2 w-full"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Amount"
        className="border p-2 mt-2 w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
      >
        Pay with Google Pay
      </button>
    </div>
  );
};

export default GooglePayUPI;
