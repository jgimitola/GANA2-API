import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config()

const API_BASE = process.env.API_BASE;

let fetchLastId = async () => {
    const body = {
        "type": "/LastGameResult",
        "parameters": {
            "order": "sorteo DESC",
            "offset": 0,
            "limit": 1
        }
    };

    let latestID = (await axios.post(API_BASE, body)).data[0].id;
    return latestID;
}

export default fetchLastId;