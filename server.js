const express = require('express');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use("api/contacts", require("./backend/routes/contactRoutes"));





app.listen(port, () => console.log(`server running at port ${port}`))