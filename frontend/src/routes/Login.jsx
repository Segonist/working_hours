import { Link, Form } from "react-router-dom";
import { TextField, Typography } from "@mui/material";

const Login = () => {
    return (
        <>
            <Typography variant="h3">Увійти</Typography>
            <Form method="post">
                <TextField
                    id="username"
                    label="Ім'я користувача"
                    variant="outlined"
                />
                <TextField
                    id="password"
                    label="Пароль"
                    variant="outlined"
                    type="password"
                />
            </Form>
            <Link to={"/register"}>Register</Link>
        </>
    );
};

export default Login;
