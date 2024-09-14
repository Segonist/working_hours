import { useEffect, useState } from "react";
import {
    Link,
    Form,
    redirect,
    useOutletContext,
    useActionData,
    useNavigation,
} from "react-router-dom";
import {
    TextField,
    Stack,
    Button,
    Typography,
    Box,
    Paper,
    Snackbar,
    IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { newUser } from "../requests/auth";

export async function action({ request }) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);
    if (credentials.password !== credentials.repeat_password) {
        return "Паролі не співпадають";
    }
    delete credentials["repeat_password"];

    const [code, data] = await newUser(credentials);
    if (code == 409) {
        return "Це ім'я користувача вже зайняте";
    }

    localStorage.setItem("token", data.access_token);

    return redirect("/shifts");
}

const Register = () => {
    const setPageName = useOutletContext();
    useEffect(() => {
        setPageName("Реєстрація");
    }, [setPageName]);

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );
    const errorMessage = useActionData();
    const navigation = useNavigation();
    useEffect(() => {
        if (errorMessage) {
            setOpen(true);
            setMessage(errorMessage);
        }
    }, [errorMessage, navigation.state]);

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper
                    component={Stack}
                    alignItems="flex-start"
                    sx={{
                        width: "300px",
                        padding: 2,
                    }}
                >
                    <Stack
                        component={Form}
                        method="post"
                        direction="column"
                        alignItems="flex-start"
                        gap={1}
                    >
                        <Typography variant="h5">
                            Створіть новий обліковий запис
                        </Typography>
                        <TextField
                            id="username"
                            name="username"
                            label="Ім'я користувача"
                            variant="outlined"
                            sx={{ width: "100%" }}
                            required
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Пароль"
                            variant="outlined"
                            type="password"
                            sx={{ width: "100%" }}
                            required
                        />
                        <TextField
                            id="repeat_password"
                            name="repeat_password"
                            label="Повторіть пароль"
                            variant="outlined"
                            type="password"
                            sx={{ width: "100%" }}
                            required
                        />
                        <Button variant="contained" type="submit">
                            Зареєструватися
                        </Button>
                    </Stack>
                    <Typography sx={{ mt: 3 }}>
                        Вже маєте обліковий запис?
                    </Typography>
                    <Button
                        variant="outlined"
                        LinkComponent={Link}
                        to={"/login"}
                    >
                        Увійти
                    </Button>
                </Paper>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </>
    );
};

export default Register;
