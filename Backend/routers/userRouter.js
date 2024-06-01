const express = require('express');
const router = express.Router();
const Model = require('../models/userModel');

router.post('/add',(req, res) =>{
    console.log(req.body);
    new Model(req.body).save()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.post('/authenticate',(req, res)=>{
    Model.findOne(req.body)
    .then((result)=>{
        if(result !== null) res.json(result);
        else result.ststus(401).json({message: 'Invalid email or password'});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;