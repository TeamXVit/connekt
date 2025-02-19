import { useState } from "react";
import { Box, Button, Checkbox, Container, FormControlLabel, Grid2, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        regNo: "",
        password: ""
    });

    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container maxWidth="xl" sx={{  bgcolor: "#f3f4f6" ,height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", }}>
            <Grid2 sx={{ bgcolor: "green" ,height: { sm: "95%", lg: "70%" }, width: { sm: "95%", lg: "50%" } }} container direction={{ sm: "column", lg: "row" }}>
                <Box sx={{ bgcolor: "#6586f1", height: { sm: "30%", lg: "100%" }, width: { sm: "100%", lg: "35%" } }}></Box>
                <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: "white", height: { sm: "70%", lg: "100%" }, width: { sm: "100%", lg: "65%" }, p: 2, display: "flex", flexDirection: "column", gap: { sm: 3, lg: 4 } }} >
                    <Typography variant="h4">Welcome to Connekt!</Typography>   
                    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField 
                            name="regNo"
                            placeholder="Enter your registration number"
                            label="Reg No" 
                            type="text" 
                            variant="outlined"
                            required
                            onChange={handleChange}
                            value={formData.regNo}
                            sx={{ width: "100%" }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: "#6586f1" }}/>
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