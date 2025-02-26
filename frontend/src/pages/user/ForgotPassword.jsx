import { Box, Container, Grid2, TextField, Typography } from "@mui/material"



export default function ForgotPassword() {
    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default" ,height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Grid2 sx={{ height: { sm: "65%", md: "70%" }, width: { sm: "95%", md: "75%", lg: "35%" }, border: 1, borderColor: "grey.500", borderRadius: 1  }} container direction="column">
                <Box component="form" sx={{ bgcolor: "background.default", color: "text.primary", height: "100%", width: "100%", p: 2, display: "flex", flexDirection: "column",  gap: { sm: 3, lg: 4 }, justifyContent: "space-evenly", borderRadius: 1 }} >
                    <Typography variant="h4">Reset Password</Typography> 
                    <TextField />
                </Box>
            </Grid2>
        </Container>
    );
};