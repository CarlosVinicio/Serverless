const express = require('express');
const Orders = require('../models/Oders');

const router = express.Router();

router.get('/', (req, resp) => {
    //Query
    Orders.find()
    .exec().then((x) => {
        resp.status(200).send(x)
    });
});
 
router.get('/:id', (req, resp) => {
    //Query
    Orders.findById(req.params.id)
    .exec().then((x) => {
        resp.status(200).send(x)
    });
});

router.post('/', (req, resp) => {
    //Query
    Orders.create(req.body).then((x) => { resp.status(201).send(x)});
});

router.put('/:id', (req, resp) => {
    //Query
    Orders.findOneAndUpdate( req.params.id, req.body ).then((x) => { resp.sendStatus(204) })
});

router.delete('/:id', (req, resp) => {
    //Query
    Orders.findOneAndDelete( req.params.id ).exec().then((x) => { resp.sendStatus(204) })
});


module.exports = router;
