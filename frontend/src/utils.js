// returns time in form of 00:00:00
export function formatHHMMSS(timestamp) {
    timestamp *= 1000;
    return new Date(timestamp).toISOString().slice(11, 19);
}

export function formatHHMM(timestamp) {
    timestamp *= 1000;
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

export function formatMMDD(timestamp) {
    timestamp *= 1000;
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}`;
}

export function getDuration(start, stop) {
    let delta = stop - start;
    return delta;
}
