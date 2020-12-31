const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const { isAuthenticated } = require('../auth');
const { resource } = require('..');

const router = express.Router();

const signToken = (_id) => {
	return jwt.sign({_id}, 'mi_secreto', {
		expiresIn: 60 * 60 *21 * 365,
	});
}

router.post('/register', (req, res) => {
  const { email, password } = req.body
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString('base64')
    crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err,key) => {
      const encryptedPassword = key.toString('base64')
      Users.findOne({ email }).exec()
        .then(user => {
          if (user) {
            return res.send('usuario ya existe')
          }
          Users.create({
            email,
            password: encryptedPassword,
            salt: newSalt,
          }).then(() => {
            res.send('usuario creado con exito')
          })
        })
    })
  })
})

router.post('/login', (req, resp) => {
	const { email, password } = req.body;
	Users.findOne({email}).exec()
	.then(user => {
		if (!user) {
			return resp.send('Usuario no existe')
		}
		crypto.pbkdf2(password, user.salt , 10000, 64, 'sha1', (err, key) => {
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
