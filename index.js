/* Imports */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';


/* Connection details */
const PORT = process.env.PORT || 3000;
dotenv.config()

const app = express();

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Routes */
import checkSerial from './routes/checkSerial.js';
import createSorteo from './routes/createSorteo.js';

app.use("/checkSerial", checkSerial);
app.use("/createSorteo", createSorteo);

import Sorteo from './models/Sorteo.js';
import fetchSaveSorteos from './services/fetchSaveSorteos.js'

/* Database connection */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MongoDB is connected")
        let count = await Sorteo.collection.countDocuments()
        //fetchSaveSorteos(count !== 0 ? 1 : 0)
    })
    .catch((e) => console.log("An error occurred connecting to MongoDB \n" + e));

app.get("/", (req, res) => {
    res.json({ message: "Welcome bro, you are the best!" });
});

app.listen(PORT, () => {
    console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('Closing connection...');
    mongoose.disconnect().then(() => {
        console.log(`Connection is closed. State is: ${mongoose.connection.readyState}`)
        process.exit(0);
    });
});
