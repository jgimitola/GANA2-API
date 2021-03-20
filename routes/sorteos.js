import express from 'express';
import Sorteo from '../models/Sorteo.js'

const router = express.Router();

router.get('/', async (req, res) => {
    let order = req.query.order || 'desc';
    let offset = (req.query.offset === undefined) ? 0 : parseInt(req.query.offset);
    let limit = (req.query.limit === undefined) ? 0 : parseInt(req.query.limit);
    if (limit > await Sorteo.collection.countDocuments()) {
        res.json({ message: "Limit exceeded sorteo's count", error: 'LIMIT_EXCEEDED_COLLECTION_SIZE' });
    } else {
        Sorteo.find({}).sort({ id: (order === 'asc' ? 1 : -1) }).skip(offset).limit(limit).lean()
            .then((sorteos) => {
                res.json(sorteos);
            });
    }

});

export default router;