const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
require('dotenv').config();


connectDb()

const app = express();
const port = 3000;



app.use(express.json())//Parser to retrieve JSON data from client side

app.use(errorHandler);

//* Routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));




app.listen(port, () => console.log(`server running at port ${port}`))