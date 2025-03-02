/* eslint-disable react/prop-types */
import { Avatar, Box, Typography, useTheme } from "@mui/material";


export default function TravelPostUI({ data }) { 
    const theme = useTheme();

    return (
        <Box sx={{ width: "100%", bgcolor: theme.palette.mode === "light" ? "grey.100" : "grey.900", borderRadius: 3, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar src={data.author.profilepicture || ""}/>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography variant="body1">{data.author.name}</Typography>
                        <Typography variant="body2">{data.author.regno}</Typography>
                    </Box>
                </Box>
            </Box>
            <Typography variant="body1" sx={{ width: "100%" }}>{data.content}</Typography>
            {data.author.phoneno && <Typography variant="body2">Phone no: {data.author.phoneno}</Typography>}
            <Typography variant="body2">{data.createdAt}</Typography>
        </Box>
    );
};