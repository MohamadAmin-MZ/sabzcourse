const app = require("./app")
const mongoose = require("mongoose")
require("dotenv").config()

const port = process.env.PORT;

console.log(port);

(async () => {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongose connected.");
})()


app.listen(port, () => {
    console.log(`server runing on port: ${port}`);
})

