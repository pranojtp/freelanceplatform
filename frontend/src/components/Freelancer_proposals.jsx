import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../axiosinterceptor';

const Freelancer_proposals = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const fetchProposals = async () => {
            try {
                const res = await axiosInstance.get('/proposals/my-proposals');
                setProposals(res.data);
            } catch (err) {
                console.error('Failed to fetch proposals:', err);
            }
        };
        fetchProposals();
    }, []);

    return (
        <>
            <div className="p-10">
                <h1 className="text-2xl font-semibold mb-5">My Proposals</h1>
                {proposals.length === 0 && <p>No proposals sent yet.</p>}
                <ul className="space-y-4">
                    {proposals.map((p) => (
                        <li key={p._id} className="border p-4 rounded-md shadow-sm">
                            <h2 className="font-semibold text-lg">{p.project.projectName}</h2>
                            <p><strong>Client:</strong> {p.client.username}</p>
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
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default Freelancer_proposals
