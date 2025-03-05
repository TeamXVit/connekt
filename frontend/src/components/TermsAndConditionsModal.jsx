/* eslint-disable react/prop-types */
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  bgcolor: 'background.default',
  color: 'text.primary',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
  maxHeight: '80vh',
  overflowY: 'auto',
};

const TermsAndConditionsModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="terms-and-conditions-modal"
      aria-describedby="terms-and-conditions-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" component="h2" gutterBottom>
          Terms and Conditions
        </Typography>
        <Typography variant="body1">
          1. <strong>Introduction</strong> Welcome to Connekt, a platform developed and managed by TeamX, a student community of VIT-AP. By accessing or using Connekt, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using the platform.
        </Typography>
        <Typography variant="body1">
          2. <strong>Account Management</strong>
          <ul>
            <li>Users can create posts by clicking on their profile picture and selecting &quot;Create a Post.&quot;</li>
            <li>Account deletion requests must be sent via email to connekt4vitap@gmail.com. Once an account is deleted, all associated data will be permanently removed.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          3. <strong>Content Modification and Deletion</strong>
          <ul>
            <li>Users cannot edit posts after publishing.</li>
            <li>Posts can be deleted via the &quot;My Activities&quot; section under the user profile.</li>
            <li>The platform reserves the right to remove any content that violates community guidelines or legal regulations.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          4. <strong>Privacy and Data Security</strong>
          <ul>
            <li>User data is stored securely and protected with strict privacy protocols.</li>
            <li>Personal information will not be shared with third parties without user consent.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          5. <strong>Travel Partner Feature</strong>
          <ul>
            <li>Users posting in the &quot;Travel Partner&quot; section can set gender-based visibility preferences.</li>
            <li>The platform is not responsible for interactions between users; participants must exercise caution while engaging with others.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          6. <strong>Platform Affiliation</strong>
          <ul>
            <li>Connekt is not affiliated with VIT-AP officially.</li>
            <li>The platform is an independent initiative managed by TeamX, and interested individuals are welcome to contribute to its development.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          7. <strong>Future Updates</strong>
          <ul>
            <li>The platform is under continuous development.</li>
            <li>New features and improvements will be rolled out in upcoming updates.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          8. <strong>Reporting and Moderation</strong>
          <ul>
            <li>Users can report inappropriate or harmful content by emailing connekt4vitap@gmail.com with a screenshot of the offending post.</li>
            <li>The moderation team will review reports and take necessary actions, including content removal or account suspension if required.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          9. <strong>Liability Disclaimer</strong>
          <ul>
            <li>The platform does not guarantee uninterrupted service and may experience downtime for maintenance.</li>
            <li>Connekt is not responsible for any disputes, damages, or losses arising from user interactions on the platform.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          10. <strong>Amendments</strong>
          <ul>
            <li>These Terms and Conditions may be updated periodically.</li>
            <li>Continued use of the platform after modifications indicates acceptance of the updated terms.</li>
          </ul>
        </Typography>
        <Typography variant="body1">
          For any inquiries, contact us at <a href="mailto:connekt4vitap@gmail.com">connekt4vitap@gmail.com</a>.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsAndConditionsModal;