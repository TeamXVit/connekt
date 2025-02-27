import { Container, Typography } from "@mui/material";


export default function Home() {
    
    return (
        <Container maxWidth="xl" sx={{  bgcolor: "background.default" , color: "text.primary", minHeight: "100vh", display: "flex", flexDirection: { sm: "column-reverse", lg: "row" }, justifyContent: { sm: "center", lg: "space-between" }, alignItems: "center", gap: 2 }}>
            <Typography variant="h3">Home</Typography>
        </Container>
    )
}