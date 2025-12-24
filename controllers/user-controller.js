const UserModel = require("../models/users-models");
const BookModel = require("../models/books-models");


const getAllUsers = async(req, res) => {
    const users = await UserModel.find();

    if(users.length === 0){
        return res.status(404).json({
            success: false,
            message: "No User Found!."
        });
    }
    res.status(200).json({
        success:true,
        data: users,
    });
}

const getuserById = async(req, res) => {
    const { id } = req.params

    const user =await UserModel.findById(id);
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
}

const updateUserById = async(req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user =await UserModel.findOneAndUpdate({
        _id: id
    },
    {
        $set: {
            ...data,
        },
    },
    { 
        new: true
    }
)

    if(!user) 
        return res.status(404).json({ success: false, message: "User Not Found! "});

    return res.status(200).json({
        success:true,
        data: updatedUsers,
    });
}

const deleteUser = async(req, res) =>{
    const { id } = req.params;

    const user = await UserModel.deleteOne({
        _id: id
    });
    if(!user){
        return res.status(404).json({
            success: false,
            message: "User with current id doesn't exist!.",
        });

    }

    res.status(202).json({
        success: true,
        message: `User  with Id ${id} has been deleted.`,
    });
};

const createuser = async(req, res) => {

}

module.exports = { getAllUsers , getuserById, updateUserById, deleteUser, createuser}