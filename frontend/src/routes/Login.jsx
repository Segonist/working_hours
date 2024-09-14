import { Link, Form, redirect } from "react-router-dom";
import { TextField, Typography, Stack, Button } from "@mui/material";

export async function action({ request }) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    const newRequest = new Request(`http://127.0.0.1:8000/api/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials),
    });

    await fetch(newRequest)
        .then((responce) => {
            if (!responce.ok) {
                throw new Error(`${responce.status} ${responce.statusText}`);
            }

            return responce.json();
        })
        .then((data) => {
            localStorage.setItem("token", data.access_token);
        });

    return redirect("/shifts");
}

const Login = () => {
    return (
        <>
            <Typography variant="h3">Вхід</Typography>
            <Form method="post">
                <Stack direction="column" alignItems="flex-start" gap={1}>
                    <TextField
                        id="username"
                        name="username"
                        label="Ім'я користувача"
                        variant="outlined"
                        required
                    />
                    <TextField
                        id="password"
                        name="password"
                        label="Пароль"
                        variant="outlined"
                        type="password"
                        required
                    />
                    <Button variant="outlined" type="submit">
                        Увійти
                    </Button>
                </Stack>
            </Form>
            <Link to={"/register"}>Зареєструватися</Link>
        </>
    );
};

export default Login;
