import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosinterceptor';

const Client_proposals = () => {
    const [proposals, setProposals] = useState([]);

    // Fetch proposals for client
    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const res = await axiosInstance.get('/proposals/client-proposals');
                setProposals(res.data);
            } catch (err) {
                console.error('Failed to fetch proposals:', err);
            }
        };
        fetchProposals();
    }, []);

    // Handle accept/reject
    const handleStatusChange = async (proposalId, newStatus) => {
        try {
            const res = await axiosInstance.put(`/proposals/update-status/${proposalId}`, { status: newStatus });
            alert(`Proposal ${newStatus}`);
            // Update locally
            setProposals((prev) =>
                prev.map((p) => (p._id === proposalId ? res.data.proposal : p))
            );
        } catch (err) {
            console.error('Failed to update status:', err);
            alert('Failed to update status');
        }
    };
    return (
        <>
            <div className="p-10">
                <h1 className="text-2xl font-semibold mb-5">Proposals for My Projects</h1>
                {proposals.length === 0 && <p>No proposals received yet.</p>}
                <ul className="space-y-4">
                    {proposals.map((p) => (
                        <li key={p._id} className="border p-4 rounded-md shadow-sm">
                            <h2 className="font-semibold text-lg">{p.project.projectName}</h2>
                            <p><strong>Freelancer:</strong> {p.freelancer.username}</p>
                            <p><strong>Email:</strong> {p.freelancer.email}</p>
                            <p><strong>Proposed Solution:</strong> {p.proposedSolution}</p>
                            <p><strong>Amount:</strong> ${p.proposalAmount}</p>
                            <p><strong>Due Date:</strong> {new Date(p.dueDate).toLocaleDateString()}</p>
                            <p>
                                <strong>Status:</strong>{' '}
                                <span
                                    className={`font-semibold ${p.status === 'accepted'
                                            ? 'text-green-600'
                                            : p.status === 'rejected'
                                                ? 'text-red-600'
                                                : 'text-yellow-600'
                                        }`}
                                >
                                    {p.status}
                                </span>
                            </p>

                            {p.status === 'pending' && (
                                <div className="mt-2 flex gap-2">
                                    <button
                                        onClick={() => handleStatusChange(p._id, 'accepted')}
                                        className="px-3 py-1 bg-green-600 text-white rounded-md"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange(p._id, 'rejected')}
                                        className="px-3 py-1 bg-red-600 text-white rounded-md"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Client_proposals
