import express from 'express';
import Sorteo from '../models/Sorteo.js';
import SorteoCounter from '../services/SorteoCounter.js';

const router = express.Router();

/**
 * This route handles request for the latest sorteo in DataBase, it uses the 
 * SorteoCounter to know the latest id of the latest sorteo.
 */
router.get('/', (req, res) => {
    Sorteo.findOne({ id: SorteoCounter.SC }).lean()
        .then((latest) => {
            res.json(latest);
        })
        .catch((error) => {
            res.status(500).json({ message: "An error ocurred fetching latest sorteo", error });
        });
});

export default router;