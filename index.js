/* General imports */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cron from 'node-cron';

/* Route imports */
import checkSerial from './routes/check-serial.js';
import lastSorteo from './routes/last-sorteo.js';
import sorteos from './routes/sorteos.js';

/* Service imports */
import fetchSaveSorteos from './services/fetchSaveSorteos.js';
import updateDb from './services/updateDB.js';

/* Schema imports */
import Sorteo from './models/Sorteo.js';

/* Connection details */
const PORT = process.env.PORT || 3000;
dotenv.config()

const app = express();

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // We haven't used it yet.

/* Routes */
app.use("/check-serial", checkSerial);
app.use("/last-sorteo", lastSorteo);
app.use("/sorteos", sorteos);

/* Database connection */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("MongoDB is connected")
        let count = await Sorteo.collection.estimatedDocumentCount();
        if (count === 0) {
            console.log("DB is empty, filling it out...")
            fetchSaveSorteos(0);
        } else {
            updateDb();
        }
    })
    .catch((e) => console.log("An error occurred connecting to MongoDB \n" + e));

/* Setting a task to update automatically the DB */
cron.schedule('0 15 5 * * Thursday,Sunday', async () => {
    await updateDb();
}, {
    timezone: 'America/Bogota' //To avoid problems if the API is hosted in other timezone.
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome bro, you are the best!" });
});

app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});

/* Close connection with DB when CTRL - C is used */
process.on('SIGINT', () => {
    console.log('Closing connection...');
    mongoose.disconnect().then(() => {
        console.log(`Connection is closed. State is: ${mongoose.connection.readyState}`)
        process.exit(0);
    });
});
