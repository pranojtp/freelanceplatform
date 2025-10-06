
const express = require('express');
const router = express.Router();
const Proposal = require('../models/proposalData');
const Project = require('../models/projectData');
const User = require('../models/userData');
const verifyToken = require('../middleware/verifyToken');

// 📌 GET all proposals (with names)
router.get('/my-proposals', verifyToken, async (req, res) => {
    try {
        const proposals = await Proposal.find({ freelancer: req.userId })
            .populate('project', 'projectName projectDescription')
            .populate('client', 'username email');

        res.status(200).json(proposals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch proposals', error: err.message });
    }
});

// 🔹 Get proposals for logged-in client
router.get('/client-proposals', verifyToken, async (req, res) => {
    try {
        if (req.role !== 'client') {
            return res.status(403).json({ message: 'Only clients can view their proposals' });
        }

        const proposals = await Proposal.find({ client: req.userId })
            .populate('project', 'projectName projectDescription')
            .populate('freelancer', 'username email');

        res.status(200).json(proposals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch proposals', error: err.message });
    }
});
// 📌 CREATE proposal (freelancers only)
router.post('/create', verifyToken, async (req, res) => {
    try {
        const { projectId, proposedSolution, proposalAmount, dueDate } = req.body;

        // ensure only freelancers can send proposals
        if (req.role !== 'freelancer') {
            return res.status(403).json({ message: 'Only freelancers can send proposals' });
        }

        // find freelancer (from token)
        const freelancer = await User.findById(req.userId);
        if (!freelancer) {
            return res.status(404).json({ message: 'Freelancer not found' });
        }

        // find project (and its client)
        const project = await Project.findById(projectId).populate('client');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const client = project.client;

        // create new proposal
        const proposal = new Proposal({
            project: project._id,
            client: client._id,
            freelancer: freelancer._id,
            proposedSolution,
            proposalAmount,
            dueDate
        });

        await proposal.save();

        // populate names before sending response
        await proposal.populate([
            { path: 'freelancer', select: 'username email' },
            { path: 'client', select: 'username email' },
            { path: 'project', select: 'projectName projectDescription' }
        ]);

        res.status(201).json({ message: "Proposal sent successfully", proposal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send proposal" });
    }
});


router.put('/update-status/:id', verifyToken, async (req, res) => {
    try {
        if (req.role !== 'client') {
            return res.status(403).json({ message: 'Only clients can update proposal status' });
        }

        const { status } = req.body;
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const proposal = await Proposal.findById(req.params.id)
            .populate('project')
            .populate('freelancer');

        if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

        // Ensure this proposal belongs to the logged-in client
        if (proposal.client.toString() !== req.userId) {
            return res.status(403).json({ message: 'You can only update proposals for your projects' });
        }

        proposal.status = status;
        await proposal.save();

        // ✅ If accepted, assign the freelancer to the project
        if (status === 'accepted') {
            const updatedProject = await Project.findByIdAndUpdate(
                proposal.project._id,
                {
                    freelancer: proposal.freelancer._id,
                    status: 'in-progress'
                },
                { new: true }
            );

            console.log('✅ Project updated with freelancer:', updatedProject);
        }

        res.status(200).json({ message: 'Proposal status updated successfully' });
    } catch (err) {
        console.error('Failed to update proposal:', err);
        res.status(500).json({ message: 'Error updating proposal', error: err.message });
    }
});


// GET accepted projects (clean list)
router.get('/my-accepted-projects', verifyToken, async (req, res) => {
    try {
        if (req.role !== 'freelancer') return res.status(403).json({ message: 'Only freelancers can view accepted projects' });

        const proposals = await Proposal.find({ freelancer: req.userId, status: 'accepted' })
            .populate('project', 'projectName projectDescription status dueDate progress client freelancer');

        const acceptedProjects = proposals.map(p => p.project);
        res.status(200).json(acceptedProjects);
    } catch (err) {
        console.error('Error fetching accepted projects:', err);
        res.status(500).json({ message: 'Failed to fetch accepted projects', error: err.message });
    }
});

module.exports = router;
