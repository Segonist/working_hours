const host = "http://127.0.0.1:8000";

const stopwatch_element = document.getElementById("stopwatch");
let stopwatch = new Stopwatch(stopwatch_element);

window.onload = resume_stopwatch();

async function resume_stopwatch() {
    console.log("loading...");

    const request = new Request(`${host}/api/shift/last`, {
        method: "GET",
    });

    await fetch(request)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }
            return responce.json();
        })
        .then((data) => {
            data = data[0];

            if (data && data.state == 0) {
                localStorage.setItem("shift_id", data.id);
                stopwatch.start_timestamp = data.start_timestamp;
                stopwatch.resume();
            }
        });

    console.log("loading complete");
}

async function start_stopwatch() {
    let start = new Date().getTime();

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

    await fetch(request)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }

            return responce.json();
        })
        .then((data) => {
            id = data.id;
            localStorage.setItem("shift_id", id);
        });

    stopwatch.start_timestamp = start;
    stopwatch.resume();
}

async function stop_stopwatch() {
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

    await fetch(request).then((responce) => {
        if (!responce.ok) {
            throw new Error(`${responce.status} ${responce.statusText}`);
        }
    });

    stopwatch.stop();
}
