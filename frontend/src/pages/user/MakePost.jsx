import { useState } from "react";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify"

export default function MakePost() {
    const [feature, setFeature] = useState("");
    const [formData, setFormData] = useState({
        content: "",
        preferences: "",
        showphoneno: true,
        ttl: "",
        time: new Date()
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    };

    const handlePost = () => {
        axios.post(`${feature}/post`, formData)
        .then(res => toast.success(res.data.message))
        .catch(e => console.log(e));
        handleClear();
    };

    const handleClear = () => {
        setFeature("");
        setFormData({
            content: "",
            preferences: "",
            showphoneno: false,
            ttl: "",
            time: new Date()
        });
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh",  pt: "75px", pb: "15px", display: "flex", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4" sx={{ width: "90%", textAlign: "left" }}>Make A Post</Typography>
            <Box sx={{ width: "90%", display: "flex", flexWrap: "wrap", gap: 2 }}>
                <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="select-feature">Feature</InputLabel>
                    <Select
                        labelId="select-feature"
                        id="select-feature-helper"
                        value={feature}
                        label="Feature"
                        onChange={(e) => setFeature(e.target.value)}
                    >
                        <MenuItem value="/travel">Travel Partner</MenuItem>
                        <MenuItem disabled>Find A Teammate</MenuItem>
                        <MenuItem disabled>Lost & Found</MenuItem>
                        <MenuItem disabled>Queries</MenuItem>
                    </Select>
                </FormControl>
                {feature === "/travel" && 
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel id="select-preference">Preference</InputLabel>
                    <Select
                        labelId="select-preferenc"
                        id="select-prefence-helper"
                        value={formData.preferences}
                        name="preferences"
                        label="Preference"
                        onChange={handleChange}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                    </Select>
                </FormControl>}
            </Box>
            <Box sx={{ width: "90%", display: "flex", flexWrap: "wrap", gap: 3 }}>
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="select-ttl">Duration</InputLabel>
                    <Select
                        labelId="select-ttl"
                        id="select-ttl-helper"
                        value={formData.ttl}
                        name="ttl"
                        label="Duration"
                        onChange={handleChange}
                    >
                        <MenuItem value={1 * 86400}>1 Day</MenuItem>
                        <MenuItem value={2 * 86400}>2 Days</MenuItem>
                        <MenuItem value={3 * 86400}>3 Days</MenuItem>
                        <MenuItem value={4 * 86400}>4 Days</MenuItem>
                        <MenuItem value={5 * 86400}>5 Days</MenuItem>
                        <MenuItem value={6 * 86400}>6 Days</MenuItem>
                        <MenuItem value={7 * 86400}>7 Days</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel id="select-showphoneno">Show Phone no.</InputLabel>
                    <Select
                        labelId="select-showphoneno"
                        id="select-showphoneno-helper"
                        value={formData.showphoneno}
                        name="showphoneno"
                        label="Show Phone No."
                        onChange={handleChange}
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Time"
                    name="time"
                    defaultValue={formData.time}
                    slotProps={{ input: { readOnly: true } }}
                />
            </Box>
            <Box sx={{ width: "90%" }}>
                <TextField 
                    variant="outlined" 
                    sx={{ width: { sm: "100%", lg: "75%" } }}
                    placeholder="ex: If anyone is travelling from Vijayawada Railway Station at 5:30 PM today, please contact me."
                    multiline
                    rows={3}
                    value={formData.content}
                    name="content"
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ width: "90%" }}>
                <Button variant="contained" onClick={handlePost} disabled={!formData.content || !formData.ttl}>Post</Button>
            </Box>
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" className="sm:w-[75%]" pauseOnHover={false}/>
        </Container>
    );
};