const Doctor = require("../models/Doctor");

const { verifyToken, verifyTokenAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE a new doctor 
router.post("/",verifyTokenAndAdmin, async (req,res)=>{
    const newDoctor = new Doctor(req.body);
    try{
        const savedDoctor = await newDoctor.save();
        return res.status(200).json(savedDoctor);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {  
    try{
        const updatedDoctor = await Doctor.findByIdAndUpdate(
           req.params.id, 
           {
             $set: req.body
           }, 
           {new: true}
        );
        return res.status(200).json(updatedDoctor);
    }catch(err){
        return res.status(500).json(err);
    }   
});

//DELETE

router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Doctor.findByIdAndDelete(req.params.id)
        return res.status(200).json("Doctor has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET DOCTOR
router.get("/find/:id",  async (req, res) =>{
    try{
        const doctor = await Doctor.findById(req.params.id);
        
        res.status(200).json(doctor);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET ALL doctors
router.get("/", async (req, res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let doctors;
        	
        if(qNew){
            doctors = await Doctor.find().sort({createdAt : -1}).limit(1);
        }else if(qCategory){
            doctors = await Doctor.find({categories:{
                $in: [qCategory],
            },
        });
        }else{
            doctors = await Doctor.find();
        }
        res.status(200).json(doctors);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;