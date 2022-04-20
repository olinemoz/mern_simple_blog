const router = require('express').Router();
const {getAllUsers, signup, login} = require("../controllers/userController");

router.get('/', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router