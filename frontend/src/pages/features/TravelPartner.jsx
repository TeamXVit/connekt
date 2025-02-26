import { Container, Typography } from "@mui/material"


export default function TravelPartner() {
    return (
        <Container maxWidth="xl" sx={{  bgcolor: "background.default" , color: "text.primary", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Typography variant="h3">Travel Partner</Typography>
        </Container>
    )
}