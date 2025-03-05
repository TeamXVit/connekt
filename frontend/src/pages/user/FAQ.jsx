import { Box, Button, Container, Link, Typography } from "@mui/material";
import FeedbackIcon from '@mui/icons-material/Feedback';


export default function FAQ() {
    return (
        <Container maxWidth={false} sx={{  bgcolor: "background.default", color: "text.primary", minHeight: "100vh", pt: "75px", pb: "30px", display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: { sm: "center", lg: "none" }, gap: 4 }}>
            <Typography variant="h4">Frequently Asked Questions (FAQs)</Typography>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">1. How do I post?</Typography>
               <Typography>Click on your profile picture in the top left corner and select <strong>Create a Post</strong>. From there, you can easily post your question or request.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">2. How do I delete my account?</Typography>
               <Typography>To delete your account, please send an email to <Button variant="text" rel="noopener noreferrer" href={`mailto: connekt4vitap@gmail.com`}>connekt4vitap@gmail.com</Button> with your request.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">3. How do I edit or delete a post?</Typography>
               <Typography>You cannot edit the post after posting but you can delete your posts by going to the <strong>Activities</strong> page. Simply click on your profile picture in the top left corner and navigate to <strong>My Activities</strong>. From there, you can delete posts.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">4. How can I ensure my Travel Partner post is only visible to my gender?</Typography>
               <Typography>While posting in the <strong>Travel Partner</strong> section, you can select your gender preference in the <strong>Preferences</strong>. Based on your choice, your post will be visible only to users of the same gender.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">5. Is my data safe? </Typography>
               <Typography>Yes! Your data is completely safe with us. We follow strict privacy protocols to ensure that your information is secure.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">6. Is this app college-affiliated? </Typography>
               <Typography>No, Connekt was created by <strong>TeamX</strong>, a college open community managed by students of <strong>VIT-AP</strong>. If you’re interested in working on the app, you’re always welcome to join us!</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">7. When will other features be available? </Typography>
               <Typography>We’re constantly working on new updates! On upcoming releases, we’ll ensure all additional features are available to enhance your experience.</Typography>
            </Box>
            <Box sx={{ width: "90%" }}>
               <Typography variant="h6">8. How do I report or take down a post?</Typography>
               <Typography>If you come across any inappropriate or harmful posts, please email <Button variant="text" rel="noopener noreferrer" href={`mailto: connekt4vitap@gmail.com`}>connekt4vitap@gmail.com</Button> with a screenshot of the post you wish to report or have taken down. Our team will review it promptly.</Typography>
            </Box>         
            <Box sx={{ width: "90%", display: "flex", gap: 1 }}>
               <FeedbackIcon />
               <Link href="https://forms.gle/hYPqUk9kG4VcaF8D9" target="_blank" color="text.primary" variant="body1">Feedback Form</Link>
            </Box>   
        </Container>
    )
}