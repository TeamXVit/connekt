/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import Backend from "../../constants/Backend";
import BearerHeader from "../../constants/BearerHeader";
import { Box, Container, Dialog, DialogContent, IconButton, Link, List, ListItem, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import PostUI from "../../components/PostUI";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

export default function Anonymous() {
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
                const response = await fetch(`${Backend}/anonymous/view`, {
                    headers: {
                        Authorization: BearerHeader,
                        Accept: "text/event-stream",
                    },
                });
        
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let hasData = false;
                let emptyStateTimer;
        
                const readStream = async () => {
                    emptyStateTimer = setTimeout(() => {
                        if (isMounted && !hasData) {
                            setPosts([]);
                            setLoading(false);
                        }
                    }, 3000);
        
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
                                    hasData = true;
                                    clearTimeout(emptyStateTimer);
                                    
                                    setPosts(prev => {
                                        const existingIds = new Set(prev.map(post => post._id));
                                        const newPosts = posts.filter(post => !existingIds.has(post._id));
                                        
                                        const mergedPosts = [
                                            ...newPosts,
                                            ...prev.map(prevPost => {
                                                const updatedPost = posts.find(p => p._id === prevPost._id);
                                                if (updatedPost) {
                                                    return {
                                                        ...prevPost,
                                                        comments: updatedPost.comments || prevPost.comments,                                                    
                                                    };
                                                }
                                                return prevPost;
                                            })
                                        ];
                                        
                                        return mergedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                                    });
                                    setLoading(false);
                                } else if (posts.length === 0) {
                                    hasData = true;
                                    clearTimeout(emptyStateTimer);
                                    setPosts([]);
                                    setLoading(false);
                                }
                            } catch (error) {
                                console.error("Error in message processing:", error);
                            }
                        }
                    }
        
                    if (isMounted && !hasData) {
                        setPosts([]);
                        setLoading(false);
                    }
                };
        
                await readStream();
            } catch (err) {
                console.error("SSE Connection Error:", err);
                if (isMounted) {
                    setPosts([]);
                    setLoading(false);
                }
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
                        posts.map((post, index) => <PostUI key={index} data={{...post, tag: "Anonymous"}} />) :
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
                                <Typography variant="h5" sx={{ mb: 2 }}>Anonymous confessions</Typography>
                                <Typography variant="body1">Got secrets that are too juicy for your group chat? Spill the tea anonymously—we won’t judge (we’ll just read 👀).</Typography>
                                <List>
                                    <ListItem>🫢 Say It Without Saying It - Crushes, cringe moments, or chaotic thoughts? Let it out. </ListItem>
                                    <ListItem>🤣 Laugh, Cry, Repeat - Read wild confessions and feel weirdly better about your own life.</ListItem>
                                    <ListItem>🤫 No Names, No Shame - Confess like nobody&apos;s watching… because nobody knows it&apos;s you.</ListItem>
                                </List>
                                <Typography>Got something to confess?  
                                Drop it. Read it. Regret it later. 💀</Typography>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </>
            ) : (
                <Box sx={{ width: "25%", height: "86%", position: "fixed", right: 15, display: { sm: "none", lg: "block" }, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.200", borderRadius: 5, py: 2, px: 3, overflowY: "auto" }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Anonymous Confessions</Typography>
                    <Typography variant="body1">Got secrets that are too juicy for your group chat? Spill the tea anonymously—we won’t judge (we’ll just read 👀).</Typography>
                    <List>
                        <ListItem>🫢 Say It Without Saying It - Crushes, cringe moments, or chaotic thoughts? Let it out. </ListItem>
                        <ListItem>🤣 Laugh, Cry, Repeat - Read wild confessions and feel weirdly better about your own life.</ListItem>
                        <ListItem>🤫 No Names, No Shame - Confess like nobody&apos;s watching… because nobody knows it&apos;s you.</ListItem>
                    </List>
                    <Typography>Got something to confess?  
                    Drop it. Read it. Regret it later. 💀</Typography>
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
