import { useEffect, useRef, useState } from "react";
import axios from "../../axios/axios"
import { Avatar, Box, Button, CircularProgress, Container, IconButton, Modal, Typography, useTheme } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from "react-toastify";



export default function Activities() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const dataFetchedRef = useRef(false);
    const theme = useTheme();

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;

        const fetchTravelPosts = () => {
            axios.get("/profile/mytravels")
            .then(res => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch(() => toast.error("Failed to fetch data"))
        };
        
        fetchTravelPosts();
    }, []);

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const deletePost = async (postID) => {
        await axios.delete(`/travel/delete/${postID}`)
        .then(res => {
            toast.success(res.data.message);
            handleModalClose();
            setPosts((prev) => prev.filter((post) => post._id !== postID))
        })
        .catch(() => toast.error("Failed to delete post"))
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh", pt: "75px", pb: "15px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4">Activities</Typography>
            {loading ? <CircularProgress sx={{ my: "auto" }}/> : posts.length > 0 ?
            <Box sx={{ width: "95%", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                {posts.map((post, index) => (
                <Box key={index} sx={{ width: { sm: "95%" ,lg: "75%" }, bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900", borderRadius: 3, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar src={post.author.optprofilepicture || ""}/>
                            <Typography>{post.author.name}</Typography>
                        </Box>
                        <IconButton onClick={handleModalOpen}>
                            <DeleteIcon />
                        </IconButton>
                        <Modal
                            keepMounted
                            open={modalOpen}
                            onClose={handleModalClose}
                            aria-labelledby="keep-mounted-modal-title"
                            aria-describedby="keep-mounted-modal-description"
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
                                <Typography sx={{ mt: 1 }} variant="body1">Are you sure you want to delete this post?</Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                                    <Button variant="text" onClick={handleModalClose}>Cancel</Button>
                                    <Button variant="contained" onClick={() => deletePost(post._id)}>Delete</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                    <Typography variant="body1" sx={{ width: "100%" }}>{post.content}</Typography>
                    <Typography variant="body2">Phone no: {post.author.phoneno}</Typography>
                    <Typography variant="body2">Created at: {post.createdAt}</Typography>
                </Box>
                ))}
            </Box> :
            <Typography sx={{ my: "auto" }}>You haven&apos;t posted anything Yet</Typography>
            }
            
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Container>
    )
}