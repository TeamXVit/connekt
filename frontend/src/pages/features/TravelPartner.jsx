import { useEffect, useRef, useState } from "react";
import Backend from "../../constants/Backend";
import BearerHeader from "../../constants/BearerHeader";
import { Box, CircularProgress, Container, Typography, useTheme } from "@mui/material";
import TravelPostUI from "../../components/TravelPostUI";

export default function TravelPartner() {
    const [travelPosts, setTravelPosts] = useState([]);
    const theme = useTheme();
    const eventSourceRef = useRef(null);

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
                            setTravelPosts((prevPosts) =>
                                [...processed, ...prevPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            );
                        } catch (error) {
                            console.error("Error parsing SSE data:", error);
                        }
                    }
                };

                readStream();
            } catch (err) {
                console.error("Error fetching SSE:", err);
            }
        };

        getTravelStream();

        return () => {
            isMounted = false; 
        };
    }, []);

    return (
        <Container maxWidth={false} sx={{ bgcolor: "background.default", color: "text.primary", minHeight: "100vh", display: "flex", gap: 1, pt: "75px" }}>
            <Box sx={{ width: { sm: "100%", lg: "67%" }, display: "flex", flexDirection: "column", gap: 2, pb: 2 }}>
                {travelPosts.length > 0 ? 
                    travelPosts.map((travel, index) => <TravelPostUI key={index} data={travel} />) :
                    <CircularProgress sx={{ m: "auto" }} />
                }
            </Box>
            <Box sx={{ width: "25%", height: "86%", position: "fixed", right: 15, display: { sm: "none", lg: "flex" }, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.200", borderRadius: 5, py: 2, px: 3 }}>
                <Typography variant="h5">How it works</Typography>
            </Box>
        </Container>
    );
};
