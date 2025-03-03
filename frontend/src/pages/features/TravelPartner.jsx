import { useEffect, useRef, useState } from "react";
import Backend from "../../constants/Backend";
import BearerHeader from "../../constants/BearerHeader"
import { Box, Container, Typography, useTheme } from "@mui/material";
import TravelPostUI from "../../components/TravelPostUI";


export default function TravelPartner() {
    const [travelPosts, setTravelPosts] = useState([]);
    
    const theme = useTheme();

    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getTravelStream();
    }, []);

    const getTravelStream = async () => {
        await fetch(`${Backend}/travel/view`, {
            headers: {
                Authorization: BearerHeader,
                Accept: "text/event-stream",
            },
        })
        .then((response) => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            const readStream = () => {
                reader.read().then(({ value, done }) => {
                    if (done) return;
                    
                    const chunk = decoder.decode(value);
                    const processed = JSON.parse(chunk)
                    console.log(processed)
                    setTravelPosts(processed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                    readStream(); 
                });
            };

            readStream();
        })
        .catch((err) => {
            console.error("Error fetching SSE:", err);
        });
    };

    return (
        <Container maxWidth={false} sx={{ bgcolor: "background.default" , color: "text.primary", minHeight: "100vh", display: "flex", gap: 1, pt: "75px" }}>
            <Box sx={{ width: { sm: "100%", lg: "67%" }, display: "flex", flexDirection: "column", gap: 2, pb: 2 }}>
            {travelPosts.length > 0 ? 
            travelPosts.map((travel, index) => <TravelPostUI key={index} data={travel}/>) :
            <Typography sx={{ m: "auto" }}>No Posts Yet</Typography>
            }
            </Box>
            <Box sx={{ width: "25%", height: "86%", position: "fixed", right: 15, display: { sm: "none", lg: "flex" }, bgcolor: theme.palette.mode === "dark" ? "grey.900" : "grey.200", borderRadius: 5, py: 2, px: 3 }}>
                <Typography variant="h5">How it works</Typography>
            </Box>
        </Container>
    );
};