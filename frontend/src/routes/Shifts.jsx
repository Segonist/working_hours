import { Link, useLoaderData } from "react-router-dom";
import { getShifts } from "../shifts";

export async function loader() {
    const shifts = await getShifts();
    return shifts;
}

const Shifts = () => {
    const shifts = useLoaderData();

    function formatTime(timestamp) {
        return new Date(timestamp).toISOString().slice(11, 19);
    }

    function getDuration(start, stop) {
        let delta = stop - start;
        return formatTime(delta);
    }

    return (
        <>
            <ol>
                {shifts.map((shift) => (
                    <li key={shift.id}>
                        <Link to={`shift/${shift.id}`}>
                            {formatTime(shift.start_timestamp)}
                            {shift.state
                                ? "-" + formatTime(shift.end_timestamp)
                                : ""}
                            ,{" "}
                            {shift.state
                                ? getDuration(
                                      shift.start_timestamp,
                                      shift.end_timestamp
                                  )
                                : "не закінчено"}{" "}
                            {shift.wage}₴/год
                        </Link>
                    </li>
                ))}
            </ol>
        </>
    );
};

export default Shifts;
