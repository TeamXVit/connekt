import { Box, Container, Typography } from "@mui/material";

export default function Queries() {
    return (
        <Container maxWidth={false} sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh", pt: "75px", pb: "30px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4">Welcome to Queries – Ask, Answer, and Upvote!</Typography>
            <Box sx={{ width: "90%" }}>
                <Typography>Got a question or looking for answers? <strong>Queries</strong> is the place to ask anything, provide insights, and upvote the best posts to help your peers!</Typography>
            </Box>

            <Box sx={{ width: "90%" }}>
                <Typography variant="h5">How It Works:</Typography>
                <Typography variant="h6">🔹 Ask Anything</Typography>
                <Typography>Post your questions on any topic, whether it's academic, personal, or anything else!</Typography>
                
                <Typography variant="h6" mt={2}>🔹 Answer & Engage</Typography>
                <Typography>Respond to questions and help others with your knowledge.</Typography>

                <Typography variant="h6" mt={2}>🔹 Upvote Questions</Typography>
                <Typography>Found a question you think is important or interesting? Upvote it to give it more visibility!</Typography>

                <Typography variant="h6" mt={2}>🔹 Explore Discussions</Typography>
                <Typography>Browse through questions and contribute by sharing your insights.</Typography>
            </Box>

            <Box sx={{ width: "90%" }}>
                <Typography variant="h5">Why Use Queries?</Typography>
                <Typography>✔️ <strong>Get Answers Quickly</strong> – Receive responses from fellow students and peers who can help you out.</Typography>
                <Typography>✔️ <strong>Help Others</strong> – Share your knowledge and experience by answering their questions.</Typography>
                <Typography>✔️ <strong>Support Great Questions</strong> – Upvote questions that stand out or deserve more attention.</Typography>
                <Typography>✔️ <strong>Stay Informed</strong> – Follow the most upvoted questions and be part of the ongoing discussions.</Typography>
            </Box>

            <Box sx={{ width: "90%" }}>
                <Typography variant="h5">Get Involved:</Typography>
                <Typography>🔹 <strong>Ask</strong> – Post a question to start the conversation.</Typography>
                <Typography>🔹 <strong>Answer</strong> – Contribute your insights and knowledge to questions you can help with.</Typography>
                <Typography>🔹 <strong>Upvote</strong> – Upvote questions that you find valuable or interesting.</Typography>
                <Typography>🔹 <strong>Follow Threads</strong> – Stay updated with the questions and answers you care about.</Typography>
            </Box>
            <Typography variant="h4">Coming soon...</Typography>
        </Container>
    );
}
