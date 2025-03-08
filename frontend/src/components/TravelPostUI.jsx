/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "../axios/axios";
import { Avatar, Box, IconButton, Link, Popover, TextField, Typography, useTheme } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";

export default function TravelPostUI({ data }) { 
    const theme = useTheme();

    const [otherUserDetails, setOtherUserDetails] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [toggleComment, setToggleComment] = useState(false);
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
    };

    const handleToggleComment = () => {
        setToggleComment(!toggleComment);
    };

    const handleComment = (e) => {
        setComment(e.target.value);
        setCommenting(true);
    };

    const handlePostComment = async (postID) => {
        setCommenting(false)
        await axios.post(`travel/comment/${postID}`, { "comment": comment, "time": new Date() })
        .then(res => {
            toast.success(res.data.message);
            setComment("");
        })
        .catch(e => console.log(e));
    };

    const open = Boolean(anchorEl) && Boolean(otherUserDetails);
    const id = open ? 'details-popper' : undefined;

    const formattedDate = new Date(data.createdAt).toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }) + " @ " + new Date(data.createdAt).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    return (
        <Box sx={{ width: "100%", bgcolor: theme.palette.mode === "light" ? "grey.200" : "grey.900", borderRadius: 4, px: 2, py: 1, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton aria-describedby={id} onClick={(e) => handleClick(e, data.author?.regno)}>
                        <Avatar src={data.author?.optprofilepicture || ""}/>
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
                    <Typography variant="body1" fontWeight="medium">{data.author?.name}</Typography>    
                </Box>
                <Typography variant="body2">{formattedDate}</Typography>
            </Box>
            <Typography variant="body1" sx={{ width: "100%" }}>{data?.content}</Typography>
            {data.author?.phoneno && <Typography variant="body2">Phone no: {data.author?.phoneno}</Typography>}          
            <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                <IconButton onClick={handleToggleComment}>
                    <CommentIcon />
                </IconButton>
                <Typography>{data.comments.length}</Typography>
            </Box>
            {toggleComment && 
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
                    <TextField sx={{ width: "95%" }} placeholder="Add a comment" value={comment} onChange={handleComment}/>
                    <IconButton disabled={!comment || !commenting} onClick={() => handlePostComment(data._id)}>
                        <SendIcon />
                    </IconButton>
                </Box>
                <Typography variant="h6" fontWeight="medium" marginTop={2}>Comments</Typography>
                {data.comments.length > 0 ? 
                data.comments?.map((com, index) => <Typography key={index}>{com.userID.name}: {com.comment}</Typography>) :
                <Typography variant="body2">No comments yet</Typography>
                }
            </Box>
            }
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Box>
    );
};
