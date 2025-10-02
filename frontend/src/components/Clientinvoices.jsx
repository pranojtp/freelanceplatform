// import React, { useState, useEffect } from "react";
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

//     // ✅ Mark invoice as paid
//     const handleMarkPaid = async (id) => {
//         try {
//             await axiosInstance.put(`/invoices/mark-paid/${id}`);
//             alert("Invoice marked as paid");
//             setInvoices(
//                 invoices.map((i) =>
//                     i._id === id ? { ...i, status: "Paid" } : i
//                 )
//             );
//         } catch (err) {
//             console.error("Failed to mark paid:", err);
//         }
//     };

//     return (
//         <div className="p-10">
//             <h1 className="text-2xl font-semibold mb-5">Invoices Received</h1>
//             {invoices.length === 0 && <p>No invoices received yet.</p>}

//             <ul className="space-y-4">
//                 {invoices.map((inv) => (
//                     <li
//                         key={inv._id}
//                         className="border p-4 rounded-md shadow-sm bg-white"
//                     >
//                         <h2 className="font-semibold text-lg">
//                             Invoice #{inv._id.slice(-5).toUpperCase()}
//                         </h2>
//                         <p>
//                             <strong>Freelancer:</strong> {inv.freelancer.username}
//                         </p>
//                         <p>
//                             <strong>Proposal Solution:</strong>{" "}
//                             {inv.proposal?.proposedSolution}
//                         </p>
//                         <p>
//                             <strong>Invoice Amount:</strong> ${inv.totalAmount}
//                         </p>
//                         <p>
//                             <strong>Due Date:</strong>{" "}
//                             {new Date(inv.dueDate).toLocaleDateString()}
//                         </p>
//                         <p>
//                             <strong>Status:</strong>{" "}
//                             <span
//                                 className={`font-semibold ${inv.status === "Paid"
//                                         ? "text-green-600"
//                                         : "text-yellow-600"
//                                     }`}
//                             >
//                                 {inv.status}
//                             </span>
//                         </p>

//                         {/* ✅ Button inside map block */}
//                         <button
//                             onClick={() => handleMarkPaid(inv._id)}
//                             className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800"
//                             disabled={inv.status === "Paid"}
//                         >
//                             {inv.status === "Paid" ? "Paid" : "Mark as Paid"}
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ClientInvoices;

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

    const handlePayment = async (invoiceId) => {
        try {
            const res = await axiosInstance.post(`/payment/create-checkout-session/${invoiceId}`);
            window.location.href = res.data.url; // Redirect to Stripe checkout
        } catch (err) {
            console.error("Payment failed:", err);
            alert("Payment failed. Try again.");
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-semibold mb-5">Invoices Received</h1>
            {invoices.length === 0 && <p>No invoices received yet.</p>}

            <ul className="space-y-4">
                {invoices.map((inv) => (
                    <li key={inv._id} className="border p-4 rounded-md shadow-sm bg-white flex flex-col gap-2">
                        <h2 className="font-semibold text-lg">Invoice #{inv._id.slice(-5).toUpperCase()}</h2>
                        <p><strong>Freelancer:</strong> {inv.freelancer.username}</p>
                        <p><strong>Proposal Solution:</strong> {inv.proposal?.proposedSolution}</p>
                        <p><strong>Invoice Amount:</strong> ${inv.totalAmount}</p>
                        <p><strong>Due Date:</strong> {new Date(inv.dueDate).toLocaleDateString()}</p>
                        <p>
                            <strong>Status:</strong>{" "}
                            <span className={`font-semibold ${inv.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                                {inv.status}
                            </span>
                        </p>

                        {inv.status !== "Paid" && (
                            <button
                                onClick={() => handlePayment(inv._id)}
                                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
                            >
                                Make Payment
                            </button>
                        )}

                        {inv.status === "Paid" && (
                            <span className="mt-2 px-4 py-2 bg-green-100 text-green-800 rounded-md w-max">Already Paid</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientInvoices;
