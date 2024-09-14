import { useLoaderData } from "react-router-dom";
import { getShift } from "../requests/shifts";
import { getDuration, formatTime } from "../utils";

export async function loader({ params }) {
    const shift = await getShift(params.shiftId);
    return shift;
}

const Shift = () => {
    const shift = useLoaderData();

    return `${formatTime(shift.start_timestamp)}${
        shift.state ? "-" + formatTime(shift.end_timestamp) : ""
    }, ${
        shift.state
            ? getDuration(shift.start_timestamp, shift.end_timestamp)
            : "не закінчено"
    } ${shift.wage}₴/год`;
};

export default Shift;
