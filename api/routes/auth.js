const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { isAuthenticated } = require('../auth');

const router = express.Router();

const signToken = (_id) => {
	return jwt.sign({_id}, 'mi_secreto', {
		expiresIn: 60 * 60 *21 * 365,
	});
}

router.post('/register', (req, resp) => {
	//Query
	const { email, password } = req.body;
	crypto.randomBytes(16, (err, salt) => {
		const newSalt =  salt.toString('base64');
			crypto.pbkdf2(password, newSalt, 100, 64, 'sha1', (err, key) => {
			const encrypetdPassword = key.toString('base64');
			Users.findOne({email}).exec()
			.then((user) => {
				if(user) {
					return resp.send('Usuario ya existe');
				}
				Users.create({
					email, 
					password: encrypetdPassword,
					salt: newSalt
				}).then(() => {
					resp.send('Usuario creado con éxito');
				})
			})
		})
	})
});

router.post('/login', (req, resp) => {
	const { email, password } = req.body;
	Users.findOne({email}).exec()
	.then(user => {
		if (!user) {
			return resp.send('Usuario o contraseña incorrecta')
		}
		crypto.pbkdf2(password, user.salt , 100, 64, 'sha1', (err, key) => {
			const encrypetdPassword = key.toString('base64');
			if(user.password === encrypetdPassword) {
				const token = signToken(user._id);
				return resp.send({ token });
			}
			return resp.send('Usuario o contraseña incorrecta')
		})
	})
});

router.get('/me', isAuthenticated, (req, resp) => {
	resp.send(req.user)
})

module.exports = router;
