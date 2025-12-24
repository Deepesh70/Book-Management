const express = require('express');
const { users } = require("../data/user.json");
const { getAllUsers, getuserById, updateUserById, deleteUser, createuser } = require('../controllers/user-controller');

const router = express.Router();

router.get('/', getAllUsers);


router.get('/:id', getuserById);


router.post('/', createuser);

//updated data with user id
router.put('/:id', updateUserById);


//Delete the user
router.delete('/:id', deleteUser);

router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;

    const user = users.find((each) => each.id === Number(id));
    if(!user){
        return res.status.json({
            success: false,
            message: "No User Found!",
        });
    }

    const getDateInDays = (data = "") => {
        let date;
        if(data === ""){
            date = new Date();
        }else{
            date = new Date(data);
        }
        let days = Math.floor(date/ (1000* 60 * 60 *24));
        return days;
    };

    const subscriptionType = (date) => {
        if( user.subscriptionType === "Basic"){
            date = date +90;
        }else if( user.subscriptionType === "Standard"){
            date = date + 180;
        }else if( user.subscriptionType === "Premium"){
            date = date + 365;
        }
        return date;
    };
    let returnDate  = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired : subscriptionExpiration < currentDate, //boolean | added fields in users array
        daysLeftforExpiration : 
            subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
        fine: 
            returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100: 0, 
    };
    return res.status(200).json({
        success: true,
        data,
    });
});


module.exports = router;