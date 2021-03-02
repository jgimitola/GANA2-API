const express = require("express");
const Sorteo = require("../models/Sorteo");
const router = express.Router();

// Routes
router.post("/", (req, res) => {
    res.json({ serials: [] });
});

router.get("/", async (req, res) => {
    try {
        const sorteos = await Sorteo.find();
        res.json(sorteos);
    } catch (error) {
        res.json({ error: 1 });
    }
});

module.exports = router;
