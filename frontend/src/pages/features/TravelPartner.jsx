import { Container, Typography } from "@mui/material"


export default function TravelPartner() {
    return (
        <Container maxWidth="xl" sx={{  bgcolor: "background.default" , color: "text.primary", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", gap: 2, pt: "75px" }}>
            <Typography variant="h3">Travel Partner</Typography>
            
        </Container>
    )
}