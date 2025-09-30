// const express = require('express')
// const router = express.Router()
// const proposalModel=require('../models/proposalData')
// const verifyToken=require('../middleware/verifyToken')

// router.get('/', async (req, res) => {
//     try {
//         console.log("call hit ")
//         const data = await proposalModel.find()
//         res.status(200).send(data)
//     }
//     catch (error) {
//         console.error(error)
//         res.status(500).send("Data not found")
//     }
// })

// router.post('/create',async (req, res) => {
//     try {
//         const post = req.body
//         const data = await proposalModel(post).save()
//         res.status(200).send({ message: "Proposal Sended", projects: data })
//     }
//     catch (error) {
//         console.error(error)
//         res.status(500).send("Failed to send proposal")
//     }
// })

// module.exports = router

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

// 🔹 Client accepts or rejects a proposal
router.put('/update-status/:id', verifyToken, async (req, res) => {
    try {
        if (req.role !== 'client') {
            return res.status(403).json({ message: 'Only clients can update proposal status' });
        }

        const { status } = req.body;
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        
        if (status === 'accepted') {
            const project = await Project.findById(proposal.project);
            project.status = 'in-progress'; // mark project as active for freelancer
            await project.save();
        }


        const proposal = await Proposal.findById(req.params.id);
        if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

        if (proposal.client.toString() !== req.userId) {
            return res.status(403).json({ message: 'You can only update proposals sent to your projects' });
        }

        proposal.status = status;
        await proposal.save();

        res.status(200).json({ message: 'Proposal status updated', proposal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update proposal', error: err.message });
    }

});

router.get('/dashboard-projects', verifyToken, async (req, res) => {
    try {
        if (req.role !== 'freelancer') {
            return res.status(403).json({ message: 'Access denied. Only freelancers can view this dashboard.' });
        }

        // Find all proposals where the status is 'accepted' and the freelancer matches
        const activeProposals = await Proposal.find({
            freelancer: req.userId,
            status: 'accepted'
        })
        .populate('project', 'projectName projectDescription status') // Get essential project info
        .populate('client', 'username email'); // Get client info

        // Map and filter for cleaner output
        const activeProjects = activeProposals
            .filter(proposal => proposal.project && proposal.project.status === 'in-progress')
            .map(proposal => ({
                proposalId: proposal._id,
                projectId: proposal.project._id,
                projectName: proposal.project.projectName,
                clientName: proposal.client.username,
                projectStatus: proposal.project.status,
                proposedAmount: proposal.proposalAmount,
                dueDate: proposal.dueDate,
                // Add any other crucial details
            }));

        res.status(200).json(activeProjects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch active projects', error: err.message });
    }
});

module.exports = router;
