import { useState } from "react";
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";


export default function MakePost() {
    const [feature, setFeature] = useState("");
    const [formData, setFormData] = useState({
        content: "",
        preference: "",
        showphoneno: false,
        ttl: "",
        time: ""
    });

    const selectableFormData = [
        { name: "feature", minWidth: 230, items: ["Travel Partner", "Find A Teammate", "Lost & Found", "Queries"], value: feature },
        { name: "preference", minWidth: 200, items: ["All", "Male", "Female"], value: formData.preference },
        { name: "" }
    ]
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}))
    };

    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh",  pt: "75px", pb: "15px", display: "flex", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4" sx={{ width: "90%", textAlign: "left" }}>Make A Post</Typography>
            <Box sx={{ width: "90%" }}>
                <FormControl sx={{ minWidth: 230 }}>
                    <InputLabel id="select-feature">Feature</InputLabel>
                    <Select
                    sx={{ borderRadius: 5 }}
                    labelId="select-feature"
                    id="select-feature-helper"
                    // value={formData}
                    label="Feature"
                    // onChange={(e) => setFeature(e.target.value)}
                    >
                        <MenuItem value="/travel">Travel Partner</MenuItem>
                        <MenuItem disabled>Find A Teammate</MenuItem>
                        <MenuItem disabled>Lost & Found</MenuItem>
                        <MenuItem disabled>Queries</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ width: "90%" }}>
                <TextField 
                    variant="outlined" 
                    sx={{ width: { sm: "100%", lg: "75%" } }}
                    placeholder="Your post content"
                    multiline
                    rows={3}
                    maxRows={5}
                />
            </Box>
            <Box sx={{ width: "90%" }}>
                <Button variant="contained">Post</Button>
            </Box>
        </Container>
    );
};