const UserModel = require("../models/users-models");
const BookModel = require("../models/books-models");
const IssuedBook = require("../dto/booksdto");

const getAllBooks = async(req, res) => {
    const books = await BookModel.find();
    
    if( books.length === 0 ){
        return res.status(404).json({
            success: false, message: "No Book Found."
        });
    }
    return res.status(200).json({
        success: true,
        data: books,
    });
};

const getSingleBookById = async(req, res) => {
    const { id } = req.params;

    const book = await BookModel.findById(id);
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
};

const getAllissuedBooks = async( req ,res) => {
    
    const users = await UserModel.find({
        issuedBook: { $exists: true },

    }).populate("issuedBook");

    const issuedBooks = users.map((each) => new IssuedBook(each));

    if(issuedBooks.length === 0)
        return res.status(404).json({
        success: false, 
        message: "No Book issued yet",
    });

    return res.status(200).json({
        success: true,
        data: issuedBooks,
    });
};

module.exports = {getAllBooks, getSingleBookById, getAllissuedBooks };