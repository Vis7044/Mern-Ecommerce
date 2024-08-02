const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs')

async function userSignupController(req,res) {
    try {
        const {email,password,name} = req.body;

        const user = await userModel.findOne({email});

        if(user) {
            throw new Error("Already user exists.");
        }
        if(!email) {
            throw new Error("Please Provide Email")
        }
        if(!password) {
            throw new Error("Please Provide Password")
        }
        if(!name) {
            throw new Error("Please Provide Name")
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        if(!hashedPassword) {
            throw new Error("Somehing went wrong")
        }

        const payload = {
            ...req.body,
            role: 'GENERAL',
            password: hashedPassword
        }

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message: "User created Successfully"
        })

    } catch (err) {
        res.json({
            message: err.message,
            error: true,
            success: false
        })
    }
}


module.exports = userSignupController;