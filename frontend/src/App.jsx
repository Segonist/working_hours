import "./App.css";
import { useEffect, useState } from "react";
import Stopwatch from "./Stopwatch.jsx";

const App = () => {
    const host = "http://127.0.0.1:8000";

    const [startTime, setStartTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        tryResume();
    }, []);

    async function tryResume() {
        const request = new Request(`${host}/api/shift/last`, {
            method: "GET",
        });

        await fetch(request)
            .then((responce) => {
                if (!responce.ok) {
                    throw new Error(
                        `${responce.status} ${responce.statusText}`
                    );
                }
                return responce.json();
            })
            .then((data) => {
                data = data[0];

                if (data && data.state == 0) {
                    localStorage.setItem("shift_id", data.id);
                    setStartTime(data.start_timestamp);
                    setIsRunning(true);
                }
            });
    }

    async function handleStart() {
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
                    throw new Error(
                        `${responce.status} ${responce.statusText}`
                    );
                }

                return responce.json();
            })
            .then((data) => {
                let id = data.id;
                localStorage.setItem("shift_id", id);
            });

        setStartTime(start);
        setIsRunning(true);
    }

    async function handleStop() {
        let stop = new Date().getTime();
        let shift_id = localStorage.getItem("shift_id");

        const request = new Request(`${host}/api/shift/${shift_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                end_timestamp: stop,
                state: 1,
            }),
        });

        await fetch(request).then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }
        });

        setIsRunning(false);
    }

    return (
        <>
            <Stopwatch startTime={startTime} isRunning={isRunning} />
            {!isRunning ? (
                <button onClick={handleStart}>Почати зміну</button>
            ) : (
                <button onClick={handleStop}>Закінчити зміну</button>
            )}
        </>
    );
};

export default App;
