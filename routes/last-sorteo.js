import express from 'express';
import Sorteo from '../models/Sorteo.js';
import SorteoCounter from '../services/SorteoCounter.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const latest = await Sorteo.find({ id: SorteoCounter.SC });
        res.json(latest);
    } catch (error) {
        res.json({ message: "An error ocurred fetching latest sorteo", error });
    }
});

export default router;