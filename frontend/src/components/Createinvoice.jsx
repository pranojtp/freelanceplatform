import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinterceptor";
import { useNavigate } from "react-router-dom";

const CreateInvoice = () => {
  const [proposals, setProposals] = useState([]);
  const [selectedProposalId, setSelectedProposalId] = useState("");
  const [form, setForm] = useState({
    totalAmount: "",
    dueDate: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch accepted proposals only
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const res = await axiosInstance.get("/proposals/my-proposals");
        const accepted = res.data.filter((p) => p.status === "accepted");
        setProposals(accepted);
      } catch (err) {
        console.error("Failed to fetch proposals:", err);
      }
    };
    fetchProposals();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProposalId) {
      alert("Please select an accepted proposal first.");
      return;
    }

    try {
      await axiosInstance.post("/invoices/create", {
        proposalId: selectedProposalId,
        totalAmount: form.totalAmount,
        dueDate: form.dueDate,
      });

      alert("Invoice created successfully");
      setForm({ totalAmount: "", dueDate: "" });
      setSelectedProposalId("");
      navigate("/freelancerdashboard/freelancerinvoice");
    } catch (err) {
      console.error("Error creating invoice:", err);
      alert("Failed to create invoice");
    }
  };

  return (
    <div className="p-10 flex flex-col items-center gap-5">
      <h1 className="text-2xl font-semibold text-gray-800">Create Invoice</h1>

      {/* Proposal Dropdown */}
      <select
        value={selectedProposalId}
        onChange={(e) => setSelectedProposalId(e.target.value)}
        className="w-full max-w-lg px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
      >
        <option value="">-- Select an Accepted Proposal --</option>
        {proposals.map((p) => (
          <option key={p._id} value={p._id}>
            {p.project.projectName} (Client: {p.client?.username})
          </option>
        ))}
      </select>

      {/* Invoice Form */}
      <form className="space-y-4 w-full max-w-lg" onSubmit={handleSubmit}>
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={form.totalAmount}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-800 transition"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
