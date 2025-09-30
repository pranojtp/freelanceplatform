// const express = require('express')
// const router = express.Router()
// const projectModel = require('../models/projectData')
// const verifyToken=require('../middleware/verifyToken')

// // function verifyToken(req, res, next) {    //Adding middleware
// //     let token = req.headers.token
// //     console.log("Auth Header:", req.headers["authorization"]);

// //     try {
// //         if (!token) throw "Unauthorised access"
// //         let payload = jwt.verify(token, "freelancekey")
// //         if (!payload) throw "Unauthorised access"
// //         next()
// //     }
// //     catch (error) {
// //         res.json({ message: error })
// //     }
// // }

// router.get('/', async (req, res) => {
//     try {
//         const data = await projectModel.find()
//         res.status(200).send(data)
//     }
//     catch (error) {
//         console.error(error)
//         res.status(500).send("Data not found")
//     }
// })

// // router.post('/add',verifyToken,async (req, res) => {
// //     try {
// //         const post = req.body
// //         const data = await projectModel(post).save()
// //         res.status(200).send({ message: "Project added", projects: data })
// //     }
// //     catch (error) {
// //         console.error(error)
// //         res.status(500).send("Failed to add project")
// //     }
// // })

// router.get('/my-projects', verifyToken, async (req, res) => {
//   try {
//     // find all projects where client matches logged-in user
//     const projects = await projectModel.find({ client: req.user.id }).sort({ createdAt: -1 });
    
//     res.status(200).json({ projects });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
//   }
// });

// router.post('/add', verifyToken, async (req, res) => {
//   try {
//     const { projectName, projectDescription, estimatedAmount, dueDate } = req.body;

//     const project = new projectModel({
//       projectName,
//       projectDescription,
//       estimatedAmount: Number(estimatedAmount) || undefined,
//       dueDate: dueDate ? new Date(dueDate) : undefined,
//       client: req.user.id  // <-- IMPORTANT: set client from token
//     });

//     const data = await project.save();
//     res.status(201).json({ message: 'Project added', project: data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to add project', error: error.message });
//   }
// });

// // router.post('/add', verifyToken, async (req, res) => {
// //     try {
// //         console.log("Authenticated Client ID:", req.user._id); // Check the ID
// //         console.log("Request Body Data:", req.body);
// //         // 1. Get the client ID from the request object, which is populated by your verifyToken middleware.
// //         // I'm assuming the middleware attaches the user object to req.user.
// //         const clientId = req.user._id; 
        
// //         // 2. Extract project details from the request body.
// //         const { projectName, projectDescription, estimatedAmount, dueDate } = req.body;

// //         // 3. Create the new project document.
// //         // It's safer to destructure specific fields than to spread the entire req.body 
// //         // to prevent users from injecting unexpected data.
// //         const newProject = new projectModel({
// //             projectName,
// //             projectDescription,
// //             estimatedAmount,
// //             dueDate,
// //             // CRITICAL STEP: Assign the authenticated user's ID to the 'client' field.
// //             client:clientId 
// //         });

// //         // 4. Save the project to the database.
// //         const data = await newProject.save();

// //         res.status(200).send({ message: "Project added successfully", projects: data });
// //     }
// //     catch (error) {
// //         console.error(error);
// //         // Better error handling for validation failures (e.g., missing required fields)
// //         if (error.name === 'ValidationError') {
// //             return res.status(400).send({ message: "Validation error", details: error.message });
// //         }
// //         res.status(500).send("Failed to add project");
// //     }
// // });

// // router.put("/update/:id", verifyToken, async (req, res) => {
// //     try {
// //         const id = req.params.id;
// //         const updatedPost = await productModel.findByIdAndUpdate(id, req.body, { new: true });
// //         if (!updatedPost) {
// //             return res.status(404).send({ message: "product not found" });
// //         }
// //         res.status(200).send({ message: "product details updated", data: updatedPost });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).send("Failed to update the product details");
// //     }
// // });

// router.delete('/delete/:id',verifyToken, async (req, res) => {
//     try {
//         await projectModel.findByIdAndDelete(req.params.id);
//         res.status(200).send({ message: "project removed" })
//     } catch (err) {
//         console.error(err)
//         res.status(500).send("failed to remove the project")
//     }
// });



// module.exports = router


const express = require('express');
const router = express.Router();
const Project = require('../models/projectData');
const verifyToken = require('../middleware/verifyToken');

// 📌 Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const data = await Project.find().populate('client', 'username email');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Data not found");
  }
});

// 📌 Get projects created by logged-in client
router.get('/my-projects', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can view their projects' });
    }

    const projects = await Project.find({ client: req.userId })
      .sort({ createdAt: -1 })
      .populate('client', 'username email');

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
});

// 📌 Add project (clients only)
router.post('/add', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can add projects' });
    }

    const { projectName, projectDescription, estimatedAmount, dueDate } = req.body;

    const project = new Project({
      projectName,
      projectDescription,
      estimatedAmount: Number(estimatedAmount) || undefined,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      client: req.userId  // 👈 take clientId from token, not frontend
    });

    const saved = await project.save();
    await saved.populate('client', 'username email');

    res.status(201).json({ message: 'Project added successfully', project: saved });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation error", details: error.message });
    }
    res.status(500).json({ message: 'Failed to add project', error: error.message });
  }
});

// 📌 Delete project (only owner client can delete)
router.delete('/delete/:id', verifyToken, async (req, res) => {
  try {
    if (req.role !== 'client') {
      return res.status(403).json({ message: 'Only clients can delete projects' });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.client.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own projects" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove the project", error: err.message });
  }
});

module.exports = router;
