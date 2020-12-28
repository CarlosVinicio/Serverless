const express = require('express');
const Meals = require('../models/Meals')

const router = express.Router();

router.get('/', (req, resp) => {
    //Query
    Meals.find()
    .exec().then((x) => {
    resp.status(200).send(x)
    });
});

router.get('/:id', (req, resp) => {
    //Query
    Meals.findById(req.params.id)
    .exec().then((x) => {
        resp.status(200).send(x)
    });
});

router.post('/', (req, resp) => {
    //Query
    Meals.create(req.body).then((x) => { resp.status(201).send(x)});
});

router.put('/:id', (req, resp) => {
    //Query
    Meals.findOneAndUpdate( req.params.id, req.body ).then((x) => { resp.sendStatus(204) })
});

router.delete('/:id', (req, resp) => {
    //Query
    Meals.findOneAndDelete( req.params.id ).exec().then((x) => { resp.sendStatus(204) })
});


module.exports = router;
