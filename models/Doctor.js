const mongoose= require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
      doctor_name:{type: String, required: true},
      img :{ type: String },
      qualification:{type:String, required:true},
      specialisation:{type:String, required:true},
      address: {type : Object , required: true},
      contact:{type:Number},
      area:{type:String},
      desc: {type: String}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Doctor", doctorSchema);