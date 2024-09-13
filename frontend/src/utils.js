// returns time in form of 00:00:00
export function formatTime(timestamp) {
    return new Date(timestamp).toISOString().slice(11, 19);
}

export function getDuration(start, stop) {
    let delta = stop - start;
    return formatTime(delta);
}
