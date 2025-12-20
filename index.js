const express = require("express");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is Running",
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