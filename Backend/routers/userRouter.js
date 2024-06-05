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

//check if user is alraedy present using eamil
router.get('/check/:email',(req, res)=>{
    Model.findOne({email: req.params.email})
    .then((result)=>{
        if(result.length === 0)
            res.status(200).json();
        else
            res.status(400).json();
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
}
)

module.exports = router;