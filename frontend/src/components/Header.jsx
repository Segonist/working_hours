import { Box, Typography } from "@mui/material";

const Header = () => {
    return (
        <Box
            sx={{
                width: "100vw",
                borderBottom: 1,
                borderRadius: 1,
                position: "relative",
                top: 0,
                mb: 5,
            }}
        >
            <Typography sx={{ m: 2 }}>WH</Typography>
        </Box>
    );
};

export default Header;
