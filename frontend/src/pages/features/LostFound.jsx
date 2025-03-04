import { Box, Container, Typography } from "@mui/material";

export default function LostFound() {
    return (
        <Container maxWidth={false} sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh", pt: "75px", pb: "30px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4">Lost & Found</Typography>
            <Box sx={{ width: "90%" }}>
                <Typography><strong>Lost Something? Found Something?</strong></Typography>
                <Typography>Our <strong>Lost and Found</strong> page helps you reconnect with misplaced belongings.</Typography>
            </Box>

            <Box sx={{ width: "90%" }}>
                <Typography variant="h5">How It Works:</Typography>
                <Typography variant="h6">🔹 Lost an item?</Typography>
                <Typography>Post details so others can help you find it.</Typography>

                <Typography variant="h6" mt={2}>🔹 Found something?</Typography>
                <Typography>List it here so the owner can claim it.</Typography>

                <Typography variant="h6" mt={2}>🔹 Easy and quick!</Typography>
                <Typography>Connect with others and return items hassle-free.</Typography>
            </Box>

            <Box sx={{ width: "90%" }}>
                <Typography variant="h5">Why Use Lost & Found?</Typography>
                <Typography>✔️ <strong>Reconnect with lost belongings</strong> – Post and track lost items easily.</Typography>
                <Typography>✔️ <strong>Help your community</strong> – Return found items and assist others in need.</Typography>
                <Typography>✔️ <strong>Keep the campus connected</strong> – Support a culture of honesty and responsibility.</Typography>
            </Box>

            <Box sx={{ width: "90%" }}>
                <Typography variant="h5">Get Involved:</Typography>
                <Typography>🔹 <strong>Report a Lost Item</strong> – Describe your lost item so others can help.</Typography>
                <Typography>🔹 <strong>Post a Found Item</strong> – Let the owner find their lost belongings.</Typography>
                <Typography>🔹 <strong>Spread the Word</strong> – Help others by sharing posts and keeping an eye out.</Typography>
            </Box>
            <Typography variant="h4">Coming soon...</Typography>
        </Container>
    );
}
