import { useEffect, useState, useRef } from "react";
import { formatHHMMSS } from "../utils";

const Stopwatch = ({ startTime, isRunning }) => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalId = useRef(null);

    useEffect(() => {
        if (startTime && isRunning) {
            let currentTimestamp = new Date().getTime();
            currentTimestamp = parseInt(currentTimestamp / 1000);

            const initialElapsed = currentTimestamp - startTime;
            setElapsedTime(initialElapsed);

            if (intervalId.current) {
                clearInterval(intervalId.current);
            }

            intervalId.current = setInterval(() => {
                setElapsedTime(() => {
                    let now = new Date().getTime();
                    now = parseInt(now / 1000);
                    let time = now - startTime;

                    return time;
                });
            }, 500);
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

    return formatHHMMSS(elapsedTime);
};

export default Stopwatch;
