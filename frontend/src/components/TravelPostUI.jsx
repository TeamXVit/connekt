/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "../axios/axios";
import { Avatar, Box, IconButton, Link, Popover, Typography, useTheme } from "@mui/material";


export default function TravelPostUI({ data }) { 
    const theme = useTheme();

    const [otherUserDetails, setOtherUserDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = async (e, regNo) => {
        setAnchorEl(anchorEl ? null : e.currentTarget);
        if (!otherUserDetails) {
            await axios.get(`/profile/view/${regNo}`)
            .then(res => setOtherUserDetails(res.data))
            .catch(e => console.log(e));
        };
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'details-popper' : undefined;

    return (
        <Box sx={{ width: "100%", bgcolor: theme.palette.mode === "light" ? "grey.200" : "grey.900", borderRadius: 7, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton aria-describedby={id} onClick={(e) => handleClick(e, data.author.regno)}>
                        <Avatar src={data.author.optprofilepicture || ""}/>
                    </IconButton>
                    {otherUserDetails &&            
                    <Popover 
                        id={id} 
                        open={open} 
                        onClose={handleClose}
                        anchorEl={anchorEl} 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Box sx={{ border: 1, borderRadius: 1, p: 1, bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900", color: "text.primary", display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography>{otherUserDetails.name}</Typography>
                            <Typography>{otherUserDetails.email}</Typography>
                            <Typography>{otherUserDetails.regno}</Typography>
                            <Typography>{otherUserDetails.gender}</Typography>
                            <Link 
                                href={`https://www.instagram.com/${otherUserDetails.instagram}`} 
                                target="blank" 
                                variant="inherit"
                                underline="none"
                            >{otherUserDetails.instagram}</Link>
                        </Box>
                    </Popover>}
                    <Typography variant="body1">{data.author.name}</Typography>    
                </Box>
            </Box>
            <Typography variant="body1" sx={{ width: "100%" }}>{data.content}</Typography>
            {data.author.phoneno && <Typography variant="body2">Phone no: {data.author.phoneno}</Typography>}
            <Typography variant="body2">{data.createdAt}</Typography>
        </Box>
    );
};