/* eslint-disable react/prop-types */
import axios from "../axios/axios";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';

export default function PostUI({ data }) { 
    const theme = useTheme();
    
    const deletePost = (postID) => {
        axios.delete(`/travel/delete/${postID}`)
        .then(res => {console.log(res.data); toast.success(res.data)})
        .catch(e => console.log(e))
    };

    return (
        <>
            <Box sx={{ width: { sm: "95%" ,lg: "75%" }, bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900", borderRadius: 3, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={data.profilepicture || ""}/>
                        <Typography>Username</Typography>
                    </Box>
                    <IconButton onClick={() => deletePost(data._id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
                <Typography variant="body1" sx={{ width: "100%" }}>{data.content}</Typography>
                <Typography variant="body2">Phone no:</Typography>
                <Typography variant="body2">Created at: {data.createdAt}</Typography>
            </Box>
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </>
    );
};