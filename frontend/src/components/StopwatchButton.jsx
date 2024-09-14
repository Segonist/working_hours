import { Button } from "@mui/material";
import {
    PlayCircleFilled as PlayCircleFilledIcon,
    StopCircle as StopCircleIcon,
} from "@mui/icons-material";

const StopwatchButton = ({ isRunning, handleStart, handleStop }) => {
    const buttonSx = { fontSize: 40 };
    return !isRunning ? (
        <Button onClick={handleStart}>
            <PlayCircleFilledIcon sx={buttonSx} />
        </Button>
    ) : (
        <Button onClick={handleStop}>
            <StopCircleIcon sx={buttonSx} />
        </Button>
    );
};

export default StopwatchButton;
