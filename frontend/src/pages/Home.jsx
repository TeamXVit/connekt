/* eslint-disable no-unused-vars */
import { Box, Container, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function Home() {
    
    return (
        <Container maxWidth="xl" sx={{  bgcolor: "background.default" , color: "text.primary", minHeight: "100vh", display: "flex", flexDirection: { sm: "column-reverse", lg: "row" }, justifyContent: { sm: "center", lg: "space-between" }, alignItems: "center", gap: 2 }}>
            <Typography variant="h3">Home</Typography>
        </Container>
    )
}