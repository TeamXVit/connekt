import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Box, Button, Container, Grid2, InputAdornment, TextField, Typography } from "@mui/material"
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { toast, ToastContainer } from "react-toastify";
import Backend from "../../constants/Backend";


export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    
    const handleSendEmail = () => {
        axios.post(`${Backend}auth/forget-password`, { "email": email })
        .then(res => {
            toast.success(res.data);
            navigate("/login");
        })
        .catch(e => console.log(e.response.data.error))
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Grid2 sx={{ height: "70%", width: { sm: "95%", md: "60%", lg: "35%" }, border: 1, borderColor: "grey.500", borderRadius: 1  }} container direction="column">
                <Box component="form" sx={{ bgcolor: "background.default", color: "text.primary", height: "100%", width: "100%", py: 2, px: 3, display: "flex", flexDirection: "column", borderRadius: 1 }} >
                    <Typography variant="h4" sx={{ mt: 1 }}>Forgot Your Password?</Typography> 
                    <Typography variant="body1" sx={{ my: 2 }}>Please enter your email address</Typography>
                    <TextField 
                        sx={{ my: 1 }} 
                        required 
                        placeholder="ex: johndoe.23bec@vitapstudent.ac.in" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MarkEmailUnreadIcon sx={{ color: "#6586f1" }}/>
                                    </InputAdornment>
                                )
                            }
                        }} 
                    />
                    <Typography variant="body1" sx={{ my: 2 }}>We will send an email to the given email address. Follow the instructions given there to reset your password</Typography>
                    <Box sx={{ width: "100%", my: 2, display: "flex", justifyContent: "space-between" }}>
                        <Button
                            variant="text"
                            onClick={() => navigate("/login")}
                        >Login</Button>
                        <Button 
                            variant="contained" 
                            onClick={() => {handleSendEmail(); console.log(email)}} 
                            disabled={!email}
                        >Proceed</Button>
                    </Box>
                </Box>
            </Grid2>
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Container>
    );
};