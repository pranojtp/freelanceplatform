import { useState ,useEffect } from "react";
import axiosInstance from "../axiosinterceptor";

const Freelancer_invoices = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await axiosInstance.get("/invoices/my-invoices");
                setInvoices(res.data);
            } catch (err) {
                console.error("Failed to fetch invoices:", err);
            }
        };
        fetchInvoices();
    }, []);
    return (
        <>
            <div className="flex flex-row justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold">Invoices</h1>
                <a href="/freelancerdashboard/createinvoice">
                    <button
                        // onClick={()=>}
                        className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-[#02060b] transition"
                    >
                        Create Invoice
                    </button>
                </a>
            </div>
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
                            <strong>Client:</strong> {inv.client.username}
                        </p>
                        <p>
                            <strong>Proposal Amount:</strong> ${inv.proposal?.proposalAmount}
                        </p>
                        <p>
                            <strong>Invoice Total:</strong> ${inv.totalAmount}
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
                    </li>
                ))}
            </ul>

        </>
    )
}

export default Freelancer_invoices
