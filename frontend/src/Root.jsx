import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const Root = () => {
    return (
        <>
            <Header />
            <Container maxWidth="md">
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};

export default Root;
