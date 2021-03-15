/* Imports */
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv'

const router = express.Router();
dotenv.config();

const API_BASE = process.env.API_BASE;

router.get("/:serial", (req, res) => {
    let regexp = /^\d{4}-\d{9}-\d{6}$/gm;
    let serial = req.params.serial;

    if (regexp.test(serial)) {
        const body = {
            "type": "/ConsultaTiquetesSerial",
            "parameters": {
                "ticketSerialNumber": `${serial}`
            }
        };

        axios.post(API_BASE, body)
            .then((response) => {
                res.json(response.data);
            })
            .catch((error) => { res.json({ message: "An error ocurred checking serial", error }); });
    } else {
        res.json({ message: "Bad serial", error: "BAD_SERIAL_FORMAT" });
    }
});

export default router;
