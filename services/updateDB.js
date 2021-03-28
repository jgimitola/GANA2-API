import SorteoCounter from '../services/SorteoCounter.js'
import fetchLastId from '../services/fetchLastId.js'
import fetchSaveSorteos from '../services/fetchSaveSorteos.js'
import Sorteo from '../models/Sorteo.js';

/**
 * This functions checks if the contents of the API are updated, comparing the latest
 * Id in the API with the latest Id in the base API.
 */
let updateDb = async () => {
    const latestInDB = await Sorteo.findOne({}).sort({ id: -1 }).lean();
    const lastIdOrgAPI = await fetchLastId();
    SorteoCounter.SC = latestInDB.id;

    if (latestInDB.id !== lastIdOrgAPI) {
        console.log("Loading sorteos...");
        fetchSaveSorteos(lastIdOrgAPI - latestInDB.id); // Id normally behaves lineally, it is convenient to use this.
    } else {
        console.log("DB is up to date");
    }
};

export default updateDb;
