import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Backend from "../../constants/Backend";
import BearerHeader from "../../constants/BearerHeader";
import { Box, Container, Dialog, DialogContent, IconButton, Link, List, ListItem, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import PostUI from "../../components/PostUI";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

export default function Queries() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    
    useEffect(() => {
        let isMounted = true;

        const getSSEStream = async () => {
            try {
                const response = await fetch(`${Backend}/queries/view`, {
                    headers: {
                        Authorization: BearerHeader,
                        Accept: "text/event-stream",
                    },
                });

                if (!response.body) throw new Error("Stream response body is empty");

                const reader = response.body.getReader();
                const decoder = new TextDecoder();

                const readStream = async () => {
                    while (isMounted) {
                        const { value, done } = await reader.read();
                        if (done || !isMounted) break;
                        const chunk = decoder.decode(value);
                        try {
                            const processed = JSON.parse(chunk);
                            setPosts(processed.sort((a, b) => b.likes.length - a.likes.length));
                            setLoading(false);
                        } catch (error) {
                            console.error("Error parsing SSE data:", error);
                        }
                    }
                };

                readStream();
            } catch (err) {
                console.error("Error fetching SSE:", err);
                setLoading(false);
            }
        };

        getSSEStream();

        return () => {
            isMounted = false; 
        };
    }, []);

    return (
        <Container maxWidth={false} sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh", display: "flex", gap: 1, pt: "75px" }}>
            <Box sx={{ width: { sm: "100%", lg: "67%" }, display: "flex", flexDirection: "column", gap: 2, pb: 2 }}>
                {loading ? 
                    Array.from(new Array(5)).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
                    )) :
                    posts.length > 0 ? 
                        posts.map((post, index) => <PostUI key={index} data={{...post, tag: "Queries"}} />) :
                        <Typography sx={{ m: "auto" }}>No posts available</Typography>
                }
            </Box>
            {isMobile ? (
                <>
                    <IconButton
                        onClick={() => navigate("/make-post")}
                        sx={{ position: "fixed", right: 15, bottom: 65, bgcolor: theme.palette.primary.main, color: "white", "&:hover": { bgcolor: theme.palette.primary.dark }, zIndex: 1000 }}
                    >
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => setOpenPopup(true)}
                        sx={{ position: "fixed", right: 15, bottom: 15, bgcolor: theme.palette.primary.main, color: "white", "&:hover": { bgcolor: theme.palette.primary.dark }, zIndex: 1100 }}
                    >
                        <InfoIcon />
                    </IconButton>
                    <Dialog open={openPopup} onClose={() => setOpenPopup(false)} fullWidth>
                        <DialogContent sx={{ p: 3 }}>
                            <Box>
                                <IconButton onClick={() => setOpenPopup(false)} sx={{ position: "absolute", top: 8, right: 8 }}>
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h5" sx={{ mb: 2 }}>Queries</Typography>
                                <Typography variant="body1">Looking for answers or want to share your knowledge? Queries is the go-to platform for asking questions, engaging in discussions, and upvoting the best posts.</Typography>
                                <List>
                                    <ListItem>🔹 Ask Anything – Post questions on any topic, academic or personal.</ListItem>
                                    <ListItem>🔹 Answer & Engage – Share insights and help others with your knowledge.</ListItem>
                                    <ListItem>🔹 Upvote Questions – Highlight important or interesting questions.</ListItem>
                                    <ListItem>🔹 Explore Discussions – Browse and contribute to ongoing conversations.</ListItem>
                                </List>
                                <Typography>Join Queries today—ask, answer, upvote, and be part of a knowledge-sharing community!</Typography>
                                <Typography sx={{ my: 1 }}>Developed by TeamX</Typography>
                                <Typography sx={{ my: 1 }}>Check out our other projects:</Typography>
                                <Link variant="body1" href="https://git2know.netlify.app/" target="_blank">Git2know</Link>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </>
            ) : (
                <Box sx={{ width: "25%", height: "86%", position: "fixed", right: 15, display: { sm: "none", lg: "block" }, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.200", borderRadius: 5, py: 2, px: 3, overflowY: "auto" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Queries</Typography>
                                <Typography variant="body1">Looking for answers or want to share your knowledge? Queries is the go-to platform for asking questions, engaging in discussions, and upvoting the best posts.</Typography>
                                <List>
                                    <ListItem>🔹 Ask Anything – Post questions on any topic, academic or personal.</ListItem>
                                    <ListItem>🔹 Answer & Engage – Share insights and help others with your knowledge.</ListItem>
                                    <ListItem>🔹 Upvote Questions – Highlight important or interesting questions.</ListItem>
                                    <ListItem>🔹 Explore Discussions – Browse and contribute to ongoing conversations.</ListItem>
                                </List>
                                <Typography>Join Queries today—ask, answer, upvote, and be part of a knowledge-sharing community!</Typography>
                    <Typography sx={{ my: 1 }}>Developed by TeamX</Typography>
                    <Typography sx={{ my: 1 }}>Check out our other projects:</Typography>
                    <Link variant="body1" href="https://git2know.netlify.app/" target="_blank">Git2know</Link>
                </Box>
            )}
            <IconButton
                size="large"
                onClick={() => navigate("/make-post")}
                sx={{ display: { sm: "none", lg: "flex" }, position: "fixed", right: 345, bottom: 25, bgcolor: theme.palette.primary.main, color: "white", "&:hover": { bgcolor: theme.palette.primary.dark } }}
            >
                <AddCircleIcon sx={{ height: 30, width: 30 }}/>
            </IconButton>
        </Container>
    );
};
