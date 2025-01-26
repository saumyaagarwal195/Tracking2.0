//sending an order of doctors to admin
const mongoose= require("mongoose");

const orderSchema = new mongoose.Schema(
    {
      userId:{type: String, required: true},
      date_of_visit:{type:Date, required:true},
      doctors: [
        {
            doctorId: { type: String },
            doctor_name: {type: String},
            address: {type : Object}
        },
      ],   
      notes: {type : Object, required:true},
      status: {type: String, default: "pending" }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);