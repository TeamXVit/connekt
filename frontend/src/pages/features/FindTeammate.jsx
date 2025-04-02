import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Backend from "../../constants/Backend";
import BearerHeader from "../../constants/BearerHeader";
import { Box, Container, Dialog, DialogContent, IconButton, Link, List, ListItem, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import PostUI from "../../components/PostUI";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

export default function FindTeammate() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    
    useEffect(() => {
        let isMounted = true;
        let buffer = '';
    
        const processData = (rawData) => {
            try {
                let dataStr = rawData.replace(/^data: /, '').trim();
                
                if (dataStr.startsWith('[') && dataStr.endsWith(']')) {
                    const postsArray = JSON.parse(dataStr);
                    return postsArray;
                } else {
                    const repaired = dataStr
                        .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g, '$1"$2"$3')
                        .replace(/'/g, '"')
                        .replace(/,\s*([}\]])/g, '$1');
                    
                    const parsed = JSON.parse(`[${repaired}]`); 
                    return Array.isArray(parsed) ? parsed : [parsed];
                }
            } catch (error) {
                console.error("Error processing data:", error, "Raw data:", rawData);
                return [];
            }
        };
    
        const getSSEStream = async () => {
            try {
                const response = await fetch(`${Backend}/teammate/view`, {
                    headers: {
                        Authorization: BearerHeader,
                        Accept: "text/event-stream",
                    },
                });
    
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
    
                const readStream = async () => {
                    while (isMounted) {
                        const { value, done } = await reader.read();
                        if (done || !isMounted) break;
    
                        const chunk = decoder.decode(value, { stream: true });
                        buffer += chunk;
    
                        const messages = buffer.split('\n');
                        buffer = messages.pop() || '';
    
                        for (const message of messages) {
                            if (!message.trim()) continue;
    
                            try {
                                const posts = processData(message);
                                if (posts.length > 0) {
                                    setPosts(prev => [
                                        ...posts,
                                        ...prev
                                    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                                    setLoading(false);
                                }
                            } catch (error) {
                                console.error("Error in message processing:", error);
                            }
                        }
                    }
                };
    
                await readStream();
            } catch (err) {
                console.error("SSE Connection Error:", err);
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
                        posts.map((post, index) => <PostUI key={index} data={post} />) :
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
                                <Typography variant="h5" sx={{ mb: 2 }}>Find a Teammate</Typography>
                                <Typography variant="body1">Looking for a partner to collaborate on your college activities? Find a Teammate helps you connect with like-minded individuals for all kinds of projects and events.</Typography>
                                <List>
                                   <ListItem>🔹 Collaborate on ECS or Capstone Projects - Find someone with the right skills and ideas to work with you.</ListItem> 
                                   <ListItem>🔹 Join Hackathons & Competitions - Need a team for an upcoming challenge? Look for teammates here!</ListItem> 
                                   <ListItem>🔹 Connect for College Events - Whether it’s a seminar, workshop, or community activity, find others who are passionate about the same things.</ListItem> 
                                </List>                                                  
                                <Typography>Get the best team together—find your perfect teammate today!</Typography>
                                <Typography sx={{ my: 1 }}>Developed by TeamX</Typography>
                                <Typography sx={{ my: 1 }}>Check out our other projects:</Typography>
                                <Link variant="body1" href="https://git2know.netlify.app/" target="_blank">Git2know</Link>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </>
            ) : (
                <Box sx={{ width: "25%", height: "86%", position: "fixed", right: 15, display: { sm: "none", lg: "block" }, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.200", borderRadius: 5, py: 2, px: 3, overflowY: "auto" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Find a Teammate</Typography>
                    <Typography variant="body1">Looking for a partner to collaborate on your college activities? Find a Teammate helps you connect with like-minded individuals for all kinds of projects and events.</Typography>
                    <List>
                       <ListItem>🔹 Collaborate on ECS or Capstone Projects - Find someone with the right skills and ideas to work with you.</ListItem> 
                       <ListItem>🔹 Join Hackathons & Competitions - Need a team for an upcoming challenge? Look for teammates here!</ListItem> 
                       <ListItem>🔹 Connect for College Events - Whether it’s a seminar, workshop, or community activity, find others who are passionate about the same things.</ListItem> 
                    </List>                                                  
                    <Typography>Get the best team together—find your perfect teammate today!</Typography>
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
