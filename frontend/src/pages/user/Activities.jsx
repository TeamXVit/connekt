/* eslint-disable no-unused-vars */
import { Box, Container, Divider, Typography } from "@mui/material"


export default function Activities() {
    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh",  pt: "75px", pb: "15px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4">Activities</Typography>
            {/* <Box sx={{ width: "90%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ width: "90%", display: "flex", gap: 3 }}>
                    <Typography>Travel Partner</Typography>
                    <Typography>Lost & Found</Typography>
                    <Typography>Find A Teammate</Typography>
                    <Typography>Queries</Typography>
                </Box>
                <Divider sx={{ my: 2, width: "100%" }}/>
            </Box> */}
        </Container>
    )
}