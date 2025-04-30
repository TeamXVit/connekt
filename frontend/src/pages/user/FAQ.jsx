import { Box, Button, Container, Link, Typography } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";

export default function FAQ() {
  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        pt: "75px",
        pb: "30px",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        alignItems: { sm: "center", lg: "none" },
        gap: 4,
      }}
    >
      <Typography variant="h4">Frequently Asked Questions (FAQs)</Typography>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          1. How do I create a post on Connekt?
        </Typography>
        <Typography>
          Click on your profile picture in the top-left corner and select{" "}
          <strong>Create a Post</strong>. Choose a section—Queries, Lost &
          Found, Travel Partner, Find a Teammate, or Anonymous Confessions—fill
          in the details, and submit your post.
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          2. Can I edit or delete a post after publishing?
        </Typography>
        <Typography>
          Posts cannot be edited after publishing. To delete a post, go to{" "}
          <strong>My Activities</strong> via your profile and use the delete
          option on the post you want to remove.
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          3. How can I delete my Connekt account?
        </Typography>
        <Typography>
          Send an email to{" "}
          <Button variant="text" href="mailto:connekt4vitap@gmail.com">
            connekt4vitap@gmail.com
          </Button>{" "}
          from your registered email address. Account deletion requests are
          processed within 3–5 business days.
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          4. How does gender-based visibility work in the Travel Partner
          section?
        </Typography>
        <Typography>
          When posting in the <strong>Travel Partner</strong> section, you can
          select a gender preference in the <strong>Preferences</strong> field.
          Your post will be visible only to users matching that gender.
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          5. What features are currently available on Connekt?
        </Typography>
        <Typography>
          The following features are available:
          <ul>
            <li>
              <strong>Queries</strong>: Ask or answer questions.
            </li>
            <li>
              <strong>Find a Teammate</strong>: Collaborate on projects and
              events.
            </li>
            <li>
              <strong>Lost & Found</strong>: Report or claim lost items.
            </li>
            <li>
              <strong>Travel Partner</strong>: Coordinate travel with
              same-gender users.
            </li>
            <li>
              <strong>Anonymous Confessions</strong>: Share experiences
              anonymously.
            </li>
            <li>
              <strong>FAQ</strong>: Access help documentation.
            </li>
          </ul>
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          6. Is my personal information secure?
        </Typography>
        <Typography>
          Yes. We use encryption and strict privacy policies. Your data is never
          shared with third parties without your explicit consent.
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          7. Is Connekt officially affiliated with the university?
        </Typography>
        <Typography>
          No. Connekt is developed by <strong>TeamX</strong>, a student-led open
          community at VIT-AP. It is not affiliated with the university
          administration.
        </Typography>
      </Box>

      <Box sx={{ width: "90%" }}>
        <Typography variant="h6">
          8. How can I report inappropriate content or misuse?
        </Typography>
        <Typography>
          Email{" "}
          <Button variant="text" href="mailto:connekt4vitap@gmail.com">
            connekt4vitap@gmail.com
          </Button>{" "}
          with a screenshot and description of the issue. Our team will review
          and take appropriate action.
        </Typography>
      </Box>

      <Box sx={{ width: "90%", display: "flex", gap: 1 }}>
        <FeedbackIcon />
        <Link
          href="https://forms.gle/hYPqUk9kG4VcaF8D9"
          target="_blank"
          color="text.primary"
          variant="body1"
        >
          Feedback Form
        </Link>
      </Box>
    </Container>
  );
}
