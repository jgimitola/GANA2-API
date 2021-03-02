const mongoose = require("mongoose");

const SorteoSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    cityWinner: {
        type: String,
        validate: [(size) => size.length === 2, "Se ha excedido el tamaño."],
    },
});

module.exports = mongoose.model("Sorteos", SorteoSchema);
