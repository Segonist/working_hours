import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <>
            <img src="/desintegration.gif" alt="" />
            <h1>
                Помилка {error.status} {error.statusText}
            </h1>
        </>
    );
};

export default Error;
