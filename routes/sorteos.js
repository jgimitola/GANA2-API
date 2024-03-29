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


/**
 * This route receives a sorteo param an returns the corresponding sorteo.
 */
router.get('/:sorteo', async (req, res) => {
    let sorteo = parseInt(req.params.sorteo);

    Sorteo.find({ sorteo }).then(sorteos => {
        if (sorteos.length > 0) {
            res.json(sorteos[0]);            
        } else {            
            res.status(404).json({ message: `Sorteo with number ${sorteo}, was not found`});
        }
    }).catch((error) => {
        res.status(500).json({ message: `Couldn't get sorteo's number ${sorteo}`, error })
    })
});

export default router;