/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Backend from "../constants/Backend";
import BearerHeader from "../constants/BearerHeader";
import { Avatar, Box, Button, Container, Divider, IconButton, Typography } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Chopper from "../assets/chopper.jpeg"


export default function UserProfile() {
    const [userDetails, setUserDetails] = useState(null);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        const fetchData = async () => {
            axios.get(Backend + '/profile/view', {
                headers: { "Authorization" : BearerHeader }
            })
            .then(res => setUserDetails(res.data))
            .catch(e => console.log(e))
        }
        fetchData()
    }, []);


    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", height: "100vh",  pt: "70px" }}>
            <Typography variant="h4" sx={{ my: 2 }}>Your Profile</Typography>
            {userDetails && 
            <>
                <Box sx={{ width: { sm: "100%", lg: "70%" }, height: 100, px: 1, position: "relative", display: "flex", alignItems: "center", gap: 3, }}>
                    <Avatar alt="Profile picture" src={Chopper} sx={{ width: 90, height: 90, }}/>
                    <IconButton sx={{ position: "absolute", top: 52, left: 71 }}>
                        <AddPhotoAlternateIcon />
                    </IconButton>
                    <Box>
                        <Typography variant="h5">{userDetails.name}</Typography>
                        <Typography variant="body2">{userDetails.regno}</Typography>
                    </Box>
                </Box>
                <Box sx={{ width: { sm: "100%", lg: "70%" }, mt: 5, p: 2 }}>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Name</Typography>
                        <Typography sx={{ color: "grey.700" }}>{userDetails.name}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }}/>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Gender</Typography>
                        <Typography sx={{ color: "grey.700" }}>{userDetails.gender}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }}/>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Email ID</Typography>
                        <Typography sx={{ color: "grey.700" }}>{userDetails.email}</Typography>
                    </Box>
                    <Divider sx={{ my: 2 }}/>
                    <Box sx={{ width: "100%", display: "flex", flexDirection: { sm: "column", md: "row" }, justifyContent: "space-between", gap: 2 }}>
                        <Typography sx={{ fontWeight: "bold" }}>Mobile Number</Typography>
                        <Typography sx={{ color: "grey.700" }}>{userDetails.phoneno}</Typography>
                    </Box>
                </Box>
                <Button variant="contained" sx={{ mt: 3 }}>Edit</Button>
            </>
            }
        </Container>
    );
};