import { Link, useLoaderData } from "react-router-dom";
import { getShifts } from "../requests/shifts";
import { getDuration, formatTime } from "../utils";

export async function loader() {
    const shifts = await getShifts();
    return shifts;
}

const Shifts = () => {
    const shifts = useLoaderData();

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
