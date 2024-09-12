import { useEffect } from "react";
import { getShift } from "../shifts";

const Shift = () => {
    useEffect(() => {
        let data = getShift();
        console.log(data);
    }, []);

    return <h1>Shift</h1>;
};

export default Shift;
