const host = "http://127.0.0.1:8000";

const stopwatch_element = document.getElementById("stopwatch");
let stopwatch = new Stopwatch(stopwatch_element);

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
    console.log(response.text());
}
