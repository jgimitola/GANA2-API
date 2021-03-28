import mongoose from 'mongoose'

/* Structure of a way of win */
const winChance = mongoose.Schema({
    amount: Number,
    cash: Number
}, { _id: false });

/* Structure of a game with all ways of win */
const game = mongoose.Schema({
    "x+1": {
        type: winChance
    },
    "2+1": {
        type: winChance
    },
    "3+0": {
        type: winChance
    },
    "3+1": {
        type: winChance
    },
    "4+0": {
        type: winChance
    },
    "4+1": {
        type: winChance
    },
    "5+0": {
        type: winChance
    },
    "5+1": {
        type: winChance
    }
}, { _id: false });

/* Principal schema of all the properties of a Sorteo */
const SorteoSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    sorteo: {
        type: Number
    },
    date: {
        type: Date
    },
    stock: {
        type: [Number],
        validate: [(size) => size.length === 2, "Incorrect size"]
    },
    cityWinner: {
        type: [String],
        validate: [(size) => size.length === 2, "Incorrect size"]
    },
    ballsBaloto: {
        type: [Number],
        validate: [(size) => size.length === 6, "Incorrect size"]
    },
    ballsRevancha: {
        type: [Number],
        validate: [(size) => size.length === 6, "Incorrect size"]
    },
    winnersBaloto: {
        type: game
    },
    winnersRevancha: {
        type: game
    }
});

export default mongoose.model("sorteos", SorteoSchema);
