import express from 'express';
import Sorteo from '../models/Sorteo.js'

const router = express.Router();

router.get('/', async (req, res) => {
    // This is so slow.
    const sorteos = await Sorteo.find({});
    res.json(sorteos);
});

export default router;