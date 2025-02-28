//the user is always registered as not admin. Admin status has to be changed directly from database
const mongoose= require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String, 
            required: true,
            unique: true
        },
        email : {type: String, required: true, unique:true },
        password:{ type: String, required: true },
        isAdmin:{
            type: Boolean,
            default: false
        },
        img:{type:String},
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);