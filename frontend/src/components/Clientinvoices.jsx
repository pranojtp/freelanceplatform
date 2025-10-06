import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinterceptor";

const ClientInvoices = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await axiosInstance.get("/invoices/client-invoices");
                setInvoices(res.data);
            } catch (err) {
                console.error("Failed to fetch invoices:", err);
            }
        };
        fetchInvoices();
    }, []);

    // ✅ Mark invoice as paid
    const handleMarkPaid = async (id) => {
        try {
            await axiosInstance.put(`/invoices/mark-paid/${id}`);
            alert("Invoice marked as paid");
            setInvoices(
                invoices.map((i) =>
                    i._id === id ? { ...i, status: "Paid" } : i
                )
            );
        } catch (err) {
            console.error("Failed to mark paid:", err);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-semibold mb-5">Invoices Received</h1>
            {invoices.length === 0 && <p>No invoices received yet.</p>}

            <ul className="space-y-4">
                {invoices.map((inv) => (
                    <li
                        key={inv._id}
                        className="border p-4 rounded-md shadow-sm bg-white"
                    >
                        <h2 className="font-semibold text-lg">
                            Invoice #{inv._id.slice(-5).toUpperCase()}
                        </h2>
                        <p>
                            <strong>Freelancer:</strong> {inv.freelancer.username}
                        </p>
                        <p>
                            <strong>Proposal Solution:</strong>{" "}
                            {inv.proposal?.proposedSolution}
                        </p>
                        <p>
                            <strong>Invoice Amount:</strong> ${inv.totalAmount}
                        </p>
                        <p>
                            <strong>Due Date:</strong>{" "}
                            {new Date(inv.dueDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            <span
                                className={`font-semibold ${inv.status === "Paid"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                    }`}
                            >
                                {inv.status}
                            </span>
                        </p>

                        {/* ✅ Button inside map block */}
                        <button
                            onClick={() => handleMarkPaid(inv._id)}
                            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800"
                            disabled={inv.status === "Paid"}
                        >
                            {inv.status === "Paid" ? "Paid" : "Mark as Paid"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientInvoices;


// import React, { useEffect, useState } from "react";
// import axiosInstance from "../axiosinterceptor";

// const ClientInvoices = () => {
//     const [invoices, setInvoices] = useState([]);

//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 const res = await axiosInstance.get("/invoices/client-invoices");
//                 setInvoices(res.data);
//             } catch (err) {
//                 console.error("Failed to fetch invoices:", err);
//             }
//         };
//         fetchInvoices();
//     }, []);

//     // -------------------------------
//     // 🪙 Handle Razorpay Payment Flow
//     // -------------------------------
//     const handlePayment = async (invoiceId) => {
//         try {
//             // 1️⃣ Request backend to create Razorpay order
//             const { data } = await axiosInstance.post(`/payment/create-order/${invoiceId}`);

//             if (!data.success) {
//                 alert("Failed to create Razorpay order.");
//                 return;
//             }

//             // 2️⃣ Configure Razorpay checkout options
//             const options = {
//                 key: data.key, // Razorpay public key
//                 amount: data.amount, // Amount in paise
//                 currency: data.currency,
//                 name: "Freelance Payment Portal",
//                 description: `Payment for Invoice #${invoiceId}`,
//                 order_id: data.orderId,
//                 handler: async function (response) {
//                     // 3️⃣ When payment succeeds, verify payment on backend
//                     try {
//                         const verifyRes = await axiosInstance.post("/payment/verify-payment", {
//                             razorpay_order_id: response.razorpay_order_id,
//                             razorpay_payment_id: response.razorpay_payment_id,
//                             razorpay_signature: response.razorpay_signature,
//                             invoiceId,
//                         });

//                         if (verifyRes.data.success) {
//                             alert("✅ Payment Successful!");
//                             // Refresh the invoice list
//                             const updated = await axiosInstance.get("/invoices/client-invoices");
//                             setInvoices(updated.data);
//                         } else {
//                             alert("❌ Payment verification failed.");
//                         }
//                     } catch (err) {
//                         console.error("Verification failed:", err);
//                         alert("❌ Payment verification failed. Please contact support.");
//                     }
//                 },
//                 prefill: {
//                     name: "Client User", // Replace dynamically if you have client data
//                     email: "client@example.com",
//                 },
//                 theme: {
//                     color: "#0d6efd",
//                 },
//             };

//             // 4️⃣ Open Razorpay payment modal
//             const rzp = new window.Razorpay(options);
//             rzp.open();

//             // Optional: handle payment modal closed
//             rzp.on("payment.failed", function (response) {
//                 alert("❌ Payment failed. Please try again.");
//                 console.error("Payment failed:", response.error);
//             });
//         } catch (err) {
//             console.error("Payment initialization failed:", err);
//             alert("Payment could not be started. Please try again.");
//         }
//     };

//     return (
//         <div className="p-10 bg-gray-50 min-h-screen">
//             <h1 className="text-3xl font-bold mb-6 text-gray-800">Invoices Received</h1>

//             {invoices.length === 0 ? (
//                 <p className="text-gray-500">No invoices received yet.</p>
//             ) : (
//                 <ul className="space-y-4">
//                     {invoices.map((inv) => (
//                         <li
//                             key={inv._id}
//                             className="border p-5 rounded-lg shadow-sm bg-white flex flex-col gap-2 hover:shadow-md transition"
//                         >
//                             <h2 className="font-semibold text-lg text-gray-800">
//                                 Invoice #{inv._id.slice(-5).toUpperCase()}
//                             </h2>
//                             <p>
//                                 <strong>Freelancer:</strong> {inv.freelancer.username}
//                             </p>
//                             <p>
//                                 <strong>Proposal Solution:</strong>{" "}
//                                 {inv.proposal?.proposedSolution || "N/A"}
//                             </p>
//                             <p>
//                                 <strong>Invoice Amount:</strong> ₹{inv.totalAmount}
//                             </p>
//                             <p>
//                                 <strong>Due Date:</strong>{" "}
//                                 {new Date(inv.dueDate).toLocaleDateString()}
//                             </p>
//                             <p>
//                                 <strong>Status:</strong>{" "}
//                                 <span
//                                     className={`font-semibold ${inv.status === "Paid"
//                                             ? "text-green-600"
//                                             : "text-yellow-600"
//                                         }`}
//                                 >
//                                     {inv.status}
//                                 </span>
//                             </p>

//                             {inv.status !== "Paid" ? (
//                                 <button
//                                     onClick={() => handlePayment(inv._id)}
//                                     className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-max"
//                                 >
//                                     Make Payment
//                                 </button>
//                             ) : (
//                                 <span className="mt-3 px-4 py-2 bg-green-100 text-green-700 rounded-md w-max font-medium">
//                                     ✅ Already Paid
//                                 </span>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default ClientInvoices;

