require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db")

connectDB();

const port = process.env.PORT || 4000





app.listen(3000,()=>{

    console.log("server is running on port : 3000 ");


    
})