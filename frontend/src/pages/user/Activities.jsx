import { useEffect, useRef, useState } from "react";
import axios from "../../axios/axios"
import { Avatar, Box, Button, CircularProgress, Container, Divider, IconButton, Modal, Tab, Tabs, Typography, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from "react-toastify";


export default function Activities() {
    const [posts, setPosts] = useState([]);
    const [replies, setReplies] = useState([]);
    const [contentLoading, setContentLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [activity, setActivity] = useState(0);
    const [id, setId] = useState("");
    const dataFetchedRef = useRef(false);
    const theme = useTheme();

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        const fetchTravelPosts = () => {
            axios.get("/profile/mytravels")
            .then(res => {
                setContentLoading(false);
                setPosts(res.data);
            })
            .catch((e) => toast.error(e.response.data.error))
        };

        const fetchTravelComments = () => {
            axios.get("/profile/mytravels/mycomments")
            .then(res => {
                setContentLoading(false);
                setReplies(res.data);
                console.log(res.data)
            })
            .catch((e) => toast.error(e.response.data.error));
        };
  
        fetchTravelPosts(); 
        fetchTravelComments();       
    }, []);

    
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleChange = (event, newValue) => {
        setActivity(newValue);
    };

    const deletePost = async (postID) => {
        await axios.delete(`travel/delete/${postID}`)
        .then((res) => {
            setLoading(false);
            toast.success(res.data.message);
            handleModalClose();
            setPosts((prev) => prev.filter((post) => post._id !== postID));
            setId("");
        })
        .catch(() => {
            setLoading(false);
            toast.error("Failed to delete post");
            setId("");
        })
    };

    const deleteComment = async (commentID) => {
        await axios.delete(`travel/comment/${commentID}`)
        .then((res) => {
            setLoading(false);
            toast.success(res.data.message);
            handleModalClose();
            setReplies((prev) => 
                prev.map((com) => ({
                    ...com,
                    comments: com.comments.filter((c) => c._id !== commentID) 
                })).filter((com) => com.comments.length > 0) 
            );
            setId("");
        })
        .catch(() => {
            setLoading(false);
            toast.error("Failed to delete post");
            setId("");
        })
    };

    const handleDelete = () => {
        setLoading(true);
        activity === 0 ? deletePost(id) : deleteComment(id);
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

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh", pt: "75px", pb: "15px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "none" } }}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={activity} onChange={handleChange} centered sx={{ mb: 2 }}>
                    <Tab label="Posts"/>
                    <Tab label="Replies"/>
                </Tabs>
            </Box>
            {contentLoading ? <CircularProgress sx={{ my: "auto" }}/> : 
            (posts.length > 0 && activity === 0) ?
            <Box sx={{ width: "95%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                {activity === 0 && posts?.map((post, index) => (
                <Box key={index} sx={{ width: { sm: "95%", lg: "75%" }, bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900", borderRadius: 3, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar src={post?.author.optprofilepicture || ""}/>
                            <Typography>{post?.author.name}</Typography>
                            <Typography variant="caption">{getRelativeTimeString(new Date(post?.createdAt))}</Typography>
                        </Box>
                        <IconButton 
                        onClick={() => {
                            handleModalOpen();
                            setId(post?._id)
                        }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body1" sx={{ width: "100%" }}>{post.content}</Typography>
                    <Typography variant="body2">Phone no: {post?.author.phoneno}</Typography>
                </Box>
                ))}
            </Box> :
            (activity === 0 && <Typography sx={{ my: "auto" }}>You haven&apos;t posted anything Yet</Typography>)
            }
            <Modal
            keepMounted
            open={modalOpen}
            onClose={handleModalClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    py: 3,
                    px: 4,
                    borderRadius: 2,
                    color: 'text.primary'
                }}>
                    <Typography sx={{ mt: 1 }} variant="body1">Are you sure you want to delete this {activity == 0 ? "post" : "comment"}?</Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                        <Button variant="text" onClick={handleModalClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleDelete}  disabled={loading}>Delete</Button>
                    </Box>
                </Box>
            </Modal>
            {replies.length > 0 && activity === 1 ? replies.map((com) => (
                com?.comments.map((c, index) => (
                    <Box key={index} sx={{ width: { sm: "95%", lg: "75%" }, bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900", borderRadius: 3, p: 2, my: 1, display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar src={com.author.optprofilepicture} sx={{ width: 30, height: 30 }}/>
                            <Typography>{com.author.name}</Typography>
                            <Typography variant="caption">{getRelativeTimeString(new Date(com.createdAt))}</Typography>
                        </Box>
                        <Typography my={2}>{com.content}</Typography>
                        <Divider sx={{ my: 1 }}/>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography>Your reply: {c.comment}</Typography>
                            <IconButton
                            onClick={() => {
                                handleModalOpen();
                                setId(c?._id)
                            }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))
            )) : (activity === 1 && <Typography sx={{ my: "auto" }}>You haven&apos;t replied to anything Yet</Typography>)}
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Container>
    )
}