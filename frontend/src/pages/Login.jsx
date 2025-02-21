import { useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid2, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Backend from "../constants/Backend";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        regno: "",
        password: ""
    });
    const { login } = useAuth();

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${Backend}/auth/signin`, formData)
        .then((res) => {
            login(res.data);
            console.log(res.data)
            toast.success(res.data.message, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: true
            })
        })
        .catch((e) => {
            console.log(e)
            toast.error(e, {
                position: "top-left",
                autoClose: 1500,
                hideProgressBar: true
            })
        });
    };

    return (
        <Container maxWidth="xl" sx={{  bgcolor: "#f3f4f6" ,height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <ToastContainer />
            <Grid2 sx={{ height: { sm: "85%", md: "95%" , lg: "80%" }, width: { sm: "95%", md: "75%", lg: "50%" } }} container direction={{ sm: "column", lg: "row" }}>
                <Box sx={{ bgcolor: "#6586f1", height: { sm: "30%", md: "25%", lg: "100%" }, width: { sm: "100%", lg: "35%" } }}></Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: "white", height: { sm: "70%", md: "75%", lg: "100%" }, width: { sm: "100%", lg: "65%" }, p: 2, display: "flex", flexDirection: "column", gap: { sm: 3, lg: 4 } }} >
                    <Typography variant="h4">Welcome to Connekt!</Typography>   
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
                        <Box sx={{ width: "100%" }}>
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
                            <FormControlLabel control={<Checkbox/>} label="Remember Me" />
                        </Box>
                    </Box>
                    <Button variant="contained" sx={{ bgcolor: "#6586f1" }} type="submit">Login</Button>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Link href="#" underline="none">Forgot Password</Link>
                        <Link href="/signup" underline="none">Sign Up</Link>
                    </Box>
                </Box>
            </Grid2>
        </Container>
    )
}