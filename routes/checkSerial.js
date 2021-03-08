/* Imports */
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv'

const router = express.Router();
dotenv.config();

/* Connection details */
const API_BASE = process.env.API_BASE;

/* Routes */
router.get("/:serial", async (req, res) => {
    const body = {
        "type": "/ConsultaTiquetesSerial",
        "parameters": {
            "ticketSerialNumber": `${req.params.serial}`
        }
    };

    axios.post(API_BASE, body)
        .then((response) => {
            res.json(response.data);
        })
        .catch((e) => { res.send("An error ocurred checking serial: " + e) });

});

export default router;
