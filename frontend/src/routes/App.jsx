import { useEffect, useState } from "react";
import Stopwatch from "../components/Stopwatch.jsx";
import { createShift, getLastShift, updateShift } from "../shifts.js";

const App = () => {
    const [startTime, setStartTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        tryResume();
    }, []);

    async function tryResume() {
        let data = await getLastShift();

        if (data && data.state == 0) {
            localStorage.setItem("shift_id", data.id);
            setStartTime(data.start_timestamp);
            setIsRunning(true);
        }
    }

    async function handleStart() {
        let start = new Date().getTime();

        let body = {
            id: null,
            user_id: 0,
            start_timestamp: start,
            end_timestamp: null,
            state: 0,
            wage: 10.0,
        };

        let data = await createShift(body);

        let id = data.id;
        localStorage.setItem("shift_id", id);

        setStartTime(start);
        setIsRunning(true);
    }

    async function handleStop() {
        let shift_id = localStorage.getItem("shift_id");

        let stop = new Date().getTime();
        let body = {
            end_timestamp: stop,
            state: 1,
        };

        await updateShift(shift_id, body);

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
