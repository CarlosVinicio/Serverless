const express = require('express');
const Orders = require('../models/Oders');
const { isAuthenticated, hasRoles } = require('../auth/index');

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
// Protege Las Rutas
router.post('/', isAuthenticated, (req, resp) => {
	const { _id } = req.user;
	Orders.create({ ...req.body, user_id: _id }).then((x) => { resp.status(201).send(x) });
});

router.put('/:id', isAuthenticated, (req, resp) => {
	//Query
	Orders.findOneAndUpdate(req.params.id, req.body).then((x) => { resp.sendStatus(204) })
});

router.delete('/:id', isAuthenticated, (req, resp) => {
	//Query
	Orders.findOneAndDelete(req.params.id).exec().then((x) => { resp.sendStatus(204) })
});


module.exports = router;
