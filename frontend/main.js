const host = "http://127.0.0.1:8000";

const stopwatch_element = document.getElementById("stopwatch");
let stopwatch = new Stopwatch(stopwatch_element);

window.onload = resume_stopwatch();

async function resume_stopwatch() {
    console.log("loading...");

    const request = new Request(`${host}/api/shift/last`, {
        method: "GET",
    });
    const response = await fetch(request);
    let shift = await response.text();
    shift = JSON.parse(shift)[0];
    if (shift.state == 0) {
        localStorage.setItem("shift_id", shift.id);
        stopwatch.start_timestamp = shift.start_timestamp;
        stopwatch.resume();
    }

    console.log("loading complete");
}

async function start_stopwatch() {
    stopwatch.start();

    let start = stopwatch.start_timestamp;
    const request = new Request(`${host}/api/shift`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: null,
            user_id: 0,
            start_timestamp: start,
            end_timestamp: null,
            state: 0,
            wage: 10.0,
        }),
    });
    const response = await fetch(request);
    let id = await response.text().id;
    localStorage.setItem("shift_id", id);
}

async function stop_stopwatch() {
    // TODO can't stop without refresh
    stopwatch.stop();

    let end = stopwatch.start_timestamp + stopwatch.milliseconds_past;
    let shift_id = localStorage.getItem("shift_id");
    const request = new Request(`${host}/api/shift/${shift_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            end_timestamp: end,
            state: 1,
        }),
    });
    const response = await fetch(request);
    console.log(response.status);
}
