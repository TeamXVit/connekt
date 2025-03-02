/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import axios from "../../axios/axios";
import { Box, Button, Container, Typography } from "@mui/material";
import PostUI from "../../components/PostUI";


export default function Activities() {
    const [posts, setPosts] = useState([]);
    const dataFetchedRef = useRef(false);

    // useEffect(() => {
    //     if (dataFetchedRef.current) return;
    //     dataFetchedRef.current = true;

    //     const fetchTravelPosts = () => {
    //         axios.get("/profile/mytravels")
    //         .then(res => console.log(res))
    //         .catch(e => console.log(e));
    //     };
        
    //     fetchTravelPosts();
    // }, [])

    const fetchTravelPosts = () => {
        axios.get("/profile/mytravels")
        .then(res => console.log(res))
        .catch(e => console.log(e));
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh", pt: "75px", pb: "15px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4">Activities</Typography>
            <Box sx={{ width: "95%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                {posts.map((post, index) => <PostUI key={index} data={post}/>)}
            </Box>
            <Button onClick={fetchTravelPosts}>Click</Button>
        </Container>
    )
}