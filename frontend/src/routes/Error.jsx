const Error = ({ code, message }) => {
    return (
        <>
            <img src="/desintegration.gif" alt="" />
            <h1>
                Помилка {code} - {message}
            </h1>
        </>
    );
};

export default Error;
