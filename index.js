const express= require("express");
const app=express();
const mongoose= require("mongoose");
const dotenv= require("dotenv");
dotenv.config();
const userRoute= require("./routes/user");
const authRoute= require("./routes/auth");
const doctorRoute = require("./routes/doctor");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=> console.log("DB Connection Successful!"))
    .catch((err)=> {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/orders",orderRoute);
app.use("/api/carts",cartRoute);
    
app.listen(process.env.PORT || 5000,() => {
    console.log("Backend server is running")
});