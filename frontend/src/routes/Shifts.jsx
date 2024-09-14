import { useEffect } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@mui/material";
import { getShifts } from "../requests/shifts";
import { getDuration, formatMMDD, formatHHMMSS, formatHHMM } from "../utils";

export async function loader() {
    const shifts = await getShifts();
    return shifts;
}

const Shifts = () => {
    const setPageName = useOutletContext();
    useEffect(() => {
        setPageName("Зміни");
    }, [setPageName]);

    const shifts = useLoaderData();

    return (
        <>
            <TableContainer component={Paper} sx={{ mt: 10 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell>Початок</TableCell>
                            <TableCell>Кінець</TableCell>
                            <TableCell>Тривалість</TableCell>
                            <TableCell>Ставка</TableCell>
                            <TableCell>Сума</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shifts.map((shift) =>
                            shift.state ? (
                                <TableRow key={shift.id}>
                                    <TableCell>
                                        {formatMMDD(shift.start_timestamp)}
                                    </TableCell>
                                    <TableCell>
                                        {formatHHMM(shift.start_timestamp)}
                                    </TableCell>
                                    <TableCell>
                                        {formatHHMM(shift.end_timestamp)}
                                    </TableCell>
                                    <TableCell>
                                        {formatHHMMSS(
                                            getDuration(
                                                shift.start_timestamp,
                                                shift.end_timestamp
                                            )
                                        )}
                                    </TableCell>
                                    <TableCell>{shift.wage}zł</TableCell>
                                    <TableCell>
                                        {parseInt(
                                            (getDuration(
                                                shift.start_timestamp,
                                                shift.end_timestamp
                                            ) /
                                                3600) *
                                                shift.wage
                                        )}
                                        zł
                                    </TableCell>
                                </TableRow>
                            ) : (
                                ""
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Shifts;
