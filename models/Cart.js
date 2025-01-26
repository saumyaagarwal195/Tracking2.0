//add doctors to carts
const mongoose= require("mongoose");

const cartSchema = new mongoose.Schema(
    {
      userId:{type: String, required: true},
      doctors: [
        {
            doctorId: { type: String },
            doctor_name: {type: String},
            address: {type : Object}
        },
      ],   
    },
    {timestamps: true}
);

module.exports = mongoose.model("Cart", cartSchema);