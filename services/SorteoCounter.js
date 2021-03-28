/**
 * This class is used to store a static reference to the latest
 * Sorteo Id that is in the DB.
 */
class SorteoCounter {
    static SC = 0; // When API is initialized this is immediately updated.
}

export default SorteoCounter;