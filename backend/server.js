const express = require('express');
const errorHandler = require('./middleware/errorHandler');
// const dotenv = require('dotenv').config();
const app = express();

const port = 3000;

app.use(express.json())//Parser to retrieve JSON data from client side
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);





app.listen(port, () => console.log(`server running at port ${port}`))