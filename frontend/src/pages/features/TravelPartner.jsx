import { useEffect } from "react";
import axios from "../../axios/axios";
import { Container, Typography } from "@mui/material";


export default function TravelPartner() {
    
    useEffect(() => {
        const fetchData = () => {
            axios.get("/travel/view")
            .then(res => console.log(res))
            .catch(e => console.log(e))
        };

        fetchData();
    }, []);

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default" , color: "text.primary", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", gap: 2, pt: "70px" }}>
            <Typography variant="h3">Travel Partner</Typography>
        </Container>
    )
}