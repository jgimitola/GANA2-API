import express from 'express';
import Sorteo from '../models/Sorteo.js'

const router = express.Router();

/**
 * This route handles sorteo's requests, it receives by query parameters
 * an order, offset and limit to fetch sorteo's.
 * 
 * The query parameters must have these values: 
 *  - order: desc or asc.
 *  - offset: any number.
 *  - limit: 0 (to fetch all) or any number.   
*/
router.get('/', async (req, res) => {
    // Extract query parameters and assing default values for undefined parameters.
    let order = req.query.order || 'desc';
    let offset = (!req.query.offset) ? 0 : parseInt(req.query.offset);
    let limit = (!req.query.limit) ? 0 : parseInt(req.query.limit);

    Sorteo.find({}).sort({ id: (order === 'asc' ? 1 : -1) }).skip(offset).limit(limit).lean()
        .then((sorteos) => {
            res.json(sorteos);
        })
        .catch((error) => {
            res.status(500).json({ message: "An error ocurred fetching sorteo's", error });
        });
});

export default router;