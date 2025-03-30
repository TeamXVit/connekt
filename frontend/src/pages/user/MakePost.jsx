import { useState } from "react";
import { useNavigate } from "react-router";
import useDetails from "../../hooks/useDetails";
import axios from "../../axios/axios";
import { Box, Button, Container, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";


export default function MakePost() {
    const [feature, setFeature] = useState("");
    const [formData, setFormData] = useState({
        content: "",
        preferences: "All",
        showphoneno: true,
        ttl: "",
        time: new Date()
    });
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { details } = useDetails();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    };

    const handlePost = () => {
        let tempForm = formData;
        if (feature === "/lostandfound") {
            tempForm.image = pic;
            setFormData(tempForm)
        };
        setLoading(true);
        console.log(tempForm);
        axios.post(`${feature}/post`, tempForm)
        .then(res => {
            setLoading(false);
            toast.success(res.data.message);
            navigate(feature);
        })
        .catch(e => {
            setLoading(false);
            toast.error(e.response.data.error);
        });
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
                        <MenuItem value="/teammate">Find A Teammate</MenuItem>
                        <MenuItem value="/lostandfound">Lost & Found</MenuItem>
                        <MenuItem value="/queries">Queries</MenuItem>
                        <MenuItem value="/anonymous">Anonymous Confessions</MenuItem>
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
                        {details.gender === "Male" && <MenuItem value="Male">Male</MenuItem>}
                        {details.gender === "Female" && <MenuItem value="Female">Female</MenuItem>}
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
                        required
                    >
                        {[1, 2, 3, 4, 5, 6, 7].map((num, index) => <MenuItem key={index} value={num * 86400}>{num} {num > 1 ? "Days" : "Day"}</MenuItem>)}
                        {/* <MenuItem value={1 * 86400}>1 Day</MenuItem>
                        <MenuItem value={2 * 86400}>2 Days</MenuItem>
                        <MenuItem value={3 * 86400}>3 Days</MenuItem>
                        <MenuItem value={4 * 86400}>4 Days</MenuItem>
                        <MenuItem value={5 * 86400}>5 Days</MenuItem>
                        <MenuItem value={6 * 86400}>6 Days</MenuItem>
                        <MenuItem value={7 * 86400}>7 Days</MenuItem> */}
                    </Select>
                    <FormHelperText>How long do you want the post to exist?</FormHelperText>
                </FormControl>
                {!(["/queries", "/anonymous"].includes(feature)) && 
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
                    <FormHelperText>Select &apos;Yes&apos; if you want others to see your phone number</FormHelperText>
                </FormControl>}
                <TextField
                    label="Time"
                    name="time"
                    defaultValue={formData.time}
                    slotProps={{ input: { readOnly: true } }}
                />
                {feature === "/lostandfound" && <Input type="file" accept="image/png, image/jpeg"  onChange={(e) => setPic(e.target.files[0])}/>}
            </Box>
            <Box sx={{ width: "90%" }}>
                <TextField 
                    variant="outlined" 
                    sx={{ width: { sm: "100%", lg: "75%" } }}
                    placeholder="Note: If you don't want to show your contact number, please mention how others can contact you"
                    multiline
                    rows={3}
                    value={formData.content}
                    name="content"
                    onChange={handleChange}
                />
            </Box>
            <Box sx={{ width: "90%" }}>
                <Button variant="contained" onClick={handlePost} disabled={!formData.content || !formData.ttl || !feature || loading}>Post</Button>
            </Box>
            <ToastContainer autoClose={1000} hideProgressBar position="bottom-right" pauseOnHover={false}/>
        </Container>
    );
};