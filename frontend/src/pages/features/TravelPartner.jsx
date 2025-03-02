import { useEffect, useRef, useState } from "react";
import Backend from "../../constants/Backend";
import BearerHeader from "../../constants/BearerHeader"
import { Box, Container } from "@mui/material";
import TravelPostUI from "../../components/TravelPostUI";


export default function TravelPartner() {
    const [travelPosts, setTravelPosts] = useState([]);
    
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getTravelStream();
    }, []);

    const getTravelStream = () => {
        fetch(`${Backend}/travel/view`, {
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
                    if (done) {
                        console.log("SSE connection closed.");
                        return;
                    }

                    const chunk = decoder.decode(value);
                    const processed = JSON.parse(chunk)
                    console.log(processed);
                    setTravelPosts(processed);
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
        <Container maxWidth={false} sx={{ bgcolor: "background.default" , color: "text.primary", minHeight: "100vh", display: "flex", gap: 2, pt: "75px" }}>
            <Box sx={{ width: { sm: "100%", lg: "65%" }, display: "flex", flexDirection: "column", gap: 2 }}>
            {travelPosts.map((travel, index) => <TravelPostUI key={index} data={travel}/>)}
            </Box>
        </Container>
    )
}