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
    Box,
    Typography,
    Paper,
    IconButton,
    Snackbar,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { authorize } from "../requests/auth";

export async function action({ request }) {
    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    const [code, data] = await authorize(credentials);
    console.log("action ", data);

    if (code == 401) {
        return "Неправильне ім'я користувача бао пароль";
    }

    localStorage.setItem("token", data.access_token);

    return redirect("/shifts");
}

const Login = () => {
    const setPageName = useOutletContext();
    useEffect(() => {
        setPageName("Вхід");
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
                            Увійдіть до свого облікового запису
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
                        <Button variant="contained" type="submit">
                            Увійти
                        </Button>
                    </Stack>
                    <Typography sx={{ mt: 3 }}>
                        Бажаєте створити обліковий запис?
                    </Typography>
                    <Button
                        variant="outlined"
                        LinkComponent={Link}
                        to={"/register"}
                    >
                        Зареєструватися
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

export default Login;
