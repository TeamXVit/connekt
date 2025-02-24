import { AppBar, Box, Toolbar, Typography } from "@mui/material";


export default function TopBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "background.default" }}>
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3 }}>
                    Connekt
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}