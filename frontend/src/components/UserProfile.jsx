import { Box, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function UserProfile() {
    return (
        <Box container sx={{ width: { sm: "80%", md: "50%", lg: "35%" }, height: { sm: "50vh", md: "75vh" }, my: "auto", border: 1, borderColor: "grey.500", borderRadius: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <AccountCircleIcon sx={{ width: { sm: 100, lg: 200 }, height: { sm: 100, lg: 200 } }}/>
            <Typography variant="h6">Name</Typography>
            <Box sx={{ width: "100%", px: 3, py: 2, display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography>Email Id</Typography>
                <Typography>Reg. No</Typography>
                <Typography>Phone number</Typography>
                <Typography></Typography>
            </Box>
        </Box>
    )
}