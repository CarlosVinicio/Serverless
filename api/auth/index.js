const jwt = require('jsonwebtoken');
const Users =  require('../models/Users');

// Middlewars
const isAuthenticated = (req, res, next) => {
	const token = req.headers.authorization;
	if(!token) {
		return res.sendStatus(403);
	}
	jwt.verify('token', 'mi_secreto', (err, decodedToken) => {
		const { _id } = decodedToken;
		Users.findOne({ _id }).exec()
		.then((user) => {
			req.user = user;
			next();
		})
	})
}

const hasRoles = roles => ( req, res, next ) => {
	if (roles.indexOf(req.user.role) > 0) {
		return next();
	}
	res.sendStatus(403);
}

module.exports = {
	isAuthenticated, 
	hasRoles
}
