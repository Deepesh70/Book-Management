const express = require("express");
const { users } = require('./data/user.json');

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is Running",
    });
});

app.get('/users', (req, res) => {
    res.status(200).json({
        success:true,
        data: users,
    });
    
});


app.get('/users/:id', (req, res) => {
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


app.post('/users', (req, res) => {
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
app.put('/users/:id', (req, res) => {
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


app.use( (req, res) =>{
    res.status(404).json({
        message:"Route Doesn't Exist",
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})