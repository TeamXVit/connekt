/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "800px",
  bgcolor: "background.default",
  color: "text.primary",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  maxHeight: "80vh",
  overflowY: "auto",
};

const TermsAndConditionsModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="terms-and-conditions-modal"
      aria-describedby="terms-and-conditions-modal-description"
    >
      <Box
        sx={{
          ...style,
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Terms & Conditions
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to Connekt. By using this platform, you agree to the following
          terms, which help ensure a smooth and respectful experience for
          everyone.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>1. Platform Status</strong>
          <br />
          Connekt is close to its final release. All core features are available
          and working as intended. Minor improvements and design updates may
          continue.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>2. Independent Initiative</strong>
          <br />
          Connekt is not affiliated with VIT-AP University. It is created and
          managed by students of VIT-AP under TeamX, a student-driven open
          community.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>3. Data Usage</strong>
          <br />
          We collect minimal data to improve performance and user experience.
          Your data is kept secure and is not shared outside the platform. If
          you have concerns or want your data removed, please send a mail to us.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>4. Feature Usage</strong>
          <br />
          You are free to use all available features—Queries, Lost & Found,
          Travel Partner, Find a Teammate, Anonymous Confessions, and more—as
          long as your posts follow the community guidelines.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>5. Respectful Conduct</strong>
          <br />
          Please use the platform respectfully. Avoid posting anything
          offensive, misleading, or harmful. Content that violates these
          guidelines may be removed, and repeated misuse may lead to
          restrictions.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>6. Feedback and Issue Reporting</strong>
          <br />
          If you face any bugs, problems, or have suggestions, please send a
          mail to us. We value your feedback and work continuously to improve
          the platform.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>7. Account Deletion</strong>
          <br />
          If you no longer wish to use Connekt or want to delete your account,
          please send a mail to us. Your data and posts will be removed upon
          request.
        </Typography>

        <Typography variant="body1" paragraph>
          <strong>8. Changes to Terms</strong>
          <br />
          These terms may be updated as the platform grows. Major updates will
          be shared in-app for your awareness.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsAndConditionsModal;
