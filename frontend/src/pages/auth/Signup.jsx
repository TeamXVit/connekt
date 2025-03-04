import { useState } from "react";
import { Box, Button, Checkbox, Container, Divider, FormControl, FormControlLabel, Grid2, IconButton, InputLabel, InputAdornment, Link, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import PasswordIcon from "@mui/icons-material/Password";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";
import InstagramIcon from "@mui/icons-material/Instagram";
import dayjs from "dayjs";
import emailVerificationImage from "../../assets/email-verification.jpg";
import axios from "axios";
import Backend from "../../constants/Backend";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showCNFPassword, setShowCNFPassword] = useState(false);
    const [page, setPage] = useState(1);
    const [termsConsent, setTermsConsent] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        regno: "",
        email: "",
        password: "",
        dob: dayjs(),
        gender: "",
        phoneno: "",
        instagram: ""
    });
    const [cnfPassword, setCNFPassword] = useState("");

    let navigate = useNavigate();

    const handlePrevPage = () => {
        if (page === 3) {
            if (termsConsent) {
                setTermsConsent(false)
            };
        };
        setPage(page - 1);
    };

    const handleNextPage = () => {
        let isValid = true;
        
        if (page === 1) {
            if (!formData.name || !formData.email || !formData.password) {
                isValid = false;
                toast.error("Fill all the required fields!");
            };
            if (formData.password.length < 8 || cnfPassword.length < 8) {
                isValid = false;
                toast.error("Password's length must be 8 or more characters long!")
            }
            if (formData.password !== cnfPassword) {
                isValid = false;
                toast.error("Passwords don't match. Please re-enter the password correctly!");
            };
        } else if (page === 2) {
            if (!formData.dob || !formData.gender || !formData.regno || !formData.phoneno) {
                isValid = false;
                toast.error("Fill all the required fields!");
            };
        };

        if (isValid) {
            setPage(page + 1);
        };
    };
    
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCNFPasswordVisibility = () => {
        setShowCNFPassword(!showCNFPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }))
    };

    const handleChangeCNFPassword = (e) => {
        setCNFPassword(e.target.value);
    };

    const handleDateChange = (date) => {
        setFormData((prevData) => ({ ...prevData, dob: date }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (termsConsent === true && page === 3) { 
            axios.post(`${Backend}auth/signup`, formData)
            .then((res) => {
                toast.success(res.data.message);
                navigate("/login")
            })
            .catch((e) => {toast.error("Signup failed. Check if you have entered all the required details and try again."); console.log(e)}); 
        };
    };

    return (
        <Container maxWidth="xl" sx={{  bgcolor: "background.default", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", py: 3 }}>
           <Grid2 sx={{ bgcolor: "background.default", color: "text.primary", width: { sm: "100%", md: "75%", lg: "35%" }, height: "fit-content", minHeight: "75%", p: 2, border: 1, borderColor: "grey.500", borderRadius: 1 }} container direction="column" gap={2}>
                <Typography variant="h6" textAlign="center" >
                    {page === 1 && "Create Account"}
                    {page === 2 && "Personal Details"}
                    {page === 3 && "Complete account setup"}
                </Typography>  
                <Box sx={{ height: "10%", width: "100%", display: "flex", justifyContent: "center" ,alignItems: "center", mb: 2  }} >
                    <Box sx={{ bgcolor: "#6586f1", height: { sm: 40, lg: 44 }, width: { sm: 40, lg: 44 }, borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="body1" color="white">1</Typography>
                    </Box>
                    <Divider orientation="vertical" sx={{ height: 3 ,width: { sm: 57, md: 64, lg: 96 }, bgcolor: page >=2 ? "#6586f1" : "text.primary" }}/>
                    <Box sx={{ bgcolor: page >= 2 ? "#6586f1" : "white", height: { sm: 40, lg: 44 }, width: { sm: 40, lg: 44 }, border: page < 2 ? 2 : "none", borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="body1" color={page >= 2 ? "white" : "black"}>2</Typography>
                    </Box>
                    <Divider orientation="vertical" sx={{ height: 3 ,width: { sm: 57, md: 64, lg: 96 }, bgcolor: page >=3 ? "#6586f1" : "text.primary" }}/>
                    <Box sx={{ bgcolor: page >= 3 ? "#6586f1" : "white", height: { sm: 40, lg: 44 }, width: { sm: 40, lg: 44 }, border: page < 3 ? 2 : "none", borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="body1" color={page >= 3 ? "white" : "black"}>3</Typography>
                    </Box>
                </Box>
                <Box sx={{ height: "70%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 3 }} component="form" onSubmit={handleSubmit}>
                    {page === 1 &&
                    <>
                        <TextField 
                            name="name"
                            placeholder="Enter your full name"
                            label="Name" 
                            type="text" 
                            variant="outlined"
                            required
                            onChange={handleChange}
                            value={formData.name}
                            sx={{ width: { sm: "100%", md: "90%" } }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon sx={{ color: "#6586f1" }}/>
                                        </InputAdornment>
                                    )
                                }
                            }} 
                        />
                        <TextField 
                            name="email"
                            placeholder="Enter your college email ID"
                            label="Email ID" 
                            type="email" 
                            variant="outlined"
                            required
                            onChange={handleChange}
                            value={formData.email}
                            sx={{ width: { sm: "100%", md: "90%" } }}
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
                        <TextField 
                            name="password"
                            placeholder="Enter your password"
                            label="Password" 
                            type={showPassword ? "text" : "password"} 
                            variant="outlined" 
                            required
                            onChange={handleChange}
                            value={formData.password}
                            sx={{ width: { sm: "100%", md: "90%" } }}
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
                        <TextField 
                            name="password"
                            placeholder="Confirm password"
                            label="Confirm Password" 
                            type={showCNFPassword ? "text" : "password"} 
                            variant="outlined" 
                            required
                            onChange={handleChangeCNFPassword}
                            value={cnfPassword}
                            sx={{ width: { sm: "100%", md: "90%" } }}
                            slotProps={{ 
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordIcon sx={{ color: "#6586f1" }}/>
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleCNFPasswordVisibility}>
                                            {showCNFPassword ? <VisibilityIcon sx={{ color: "#6586f1" }}/> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </>}
                    {page === 2 && 
                    <>
                        <Box sx={{ width: { sm: "100%", md: "90%" }, display: "flex", flexDirection: { sm: "column", lg: "row" }, flexWrap: { sm: "wrap" } ,justifyContent: "space-between", gap: { sm: 2, lg: 1 } }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker disableFuture value={formData.dob} label="DOB" name="dob" format="YYYY-MM-DD" onChange={handleDateChange} sx={{ width: { sm: "100%", lg: "57%" } }} />
                            </LocalizationProvider>
                            <FormControl sx={{ width: { sm: "100%", lg: "40%" } }}>
                                <InputLabel id="gender-select">Gender</InputLabel>
                                <Select
                                    labelId="gender-select"
                                    id="demo-simple-select"
                                    value={formData.gender}
                                    label="Gender"
                                    required
                                    onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value }))}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ width: { sm: "100%", md: "90%" }, display: "flex", flexDirection: { sm: "column", lg: "row" }, flexWrap: { sm: "wrap" }, justifyContent: "space-between", gap: { sm: 2, lg: 1 } }}>
                            <TextField 
                                name="regno"
                                placeholder="Reg No"
                                label="Reg No" 
                                type="text" 
                                variant="outlined"
                                required
                                onChange={handleChange}
                                value={formData.regno}
                                sx={{ width: { sm: "100%", lg: "40%"} }}
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
                                name="phoneno"
                                placeholder="Mobile Number"
                                label="Mobile Number" 
                                type="text" 
                                variant="outlined"
                                required
                                onChange={handleChange}
                                value={formData.phoneno}
                                sx={{ width: { sm: "100%", lg:"57%" } }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon sx={{ color: "#6586f1" }}/>
                                            </InputAdornment>
                                        )
                                    }
                                }} 
                            />
                        </Box>
                        <TextField 
                            name="instagram"
                            placeholder="Instagram Handle (Optional)"
                            label="Instagram" 
                            type="text" 
                            variant="outlined"
                            onChange={handleChange}
                            value={formData.instagram}
                            sx={{ width: { sm: "100%", md: "90%" } }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <InstagramIcon sx={{ color: "#6586f1" }}/>
                                        </InputAdornment>
                                    )
                                }
                            }} 
                        />
                    </>}
                    {page >= 3 && 
                    <>
                        <Box component="img" src={emailVerificationImage} sx={{ width: 150, height: 150 }}></Box>
                        <Typography sx={{ width: "90%", textAlign: "" ,textWrap: "wrap" }}>We have sent a verification mail to the given email ID. Click on the provided link within 24 hours to activate your account. <strong>Note:</strong> If you didn&apos;t receive any mail in your inbox, please check your spam.</Typography>
                        <Box sx={{ width: "90%", display: "flex", alignItems: "center" }}>
                            <FormControlLabel control={<Checkbox/>} onChange={() => setTermsConsent(true)}/>
                            <Typography>I accept the <Link underline="none" href="#">terms and conditions</Link></Typography>
                        </Box>
                    </>}
                    <Box sx={{ width: { sm: "100%", md: "90%" }, display: "flex", pb: 2, justifyContent: "space-between", pt: 2 }}>
                        {page === 1 ? 
                        <Link href="/login" underline="none" color="#6586f1">Login</Link> : 
                        <Button variant="contained" sx={{ bgcolor: "#6586f1" }} onClick={handlePrevPage}>Back</Button>}
                        {page > 2 ? 
                        <Button variant="contained" sx={{ bgcolor: "#6586f1" }} disabled={termsConsent === false} type="submit">Submit</Button> : 
                        <Button variant="contained" sx={{ bgcolor: "#6586f1" }} onClick={handleNextPage}>Next</Button>}
                    </Box>
                </Box>
            </Grid2>
            <ToastContainer autoClose={1000} hideProgressBar position={window.innerWidth < 660 ? "top-left" : "bottom-right"} pauseOnHover={false}/>
        </Container>
    )
}