const express = require("express");
// const { users } = require('./data/user.json');


const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");


const app = express();

const PORT = 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Server is Running",
    });
});
 
app.use("/users", usersRouter);
app.use("/books", booksRouter);



app.use( (req, res) =>{
    res.status(404).json({
        message:"Route Doesn't Exist",
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})