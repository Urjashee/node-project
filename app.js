require("dotenv").config();
const express = require('express'); //import
const app = express(); //initialize
const userRouter = require("./api/users/user.router")
const {createPool} = require("mysql");

app.use(express.json());

app.use("/api/users",userRouter)

// app.get("/api", (req, rep) => {
//     res.json({
//         success: 1,
//         message: "Rest API"
//     });
// });//listen to end points


app.listen(process.env.APP_PORT, () => {
    console.log("Server is running:3000");
})


