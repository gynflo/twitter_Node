const router = require('express').Router();
const { signupForm, signup } = require('../controllers/users.controller');

// /users/

router.get('/signup/form', signupForm);
router.post('/signup', signup)

module.exports = router