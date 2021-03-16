import SorteoCounter from '../services/SorteoCounter.js'
import fetchLastId from '../services/fetchLastId.js'
import fetchSaveSorteos from '../services/fetchSaveSorteos.js'
import Sorteo from '../models/Sorteo.js';


let updateDb = async () => {
    const latestInDB = await Sorteo.findOne({}).sort({ id: -1 }).lean();
    const lastIdOrgAPI = await fetchLastId();
    if (latestInDB.id !== lastIdOrgAPI) {
        console.log("Loading sorteos...");
        fetchSaveSorteos(lastIdOrgAPI - latestInDB);
    } else {
        console.log("DB is up to date");
        SorteoCounter.SC = latestInDB.id;
    }
};

export default updateDb;
