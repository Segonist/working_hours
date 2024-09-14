import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Paper, Stack, Box, Typography } from "@mui/material";
import Stopwatch from "../components/Stopwatch.jsx";
import StopwatchButton from "../components/StopwatchButton.jsx";
import { createShift, getShift, updateShift } from "../requests/shifts";

const App = () => {
    const setPageName = useOutletContext();
    useEffect(() => {
        setPageName("Секундомір");
    }, [setPageName]);

    const [startTime, setStartTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        tryResume();
    });

    async function tryResume() {
        let data = await getShift(0);

        if (data && data.state == 0) {
            localStorage.setItem("shift_id", data.id);
            setStartTime(data.start_timestamp);
            setIsRunning(true);
        }
    }

    async function handleStart() {
        let start = new Date().getTime();
        start = parseInt(start / 1000);

        let body = {
            id: null,
            user_id: 1,
            start_timestamp: start,
            end_timestamp: null,
            state: 0,
            wage: 8,
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
        stop = parseInt(stop / 1000);
        let body = {
            end_timestamp: stop,
            state: 1,
        };

        await updateShift(shift_id, body);

        setIsRunning(false);
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                sx={{
                    px: 4,
                    py: 1,
                }}
            >
                <Stack direction="row" gap={4}>
                    <Typography fontSize={50}>
                        <Stopwatch
                            startTime={startTime}
                            isRunning={isRunning}
                        />
                    </Typography>
                    <StopwatchButton
                        isRunning={isRunning}
                        handleStart={handleStart}
                        handleStop={handleStop}
                    />
                </Stack>
            </Paper>
        </Box>
    );
};

export default App;
