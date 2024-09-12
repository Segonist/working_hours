import { Box, Stack, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                width: "100%",
                borderTop: 1,
                borderRadius: 1,
                position: "absolute",
                bottom: 0,
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Stack
                direction="row"
                sx={{
                    mx: 3,
                    my: 1,
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography>Made by Segonist</Typography>
                <Stack direction="row" spacing={1}>
                    <a href="https://github.com/Segonist" target="_blank">
                        <img src="github.svg" alt="github link" />
                    </a>
                    <a
                        href="https://discordapp.com/users/491260818139119626"
                        target="_blank"
                    >
                        <img src="discord.svg" alt="discord link" />
                    </a>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Footer;
