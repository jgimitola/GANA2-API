import express from 'express';
import Sorteo from '../models/Sorteo.js';
import SorteoCounter from '../services/SorteoCounter.js';

const router = express.Router();

router.get('/', (req, res) => {
    Sorteo.findOne({ id: SorteoCounter.SC }).lean()
        .then((latest) => {
            res.json(latest);
        })
        .catch((error) => {
            res.json({ message: "An error ocurred fetching latest sorteo", error });
        });
});

export default router;