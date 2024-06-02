const express = require('express');
const router = express.Router();
const Model = require('../models/addhouseModel');

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
});

router.get('/getall',(req, res)=>{
    Model.find()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
})
router.get('/get/:id',(req, res)=>{
    Model.findById(req.params.id)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
})
router.get('/seller/:userid',(req, res)=>{
    Model.find({userid:req.params.userid})
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.put('/update/:id',(req, res)=>{
    Model.findByIdAndUpdate(req.params.id, req.body)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.delete('/delete/:id',(req, res)=>{
    Model.findByIdAndDelete(req.params.id)
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;