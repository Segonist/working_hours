import Root from "./Root.jsx";
import Error from "./routes/Error.jsx";
import App from "./routes/App.jsx";
import Login, { action as loginAction } from "./routes/Login.jsx";
import Register, { action as registerAction } from "./routes/Register.jsx";
import Profile from "./routes/Profile.jsx";
import Shifts, { loader as shiftsLoader } from "./routes/Shifts.jsx";
import { createBrowserRouter, Navigate } from "react-router-dom";

const routes = createBrowserRouter([
    {
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Navigate to="/stopwatch" />,
            },
            {
                path: "/login",
                element: <Login />,
                action: loginAction,
            },
            {
                path: "/register",
                element: <Register />,
                action: registerAction,
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
                path: "/shifts",
                element: <Shifts />,
                loader: shiftsLoader,
            },
        ],
    },
]);

export default routes;
