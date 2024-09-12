import Root from "./Root.jsx";
import Error from "./routes/Error.jsx";
import App from "./routes/App.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Profile from "./routes/Profile.jsx";
import Shift from "./routes/Shift.jsx";
import Shifts from "./routes/Shifts.jsx";
import { getShifts } from "./shifts.js";

import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/stopwatch",
                element: <App />,
            },
            {
                path: "/shift/:shiftId",
                element: <Shift />,
            },
            {
                path: "/shifts",
                element: <Shifts />,
                loader: getShifts,
            },
        ],
    },
]);

export default routes;
