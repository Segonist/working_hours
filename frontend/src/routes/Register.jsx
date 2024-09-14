import { Link, Form, redirect } from "react-router-dom";
import { TextField, Typography, Stack, Button } from "@mui/material";
import { newUser } from "../requests/auth";

export async function action({ request }) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    delete credentials["repeat_password"];

    await newUser(credentials);

    return redirect("/shifts");
}

const Register = () => {
    return (
        <>
            <Typography variant="h3">Реєстрація</Typography>
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
                    <TextField
                        id="repeat_password"
                        name="repeat_password"
                        label="Повторіть пароль"
                        variant="outlined"
                        type="password"
                        required
                    />
                    <Button variant="outlined" type="submit">
                        Зареєструватися
                    </Button>
                </Stack>
            </Form>
            <Link to={"/login"}>Увійти</Link>
        </>
    );
};

export default Register;
