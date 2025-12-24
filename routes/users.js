const express = require('express');
const { users } = require("../data/user.json");
const { getAllUsers, getuserById, updateUserById, deleteUser, createuser, getSubscriptiondetailsById } = require('../controllers/user-controller');

const router = express.Router();

router.get('/', getAllUsers);


router.get('/:id', getuserById);


router.post('/', createuser);

//updated data with user id
router.put('/:id', updateUserById);


//Delete the user
router.delete('/:id', deleteUser);

router.get("/subscription-details/:id", getSubscriptiondetailsById);


module.exports = router;