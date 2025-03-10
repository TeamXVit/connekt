/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router"
import Backend from "../../constants/Backend";
import BearerHeader from "../../constants/BearerHeader";
import { Box, Container, Dialog, DialogContent, IconButton, Link, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";
import TravelPostUI from "../../components/TravelPostUI";
import InfoIcon from "@mui/icons-material/Info";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

export default function TravelPartner() {
    const [travelPosts, setTravelPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    
    useEffect(() => {
        let isMounted = true;

        const getTravelStream = async () => {
            try {
                const response = await fetch(`${Backend}travel/view`, {
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
                            setTravelPosts(processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                            setLoading(false);
                            console.log(processed)
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

        getTravelStream();

        return () => {
            isMounted = false; 
        };
    }, []);

    return (
        <Container maxWidth={false} sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh", display: "flex", gap: 1, pt: "75px" }}>
            <Box sx={{ width: { sm: "100%", lg: "67%" }, display: "flex", flexDirection: "column", gap: 2, pb: 2, position: "relative" }}>
                {loading ? 
                    Array.from(new Array(5)).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
                    )) :
                    travelPosts.length > 0 ? 
                        travelPosts.map((travel, index) => <TravelPostUI key={index} data={travel} />) :
                        <Typography>No travel posts available</Typography>
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
                                <Typography variant="h5" sx={{ mb: 2 }}>Travel Partner</Typography>
                                <Typography variant="body1">
                                    Looking for a ride companion? Travel Partner connects you with others traveling to the same destination while respecting your preferences.
                                    Travel with comfort – Choose to ride with someone of the same gender.
                                    Post your travel details – Heading to the bus stop, railway station, or airport? Let others know.
                                    Find a matching travel buddy – Make your journey safer, smarter, and more enjoyable.
                                    Travel your way—find your Travel Partner today!
                                </Typography>
                                <Typography sx={{ my: 1 }}>Developed by TeamX</Typography>
                                <Typography sx={{ my: 1 }}>Check out our other projects:</Typography>
                                <Link variant="body1" href="https://git2know.netlify.app/" target="_blank">Git2know</Link>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </>
            ) : (
                <Box sx={{ width: "25%", height: "86%", position: "fixed", right: 15, display: { sm: "none", lg: "block" }, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.200", borderRadius: 5, py: 2, px: 3 }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>Travel Partner</Typography>
                    <Typography variant="body1">
                        Looking for a ride companion? Travel Partner connects you with others traveling to the same destination while respecting your preferences.
                        Travel with comfort – Choose to ride with someone of the same gender.
                        Post your travel details – Heading to the bus stop, railway station, or airport? Let others know.
                        Find a matching travel buddy – Make your journey safer, smarter, and more enjoyable.
                        Travel your way—find your Travel Partner today!
                    </Typography>
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
