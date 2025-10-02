import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinterceptor";

const PaymentSuccess = () => {
    const { invoiceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const markPaid = async () => {
            try {
                await axiosInstance.post(`/payment-success/${invoiceId}`);
                alert("Payment successful! Invoice marked as Paid.");
                navigate("/clientdashboard/invoices"); // redirect back to invoices
            } catch (err) {
                console.error("Failed to update invoice status:", err);
                alert("Payment succeeded but failed to update invoice. Refresh page.");
            }
        };
        markPaid();
    }, [invoiceId, navigate]);

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
            <p>Your invoice has been marked as Paid.</p>
        </div>
    );
};

export default PaymentSuccess;
