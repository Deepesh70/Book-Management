const express = require('express');
const { users } = require("../data/user.json");

const router = express.Router();



router.get('/', (req, res) => {
    res.status(200).json({
        success:true,
        data: users,
    });
    
});


router.get('/:id', (req, res) => {
    const { id } = req.params
    const user = users.find((each) => each.id === Number(id) );
    if(!user ){
        return res.status(404).json({
            success:false,
            message: "User not Found",
        });
    }
    return res.status(200).json({
        success:true,
        data: user,
    });
});


router.post('/', (req, res) => {
    const { id, name, surname, email , subscriptionType, subscriptionDate } = req.body;

    const user = users.find((each) => each.id == Number(id));

    if(user){
        return res.status(404).json({
            success:false,
            message: "User Already Exists with this Id."
        });

    }
    users.push({
        id, 
        name, 
        surname,
        email, 
        subscriptionType,
        subscriptionDate
    });

    res.status(201).json({
        success: true,
        message: "User Created.",
        data: users,
    })
});


//updated data with user id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === Number(id));

    if(!user) 
        return res.status(404).json({ success: false, message: "User Not Found! "});

    const updatedUsers = users.map((each) => {
        if(each.id === Number(id)){
            return {
                ...each, //will be updated or overwritten
                ...data, //data which will overwrite each
            };

        }
        return each;
    });
    return res.status(200).json({
        success:true,
        data: updatedUsers,
    });
});


//Delete the user
router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    // const { data } = req.body;

    const user = users.find((each) => each.id === Number(id));
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User with current id doesn't exist!.",
        });

    }

    const index = users.indexOf(user);
    users.splice(index,1);
    res.status(202).json({
        success: true,
        message: `User  with Id ${id} has been deleted.`,
        data : users,
    });
});

router.get("/subscription-details/:id", (req, res) => {
    const { id } = req.params;
    // const { data } = users.body;

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
        subscriptionExpired : subscriptionExpiration < currentDate, //boolean
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