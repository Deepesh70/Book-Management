const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/user.json");
const { getAllBooks, getSingleBookById, getAllissuedBooks } = require("../controllers/book-controller");

const router = express.Router();

router.get("/", getAllBooks);
 
router.get("/issued/by-users", getAllissuedBooks );

router.get("/:id", getSingleBookById ); 

router.post("/", (req, res) => {
    const data = req.body;

    if(!data){
        return res.status(404).json({
            success: false,
            message: "No data Provided!.",
        });
    }
    const book = books.find((each)=> each.id === Number(data.id))

    if(book){
        return res.status(404).json({
            success: false,
            message: "Book already exist with this id."
        });
    }
    const allBooks = [ ...books, data]; // if wants to send multiple books do ...data

    res.status(200).json({
        success: true,
        message: `Added new Book with Id ${data.id}`,
        data: allBooks,
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === Number(id));
    if(!book){
        return res.status(404).json({
            success: false,
            message: `No book with id ${id}`
        });
    }

    const updatedbook = books.map((each) => {
        if(each.id === Number(id)){
            return { ...each, ...data};
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        data: updatedbook,
    });
});

router.get("/fine/books", (req, res) => {
    
    const finedbooks =  users.filter((each) => each.fine> 0);
    if(finedbooks.length === 0){
        return res.status(404).json({
            success:false,
            message: "No fined Books."
        })
    }
  

    return res.status(200).json({
        success: true,
        finedbooks,
    });
});


module.exports = router;