const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/user.json");
const { getAllBooks, getSingleBookById, getAllissuedBooks, addNewBook, updateBookById, getSingleBookByName } = require("../controllers/book-controller");

const router = express.Router();

router.get("/", getAllBooks);
 
router.get("/issued/by-users", getAllissuedBooks );

router.get("/:id", getSingleBookById ); 
router.get("/name/:name", getSingleBookByName ); 

router.post("/", addNewBook );

router.put("/:id", updateBookById);

// router.get("/fine/books", (req, res) => {
    
//     const finedbooks =  users.filter((each) => each.fine> 0);
//     if(finedbooks.length === 0){
//         return res.status(404).json({
//             success:false,
//             message: "No fined Books."
//         })
//     }
  

//     return res.status(200).json({
//         success: true,
//         finedbooks,
//     });
// });


module.exports = router;