/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "../axios/axios";
import { useLocation } from "react-router";
import { Avatar, Box, Button, IconButton, Link, Popover, TextField, Typography, useTheme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";

export default function PostUI({ data }) { 
    const theme = useTheme();
    const location = useLocation();
    const [otherUserDetails, setOtherUserDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [toggleComments, setToggleComments] = useState(false);
    const [toggleReply, setToggleReply] = useState(false);
    const [comment, setComment] = useState("");
    const [commenting, setCommenting] = useState(true);
    
    const handleClick = async (e, regNo) => {
        setAnchorEl(e.currentTarget);
        await axios.get(`profile/view/${regNo}`)
        .then(res => setOtherUserDetails(res.data))
        .catch(e => console.log(e));
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOtherUserDetails(null);
    };

    const handleToggleComment = () => {
        setToggleComments(!toggleComments);
    };

    const handleToggleReply = () => {
        setToggleReply(!toggleReply);
    };

    const handleComment = (e) => {
        setComment(e.target.value);
        setCommenting(true);
    };

    const handlePostComment = async (postID) => {
        setCommenting(false)
        await axios.post(`${location.pathname}/comment/${postID}`, { "comment": comment, "time": new Date() })
        .then(res => {
            toast.success(res.data.message);
            setComment("");
        })
        .catch(e => console.log(e));
    };

    const getRelativeTimeString = (date) => {
        const now = new Date();
        const diffInMs = now - date;
        
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        
        if (diffInDays > 0) {
          return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
        } else if (diffInHours > 0) {
          return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
        } else if (diffInMinutes > 0) {
          return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
        } else {
          return diffInSeconds <= 5 ? 'just now' : `${diffInSeconds} seconds ago`;
        }
    };
    
    const open = Boolean(anchorEl) && Boolean(otherUserDetails);
    const id = open ? 'details-popper' : undefined;

    const formattedDate = getRelativeTimeString(new Date(data.createdAt));

    return (
        <Box sx={{ width: "100%", bgcolor: theme.palette.mode === "light" ? "grey.200" : "grey.900", borderRadius: 4, px: 2, py: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton aria-describedby={id} onClick={(e) => handleClick(e, data.author?.regno)}>
                        <Avatar src={data.author?.optprofilepicture+`?t=${new Date().getTime()}`}/>
                    </IconButton>
                    <Typography variant="body1" fontWeight="medium">{data.author?.name}</Typography>    
                </Box>
                <Typography variant="caption">{formattedDate}</Typography>
            </Box>
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
                <Box sx={{ borderRadius: 1, p: 1, bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900", color: "text.primary", display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography>{otherUserDetails?.name}</Typography>
                    <Typography>{otherUserDetails?.email}</Typography>
                    <Typography>{otherUserDetails?.regno}</Typography>
                    <Typography>{otherUserDetails?.gender}</Typography>
                    <Link 
                        href={`https://www.instagram.com/${otherUserDetails?.instagram}`} 
                        target="blank" 
                        variant="inherit"
                        underline="none"
                    >{otherUserDetails.instagram}</Link>
                </Box>
            </Popover>}
            <Typography variant="body1" sx={{ width: "100%" }}>{data?.content}</Typography>
            {data.author?.phoneno && <Typography variant="body2">Phone no: {data.author?.phoneno}</Typography>}      
            <Button sx={{ color: "text.primary", mr: "auto" }} onClick={handleToggleReply} variant="text">Reply</Button>
            {toggleReply && 
            <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ width: 35, height: 35 }}/>
                <TextField 
                    variant="standard"
                    sx={{ width: "95%" }} 
                    placeholder="Add a comment" 
                    value={comment} 
                    onChange={handleComment}
                />
                <IconButton disabled={!comment || !commenting} onClick={() => handlePostComment(data._id)}>
                    <SendIcon />
                </IconButton>  
            </Box>}
            {data.comments.length > 0 && 
            <Button sx={{ mr: "auto", borderRadius: 3 }} onClick={handleToggleComment}>
                {toggleComments ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                {data.comments?.length} {data.comments?.length > 1 ? "replies" : "reply"}
            </Button>}
            {toggleComments && 
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, ml: 1 }}>
                {data.comments?.length > 0 ? 
                data.comments?.map((com, index) => (
                <Box key={index}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <IconButton onClick={(e) => handleClick(e, com.userID?.regno)}>
                            <Avatar sx={{ width: 30, height: 30 }} src={com.userID?.optprofilepicture+`?t=${new Date().getTime()}`}/>
                        </IconButton>
                        <Typography fontWeight={600}>{com.userID.name}</Typography>
                        <Typography variant="caption">{getRelativeTimeString(new Date(com.createdAt))}</Typography>
                    </Box>
                    <Typography sx={{ my: 1, ml: 6.7 }}>{com.comment}</Typography>
                </Box>
                )) :
                <Typography variant="body2">No replies yet</Typography>
                }
            </Box>
            }
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Box>
    );
};
