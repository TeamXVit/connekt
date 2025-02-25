import {  Box, Button, Typography } from "@mui/material";
// import axios from "axios";

export default function UserProfile() {

    // const handleGetUserDetails = () => {
    //     axios.get('')
    //     .then()
    //     .catch()
    // }

    return (
        <Box container sx={{ width: { sm: "90%", md: "90%", lg: "35%" }, height: "fit", my: "auto", border: 1, borderColor: "grey.500", borderRadius: 2, display: "flex", flexWrap: "wrap", flexDirection: { lg: "column" }, alignItems: { lg: "center" }, py: 2 }}>
            {/* <AccountCircleIcon sx={{ width: { sm: 100, lg: 200 }, height: { sm: 100, lg: 200 } }}/> */}
            <Box>
                
            </Box>
            <Box sx={{ width: "100%", px: 3, py: 2, display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography>Name</Typography>
                <Typography>Email Id</Typography>
                <Typography>Reg. No</Typography>
                <Typography>Phone number</Typography>
                <Typography></Typography>
            </Box>
            <Button variant="contained">Edit Profile</Button>
        </Box>
    )
}