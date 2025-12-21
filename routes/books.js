const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/user.json");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books,
    })
});



router.get("/issued", (req, res) => {
    const userswithIssuedBook = users.filter((each) => {
        if( each.issueBookId ) return each;

    });

    const issuedBooks = [];

    userswithIssuedBook.forEach((each) => {
        const book = books.find((book) => book.id === each.issueBookId );

        book.issuedBy = each.name;
        book.issuedDate = each.issueDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);

    });
    if(issuedBooks.length === 0)
        return res.status(404).json({
        success: false, 
        message: "No Book issued yet",
    });

    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    // const { data } = req.body;

    const book = books.find((each) => each.id === Number(id));
    if(!book){
        return res.status(404).json({
            success: false,
            message: "Book not Found!"
        });
    }
    res.status(200).json({
        success: true,
        data: book,
    });
}); 


module.exports = router;