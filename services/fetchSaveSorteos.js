import axios from 'axios';
import dotenv from 'dotenv';
import SorteoCounter from '../services/SorteoCounter.js'
dotenv.config()

import Sorteo from '../models/Sorteo.js'

const API_BASE = process.env.API_BASE;

let fetchSaveSorteos = (sorteosCount) => {
    const body = {
        "type": "/LastGameResult",
        "parameters": {
            "order": "sorteo DESC",
            "offset": 0,
            "limit": sorteosCount
        }
    };

    axios.post(API_BASE, body)
        .then((response) => {
            let parsedSorteos = [];
            for (const res of response.data) {
                if (res.id > SorteoCounter.SC) {
                    const sorteo = {
                        id: res.id,
                        sorteo: res.sorteo,
                        date: res.date,
                        stock: [res.baloto_acumulado / 1000000, res.revancha_acumulado / 1000000],
                        cityWinner: [(res.baloto_ciudad === "") ? null : res.baloto_ciudad, (res.revancha_ciudad === "") ? null : res.revancha_ciudad],
                        ballsBaloto: [res.baloto1, res.baloto2, res.baloto3, res.baloto4, res.baloto5, res.baloto6],
                        ballsRevancha: [res.revancha1, res.revancha2, res.revancha3, res.revancha4, res.revancha5, res.revancha6],
                        winnersBaloto: {
                            "x+1": {
                                amount: res.baloto_ganadores8,
                                cash: res.baloto_ganadores8_valor
                            },
                            "2+1": {
                                amount: res.baloto_ganadores7,
                                cash: res.baloto_ganadores7_valor
                            },
                            "3+0": {
                                amount: res.baloto_ganadores6,
                                cash: res.baloto_ganadores6_valor
                            },
                            "3+1": {
                                amount: res.baloto_ganadores5,
                                cash: res.baloto_ganadores5_valor
                            },
                            "4+0": {
                                amount: res.baloto_ganadores4,
                                cash: res.baloto_ganadores4_valor
                            },
                            "4+1": {
                                amount: res.baloto_ganadores3,
                                cash: res.baloto_ganadores3_valor
                            },
                            "5+0": {
                                amount: res.baloto_ganadores2,
                                cash: res.baloto_ganadores2_valor
                            },
                            "5+1": {
                                amount: res.baloto_ganadores1,
                                cash: res.baloto_ganadores1_valor
                            }
                        },
                        winnersRevancha: {
                            "x+1": {
                                amount: res.revancha_ganadores8,
                                cash: res.revancha_ganadores8_valor
                            },
                            "2+1": {
                                amount: res.revancha_ganadores7,
                                cash: res.revancha_ganadores7_valor
                            },
                            "3+0": {
                                amount: res.revancha_ganadores6,
                                cash: res.revancha_ganadores6_valor
                            },
                            "3+1": {
                                amount: res.revancha_ganadores5,
                                cash: res.revancha_ganadores5_valor
                            },
                            "4+0": {
                                amount: res.revancha_ganadores4,
                                cash: res.revancha_ganadores4_valor
                            },
                            "4+1": {
                                amount: res.revancha_ganadores3,
                                cash: res.revancha_ganadores3_valor
                            },
                            "5+0": {
                                amount: res.revancha_ganadores2,
                                cash: res.revancha_ganadores2_valor
                            },
                            "5+1": {
                                amount: res.revancha_ganadores1,
                                cash: res.revancha_ganadores1_valor
                            }
                        }
                    };
                    parsedSorteos.push(sorteo);
                }
            }

            SorteoCounter.SC = parsedSorteos[0].id;

            Sorteo.collection.insertMany(parsedSorteos)
                .then(() => { console.log("Sorteo/s have been saved.") })
                .catch((e) => { console.log("An error occurred \n" + e) });
        })
        .catch((e) => { console.log("An error occurred fetching last sorteo.") });
};

export default fetchSaveSorteos;