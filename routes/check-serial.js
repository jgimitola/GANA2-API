import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv'

const router = express.Router();
dotenv.config();

const API_BASE = process.env.API_BASE; // base API url.

/**
 * This route handles serial checking using the base API. It receives a URL
 * param, that must have the following format: /^\d{4}-\d{9}-\d{6}$/
 * 
 * Because this route is using another API, we do the format check
 * to avoid waiting for the base API to realize that the serial is wrong,
 * in this way we improve a little the response time.
 */
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
            .catch((error) => { res.status(500).json({ message: "An error ocurred checking serial", error }) });
    } else {
        res.status(400).json({ message: "Serial has wrong format.", error: "BAD_SERIAL_FORMAT" });
    }
});

export default router;
