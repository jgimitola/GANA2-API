import express from 'express';
import Sorteo from '../models/Sorteo.js'

const router = express.Router();

router.get('/', (req, res) => {
    Sorteo.find({}).sort({ id: -1 }).lean()
        .then((sorteos) => {
            res.json(sorteos);
        });
});

export default router;