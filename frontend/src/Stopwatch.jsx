import { useEffect, useState, useRef } from "react";

const Stopwatch = ({ startTime, isRunning }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalId = useRef(null);

    useEffect(() => {
        if (startTime && isRunning) {
            const startTimestamp = new Date(startTime).getTime();
            const currentTimestamp = new Date().getTime();
            const initialElapsed = currentTimestamp - startTimestamp;
            setElapsedTime(initialElapsed);

            if (intervalId.current) {
                clearInterval(intervalId.current);
            }

            intervalId.current = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1000);
            }, 1000);
        }

        if (!isRunning && intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [startTime, isRunning]);

    return <h1>{new Date(elapsedTime).toISOString().slice(11, 19)}</h1>;
};

export default Stopwatch;
