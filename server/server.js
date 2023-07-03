const express = require("express")
const cors = require('cors')
const connectToDb = require("./db.js")

const app = express();

//env config
require("dotenv").config();

connectToDb();

app.use(cors());
app.use(express.json());

//routes
const authRoutes = require("./routes/auth.js")
const categoryRoutes = require("./routes/category.js")
const productRoutes = require("./routes/product.js")

app.use("/api/v1/auth",authRoutes) //user routes
app.use("/api/v1/category",categoryRoutes) 
app.use("/api/v1/product",productRoutes) 

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})