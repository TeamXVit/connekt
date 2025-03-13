import { useState } from "react";
import { Box, Button, Container, Grid2, IconButton, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Backend from "../../constants/Backend";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        regno: "",
        password: ""
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${Backend}/auth/login`, formData)
        .then((res) => {
            setLoading(false);
            login(res.data.token);
            navigate("/travel");
        })
        .catch((e) => {
            setLoading(false);
            toast.error(e.response.data.error);
        });
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default" ,height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Grid2 sx={{ height: { sm: "65%", md: "70%" }, width: { sm: "95%", md: "75%", lg: "35%" }, border: 1, borderColor: "grey.500", borderRadius: 1  }} container direction="column">
                <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: "background.default", color: "text.primary", height: "100%", width: "100%", p: 2, display: "flex", flexDirection: "column",  gap: { sm: 3, lg: 4 }, justifyContent: "space-evenly", borderRadius: 1 }} >
                    <Typography variant="h4">Login to Connekt!</Typography>   
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField 
                            name="regno"
                            placeholder="Enter your registration number"
                            label="Reg No" 
                            type="text" 
                            variant="outlined"
                            required
                            onChange={handleChange}
                            value={formData.regno}
                            sx={{ width: "100%" }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BadgeIcon sx={{ color: "#6586f1" }}/>
                                        </InputAdornment>
                                    )
                                }
                            }} 
                        />
                        <TextField 
                            name="password"
                            placeholder="Enter your password"
                            label="Password" 
                            type={showPassword ? "text" : "password"} 
                            variant="outlined" 
                            required
                            onChange={handleChange}
                            value={formData.password}
                            sx={{ width: "100%" }}
                            slotProps={{ 
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordIcon sx={{ color: "#6586f1" }}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handlePasswordVisibility}>
                                            {showPassword ? <VisibilityIcon sx={{ color: "#6586f1" }}/> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                        <Button 
                            variant="contained" 
                            sx={{ bgcolor: "#6586f1" }} 
                            type="submit"
                            disabled={loading}
                        >{!loading ? "Login" : "Please Wait..."}</Button>
                    </Box>
                    <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                        <Link href="/forgot-password" underline="none">Forgot Password</Link>
                        <Link href="/signup" underline="none">Sign Up</Link>
                    </Stack>
                </Box>
            </Grid2>
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Container>
    )
}