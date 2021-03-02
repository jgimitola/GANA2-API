const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const API_BASE = process.env.API_BASE;
const PORT = process.env.PORT || 3000;

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB is connected");
    } catch (error) {
        console.error(error);
    }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const checkSerial = require("./routes/checkSerial");
app.use("/checkSerial", checkSerial);

app.get("/", (req, res) => {
    res.json({ message: "Welcome bro, you are the best!" });
});

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`);
});
connectDB();
