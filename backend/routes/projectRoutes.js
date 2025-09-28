const express = require('express')
const router = express.Router()
const projectModel = require('../models/projectData')
const jwt = require('jsonwebtoken')

// function verifyToken(req, res, next) {    //Adding middleware
//     let token = req.headers.token
//     try {
//         if (!token) throw "Unauthorised access"
//         let payload = jwt.verify(token, "freelancekey")
//         if (!payload) throw "Unauthorised access"
//         next()
//     }
//     catch (error) {
//         res.json({ message: error })
//     }
// }

router.get('/', async (req, res) => {
    try {
        console.log("call hit ")
        const data = await projectModel.find()
        res.status(200).send(data)
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Data not found")
    }
})

router.post('/add',async (req, res) => {
    try {
        const post = req.body
        const data = await projectModel(post).save()
        res.status(200).send({ message: "Project added", projects: data })
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Failed to add project")
    }
})

// router.put("/update/:id", verifyToken, async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedPost = await productModel.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedPost) {
//             return res.status(404).send({ message: "product not found" });
//         }
//         res.status(200).send({ message: "product details updated", data: updatedPost });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Failed to update the product details");
//     }
// });

router.delete('/delete/:id', async (req, res) => {
    try {
        await projectModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "project removed" })
    } catch (err) {
        console.error(err)
        res.status(500).send("failed to remove the project")
    }
});



module.exports = router