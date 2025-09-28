const express = require('express')
const router = express.Router()
const proposalModel=require('../models/proposalData')

router.get('/', async (req, res) => {
    try {
        console.log("call hit ")
        const data = await proposalModel.find()
        res.status(200).send(data)
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Data not found")
    }
})

router.post('/create',async (req, res) => {
    try {
        const post = req.body
        const data = await proposalModel(post).save()
        res.status(200).send({ message: "Proposal Sended", projects: data })
    }
    catch (error) {
        console.error(error)
        res.status(500).send("Failed to send proposal")
    }
})

module.exports = router